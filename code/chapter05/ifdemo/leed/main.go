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
