/*
(function(){
	node=document.getElementById("screen");
	alert(node)
	$().getClass('login').click(function(){
		alert("a");
	});

}());
*/
$(function(){
	  //获取登录框的宽和高
    // var loginWidthStr=$('#login').css('width');
	// var loginWidth=parseInt(loginWidthStr.substring(0,loginWidthStr.length-2));
	// var loginHeightStr=$('#login').css('height');
	// var loginHeight=parseInt(loginHeightStr.substring(0,loginHeightStr.length-2));
	var login=$('#login');
    
	//点击登录
	$('#header .login').click(function(){
		login.css("width","350px");  //重新设置登录框大小，恢复成默认设置
		login.css("height","250px");
		login.center(350,250);//居中
		//login.center(loginWidth,loginHeight);//居中
		login.css('display','block');    //设置显示
		$('#screen').lock();		//
		
	});

	//点击叉号关闭
	$('.close').click(function(){
		login.css('display','none');    //设置显示
		$('#screen').unlock();		//遮罩锁屏
	});
	
	//封装的浏览器改变大小函数,当登录框处于右下角时改变大小登录框应该始终处于可见区域
	 login.browserResize(function(){
   //login.center(loginWidth,loginHeight);//居中
	   if(login.css('display')=='block')//判断登录框是不是显示状态，显示的时候改变大小才能重新锁定
		{
		   $('#screen').lock();
		}
    });

	
	//点击浮出层以外的部分，默认为关闭浮出层
	$('#screen').click(function(){  
		login.css('display','none');    //设置显示
		$('#screen').unlock();		//遮罩锁屏
	});
	
	//拖拽
     // $('.login_header').drag();
	 login.drag($("#login h2").first());
	//拖动边沿改变大小
	$('.top').resize();
	$('.right').resize();
	$('.bottom').resize();
	$('.left').resize();
	$('.leftTop').resize();
	$('.rightTop').resize();
	$('.rightBottom').resize();
	$('.leftBottom').resize();
})