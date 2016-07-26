/*冒泡法排序可视化：利用计时器实现,本质就是每比较一次（可能交换数据也可能不交换）就渲染一次，渲染完后延时一会再进行下一次比较*/
window.onload=function(){
	oInput=document.getElementById("user");
	oLeft_in=document.getElementById("left_in");
	oRight_in=document.getElementById("right_in");
	oLeft_out=document.getElementById("left_out");
	oRight_out=document.getElementById("right_out");
	oQueue=document.getElementById("queue");
	oSort=document.getElementById("sort");
	oRandom=document.getElementById("random");
	oSpeed=document.getElementById("speed");

	var randomSwitch = 1;  //随机生成数据的开关
	var sortSwitch = 1;    //排序开关
    var result=[]; //用来实现队列的数组
	var colors=['#FF0000','#00FF00','#0000FF','#00FFFF','#FFFF00','#FF00FF'];//渲染队列的颜色值
	//添加事件函数,兼容各个浏览器
	var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
		}
		
	}};	
	
	//获取输入的值
	function getValue(){
		var userInput=oInput.value.trim();		
		return userInput;
	}
	//左侧入
	EventUtil.addHandler(oLeft_in,"click",function(){
		var userInput=getValue();
			if(/(^[1-9][0-9]$)|(^100$)/.test(oInput.value.trim())){    //匹配10-100数字，trim过滤空格
				if(result.length<60){
					result.unshift(parseInt(userInput));
					renderQueue();		
				}
				else{
				    alert("队列元素不能超过60个")
			   }
			}
			
			else{
				alert("请输入10-100数字");
			}
	
	});
	//右侧入
	EventUtil.addHandler(oRight_in,"click",function(){
		var userInput=getValue();
		if(/(^[1-9][0-9]$)|(^100$)/.test(oInput.value.trim())){
			if(result.length<60){
				result.push(parseInt(userInput));
				renderQueue();		
			}
			else{
				alert("队列元素不能超过60个")
			}
		}
	    else{
				alert("请输入10-100数字");
		}
	})
	//左侧出
	EventUtil.addHandler(oLeft_out,"click",function(){
		if(result.length!=0){
			var item=result.shift();
			alert(item);
			renderQueue();
		}
		else{
			alert("队列已空");
		}
	});

	//右侧出
	EventUtil.addHandler(oRight_out,"click",function(){
	if(result.length!=0){
			var item=result.pop();
			alert(item);
			renderQueue();
		}
		else{
			alert("队列已空");
		}
	});
  //随机生成序列
	EventUtil.addHandler(oRandom,"click",function(){
		if(randomSwitch){
		result=[];
		for(var i=0;i<40;i++){
			var data=Math.ceil(90*Math.random()+10);
			result.push(data);
		}
		renderQueue();
		}
	})	
	//排序
	EventUtil.addHandler(oSort,"click",function(){
		if(result.length==0){
			alert("请输入数据！")
		}else if(sortSwitch){
			sortSwitch=0;   //当开始排序后，关闭开关
			randomSwitch=0; //关闭随机生成数据的开关
			bubbleSort();	
		}
		
	})
	
	//渲染队列，为每个元素绑定事件函数
	function renderQueue(){
		oQueue.innerHTML=null;
		var divArray=[];
		for(var i=0;i<result.length;i++){
			//var divElement="<div style='height:"+result[i]+"px,background-color:"+color(result[i])+"'></div>";
			var divElement="<div><div class='bar' style='height:" +(result[i]*3) + "px; background-color:" + color(result[i]) + "'></div><p>"+result[i]+"</p></div>";

			divArray.push(divElement);
		}
		oQueue.innerHTML=divArray.join("");
		//点击某个元素删除,这里必须使用闭包，否则绑定到div上的参数等于循环结束时的参数
	   for(var i=0;i<oQueue.childNodes.length;i++){
		EventUtil.addHandler(oQueue.childNodes[i],"click",function(i){  //这里也要传入个i
			return function(){
			result.splice(i,1); //从第i个开始，去掉1个元素
			renderQueue();	
			}
	
		}(i));
	}

	}
	//颜色选择函数
	function color(num){
		 if (num < 60) {
			 return colors[0];
		 } else if (num >= 60 && num < 70) {
			 return colors[1];
		 } else if (num >= 70 && num < 80) {
			 return colors[2];
		 } else if (num >= 80 && num < 90) {
			 return colors[3];
		 } else if (num >= 90 && num < 100) {
			 return colors[4];
		 } else if (num == 100) {
			 return colors[5];
		 }
 }
 
 /*冒泡法排序，这里没有用for循环，而是用定时器模拟的for循环,这里有一个bug，在定时间隔变化时，内外层变化不一致*/
	function bubbleSort(){
		outCirculation(0); //外层循环
	}
  function outCirculation(i){  
    innerCirculation(0,i); //内层循环，执行完一次是一趟排序
	i++;
    if(i >=result.length-1){alert('完成'); randomSwitch=1;sortSwitch=1;return;} //如果外层循环的大于数组长度-1，则排序完毕,打开开关，return
    var outTimer =setTimeout(returnFun(outCirculation,null,i),(result.length-i+2)*oSpeed.value);//定时，递归调用，每次定时长度间隔为一次内层循环的时间
		
	}
  function innerCirculation(j,i){     //内层循环，如果反序则交换
	if(result[j]>result[j+1]){			
		var temp=result[j];
		result[j]=result[j+1];
		result[j+1]=temp;	
		renderQueue();    //然后重新渲染队列
	}
	j++;	
    if(j >=result.length-1-i){return;}//一趟排序完成，返回
	  var innerTimer=setTimeout(returnFun(innerCirculation,null,j,i),oSpeed.value);
	}
	function returnFun(funName,obj)//funName代表innerCirculation，obj代表null
	{
		var array = new Array();
		for(var i= 2; i < arguments.length; i++ )
		{ 
			array.push(arguments[i]);
		} 
		return function()
		{
			funName.apply(obj,array);
		};
		
	}
}