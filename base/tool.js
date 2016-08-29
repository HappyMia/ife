//浏览器检测  

(function(){
	window.sys = {};               //全局属性，可以在外部访问，保存浏览器信息对象
	var ua = navigator.userAgent.toLowerCase();  //获取浏览器的信息字符串
	//alert(ua)
	var s; //浏览器信息数组，浏览器名称+版本
	//简写：连续的三元操作
	(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
	(s = ua.match(/opera.*version\/([\d.]+)/)) ? sys.opera = s[1] :
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
})();
 
//DOM加载
function addDomLoaded(fn) {
	var isReady = false;
	var timer = null;
	function doReady(){  
	  if(isReady) return;   //如果该函数执行了一次，就返回，不在执行。
	  isReady = true;
	  if (timer) clearInterval(timer);    //清楚定时器
	  fn();
	}
	//判断非主流浏览器：Opera8 之前，webkit 引擎浏览器525 之前，Firefox2之前。如果是webkit存在并且小于525
	if((sys.webkit && sys.webkit < 525) || (sys.opera && sys.opera < 9) ||(sys.firefox && sys.firefox < 3)){
	
	  //第一种方法 //每隔1ms检测下readyState属性
	  timer = setInterval(function(){
	  if(/loaded|complete/.test(document.readyState)){   //loaded：部分加载，complete：完全加载，相当于onload，                                                
	    doReady();                                       //这中兼容方法在图片等加载完后再执行
	  }
	}, 1);
	/*
	//第二种方法：这个在图片等加载之前执行
	timer = setInterval(function(){
	if (document && document.getElementById &&
	document.getElementsByTagName && document.body document.documentElement )
	{
	doReady();
	}
	}, 1); */
	} else if (document.addEventListener) {//W3C
	  addEvent(document, 'DOMContentLoaded', function () {
	    doReady();
	    removeEvent(document, 'DOMContentLoaded', arguments.callee);
	  });
	}else if (sys.ie && sys.ie < 9) {//IE
	//IE8-
	  timer = setInterval(function () {
	   try {
	     document.documentElement.doScroll('left');
	     doReady();
	   } catch (ex) {};
	  },1);
	}
}

//跨浏览器事件绑定
function addEvent(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,function(){
			handler.call(element);
		});
	}else{
		element["on"+type]=handler;
	}
}
//跨浏览器事件删除
function removeEvent(element,type,handler){
	if(element.removeEventListener){
		element.removeEventListener(type,handler,false);
	}else if(element.detachEvent){
		element.detachEvent("on"+type,handler);
	}else{
		element["on"+type]=null;
	}
}


//跨浏览器获取style
function getStyle(element,attr){
	
	if(typeof window.getComputedStyle!="undefined"){
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof window.currentStyle!="undefined"){
		return window.currentStyle(element)[attr];
	}
	/*
	//另一种方法
	var style = window.getComputedStyle ? window.getComputedStyle : null||window.currentStyle;
	//获取style属性 window.getComputedStyle在IE中会出错，如果出错则返回null,如果返回null则执行||后面的
    return style[attr];
	*/
}
//跨浏览器获取鼠标滚动的距离
 /* document.documentElement.scrollTop:IE,firefox能正常获取，chrome始终为0
    document.body.scrollTop：chrome能正常获取，ie和firefox始终为0 
    这两个属性一个能正常获取时另一个始终为0	
 */
function getScrollTop(){
	return Math.max(document.documentElement.scrollTop,document.body.scrollTop);
}

//跨浏览器获取视口大小

function getInner(){
	if(typeof window.innerWidth!='undefined'){
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else {
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
		
}

//判断class是否存在
function hasClass(element,classname){
	//PS:这里匹配的是前面是否是空格或者开头，加括号是因为\s要和+className+'(\\s|$)')进行匹配，\s中的\要加\进行转义，直接匹配className不够精确，new RegExp(className)不够精确，如果传递的是aa或者aaaa也能返回
    //PS：match是字符串的方法，不是正则表达式的
	return element.className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'))
}
//跨浏览器添加link规则
function insertRule(sheet,selectorText,cssText,position){
	if(typeof sheet.insertRule !='undefined'){  //W3C添加规则
   sheet.insertRule(selectorText+'{'+cssText+'}',position);

 }else if(typeof sheet.addRule !='undefined'){  //IE添加规则
   sheet.addRule(selectorText,cssText,position);
 }
}

//垮浏览器移除link规则
function deleRule(sheet,index){
	if(typeof sheet.deleteRule!='undefined'){
    sheet.deleteRule(index);
  }else if(typeof sheet.removeRule!='undefined'){
    sheet.removeRule(index);
  }
}

//获取滚动区域大小
function getscroll(){

		return {
			width:document.documentElement.scrollWidth,
			height:document.documentElement.scrollHeight
		}
	
		
}

//跨浏览器获取事件对象
function getEvent(e){
	return e||window.event;
}
//跨浏览器获取事件目标
function getTarget(e){
	return e.target || e.srcElement;
}
//跨浏览器阻止默认行为
function preDef(evt){
	var e=getEvent(evt);
	if(typeof e.preventDefault!="undefined"){
		return e.preventDefault();       //W3C
	}else{
		return e.returnValue=false;         //IE
	}
}

//删除字符串前后空格,js中没有trim，VBjs中有这个函数，但是可以再js中使用
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}

//滚动条清零
function scrollTop(){
	  document.body.scrollTop=0;
	  document.documentElement.scrollTop=0;  //IE
}
//创建元素
function createEle(arg){
	return document.createElement(arg);
}
function change(e,offset,obj,_this){
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
};
function setFloat(ele,str){
	    ele.style.cssFloat = 'left'; //火狐
	    ele.style.styleFloat = 'left'; //ie

}
