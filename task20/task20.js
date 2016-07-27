window.onload=function(){
	//获取元素的简写
	$=function(attribute){
		return document.querySelector(attribute);
	}
	var queue = [];
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
		}
	}
	EventUtil.addHandler($("#left_in"),"click",function(){
		//inputStr=$("#input").value.trim().replace(/,|，|、/gi,"  ");//　/,|，|、/g开启全局匹配，将替换所有的匹配项，否则只匹配第一项,，、
		//inputStr=$("#input").value.trim().replace(/[^0-9a-zA-Z\u4e00-\u9fa5]/gi," ");//　/,|，|、/g开启全局匹配，将替换所有的匹配项，否则只匹配第一项,，、
		inputAr=$("#input").value.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]/gi).filter(function(item){return item.length>0});//[^a-z0-9]匹配任意不在[]中的字符，非字母数字汉字的字符都归为分隔符
        for(var i=0;i<inputAr.length;i++){
		    queue.unshift(inputAr[inputAr.length-1-i]);
		}
		renderQueue();
	
	});
		EventUtil.addHandler($("#right_in"),"click",function(){
		inputAr=$("#input").value.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]/gi).filter(function(item){return item.length>0});//[^a-z0-9]匹配任意不在[]中的字符，非字母数字汉字的字符都归为分隔符
        for(var i=0;i<inputAr.length;i++){
		    queue.push(inputAr[i]);
		}
		renderQueue();
	});
	    EventUtil.addHandler($("#left_out"),"click",function(){
	    var item = queue.shift();
		alert(item);
		renderQueue();
	});
	 EventUtil.addHandler($("#right_out"),"click",function(){
		 var item = queue.pop();
		 alert(item);
		renderQueue();
	});
	EventUtil.addHandler($("#search_button"),"click",function(){
		var searchStr=$("#search").value.trim();
		if(!searchStr){
			alert("input the content");
		}else{		
            renderQueue(searchStr);
				 
		}
	});
	/*这种方法添加删除事件，必须点两下才有效
	 EventUtil.addHandler($("#source"),"click",function(evt){
		var divElements = $("#source").children;
	    for (var i=0;i<divElements.length;i++){
			EventUtil.addHandler(divElements[i],"click",function(i){
				return function(){
					queue.splice(i,1);
					renderQueue();
				};
			}(i));
	    }
	})
   */
	//渲染队列
	function renderQueue(searchStr){
		$("#source").innerHTML=null;
		var divArray=[];
		queue.map(function(item){
		if(searchStr){
			var reg=new RegExp(searchStr,"g");
			item =reg.test(item) ? item.replace(reg,"<span>"+searchStr+"</span>"):item;
		  }
		  var divElement="<div>"+item+"</div>";
			divArray.push(divElement);
		})
		$("#source").innerHTML=divArray.join("");
		//为每个与少年苏添加删除事件,这里必须使用闭包，否则绑定到div上的参数等于循环结束时的参数
		var divElements = $("#source").children;
		 for (var i=0;i<divElements.length;i++){
			EventUtil.addHandler(divElements[i],"click",function(i){
				return function(){
					queue.splice(i,1);						
					renderQueue(searchStr);
				};
			}(i));
	    } 
	}
}
