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

### 挎包使用

```

```



