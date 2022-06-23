---
https:nsddd.top
---

[toc]



😶‍🌫️go语言官方编程指南：[https://pkg.go.dev/std](https://pkg.go.dev/std)

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---

# 45天学会go --第七天 ，go语言的的数组和切片

## 数组

Go 语言提供了数组类型的数据结构。

**数组是具有相同唯一类型的一组已编号且长度固定的数据项序列，这种类型可以是任意的原始类型例如整型、字符串或者自定义类型。**

**数组可以存放多个同一类型数据，同时数组也是一种数据类型，在Golang中，==数组是一种值类型，因此在默认下是值传递，在函数中修改的是拷贝的数值（新的栈栈），不影响本身数值==**

相对于去声明 **number0, number1, ..., number99** 的变量，使用数组形式 **numbers[0], numbers[1] ..., numbers[99]** 更加方便且易于扩展。

数组元素可以通过索引（位置）来读取（或者修改），索引从 0 开始，第一个元素索引为 0，第二个索引为 1，以此类推。

**数组的地址可以通过地址名获取，数组第一个元素的地址就是数组的首地址**

![img](https://s2.loli.net/2022/01/11/OF9oTb1VksLtvlP.png)

------

### 声明数组

Go 语言数组声明需要指定元素类型及元素个数，语法格式如下：

```go
var variable_name [SIZE] variable_type
```

以上为一维数组的定义方式。例如以下定义了数组 balance 长度为 10 类型为 float32：

```go
var balance [10] float32
```

------

### 初始化数组和内存布局

以下演示了数组初始化：

```go
var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```



我们也可以通过字面量在声明数组的同时快速初始化数组：

```go
balance := [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```



如果数组长度不确定，**可以使用 ... 代替数组的长度，编译器会根据元素个数自行推断数组的长度：**

```go
var balance = [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
//             或
balance := [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```



如果设置了数组的长度，我们还可以通过指定下标来初始化元素：

```go
//  将索引为 1 和 3 的元素初始化
balance := [5]float32{1:2.0,3:7.0}
```

**注意：**

**1. 这个顺序不是固定的，没有指定的顺序，是按照下标的顺序**

**2. 数组创建的时候，如果没有赋值，则使用默认值**

**3. 初始化数组中 {} 中的元素个数不能大于 [] 中的数字。**

如果忽略 **[]** 中的数字不设置数组大小，Go 语言会根据元素的个数来设置数组的大小：

```go
 balance[4] = 50.0
```



以上实例读取了第五个元素。数组元素可以通过索引（位置）来读取（或者修改），索引从 0 开始，第一个元素索引为 0，第二个索引为 1，以此类推。

![img](https://s2.loli.net/2022/01/11/xr6zGIcWKBuZ4Ng.jpg)

------

### 访问数组元素

数组元素可以通过索引（位置）来读取。格式为数组名后加中括号，中括号中为索引的值。例如：

```
var salary float32 = balance[9]
```

以上实例读取了数组 balance 第 10 个元素的值。

以下演示了数组完整操作（声明、赋值、访问）的实例：

#### 实例 1

```go
package main

import "fmt"

func main() {
   var i,j,k int
   // 声明数组的同时快速初始化数组
   balance := [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}

   /* 输出数组元素 */         ...
   for i = 0; i < 5; i++ {
      fmt.Printf("balance[%d] = %f\n", i, balance[i] )
   }
   
   balance2 := [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
   /* 输出每个数组元素的值 */
   for j = 0; j < 5; j++ {
      fmt.Printf("balance2[%d] = %f\n", j, balance2[j] )
   }

   //  将索引为 1 和 3 的元素初始化
   balance3 := [5]float32{1:2.0,3:7.0}  
   for k = 0; k < 5; k++ {
      fmt.Printf("balance3[%d] = %f\n", k, balance3[k] )
   }
}

```

以上实例执行结果如下：

```
Element[0] = 100
Element[1] = 101
Element[2] = 102
Element[3] = 103
Element[4] = 104
Element[5] = 105
Element[6] = 106
Element[7] = 107
Element[8] = 108
Element[9] = 109
```

#### 实例 2

![](https://s2.loli.net/2022/01/11/OF9oTb1VksLtvlP.png)

以上实例执行结果如下：

```
balance[0] = 1000.000000
balance[1] = 2.000000
balance[2] = 3.400000
balance[3] = 7.000000
balance[4] = 50.000000
balance2[0] = 1000.000000
balance2[1] = 2.000000
balance2[2] = 3.400000
balance2[3] = 7.000000
balance2[4] = 50.000000
balance3[0] = 0.000000
balance3[1] = 2.000000
balance3[2] = 0.000000
balance3[3] = 7.000000
balance3[4] = 0.000000
```



### 注意：

```
var a[2]int
```

**int默认是int64，占8个字节，而int32占4个字节，使用&取地址a[0]和a[1]地址隔4个字节**

### 数组的遍历

#### 常规遍历

```go
package main
import "fmt"

func main(){
    var n int
    fmt.Println("请输入当前数组个数")
    fmt.Println()
    fmt.Scanln(&n)
	var a[3]int            //此处不可以由键盘输入，可以用下面切片
    for i := 0; i < len(a);i++ {
        fmt.Printf("请输入当前第%d个元素的值\n",&i+1)
        fmt.Scanln(&a[i])
    }
    for i := 0; i< len(a);i++ {
        fmt.Printf("第%d个元素的值为:%d\n",i+1,a[i])
        fmt.Printf("第%d个元素的地址为:%v\n",i+1,&a[i])
    }
}
```

![image-20220111114329321](https://s2.loli.net/2022/01/11/mviI5u7oNQzXsLt.png)



#### for - range遍历

```go
for index,value := range array{
....
}
```

1.   index : 数组下标
2.   value 下标对应位置
3.   array：数组名
4.   **都是仅在for循环内部可见的局部变量**
5.   **遍历数组时，如果不想使用index，可以使用`_`代替**

#### 和python一样的用法

```python
//python用range根据数字索引遍历数组的方法，直接上例子吧。

colours = ["red","green","blue"]

for i in range(0, len(colours)):

  print i, colour[i]


\# 0 red

\# 1 green

\# 2 blue
```

1.   range 三个组成，分别是开始，间隔，结束

2.   i 就相当于下标，可以不管它，相对Go可能更高级一丢丢

     

#### Go遍历案例

```go
package main
import "fmt"

func main(){
	//演示遍历
    heroes :=[...]string{"宋江","吴用","卢俊义"}
	
    for i,v := range heroes{
        fmt.Printf("i = %v,v = %v\n",i,v)
    }
}
```

![image-20220111120358799](https://s2.loli.net/2022/01/11/6K2bHJZ7AVqscWT.png)

**输出可以使用`i+1`符合**

![image-20220111120645480](https://s2.loli.net/2022/01/11/SPGauqldE1sH9Np.png)



### 🐻数组的引用传递

**数组本身是属于值传递的，要是想修改数组的值，那么需要使用指针**

```go
package main
import "fmt"

func main(){
func test(arr *[3]int){
	(*arr)[0] = 88    //❤️ 注意，此时先取值，然后再取地址
}
func main(){
    arr := [3]int{11,22,33}
    test(&arr)      //传递数组 ,, 此时需要使用取地址符
    fmt.Println("main arr = ",arr)
}

```

**使用指针传递的效率更好，示意图：**

![image-20220111122239249](https://s2.loli.net/2022/01/11/8LXKoDN7rJmjceZ.png)



### 长度也是数组类型一部分

![image-20220111122635509](https://s2.loli.net/2022/01/11/pGXdiazsNVrSuMh.png)



#### 案例

>   随机生成5个数字，将其反转打印

**使用`func(r* Rand) Intn(n int) int`函数生成随机数**

```go
package main
import (
	"fmt"
	"math/rand"
    "time"
)
func main(){
	var intArr3 [5]int
    rand.Seed(time.Now().UnixNano())   //使用时间戳种子数改变数值
	for i:= 0;i < len(intArr3); i++{
	intArr3[i] = rand.Intn(100)    //赋值为随机数
	}
    fmt.Println(intArr3)   //可以直接将数组打印出来
    temp := 0       //使用零食变量交换
    for i:= 0;i < len(intArr3); i++{
        temp = intArr3[len(intArr3) - 1 - i]
        intArr3[len(intArr3) - 1 - i] = intArr3[i]
        intArr3[i] = temp
    }
    fmt.Println(intArr3)   //可以直接将数组打印出来
}
```

![image-20220111125245347](https://s2.loli.net/2022/01/11/VjQMkfs7iwY1Sz4.png)

**注意：每次执行的随机数都是一样的，这是由于函数使用给定的seed来初始化生成器到一个确定的状态，故需要一个种子数**

**解决：为了每次生成随机数不一样，我们给定的seed值也应该不一样，此时可以用unix()时间戳**

**交换的思路，反转打印，交换的次数应该只需要一般 len/2,不可写len，否则交换了两次**

>    由此可见，Golang开发者还是希望Go语言可以有更好的可读性和可维护性

---



## slice切片

>   如果我们需要一个数组来保存学生的成绩，但是学生的人数是不固定的，那么这时候需要用到切片，就相当于动态数组

1.   切片是数组的一个引用，那么切片是一个引用类型，这和数组是不一样的，函数中改变的会改变其值

2.   切片的长度是可以变化的

3.   切片的使用类似于数组，遍历和访问都是和数组一样的

4.   切片的定义基本语法：

     ```go
     var slicename [] type
     ```

     slicename：切片名

     type ：类型

```go
package main

import(
	"fmt"
)
func main(){
	var intArr [5]int = [...]int{11,22,33,44,55}  //数组
	slice := intArr[1:3]
	fmt.Println("intarr=",intArr)
	fmt.Println("intarr的容量是 ",len(inArr))
	fmt.Println("slice 的元素是 ",slice)
	fmt.Println("slice 的容量是",cap(slice))
	fmt.Println("slice 的元素个数为",len(slice))
}
```

**注意：**

1.   slice 是切片名称
2.   intArr[1:3] 表示slice引用数组第二个元素到下标  
3.   **引用intArr数组的起始下标为1，终止下标为3，但是不包含3**
4.   切片的容量cap是可变的，这样可以节约空间
5.   **此时改变数组的值，slice 的值也会发生变化（引用）**

**编译：**

![image-20220111134401426](https://s2.loli.net/2022/01/11/QrymU2JZjMIFblH.png)



### ❤️💕 切片在内存中形式

**在内存里，可以理解为slic是由三个部分组成的**

1.   第一个位置记录的是数组的地址，是引用类型
2.   第二个记录了slic本身的长度
3.   第三个记录的是slic容量的大小

**可以理解为slic是一个引用类型（本身也是有个地址）**

**slic从底层来说其实就是一个数据结构，是struct结构体**

```go
type slice struct{
	ptr *[2]int
	len int
	cap int
}
```

**示意图**

![image-20220111140226257](https://s2.loli.net/2022/01/11/HiZ67vYK8wL3jP9.png)



### 切片的使用

#### 方式一

**定义一个切片，然后让切片去引用一个已经创建的数组**

>   参考上面的例子

```go
var intArr [5]int = [...]int{11,22,33,44,55}  //数组
slice := intArr[1:3]
```

#### 方式二

**通过func make来创建一个切片**

```go
var 切片名 []type = make([],len,[cap])
//也可以简写为
切片名 := make([]type, len)
```

1.   type 是数据类型
2.   len :切片大小
3.   cap：切片容量

>   **方式一和方式二之间的区别✍️✍️✍️：**
>
>   1.  方式一是直接引用数组，数组是值类型，而引用的是引用类型，数组是事先存在的，程序员是可见的
>   2.  make创建切片，这个切片是在地层中，程序员是不可见的

#### 方式三

```go
func main(){
	var slice []int = []int {1,3,5}
	fmt.Println(slice)
}
```

**容量必须大于或者等于长度**

```go
package main

import(
	"fmt"
)
func main(){
    var slice []float64 = make([]float,5,10)
    slice[1] = 10
    slice[2] = 20
    fmt.Println((len(slice)))
```

**图示解析：**

![image-20220111144254092](https://s2.loli.net/2022/01/11/dWySm5QCi4ERwUg.png)

### 切片初始化

```
s :=[] int {1,2,3 } 
```

直接初始化切片，**[]** 表示是切片类型，**{1,2,3}** 初始化值依次是 **1,2,3**，其 **cap=len=3**。

```
s := arr[:] 
```

初始化切片 **s**，是数组 arr 的引用。

```
s := arr[startIndex:endIndex] 
```

将 arr 中从下标 startIndex 到 endIndex-1 下的元素创建为一个新的切片。

```
s := arr[startIndex:] 
```

默认 endIndex 时将表示一直到arr的最后一个元素。

```
s := arr[:endIndex] 
```

默认 startIndex 时将表示从 arr 的第一个元素开始。

```
s1 := s[startIndex:endIndex] 
```

通过切片 s 初始化切片 s1。

```
s :=make([]int,len,cap) 
```

通过内置函数 **make()** 初始化切片**s**，**[]int** 标识为其元素类型为 int 的切片。

 

### 切片的遍历

**😂😂😂 切片的遍历和数组的遍历差不多**

#### 常规遍历

```go
package main
import "fmt"

func main(){
    var arr [5]int = [...]int{11,22,33,44,55}
    slice := arr[1,4]   //22,33,44
    for i := 0;i<len(slice);i++ {
        fmt.Printf("slice[%v] = %v",i,slice[i])
    }
}
```

**编译：**

```
slice[0]=22 slice[1]=33 slice[2]=44
```



#### for --range遍历

```go
package main
import "fmt"

func main(){
    var arr [5]int = [...]int{11,22,33,44,55}
    slice := arr[1,4]   //22,33,44
    for i,v := range slice {
        fmt.Printf("slice[%v] = %v",i,v)
    }
}
```

**编译：**

```
slice[0]=22 
slice[1]=33 
slice[2]=44
```



### 注意

1.  通过make方式创建的切片可以指定切片的大小和容量

2.  如果没有给切片的各个元素赋值，就会使用默认值

3.  通过make方式创建的切片对应的数组是由make底层维护，对外部可见，只能使用slice去访问

4.  **对切片初始化后任然不能越界，但是可以动态增长**

    ```go
    var slice = arr[0:end]
    var slice = arr[:end]
    /*可省略，默认是零*/
    var slice = arr[0:len(arr)]
    var slice = arr[:] 
    //意思是取arr长度，从0开始，全部取出，可以全部省略
    ```

5.  **❤️ 切片是可以在切片的的类型上进行，此时如果改变任何一个切片的值，两个切片都会被改变**

    ```go
    var arr [5]int = [...]int{11,22,33,44,55}
    slice := arr[1:4]  //22,33,44
    slice2 := slice[1:]  //33,44
    
    slice2[1] = 100  //33,100  
    fmt.Println(slice[3])  //100
    ```

    **即slice2 和slice指向的是同一个区间**



### len() 和 cap() 函数

切片是可索引的，并且可以由 len() 方法获取长度。

**切片提供了计算容量的方法 cap() 可以测量切片最长可以达到多少。**

#### 实例

```go
package main

import "fmt"

func main() {
   var numbers = make([]int,3,5)

   printSlice(numbers)
}

func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
}
```

以上实例运行输出结果为:

```
len=3 cap=5 slice=[0 0 0]
```



### 空(nil)切片

一个切片在未初始化之前默认为 nil，长度为 0，实例如下：

```go
package main

import "fmt"

func main() {
   var numbers []int

   printSlice(numbers)

   if(numbers == nil){
      fmt.Printf("切片是空的")
   }
}

func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
}
```

以上实例运行输出结果为:

```go
len=0 cap=0 slice=[]
切片是空的
```



### 切片截取

可以通过设置下限及上限来设置截取切片

```go
package main

import "fmt"

func main() {
   /* 创建切片 */
   numbers := []int{0,1,2,3,4,5,6,7,8}  
   printSlice(numbers)

   /* 打印原始切片 */
   fmt.Println("numbers ==", numbers)

   /* 打印子切片从索引1(包含) 到索引4(不包含)*/
   fmt.Println("numbers[1:4] ==", numbers[1:4])

   /* 默认下限为 0*/
   fmt.Println("numbers[:3] ==", numbers[:3])

   /* 默认上限为 len(s)*/
   fmt.Println("numbers[4:] ==", numbers[4:])

   numbers1 := make([]int,0,5)
   printSlice(numbers1)

   /* 打印子切片从索引  0(包含) 到索引 2(不包含) */
   number2 := numbers[:2]
   printSlice(number2)

   /* 打印子切片从索引 2(包含) 到索引 5(不包含) */
   number3 := numbers[2:5]
   printSlice(number3)

}

func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
}
```

执行以上代码输出结果为：

```
len=9 cap=9 slice=[0 1 2 3 4 5 6 7 8]
numbers == [0 1 2 3 4 5 6 7 8]
numbers[1:4] == [1 2 3]
numbers[:3] == [0 1 2]
numbers[4:] == [4 5 6 7 8]
len=0 cap=5 slice=[]
len=2 cap=9 slice=[0 1]
len=3 cap=7 slice=[2 3 4]
```



### append() 和 copy() 函数

#### append动态追加

```go
var slice []int = []int{100,200,300}
slice3 = append(slice,400,500)  
/*slice4则是一个新的空间，slice3被回收，如果是slice3，则在原来的空间扩容*/
fmt.Println("slice",slice)
```

1.  **如果想增加切片的容量，我们必须创建一个新的更大的切片并把原分片的内容都拷贝过来。**
2.  **使用append时Go底层创建一个新的数组newArr安装扩容后大小**
3.  **将slice原来包含的元素拷贝到新的数组，newArr是在底层维护的，程序员不可见**

![image-20220111153825921](https://s2.loli.net/2022/01/11/wYo3OA27hGmcfe8.png)

#### copy内置函数拷贝

```go
var slice4 []int = []int{1,2,3,4,5}
var slice5 = make([]int,10)
copy(slice5,slice4)   //将切片slice4拷贝为slice5

fmt.Println(slice4)  //1,2,3,4,5
fmt.Println(slice5)   //1,2,3,4,5,0,0,0,0,0
```

1.  **如果修改slice5的值，slice4不变，他们之间的数据空间是独立的**
2.  **默认情况下，使用make后，多余的空间默认为0**



下面的代码描述了从拷贝切片的 copy 方法和向切片追加新元素的 append 方法。

```go
package main

import "fmt"

func main() {
   var numbers []int
   printSlice(numbers)

   /* 允许追加空切片 */
   numbers = append(numbers, 0)
   printSlice(numbers)

   /* 向切片添加一个元素 */
   numbers = append(numbers, 1)
   printSlice(numbers)

   /* 同时添加多个元素 */
   numbers = append(numbers, 2,3,4)
   printSlice(numbers)

   /* 创建切片 numbers1 是之前切片的两倍容量*/
   numbers1 := make([]int, len(numbers), (cap(numbers))*2)

   /* 拷贝 numbers 的内容到 numbers1 */
   copy(numbers1,numbers)
   printSlice(numbers1)  
}

func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
    //定义输出格式的函数
}
```

以上代码执行输出结果为：

```go
len=0 cap=0 slice=[]
len=1 cap=1 slice=[0]
len=2 cap=2 slice=[0 1]
len=5 cap=6 slice=[0 1 2 3 4]
len=5 cap=12 slice=[0 1 2 3 4]
```

#### 参考python List append()

**append()方法可以用于在list 末尾添加新的对象**

```
list.append(abj)
```

+   abj是添加到末尾的对象
+   多个数字要用[]列表方式

**这种方法是没有返回值的，会修改原来的列表**

```python
[6]: a = [11,22,33,44]                                        
In [7]: a                                                     
Out[7]: [11, 22, 33, 44]
In [8]: a.append(55,66)   #错误                            
In [9]: a.append([55,66])                                   
In [10]: a                                             
Out[10]: [11, 22, 33, 44, [55, 66]
In [11]: a.append(77)                                         
In [12]: a                                               
Out[12]: [11, 22, 33, 44, [55, 66], 77]
```

>   **和Go语言不一样，python中是直接追加，在原来的基础上改变，而Go语言是需要一个新的切片来接收**



小细节**当使用拷贝的时候，如果当前切片容量不够怎么办，会报错吗？**

```go
package main

import "fmt"

func main() {
	a := []int{1,2,3,4,5}
	slice := make([]int,1)
	fmt.Println("a=",a)
	fmt.Println(slice)  //0
	copy(slice,a)
	fmt.Println(slice)   //不会报错，而且赋予的是第一个元素的值
}
```

![image-20220111155333096](https://s2.loli.net/2022/01/11/fUMkVtHBOwojLKA.png)



### string和slice

**==string 在底层是一种byte数组==，因此string可以进行切片处理操作**

>   上节string有讲解string进行切片处理

```go
str = "hello@gmail.com"
//使用切片获取gmail.com
silce := str[6:]
fmt.Println(slice)       //gamil.com
```

**string本身是不可变的，不可以通过`str[1]='f'来修改第三个字符`**

**因此：string是不可变的，如果需要改变，此时将其字符串转化为切片或者run切片，再转化为字符串**

#### Go语言中字符串修改

```go
str = "hello@gmail.com"
//arr1 := []byte(str)   //使用byte，中文会出现乱码
arr1 := []rune(str)
arr1[0] = '币'
str = string(arr1)
str := str[:5]  //获取hello
fmt.Println("str=",str)   //h币llo
```

**注意：byte是由字节处理的，所以如果要修改汉字的话会出现乱码。**

**改变：将string转化为[]rune即可，[]rune 是按照字符处理，兼容汉字**

>   ❤️❤️❤️ 和python中修改字符串的四种方法，Go大同小异

#### python中字符串修改

**方法1：将字符串转换成列表后修改值，然后用join组成新字符串**

![image-20220111161536827](https://s2.loli.net/2022/01/11/9n3TcoxvLqYsUCz.png)



**方法2: 通过字符串序列切片方式**

![image-20220111162006244](https://s2.loli.net/2022/01/11/AJL64XswhTe85mP.png)



**方法3: 使用字符串的replace函数**

![image-20220111162133508](https://s2.loli.net/2022/01/11/sBZm3o1Ix9EgCWb.png)



**方法4: 通过给一个变量赋值(或者重新赋值)**

![image-20220111162339699](https://s2.loli.net/2022/01/11/X2mwkKHlRDi7soF.png)

