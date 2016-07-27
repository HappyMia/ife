# 任务十九：冒泡法排序可视化
## Demo
[demo](https://happymia.github.io/ife/task19/index.html)
## 任务描述

* 基于任务十八
* 限制输入的数字在10-100
* 队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
* 队列展现方式变化[如图](http://7xrp04.com1.z0.glb.clouddn.com/task_2_19_1.jpg),直接用高度表示数字大小
* 实现一个简单的排序功能，如冒泡排序（不限制具体算法），用可视化的方法表达出来，参考见下方参考资料

## 我的总结
 本次任务基于任务十八的队列模拟，实现冒泡法排序的可视化。<br>
 可以随机生成40个数据进行排序，不必每次都输入数据可以通过下拉列表选择排序的速度<br>
 
### 冒泡法排序的思想：
 比较任何两个相邻的项，如果第一个比第二个大，则交换它们。小的元素项向上移动到正确的顺序，就像气泡升至表面一样，或者大的元素向下知道移动到正确位置。
 冒泡排序的时间复杂度为 O(n^2)
 
### 可视化的思想：
 [task19.js](https://github.com/HappyMia/ife/blob/master/task19/task19.js):利用计时器实现,本质就是每比较一次（可能交换数据也可能不交换）就渲染一次，渲染完后延时一会再进行下一次比较<br>
 [task19_2.js](https://github.com/HappyMia/ife/blob/master/task19/task19_2.js):把每一次交换之后的数组保存起来，最后再把保存的每一个数组依次渲染出来