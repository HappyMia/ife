#任务四：定位和居中问题
##Demo
[点击查看demo](https://happymia.github.io/ife/task4/index.html)
##任务目标

    实践HTML/CSS布局方式
    深入了解position等CSS属性

##任务描述

    灰色div元素水平垂直居中，有两个四分之一圆位于其左上角和右下角。
    
##我的总结
1.定位问题：绝对定位，position：absolute，绝对定位元素的表现是脱离文档流，并且不占据空间，相对于其包含框进行绝对定位，
绝对定位的元素可以设置left，top等属性。
<br/>
相对定位：position：relative，相对定位的元素还属于文档流的一部分，并且占据空间，通过设置top，left等值可以使其获得一定的偏移。
<br/>
position：fixed，表现相当于absolute，但是相对于视窗本身定位。
<br/>
position：static，元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分，
行内元素则会创建一个或多个行框，置于其父元素中。
<br/>
2.本例中外框灰色div绝对定位，里面的两个四分之一圆也是绝对定位，不过他们相对于灰色div定位。

3.居中问题：
<br/>
  外框居中，可以通过设置
  ```CSS
        margin:auto;
    	top: 0; 
    	left: 0;
    	bottom: 0;
    	right: 0; 
  ```
  <br/>
    代码关键：
 
    （1）margin设为自动；
    
    （2）四个方向的偏移为0；
 
    
4.半径为50px的四分之一圆的生成：

    （1）先生成50px的正方形，
    
    （2）设置border-bottom-right-radius:50px;
    
  另一种方法：设置父元素overflow：hidden，生成一个半径为50的整个圆，然后设置left和top为-50px。
  
5.另一种布局方法，Flexbox布局实现

   在div外面在加一个div（wrapper）将其包含起来
   
      父元素中：display : flex;
      
      子元素中：margin : auto;
      
      或者：
      
      父元素：display: -webkit-flex;
      
              display: flex;
              
              justify-content:center;
              
              align-items:center; 
   
