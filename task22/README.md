# 任务二十二 二叉树的遍历

[demo](https://happymia.github.io/ife/task22/index.html)
## 任务描述

* 参考[示例图](http://7xrp04.com1.z0.glb.clouddn.com/task_2_22_1.jpg)，在页面中展现一颗二叉树的结构
* 提供一个按钮，显示开始遍历，点击后，以动画的形式呈现遍历的过程
* 二叉树的遍历算法和方式自定，前序中序后序皆可，但推荐可以提供多种算法的展示（增加多个按钮，每个按钮对应不同的算法）
* 当前被遍历到的节点做一个特殊显示（比如不同的颜色）
* 每隔一段时间（500ms，1s等时间自定）再遍历下一个节点

## 我的总结

二叉树的遍历方法：
* 深度优先：从初始访问结点触发，先访问该结点的第一个邻居节点，然后再一这个邻居节点为初始访问结点，访问它的第一个邻居节点。<br>
总结起来可以这样说：每次都在访问完当前结点后首先访问当前结点的第一个邻接结点。
* 前序遍历：先访问根结点，再前序遍历左子树，最后前序遍历右子树。 
* 中序遍历：先中序遍历左子树，再访问根节点，最后中序遍历右子树。
* 后序遍历：从左到右先叶子后结点的方式遍历访问左右子树，最后访问根结点。
* 按层遍历：又称广度优先，宽度优先遍历，从树的第一层（根结点），从上而下逐层遍历，同一层中，从左到右逐个结点访问。<br>
前序遍历，中序遍历，后序遍历是深度优先遍历的特例。


