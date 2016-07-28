$(function(){
	  var tName=["姓名","语文","数学","英语","总分"];
	  var tContent={"小明": $().randomInt(3,20,100),
			    "小红": $().randomInt(3,20,100),
			    "小芳": $().randomInt(3,20,100),
			    "小亮": $().randomInt(3,20,100),
			    "小坤": $().randomInt(3,20,100),
			    "小a": $().randomInt(3,20,100),
			    "小b": $().randomInt(3,20,100),
			    "小c": $().randomInt(3,20,100),
			    "小d": $().randomInt(3,20,100),
			    "小e": $().randomInt(3,20,100),
			    "小敏": $().randomInt(3,20,100)
	   };
   $("#sortTable").createTable(tName,tContent);
});