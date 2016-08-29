$(function(){
	var box=document.getElementById("box");
    var select= document.createElement("select");
	select.innerHTML="";
	for(var i=1900;i<2100;i++){
		
		if(i==2016){
			select.innerHTML+="<option selected='elected'>"+i+"</option>"
		}else{
			select.innerHTML+="<option>"+i+"</option>"
		}
	}
	box.appendChild(select)
	
	
	
})