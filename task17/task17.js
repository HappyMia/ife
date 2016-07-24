window.onload=function(){
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/


// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d; //返回xxxx-xx-xx形式的日期字符串
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01"); //Fri Jan 01 2016 08:00:00 GMT+0800
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);//ceil:向上取整，random：产生0-1之间的数字
    dat.setDate(dat.getDate() + 1);  //日期加1
  }
  return returnData;  //这个函数返回的是3个月91天的空气质量状况对象
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

//alert(aqiSourceData["北京"]["2016-01-01"]);
// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	//获取外框
	var div=document.getElementsByClassName("aqi-chart-wrap")[0];
	div.innerHTML=null;
	//设置标题
    var h3=document.createElement("h3");
	h3.innerHTML=pageState.nowSelectCity+"1-3月的空气质量指数";
	div.appendChild(h3);
	h3.style.textAlign="center";
	
	var width,margin;
	switch (pageState.nowGraTime){
		  case "day": width="5px";margin="0 5px 0 5px";baseDis=15;  //baseDis，宽度之间的间距，用来进行定位
		  break;
		  case "week": width="20px";margin="0 40px 0 40px"; baseDis=100; 
		  break;
		  case "month": width="50px";margin="0 200px 0 200px";baseDis=620;
		  break;
		  default:alert("error pageState");
	}
  //动态渲染chartData中的数据
    var i=0;
    for (data in chartData){	
	    
		if(chartData[data]>=300){color="red";}
		else if(chartData[data]>=200&&chartData[data]<300){color="blue";}
		else if(chartData[data]>=100&&chartData[data]<200){color="orange";}
		else{color="green";}
        var divElement=document.createElement("div");
		div.appendChild(divElement);
		divElement.style.width=width;
		divElement.style.bottom=0;
		divElement.style.height=chartData[data];
		divElement.style.border="1px solid #fff";
		divElement.style.background=color;
	    divElement.style.left=(20+baseDis*(i++));//不同时间粒度的left不同
		divElement.style.display="inline-block";
		divElement.title= data+" : "+chartData[data];	//title 属性规定关于元素的额外信息。                                              //这些信息通常会在鼠标移到元素上时显示一段工具提示文本（tooltip text）。	
	}
}
//求数组平均值的函数
function ave(array){
	var average=temp=0;
	for(data in array){
		temp+=array[data];
	}
	average=temp/array.length;
	return average;
}
//下面两个函数将数据的粒度由天换算成周或者月
function graTimeWeek(object){
	var aqiWeekData={};
    var sumData=[];
	var i=1; //定义一个变量，表示第几周
	for (data in object){   //将3个月的数据按周分组，每一周取7天的平均值作为该周的空气质量状况数值
       sumData.push(object[data]);
	   var dat = new Date(data);
	   var week=dat.getDay();
	   if (week==0||data=="2016-03-31"){   //week==0表示周日，最后一周不够七天，有几天就算几天的
		   aqiWeekData["第"+i+"周"]=Math.round(ave(sumData));
		  // alert("第"+i+"平均值"+aqiWeekData["week"+i]);
		   sumData=[];
		   i++;
		   continue;
	   }	   
	}
	return aqiWeekData;
}
 function graTimeMonth(object){
	var aqiMonthData={};
    var sumData1=[];sumData2=[];sumData3=[];//注意：这里初始化数组不能写成 sumData1= sumData2= sumData3=[]
	var i=0;
	for (data in object){
	   var dat = new Date(data);
	   var month=dat.getMonth(data);
	   if (month==0){
		   sumData1.push(object[data]);
	   }else if(month==1){
		   sumData2.push(object[data]);
	   }else if(month==2){
		     sumData3.push(object[data]);
	    }	 
	  	   
	}
	  aqiMonthData["Jan"]=Math.round(ave(sumData1));
	  aqiMonthData["Feb"]=Math.round(ave(sumData2));
	  aqiMonthData["Mar"]=Math.round(ave(sumData3));
      return aqiMonthData;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(evt) {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
	 var fieldSet=document.getElementById("form-gra-time");
	
	  var evt = evt ||window.event;  //获取事件对象，兼容IE
	  var target = evt.target||evt.srcElement;  //获取事件的目标，兼容IE
	  pageState.nowGraTime=target.value;
	switch (pageState.nowGraTime){
	  case "day": chartData=aqiSourceData[pageState.nowSelectCity]; //如果粒度是天，则chartData直接是aqiSourceData对象的某个城市	  
	  break;
	  
	  case "week":chartData=graTimeWeek(aqiSourceData[pageState.nowSelectCity]);
	  break;
	  
	  case "month":chartData=graTimeMonth(aqiSourceData[pageState.nowSelectCity]);
	  break;
	  default:alert("error pageState");
	  
	} 
	renderChart();

	
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(evt) {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
   var citySelect=document.getElementById("city-select");

   var evt = evt ||window.event;
   var target = evt.target||evt.srcElement;
  pageState.nowSelectCity=target.value;
	switch (pageState.nowGraTime){
	  case "day": chartData=aqiSourceData[pageState.nowSelectCity];
	  
	  break;
	  case "week":chartData=graTimeWeek(aqiSourceData[pageState.nowSelectCity]);
	  
	  break;
	  
	  case "month":chartData=graTimeMonth(aqiSourceData[pageState.nowSelectCity]);
	  break;
	  default:alert("error pageState");
	  
	} 
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var input=document.getElementsByTagName("input");
	for(var i=0;i<input.length;i++){
		input[i].onchange = function(evt){
			graTimeChange(evt);
		}
	}	
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var citySelect=document.getElementById("city-select");
	var cities=[];
	for(var city in aqiSourceData){
		var option="<option>"+city+"</option>"
		cities.push(option);
	}
	citySelect.innerHTML=cities.join("");
	// 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.onchange=function(evt){
		citySelectChange(evt);
	}
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
    	switch (pageState.nowGraTime){
		
		  case "day": chartData=aqiSourceData[pageState.nowSelectCity];
		  break;
		  
		  case "week":chartData=graTimeWeek(aqiSourceData[pageState.nowSelectCity]);
		  break;
		  
		  case "month":chartData=graTimeMonth(aqiSourceData[pageState.nowSelectCity]);
		  break;
		  default:alert("error pageState");  
		} 
		renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm(); //初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
  initCitySelector();//初始化城市Select下拉选择框中的选项，当选择的城市发生变化时，调用citySelectChange
  initAqiChartData();//在没有事件发生前，初始化图表数据，并渲染图表
}

init();



}
