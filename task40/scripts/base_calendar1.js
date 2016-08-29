  function Calendar(element){
		  this.container=element;//日历的包含框
		  this.date=new Date();//创建一个当前日期对象

		  this.render();       //渲染当前月份
	  }
	 Calendar.prototype.render=function(){
		var wrapper=this.container.addTag("<div id='calendar'></div>")//创建日历外框
		 .css("width","350px") 
		 .css("height","400px")
		 .css("textAlign","center")
		 .css("border","2px solid #ccc")
		 .css("font-family","'Microsoft Yahei'");
		 
		 
		 var title=wrapper.addTag('<div class="title"></div>') 
		 .css("width","330px") //创建日历的头
		 .css("height","20px")
		 .css("padding","10px")
		 .css("color","#fff")
		 .css("background","red");
		 
		 this.leftArrow=title.addTag("<strong class='left' style='float:left'><-</strong>")
		 .css("cursor","pointer");
		 var month=title.addTag("<select class='month' ></select>");
		 month.elements[0].autocomplete='off';
		 month.css("marginRight","20px");
		 month.autocomplete="off";
		 var months=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
		 for(var i=0;i<12;i++){	
			 if(i==this.date.getMonth()){   //选中当前月份，selected是属性，可以用.selected设置，不能用css设置
				month.addTag("<option selected='selected'>"+months[i]+"</option>");
			 }else{
			    month.addTag("<option>"+months[i]+"</option>");
			 }
		 }
		 var options=month.getEleByTagName("option");
		 options[this.date.getMonth()].selected="selected";

		var year_select= title.addTag("<select class='year'></select>");
		year_select.elements[0].autocomplete='off';
		  for(var i=1900;i<2100;i++){	
			//year_select.addTag("<option>"+i+"</option>");
			 if(i==this.date.getFullYear()){   //选中当前年份
		        // year_option.elements[0].selected="selected"
				 year_select.addTag("<option selected='selected'>"+i+"</option>");
			  }
			 else
			  {
				  year_select.addTag("<option>"+i+"</option>");
			  }
		 }
	     var options=year_select.getEleByTagName("option");
		 options[this.date.getFullYear()-parseInt(options[0].innerHTML)].selected="selected";
		 this.rightArrow = title.addTag("<strong class='right' style='float:right'>-></strong>")
		 .click(function(){
			alert("adf")
		})
		 .css("cursor","pointer");
	
		
		var table=wrapper.addTag("<table></table>");
		
		 var tHead=table.addTag("<thead></thead>");
		 var tr=tHead.addTag("<tr></tr>");
		 var days=["日","一","二","三","四","五","六",];
		 for(var i=0;i<7;i++){
			 var th=tr.addTag("<th></th>")
				 .css("width","50px")
				 .css("height","50px")
				 .html(days[i]);
			 if(i==0||i==6){
				 th.css("color","red"); 
			 }	 
		 }
		 var tbody=table.addTag("<tbody></tbody>");
		
		 
		// alert(this.date.getDate());
		 var dat= new Date(this.date);   //新建一个日期，与当前日期相同
		 dat.setDate(dat.getDate()-this.date.getDate()+1);//将新建的日期设置到本月1号
		 var FirDate=dat.getDate()-dat.getDay();//本月日历开头的日期，dat.getDay()获取本月1号是星期几
		 dat.setDate(FirDate);  //将新建的日期设置到本月日历开头日期
		 for(var i=0;i<6;i++){
			var tr=tbody.addTag("<tr></tr>");
			{
				for(var j=0;j<7;j++){
					var td=tr.addTag("<td></td>").css("width","50px")
				    .css("height","50px")
				    .css("background","#fff")
					.html(dat.getDate());
					/*
					下面这种写法是不对的，当FirDate时负值的时候，表示上一个月，eg：-2表示上一个月，-1表示上上个月
					FirDate=FirDate+1;
					dat1.setDate(FirDate);
					*/
					if(dat.getMonth()!==this.date.getMonth()){ //不是本月的日期颜色不同
						td.css("color","#A0A0A0");
					}
					else if(dat.getDay()==6||dat.getDay()==0){   //周末日期是红色
						td.css("color","red");
					}
					dat.setDate(dat.getDate()+1); //这里日期加1不能用dat.getDate()++，不是一个变量
				}
			}
		 }
		 $("td").css("backgroundColor","white").click(function(e){
			 $("tbody td").css("backgroundColor","white").css("color"," ");
						e.target.style.background="red";
						e.target.style.color="#fff";
					})
		
	    this.rightArrowFn();
	 }
	 
	Calendar.prototype.rightArrowFn=function(){

	}
	
