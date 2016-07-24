/*模拟队列*/
window.onload=function(){
	oInput=document.getElementById("user");
	oLeft_in=document.getElementById("left_in");
	oRight_in=document.getElementById("right_in");
	oLeft_out=document.getElementById("left_out");
	oRight_out=document.getElementById("right_out");
	oQueue=document.getElementById("queue");
	
	var result=[]; //用来存放队列元素的数组
	//获取输入的值
	function getValue(){
		var userInput=oInput.value.trim();		
		return userInput;
	}
	//左侧入
	oLeft_in.onclick=function(){
		var userInput=getValue();
			if(/^[0-9]+$/.test(oInput.value.trim())){    //匹配数字，trim过滤空格
				result.unshift(userInput);
				renderQueue();
			}
			else{
				alert("请输入数字");
			}
	
	}
	//右侧入
	oRight_in.onclick=function(){
		var userInput=getValue();
		if(/^[0-9]+$/.test(oInput.value.trim())){
			result.push(userInput);
			renderQueue();	
		}
	    else{
				alert("请输入数字");
		}
	}
	//左侧出
	oLeft_out.onclick=function(){
		if(result.length!=0){
			var item=result.shift();
			alert(item);
			renderQueue();
		}
		else{
			alert("队列已空")
		}

	}
	//右侧出
	oRight_out.onclick=function(){
	if(result.length!=0){
			var item=result.pop();
			alert(item);
			renderQueue();
		}
		else{
			alert("队列已空")
		}
	}
	
	//点击某个元素删除
	/*
	for(var i=0;i<result.length;i++){
		alert(oQueue.childNodes[i])
		oQueue.childNodes[i].onclick=function(){
			result.splice(i,1); //从第i个开始，去掉1个元素
			renderQueue();
		}
	}
	*/
	oQueue.onclick=function(evt){
		var e=evt||window.event;
		if(e.target.nodeName=="DIV"){ //如果点击了div元素，则执行
			var num=e.target.innerHTML;
			for(var i=0;i<result.length;i++){
				if(result[i]==num){
					result.splice(i,1); //从第i个开始，去掉1个元素
					renderQueue();
					break;
				}
			}
			
		}
	}
    
	//渲染队列
	function renderQueue(){
		oQueue.innerHTML=null;
		var divArray=[];
		for(var i=0;i<result.length;i++){
			var divElement="<div>"+result[i]+"</div>";
			divArray.push(divElement);
		}
		oQueue.innerHTML=divArray.join("");

	}
	
}
