😶‍🌫️go语言官方编程指南：[https://golang.org/](https://golang.org/)  

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---



[toc]

# 😶‍🌫️go语言官方编程指南：[https://golang.org/](https://golang.org/)  

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---



[toc]

# Go语言数据结构双向链表和循环链表

> 单向链表只能从头先后查询，但是双向链表是可以反向的，提高的效率

**代码 – 删除**

```go
func DelHerNode(head *HeroNode, id int) {
	temp := head
	flag := false
	//找到要删除结点的no，和temp的下一个结点的no比较
	for {
		if temp.next == nil {//说明到链表的最后
			break
		} else if temp.next.no == id {
			//说明我们找到了.
			flag = true
			break
		}
		temp = temp.next
	}
	if flag {//找到, 删除
		temp.next = temp.next.next //ok
		if temp.next != nil {
			temp.next.pre = temp 
		}
	} else {
		fmt.Println("sorry, 要删除的id不存在")
	}
}
```



#### 全代码

```go
package main

import (
	"fmt"
)

//定义一个heronode
type HeroNode struct {
	no       int
	name     string
	nickname string

	pre  *HeroNode //表示指向前一个结点
	next *HeroNode //表示指向下一个节点
}

//给双向链表插入节点 -- 双向链表
// 顺序很重要 --
func InsertHerNode2(head *HeroNode, newHeroNode *HeroNode) {
	//思路
	//1. 找到适当的节点位置
	//2. 创建一个辅助接点temp
	temp := head
	var flag bool
	for {
		//让插入结点的no和temp的下一个节点的no进行比较
		if temp.next == nil {
			//说明最末尾，直接插入到尾部
			break
		} else if temp.next.no > newHeroNode.no {
			//条件成立，说明这个newHeroNode插入到temp后面
			break //跳出for循环  直接插入
		} else if temp.next.no == newHeroNode.no {
			//相等的话我们提醒不允许插入这个id，因为已经有了
			fmt.Println("有相同的节点，那么不可以插入")
			flag = true
			break
		}
		temp = temp.next

	}
	if flag {
		//表示此时这个相等
		fmt.Println("对不起，已经存在", newHeroNode.no)
		return
	} else {
		newHeroNode.next = temp.next
		newHeroNode.pre = temp //ok
		//此时单项结点实现了
		//注意顺序很重要
		if temp.next != nil {
			temp.next.pre = newHeroNode //ok
		}

		temp.next = newHeroNode
	}

}

//显示链表
//仍然使用单项链表显示方式
func ListHeroNode(head *HeroNode) {
	//注意：一定要给头结点
	//先判断该链表是否为一个空链表
	temp := head
	if temp.next == nil {
		fmt.Println("空链表无法显示")
		return
	}
	//遍历
	for {
		// if temp.next = nil{
		// 	break
		// }
		fmt.Println("节点信息如下:"+"[",
			temp.next.no, temp.next.name, temp.next.nickname, "]===>")

		//判断是否到链表最后
		// if temp.next.next == nil{
		// 	break
		// }      !!!!报错无限循环
		temp = temp.next
		if temp.next == nil {
			break
		}
	}
}

//将双向链表逆序打印出来
func ListHeroNode2(head *HeroNode) {
	//注意：一定要给头结点
	//先判断该链表是否为一个空链表
	temp := head

	//判断空链表
	if temp.next == nil {
		fmt.Println("空链表无法显示")
		return
	}

	//让temp定位到双向链表的最后节点
	for {
		if temp.next == nil {
			break
		}
		temp = temp.next //否则指向下一个结点
	}

	//此时已经是最后结点了
	//遍历
	for {
		fmt.Println("双向链表反向打出节点信息如下:"+"[",
			temp.no, temp.name, temp.nickname, "]===>")

		//判断是否到了表头
		temp = temp.pre

		if temp.pre == nil {
			break
		}
	}
}
func DelHerNode(head *HeroNode, id int) {
	temp := head
	flag := false
	//找到要删除结点的no，和temp的下一个结点的no比较
	for {
		if temp.next == nil { //说明到链表的最后
			break
		} else if temp.next.no == id {
			//说明我们找到了.
			flag = true
			break
		}
		temp = temp.next
	}
	if flag { //找到, 删除
		temp.next = temp.next.next //ok
		if temp.next != nil {
			temp.next.pre = temp
		}
	} else {
		fmt.Println("sorry, 要删除的id不存在")
	}
}

func main() {
	//初始化 创建一个头结点
	head := &HeroNode{} //给默认值
	fmt.Println("head = ", head)

	//创建一个新的节点
	hero1 := &HeroNode{
		no:       1,
		name:     "宋江",
		nickname: "及时雨",
	}
	hero2 := &HeroNode{
		no:       2,
		name:     "吴用",
		nickname: "呼风唤雨",
	}
	hero3 := &HeroNode{
		no:       2,
		name:     "吴用3",
		nickname: "呼风唤雨3",
	}
	fmt.Println("hero1 = ", hero1)
	fmt.Println("hero2 = ", hero2)
	fmt.Println("hero3 = ", hero3)
	fmt.Println("测试--------1----------")

	//3. 加入测试
	InsertHerNode2(head, hero2) //传入头结点和新节点
	InsertHerNode2(head, hero1) //传入头结点和新节点
	InsertHerNode2(head, hero3) //传入头结点和新节点
	ListHeroNode(head)          //显示
	ListHeroNode2(head)         //显示
	fmt.Println("测试--------删除----------")

	//4. 删除
	DelHerNode(head, 2)
	ListHeroNode(head) //显示

}

```



**编译：**

```
PS C:\Users\smile\Desktop\区块链\code\chapter05\ifelsedemo> go run .\main.go
head =  &{0   <nil> <nil>}
hero1 =  &{1 宋江 及时雨 <nil> <nil>}
hero2 =  &{2 吴用 呼风唤雨 <nil> <nil>}
hero3 =  &{2 吴用3 呼风唤雨3 <nil> <nil>}
测试--------1----------
有相同的节点，那么不可以插入
对不起，已经存在 2
节点信息如下:[ 1 宋江 及时雨 ]===>
节点信息如下:[ 2 吴用 呼风唤雨 ]===>
双向链表反向打出节点信息如下:[ 2 吴用 呼风唤雨 ]===>
双向链表反向打出节点信息如下:[ 1 宋江 及时雨 ]===>
测试--------删除----------
节点信息如下:[ 1 宋江 及时雨 ]===>
```





## Go语言环形链表

**插入**

```go
func InsertNode(head *CatNode, newNode *CatNode) {
	//判断是否为第一
	if head.next == nil {
		head.no = newNode.no
		head.name = newNode.name
		//注意：一个结点也可以形成环状的
		head.next = head //形成一个环状
		//注意不可以是·head.next = newNode,因为head本身有一个空间
		fmt.Println("编号为", head.no, "的结点加入")
		return
	}
	//此时不是在第一位    --   使用·临时变量找到最后的结点
	temp := head
	for {
		if temp.next == head {
			//遍历到头结点，说明已经找到了
			break
		}
		temp = temp.next
	}
	//加入到环状链表中
	temp.next = newNode.next
	newNode.next = head

}
```



**打印环形链表**

```go
//输出    -- 需要头结点
func show(head *CatNode) {
	temp := head
	fmt.Println("环形链表的情况如下:")
	if temp.next == nil {
		//空链表
		fmt.Println("是一个空链表")
	}
	for {
		fmt.Println("当前节点的信息为 = ", temp, "no = ", temp.no, "name=", temp.name, "==>>")
		if temp.next == head {
			//说明到队头
			break
		}
		temp = temp.next
	}
}
```



**删除环形链表结点**

```go
//环形链表的删除
func del(head *CatNode, id int) {
	temp := head
	helper := head

	//如果是空结点
	if temp == nil {
		fmt.Println("这是一个空的环形链表无法删除")
		return
	}

	//如果是一个结点
	if temp.next == head {
		temp.next = nil
	}

	//如果是两个以上的结点
	/*让helper指向环形链表的最后*/
	for {
		if temp.next == head {
			//找到了最后,说明比较到最后,但是最后没有比较
			break
		}
		if temp.no == id {
			//找到  -- 可以直接删除
			//temp.next == nil
		}
		temp = temp.next        //移动和比较
		helper = helper.next    // 移动  一旦找到要删除的结点
		helper.next = temp.next //删除结点
	}
}
func main() {
	//初始化头结点（环形量表1)
	head := &CatNode{}

	//创建
	cat1 := &CatNode{
		no:   1,
		name: "tom",
	}
	fmt.Println("cat1.next = ", cat1.next)
	cat2 := &CatNode{2, "王五", nil}
	cat3 := &CatNode{3, "张三", nil}
	cat4 := &CatNode{4, "李四", nil}
	cat5 := &CatNode{2, "牛六", nil}

	InsertNode(head, cat1) //添加
	InsertNode(head, cat2) //添加
	InsertNode(head, cat3) //添加
	InsertNode(head, cat4) //添加
	InsertNode(head, cat5) //添加
	show(head)             //输出
	//删除操作
	var a int
	fmt.Println("请选择删除的模式和输出的对象")
	fmt.Scanln(&a)
	del(head, a)
	show(head) //输出
}
```





### 全代码

```go
package main

import (
	"fmt"
)

//定义结构体
type CatNode struct {
	no   int //定义编号
	name string
	next *CatNode
}

func InsertNode(head *CatNode, newNode *CatNode) {
	//判断是否为第一
	if head.next == nil {
		head.no = newNode.no
		head.name = newNode.name
		//注意：一个结点也可以形成环状的
		head.next = head //形成一个环状
		//注意不可以是·head.next = newNode,因为head本身有一个空间
		fmt.Println("编号为", head.no, "的结点加入")
		return
	}
	//此时不是在第一位    --   使用·临时变量找到最后的结点
	temp := head
	for {
		if temp.next == head {
			//遍历到头结点，说明已经找到了
			break
		}
		temp = temp.next
	}
	//加入到环状链表中
	temp.next = newNode.next
	newNode.next = head

}

//输出    -- 需要头结点
func show(head *CatNode) {
	temp := head
	fmt.Println("环形链表的情况如下:")
	if temp.next == nil {
		//空链表
		fmt.Println("是一个空链表")
		return
	}
	for {
		fmt.Println("当前节点的信息为 = ", temp, "no = ", temp.no, "name=", temp.name, "==>>")
		if temp.next == head {
			//说明到队头
			break
		}
		temp = temp.next //后移
	}
}

//环形链表的删除
func del(head *CatNode, id int) {
	temp := head
	helper := head

	//如果是空结点
	if temp == nil {
		fmt.Println("这是一个空的环形链表无法删除")
		return
	}

	//如果是一个结点
	if temp.next == head {
		temp.next = nil
	}

	//如果是两个以上的结点
	/*让helper指向环形链表的最后*/
	for {
		if temp.next == head {
			//找到了最后,说明比较到最后,但是最后没有比较
			break
		}
		if temp.no == id {
			//找到  -- 可以直接删除
			//temp.next == nil
		}
		temp = temp.next        //移动和比较
		helper = helper.next    // 移动  一旦找到要删除的结点
		helper.next = temp.next //删除结点
	}
}
func main() {
	//初始化头结点（环形量表1)
	head := &CatNode{}

	//创建
	cat1 := &CatNode{
		no:   1,
		name: "tom",
	}
	fmt.Println("cat1.next = ", cat1.next)
	cat2 := &CatNode{2, "王五", nil}
	cat3 := &CatNode{3, "张三", nil}
	cat4 := &CatNode{4, "李四", nil}
	cat5 := &CatNode{2, "牛六", nil}

	InsertNode(head, cat1) //添加
	InsertNode(head, cat2) //添加
	InsertNode(head, cat3) //添加
	InsertNode(head, cat4) //添加
	InsertNode(head, cat5) //添加
	show(head)             //输出
	//删除操作
	var a int
	fmt.Println("请选择删除的模式和输出的对象")
	fmt.Scanln(&a)
	del(head, a)
	show(head) //输出
}

```

