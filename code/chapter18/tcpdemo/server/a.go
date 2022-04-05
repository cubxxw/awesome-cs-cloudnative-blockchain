package main
import (
	"fmt"
	"errors"
	"os"
)

type CircleQueue struct {
	maxSize int //4
	array [4]int 
	head int //指向队列首部
	tail int //指向队列尾部
}

//入队列 AddQueue       出队列 GetQueue(popQueue)
func (this *CircleQueue) Push(val int) (err error){
	 fmt.Println("bool = ",this.IsFull())
	//入队列
	if this.IsFull(){
		return errors.New("queue full")
		//队列满了
	}

	this.array[this.tail] = val  //把值给尾部
	//此时this.tall往后移位
	this.tail = (this.tail+1)%this.maxSize
	return 

}


func (this *CircleQueue) Pop() (val int, err error){
	//出队列，队列空没办法出
	 fmt.Println("bool = ",this.IsEmpty())
	if this.IsEmpty(){
		return 0,errors.New("queue empty")
	}
	//取出
	val = this.array[this.head]
	this.head = (this.head + 1)%this.maxSize
	return
}

//判断环形队列为满了的方法
func (this *CircleQueue) IsFull() bool {
	return (this.tail +1) %this.maxSize == this.head
}

//判断环形队列是否空的
func (this *CircleQueue) IsEmpty() bool {
	return this.tail == this.head
}

//取出环形队列有多少个元素
func (this *CircleQueue) Size() int {
	return (this.tail + this.maxSize - this.head) % this.maxSize
	//由于是环形队列，所以我们在使用的时候要先加上队列的容量，减去头部，最后要%%%%%
}

//显示队列
func (this *CircleQueue) ListQueue() {
	//判断为空，空的话就直接跳出
	//取出当前有多少元素
	fmt.Println("环形队列情况如下：")
	size := this.Size()
	if size == 0{
		fmt.Println("队列为空")
	}

	temp := this.head
	for i := this.head;i<size; i++{
		fmt.Println("aee[%d = %d\t",temp,this.array[this.head])
		temp = (temp +1)%this.maxSize
	}
	fmt.Println()
}

//获取队头元素
func  (this *CircleQueue) GetFront() (val1 int ,val2 int , err error) {
	//判断队空
	if(this.head == this.tail){
		//表示队空
		fmt.Println("取出队列失败，队列为空的 err  ")
		return 0,0,errors.New("queue empty")
	}
		//队列非空
		val1 = this.array[this.head] 
		val2 = this.array[this.tail]
		//获取元素不移位
		return
}
func main(){
	  
    //先创建一个队列
    queue := &CircleQueue{
        maxSize : 5,
		head : 0,
        tail : 0,
    }

    var key string 
    var val int
	var input byte
    for{
        fmt.Println("1/ 输入add表示添加数据到队列")
        fmt.Println("2/ 输入get表示出队列")
        fmt.Println("3/ 输入show表示显示队列")
        fmt.Println("4/ 输入exit表示退出队列")
		fmt.Println("5/ 输入select显示头尾元素")
        
    
        fmt.Scanln(&key)
        switch key{
        case "add","1":
            fmt.Println("请输入你要入队列的数")
            fmt.Scanln(&val)
            err := queue.Push(val)
            if err != nil{
                  fmt.Println("err = ",err.Error())
            }else{
             fmt.Println("加入队列成功")
            }
       case "get","2":         //取出元素
           fmt.Println("get")
            val,err := queue.Pop()
            if err != nil{
                fmt.Println("err = ",err.Error())
            }else{
             fmt.Println("取出队列成功val = ",val)
            }
       case "show","3":
              queue.ListQueue()
       case "exit","4":
            os.Exit(0)   //也可以直接使用return
	   case "select","5":
			//显示首位元素
			a,b,err := queue.GetFront()
			if err != nil{
				fmt.Println("显示失败，err = ",err.Error())
			}else{
				re:    //标记
				fmt.Println("请选择取出的元素 A/a:队首 --- B/b:队尾")
				fmt.Scanln(&input)
				if input == 1 {
					fmt.Println("队首元素为：",a)
				}else if input == 2{
					fmt.Println("队尾元素为：",b)
				}else{
					fmt.Println("你的输入有误，请重新输入")
					goto re
				}
			}
        }
    }
}