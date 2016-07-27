# 任务二十一:Tag输入和兴趣爱好输入
[demo](https://happymia.github.io/ife/task21/index.html)
## 任务描述

* 基于任务20，将任务20的代码进行抽象、封装，然后在此基础上实现如图中的两个需求：Tag输入和兴趣爱好输入
* 如[示例图](http://7xrp04.com1.z0.glb.clouddn.com/task_2_21_1.jpg)上方，实现一个tag输入框
* 要求遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
* Tag不能有重复的，遇到重复输入的Tag，自动忽视。
* 每个Tag请做trim处理
* 最多允许10个Tag，多于10个时，按照录入的先后顺序，把最前面的删掉
* 当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
* 如示例图下方，实现一个兴趣爱好输入的功能
* 通过一个Textarea进行兴趣爱好的输入，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔。
* 当点击“确认兴趣爱好”的按钮时，将textarea中的输入按照你设定的间隔符，拆解成一个个的爱好，显示在textarea下方
* 爱好不能重复，所以在下方呈现前，需要做一个去重
* 每个爱好内容需要做trim处理
* 最多允许10个兴趣爱好，多于10个时，按照录入的先后顺序，把最前面的删掉

## 我的总结
本次任务用到了两种数组去重: <br>
一种是判断已知数组中是否有某个元素，如果没有则将该元素添加导数组中，否则忽略；<br>
判断方法：利用数组的indexof方法，如果等于-1则不存该项。<br>
tags.indexOf(inputString) == -1<br>
给定拥有重复元素数组的去重：<br>
用一个hashtable的结构记录已有的元素，js中用对象来模拟，让数组中的元素成为hashtable的属性。判断时，如果不存在该元素加入数组，并把<br>
该元素设成hashtable的属性，并把该属性的值设true。<br>
```javascript
function arrUnique(arr){
	var result = [];
	var hash = {};
 //去重，用一个hashtable的结构记录已有的元素
	 for (var i = 0;i<arr.length; i++) { 
      var elem = arr[i]；
			if (!hash[elem]) {
				result.push(elem);
				hash[elem] = true;
			}
		}
       return result;
}
```
