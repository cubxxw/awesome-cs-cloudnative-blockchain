😶‍🌫️go语言官方编程指南：[https://golang.org/](https://golang.org/)  

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---



[toc]

# Go语言数据结构链表

**一般来说，为了比较好的对单链表进行增删改查操作，我们都会给它设置一个头结点，头结点作用主要是用来标识链表头**

> 使用带头结点的**单向链表**实现水浒英雄排行榜管理

```go
package main
import (
	"fmt"
)

//定义一个heronode
type HeroNode struct{
	no int 
	name string
	nickname string 
	next *HeroNode     //表示指向下一个节点
}

//给链表插入节点
/*尾插法 ： 第一种插入方式,在单链表的最后加入*/
func InsertHerNode(head *HeroNode,newHeroNode *HeroNode) {
	//思路
	//1. 先找到该链表最后的这个节点
	//2. 创建一个辅助接点temp
	temp := head
	for{
		if temp.next == nil{  //如果成立表示找到最后一个位置
			break
		}
		temp = temp.next    //让temp不断地指向下一个节点
	}

	//3. 将newHernNode加入到链表的最后
	temp.next = newHeroNode 
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
	for{
		// if temp.next = nil{
		// 	break
		// }
		fmt.Println("节点信息如下:"+"[",
		temp.next.no,temp.next.name,temp.next.nickname,"]===>")
		
		//判断是否到链表最后
		// if temp.next.next == nil{
		// 	break
		// }      !!!!报错无限循环
		temp = temp.next 
		if temp.next == nil{
			break
		}
	} 
}

func main(){
	//初始化 创建一个头结点
	head := & HeroNode{}  //给默认值
	fmt.Println("head = ",head)

	//创建一个新的节点
	hero1 := &HeroNode{
		no : 1,
		name : "宋江",
		nickname : "及时雨",
	}
	hero2 := &HeroNode{
		no : 2,
		name : "吴用",
		nickname : "呼风唤雨",
	}
	fmt.Println("hero1 = ",hero1)
	fmt.Println("hero2 = ",hero2)

	//3. 加入测试
	InsertHerNode(head,hero1)    //传入头结点和新节点
	InsertHerNode(head,hero2)    //传入头结点和新节点
	ListHeroNode(head)         //显示
}
```



**疑问1：**

```go
	//判断是否到链表最后
	// if temp.next.next == nil{
	// 	break
	// }      !!!!报错无限循环
	temp = temp.next 
	if temp.next == nil{
		break
	}
```

想问下链表为啥temp.next.next会报错啊，next不是指针类型嘛



**疑问2：**

```go
	//创建一个新的节点
	hero1 := &HeroNode{
		no : 1,
		name : "宋江",
		nickname : "及时雨",
	}
	hero2 := &HeroNode{
		no : 2,
		name : "吴用",
		nickname : "呼风唤雨",
	}
	fmt.Println("hero2 = ",hero2)
	fmt.Println("hero1 = ",hero1)
```

**不是按照no排序的，怎么样才能使其按照no插入**

解决⏬⏬⏬⏬⏬ 

**第二种，按照no编号从小到大排序**

> 我们可以将数据放在数据库中排序
>
> 不合理浪费

```go
func InsertHerNode2(head *HeroNode,newHeroNode *HeroNode) {
	//思路
	//1. 找到适当的节点位置
	//2. 创建一个辅助接点temp
	temp := head
	for{
	//让插入结点的no和temp的下一个节点的no进行比较
        if temp.next != nil{
            //说明最末尾，直接插入到尾部
            break
        }else if temp.next.no > new{
            
        }
	}

	//3. 将newHernNode加入到链表的最后
	temp.next = newHeroNode 
}
```



**代码**

```go
package main
import (
	"fmt"
)

//定义一个heronode
type HeroNode struct{
	no int 
	name string
	nickname string 
	next *HeroNode     //表示指向下一个节点
}

//给链表插入节点
/*尾插法 ： 第一种插入方式,在单链表的最后加入*/
func InsertHerNode(head *HeroNode,newHeroNode *HeroNode) {
	//思路
	//1. 先找到该链表最后的这个节点
	//2. 创建一个辅助接点temp
	temp := head
	for{
		if temp.next == nil{  //如果成立表示找到最后一个位置
			break
		}
		temp = temp.next    //让temp不断地指向下一个节点
	}

	//3. 将newHernNode加入到链表的最后
	temp.next = newHeroNode 
}
func InsertHerNode2(head *HeroNode,newHeroNode *HeroNode) {
	//思路
	//1. 找到适当的节点位置
	//2. 创建一个辅助接点temp
	temp := head
	var flag bool
	for{
	//让插入结点的no和temp的下一个节点的no进行比较
        if temp.next == nil{
            //说明最末尾，直接插入到尾部
            break
        }else if temp.next.no > newHeroNode.no{
			//条件成立，说明这个newHeroNode插入到temp后面
			break   //跳出for循环  直接插入
		}else if temp.next.no == newHeroNode.no{
			//相等的话我们提醒不允许插入这个id，因为已经有了
			fmt.Println("有相同的节点，那么不可以插入")
			flag = true
			break
		}
		temp = temp.next

	}
	if flag{
		//表示此时这个相等
		return 
	}else{
		newHeroNode.next =temp.next
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
	for{
		// if temp.next = nil{
		// 	break
		// }
		fmt.Println("节点信息如下:"+"[",
		temp.next.no,temp.next.name,temp.next.nickname,"]===>")
		
		//判断是否到链表最后
		// if temp.next.next == nil{
		// 	break
		// }      !!!!报错无限循环
		temp = temp.next 
		if temp.next == nil{
			break
		}
	} 
}

func main(){
	//初始化 创建一个头结点
	head := & HeroNode{}  //给默认值
	fmt.Println("head = ",head)

	//创建一个新的节点
	hero1 := &HeroNode{
		no : 1,
		name : "宋江",
		nickname : "及时雨",
	}
	hero2 := &HeroNode{
		no : 2,
		name : "吴用",
		nickname : "呼风唤雨",
	}
	hero3 := &HeroNode{
		no : 2,
		name : "吴用3",
		nickname : "呼风唤雨3",
	}
	fmt.Println("hero1 = ",hero1)
	fmt.Println("hero2 = ",hero2)

	//3. 加入测试
	 InsertHerNode(head,hero1)    //传入头结点和新节点
	 InsertHerNode(head,hero2)    //传入头结点和新节点
	 InsertHerNode(head,hero3)    //传入头结点和新节点
	 ListHeroNode(head)         //显示

	//3. 加入测试
	InsertHerNode2(head,hero2)    //传入头结点和新节点
	InsertHerNode2(head,hero1)    //传入头结点和新节点
	InsertHerNode2(head,hero3)    //传入头结点和新节点

	ListHeroNode(head)         //显示
}
```



**删除功能**

```go
//删除节点
func DelHerNode(head *HeroNode,id int){
	//id ：删除的节点
	temp := head 
	var flag bool 
	for{
		//找到要输出的结点
			if temp.next == nil{
				//说明没有找到
				break
			}else if temp.next.no == id{
				//相等的话找到了
				flag = true
				break
			}
			temp = temp.next
		}
		if flag {
			//找到，删除
			temp.next = temp.next.next 
		}else{
			fmt.Println("要删除的id不存在")
		}
}
```





### 单链表完整代码

```go
package main
import (
	"fmt"
)

//定义一个heronode
type HeroNode struct{
	no int 
	name string
	nickname string 
	next *HeroNode     //表示指向下一个节点
}

//给链表插入节点
/*尾插法 ： 第一种插入方式,在单链表的最后加入*/
func InsertHerNode(head *HeroNode,newHeroNode *HeroNode) {
	//思路
	//1. 先找到该链表最后的这个节点
	//2. 创建一个辅助接点temp
	temp := head
	for{
		if temp.next == nil{  //如果成立表示找到最后一个位置
			break
		}
		temp = temp.next    //让temp不断地指向下一个节点
	}

	//3. 将newHernNode加入到链表的最后
	temp.next = newHeroNode 
}
func InsertHerNode2(head *HeroNode,newHeroNode *HeroNode) {
	//思路
	//1. 找到适当的节点位置
	//2. 创建一个辅助接点temp
	temp := head
	var flag bool
	for{
	//让插入结点的no和temp的下一个节点的no进行比较
        if temp.next == nil{
            //说明最末尾，直接插入到尾部
            break
        }else if temp.next.no > newHeroNode.no{
			//条件成立，说明这个newHeroNode插入到temp后面
			break   //跳出for循环  直接插入
		}else if temp.next.no == newHeroNode.no{
			//相等的话我们提醒不允许插入这个id，因为已经有了
			fmt.Println("有相同的节点，那么不可以插入")
			flag = true
			break
		}
		temp = temp.next

	}
	if flag{
		//表示此时这个相等
		return 
	}else{
		newHeroNode.next =temp.next
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
	for{
		// if temp.next = nil{
		// 	break
		// }
		fmt.Println("节点信息如下:"+"[",
		temp.next.no,temp.next.name,temp.next.nickname,"]===>")
		
		//判断是否到链表最后
		// if temp.next.next == nil{
		// 	break
		// }      !!!!报错无限循环
		temp = temp.next 
		if temp.next == nil{
			break
		}
	} 
}

//删除节点
func DelHerNode(head *HeroNode,id int){
	//id ：删除的节点
	temp := head 
	var flag bool 
	for{
		//找到要输出的结点
			if temp.next == nil{
				//说明没有找到
				break
			}else if temp.next.no == id{
				//相等的话找到了
				flag = true
				break
			}
			temp = temp.next
		}
		if flag {
			//找到，删除
			temp.next = temp.next.next 
		}else{
			fmt.Println("要删除的id不存在")
		}
}

func main(){
	//初始化 创建一个头结点
	head := & HeroNode{}  //给默认值
	fmt.Println("head = ",head)

	//创建一个新的节点
	hero1 := &HeroNode{
		no : 1,
		name : "宋江",
		nickname : "及时雨",
	}
	hero2 := &HeroNode{
		no : 2,
		name : "吴用",
		nickname : "呼风唤雨",
	}
	hero3 := &HeroNode{
		no : 2,
		name : "吴用3",
		nickname : "呼风唤雨3",
	}
	fmt.Println("hero1 = ",hero1)
	fmt.Println("hero2 = ",hero2)
	fmt.Println("hero3 = ",hero3)
	fmt.Println("测试--------1----------")
	//3. 加入测试
	 InsertHerNode(head,hero1)    //传入头结点和新节点
	 InsertHerNode(head,hero2)    //传入头结点和新节点
	 InsertHerNode(head,hero3)    //传入头结点和新节点
	 ListHeroNode(head)         //显示
	 fmt.Println("测试--------2----------")
	//3. 加入测试
	InsertHerNode2(head,hero2)    //传入头结点和新节点
	InsertHerNode2(head,hero1)    //传入头结点和新节点
	InsertHerNode2(head,hero3)    //传入头结点和新节点
	ListHeroNode(head)         //显示
	fmt.Println("测试--------删除----------")

	//4. 删除
	DelHerNode(head,2)
	ListHeroNode(head)         //显示
}
```



**编译：**

```shell
PS C:\Users\smile\Desktop\区块链\code\chapter05\ifdemo> go run .\main.go
head =  &{0   <nil>}
hero1 =  &{1 宋江 及时雨 <nil>}
hero2 =  &{2 吴用 呼风唤雨 <nil>}
hero3 =  &{2 吴用3 呼风唤雨3 <nil>}
测试--------1----------
节点信息如下:[ 1 宋江 及时雨 ]===>
节点信息如下:[ 2 吴用 呼风唤雨 ]===>
节点信息如下:[ 2 吴用3 呼风唤雨3 ]===>
测试--------2----------
有相同的节点，那么不可以插入
有相同的节点，那么不可以插入
有相同的节点，那么不可以插入
节点信息如下:[ 1 宋江 及时雨 ]===>
节点信息如下:[ 2 吴用 呼风唤雨 ]===>
节点信息如下:[ 2 吴用3 呼风唤雨3 ]===>
测试--------删除----------
请输入要删除的数值id
1
节点信息如下:[ 2 吴用 呼风唤雨 ]===>
节点信息如下:[ 2 吴用3 呼风唤雨3 ]===>
```

