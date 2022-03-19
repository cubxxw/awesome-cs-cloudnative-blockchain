[toc]

😶‍🌫️go语言官方编程指南：[https://golang.org/#](https://golang.org/#)  

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---

## 45天学会go --第十七天 goroutine(协程)和channel(管道)



> 先看一个需求,统计1~900000000000中有哪些素数

**传统方法：使用一个循环，判断哪些数是素数**

**使用并发或并行的方式，==将统计素数的任务分配个多个goroution完成==(速度最少提高四倍，分配给四个CPU)**



### 进程

> 在学习goroutine中我们需要熟悉下操作系统的进程

**1. 进程：进程就是程序在操作系统中的一次执行过程，是系统进行资源调度和分配的基本单位**

**2. 线程：线程是进程的一个执行实例，是程序执行的一个最小单位，它是比进程跟小能够独立完成的基本单位。**

> 比如打开网盘，此时打开网盘是一个进程，如果我们在网盘中下载多个视频，此时下载就叫做线程，线程吃的资源更小

**一个进程可以创建或者销毁多个线程，同一个进程中的多个线程可以==并发==进行**

**一个程序至少有一个进程，一个进程至少有一个线程**

🖱️[点击进入操作系统的并发学习](并发.md)



### Go语言协程和Go主线程

Go语言主线程（也称为线程，也可以理解为进程），一个Go语言线程上可以起多个协程，**协程是轻量级的线程**

> 编译器优化

**Go语言协程特点（重要）：**

+ 有独立的栈空间
+ 共享程序堆空间
+ 调度由用户控制
+ 协程是轻量级的线程

![image-20220319135256999](https://s2.loli.net/2022/03/19/RGvViKLpwlOXuEB.png)



**案例**

```go
/*************************************************************************
    > File Name: goroutine.go
    > Author: smile
    > Mail: 3293172751nss@gmail.com 
    > Created Time: Sat 19 Mar 2022 02:09:15 PM CST
 ************************************************************************/

package main
import(
    "fmt"
    "strconv"
    "time"
)
//func
func test(){
    for i := 1;i<=10;i++{
        fmt.Println("test hello word"+strconv.Itoa(i))
        time.Sleep(time.Second)
    }
}
func main(){
    //每隔一秒输出一个hello word,输出十次，使用goroutine
    test()   //调用
    /*线程 Go
    go test()   //同时执行
    */
    fmt.Println(" ")
    for i := 1;i<=10;i++{
        fmt.Println("main hello word"+strconv.Itoa(i))
        time.Sleep(time.Second)
}
}
```

**编译**

```shell
[root@mail golang]# go run goroutine.go
test hello word1
test hello word2
test hello word3
test hello word4
test hello word5
test hello word6
test hello word7
test hello word8
test hello word9
test hello word10

main hello word1
main hello word2
main hello word3
main hello word4
main hello word5
main hello word6
main hello word7
main hello word8
main hello word9
main hello word10
```

**由此可见，必须要把test函数中打完后才进行下面的,那么此时我们如何开启一个线程**

```
go test() //开启一个线程
```

**编译**

```shell
[root@mail golang]# go run goroutine.go
main hello word1
test hello word1
test hello word2
main hello word2
main hello word3
test hello word3
test hello word4
main hello word4
main hello word5
test hello word5
test hello word6
main hello word6
main hello word7
test hello word7
test hello word8
main hello word8
main hello word9
test hello word9
test hello word10
main hello word10
```



**图解**

![image-20220319142541361](https://s2.loli.net/2022/03/19/aQ3ulXPfOtzg4vA.png)

**由此可见，线程为我们开启了一个新的分支**

**1. 主线程是一个物理线程，是直接作用在cup上的，非常消耗cpu资源**

**2. 协程是从主线程开启的，是轻量级线程，是逻辑态，对资源的消耗比较少**

**3. Golang的协程机制特别重要，可以同时开启上万个协程**



### goroutine的调度模型

**MPG模式基本介绍**

![image-20220319143014152](https://s2.loli.net/2022/03/19/CwzYIygUK5QivaV.png)

**M物理线程比较消耗资源，P上下文环境是指需要的资源和操作系统的状态**

![image-20220319144018357](https://s2.loli.net/2022/03/19/IFZ7pgGkhsX6Qmy.png)

![image-20220319145245954](https://s2.loli.net/2022/03/19/ARjx3snQYJ1hwZb.png)

---

>  那么在Golang中如何设置运行的CPU数目呢？

  **可以设置最大的CPU数目 **

```
func GOMAXPROCS(n int)int
```



**获取cpu的数目**

```
func NumCPU() int
```



```go
     > File Name: cpu.go
     > Author: smile
     > Mail: 3293172751nss@gmail.com 
     > Created Time: Sat 19 Mar 2022 03:07:47 PM CST
  ************************************************************************/
 package main
 import(
     "fmt"
     "runtime"
 )
 func main(){
 
     cpuNum := runtime.NumCPU()
     num := runtime.NumCPU()                                                          
     fmt.Println("cpuNum = ",cpuNum)
 
     //设置
     runtime.GOMAXPROCS(num)
     fmt.Println("num = ",num)
 }
```



## channle(管道)

> 计算1~200每一个数的阶乘，并放入到map中，map做一个全程的

```go
 package main
 import(
     "fmt"
 )
var (
    myMap = make(map[int]int,10)
)
//test函数就是计算n!
func test(n int){
    res := 1
    for i := 1;i<=n;i++{
        res = res * i
        //我们将res放入到myMap
        myMap[n] = res 
    }
}

func main(){
         for i := 1;i<=200;i++{
            go test(i)     //使用协程完成
        }
        //使用range输出
        for i,v := range myMap{
            fmt.Printf("map[%d]=%d\n",i,v)
        }
    }
 }
```

**此时编译出来没有结果，一个都没有，主线程还没有结束**

**注意：写入的时候不能并发，不能同时写入，而读取数据可以用并发**

> 在运行某一种程序的时候如何知道是否存在资源竞争的问题。方法很简单，在编译的时候加入一个参数 `-race`即可

```
go build -race test test.go
```



####  不同的gorontine 之间如何通信

1. 全局变量加锁同步
2. channel

**因为没有对全局变量加锁，因此会出现资源争夺的问题，代码会出现错误，此时要解决的话可以加入互斥锁**



```
time.Sleep(10*time.Second)
lock.Lock()
for k,v := range m{
	fmt.Printf(%d != %v\n",k,v)
}
lock.Unlock()
```

