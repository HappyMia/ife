  function Calendar(element){
		  this.container=element;//日历的包含框
		  this.date=new Date();//创建一个当前日期对象
		  this.selectedDate=this.date.getDate();//选中的日期，初始化为当前日期		
		  this.selectedEle=null;//选中的日期的DOM元素	
		  this.selectedColor=null;      //用于存储选中日期的本来的颜色，以便还原
		  this.renderDom(); 
		  this.rightArrowFn();
	      this.leftArrowFn();
		  this.monthSelect();
		  this.yearSelect();		  
	  }
	  //渲染DOM框架	 
	 Calendar.prototype.renderDom=function(){
		var self=this;		 
		self.container.innerHTML="<div id='calendar'></div>";
		var wrapper=$("#calendar").css("width","350px") 
		 .css("height","420px")
		 .css("border","2px solid #ccc")
		 .css("font-family","'Microsoft Yahei'");
		 wrapper.addHtml('<div class="title"></div>');
		 var title=$("#calendar .title")
		 .css("width","330px") //创建日历的头
		 .css("height","20px")
		 .css("padding","10px")
		 .css("textAlign","center")
		 .css("color","#fff")
		 .css("background","red");
		 title.addHtml("<strong id='left' style='float:left'><-</strong>");
		 title.addHtml("<select class='month'></select>");
		 //添加年和月份的表单
		 var month_select=$("#calendar .month").css("marginRight","20px");
		 var months=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
		 for(var i=0;i<12;i++){		
			month_select.addHtml("<option>"+months[i]+"</option>");
		 }
		 title.addHtml("<select class='year'></select>");
		 var year_select=$("#calendar .year");
		  for(var i=2100;i>1900;i--){	
			year_select.addHtml("<option>"+i+"</option>");	
		 }
		 title.addHtml("<strong id='right' style='float:right'>-></strong>");
		 wrapper.addHtml("<table class='date'></table>");
		 var table=$("#calendar .date").css("textAlign","center");
		 table.addHtml("<thead></thead>");
		 var tHead=$("#calendar .date thead");
		 tHead.addHtml("<tr></tr>");
		 var tr=$("#calendar .date thead tr");
		 var days=["日","一","二","三","四","五","六",];
		 for(var i=0;i<7;i++){
			if(i==0||i==6){
				tr.addHtml("<th style='width:50px;height:50px;color:red'>"+days[i]+"</th>");
			}else{
				tr.addHtml("<th style='width:50px;height:50px'>"+days[i]+"</th>");	
			}	 
		 }
		 table.addHtml("<tbody></tbody>");
		 var tbody=$("#calendar .date tbody");
		 for(var i=0;i<6;i++){
			tbody.addHtml("<tr></tr>");
			var tr=$("#calendar .date tbody tr").eq(i);
				for(var j=0;j<7;j++){
					var str="<td style='width:50px;height:50px'></td>";  
					 tr.addHtml(str);		   
				}
		 }
		this.renderDate();  //渲染日期
		//为每个日期元素添加点击事件，只需添加一次，后面重新渲染数据的时候不用再添加
		$("#calendar .date tbody td").click(function(e){ 
		   var e=getEvent(e);   //跨浏览器获取事件对象
			  self.selectedEle.css("backgroundColor","white").css("color",self.selectedColor);//将前一个所选日期设置原来颜色
			  self.selectedDate=parseInt(e.target.innerHTML);      //设置所选日期
		   if(e.target.className!="siblingMonth"){ 	  //点击的是当前月    
			  self.selectedEle=$(e.target);    //获取所选日期的元素
			  self.selectedColor=self.selectedEle.css("color");//保存新的所选日期原来的字体颜色
			  self.selectedEle.css("backgroundColor","red"); //所选日期变色
			  self.selectedEle.css("color","#fff");
		   }else{  //点击的是下个月或者上个月
			   if(self.selectedDate<15){//下个月，当选中的不是本月日期时，如何区分是上个月还是下个月
				   self.date.setMonth(self.date.getMonth()+1);
				   self.renderDate();
			   }else{            //上个月
				   self.date.setMonth(self.date.getMonth()-1);
				   self.renderDate();
			   }		   
		   } 
		})
	 }
	 //渲染日期
	 Calendar.prototype.renderDate=function(){    
	    //设定表单中选定的月份
	    var monthOptions=$("#calendar .month option");
		var monthSelected=this.date.getMonth();
		monthOptions.getElement(monthSelected).selected="selected";
		//设定表单中选中的年份
		var yearOptions=$("#calendar .year option");
		var yearSelected=2100-this.date.getFullYear();
		yearOptions.getElement(yearSelected).selected="selected";
		//日期渲染
		 var dat= new Date(this.date);   //新建一个日期，与当前日期相同
		 dat.setDate(dat.getDate()-this.date.getDate()+1);//将新建的日期设置到本月1号
		 var FirDate=dat.getDate()-dat.getDay();//本月日历开头（周日）的日期，dat.getDay()获取本月1号是星期几
		 FirDate=(FirDate==1)?FirDate-7:FirDate; //如果开头日期正好是本月一号，则往前推一周；
		 dat.setDate(FirDate);  //将新建的日期设置到本月日历开头日期
		 
		 $("#calendar .date tbody .siblingMonth").removeClass("siblingMonth");  //清空所有的.siblingMonth的class属性，为后面渲染数据重新添加属性做准备
		 var tds=$("#calendar .date tbody td"); //获取所有的td
		 for(var i=0;i<42;i++){
			 var td=$(tds.getElement(i));   //选取第i个元素，返回的是base对象
			  if(dat.getMonth()!==this.date.getMonth()){ //不是本月的日期颜色不同
				td.html(dat.getDate()).css("backgroundColor","#fff").css("color","#A0A0A0");
				td.getElement(0).className="siblingMonth";  //不是本月的添加.siblingMonth属性
			 }
			 else if(dat.getDay()==6||dat.getDay()==0){   //周末日期是红色
				td.html(dat.getDate()).css("backgroundColor","#fff").css("color","red");
			 }
			 else{            //正常日期是黑色
				td.html(dat.getDate()).css("backgroundColor","#fff").css("color","#000");
			}	
			  dat.setDate(dat.getDate()+1); //这里日期加1不能用dat.getDate()++，不是一个变量
	  }
	  
	  
	  	////渲染选中的数据	
		for(var i=0;i<42;i++){ 
			var dateTemp=parseInt(tds.getElement(i).innerHTML);
			if(dateTemp==this.selectedDate&&tds.getElement(i).className!="siblingMonth"){   //默认选中的日期为本月的日期（初始化：当前日期，跳到其他月：选中1号）
				this.selectedEle=$(tds.getElement(i));
				this.selectedColor=this.selectedEle.css("color");  //保存所选日期之前的字体颜色，用于还原
				this.selectedEle.css("backgroundColor","red").css("color","#fff");
				break; //找到就跳出循环
			}
		}
	 }
 //点击向右箭头
	Calendar.prototype.rightArrowFn=function(){
		var self=this;
		$("#calendar #right").click(function(){
		  self.selectedDate=1;    //默认选中1号
		  self.date.setMonth(self.date.getMonth()+1);//设置月份加1
          self.renderDate();     //重新渲染日期
		})

	}
	//点击向左箭头
	Calendar.prototype.leftArrowFn=function(){
		var self=this;
		$("#calendar #left").click(function(){
		  self.selectedDate=1;
		  self.date.setMonth(self.date.getMonth()-1);
          self.renderDate();
		})
	}
	
	//表单选择月份
	Calendar.prototype.monthSelect=function(){
		var self=this;
		var months=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
		var month_select=$("#calendar .month");
		var mon;  //选择的月份，整数
		month_select.getElement(0).onchange=function(){        //添加表单数据改变的事件函数
			var month=month_select.getElement(0).value;
			for(var i=0;i<months.length;i++){
				if(months[i]==month){
					mon=i;
					break;
				}
			}
		//  self.selectedDate=1;
		  self.date.setMonth(mon);
          self.renderDate();
		}
	}
	//表单选择年份
	Calendar.prototype.yearSelect=function(){
		var self=this;
		var year_select=$("#calendar .year");
		var year;
		year_select.getElement(0).onchange=function(){
		var year=parseInt(year_select.getElement(0).value);
		  //self.selectedDate=1;
		  self.date.setFullYear(year);
          self.renderDate();
		}
	}
				 
		 
		 
	 
	
	
	
