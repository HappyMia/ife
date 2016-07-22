# 任务十二：学习CSS 3的新特性
## demo
[点击查看demo](https://happymia.github.io/ife/task12/index.html)
## 任务描述

* 实现 [示例图](http://7xrp04.com1.z0.glb.clouddn.com/task_1_12_1.jpg)中的几个例子
* 实现单双行列不同颜色，且前三行特殊表示的表格
* 实现正常状态和focus状态宽度不一致的input文本输入框，且鼠标焦点进入输入框时，宽度的变化以动画呈现
* 不使用JavaScript，实现一个Banner图轮流播放的效果，且点击右下角的1，2，3可以切换到对应Banner图片

## 我的总结
本次任务主要练习了css3的几个新特性：
### transition：是一个简写属性，用于设置四个过渡属性：
* transition-property：需要过度的属性
* transition-duration：持续时间，必须设置
* transition-timing-function：过渡效果的速度曲线，可选
* transition-delay：延时多少时间开始过度

### keyframes：创建动画在动画过程中，能够多次改变这套 CSS 样式。
### animation 属性是一个简写属性，用于设置六个动画属性：
* animation-name	规定需要绑定到选择器的 keyframe 名称。。
* animation-duration	规定完成动画所花费的时间，以秒或毫秒计。
* animation-timing-function	规定动画的速度曲线。
* animation-delay	规定在动画开始之前的延迟。
* animation-iteration-count	规定动画应该播放的次数。
* animation-direction	规定是否应该轮流反向播放动画。

### z-index 
当绝对定位的三个div元素在一个位置时，默认div3在最上面，div1在最下面，可通过z-index：设置z轴方向的排列位置
