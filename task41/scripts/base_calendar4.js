  function Calendar(element){

		  this.container=element;//日历的包含框
		  this.wrapper=null;     //日历的内框
		  this.nowDate=new Date();//创建一个当前日期对象
		  this.date=new Date();//创建一个日期对象,作为改变日期后返回的对象
		  this.selectedDate=null;//选中的日期，初始化为当前日期		
		  this.selectedEle=null;//选中的日期的DOM元素	
		  this.selectedColor=null;      //用于存储选中日期的本来的颜色，以便还原
		  this.renderDom();  
	      this.rightArrowFn();
	      this.leftArrowFn();
		  this.monthSelect();
		  this.yearSelect();		  
		  this.calendarShow();		
		  
	  }
	  //渲染DOM框架	 
	 Calendar.prototype.renderDom=function(){
		var self=this;		 
		var wrapper=document.createElement("div"); //创建日历的内框
		self.wrapper=wrapper;
		self.container.appendChild(wrapper);
		$(wrapper).appendTo($(self.container))
		$(wrapper).addHtml("<div class='calendarShow'></div>");//添加日期显示框
		$(wrapper).find(".calendarShow").css("width","200px")  //注意，find返回的是子元素的对象
		.css("height","30px")
		.css("backgroundColor","red")
		.css("border","1px solid #000")
		.css("border-radius","20px")
		.css("textAlign","center")
		.css("lineHeight","30px")
		.css("color","#fff")
		.css("marginLeft","70px")
		.css("marginBottom","10px")
		.css("cursor","pointer").html(self.nowDate.getFullYear()+"-"+(self.nowDate.getMonth()+1)+"-"+self.nowDate.getDate());//初始化为当前日期

		$(wrapper).addHtml("<div class='calendar'></div>");  //添加日历面板，不能用id来表示最好用class
		$(wrapper).find(".calendar").css("width","350px") 
		 .css("height","420px")
		 .css("border","2px solid #ccc")
		 .css("font-family","'Microsoft Yahei'")
		 .css("display","none");//日历面板默认隐藏
		 $(wrapper).find(".calendar").addHtml('<div class="title"></div>');//创建日历的头
		 var title=$(wrapper).find(".title")
		 .css("width","330px") 
		 .css("height","20px")
		 .css("padding","10px")
		 .css("textAlign","center")
		 .css("color","#fff")
		 .css("background","red");
		 title.addHtml("<strong class='left' style='float:left'><-</strong>");
		 title.addHtml("<select class='month'></select>");
		 //添加年和月份的表单
		 var month_select=$(wrapper).find(".month").css("marginRight","20px");
		 var months=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
		 for(var i=0;i<12;i++){		
			month_select.addHtml("<option>"+months[i]+"</option>");
		 }
		 title.addHtml("<select class='year'></select>");
		 var year_select=$(wrapper).find(".year");
		  for(var i=2100;i>1900;i--){	
			year_select.addHtml("<option>"+i+"</option>");	
		 }
		 title.addHtml("<strong class='right' style='float:right'>-></strong>");
		 $(wrapper).find(".calendar").addHtml("<table class='date'></table>");
		 var table=$(wrapper).find(".date").css("textAlign","center");
		 table.addHtml("<thead></thead>");
		 var tHead=$(wrapper).find("thead");
		 tHead.addHtml("<tr></tr>");
		 var tr=$(wrapper).find("thead").find("tr");
		 var days=["日","一","二","三","四","五","六",];
		 for(var i=0;i<7;i++){
			if(i==0||i==6){
				tr.addHtml("<th style='width:50px;height:50px;color:red'>"+days[i]+"</th>");
			}else{
				tr.addHtml("<th style='width:50px;height:50px'>"+days[i]+"</th>");	
			}	 
		 }
		 table.addHtml("<tbody></tbody>");
		 var tbody=$(wrapper).find("tbody");
		 for(var i=0;i<6;i++){
			tbody.addHtml("<tr></tr>");
			var tr=$(wrapper).find("tbody").find("tr").eq(i);
				for(var j=0;j<7;j++){
					var str="<td style='width:50px;height:50px'></td>";  
					 tr.addHtml(str);		   
				}
		 }
		this.renderDate();  //渲染日期
		//为每个日期元素添加点击事件，只需添加一次，后面重新渲染数据的时候不用再添加
		this.dateClick();
	 }
	 //渲染日期
	 Calendar.prototype.renderDate=function(){    
	    //设定表单中选定的月份
		
	    var monthOptions=$(this.wrapper).find(".month").find("option");
		var monthSelected=this.date.getMonth();
		monthOptions.getElement(monthSelected).selected="selected";
		//设定表单中选中的年份
		var yearOptions=$(this.wrapper).find(".year").find("option");
		var yearSelected=2100-this.date.getFullYear();
		yearOptions.getElement(yearSelected).selected="selected";
		//日期渲染
		 var dat= new Date(this.date);   //新建一个日期，与当前日期相同
		 dat.setDate(dat.getDate()-this.date.getDate()+1);//将新建的日期设置到本月1号
		 var FirDate=dat.getDate()-dat.getDay();//本月日历开头（周日）的日期，dat.getDay()获取本月1号是星期几
		 FirDate=(FirDate==1)?FirDate-7:FirDate; //如果开头日期正好是本月一号，则往前推一周；
		 dat.setDate(FirDate);  //将新建的日期设置到本月日历开头日期
		 
		 $(this.wrapper).find(".siblingMonth").removeClass("siblingMonth");  //清空所有的.siblingMonth的class属性，为后面渲染数据重新添加属性做准备
		 var tds=$(this.wrapper).find("tbody").find("td"); //获取所有的td
		 for(var i=0;i<42;i++){
			 var td=$(tds.getElement(i));   //选取第i个元素，返回的是base对象
			 if(dat.getDate()==this.nowDate.getDate()&&dat.getMonth()==this.nowDate.getMonth()&&dat.getFullYear()==this.nowDate.getFullYear()){ //如果渲染的是当前日期当前日期背景始终为红色
				td.html(dat.getDate()).css("backgroundColor","red").css("color","#fff");
			 }
			 else if(dat.getMonth()!==this.date.getMonth()){ //不是本月的日期颜色不同
				td.html(dat.getDate()).css("backgroundColor","#fff").css("color","#A0A0A0");
				td.getElement(0).className="siblingMonth";  //不是本月的添加.siblingMonth属性
			 }
			 else if(dat.getDay()==6||dat.getDay()==0){   //周末日期是红色
				td.html(dat.getDate()).css("backgroundColor","#fff").css("color","red");
			 }
			 else{            //正常日期是黑色
				td.html(dat.getDate()).css("backgroundColor","#fff").css("color","#000");
			}	
			////渲染选中的日期，此选中日期不是当前日期，而是点击选中，或者默认选中的日期
			var dateTemp=parseInt(td.html());
			if(dateTemp==this.selectedDate&&tds.getElement(i).className!="siblingMonth"){   //默认选中的日期为本月的日期（初始化：当前日期，跳到其他月：选中1号）
				this.selectedEle=$(tds.getElement(i));
				this.selectedColor=this.selectedEle.css("color");  //保存所选日期之前的字体颜色，用于还原
				this.selectedEle.css("backgroundColor","#ccc").css("color","#000");
			}
			  dat.setDate(dat.getDate()+1); //这里日期加1不能用dat.getDate()++，不是一个变量
	  }  
	  	////渲染选中的日期，此选中日期不是当前日期，而是点击选中，或者默认选中的日期
		// for(var i=0;i<42;i++){ 
			// var dateTemp=parseInt(tds.getElement(i).innerHTML);
			// if(dateTemp==this.selectedDate&&tds.getElement(i).className!="siblingMonth"){   //默认选中的日期为本月的日期（初始化：当前日期，跳到其他月：选中1号）
				// this.selectedEle=$(tds.getElement(i));
				// this.selectedColor=this.selectedEle.css("color");  //保存所选日期之前的字体颜色，用于还原
				// this.selectedEle.css("backgroundColor","#ccc").css("color","#000");
				// break; //找到就跳出循环
			// }
		// }
	 }
	 //为每个日期元素添加点击事件
	 Calendar.prototype.dateClick=function(){
		 var self=this;
		 $(self.wrapper).find("tbody").find("td").click(function(e){ 
		   var e=getEvent(e);   //跨浏览器获取事件对象
			  self.selectedDate=parseInt(e.target.innerHTML);      //设置所选日期
		   if(e.target.className!="siblingMonth"){ 	  //点击的是当前月 
			  self.date.setDate(self.selectedDate);	  //设置date对象的日期为所选日期   
			  if(self.selectedEle!=null)self.selectedEle.css("backgroundColor","white").css("color",self.selectedColor);//将前一个所选日期设置原来颜色
			  //如果点击的不是当前日期，执行下面if
			 if(!(self.date.getDate()==self.nowDate.getDate()&&self.date.getMonth()==self.nowDate.getMonth()&&self.date.getFullYear()==self.nowDate.getFullYear())){
				  self.selectedEle=$(e.target);    //获取所选日期的元素
				  self.selectedColor=self.selectedEle.css("color");//保存新的所选日期原来的字体颜色
				  self.selectedEle.css("backgroundColor","#ccc"); //所选日期变色
				  self.selectedEle.css("color","#000");
			 }
			 
		   }else{  //点击的是下个月或者上个月
			   //self.selectedEle.css("backgroundColor","white").css("color",self.selectedColor);//将前一个所选日期设置原来颜色
			   if(self.selectedDate<15){  //下个月，当选中的不是本月日期时，如何区分是上个月还是下个月
			   	/*注意：若先设置日期，再设置月份，则设置的是本月的日期，可能本月不包含这个日期;若先设置月份，
				再设置日期，则可能上个月或下个月不包含这日期，//比如选择5月31号，在六月份的面板中先设置日期为31，则日期变为7月1号（6月没有31号），再设置月份-1，实际日期为6月1号*/
				   self.date.setDate(1);  //这里先将日期设置为1号，再设置月份和选择的日期
				   self.date.setMonth(self.date.getMonth()+1);
				   self.date.setDate(self.selectedDate);
				   self.renderDate();
			   }else{            //上个月
				   self.date.setDate(1);
			       self.date.setMonth(self.date.getMonth()-1);
				   self.date.setDate(self.selectedDate);    //比如选择5月31号，在六月份的面板中先设置日期为31，则日期变为7月1号（6月没有31号），再设置月份-1，实际日期为6月1号
				   self.renderDate();
			   }		   
		   }
		  //点击1秒之后日历面板隐藏
		  if(timer)clearTimeout(timer);
		  var timer=setTimeout(function(){$(self.wrapper).find(".calendar").css("display","none");},1000);		
		})
	 }
 //点击向右箭头
	Calendar.prototype.rightArrowFn=function(){
		var self=this;
		$(self.wrapper).find(".right").click(function(){
		  self.selectedDate=1;    //默认选中1号
		  self.date.setMonth(self.date.getMonth()+1);//设置月份加1
		  self.date.setDate(self.selectedDate);
          self.renderDate();     //重新渲染日期
		})
	}
	//点击向左箭头
	Calendar.prototype.leftArrowFn=function(){
		var self=this;
		$(self.wrapper).find(".left").click(function(){
		  self.selectedDate=1;
		  self.date.setMonth(self.date.getMonth()-1);
		  self.date.setDate(self.selectedDate);
          self.renderDate();
		})
	}	
	//表单选择月份
	Calendar.prototype.monthSelect=function(){
		var self=this;
		var months=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
		var month_select=$(self.wrapper).find(".month");
		var mon;  //选择的月份，整数
		month_select.getElement(0).onchange=function(){        //添加表单数据改变的事件函数
			var month=month_select.getElement(0).value;
			for(var i=0;i<months.length;i++){
				if(months[i]==month){
					mon=i;
					break;
				}
			}
		  self.selectedDate=self.date.getDate();
		  self.date.setMonth(mon);
          self.renderDate();
		}
	}
	//表单选择年份
	Calendar.prototype.yearSelect=function(){
		var self=this;
		var year_select=$(self.wrapper).find(".year");
		var year;
		year_select.getElement(0).onchange=function(){
		var year=parseInt(year_select.getElement(0).value);
		  self.selectedDate=self.date.getDate();
		  self.date.setFullYear(year);
          self.renderDate();
		}
	}		
  //日历显示框	
	Calendar.prototype.calendarShow=function(){
		var self=this;
		var calShow=$(self.wrapper).find(".calendarShow");
		calShow.click(function(){
			if($(self.wrapper).find(".calendar").css("display")=="none"){ //点击显示，再点击则隐藏
				$(self.wrapper).find(".calendar").css("display","block");//显示日历面板
			}else{
				$(self.wrapper).find(".calendar").css("display","none");//隐藏日历面板
			}
			$(self.wrapper).find(".calendar").click(function(){
				calShow.html(self.date.getFullYear()+"-"+(self.date.getMonth()+1)+"-"+self.date.getDate());
			})
		}) 
	}	 
		 
	
	
	
	
