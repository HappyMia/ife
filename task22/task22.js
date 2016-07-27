window.onload=function(){
	$=function(attribute){
		return document.querySelectorAll(attribute);	
	}
	EventUtil={
		addHandler:function(element,type,handler){
			if(element.addEventLister){
				element.addEventListener(type,handler,false);
			}else if(element.attachEvent){
				element.attachEvent("on"+type,handler);
			}else{
				element["on"+type]=handler;
			}		
		}
		
	}
	//构造函数与原型模式结合的方式创建对象
	function BinaryTree(){
		this.nodeOrder=[];
	}
	BinaryTree.prototype.preTraversal=function(t){  //前序遍历，递归
		if(t){
			this.nodeOrder.push(t);                 //将遍历的节点顺序依次放入数组中
			this.preTraversal(t.children[0]);
			this.preTraversal(t.children[1]);
		}
		
	}
    BinaryTree.prototype.inTraversal=function(t){   //中序遍历，递归
		if(t){
			this.inTraversal(t.children[0]);
			this.nodeOrder.push(t);
			this.inTraversal(t.children[1]);
		}
	}
	BinaryTree.prototype.postTraversal=function(t){   //后序遍历，递归
		if(t){
			this.postTraversal(t.children[0]);
			this.postTraversal(t.children[1]);
			this.nodeOrder.push(t);
		}
	}
	BinaryTree.prototype.traversalByLayer=function(t){   //按层遍历，也是广度优先和宽度优先,非递归
	    var queue=[];	           //这里stack模拟的是一个队列，先进后出	
		queue.push(t);             //先将根节点放入队列中
		var item;
		while(queue.length){
			item=queue.shift()     //将最前面的元素移出，放入nodeOrder数组中
			this.nodeOrder.push(item);    
			if(item.children&&item.children.length){
				for(var i=0;i<item.children.length;i++){
					queue.push(item.children[i]);
				}
			}
		}	
	}

	var bintree=new BinaryTree(); 
  /*  	function render(){                       //渲染
	  var timer = setInterval(function(){
		var node=bintree.nodeOrder.shift();  //每次渲染时把那个元素取出，让其他节点背景是白色，只有它的节点背景是蓝色
		if(node){
			for(var i=0;i<$("div").length;i++){           //让其他节点背景是白色，
				$(".tree")[i].style.backgroundColor="#fff";
			}	
			
			node.style.backgroundColor="blue";
		}
		else{
			clearInterval(timer);
			isWalking = true;
		}
	  },interval);

	} */   
 	function render(){                       //另一种渲染方法，每次渲染只将前一个节点还原，本节点突出
		var iter=0;  //迭代器
		bintree.nodeOrder[iter].style.backgroundColor="blue";
		var timer = setInterval(function(){
		++iter;
		if(bintree.nodeOrder[iter]){			    
			bintree.nodeOrder[iter-1].style.backgroundColor="#fff";			
			bintree.nodeOrder[iter].style.backgroundColor="blue";	 
		}
		else{
			bintree.nodeOrder[iter-1].style.backgroundColor="#fff";	
			clearInterval(timer);
			bintree.nodeOrder = [];  //遍历节点数组清空
			isWalking = true;
			 
		}
	  } ,interval)
	}
    var interval=300;
	var isWalking = true; //是否遍历的标志
	EventUtil.addHandler($("#preorder")[0],"click",function(){
		if(isWalking == true){
			isWalking = false;
			bintree.preTraversal($(".root")[0]);
			render();
	       // timer=setInterval(render,interval);             //设置定时器，每隔一定时间渲染一次
		} 
	});
	EventUtil.addHandler($("#inorder")[0],"click",function(){	
		if(isWalking == true){
		   isWalking = false;
		   bintree.inTraversal($(".root")[0]);
		   render();
		  // timer=setInterval(render,interval);
		}
	});
	EventUtil.addHandler($("#postorder")[0],"click",function(){
		if(isWalking == true){
		   isWalking = false;
	       bintree.postTraversal($(".root")[0]);
	      // timer=setInterval(render,interval);
		  render();
		}
	});
	EventUtil.addHandler($("#byLayer")[0],"click",function(){
		if(isWalking == true){
		   isWalking = false;
		   bintree.traversalByLayer($(".root")[0]);
		   render();
		  // timer=setInterval(render,interval);
		}
	});
	
}