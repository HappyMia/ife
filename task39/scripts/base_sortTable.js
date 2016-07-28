 $().extend("createTable",function(rTitle,tContent){
	  function SortTable(element,rTitle,tContent){
		  this.element=element;
		  this.rTitle=rTitle;
		  this.cTitle=[];   //姓名，也就是第一列,初始化
		  this.tContent={}; //姓名成绩对象，初始化
		  this.getcTitle(); //获取姓名
		  this.gettContent(); //获取姓名成绩对象，主要是加入成绩总和项
	      this.render();  
		  this.freezeHeader();
	  }
	 SortTable.prototype.getcTitle=function(){
		 for(var key in tContent){
			 this.cTitle.push(key);
		 }
	 }
	 SortTable.prototype.gettContent=function(){  //在tContent中加入总和一项，并赋值给this.tContent
		  for(i=0;i<this.cTitle.length;i++){
			  var data=tContent[this.cTitle[i]];
			  var sum=0;
		   for(var j=0;j<data.length;j++){
			  sum+=data[j];
		   }
		  data.push(sum);
          tContent[this.cTitle[i]]=data;
		  }
        this.tContent=tContent;	  	 	 
	 }
	 SortTable.prototype.render=function(){     //动态渲染
	  var tableItem=[];
	  var th=[];
	  //渲染表头
	  th.push("<th>"+ this.rTitle[0]+"</th>");
	  for(var j=1;j< this.rTitle.length;j++){ //这里在创建div标签时，动态创建了id，id中带有j，在排序中用得到j
		  th.push("<th>"+ this.rTitle[j]+"<div class='sort_button'><div class='up_arrow' id='up_arrow"+j+"'></div><div class='down_arrow' id='down_arrow"+j+"'></div></div></th>");
	  }
      var thead="<thead id='tabHead'><tr>"+th.join("")+"</tr></thead>";	  
	  tableItem.push(thead);
	  tb=[];
	  for(var j=0;j< this.cTitle.length;j++){  //遍历每一列，也就是姓名
		  var td=[];
		   td.push("<td>"+ this.cTitle[j]+"</td>");
		  var data= this.tContent[ this.cTitle[j]];
		  for(var k=0;k<data.length;k++){      //遍历每个人的成绩
			  td.push("<td>"+data[k]+"</td>");
		  }
		  tr="<tr>"+td.join("")+"</tr>";
		  tb.push(tr);
	  }
	  var tbody="<tbody id='tabBody'>"+tb.join("")+"</tbody>";	
      tableItem.push(tbody);	  
	  this.element.innerHTML=tableItem.join("");  
	  this.addSort();                       //为每个按钮添加排序事件
	 }
	 SortTable.prototype.addSort=function(){	
	   var _this=this;
		$(".up_arrow").click(function(e){                     //click是base.js中的函数，为每个元素添加click事件
		 var item= parseInt(e.target.id.substring(e.target.id.length-1))-1;//item代表第几个按钮按下，从0开始
			_this.cTitle.sort(function(a,b){             //sort的参数是一个函数，表示排序规则
				return _this.tContent[a][item]-_this.tContent[b][item]; //升序，按照第item个成绩升序
			});
          _this.render();
		});
		$(".down_arrow").click(function(e){
		 var item= parseInt(e.target.id.substring(e.target.id.length-1))-1;
			_this.cTitle.sort(function(a,b){
				return -(_this.tContent[a][item]-_this.tContent[b][item]); //降序
			});
          _this.render();
		});
		this.freezeHeader();//排序完了再添加冻结表头事件
	 }
    SortTable.prototype.freezeHeader=function(){
		var table=$().getId("sortTable");
		var thead=$().getId("tabHead");
		var top=parseInt(getStyle(table,"top"));//获取表格的top值
		var marginTop=parseInt(getStyle(table,"marginTop"));//获取表格的margin-top值
		var offTop=marginTop+top;           //表格距离视口顶部的值
		var toffsetH=table.offsetHeight;    //表格本身的高度
		
		addEvent(window,"scroll",function(){
			if(document.documentElement.scrollTop>(offTop+toffsetH)){ //表格滚出视口隐藏表头
				//thead.style.display="none";	  //注意display和visibility的区别
				thead.style.visibility="hidden";
			}
			else if(document.documentElement.scrollTop>offTop)  //表格滚到视口顶部固定表头
			{
			 //thead.style.display="block";
			 thead.style.visibility="visible";   //显示表头，固定表头，并将表头设置到视口顶部位置
             thead.style.position="fixed";			 
			 thead.style.top=0;
			 thead.style.marginTop=0;
			}  else {                            //其他情况下就恢复默认值
			// thead.style.display=null;	   
			 thead.style.visibility="visible";	
			 thead.style.position="relative";
			 table.style.top=top+"px";
			 table.style.marginTop=marginTop+"px";
			}
		});
			
		
	}
	 for(var i=0;i<this.elements.length;i++){     //new必须放在最后
		  new SortTable(this.elements[i],rTitle,tContent);
	  }
	
 })