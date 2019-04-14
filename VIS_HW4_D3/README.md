<center>
    <h2>
        数据可视化 作业5 D3实践
    </h2>
    <h6> 徐佳怡 516021910396</h6>
</center>

在这次作业中，我利用svg作为画布，添加了一张动态表格以及三个控制表格展现内容的按钮。

这张动态表格是一张柱状图，它的总长是显示20个数据。点击 “+”，会在末尾添加一个元素，最前方减去一个元素；点击 “-”， 会在末尾减去一个元素，在最前方添加一个元素；点击刷新按钮，会重置数据值。

首先，我们需要引入d3库。

![1554817617731](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554817617731.png)

其次，创建svg画布，即在body中append svg 元素。

![1554817684571](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554817684571.png)

接下来，就是在svg画布上添加表格数据。使用.data()将初始数组一一对应的绑定到选择集上。

![1554817968133](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554817968133.png)

接下来，创建三个圆形按钮用于动态改变图表展示内容，并为其编写点击之后的效果函数。

![1554818014559](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554818014559.png)

![1554818023865](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554818023865.png)

![1554818032079](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554818032079.png)

![1554818087528](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554818087528.png)

![1554818094227](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554818094227.png)

![1554818104524](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554818104524.png)

为了方便识别这三个图标，添加svg text/image元素对circle元素进行标识。

![1554818156825](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554818156825.png)

![1554818163267](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554818163267.png)

![1554818169298](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554818169298.png)

以上步骤进行完后，本次作业的基本任务就完成了。

接下来是是一些美化操作。

为按钮添加鼠标移入移出的动态改变效果。

![1554818343067](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554818343067.png)

为柱状图的数据添加鼠标移入移出的动态改变效果。

![1554818264352](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1554818264352.png)

为了使text元素不干扰circle元素被点击的效果，我为text元素也添加了.onclick()函数（目前还没找到适合更简易的方法）。