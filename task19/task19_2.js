/*冒泡法排序可视化改进版：把每一次交换之后的数组保存起来，最后再把保存的每一个数组依次渲染出来。
*/
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
	
	var result=[]; //用来实现队列的数组
	var snapshots=[];  //存放你每次交换后数据的数组
	var randomSwitch = 1;  //随机生成数据的开关
	var sortSwitch = 1;    //排序开关
 
	var colors=['#FF0000','#00FF00','#0000FF','#00FFFF','#FFFF00','#FF00FF'];//渲染队列的颜色值
	//添加事件函数,兼容各个浏览器
	var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
		//	alert("1");
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
			var timer = setInterval(render,oSpeed.value);  //核心，定时渲染
			 function render() {
				 var snapshot = snapshots.shift() || [];   //snapshots为空的时候，snapshot为undefined,snapshot.length不存在，就会报错。
				 console.log(snapshot.length)
				 if(snapshot.length>0){
					 renderQueue(snapshot);
				 }
				 else{
					clearInterval(timer);
					sortSwitch=1;   //当开始排序后，关闭开关
			        randomSwitch=1; //关闭随机生成数据的开关
					alert("完成");
				 }
			 }		
		}		
	})

	//渲染队列，为每个元素绑定事件函数
	function renderQueue(arr){
		var array = arr || result; //如果传入了参数，则对传入的数组渲染，否则对全局数组result渲染
		oQueue.innerHTML=null;
		var divArray=[];
		for(var i=0;i<array.length;i++){
			//var divElement="<div style='height:"+result[i]+"px,background-color:"+color(result[i])+"'></div>";
			var divElement="<div><div class='bar' style='height:" +(array[i]*3) + "px; background-color:" + color(array[i]) + "'></div><p>"+array[i]+"</p></div>";

			divArray.push(divElement);
		}
		oQueue.innerHTML=divArray.join("");
		//点击某个元素删除,这里必须使用闭包，否则绑定到div上的参数等于循环结束时的参数
	   for(var i=0;i<oQueue.childNodes.length;i++){
		EventUtil.addHandler(oQueue.childNodes[i],"click",function(i){   
			return function(){
			array.splice(i,1); //从第i个开始，去掉1个元素
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
		 } else if (num >= 90 && num < 100){
			 return colors[4];
		 } else if (num == 100) {
			 return colors[5];
		 }
    }
 
 /*冒泡法排序*/
	function bubbleSort(){
		for(var i=0;i<result.length-1;i++){
			for(var j=0;j<result.length-i-1;j++){
				if(result[j]>result[j+1]){
					var temp=result[j];
					result[j]=result[j+1];
					result[j+1]=temp;	 
				 }
				//snapshots.push(result); //这里不能讲result数组直接push，因为数组变化后会反映到snapshots中，最终导致数据相同。
			    //数组对象的克隆问题：直接复制Arr,Arr改变，拷贝的值也会改变(此时为对象的深拷贝)
				snapshots.push(result.slice(0));
				//借助JSON转化便不再跟着变了(实现的是对象的浅拷贝---数组的浅拷贝还可以用slice实现)。		
				//snapshots.push(Arr);//--深拷贝：可以排序，但没有延迟效果,记录不下每次的改变
			}     
		 }
		 return result;
	}	
}
    