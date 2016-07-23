window.onload=function(){
	/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {}; //全局对象

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=document.getElementById("aqi-city-input").value.trim();
	var aqi_value=document.getElementById("aqi-value-input").value.trim();	
	if(!(/^[\u4e00-\u9fa5]+?$/.test(city)|/^[a-z]+?$/.test(city))){ //判断是否是中英文字符 ？表示非贪婪匹配
		alert("城市名称格式错误，请输入中文或英文名称！");
	}
	else if(!/^[0-9]*?$/.test(aqi_value)){
		alert("空气质量指数格式错误，请输入整数！");
	}
	else{
		aqiData[city]=parseInt(aqi_value);//用[]表示属性名称，好处是属性名可以是变量

	}
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	trNodes=[];//创建一个数组，保存表格里面的信息
	var table=document.getElementById("aqi-table");
	var th="<tr>"+"<td>城市</td><td>空气</td><td>操作</td>"+"</tr>";//innerHTML会自动解析字符串中的标签
	trNodes.push(th);//保存表头
    for (var data in aqiData){           //这是遍历对象中的属性，data是属性值
		var tr="<tr>"+"<td>"+data+"</td>"+"<td>"+aqiData[data]+"</td>"+"<td>"+"<button>删除</button>"+"</td>"+"</tr>" 
	    trNodes.push(tr);	//保存数据信息
	}
    table.innerHTML=trNodes.join("");
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();    //获取数据
  renderAqiList(); //渲染表格
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(data) {
	delete aqiData[data];  //删除data属性和属性值
	renderAqiList();       //重新渲染表格
}
function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  document.getElementById("add-btn").onclick=function(){
	addBtnHandle();	 
  }

  // 给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById("aqi-table").onclick=function(evt){
	 var e=evt||window.event;      //与IE兼容
	 var target=e.target||e.srcElement;
	  if(target.nodeName=="BUTTON"){
		  var data=e.target.parentNode.parentNode.firstChild.innerHTML;//e.target获取事件的目标，事件真正作用的节点
	      delBtnHandle(data);

	  }
  };
}
init();
	
}
