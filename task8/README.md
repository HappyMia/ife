# 任务八：响应式网格（栅格化）布局
## Demo
[点击查看demo](https://happymia.github.io/ife/task8/index.html)
## 任务目的

使用 HTML 与 CSS 实现类似 BootStrap 的响应式 12 栏网格布局，根据屏幕宽度，元素占的栏数不同。
## 我的总结
### 效果图
![](http://7xrp04.com1.z0.glb.clouddn.com/task_1_8_1.png)
### 布局原理
采用媒体查询@media，针对不同的媒体类型定义不同的样式。<br/>
@media 可以针对不同的屏幕尺寸设置不同的样式，当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。<br/>
#### 媒体查询的CSS语法
  ```CSS
  @media mediaType and|not|only (media feature) {
     CSS code
  }
  ```
 你也可以针对不同的媒体使用不同 stylesheets :
 ```HTML
  <link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">
 ```
 mediaType:all：所有设备，screen：电脑屏幕，屏蔽电脑，智能手机等。print：打印机speech：屏幕阅读器等<br/>
 media feature：媒体查询的条件，比如（max-width：768px）
#### 元素设置
最外层一个盛放所以网格的div容器container，每个网格有一个外层div（outer），里面包含一个内层div（inner）；
```HTML
			<div class="outer col-md-4 ">
				<div class="inner"></div>
			</div>
```
  col-md-4:表示在中等屏幕以上占4列<br/>
  col-sm-6：小屏幕下占6列<br/>
  outer：宽度由所占的栏数指定，高度不设置，根据内层自适应。<br/>
  inner：高度固定，宽度由根据外层自适应。<br/>
#### box-sizing属性
box-sizing属性包含三个值，content-box(default),padding-box,border-box;
* content-box:border和padding不计算入width之内
* padding-box，padding计算入width内
* border-box，border和padding计算入width之内

#### 使用
* -webkit-box-sizing: 100px; // for ios-safari, android
* -moz-box-sizing: 100px;    //for firefox
* box-sizing: 100px;         //for others

