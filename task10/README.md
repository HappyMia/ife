# 任务十：Flexbox 布局练习
# Demo
[点击查看demo](https://happymia.github.io/ife/task10/index.html)

# 任务目的

学习如何flex进行布局，学习如何根据屏幕宽度调整布局策略。

需要实现的效果如效果图所示，调整浏览器宽度查看响应式效果

# 我的总结
### 设置容器为flex布局
```CSS
    .container {   //容器的设置
      display:flex;
      display:-webkit-flex;
      display:-moz-flex;
      display:-ms-flexbox;  //注意IE10的兼容
    }
```
容器的属性
      * flex-direction：row|row-reverse|column|column-reverse
      * flex-wrap  : wrap|nowrap|wrap-reverse
      * flex-flow  :前两个的简写
      * justify-content：flex-start（默认值）|左对齐|flex-end：右对齐|center： 居中|space-between：两端对齐，项目之间的间隔都相等。<br/>
                  |space-around|每个项目两侧的间隔相等。<br/>
      * align-items：flex-start：交叉轴的起点对齐。|flex-end：交叉轴的终点对齐。|center：交叉轴的中点对齐。也就以元素的中间为基准线对齐<br/>
                  |baseline: 项目的第一行文字的基线对齐。|stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。<br/>

      * align-content：多根轴线的对齐方式。
项目的属性

      * flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
      * flex-shrink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
      * flex-basis:定义了在分配多余空间之前，项目占据的主轴空间（main size）。
      * flex ：前三个的简写
      * align-self:允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性.
      * order：元素的排列顺序，数字，值越小越靠前
### IE10 flexbox的兼容
  * 伸缩容器 display:-ms-flexbox;	/*设置块级Flexbox容器*/
  * 伸缩项目（flex-items）
  * 伸缩方向（flex-direction）    -ms-flex-direction，值和非IE的相同
  * 伸缩项目自动换行：(flex-wrap)  -ms- flex-wrap
     值 （1）none（默认）：不换行。相当于非IE的nowrap<br/>
        （2）wrap：换行，第一行在上方。<br/>
        （3）wrap-reverse：换行，第一行在下方。<br/>
   * 主轴对齐方式（将空白区域分布到各个伸缩项目之间）：-ms-flex-pack
    值 start（默认值）：左对齐<br/>
        end：右对齐<br/>
       center： 居中<br/>
        justify：伸缩项目会平均地分布在行里。第一个伸缩项目一行中的最开始位置，最后一个伸缩项目在一行中最终点位置.相当于space-between
    * 侧轴对齐方式：-ms-flex-align，值：start，end，center，baseline，stretch
    * 设置伸缩项目的弹性：-ms-flex <br/>
        该属性可以设置为以下任何值，或者设置为 none。等同于将 -ms-flex 设置为 "0 0 auto"。
    * 伸缩项目显示顺序：-ms-flex-order


