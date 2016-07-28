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
		},
		stopPropagation:function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble=true;
			}
		}
	}
	//全局变量
	var interval=200;      //定时器间隔
	var timer;         	   //定时器
	var search=false;      //查询标志
	var nodeSelect;        //定义一个全局变量保存选中的节点
	
	//构造函数与原型模式结合的方式创建对象
	function BinaryTree(){
		this.nodeOrder=[];
	}
	BinaryTree.prototype.preTraversal=function(t){  //前序遍历，递归
		if(t){
			this.nodeOrder.push(t);                 //将遍历的节点顺序依次放入数组中
			for(var i=1;i<t.children.length;i++){   //注意，这里循环起点是i=1,过滤掉第一个子节点，即展开折叠节点
				this.preTraversal(t.children[i]);
			}
		}
		
	}

	//按层遍历，也是广度优先和宽度优先,非递归
	BinaryTree.prototype.traversalByLayer=function(t){
		var queue=[];
		var item;
		this.nodeOrder=[];
		queue.push(t);
		while(queue.length){
			item=queue.shift();
			this.nodeOrder.push(item);
			if(item.children&&item.children.length){
				for(var i=1;i<item.children.length;i++){  //注意，这里循环起点是i=1,过滤掉第一个子节点，即展开折叠节点				
					queue.push(item.children[i]);
				}
			}	
		}
		
	}
	//为树的每个节点添加事件处理函数，点击节点变成红色，这里必须使用闭包。节点删除函数传递的参数是节点node而不是i
	BinaryTree.prototype.nodeDeal=function(){
		//alert($(".tree").length)
		for(var i=0;i<$(".tree").length;i++){                
			var node=$(".tree")[i];
			nodeDealEvt(node);
		}
	}
    function  nodeDealEvt(node){
	   EventUtil.addHandler(node,"click",(function(i){    
			return function(e){
				EventUtil.stopPropagation(e);                      //取消冒泡，当事件的属性bubbles=true时，默认为true
				for(var j=0;j<$(".tree").length;j++){           //让其他节点背景是白色，
					$(".tree")[j].style.backgroundColor="#fff";
				}
				node.style.backgroundColor="red";  //选中变成红色
				nodeSelect=node;
			}
		})(node));
    }
	//设置子节点的显示和隐藏
	BinaryTree.prototype.dispOrHide=function(){
		for(var i=0;i<$(".disp").length;i++){
			var label=$(".disp")[i];
			dispOrHideEvt(label);
		}
	}
	function dispOrHideEvt(label){	
		EventUtil.addHandler(label,"click",(function(label){	
			return function(e){	
				EventUtil.stopPropagation(e);               //取消冒泡	
				if(label.firstChild.nodeValue=="+"){
					label.firstChild.nodeValue="-";	
					for(var j=1;j<label.parentNode.children.length;j++){
						label.parentNode.children[j].style.display="none";
					}	 
					return;
				}
				if(label.firstChild.nodeValue=="-"){
					label.firstChild.nodeValue="+";	
					for(var j=1;j<label.parentNode.children.length;j++){
						label.parentNode.children[j].style.display="block";
					}					
				}
			}
	
		})(label));
	}
	//深度优先遍历的渲染函数
	function preTraverRender(){
	    bintree.nodeOrder=[];                           //这里每次执行遍历之前把数组清零，定时器清空，
		bintree.preTraversal($(".root")[0]);			   //防止一个遍历没完成的情况下又点击了另一个遍历按钮产生混乱
	    if(timer){clearInterval(timer);};
	    timer=setInterval(render,interval);             //设置定时器，每隔1s渲染一次
	}
    //广度优先遍历的渲染函数
	 function traverByLayerRender(){
		bintree.traversalByLayer($(".root")[0]);
		if(timer){clearInterval(timer);};
		timer=setInterval(render,interval);
	}
	//节点查询函数
	function searchNode(){
		var inputValue=$("#userInput")[0].value.trim().toLowerCase();
		if(inputValue.length==0){
			console.log("请输入查找内容！");
			return;
		}
		bintree.nodeOrder=[];
		bintree.traversalByLayer($(".root")[0]);   //深度优先查询
		// bintree.preTraversal($(".root")[0]);    //广度优先查询
		if(timer){clearInterval(timer);};
		timer=setInterval(_render(inputValue),interval);
	}
	//节点删除函数
	function deleteNode(){
		if(!nodeSelect){
			console.log("请选择要删除的节点！");
			return;
		}  
		var parent=nodeSelect.parentNode;
		parent.removeChild(nodeSelect);       //删除选中的节点
		//如果删除后该节点成为叶子节点，则删除前面的展开折叠标志
		if(parent.children.length==1){parent.removeChild(parent.firstChild);} 	
		nodeSelect=null;                           //将选中的节点置空
		//bintree.nodeDeal();	                   //这里不必再为每个节点重新添加事件处理函数，
												   //因为节点删除函数传递的是节点node而不是i
	}
	//节点添加函数
	function addNode(){
		var inputValue=$("#userAdd")[0].value.trim().toLowerCase();
		if(inputValue.length==0){
			console.log("请输入添加内容！");
			return;
		}
		if(!nodeSelect){
			console.log("请选择要添加到的节点！");
			return;
		}  
		//如果是叶子节点，添加一个展开折叠的标志
		var leaf=false;
		if(nodeSelect.children.length==0){    
			leaf=true;
			var divElement="<div class='disp label'>"+"+"+"</div>";  
			nodeSelect.innerHTML=divElement+nodeSelect.innerHTML;	
		}
		
		 var level=nodeSelect.className=="tree root"? 1:parseInt(nodeSelect.className.substring(11))+1; //节点所在的层
		 var divElement="<div class='tree child_"+level+"'>"+inputValue+"</div>";                       //创造节点
		 nodeSelect.innerHTML+=divElement;																//添加到选中节点后面
		 nodeDealEvt(nodeSelect.lastChild);	           //添加节点后，必须该节点添加事件处理函数
		 if(leaf==true){dispOrHideEvt(nodeSelect.firstChild)};         //为添加的展开折叠标志节点添加事件处理函数
	}
			
	//由于setInterval所传的函数是不能带参数的，如果带了参数render(inputValue)相当于立即执行，
	//这里另外定义了一个函数，返回一个不带参数的函数
    function _render(inputValue){
	    return function(){
		    render(inputValue);
	    }
   }

   //渲染函数
	  function render(){                       
		search=false;						//首先把查询标志设为false
		var val=arguments[0]; 				//如果输入了参数，val应该是string，如果没有输入参数，val是一个number
		if((typeof val)=="string"){			//如果val是string，就说明执行的是查询操作，就把search设为true
			search=true;
		}
		for(var i=0;i<$(".tree").length;i++){           //让其他节点背景是白色，
			$(".tree")[i].style.backgroundColor="#fff";
		}
		var node=bintree.nodeOrder.shift();  //每次渲染时把那个元素取出，让其他节点背景是白色，只有它的节点背景是蓝色
		if(node){
			//如果处于折叠状态，则展开
			var label=node.firstChild;
			if(label.className=="disp label"&&label.firstChild.nodeValue=="-"){
				label.firstChild.nodeValue="+";
				for(var j=1;j<label.parentNode.children.length;j++){
							label.parentNode.children[j].style.display="block";
				}
			}
			node.style.backgroundColor="blue";
			if(search){
				//找到文本节点，如果是叶子节点就是第一个子节点，否则就是第二个子节点
				var textNode = node.firstChild.nodeType==3 ? node.firstChild : node.firstChild.nextSibling; 
				if(textNode.nodeValue.trim()==val){        //找到节点，标志为绿色，输出提示，并清除定时器，不再渲染
					node.style.backgroundColor="green";
					console.log("找到该节点！");
					clearInterval(timer);
				}
			}			
		}
		else{
			if(search){console.log("没有找到该节点！");}       //没有找到该节点，输出一个提示
			clearInterval(timer);
		    console.log("遍历完成！");
		}
	}  

    //main函数
	var bintree=new BinaryTree();   
	bintree.nodeDeal();	                                   //为树中的每个节点添加节点处理函数
	bintree.dispOrHide();	 
	 
	EventUtil.addHandler($("#preorder")[0],"click",preTraverRender);
	EventUtil.addHandler($("#byLayer")[0],"click",traverByLayerRender);
	EventUtil.addHandler($("#search")[0],"click",searchNode);			
	EventUtil.addHandler($("#delete")[0],"click",deleteNode);  //点击删除按钮，删除选中的节点
	EventUtil.addHandler($("#add")[0],"click",addNode);	//点击按钮，在其后面添加一个节点，节点点内容为输入框输入的内容
			
}