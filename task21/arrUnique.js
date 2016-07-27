//数组去重三种方法
var array = [1,2,3,"2",1,1,{name:"lm"},{name:"lm"},{name:"m"}];
function arrUnique(arr){
	var result = [];
	for(var i=0;i<arr.length;i++){
		if(result.indexOf(arr[i]) == -1){
			result.push(arr[i]);
		}
	}
	return result;
}
unique = arrUnique(array);
alert(unique);
//缺点：无法区分重复的对象
function arrUnique2(arr){
	var result = [];
	var hash = {};
	// for (var i = 0, elem; (elem = arr[i]) != null; i++) {  //去重，用一个hashtable的结构记录已有的元素
	 for (var i = 0;i<arr.length; i++) { 
           var elem = arr[i]；
			if (!hash[elem]) {
				result.push(elem);
				hash[elem] = true;
			}
		}
       return result;
}
unique2 = arrUnique2(array);
alert(unique2);
//缺点：无法区分1和"1",不重复的对象也过滤掉
function arrUnique3(arr){
	var result = [];
	arr.sort(function(a,b){return a-b;})
	 for (var i = 0;i<arr.length; i++) { 
			if(arr[i] !== arr[i+1]) {
				result.push(arr[i]);
			}
		}
       return result;
}
unique3 = arrUnique3(array);
alert(unique3);
//缺点：排序后数组顺序打乱，只能针对元素是Number类型的数组
