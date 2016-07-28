/*基础库*/

//前台调用
$=function(_this){
	return new Base(_this);
}
//基础库
function Base(args){
	this.elements=[];  //创建一个数组，用来保存获取的节点和节点数目
  if (typeof args == 'string'){
	 if (args[ 0 ] === "<" &&args[ args.length - 1 ] === ">" &&args.length >= 3 ){ //这里只能创建一个标签
		var tagStr=args.match(/<\w+>/)[0];  //这里没有开启全局，只能匹配一个
		var tagStr1=tagStr.substring(1,tagStr.length-1);
		var tag=document.createElement(tagStr1);
		this.elements.push(tag);
		
	}
	 else  if (args.indexOf(' ') != -1) {
		//CSS模拟
		var elements = args.split(' ');  //把节点拆开分别保存到数组里 $(#box p #q)
		var childElements = [];          //存放临时节点对象的数组，解决被覆盖的问题
		var node = [];                   //存放父节点
		for (var i = 0; i < elements.length; i ++) {
		    if (node.length == 0) node.push(document);//默认父节点是document
			switch (elements[i].charAt(0)) {
			case '#' :
			  childElements = [];       //清理掉临时节点，使得父节点失效，子节点有效
			  childElements.push(this.getId(elements[i].substring(1)));
			  node = childElements;     //保存父节点，因为childElements要清理，所以要创建node保存父节点
			  break;
			case '.' :
			  childElements = [];
			  for (var j = 0; j < node.length; j ++) {
			    var temps = this.getClass(elements[i].substring(1), node[j]);
			    for (var k = 0; k < temps.length; k ++) {
			       childElements.push(temps[k]);
			    }
			  }
			  node = childElements;
			  break;
			default :
			   childElements = [];
			   for (var j = 0; j < node.length; j ++) {
				 var temps = this.getTagName(elements[i], node[j]);
				 for (var k = 0; k < temps.length; k ++) {
				    childElements.push(temps[k]);
				 }
			   }
				node = childElements;
			}
	    }
		this.elements = childElements;
	  }
    else{
		//find模拟
		switch (args.charAt(0)) {
		case '#' :
			 this.elements.push(this.getId(args.substring(1))); //push是追加，不存在覆盖前面的问题
			 
			 break;
		case '.' :
			 this.elements=(this.getClass(args.substring(1)));  //这里getClass返回的是个数组，这届用==号就可以
			 break;
		default :
			this.elements=this.getTagName(args);            //这列是等号，会覆盖elements数组原有的值
	   }
	}
	  
  }else if(typeof args == 'object'){
	if(args!=undefined){//this是一个对象，undefined也是一个对象，区别于typeof返回的字符串'undefined'
      this.elements[0]=args;//将elements放在对象内部，这样就能在每次调用时私有化，即调用一次$()就新建一个elements
    }
  }
  else if(typeof args == 'function'){      //传一个函数的话，直接调用加载函数来执行
	//  addDomLoaded(args);
	this.ready(args);
  }
}

//独立的方法加载addDomLoaded
Base.prototype.ready=function(fn){
	addDomLoaded(fn);
}
//创建一个标签并将它追加到父节点中，注意这里返回的是创建的子节点对象

Base.prototype.addTag=function(str){
	
	for(var i=0;i<this.elements.length;i++){
		var obj=$();  //创建一个对象，保存新创建的子节点
		var parentClone=document.createElement(this.elements[i].tagName);//创建一个临时的新元素
	    parentClone.innerHTML+=str;
       
	 for(var j=0;j<parentClone.children.length;j++){            //将新添加的子元素放到obj对象下的elements数组中
		obj.elements.push(parentClone.children[j]);
		this.elements[i].appendChild(obj.elements[j]);
	  }  
	}
	
	return obj;
}


// //创建一个标签并将它追加到父节点中，注意这里返回的是创建的子节点对象
// Base.prototype.addTag=function(str){
	// //var childrenNode=[];     //临时数组，保存新创建的子节点
	// var obj=$();  //创建一个对象，保存新创建的子节点
	// for(var i=0;i<this.elements.length;i++){
		// var childNum=this.elements[i].children.length;//添加新元素之前子元素个数
		
		// this.elements[i].innerHTML+=str;
		// var childNum1=this.elements[i].children.length;//添加新元素之后子元素个数
	 // for(var j=childNum;j<childNum1;j++){            //将新添加的子元素放到obj对象下的elements数组中
		// obj.elements.push(this.elements[i].children[j]);
	  // }
	// }
	// return obj;
// }


//将元素追加到obj对象的elements数组中元素的后面，并返回对象
Base.prototype.appendTo=function(obj){
	var obj_elements=obj.elements;
	for(var j=0;j<obj_elements.length;j++){
		for(var i=0;i<this.elements.length;i++){
		  obj_elements[j].appendChild(this.elements[i]);
	    }	
	}
	  
	  return this;
}
//设置css选择器查找子节点
Base.prototype.find=function(str){
	    var childElements = [];
	    for(var i=0;i<this.elements.length;i++){  //this.elements[i]就是父节点
			switch (str.charAt(0)) {
			case '#' :
			  this.getId(str.substring(1));
			  break;
			case '.' :
			 var temp=this.getClass(str.substring(1),this.elements[i]);
			 for(var j=0;j<temp.length;j++){
				 childElements.push(temp[j]);
			 }
		      break;
			default :
			 var temp=this.getTagName(str,this.elements[i]);
			 for(var j=0;j<temp.length;j++){
				 childElements.push(temp[j]);
			 } 
	        }
       }
	   this.elements=childElements;
	   return this;
}

//获取ID节点，并返回该节点
Base.prototype.getId=function(id){
   return document.getElementById(id);

};
//获取元素节点，并返回该节点
Base.prototype.getTagName=function(tag,pareNode){
	 var node=null;//设定一个节点向量，保存标志区域的节点
	   var temps=[];
	 if(pareNode!=undefined){ //如果传递了第二个参数，即标志区域的参数,父节点
		node=pareNode;
	 }
	  else{
		node=document;
	 }
	 var tags=node.getElementsByTagName(tag);
	 for(var i=0;i<tags.length;i++)
	 {
		temps.push(tags[i]);
	 }
  
	  return temps;
};

//获取元素节点，并返回该节点
Base.prototype.getEleByTagName=function(tag){
	 for(var i=0;i<this.elements.length;i++){
	   var node=(typeof this.elements[i]=="undefined")?document:this.elements[i];//设定一个节点向量，保存标志区域的节点
	   var temps=[];
	 var tags=node.getElementsByTagName(tag);
	 for(var i=0;i<tags.length;i++)
	 {
		temps.push(tags[i]);
	 } 
	 }
	  return temps;
};


//获取CLASS节点，并返回该节点
/*虽然getElementsByClassName可以获取class节点数目，但是它的兼容性不好，需要自己写一个函数*/
Base.prototype.getClass=function(className,pareNode){  //第二个传递的是父节点
  var node=null;//设定一个节点向量，保存标志区域的节点
  var temps=[];
  if(pareNode!=undefined){ //如果传递了第二个参数，即标志区域的参数
    node=pareNode;
  }
  else{
    node=document;
  }
  var all=node.getElementsByTagName('*');  //首先获取父节点下的所有的节点
  for(var i=0;i<all.length;i++){               //判断那些节点的class是等于className，如果等于就放入节点数组中
    if(all[i].className==className){
      temps.push(all[i]);
      
    }
  }
     
  return temps;
}

//获取一个节点,num为 elements数组中的第num个节点，并返回Base对象
Base.prototype.eq=function(num){
  var element=this.elements[num]; //获取到该节点
  this.elements=[];          //清空elements
  //this.elements.push(element);//讲节点在放到elements数组中
  this.elements[0]=element;//讲节点在放到elements数组中
  return this;
}
//获取一个节点，并返回这个节点对象,注意这个不是返回base对象，区分eq函数
Base.prototype.getElement=function(num){
  return this.elements[num]; //获取到该节点
}

//获取第一个节点，并返回这个节点对象
Base.prototype.first=function(){
  return this.elements[0]; 
}
//获取最后一个节点，并返回这个节点对象
Base.prototype.last=function(){
  return this.elements[this.elements.length-1]; 
}

//获取和设置CSS
Base.prototype.css=function(attr,val){
	  for(var i=0;i<this.elements.length;i++){
		  if(arguments.length==1){
			  return getStyle(this.elements[i],attr);
		  }else{
			  this.elements[i].style[attr]=val;
		  }
	  }
	  return this;
}

//添加ClassClass
Base.prototype.addClass=function(classname){
  for(var i=0;i<this.elements.length;i++){
    if(!hasClass(this.elements[i]),classname)
     {	
	//如果添加前没有class，则直接添加，否则加一个空格
       this.elements[i].className+= this.elements[i].className.length==0 ? classname : ' '+classname;
     }
  }
  return this;
}

//移除Class
Base.prototype.removeClass=function(classname){
  for(var i=0;i<this.elements.length;i++){
    if(hasClass(this.elements[i]),classname){
      this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+classname+'(\\s|$)'),' ');

    }
  }
 return this;
}
//添加link或style中的CSS规则
//num :表示第几个link，从0开始
//position：表示插入位置，从开始
Base.prototype.addRule=function(num,selectorText,cssText,position){//num指第几个样式表(第几个link)，selectorText表示样式表的头，cssText表示样式表的内容，position表示在那个位置插入
  var sheet=document.styleSheets[num];
   insertRule(sheet,selectorText,cssText,position);
 return this;

}

//移除link或style中的CSS规则
Base.prototype.removeRule=function(num,index){
  var sheet=document.styleSheets[0];
  deleRule(sheet,index);
 return this;

}

//设置或获取innerHTML
Base.prototype.html=function(str){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length==0){   //如果没有参数，说明是要获取innerHTML，直接将innerHTML返回即可
          return this.elements[i].innerHTML;//这样就不能返回this了，但是获取的时候一般不需要连追
        }
        this.elements[i].innerHTML=str;       
   }

   return this;
}
//添加HTML
Base.prototype.addHtml=function(str){
	
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].innerHTML+=str;        //这里由= 变成+=
   }
   return this;
}
//触发鼠标悬浮事件
Base.prototype.hover=function(over,out){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].onmouseover=over; //当鼠标移入时执行over函数，当鼠标离开时执行out函数
    this.elements[i].onmouseout=out;
    addEvent(this.elements[i],"mouseover",over)
    addEvent(this.elements[i],"mouseout",out)
  }
   return this;
}
//显示下拉菜单的函数
Base.prototype.show=function(){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].style.display='block';
  }

  return this;
}
//隐藏下拉菜单的函数
Base.prototype.hide=function(){
  for(var i=0;i<this.elements.length;i++){
    this.elements[i].style.display='none';
  }

  return this;
}

//居中显示
Base.prototype.center=function(width,height){
	var left=(document.documentElement.clientWidth-width)/2;  //获取可视区的大小，减去登录框的大小，除以2
	var top=(document.documentElement.clientHeight-height)/2;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.left=left+"px";
		this.elements[i].style.top=top+"px";
	}
	return this;
}
//触发点击事件
Base.prototype.click=function(fn){
    for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],"click",fn);
        //this.elements[i].onclick=fn;
   }
   return this;
}
//锁屏
Base.prototype.lock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.width=(getscroll().width+"px");
		this.elements[i].style.height=(getscroll().height+"px");
		this.elements[i].style.display="block";
		//addEvent(document,"scroll",scrollTop);  //解决锁屏后按住左键往下滚动还会往下拉的问题
	}
	return this;
}
//解锁
Base.prototype.unlock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display="none";
	  //  removeEvent(document,"scroll",scrollTop);
	}
	return this;
}

//插件入口函数
Base.prototype.extend=function(name,fn){
	Base.prototype[name]=fn;
}
//拖拽
/*
拖拽流程：
1.先点下去
2.点下的物体被选中，move移动
3.抬起鼠标，停止移动
注意：点击某个物体的事件，目标元素用那个物体即可，
move和up是全局区域，也就是整个文档通用，应该用document
*/
/*
Base.prototype.drag=function(){
	for(var i=0;i<this.elements.length;i++){
         this.elements[i].onmousedown=function(e){
			//解决问题一：低版本火狐在空的div 拖拽的时候，有个bug，会拖段掉并且无法拖动，
			//这个问题是火狐的默认行为，我们只需要取消这个默认行为即可解除这个bug
			preDef(e);
			var e=getEvent(e);
			var _this=this.parentNode;   //这里_this代表this.elements[i]
			var diffX=e.clientX-_this.offsetLeft;
			var diffY=e.clientY-_this.offsetTop;
			
			//alert(typeof _this.setCapture!="undefined");
			//解决问题二：解决IE浏览器在拖出浏览器外部的时候，还是会出现空白的bug问题setCapture 
			if (typeof _this.setCapture!="undefined"){
				_this.setCapture();
			
			}
			document.onmousemove=function(e){
				var e=getEvent(e);
				var left=e.clientX-diffX;
				var top=e.clientY-diffY;
				//解决问题三：将移动范围限制在可视区域内
				if(left<0){
					left=0;
				}
				else if(left>getInner().width-_this.offsetWidth){
					left=getInner().width-_this.offsetWidth;
				}
				if(top<0){
					top=0;
				}
				else if(top>getInner().height-_this.offsetHeight){
					top=getInner().height-_this.offsetHeight;
				}
				_this.style.left = left+'px';
				_this.style.top  = top+'px';
			}
			document.onmouseup=function(){
				this.onmousemove=null;
				this.onmousemoup=null;
				this.onmousedown=null;
				//alert(_this.releaseCapture)
				//解决问题二：
				if (typeof _this.releaseCapture!="undefined") {
				_this.releaseCapture();
				}
			}
		 };
    }
    return this;
}
*/
//触发浏览器改变大小事件，这里原先是resize，为了和拖动边沿改变大小区别改成browserResize
Base.prototype.browserResize=function(fn){
  for(var i=0;i<this.elements.length;i++){
	var element=this.elements[i];
	addEvent(window,"resize",function(){
		fn();
		//设置当处于可是区右下角时，改变浏览器大小不能移出去，
		//解决问题四：当拖到哪里，就是哪里，但拖放到右下角，然后又缩放时，还能全部显示出来
		if(element.offsetLeft>getInner().width-element.offsetWidth){  //offsetLeft:当前对象到其上级层左边的距离。不能对其赋值，赋值用style.left
			element.style.left=getInner().width-element.offsetWidth+'px';
		}
		if(element.offsetTop>getInner().height-element.offsetHeight){
			element.style.top=getInner().height-element.offsetHeight+'px';
		}
	});

  }
  return this;
}
//随机生成整数，返回生成的整数，num 个数 min 最小值 max 最大值
Base.prototype.randomInt=function(num,min,max){
	var nums=[];
	var val;
	for(var i=0;i<num;i++){
	   val=Math.floor((max-min)*Math.random()+min);
	   nums.push(val);
	}
	return nums;
}








