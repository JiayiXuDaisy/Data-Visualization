# Homework 2

<h4>
HTML & DOM操作: 实现一个网页笔记本
</h4>
徐佳怡    516021910396

##### 实现增添笔记：

创建\<ul\>类型的变量 _list_,

每次点击“Save”按钮，调用 _saveBtn.onlick_ 函数，为 _list_ 变量增添一个子节点 _listItem_, 即增添一条笔记。每个_listItem_ 包含一个checkbox子节点，两个个\<input\> text 类型子节点。  

##### 实现复选框全选：

每次点击“全选”按钮，调用 _selectAllBtn.onclick_ 函数。检测当前是否已经全选，若已经全选，变成所有复选框都没被选中，若没有全选，则变成全选。 

##### 删除选中笔记：

每次点击”删除“按钮，调用 _delNum.onclick_ 函数。通过 _getElementsByName()_( 找到所有复选框，检查复选框是否被选中，被选中的话就删除相应的 _listItem_。

这里有一个易错点。我们通过 _getElementsByName()_ 找到的第 _i_ 复选框对应的是 _list_ 的第 _i+1_ 个子节点。

##### 显示选中数量：

每次点击checkbox复选框，调用它对应的 _onclick_ 函数。检测复选框被选状态，统计被选复选框数量。通过_.innerHTML_ 改变删除按钮的文本显示。

同时，需要在点击全选，删除按钮的时候也调用这个函数。

我们也可以在body中通过onclick调用该统计函数，但是造成了效率浪费。





