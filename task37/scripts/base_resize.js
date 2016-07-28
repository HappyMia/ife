//拖动边沿和四角改变大小
//有一个小bug：当拖动左边沿改变大小时，右边沿会抖动，迅速变化，松手会右边沿会移动；当拖动上边沿改变大小时，下边沿会抖动 
$().extend("resize",function(){
	for(var i=0;i<this.elements.length;i++){
		var node=this.elements[i];	
	function sizeChange(e){
			preDef(e);
			var _this=this;
			var e=getEvent(e);
            var login={}; //创建一个对象，保存登录框的宽高，初始值宽高等信息，其实宽和高是可以变化的
			login.width=login.initWidth=parseInt(getStyle(node.parentNode,"width"));  
	        login.height=login.initHeight=parseInt(getStyle(node.parentNode,"height"));
		    login.top=login.initTop=parseInt(getStyle(node.parentNode,"top"));
		    login.left=login.initLeft=parseInt(getStyle(node.parentNode,"left"));
		    login.right= login.initRight=parseInt(getStyle(node.parentNode,"right"));
		    login.bottom= login.initBottom=parseInt(getStyle(node.parentNode,"bottom"));
			login.minHeight=230;  //规定登录框的最小尺寸
			login.minWidth=300;
			//下面的switch选择当选择不同边沿时，变化的起始点，值为0表示对应坐标无变化
			switch (node.className){
			case "top" :
				login.startPosY=e.clientY;
				login.startPosX=0;
			break;
			case "right":
				login.startPosX=document.documentElement.clientWidth-e.clientX;
				login.startPosY=0;
			break;
			case "bottom":
				login.startPosY=document.documentElement.clientHeight-e.clientY;
				login.startPosX=0;
			break;
			case "left":
				login.startPosX=e.clientX;
				login.startPosY=0;
			break;
			case "leftTop":

				login.startPosX=e.clientX;
				login.startPosY=e.clientY;
			break;
			case "rightTop":

				login.startPosX=document.documentElement.clientWidth-e.clientX;
				login.startPosY=e.clientY;
			break;
			case "rightBottom":

				login.startPosX=document.documentElement.clientWidth-e.clientX;
				login.startPosY=document.documentElement.clientHeight-e.clientY;
			break;
			case "leftBottom":

				login.startPosX=e.clientX;
				login.startPosY=document.documentElement.clientHeight-e.clientY;
			break;
		}
	    addEvent(document,"mousemove",getChange);

		function getChange(e){
		  var e=getEvent(e);

		  change(e,node.className,login,_this);   //当鼠标move时调用change函数，这里最好用一个window对象调用
	    }
		addEvent(document,"mouseup",up);
		function up(){           //放开鼠标，删除事件

		  removeEvent(document,"mousemove",getChange);
		  removeEvent(document,"mousemoup",up);
		  //removeEvent(document,"mousemoup",up);
		 }
		
	 }
	 addEvent(node,"mousedown",sizeChange);  //鼠标按下的时间添加函数必须放在 sizeChange定义后面，否则报错
	
  }
	function change(e,offset,obj,_this){
 // console.log(obj)
	  preDef(e);
	switch (offset){
		case "top":	obj.height=obj.initHeight+obj.startPosY-obj.top;obj.top=e.clientY;break;
		case "right":obj.width=obj.initWidth+obj.startPosX-obj.right;obj.right=document.documentElement.clientWidth-e.clientX;break;
		case "bottom":obj.height=obj.initHeight+obj.startPosY-obj.bottom;obj.bottom=document.documentElement.clientHeight-e.clientY;break;
		case "left":obj.width=obj.initWidth+obj.startPosX-obj.left;obj.left=e.clientX;break;
		case "leftTop":obj.height=obj.initHeight+obj.startPosY-obj.top;obj.top=e.clientY;obj.width=obj.initWidth+obj.startPosX-obj.left;obj.left=e.clientX;break;
		case "rightTop":obj.width=obj.initWidth+obj.startPosX-obj.right;obj.right=document.documentElement.clientWidth-e.clientX;obj.height=obj.initHeight+obj.startPosY-obj.top;obj.top=e.clientY;break;
		case "rightBottom":obj.width=obj.initWidth+obj.startPosX-obj.right;obj.right=document.documentElement.clientWidth-e.clientX;obj.height=obj.initHeight+obj.startPosY-obj.bottom;obj.bottom=document.documentElement.clientHeight-e.clientY;break;
		case "leftBottom":obj.width=obj.initWidth+obj.startPosX-obj.left;obj.left=e.clientX;obj.height=obj.initHeight+obj.startPosY-obj.bottom;obj.bottom=document.documentElement.clientHeight-e.clientY;break;
		break;
	}
	//宽度和高度的变化是独立的，即二者互相不影响，但是宽度的变化和left，right变化是相联系的，比如宽度达到最小时，left，right就不应该再变化，left为0时，宽度就不能再变化
	//高度和top，bottom的变化也一样
	if(obj.width<obj.minWidth){
		_this.parentNode.style.width=obj.minWidth+"px";	

	}else if(obj.right<0){
		obj.right=0;
	}else if(obj.left<0){
		obj.left=0;
	}else{
		    _this.parentNode.style.right=obj.right+"px";
	     	_this.parentNode.style.left=obj.left+"px";
	 		_this.parentNode.style.width=obj.width+"px";
	}
	//互相独立的两个if语句
   if(obj.height<obj.minHeight){
		_this.parentNode.style.height=obj.minHeight+"px";

	}else if(obj.top<0){
		obj.top=0;
	}else if(obj.bottom<0){
		obj.bottom=0;
	}else{
		_this.parentNode.style.top=obj.top+"px";
		_this.parentNode.style.bottom=obj.bottom+"px";
		_this.parentNode.style.height=obj.height+"px";
		
	}	
}

});
