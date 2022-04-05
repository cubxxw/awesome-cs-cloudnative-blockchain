[toc]

😶‍🌫️go语言官方编程指南：[https://golang.org/#](https://golang.org/#)  

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---



# Go语言操作redis

**使用Go语言操作redis需要安装第三方开源的redis库：[github.com/garyburd/redigo/redis](https://github.com/garyburd/redigo/redis)**

现在的地址：https://github.com/gomodule/redigo/tree/master/redis

**在gopath下面安装指令：**

```
go get github.com/garyburd/redigo/redis
```

**前提：安装git**



### 连接本地服务器

```go
package main
import (
	"fmt"
    "github.com/garyburd/redigo/redis"
	)
func main(){
    conn,err := redis.Dial("tcp","127.0.0.1:6379")
    if err != nil{
        fmt.Ptintln("err  = ",err)
       	return 
    }
    fmt.Println("conn succ...",conn)
}
```



**在我们调用github.com/garyburd/redigo/redis需要挎包**



### 传统连接redis:

```
conn := redis.Dial()
使用conn
conn.Close()
```



### 连接池

```
conn1
conn2
conn3
用完不关，此时用完还是可以连接
```

**Golang需要操作redis，直接通过连接池**

1. 事先初始化一定数量的连接，放在连接池
2. 当Go需要操作redis时候，直接从redis连接池中取出连接

> 这样可以节约临时获取redis时间，提高效率



### 连接池核心代码

```go
var pool *redis.Pool
pool = &redis.Pool{
	Maxldle:8,      //最大空闲，连接数目
	MaxActive:0,    //表示和数据库的最大连接数
	IdleTimeout:100,   //最大空闲时间
	Dial:func()(redis.Conn,error){    //初始化连接代码，连接哪一个ip的redis
	return redis,Dial("top","localhost:6379")
	},
}
c := pool.Get()  //从连接池中取出一个链接
pool.Close()   //关闭连接池
```

**最大连接数是最多的有多少连接，`MaxActive:0,`表示没有限制，但是系统是有限制的（并发和MaxIdle数目）  **

**pool.Close()   关闭连接池后就不可以再从连接池中取出连接了**



**案例**

```go
package main
import (
	"fmt"
    "github.com/garyburd/redigo/redis"
)

//定义一个全局变量
var pool *redis.Pool
func init(){   //注意：init函数是先执行的，在主函数执行之前执行init函数
    
    pool = &redis.Pool{
        Maxldle:8,      //最大空闲，连接数目
        MaxActive:0,    //表示和数据库的最大连接数
        IdleTimeout:100,   //最大空闲时间
        Dial:func()(redis.Conn,error){    //初始化连接代码，连接哪一个ip的redis
        return redis,Dial("top","localhost:6379")
     },
}
    
}
func main(){
	//先从pool取出一个连接
    conn,err := pool.Get()
    if err!= ok{
        fmt.Println("err = ",err)
    }
    defer conn.Close()       //defer 延迟关闭，defer是在函数都执行完毕后关闭资源

    _,err := conn.Do("set","name","汤姆猫")
    if err!= ok{
        fmt.Println("conn.Do err = ",err)
    }
    
    //取出
    r,err := redis.String(conn.Do("Get","name"))
    //转为字符串
    if err!= ok{
        fmt.Println("conn.Do err = ",err)
    }
    fmt.Println("r = ",r)
    
  
}1
```

*yum*

```
r = 汤姆猫
```

  **如果我们要从pool中取出连接，一定要保证连接池是没有关闭的！！！！！！**

```
pool.Close()
conn2 := pool.Get()
  _,err := conn2.Do("set","name","汤姆猫")
    if err!= ok{
        fmt.Println("conn.Do err = ",err)
    }
    
    //取出2
    r2,err := redis.String(conn.Do("Get","name"))
    //转为字符串
    if err!= ok{
        fmt.Println("conn2.Do err = ",err)
    }
    fmt.Println("r2 = ",r2)
```

