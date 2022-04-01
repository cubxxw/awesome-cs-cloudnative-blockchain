

[toc]

😶‍🌫️go语言官方编程指南：[https://golang.org/#](https://golang.org/#)  

>   go语言的官方文档学习笔记很全，推荐去官网学习

😶‍🌫️我的学习笔记：github: [https://github.com/3293172751/golang-rearn](https://github.com/3293172751/golang-rearn)

---

**区块链技术（也称之为分布式账本技术）**，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录

>   ❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客[http://nsddd.top](http://nsddd.top)

---

# TCP 编程

## 网络编程

1. **TCP socket编程：目前网络编程的主流，底层使用TCP/IP协议（ipv4/ipv6)的，比如说qq**
2. **b/s结构的http编程：http的底层也是用tcp socket实现的（web开发）**

> 以后做服务器开发，推荐自顶向下

```
ipv4：四个字节表示的地址      32位
ipv6：十六位字节表示的地址		128位
```



### 端口（port)

**指的是TCP/IP协议中的端口，是逻辑意义上的端口**

**服务程序必须要监听一个端口**

> 我们在做服务器的时候应该尽可能少开放端口，否则可能会有危险

**一个端口只能被一个程序监听**

```
netstat -an :查看本机有哪些端口在监听
netstat -anb:查看监听端口的pid，结合任务管理器关闭不安全端口
```

### 处理流程

**服务端：**

1. 监听端口
2. 接收tcp链接，建立和客户端链接
3. 创建goroutine,处理该连接的请求（*客户端通过链接发送请求包*）

**客户端：**

1. 建立和服务端链接
2. 发送请求数据，接收服务端返回的数据
3. 关闭连接



**在做网络中，我们最常用的包net**

## net

**服务端**

```go
package main
import (
	"fmt"
	"net" //做网络socket开发时,net包含有我们需要所有的方法和函数
	_"io"
)

func process(conn net.Conn) {

	//这里我们循环的接收客户端发送的数据
	defer conn.Close() //关闭conn

	for {
		//创建一个新的切片
		buf := make([]byte, 1024)
		//conn.Read(buf)
		//1. 等待客户端通过conn发送信息
		//2. 如果客户端没有wrtie[发送]，那么协程就阻塞在这里
		//fmt.Printf("服务器在等待客户端%s 发送信息\n", conn.RemoteAddr().String())
		n , err := conn.Read(buf) //从conn读取
		if err != nil {
			
			fmt.Printf("客户端退出 err=%v", err)
			return //!!!
		}
		//3. 显示客户端发送的内容到服务器的终端
		fmt.Print(string(buf[:n])) 
	}

}

func main() {

	fmt.Println("服务器开始监听....")
	//net.Listen("tcp", "0.0.0.0:8888")
	//1. tcp 表示使用网络协议是tcp
	//2. 0.0.0.0:8888 表示在本地监听 8888端口,支持ipv4和ipv6
	listen, err := net.Listen("tcp", "0.0.0.0:8888")
	if err != nil {
		fmt.Println("listen err=", err)
		return 
	}
	defer listen.Close() //延时关闭listen

	//循环等待客户端来链接我
	for {
		//等待客户端链接
		fmt.Println("等待客户端来链接....")
		conn, err := listen.Accept()
		if err != nil {
			fmt.Println("Accept() err=", err)
			
		} else {
			fmt.Printf("Accept() suc con=%v 客户端ip=%v\n", conn, conn.RemoteAddr().String())
		}
		//这里准备其一个协程，为客户端服务
		go process(conn)
	}
	
	//fmt.Printf("listen suc=%v\n", listen)
}
```

**客户端**

```go
package main
import (
	"fmt"
	"net"
	"bufio"
	"os"
	"strings"
)

func main() {

	conn, err := net.Dial("tcp", "192.168.20.253:8888")
	if err != nil {
		fmt.Println("client dial err=", err)
		return 
	}
	//功能一：客户端可以发送单行数据，然后就退出
	reader := bufio.NewReader(os.Stdin) //os.Stdin 代表标准输入[终端]

	for {

		//从终端读取一行用户输入，并准备发送给服务器
		line, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("readString err=", err)
		}
		//如果用户输入的是 exit就退出
		line = strings.Trim(line, " \r\n")
		if line == "exit" {
			fmt.Println("客户端退出..")
			break
		}

		//再将line 发送给 服务器
		_, err = conn.Write([]byte(line + "\n"))
		if err != nil {
			fmt.Println("conn.Write err=", err)	
		}
	}

}
```



```
net.ResolveIPAddr()
```

**根据域名查找IP地址**

不得不感叹Go为开发者考虑良多，godoc这个工具真的很方便！先看下源码。

```go
$ godoc -src net.ResolveIPAddr
func ResolveIPAddr(net, addr string) (*IPAddr, error) {
    if net == "" {
        net = "ip"
    }
    afnet, _, err := parseNetwork(net)
    if err != nil {
        return nil, err
    }
    switch afnet {          //检测
    case "ip", "ip4", "ip6":
    default:
        return nil, UnknownNetworkError(net)
    }
    addrs, err := internetAddrList(afnet, addr, noDeadline)
    if err != nil {
        return nil, err
    }
    return addrs.first(isIPv4).(*IPAddr), nil
}
```

我们又从源码中学习了一招：`case "ip", "ip4", "ip6"`。switch的一个case直接检测多个值的方法，如果不匹配则执行default中的代码。

可以看到，net和addr形参都接受string类型，而返回**IPAddr**的指针类型，和error类型的值。

来使用一下：

```go
package main

import (
    "fmt"
    "net"
)

func main() {
    addr, err := net.ResolveIPAddr("ip", "www.baidu.com")
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }
    fmt.Println(addr.IP)
```

输出：
![这里写图片描述](http://img.blog.csdn.net/20160330140849611)

注意看ResolveIPAddr的源码，如果你传给net的参数不是`"ip", "ip4", "ip6"`其中的一个，那么err就不会是nil，而是`UnknownNetworkError(net)`，错误的输出信息会是这样的：
`unknown network tcp`。

## net.ParseIP()

**检查IP地址格式是否有效**

依照惯例，我们来看一下源码，`$ godoc -src net ParseIP`：

```go
func ParseIP(s string) IP {
    for i := 0; i < len(s); i++ {
        switch s[i] {
        case '.':
            return parseIPv4(s)
        case ':':
            ip, _ := parseIPv6(s, false)
            return ip
        }
    }
    return nil
}
```

IPv4用`.`号隔开，IPv6用`：`号隔开，所以这个函数的内部又进行了判断其是IPv4还是IPv6。

注意：你不要手动去调用`net.parseIPv4`或者`net.parseIPv6`，会报如下错误：

```
cannot refer to unexported name net.parseIPV4
undefined: net.parseIPV4
```

因为Go利用首字母的大小写来限制包外是否可访问，小写的函数或变量在包外无法访问到，就如同Java的`public，private`修饰符。

查看`parseIPv4`的源码又发现：

```go
func parseIPv4(s string) IP {
    // ...
    return IPv4(p[0], p[1], p[2], p[3])
}
```

再追溯到`IPv4上`

```go
func IPv4(a, b, c, d byte) IP {
    p := make(IP, IPv6len)
    copy(p, v4InV6Prefix)
    p[12] = a
    p[13] = b
    p[14] = c
    p[15] = d
    return p
}
```

我们发现这些函数都返回了`IP`对象，我们来看一下IP对象的定义：
`type IP []byte`
其实就是一个自定义的数组切片类型。

`IPv4`内部用make初始化了一个数组切片，并且指定了元素个数为`IPv6len`。`IPv6len`被定义为常量：

```go
const (
    IPv6len = 16
)
```

然后进行将`v4InV6Prefix`复制到到数组切片`p`中，`copy`的用法请自行搜索（注意copy的行为和常人的理解不同）：

```go
var v4InV6Prefix = []byte{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xff, 0xff}
```

至于储存IPv4的数组切片为什么要分配16个元素的大小，又复制给最后四个索引，可以看`type IP []byte`的注释：

```go
// An IP is a single IP address, a slice of bytes.
// Functions in this package accept either 4-byte (IPv4)
// or 16-byte (IPv6) slices as input.
//
// Note that in this documentation, referring to an
// IP address as an IPv4 address or an IPv6 address
// is a semantic property of the address, not just the
// length of the byte slice: a 16-byte slice can still
// be an IPv4 address.
type IP []byte
```

这说了，一个`16-byte`大小的数组可以仍然作为IPv4地址。创建数组切片`slice1 := make([]int, 5)`其初始值都为**0**。