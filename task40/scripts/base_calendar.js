  function Calendar(element){
		  this.container=element;//日历的包含框
		  this.date=new Date();//创建一个当前日期对象
		  this.selectedDate=this.date.getDate();//选中的日期，初始化为当前日期		  
		  this.render();       //渲染当前月份	 
	  }
	 Calendar.prototype.render=function(){	
		this.container.innerHTML="<div id='calendar'></div>";
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
		 var month_select=$("#calendar .month").css("marginRight","20px");
		 var months=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
		 for(var i=0;i<12;i++){	
			 if(i==this.date.getMonth()){   //选中当前月份
				month_select.addHtml("<option selected='selected'>"+months[i]+"</option>");
			 }else{
			    month_select.addHtml("<option>"+months[i]+"</option>");
			 }
		 }
		 title.addHtml("<select class='year'></select>");
		 var year_select=$("#calendar .year");
		  for(var i=1900;i<2100;i++){	
			 if(i==this.date.getFullYear()){   //选中当前年份
				 year_select.addHtml("<option selected='selected'>"+i+"</option>");
			 }else{
				 year_select.addHtml("<option>"+i+"</option>");
			 }			
		 }
		 title.addHtml("<strong id='right' style='float:right'>-></strong>");

		 wrapper.addHtml("<table class='date'></table>");
		 var table=$("#calendar .date").css("textAlign","center");
		// alert(table.elements[0])
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
		 var dat= new Date(this.date);   //新建一个日期，与当前日期相同
		 dat.setDate(dat.getDate()-this.date.getDate()+1);//将新建的日期设置到本月1号
		 var FirDate=dat.getDate()-dat.getDay();//本月日历开头（周日）的日期，dat.getDay()获取本月1号是星期几
		 FirDate=(FirDate==1)?FirDate-7:FirDate; //如果开头日期正好是本月一号，则往前推一周；
		 dat.setDate(FirDate);  //将新建的日期设置到本月日历开头日期
		 for(var i=0;i<6;i++){
			tbody.addHtml("<tr></tr>");
			var tr=$("#calendar .date tbody tr").eq(i);
				for(var j=0;j<7;j++){
					/*
					下面这种写法是不对的，当FirDate时负值的时候，表示上一个月，eg：-2表示上一个月，-1表示上上个月
					FirDate=FirDate+1;
					dat1.setDate(FirDate);
					*/	
					//var str="<td style='width:50px;height:50px'>"+dat.getDate()+"</td>";
				   if(dat.getMonth()!==this.date.getMonth()){ //不是本月的日期颜色不同
					  tr.addHtml("<td class='siblingMonth' style='width:50px;height:50px;background:#fff;color:#A0A0A0'>"+dat.getDate()+"</td>");										
					}
					else if(dat.getDay()==6||dat.getDay()==0){   //周末日期是红色
					 tr.addHtml("<td style='width:50px;height:50px;background:#fff;color:red'>"+dat.getDate()+"</td>");					 
					}
					else{
					 tr.addHtml("<td style='width:50px;height:50px;background:#fff'>"+dat.getDate()+"</td>");		   
					}	
					dat.setDate(dat.getDate()+1); //这里日期加1不能用dat.getDate()++，不是一个变量
				}
		 }
	    this.dateSelected();
	    this.rightArrowFn();
	    this.leftArrowFn();
	 }
	Calendar.prototype.dateSelected=function(){
		var self=this;	
		var td=$("#calendar .date tbody td");
		//初始化选定日期为本月的当前日期
		for(var i=0;i<42;i++){
			var dateTemp=parseInt(td.getElement(i).innerHTML);
			if(dateTemp==self.selectedDate&&td.getElement(i).className!="siblingMonth"){   //本月的当前日期，不是上月或下月
				var selectedEle=$(td.getElement(i));
				var color=selectedEle.css("color");  //定义一个临时变量，保存所选日期之前的字体颜色
				selectedEle.css("backgroundColor","red").css("color","#fff");
			}
		}
      	 $("#calendar .date tbody td").click(function(e){ 
		       var e=getEvent(e);   //跨浏览器获取事件对象
			      selectedEle.css("backgroundColor","white").css("color",color);//将前一个所选日期设置原来颜色
				  self.selectedDate=parseInt(e.target.innerHTML);      //设置所选日期
			   if(e.target.className!="siblingMonth"){ 	      
			      selectedEle=$(e.target);
			      color=selectedEle.css("color");//保存新的所选日期原来的字体颜色
			      selectedEle.css("backgroundColor","red");
			      selectedEle.css("color","#fff");
			      
			   }else{
				   if(self.selectedDate<15){//下个月，当选中的不是本月日期时，如何区分是上个月还是下个月
					   self.date.setMonth(self.date.getMonth()+1);
					   self.render();
				   }else{            //上个月
					   self.date.setMonth(self.date.getMonth()-1);
					   self.render(); 
				   }		   
			   } 
		})
	} 
	Calendar.prototype.rightArrowFn=function(){
		var self=this;
		$("#calendar #right").click(function(){
		  self.selectedDate=1;
		  self.date.setMonth(self.date.getMonth()+1)
          self.render();
		})

	}
	Calendar.prototype.leftArrowFn=function(){
		var self=this;
		$("#calendar #left").click(function(){
			self.selectedDate=1;
		    self.date.setMonth(self.date.getMonth()-1)
          self.render();
		})
	}
				 
		 
		 
	 
	
	
	
