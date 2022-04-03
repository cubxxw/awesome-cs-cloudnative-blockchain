😶‍🌫️go语言官方编程指南：[https://golang.org/](https://golang.org/)  

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---



 数据结构

[toc]

# 队列

## 队列的使用

```go
/*************************************************************************
    > File Name: queue.go
    > Author: smile
    > Mail: 3293172751nss@gmail.com 
    > Created Time: Sun 03 Apr 2022 04:40:39 PM CST
 ************************************************************************/

 package main
import(
	"fmt"
    "os"
    "errors"
)

//使用一个结构体管理数据
type Queue struct{
    maxSize int 
    array [10]int //数组
	front int //表示指向队列最前面
    rear int //表示指向队列最后面
}

//方法一： 添加数据到队列
func (this *Queue) AddQueue(val int) (err error) {  //可能有错误

    //先判断队满
    if this.rear == this.maxSize -1{
        //提醒！！！rear是队列的尾部（含队列尾部元素--最后一个元素）
        return errors.New("queue full")
    }

    this.rear++      //rear后移
    this.array[this.rear] = val
    return
    
}

//显示队列
func (this *Queue) ShowQueue() {
    //找到队首，遍历到队尾
    fmt.Println("队列当前的的情况是：")
    for i := this.front + 1;i<= this.rear;i++{
        //frout是不包含队首的元素的
        fmt.Printf("arrary[%d]=d\t",i,this.array[1])
    }
}

//取出元素
func (this *Queue) GetQueue() (val int,err error){
    //先判断队列是否为空
    if this.rear == this.front{
        //对空
        return -1,errors.New("Queue empty")
    }
    this.front++      //头后移一位
    val = this.array[this.front]
    return               //或者return val,err
}



func main(){
    
    //先创建一个队列
    queue := &Queue{
        maxSize : 5,
        front : -1,
        rear : -1,
    }

    var key string 
    var val int
    for{
        fmt.Println("1/ 输入add表示添加数据到队列")
        fmt.Println("2/ 输入get表示出队列")
        fmt.Println("3/ 输入show表示显示队列")
        fmt.Println("4/ 输入exit表示退出队列")
        
    
        fmt.Scanln(&key)
        switch key{
        case "add":
            fmt.Println("请输入你要入队列的数")
            fmt.Scanln(&val)
            err := queue.AddQueue(val)
            if err != nil{
                  fmt.Println("err = ",err.Error())
            }else{
             fmt.Println("加入队列成功")
            }
       case "get":         //取出元素
            fmt.Println("get")
            val,err := queue.GetQueue()
            if err != nil{
                fmt.Println("err = ",err.Error())
            }else{
             fmt.Println("取出队列成功val = ",val)
            }
       case "show":
              queue.ShowQueue()
       case "exit":
            os.Exit(0)   //也可以直接使用return
        }
    }
}

```

**编译：**

![image-20220403170952129](https://s2.loli.net/2022/04/03/qYoNJkM75jub1DU.png)

```
PS C:\Users\smile\Desktop\区块链\code\chapter18\tcpdemo\server> go run .\a.go
1/ 输入add表示添加数据到队列
2/ 输入get表示出队列
3/ 输入show表示显示队列
4/ 输入exit表示退出队列
add
请输入你要入队列的数
2
加入队列成功
1/ 输入add表示添加数据到队列
2/ 输入get表示出队列
3/ 输入show表示显示队列
4/ 输入exit表示退出队列
add
请输入你要入队列的数
4
加入队列成功
1/ 输入add表示添加数据到队列
2/ 输入get表示出队列
3/ 输入show表示显示队列
4/ 输入exit表示退出队列
add
请输入你要入队列的数
q
加入队列成功
1/ 输入add表示添加数据到队列
2/ 输入get表示出队列
3/ 输入show表示显示队列
4/ 输入exit表示退出队列
请输入你要入队列的数
1
加入队列成功
1/ 输入add表示添加数据到队列
2/ 输入get表示出队列
3/ 输入show表示显示队列
4/ 输入exit表示退出队列
add
请输入你要入队列的数
234
加入队列成功
1/ 输入add表示添加数据到队列
2/ 输入get表示出队列
3/ 输入show表示显示队列
4/ 输入exit表示退出队列
show
队列当前的的情况是：
arrary[0]=d     %!(EXTRA int=4)arrary[1]=d      %!(EXTRA int=4)arrary[2]=d      %!(EXTRA int=4)arrary[3]=d      %!(EXTRA int=4)arrary[4]=d      %!(EXTRA int=4)1/ 输入add表示添加数据到队列
2/ 输入get表示出队列
3/ 输入show表示显示队列
4/ 输入exit表示退出队列
get 1
get
取出队列成功val =  2
1/ 输入add表示添加数据到队列
2/ 输入get表示出队列
3/ 输入show表示显示队列
4/ 输入exit表示退出队列
get
取出队列成功val =  4
1/ 输入add表示添加数据到队列
2/ 输入get表示出队列
3/ 输入show表示显示队列
4/ 输入exit表示退出队列
show
队列当前的的情况是：
arrary[2]=d     %!(EXTRA int=4)arrary[3]=d      %!(EXTRA int=4)arrary[4]=d      %!(EXTRA int=4)1/ 输入add表示添加数据到 队列
2/ 输入get表示出队列
3/ 输入show表示显示队列
4/ 输入exit表示退出队列
exit
```



**上面的队列并没有对空间进行有效的利用，如果实现环形队列！！**



## 环形队列