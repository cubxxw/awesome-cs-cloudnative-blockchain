package main

import (
	"fmt"
)

//定义一个heronode
type HeroNode struct {
	no       int
	name     string
	nickname string
	next     *HeroNode //表示指向下一个节点
}

//给链表插入节点
/*尾插法 ： 第一种插入方式,在单链表的最后加入*/
func InsertHerNode(head *HeroNode, newHeroNode *HeroNode) {
	//思路
	//1. 先找到该链表最后的这个节点
	//2. 创建一个辅助接点temp
	temp := head
	for {
		if temp.next == nil { //如果成立表示找到最后一个位置
			break
		}
		temp = temp.next //让temp不断地指向下一个节点
	}

	//3. 将newHernNode加入到链表的最后
	temp.next = newHeroNode
}
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
		return
	} else {
		newHeroNode.next = temp.next
		temp.next = newHeroNode
	}

}

//显示链表
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

//删除节点
func DelHerNode(head *HeroNode, id int) {
	//id ：删除的节点
	temp := head
	var flag bool
	for {
		//找到要输出的结点
		if temp.next == nil {
			//说明没有找到
			break
		} else if temp.next.no == id {
			//相等的话找到了
			flag = true
			break
		}
		temp = temp.next
	}
	if flag {
		//找到，删除
		temp.next = temp.next.next
	} else {
		fmt.Println("要删除的id不存在")
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
	InsertHerNode(head, hero1) //传入头结点和新节点
	InsertHerNode(head, hero2) //传入头结点和新节点
	InsertHerNode(head, hero3) //传入头结点和新节点
	ListHeroNode(head)         //显示
	fmt.Println("测试--------2----------")
	//3. 加入测试
	InsertHerNode2(head, hero2) //传入头结点和新节点
	InsertHerNode2(head, hero1) //传入头结点和新节点
	InsertHerNode2(head, hero3) //传入头结点和新节点
	ListHeroNode(head)          //显示
	fmt.Println("测试--------删除----------")

	//4. 删除
	DelHerNode(head, 2)
	ListHeroNode(head) //显示
}
