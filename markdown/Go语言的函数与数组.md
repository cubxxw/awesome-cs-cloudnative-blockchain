[toc]



😶‍🌫️go语言官方编程指南：[https://pkg.go.dev/std](https://pkg.go.dev/std)

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---

# 45天学会go --第六天 ，go语言的的函数、数组



## 函数

### 匿名函数

>   补充第五天对函数结尾

**匿名函数望文生意，就是没有名字的函数，如果我们希望某个函数只使用一次，那么可以使用匿名函数，但也可以多次使用**



#### 一次性匿名函数

**在定义匿名函数的时候就调用，此时匿名函数就只能使用一次**

```go
fun main(){
	//定义即调用
    func(n1 int,n2 int)int{
        return n1 + n2
    }(10,20)
	//此时在定义的时候同时调用
}
```

```
30
```



#### 给变量调用

**这种方式的匿名函数可以多次调用，之前我们说过函数也是一种数据类型，那么将这个函数直接定义一个变量然后赋值**

```go
fun main(){
	//定义即调用
    a := func(n1 int,n2 int)int{
        return n1 - n2
    }
	//此时在定义的时候同时调用
    res := a(30,20)
    fmt.Println("res="res)
    res2 := a(30,40)
    fmt.Println("res3=",res3)
}
```

```
res= 10
res3= -10
```



### 全局匿名函数

```go
var(
	Fun1 = func(n1 int,n2 int)int{
		return n1 * n2
		}
	)          //定义全局匿名函数'F'要大写

//调用
func main(){
    a := Fun1(10,100)
    fmt.Println("a=",a)
}
```

```
a=1000
```

---

### 匿名总结实战
```
package main

import (
	"fmt"
)
//全局匿名函数
var(
  t = func(a int, b int) int {
    return a + b 
  }
)
var t3 = func(a int, b int) int {
    return a * b 
  }(123,123)

func main() {
	fmt.Println("Hello, World!")
  a := 1
  b := (^a+1)  //取反
  fmt.Println(b)
  fmt.Println("*t = ",t) //这个地方是它的地址
  fmt.Println("func t = ",t(10,26))
  fmt.Println("func t3= ",t3)
  
  //其他匿名函数
    //一次性匿名
  t2 := func(a int, b int) int {
    return a + b 
  }(12,312)
  fmt.Println("func t2 = ",t2)

  func(a int, b int) int {
    return a * b 
  }(12,312)
  
  //多次使用的匿名
  t5:= func(a int, b int) int {
  return a + b 
  }
  fmt.Println("func t5 = ",t5(234,123421))
}

```
![image](https://user-images.githubusercontent.com/86140903/180969213-9114bcec-2786-4481-a5ad-82ec73436f2c.png)


## 闭包

**闭包就是一个==函数与相关的引用环境==组成的一个<u>整体（实体</u>）**

Go 语言支持匿名函数，可作为闭包。匿名函数是一个"内联"语句或表达式。匿名函数的优越性在于可以直接使用函数内的变量，不必申明。

>   以下实例中，我们创建了函数 getSequence() ，返回另外一个函数。该函数的目的是在闭包中递增 i 变量，代码如下：

#### 实例

```go
package main

import "fmt"

func getSequence() func() int {
    i:=0               //func()是一个匿名函数
    //getSequence()是一个函数，返回的数据类型是func()int
   return func() int {
      i+=1 
     return i  
   }
}

func main(){
   /* nextNumber 为一个函数，函数 i 为 0 */
   nextNumber := getSequence()  //将函数给变量Nex,相当于匿名函数

   /* 调用 nextNumber 函数，i 变量自增 1 并返回 */
   fmt.Println(nextNumber())
   fmt.Println(nextNumber())
   fmt.Println(nextNumber())

   /* 创建新的函数 nextNumber1，并查看结果 */
   nextNumber1 := getSequence()  
   fmt.Println(nextNumber1())
   fmt.Println(nextNumber1())
}
```

**以上代码执行结果为：**

```
1
2
3
1
2
```

#### 闭包的说明

```
	i:=0               //func()是一个匿名函数
    //getSequence()是一个函数，返回的数据类型是func()int
return func() int {
     i+=1 
     return i  
 }
```

**==返回的是一个匿名函数，==同时这个匿名函数引用到函数外的i，因此这个匿名函数和i形成一个整体，构成 闭包**

>   可以这样理解：闭包是一个类class，而i是字段，函数是一个操作，而函数和这个i构成闭包

**当我们反复的调用f函数，因为i只是初始化一次，因此每调用此一次就累加一次**

**关键：就是返回的函数引用到哪些变量，函数与哪些变量构成闭包**

#### 案例

![image-20220109141602331](https://s2.loli.net/2022/01/09/4lTbFmDxeBMI8E9.png)





## 函数defer

**在函数中，通常选用创建资源（比如：数据库连接，文件等），为了在函数执行完毕后，即使的释放资源，Go提供了defer（延时机制）**   --- `栈`

```go
package main
import "fmt"

func sum(n1 int, n2 int) int{
	defer fmt.Println("ok1 n1=",n1)
	defer fmt.Println("ok1 n2=",n2)
	res := n1 + n2 
	fmt.Println("ok1 res=",res)
	return res
}

func main(){
	res := sum(10,20)
	fmt.Println("res=",res)
}
```

![image-20220109143800029](https://s2.loli.net/2022/01/09/Zc8X5HmzShWeNMp.png)

**注意：**

1.   当执行到defer时候，系统会将defer语句压入到一个独立的栈中（defer栈），暂时不执行
2.   当函数执行完毕后再从defer中按照**先入后出**的方式出栈，然后执行
3.   函数中的res 最先执行，输出30
4.   最后执行main中的语句
5.   在defer语句入栈的时候，也会将相关的值同时放入到栈

>   我大概认为就跟C++中的构造函数 和析构函数`~`类似

**即defer作用是在函数执行完毕后，可以及时的释放函数创建的资源**

```go
//文件操作
defer file Close()

//数据库操作
defer connect.close()       //connect是数据库的游标
```



## 字符串常用的系统函数

```go
package utils
import (
	"fmt"
	"strconv"
	"strings"
)

var str string = "学golang使我快乐！"

// 关于string的常用函数

// 1. len(str) 内建函数，返回字符串长度，按字节，1个汉字3字节，1字母1字节
//这个函数是内建函数（和printf一样）  //只需要`fmt`包
func F1(){
    fmt.Println(len(str))
}

// 2. range []rune(str)  字符串遍历，处理中文问题 转成rune切片
func F2() {
	for _,value := range []rune(str) {
		fmt.Printf("%c \n",value)
	}
}

// 3. string转整数 strconv.Atoi(str) 这个函数是 strconv.ParseInt(s string, base int, bitSize int) (i int64 err error)的简化版
func F3() {
	num, _ := strconv.Atoi("666")
	fmt.Printf("num type is %T,value is %v", num, num) 
    // num type is int,value is 666

}

// 4. 整数转string strconv.Itoa(666) 是strconv.FormatInt(i int64, base int) string的简化版

// 5. string to []byte  b := []byte(str)
func F5(){
	 b := []byte(str)
	 fmt.Printf("%T %v\n", b, b) // type of b is []uint8
}

// 6. []byte to string   s := string([]byte{77,88,99})
func F6(){
	 s := string([]byte{77,88,99})
	 fmt.Printf("%T %v\n", s, s) // string MXc
}

// 7. 十进制数转2 8 16进制字符串  strconv.FormatInt(i int64, base int) string  base->2,8,16

// 8. 判断字符串s是否包含子串substr strings.Contains(s, substr string) bool

// 9. 统计子串出现次数 strings.Count(s, sep string) int
func F9() {
	s := "A man who helps you when you are in trouble and who leaves you when you are successful is a real friend."

	fmt.Println(strings.Count(s,"you")) // 4

	s = "lv"
	fmt.Println(strings.Count(s,"")) // 3

}

// 10. 判断连个字符串是否相等 str1 == str2 区分大小写， 不区分大小写方式strings.EqualFold(s, t string) bool

// 11. 子串sep在字符串s中第一次/最后一次出现的位置，不存在则返回-1  Index(s, sep string) int/LastIndex(s, sep string) int

// 12. 将n个old子串替换为new字符串，n<0会替换所有old子串 strings.Replace(s, old, new string, n int) string

// 13. 大小写转换 strings.ToUpper  /ToLower

// 14. 按sep拆分字符串，返回一个slice  strings.Split(s, sep string) []string

// 15. 将字符串slice以sep为分隔符组合成一个字符串 strings.Join(a []string, sep string) string

// 16. Trim系列 Trim(s string, cutset string) string 去除左右两边指定字符串  TrimRight/TrimLeft
// 	TrimSpace(s string) string 去除左右两边空白
//  TrimPrefix(s, prefix string) string /TrimSuffix(s, suffix string) string 去除前/后缀

// 17. 判断s是否有前缀/后缀字符串prefix   HasPrefix(s, prefix string) bool  / HasSuffix
func main(){
    
}
```



## 日期和时间相关函数

1.   时间和日期相关的函数需要导入time包[https://pkg.go.dev/time@go1.17.6](https://pkg.go.dev/time@go1.17.6)

2.   time.Time 类型，用于表示时间

     ```go
     package main
     import(
     	"fmt"
     	"time"
     )
     func main(){
         now := time.Time()
         fmt.Printf("now=%v now type=%T",now,now)
     
         fmt.Println(now.Year())      //获取到年
         fmt.Println(int(now.Month()))      //获取到月
         fmt.Println(now.Day())      //获取到日
         fmt.Println(now.Hour())      //获取到时
         fmt.Println(now.Minute())      //获取到分
         fmt.Println(now.Second())      //获取到秒
     }
     ```

     ![image-20220109151948003](https://s2.loli.net/2022/01/09/SebIThU4GB3xXCH.png)

     

     

     #### 时间常量

     **常量就是在程序中可用于获取指定时间单位的时间**

     ```go
     const (
     	Nanosecond  Duration = 1
     	Microsecond          = 1000 * Nanosecond
     	Millisecond          = 1000 * Microsecond
     	Second               = 1000 * Millisecond
     	Minute               = 60 * Second
     	Hour                 = 60 * Minute
     )
     ```

     >   比如想拿到100毫秒

     ```
     100 * time.Millisecond
     ```

     **如果我们想要休眠一段时间，必须要使用到时间常量**

​	

#### 结合sleep来使用时间常量

>   需求：每隔一秒钟打印一个数字，打印到10时就退出
>
>   每隔0.1秒打印一个数字，打印5秒退出**（不可以使用time.Second * 0.1,编译不能通过，只能用millisecond(毫秒) * 100)**

```go
package main
import (
    "fmt"
    "time"
)

func main(){
i := 0
j := 0
 for{
     i++
     fmt.Println(i)  //打印
     time.Sleep(time.Second)   //休眠，每秒钟执行一次
     if i == 10{
         break
     }
 }
    for{
        j++
        fmt.Println(j)
        time.Sleep(time.Millisecond * 100)
        if i == 20{
            break
        }
    }
}
```

![image-20220109154141855](https://s2.loli.net/2022/01/09/kQdxJsaft5wM4nB.png)



### unix时间戳和unixnano时间戳

**作用是：获取随机数字**

>   **unix :获取秒数随机**
>
>   **unixnano:获取纳秒随即数**

```
now = time.Now()
fmt.Printf("unix时间戳为=%v \n unixnano时间搓=%v",now.unix(),now.unixnano())
```

![image-20220109160542484](https://s2.loli.net/2022/01/09/nwSfaEKBhON96gD.png)

#### func (Time) [Unix](https://cs.opensource.google/go/go/+/go1.17.6:src/time/time.go;l=1134) [¶](https://pkg.go.dev/time@go1.17.6#Time.Unix)

```
func (t Time) Unix() int64
```

Unix returns t as a Unix time, the number of seconds elapsed since January 1, 1970 UTC. The result does not depend on the location associated with t. Unix-like operating systems often record time as a 32-bit count of seconds, but since the method here returns a 64-bit value it is valid for billions of years into the past or future.

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 1 billion seconds of Unix, three ways.
	fmt.Println(time.Unix(1e9, 0).UTC())     // 1e9 seconds
	fmt.Println(time.Unix(0, 1e18).UTC())    // 1e18 nanoseconds
	fmt.Println(time.Unix(2e9, -1e18).UTC()) // 2e9 seconds - 1e18 nanoseconds

    t := time.Date(2001, time.September, 9, 1, 46, 40, 0, time.UTC)
    fmt.Println(t.Unix())     // seconds since 1970
    fmt.Println(t.UnixNano()) // nanoseconds since 1970
}
```



#### func (Time) [UnixMicro](https://cs.opensource.google/go/go/+/go1.17.6:src/time/time.go;l=1152) [¶](https://pkg.go.dev/time@go1.17.6#Time.UnixMicro)added in go1.17

```
func (t Time) UnixMicro() int64
```

UnixMicro returns t as a Unix time, the number of microseconds elapsed since January 1, 1970 UTC. The result is undefined if the Unix time in microseconds cannot be represented by an int64 (a date before year -290307 or after year 294246). The result does not depend on the location associated with t.

#### func (Time) [UnixMilli](https://cs.opensource.google/go/go/+/go1.17.6:src/time/time.go;l=1143) [¶](https://pkg.go.dev/time@go1.17.6#Time.UnixMilli)added in go1.17

```
func (t Time) UnixMilli() int64
```

UnixMilli returns t as a Unix time, the number of milliseconds elapsed since January 1, 1970 UTC. The result is undefined if the Unix time in milliseconds cannot be represented by an int64 (a date more than 292 million years before or after 1970). The result does not depend on the location associated with t.

#### func (Time) [UnixNano](https://cs.opensource.google/go/go/+/go1.17.6:src/time/time.go;l=1162) [¶](https://pkg.go.dev/time@go1.17.6#Time.UnixNano)

```
func (t Time) UnixNano() int64
```

UnixNano returns t as a Unix time, the number of nanoseconds elapsed since January 1, 1970 UTC. The result is undefined if the Unix time in nanoseconds cannot be represented by an int64 (a date before the year 1678 or after 2262). Note that this means the result of calling UnixNano on the zero Time is undefined. The result does not depend on the location associated with t.



#### 统计代码执行时间

>   编写一个代码来统计函数test执行的时间

```go
package main

import (
	"fmt"
	"time"
    "strconv"         //用来转换
)
func test(){
    str := ""
    for i :=0;i < 10000; i++{
        str += "hello" + strconv.Itoa(i)
        fmt.Println(str)
    }
}
func main() {
    start := time.Now().Unix()
    test()
    end := time.Now().unix()
    fmt.Println("执行test消耗的时间为(s)：",end - start)
}    
```

![image-20220109162120408](https://s2.loli.net/2022/01/09/l8TLEcMs4fNzIKx.png)



## Golang内置函数

Golang地址：[https://pkg.go.dev/builtin@go1.17.6](https://pkg.go.dev/builtin@go1.17.6)

#### func [new](https://cs.opensource.google/go/go/+/go1.17.6:src/builtin/builtin.go;l=194) [¶](https://pkg.go.dev/builtin@go1.17.6#new)

```
func new(Type) *Type
```

The new built-in function allocates memory. The first argument is a type, not a value, and the value returned is a pointer to a newly allocated zero value of that type.

>   **new 主要用来分配内存，主要是用来分配值类型,本身是一个地址，默认是存放0这个数据空间的地址,地址是由系统分配的**

```go
package main
import "fmt"
func main(){
	num1 := 100
	fmt.Printf("num1的类型为:%T,\n num1的值为:%v,\n num1的地址为:%v",num1,num1,&num1)
    
    num2 = new(int)
    fmt.Printf("num2的类型为:%T,\n num2的值为:%v,\n num2的地址为:%v",num2,num2,&num2)  /*int类型   值为指向空间的地址    本省的地址为指针的地址    */
}
```

![image-20220109163125076](https://s2.loli.net/2022/01/09/7pi1yuPCFAIsEwK.png)

![image-20220109164028360](https://s2.loli.net/2022/01/09/bvqIE1LtnZeJGrQ.png)

**怎么将num2的值取出？ -- `*`取地址的值**

```go
fmt.Printf("num2的值为:%v",*num2)    
```

```
num2的值为：0   //修改  *num2 = 100
```



## Golang错误处理机制

**处理方式：defer,panic,recover**   --**让程序更加健壮**

**Go中可以抛出一个panic的异常，然后在defer中通过==recover捕获这个异常==，然后正常处理**

使用defer和recover来处理异常。

#### func [panic](https://cs.opensource.google/go/go/+/go1.17.6:src/builtin/builtin.go;l=232) [¶](https://pkg.go.dev/builtin@go1.17.6#panic)

**panic内置函数接受一个interface{}类型的值作为参数,可以接收error类型变量，输出错误信息，并退出程序**

```
func panic(v interface{})
```

**The panic built-in function stops normal execution of the current goroutine.** When a function F calls panic, normal execution of F stops immediately. Any functions whose execution was deferred by F are run in the usual way, and then F returns to its caller. To the caller G, the invocation of F then behaves like a call to panic, terminating G's execution and running any deferred functions. This continues until all functions in the executing goroutine have stopped, in reverse order. At that point, the program is terminated with a non-zero exit code. This termination sequence is called panicking and can be controlled by the built-in function recover.

```go
defer func(){
	/*匿名函数*/ 
	err := recover()   //内置函数，可以捕获到异常
    if err != ni{//说明捕获到异常
        fmt.Println("err=",err) 
        fmt.Println("发送邮件给admin@qq,com")
    }         //这里可以将错误发送给管理员
}()     //匿名函数的调用
num := 10/0           //错误代码
```

### 自定义错误

```
errors.New("错误类型")    //返回一个error类型的值，表示一个错误
```

>   函数读取init.config信息，如果文件名传入不正确，返回一个自定义错误

```go
package main
import (
	"fmt"
    "errors"
)
func readConf(name string) (err error){
	if name = "config.ini"{
	//"读取"
	return nil
	}else{
	//返回一个自定义错误
	return errors.New("读取文件错误")
	}
}

func test02(){
    err := readConf("config.ini")
    if err != nil{
        //如果发生错误，就输出错误并且终止程序，此时使用panic
        panic(err)
    }
    //不发生错误
    fmt.Println("test02()继续执行...")
}
func mian(){
    //测试
    test02()
}
```



