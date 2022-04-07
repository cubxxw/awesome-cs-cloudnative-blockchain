😶‍🌫️go语言官方编程指南：[https://pkg.go.dev/std](https://pkg.go.dev/std)

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---

# 45天学会go --第十二天  Golang面对对象接口

[toc]

##  接口（interface)

> 可以想象usb是现实中的接口，同时usb可以作为多种不同的尺寸和排线，这种设计需求在golang中也是**大量**存在的

>  **按照循序应该是多态，但是在讲解多态之前需要讲解接口，因为在Golang中，多态的特性主要是通过接口来体现出来的**



#### 接口快速入门

```go
package main
import (
	"fmt"
)

//声明/定义一个接口
type Usb interface {
	//声明了两个没有实现的方法
	Start() 
	Stop()
}


//声明/定义一个接口
type Usb2 interface {
	//声明了两个没有实现的方法
	Start() 
	Stop()
	Test()
}


//定义手机的结构体，让结构体
type Phone struct {

}  

//让Phone 实现 Usb接口的方法
func (p Phone) Start() {
	fmt.Println("手机开始工作。。。")
}
func (p Phone) Stop() {
	fmt.Println("手机停止工作。。。")
}

type Camera struct {

}
//让Camera 实现   Usb接口的方法
func (c Camera) Start() {
	fmt.Println("相机开始工作~~~。。。")
}
func (c Camera) Stop() {
	fmt.Println("相机停止工作。。。")
}


//计算机
type Computer struct {

}

//编写一个方法Working 方法，接收一个Usb接口类型变量
//只要是实现了 Usb接口 （所谓实现Usb接口，就是指实现了 Usb接口声明所有方法）
func (c Computer) Working(usb Usb) {

	//通过usb接口变量来调用Start和Stop方法
	usb.Start()
	usb.Stop()
}

func main() {

	//测试
	//先创建结构体变量
	computer := Computer{}
	phone := Phone{}
	camera := Camera{}

	//关键点
	computer.Working(phone)
	computer.Working(camera) //实现camera
}
```



**在文档里面接口的文档也是非常多的**



### 接口概念

接口类型可以定义一组方法，但是这些不需要实现，而且Interface**不能包含任何的变量**

Go 语言提供了另外一种数据类型即接口，**它把所有的具有共性的方法定义在一起，任何其他类型只要实现了这些方法就是实现了这个接口。把所有方法全部实现了，叫做实现了接口**

实例

```golang
/* 定义接口 */
type interface_name interface {
   method_name1 [return_type]
   method_name2 [return_type]
   method_name3 [return_type]
   ...
   method_namen [return_type]
}

/* 定义结构体 */
type struct_name struct {
   /* variables */
}

/* 实现接口方法 */
func (struct_name_variable struct_name) method_name1() [return_type] {
   /* 方法实现 */
}
...
func (struct_name_variable struct_name) method_namen() [return_type] {
   /* 方法实现*/
}
```



**小结说明：**

1. 接口中所有的方法都没有方法体，即接口的方法都是没有实现的方法。接口体现了程序设计的**多态和高内聚低耦合**的思想

2. Golang中不需要显式存在，只要一个变量，含有接口类型中的所有方法，那么叫做这个变量实现了这个接口，
3. 接口本身不能创建实例，但是它可以指向一个实现了该接口的自定义类型的变量



**一个自定义类型可以实现多个接口**

```go
type BInterface interface{
	Say()
}
type AInterface interface{
	Hello()
}

type Monster struct{
//想让接口体monster即实现B接口也实现A接口
	
}
func (m monstall) Hello(){
	fmt.Println("monstall hello()~~")
}

func (m monstall) Say(){
	fmt.Println("monstall say()~~")
}
```

**此时此刻monstall实现了Ainterface  and Binterface**

```go
func main(){
    var monster Monster 
    var Atow AInterface = monster
    var Btow AInterface = monster
    Atow.Say()
    Btow.Hello()
}
```

**Golang接口中不可以有任何的变量**

```
type AInterface interface{
	int          //报错
	Hello()
}
```



**接口之间也可以有继承的关系（比如AInterface可以继承BInterface and CInterface)**

```go
/*************************************************************************           
    > File Name: Interface.go
    > Author: smile
    > Mail: 3293172751nss@gmail.com 
    > Created Time: Sat 05 Mar 2022 01:36:23 PM CST
 ************************************************************************/
package main
import (
    "fmt"
)

type BInterface interface {
    test01()      //定义test01一个方法
}

type CInterface interface {
    test02()
}

type AInterface interface {
    //at AInterface comprise BInterface and CInterface and it has its own way test03
    BInterface
    CInterface
    test03()     //意味着如果要实现Ainterface 就要实现下面的所有方法
}

//如果需要实现AInterface,就需要将BInterface CInterface的方法都实现
type Stu struct {
}

func (stu Stu) test01() {

}
func (stu Stu) test02() {
    
}
func (stu Stu) test03() {
    
}
//只有将三个方法全部实现了，那么stu就实现了AInterface 缺一不可！！！！！！！！
type T  interface{

}

func main() {
    var stu Stu 
    var a AInterface = stu 
    a.test01()

    var t T = stu //ok
    fmt.Println(t)
    var t2 interface{}  = stu 
    var num1 float64 = 8.8 
    t2 = num1
    t = num1
    fmt.Println(t2, t)
}

```

**接口是引用类型~，传值的时候是以引用方式（地址）传送进去的**



空接口**interface**{}**没有任何的方法**，**所有的类型都实现了空接口,我们可以把任何的变量赋值给空接口**

```go
type T  interface{
}

func main() {
    var t T = stu //ok
    fmt.Println(t)
    
    //也可以这样写：
    var t2 interface{}  = stu      
    var num1 float64 = 8.8 
    t2 = num1         //可以直接将num1赋值
    t = num1
    fmt.Println(t2, t)
}
```

**编译：**

```shell
[root@mail golang]# go build -o Interface Interface.go 
[root@mail golang]# ./Interface 
{}
8.8 8.8
```



**注意继承的时候，接口之间不可以有相同的方法名**

```go
type BInterface interface {
    test01()      //定义test01一个方法
    test02()
}

type CInterface interface {
    test02()
    test03()
}      /*---正常编译---*/

type AInterface interface {
	AInterface
	BInterface
}      /*---编译错误---*/
func main(){
 /*--报错：重复定义--*/   
}
```



### 接口实践

**常见报错，接口是属于引用传递**

```go
package main
import "fmt"
type Usb interface {
	Say()
}
type Stu struct {
}
func (this *Stu) Say() {
	fmt.Println("Say()")
}
func main() {
	var stu Stu = Stu{}
	// 错误！ 会报 Stu类型没有实现Usb接口 , 
	// 如果希望通过编译,  var u Usb = &stu
	var u Usb = stu  
	u.Say()
	fmt.Println("here", u)
}
```



> 实现对Hero结构体切片的排序
>
> 思想：使用冒泡排序也可以使用系统提供的方法



```go
package main
import (
	"fmt"
	"sort"   //使用系统的方法
	"math/rand"
)

//1.声明Hero结构体
type  Hero struct{
	Name string
	Age int
}

//2.声明一个Hero结构体切片类型
type HeroSlice []Hero

//3.实现Interface 接口
func (hs HeroSlice) Len() int {
	return len(hs)
}

//Less方法就是决定你使用什么标准进行排序
//1. 按Hero的年龄从小到大排序!!
func (hs HeroSlice) Less(i, j int) bool {
	return hs[i].Age < hs[j].Age
	//修改成对Name排序
	//return hs[i].Name < hs[j].Name
}

func (hs HeroSlice) Swap(i, j int) {
	//交换
	// temp := hs[i]
	// hs[i] = hs[j]
	// hs[j] = temp
	//下面的一句话等价于三句话
	hs[i], hs[j] = hs[j], hs[i]
}


//1.声明Student结构体
type  Student struct{
	Name string
	Age int
	Score float64
}

//将Student的切片，安Score从大到小排序!!

func main() {

	//先定义一个数组/切片
	var intSlice = []int{0, -1, 10, 7, 90}
	//要求对 intSlice切片进行排序
	//1. 冒泡排序...
	//2. 也可以使用系统提供的方法 
	sort.Ints(intSlice) 
	fmt.Println(intSlice)

	//请大家对结构体切片进行排序
	//1. 冒泡排序...
	//2. 也可以使用系统提供的方法

	//测试看看我们是否可以对结构体切片进行排序
	var heroes HeroSlice
	for i := 0; i < 10 ; i++ {
		hero := Hero{
			Name : fmt.Sprintf("英雄|%d", rand.Intn(100)),
			Age : rand.Intn(100),
		}
		//将 hero append到 heroes切片
		heroes = append(heroes, hero)
	}

	//看看排序前的顺序
	for _ , v := range heroes {
		fmt.Println(v)
	}

	//调用sort.Sort
	sort.Sort(heroes)
	fmt.Println("-----------排序后------------")
	//看看排序后的顺序
	for _ , v := range heroes {
		fmt.Println(v)
	}

	i := 10
	j := 20
	i, j = j, i
	fmt.Println("i=", i, "j=", j) // i=20 j = 10
}
```





### 接口VS继承

> 猴子如果学猴子，那就是继承，如果猴子想学鸟飞，学鱼游，就是接口

> 接口相当于是对继承的补充

```go
package main
import(
	"fmt"
)
type Monkey struct{
	Name string 
}

func (this *Monkey) climbing(){
	fmt.Println(this.Name,"生来会爬树..")
}

//Little Monkey结构体
type LittleMonkey struct{
	Monkey   //匿名结构体 
    //继承
}
func main(){
	//创建一个littleMonkey 实例
    monkey := LittleMonkey{
        Monkey{
            Name : "悟空",
        },
    }
    monkey.climbing()
}
```

```
[root@mail ~]# go run monkey.go 
悟空 生来会爬树..
```

**如果猴子想学飞？？？？☆*: .｡. o(≧▽≦)o .｡.:*☆ **

```go
//声明接口
type BirdAble interface{
	Flying()
}
type BirdAble interfacpackage main
import (
	"fmt"
)

//Monkey结构体
type Monkey struct {
	Name string
}

//声明接口
type BirdAble interface {
	Flying()
}

type FishAble interface {
	Swimming()
}

func (this *Monkey) climbing() {
	fmt.Println(this.Name, " 生来会爬树..")
}

//LittleMonkey结构体
type LittleMonkey struct {
	Monkey //继承
}


//让LittleMonkey实现BirdAble
func (this *LittleMonkey) Flying() {
	fmt.Println(this.Name, " 通过学习，会飞翔...")
}

//让LittleMonkey实现FishAble
func (this *LittleMonkey) Swimming() {
	fmt.Println(this.Name, " 通过学习，会游泳..")
}

func main() {

	//创建一个LittleMonkey 实例
	monkey := LittleMonkey{
		Monkey {
			Name : "悟空",
		},
	}
	monkey.climbing()
	monkey.Flying()
	monkey.Swimming()

}e{
	Flying()
}
type Monkey struct{
	Name string 
}

func (this *Monkey) climbing(){
	fmt.Println(this.Name,"生来会爬树..")
}

func (this *LittleMonkey) Swimming(){
	fmt.Println(this.Name,"通过学习会游泳..")
}
//Little Monkey结构体
type LittleMonkey struct{
	Monkey   //匿名结构体 
    //继承
}
func main(){
	//创建一个littleMonkey 实例
    monkey := LittleMonkey{
        Monkey{
            Name : "悟空",
        },
    }
    monkey.climbing()
    monkey.Swimming()
}
```

**实现接口可以看作是对继承的一种补充**



**接口和继承解决的问题不同**

1. 继承的主要价值在于：解决问题的**复用性和可维护性**
2. 接口的主要价值在于：**设计**，设计好各种规范（方法），让其他自定义类型去是实现这些方法



**接口比继承更加灵活**

+ 接口是比继承更加灵活的，继承
+ 是满足is - a的关系，而接口只需要满足like - a的关系



**接口在一定程度上实现代码解耦**





