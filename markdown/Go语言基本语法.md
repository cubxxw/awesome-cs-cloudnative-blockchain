[toc]



😶‍🌫️go语言官方编程指南：[https://golang.org/#](https://golang.org/#)  

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---

# 45天学会go --第四天 ，go语言的重要语法



## Go语言的switch语句

**Golang代码在书写时要注意`{}`的位置，保持良好的书写习惯。**

1.  **switch 语句用于基于不同条件执行不同动作，每一个 case 分支都是唯一的，从上至下逐一测试，直到匹配为止。**
2.  **switch 语句执行的过程从上至下，直到找到匹配项，==匹配项后面也不需要再加 break==。这一点和其他编程语言不同**
3.  **switch 默认情况下 case 最后自带 break 语句，匹配成功后就不会执行其他 case，如果我们需要执行后面的 case，可以使用 fallthrough 。**



### 语法

Go 编程语言中 switch 语句的语法如下：

```go
switch var1 {
    case val1:
        ...
    case val2:
        ...
    //case case val1, val2, val3:        -- 匹配到任意一个语句即可执行
    default:      //都不匹配，执行default，可以省略
        ...
}
```

变量 var1 可以是任何类型，而 val1 和 val2 则可以是同类型的任意值。类型不被局限于常量或整数，但必须是相同的类型；或者最终结果为相同类型的表达式。

您可以同时测试多个可能符合条件的值，使用逗号分割它们，例如：case val1, val2, val3。

**流程图：**

![image-20220107142145630](https://s2.loli.net/2022/01/07/nhHxjQ6iYCSXmtD.png)

**流程图解释：**

-   **由此可见，只要满足case其中的任何一条条件，都直接匹配，break退出循环，否则依次向下执行，最后执行default**

-   case中的多个表达式之间使用`,`间隔

-   **switch后面的语句是一个表达式即可，可以是一个函数的返回值**

    ==**注意：case后面的表达式不可以重复  -- 无意义**==,**但是你可以骗过编译器，使用一个变量赋值来作为表达式😂😂😂**



#### 实例

```go
package main
 
import "fmt"
 
func main() {
   /* 定义局部变量 */
   var grade string = "B"
   var marks int64
   fmt.Println("请输入一个值")
   fmt.Scanf("%c",&marks)
 
   switch marks {
      case 90: grade = "A"
      case 80: grade = "B"
      case 50,60,70 : grade = "C"
      default: grade = "D"  
   }
 
   switch {
      case grade == "A" :
         fmt.Printf("优秀!\n" )    
      case grade == "B", grade == "C" :
         fmt.Printf("良好\n" )      
      case grade == "D" :
         fmt.Printf("及格\n" )      
      case grade == "F":
         fmt.Printf("不及格\n" )
      default:
         fmt.Printf("差\n" );
   }
   fmt.Printf("你的等级是 %s\n", grade );      
}
```

**以上代码执行结果为：**

```
请输入一个值 60
优秀!
你的等级是 A
```



### fallthrough（穿透）

**如果在case语句块后增加fallthrough，则会继续执行下一个case，也叫switch穿透，可以想象为其他编译语言后面不加break**

**默认只能穿透一层**

#### 实例：

```go
package main

import "fmt"

func main() {

    switch {
    case false:
            fmt.Println("1、case 条件语句为 false")
            fallthrough
    case true:
            fmt.Println("2、case 条件语句为 true")
            fallthrough
    case false:
            fmt.Println("3、case 条件语句为 false")
            fallthrough
    case true:
            fmt.Println("4、case 条件语句为 true")
    case false:
            fmt.Println("5、case 条件语句为 false")
            fallthrough
    default:
            fmt.Println("6、默认 case")
    }
}
```

😂 **不建议使用，因为可以本身可以使用`,`对表达式语句隔开使用**



### Type Switch

switch 语句还可以被用于 type-switch **来判断某个 interface 变量中实际存储的变量类型。**

**Type Switch 语法格式如下：**

```go
switch x.(type){
    case type:
       statement(s);      
    case type:
       statement(s); 
    /* 你可以定义任意个数的case */
    default: /* 可选 */
       statement(s);
}
```



#### 实例

```go
package main

import "fmt"

func main() {
   var x interface{}
     
   switch i := x.(type) {
      case nil:  
         fmt.Printf(" x 的类型 :%T",i)                
      case int:  
         fmt.Printf("x 是 int 型")                      
      case float64:
         fmt.Printf("x 是 float64 型")          
      case func(int) float64:
         fmt.Printf("x 是 func(int) 型")                      
      case bool, string:
         fmt.Printf("x 是 bool 或 string 型" )      
      default:
         fmt.Printf("未知型")    
   }  
}
```

**以上代码执行结果为：**

```
x 的类型 :<nil>
```

**后面学接口再深入**



## switch和if比较：

1.   如果判断的具体数值不多，而且符合整数、浮点数、字符、字符串这几种类型，建议使用switch，简洁高效
2.   如果是对**区间和结果为bool类型的判断，使用if更好**

---



## for 循环

### 语法

Go 语言的 For 循环有 3 种形式，只有其中的一种使用分号。

1.   **和 C 语言的 for 一样：**

```go
for init; condition; post { }
```

2.   **和 C 的 while 一样：**

```go
for condition { }
```

3.   **和 C 的 for(;;) 一样：**

     **此时是一个死循环，这种写法通常配合break来终止**

```go
for { }      
```

-   **init： 一般为赋值表达式，给控制变量赋初值；**
-   **condition： 关系表达式或逻辑表达式，循环控制条件；**
-   **post： 一般为赋值表达式，给控制变量增量或减量。**

大多编程语言循环程序的流程图：

![img](https://www.runoob.com/wp-content/uploads/2015/06/go-loops.svg)     

for 循环是一个循环控制结构，可以执行指定次数的循环。



### for循环的执行顺序

1.   循环变量的初始化

2.   执行循环条件   例如`i<=10`

3.   如果循环条件为真，那么执行循环操作

4.   **执行循环变量的迭代**  -- i++（不可以是++i)

5.   反复执行，条件为false时，退出循环

     

### for语句执行过程

-   1、先对表达式 1 赋初值；
-   2、判别赋值表达式 init 是否满足给定条件，若其值为真，满足循环条件，则执行循环体内语句，然后执行 post，进入第二次循环，再判别 condition；否则判断 condition 的值为假，不满足条件，就终止for循环，执行循环体外语句。

==**for 循环的 range 格式可以对 slice、map、数组、字符串等进行迭代循环。（后面有讲）**==

**格式如下：**

```go
for key, value := range oldMap {
    newMap[key] = vgoalue
}
```

for 语句语法流程如下图所示：

![img](https://s2.loli.net/2022/01/07/CsmrNK5EVByjinz.png)

#### 实例1：

>   计算 1 到 10 的数字之和：

```go
package main

import "fmt"

func main() {
        sum := 0
        for i := 0; i <= 10; i++ {   //循环结束的时候i=11 
//i在for循环中定义，只能在for中使用，如果在循环外定义，那么i最后输出为11
                sum += i
        }
        fmt.Println(sum/*，i*/)
}
```

**输出结果为：**

```
55
```



**init 和 post 参数是可选的，我们可以直接省略它，类似 While 语句。**

以下实例在 sum 小于 10 的时候计算 sum 自相加后的值：

#### 实例2

```go
package main

import "fmt"

func main() {
        sum := 1
        for ; sum <= 10; {
                sum += sum
        }
        fmt.Println(sum)

     // 这样写也可以，更像 While 语句形式
     for sum <= 10{
             sum += sum
     }
     fmt.Println(sum)

}
```

**输出结果为：**

```
16
16
```



### 无限循环:

#### 实例3

```go
package main

import "fmt"

func main() {
        sum := 0
        for {
            sum++ // 无限循环下去
        }
        fmt.Println(sum) // 无法输出
}
```

要停止无限循环，可以在命令窗口按下`ctrl-c` 。



### For-each range 循环

**这种格式的循环可以对字符串、数组、切片等进行迭代输出元素。（参考python，后面有介绍）**

#### 实例4

```go
package main
import "fmt"

func main() {
        strings := []string{"google", "runoob"}
        for i, s := range strings {
                fmt.Println(i, s)
        }
	 numbers := [6]int{1, 2, 3, 5}
 	 for i,x:= range numbers {
    	 fmt.Printf("第 %d 位 x 的值 = %d\n", i,x)
 	 }  
}
```

**以上实例运行输出结果为:**

```
0 google
1 runoob
第 0 位 x 的值 = 1
第 1 位 x 的值 = 2
第 2 位 x 的值 = 3
第 3 位 x 的值 = 5
第 4 位 x 的值 = 0
第 5 位 x 的值 = 0
```





#### 实例5

```go
//对字符串遍历的传统方式
var str string = "hello"
for i := 1;i< len(str);i++{
    fmt.Printf("%c\n",str[i])
}

//使用for - each reage 遍历
for i,j := range str{
    fmt.Printf("i=%d,j=%c\n",i,j)
}
```

**输出：**

```
h
e
l
l
o
0 = h
1 = e
2 = l
3 = l
4 = o
```



### 注意

>   **我们的字符串如果是中文，那么会出现乱码，因为传统的遍历对字符串遍历是通过字节的，英文是一个字节，而中文是三个字节，那么该怎么解决？**

**解决：需要将str 转化为[]rune切片(类似于python，后面有讲）**

==但是需要一个新的变量str2来接收，否则会报错==

**for range遍历很智能，默认是使用字符的方式遍历，因此字符串有中文，也可以遍历**

#### 注意案例

```go
//对字符串遍历的传统方式
var str string = "hello中国"
str2 = []rune(str)    //意思是把str转化为rune切片
 
for i := 1;i< len(str2);i++{
    fmt.Printf("%c\n",str2[i])
}
```

**编译**：

```
h
e
l
l
o
中
国
```



## while 和 do...while的实现

>   **在Golang语言中是没有while和do while的语法，如果我们需要使用其它语言的while和do while 语法，可以==通过for循环==来实现效果**

### for循环实现while

```go
循环变量初始化
for{
	if循环判断语句{
	break    //跳出for循环
	}
	循环操作
	循环变量迭代
}
```

**说明：**

**1. for循环是一个无限循环**

**2. break语句跳出循环**



### for循环实现do while

```go
循环变量初始化
for{
	循环操作
	循环变量迭代
	if循环条件表达式{
	break  //跳出for循环
	}
}
```

**区别：先操作再循环**



## 嵌套循环

>   依旧如此，不建议超过三次，否则时间复杂度很大

Go 语言允许用户在循环内使用循环。接下来我们将为大家介绍嵌套循环的使用。

### 语法

**以下为 Go 语言嵌套循环的格式：**

```go
for [condition | ( init; condition; increment ) | Range]
{
  for [condition | ( init; condition; increment ) | Range]
  {
   statement(s);
  }
  statement(s);
}
```



#### 实例 

>以下实例使用循环嵌套来输出 2 到 100 间的素数
>
>**分析：**i从2开始，一直到100结束，素数是指没有因子的数
>
>**解题方法：将复杂问题分解成简单问题，先死后活**

```go
package main

import "fmt"

func main() {
   /* 定义局部变量 */
   var i, j int

   for i=2; i < 100; i++ {
      for j=2; j <= (i/j); j++ {
         if(i%j==0) {
            break; // 如果发现因子，则不是素数
         }
      }
      if(j > (i/j)) {
         fmt.Printf("%d  是素数\n", i);
      }
   }  
}

```

**以上实例运行输出结果为:**

```
2  是素数
3  是素数
5  是素数
7  是素数
11  是素数
13  是素数
17  是素数
19  是素数
23  是素数
29  是素数
31  是素数
37  是素数
41  是素数
43  是素数
47  是素数
53  是素数
59  是素数
61  是素数
67  是素数
71  是素数
73  是素数
79  是素数
83  是素数
89  是素数
97  是素数
```







```
You can also find existing translations of the string and translations into othe
languages in this section, as well as translation memory matches and machine
translation translation suggestions
```





## break

Go 语言中 break 语句用于以下两方面：

-   用于循环语句中跳出循环，并开始执行循环之后的语句。
-   break 在 switch（开关语句）中在执行一条 case 后跳出语句的作用。
-   在多重循环中，可以用标号 label 标出想 break 的循环。

### 语法

**break 语法格式如下：**

```go
break;
```

**说明：break默认跳出最近的循环，双重循环则跳出最里层**

**break后面可以指定标签，label，可以指定跳出到标签对应的循环中**



## Go 语言 continue 语句

-   Go 语言的 continue 语句 有点像 break 语句。但是 continue 不是跳出循环，而是跳过当前循环执行下一次循环语句。
-   for 循环中，执行 continue 语句会触发 for 增量语句的执行。
-   在多重循环中，可以用标号 **label 标出想 continue 的循环（和break中的标签一样）**。

### 语法

**continue 语法格式如下：**

```go
continue;
```

#### 案例

```go
package main

import "fmt"

func main() {

// 不使用标记
fmt.Println("---- continue ---- ")
for i := 1; i <= 3; i++ {
    fmt.Printf("i: %d\n", i)
        for i2 := 11; i2 <= 13; i2++ {
            fmt.Printf("i2: %d\n", i2)
            continue
        }
}

// 使用标记
fmt.Println("---- continue label ----")
re:                 //标记点
    for i := 1; i <= 3; i++ {
        fmt.Printf("i: %d\n", i)
            for i2 := 11; i2 <= 13; i2++ {
                fmt.Printf("i2: %d\n", i2)
                continue re            //直接跳出循环
            }
    }

}
```

**以上实例执行结果为：**

```
---- continue ---- 
i: 1
i2: 11
i2: 12
i2: 13
i: 2
i2: 11
i2: 12
i2: 13
i: 3
i2: 11
i2: 12
i2: 13
---- continue label ----
i: 1
i2: 11
i: 2
i2: 11
i: 3
i2: 11
```

## Go 语言 goto 语句

>   建议尽量不使用goto，但是Go 语言是支持goto

Go 语言的 goto 语句可以无条件地转移到过程中指定的行。

goto 语句通常与条件语句配合使用。可用来实现条件转移， 构成循环，跳出循环体等功能。

但是，在结构化程序设计中一般不主张使用 goto 语句， 以免造成程序流程的混乱，使理解和调试程序都产生困难。

### 语法

goto 语法格式如下：

```go
goto label;               //可以向后跳转
..
.
label: statement;
```

![image-20220107172824206](https://s2.loli.net/2022/01/07/GZHeg2rnsaCjqI8.png)



### 实例

在变量 a 等于 15 的时候跳过本次循环并回到循环的开始语句 LOOP 处：

## 实例

```go
package main

import "fmt"

func main() {
   /* 定义局部变量 */
   var a int = 10

   /* 循环 */
   LOOP: for a < 20 {    //定义一个标签LOOP
      if a == 15 {
         /* 跳过迭代 */
         a = a + 1
         goto LOOP
      }
      fmt.Printf("a的值为 : %d\n", a)
      a++    
   }  
}
```

以上实例执行结果为：

```
a的值为 : 10
a的值为 : 11
a的值为 : 12
a的值为 : 13
a的值为 : 14
a的值为 : 16
a的值为 : 17
a的值为 : 18
a的值为 : 19
```

**goto 一般和if语句配合使用，而且goto本身语言并没有问题，更多的是开发者的问题。但还是尽量避免goto语句😂😂**



## 跳转控制语句return

**return一般是用在函数或者方法中，比break更彻底，下面的代码都不执行**

**如果return放在main中，那么表示整个程序的结束；放在其他函数里，表示跳出当前的函数**

>   **函数讲**



## 补：python中循环

### 基本的循环方法   -- 使用range

```python
In [3]: for i in range(5):
   ...:     print(i)
   ...:
0
1
2
3
4
```

```python
In [9]: for i in range(2,10,2):
   ...:     print(i)
   ...:
2
4
6
8
```



### 字符串遍历和Go较智能

```python
In [14]: name = "lihua你好"

In [15]: for i in name:
    ...:     print(i)
    ...:
l
i
h
u
a
你
好
```

**当然，Go中使用切片（rune）或者range也可以实现输出中文**



### while

```python
while循环有三个
	while i<5:
		主函数
	else:
//不满足while条件的时候执行else
```

```python
In [2]: i = 1
   ...: while i < 10:
   ...:     i += 1
   ...:     if i%2 > 0:     # 非双数时跳过输出
   ...:         continue
   ...:     print(i)         # 输出双数2、4、6、8、10
   ...:
   ...: i = 1
   ...: while 1:            # 循环条件为1必定成立
   ...:     print(i)         # 输出1~10
   ...:     i += 1
   ...:     if i > 10:     # 当i大于10时跳出循环
   ...:         break
   ...:
2
4
6
8
10
1
2
3
4
5
6
7
8
9
10
```

**python中使用while支持else，不满足此条件则开始else，相当于其他编程语言的`where+if`**

```python
In [4]: count = 0
   ...: while count < 5:
   ...:    print (count, " is  less than 5")
   ...:    count = count + 1
   ...: else:
   ...:    print (count, " is not less than 5")
   ...:
0  is  less than 5
1  is  less than 5
2  is  less than 5
3  is  less than 5
4  is  less than 5
5  is not less than 5
```

