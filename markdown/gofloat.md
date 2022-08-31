# Go语言精度丢失问题

[toc]

## 问题描述

**在使用Go做项目的时候，一定要注意Go语言的精度丢失问题，如下：**

```go
[root@mail golang]# cat gofloat.go 
/*************************************************************************
    > File Name: gofloat.go
    > Author: smile
    > Mail: 3293172751nss@gmail.com 
    > Created Time: Wed 31 Aug 2022 05:43:18 PM CST
 ************************************************************************/
package main
import(
    "fmt"
)

func main(){

    //Go语言精度丢失问题
    m1 := 8.3
    m2 := 3.8
    fmt.Println("m1 - m2 = ",m1 - m2)
}
[root@mail golang]# go run  gofloat.go
m1 - m2 =  4.500000000000001
```

> 可以看到输出的`m1` - `m2` =  `4.500000000000001`



### 为什么不直接使用 float64？

因为 float64（或任何二进制浮点类型，实际上）不能`0.1`准确地表示数字。

考虑以下代码：http://play.golang.org/p/TQBd4yJe6B您可能期望它打印出来`10`，但实际上打印出来`9.999999999999831`。随着时间的推移，这些小错误真的会加起来！



### 为什么不直接使用 big.Rat？

big.Rat 适合表示有理数，但 Decimal 更适合表示金钱。为什么？这是一个（人为的）示例：

假设你使用 big.Rat，你有两个数字，x 和 y，都代表 1/3，你有`z = 1 - x - y = 1/3`. 如果将每一个都打印出来，则字符串输出必须在某处停止（为简单起见，假设它停止在 3 个十进制数字处），因此您将得到 0.333、0.333 和 0.333。但是另一个 0.001 去哪儿了？

这是上面的示例代码：[http ://play.golang.org/p/lCZZs0w9KE](http://play.golang.org/p/lCZZs0w9KE)

使用 Decimal，打印出来的字符串准确地表示数字。所以，如果你有`x = y = 1/3`（精度为 3），它们实际上将等于 0.333，当你这样做时`z = 1 - x - y`，它们`z`将等于 0.334。没有钱是下落不明的！

你还是要小心。如果您想以`N`3 种方式拆分数字，则不能只发送`N/3`给三个不同的人。你必须选择一个发送 `N - (2/3*N)`到。该人将获得一分钱的剩余部分。

但是，使用 Decimal 比使用 big.Rat 更容易小心。



### 出现原因总结

+ 出现浮点数不精确的原因是，浮点数储存至内存中时，2的-1、-2……-n次方不能精确表示小数部分，所以再把这个数从地址中取出来进行计算就出现了偏差。

+ 不是所有的float相加减乘除都一定出现偏差，具体要根据golang实现IEEE 754的情况定。



## 解决方法

> 使用第三方包来解决精度丢失问题
>
> + [https://github.com/shopspring/decimal](https://github.com/shopspring/decimal)

**用法**

```go
package main

import (
	"fmt"
	"github.com/shopspring/decimal"
)

func main() {
	price, err := decimal.NewFromString("136.02")
	if err != nil {
		panic(err)
	}

	quantity := decimal.NewFromInt(3)

	fee, _ := decimal.NewFromString(".035")
	taxRate, _ := decimal.NewFromString(".08875")

	subtotal := price.Mul(quantity)

	preTax := subtotal.Mul(fee.Add(decimal.NewFromFloat(1)))

	total := preTax.Mul(taxRate.Add(decimal.NewFromFloat(1)))

	fmt.Println("Subtotal:", subtotal)                      // Subtotal: 408.06
	fmt.Println("Pre-tax:", preTax)                         // Pre-tax: 422.3421
	fmt.Println("Taxes:", total.Sub(preTax))                // Taxes: 37.482861375
	fmt.Println("Total:", total)                            // Total: 459.824961375
	fmt.Println("Tax rate:", total.Sub(preTax).Div(preTax)) // Tax rate: 0.08875
}
```



## 完美解决

```go
/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-08-31 17:58:18
 * @LastEditors: xiongxinwei 3293172751nss@gmail.com
 * @LastEditTime: 2022-08-31 17:58:35
 * @FilePath: \code\gofloat\gofloat.go
 * @Description: Go语言精度丢失问题
 */
 package main

 import (
	 "fmt"
 
	 "github.com/shopspring/decimal"
 )
 
 func main() {
 
	 //Go语言精度丢失问题
	 m1 := 8.3
	 m2 := 3.8
	 fmt.Println("m1 - m2 = ", m1-m2)
 
	 var num1 float64 = 3.1
	 var num2 float64 = 4.2
	 d1 := decimal.NewFromFloat(num1).Add(decimal.NewFromFloat(num2))
	 fmt.Println("num1 - num2 = ", d1)
 }
 
```



**编译：**

```
PS D:\文档\git\Block_Chain\go-advancend\code\gofloat> go run .\gofloat.go
m1 - m2 =  4.500000000000001
num1 - num2 =  7.3
```

