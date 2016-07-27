
//下次尝试多用对象实现队列。在这里，tags和hobby的处理有很多的相似之处，比如都需要一个全局的数组，右输入，左输出，渲染render等，可通过创建一个拥有这些属性和方法的对象，
//然后通过new这个对象来处理tags和hobby。
window.onload=function(){
	//获取元素的简写，
	$=function(attribute){
		//return document.querySelector(attribute);
		return document.querySelectorAll(attribute);
	}
	//添加事件处理函数
	var EventUtil={
		addHandler:function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}
			else if(element.attachEvent){
				element.attachEvent("on"+type,handler);
			}
			else{
				element["on"+type]=handler;
			}
		},
		
		getEvent:function(evt){
			return evt ? evt : window.event;
		}
	}
	
	//获取输入
	function getInput(){
		var inputStr=$("#input")[0].value.trim().replace(/,|，|、/gi,"");//　/,|，|、/gi匹配,，、
		if(!/^[0-9a-zA-Z\u4e00-\u9fa5\s]+$/.test(inputStr)&&inputStr.length!=0){  //匹配数字、字母。中文，空白字符
			alert("input error");
		}else{
		return inputStr;
		}	
	}	
	
	//添加标签函数
    function addTag(e){
		var evt=EventUtil.getEvent(e);
		if(evt.keyCode==13||evt.keyCode==32||evt.keyCode==188){  // 回车，空格和逗号
			var inputString=getInput();
			if(inputString.length==0){
				alert("输入为空");
			}else if(tags.indexOf(inputString)<0){  //这里有一个去重
				if(tags.length<10){
				    tags.push(inputString);   //长度小于10，右输入
					renderTags();

				}else{
					tags.shift();            //长度大于10，左输出，右输入
					tags.push(inputString);
					renderTags();
				}
				$("#input")[0].value=null;
			}
			else{
				alert("不能重复输入");
				$("#input")[0].value=null;
			}
		}
	}
	//为每个tag添加事件处理函数
	function addDivElement(){  
		for(var j=0;j< $(".tag").length;j++){
			EventUtil.addHandler($(".tag")[j],"mouseover",function(e){
				// e.target.innerHTML="点击删除"+e.target.innerHTML;   //方法一
				e.target.firstChild.insertData(0,"点击删除");  //insertData，XML DOM方法
				e.target.style.backgroundColor="red";
			});
			EventUtil.addHandler($(".tag")[j],"mouseout",function(e){
				// e.target.innerHTML=e.target.innerHTML.substring(4);  //方法二
				e.target.firstChild.deleteData(0,4);          //deleteData，XML DOM方法
				e.target.style.backgroundColor="#00BFFF";
			});	
			EventUtil.addHandler($(".tag")[j],"click",function(j){   //点击删除，这里必须使用闭包
				return function(){
					tags.splice(j,1);	//删除一个元素
					renderTags();
				} 				     
			}(j));
		}
	}

	function renderTags(){

		var renderArr=[];
		for(var i=0;i<tags.length;i++){
			var tag="<div class='tag' style='display:inline-block'>"+tags[i]+"</div>";
			renderArr.push(tag);
		}
		$("#tags")[0].innerHTML=renderArr.join("");
		addDivElement();
	}
	
	//爱好输入集处理
	
	function addHobby(){
		var inputStr=$("#hobby_input")[0].value.trim();
        hobby=splitStr(inputStr);    //拆分加去重
		if(hobby.length>=10){
			hobby=hobby.slice(hobby.length-10,hobby.length);  //如果长度大于10，则取后面的10个
		}
		renderHobby();
	}
	function splitStr(inputStr){　　　　　　　　//拆分字符串成数组，并去重，按照空白字符，中英文逗号，顿号，Tab?
		//var tempArr=inputStr.split(/[\s|,|，|、]+/g); //这里可以匹配多个分割符，这样每一个项不用在做trim处理了
		var tempArr=inputStr.split(/[^0-9a-zA-Z\u4e00-\u9fa5]/g).filter(function(item){return item.length > 0}); //字母数字汉字之外的都归为分隔符
		var result = [], hash = {};
        for (var i = 0, elem; (elem = tempArr[i]) != null; i++) {  //给定数组去重，用一个hashtable的结构记录已有的元素
			if (!hash[elem]) {
				result.push(elem);
				hash[elem] = true;
			}
		}
       return result;
		
	}
	
	function renderHobby(){
		var renderArr=[];
		for(var i=0;i<hobby.length;i++){
			var list="<div class='hobby' style='display:inline-block'>"+hobby[i]+"</div>";
			renderArr.push(list);
		}
		$("#hobby")[0].innerHTML=renderArr.join("");
	}
	
	var tags=[];  //储存输入的每一项tag
	EventUtil.addHandler($("#input")[0],"keyup",addTag);
	var hobby=[];
	EventUtil.addHandler($("#confirm")[0],"click",addHobby);
}