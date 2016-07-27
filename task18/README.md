# 任务十八：用javascript模拟队列
## demo
[点击查看demo](https://happymia.github.io/ife/task18/index.html)
## 任务描述

* [如图](http://7xrp04.com1.z0.glb.clouddn.com/task_2_18_1.jpg)，模拟一个队列，队列的每个元素是一个数字，初始队列为空
* 有一个input输入框，以及4个操作按钮
* 点击"左侧入"，将input中输入的数字从左侧插入队列中；
* 点击"右侧入"，将input中输入的数字从右侧插入队列中；
* 点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
* 点击"右侧出"，读取并删除队列又侧第一个元素，并弹窗显示元素中数值；
* 点击队列中任何一个元素，则该元素会被从队列中删除

## 我的总结
### 队列：先进后出
双向队列：允许在一端（队尾）进入插入，而在另一端（队头）进行删除的线性表<br>
数组对象的四个方法：push(),pop(),shift().unshift(),可以模拟一个双向队列。<br>

### trim()方法：
删除字符串前后空格,js中没有trim，VBjs中有这个函数，但是可以再js中使用，为了兼容IE,可以自己写一个trim函数<br>
```javascript
function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g,"");
}
```
### display:inline-block:在IE7以下不起作用
解决方案：<br>

第一种：专门为IE7写Hack<br>
```css
   display:inline-block;
   *display:inline;
   *zoom:1;
 ```

特别是 ZOOM:1 这个必须的<br>

第二种：<br>

```CSS
  .selector { display: inline-block }
  .selector { *display: inline }
```
注意这两个 display要先后放在两个CSS声明中才有效果，这是IE的一个经典bug，如果先定义了display:inline-block，然后再将 display设回inline或block，layout不会消失。不能写进一个声明中。

在添加删除事件的时候遇到一个bug，代码如下：
```javascript
//这里有一个bug，在当存在两个相同的元素时，点击后面那个，则删除的是前面那个数字
/* 	oQueue.onclick=function(evt){
		var e=evt||window.event;
		var target = e.target||e.srcElement;
		if(target.nodeName=="DIV"){ //如果点击了div元素，则执行
			var num=target.innerHTML;
			for(var i=0;i<result.length;i++){
				if(result[i]==num){
					result.splice(i,1); //从第i个开始，去掉1个元素
					renderQueue();
					break;
				}
			}	
		}
```
解决办法：在渲染DOM完毕的时候为每个元素删除事件。
