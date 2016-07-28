//拖拽插件
//拖拽
/*
拖拽流程：
1.先点下去
2.点下的物体被选中，move移动
3.抬起鼠标，停止移动
注意：点击某个物体的事件，目标元素用那个物体即可，
move和up是全局区域，也就是整个文档通用，应该用document
*/
$().extend("drag",function(){     //调用插件的入口函数
    var tags=arguments;   
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],"mousedown",function(e){
			//解决问题一：低版本火狐在空的div 拖拽的时候，有个bug，会拖断掉并且无法拖动，
			//这个问题是火狐的默认行为，我们只需要取消这个默认行为即可解除这个bug,但是把输入框的默认行为也阻止掉了，即不能输入
			//preDef(e);
			//解决办法：判断当为空div时再阻止默认行为
			 
			if(trim(this.innerHTML).length==0)preDef(e);
			var e=getEvent(e);
			var _this=this;   //这里_this代表this.elements[i]
			var diffX=e.clientX-_this.offsetLeft;
			var diffY=e.clientY-_this.offsetTop;
			//自定义拖拽区域
			var flag=false;
			for(var i=0;i<tags.length;i++){

				if(getTarget(e)==tags[i]){
					flag=true;
					break;             //只要有一个是true，就立刻返回，跳出循环，不在进行后面的判断
				}
			}
			if(flag){
				addEvent(document,"mousemove",move);
			    addEvent(document,"mouseup",up);
			}else{
				
				removeEvent(document,"mousemove",move);
				removeEvent(document,"mouseup",up);
			}
			 function move(e){	
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
				//解决问题二：解决IE浏览器在拖出浏览器外部的时候，还是会出现空白的bug问题setCapture ，这个不能放在onmousedown中，否则IE不能输入
				if (typeof _this.setCapture!="undefined"){
					_this.setCapture();
				
				}
			 }
			 function up(){		
				removeEvent(document,"mousemove",move);
				removeEvent(document,"mouseup",up);
				 
				//alert(_this.releaseCapture)
				//解决问题三：
				if (typeof _this.releaseCapture!="undefined") {
				_this.releaseCapture();
				
			   }
			 }
		 });
  
    }
})

