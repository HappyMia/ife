$(function(){
	var box=document.getElementById("box");
	var top=getStyle(box,"top");
//	alert(top)

//addEvent(document,"DOMMouseScroll",function(){
	  //console.log(document.documentElement.scrollTop)
	 // console.log(window.pageY)
	  // console.log(getStyle(box,"top"))
	//  console.log(document.documentElement.scrollTop)
     var timer=setInterval(function(){if(document.documentElement.scrollTop>300)
     {
		 box.style.top=0;
		 box.style.position="fixed";
     }else{
		 box.style.top=top;
		 box.style.position=null;
	 }},1);
		
	
   
  //})
	
	
	
	
	
})