# 任务六：通过HTML及CSS模拟报纸排版
## Demo
[点击查看Demo](https://happymia.github.io/ife/task6/index.html)
## 任务描述

* 参考 PDS设计稿，实现页面开发，要求实现效果与样例基本一致
* 页面中的各字体大小，内外边距等可参看 标注图（点击查看）
* 页面宽度固定（定宽）
## 我的总结
页面中的各个元素大小固定，主要练习CSS中的字体、背景、颜色等属性的设置进一步，练习CSS布局

### 背影颜色透明度的设置
```CSS
  opacity:0.4;
  filter:Alpha(opacity==40);  IE
```
### 清除浮动：在浮动的元素后面插入一个空的块级元素，清除两边的浮动
```CSS
.section2:after{
	content:"";
	display:block;
	clear:both;
}
```
这里的布局方式主要是用了浮动加外边距，可使用float布局+position
