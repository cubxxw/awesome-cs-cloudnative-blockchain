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
