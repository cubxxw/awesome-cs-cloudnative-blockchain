[toc]



😶‍🌫️go语言官方编程指南：[https://pkg.go.dev/std](https://pkg.go.dev/std)

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---

# 约瑟夫问题

```go
package main

import "fmt"

//约瑟夫问题

// Boy 定义小孩结构体
type Boy struct {
	no   int
	Next *Boy
}

//编写一个函数，创建单向的环形链表
//num :环形链表的元素个数
//*Boy :返回该环形链表的第一个小孩的指针

func CreateCircle(num int) *Boy {
	//创建一个空节点
	first := &Boy{}  //这个指针指向第一个元素
	curBoy := &Boy{} //这个指针指向

	//元素个数判断
	if num < 1 {
		fmt.Println("元素个数不能小于1")
		return first
	}

	//循环的构建这个链表
	for i := 1; i <= num; i++ {
		boy := &Boy{
			no: i,
		}

		//第一个小孩比较特殊
		if i == 1 {
			first = boy  //指针就不能动了，所以好需要一个辅助指针 curBoy
			curBoy = boy //帮忙的指针 curBoy
			//形成闭环
			curBoy.Next = first
		} else {
			//当前是1	新的2
			curBoy.Next = boy
			//curBoy向后面移动1位
			curBoy = boy
			//最后这个指向开头形成环
			curBoy.Next = first
		}
	}
	return first
}

// ShowCircle 显示环形单向链表
func ShowCircle(first *Boy) {
	//空链表判断
	if first == nil {
		fmt.Println("链表为空")
		return
	}

	//first是一个指针，我们还需要一个指针
	curBoy := first
	for {
		fmt.Printf("小孩的id=%d", curBoy.no)
		//当到达最后一个时候，退出
		if curBoy.Next == first {
			break
		}
		curBoy = curBoy.Next
	}
}

// first 头节点
// startNo 开始数数的位置
// stepNum 每次数几个,步长

func PlayGame(first *Boy, startNo int, stepNum int) {
	//1.空链表判断
	if first.Next == nil {
		fmt.Println("空的链表，没有小孩")
		return
	}

	//2.需要定义辅助指针，帮助我们删除元素
	tail := first //tail 尾巴，一开始他俩实在一起的
	//3.我们移动tail，让tail指向first的尾巴
	for {
		if tail.Next == first {
			break //此时移动到尾巴了
		}
		tail = tail.Next
	}

	//4.让first移动到startNo[后面我们删除元素，就以first为准]
	for i := 1; i <= startNo-1; i++ {
		//这两个标记都往下走
		first = first.Next
		tail = tail.Next
	}

	//5.开始数stepNum，然后就删除first当前所在的元素
	//删除一个元素的操作是这样的
	//a:先让first向下走一步，把这个需要删除的元素空出来
	// first = first.Next
	//b:让尾部tail的Next指向新的first,跳过空出来的元素，这样就把空出来的元素删除了
	//tail = first

	for {
		//这两个标记同时按照步长往下走，一步一步走，总移动stepNum-1的
		for i := 1; i <= stepNum-1; i++ {
			first = first.Next
			tail = tail.Next
		}
		fmt.Printf("编号%d的元素被剔除-->", first.no)
		//执行删除 a，b两步
		first = first.Next
		tail.Next = first

		//当只剩下一个元素的时候就退出
		//即 两个标记重合了，因为我们在前面让两个标记分开了
		if tail == first {
			break
		}
	}
	fmt.Printf("最后剔除的元素是%d", first.no)
}
func main() {
	first := CreateCircle(500)
	ShowCircle(first)
	fmt.Println()
	fmt.Println("显示结束")

	PlayGame(first, 20, 31)
	fmt.Println()

}

```

