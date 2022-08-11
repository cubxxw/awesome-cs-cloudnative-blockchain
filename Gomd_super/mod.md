# Go mod包

[toc]

## 介绍

+ [x] [项目地址仓库](https://github.com/3293172751/go-mod/)

+ **包（package）：是多个Go源码的集合**

+ package不局限于一个文件，**可以由多个文件组成。**

+ **不要求package的名称和所在目录名相同，**但是你最好保持相同，否则容易引起歧义（规范性）。

+ 每个子目录中**只能存在一个package**，否则编译时会报错。

+ package是以**绝对路径GOPATH来寻址**，不要用相对路径来import。



## Go mod init

> Go mod init是一个包管理工具

**子目录无需init,仅需要在==根目录下生成go.mod==**



## Go module

**阿里云代理go module服务器镜像**

+ [地址](http://mirrors.aliyun.com/goproxy/)



## 切换

```
$env:GOPROXY = "https://mirrors.aliyun.com/goproxy/"
```



## 自己新创建一个项目

# Go-mod包

[toc]

### 包的导入方式

1. 绝对路径导入（在GOPATH目录中导入包）

2. 相对路径导入（不建议！！！）

3. 点导入

   - 相当于直接复制源文件过来，此时不需要用.

     ```
     Println("hello word")
     ```

4. 别名导入

5. 下划线导入

### Go-mod方式管理包

#### 优势：

- **代码可以放在任意位置，不用设置GOPATH**
- **自动下载依赖管理**
- **版本控制**
- **不允许使用相对导入**
- **replace机制（goproxy代理机制）**

### 项目开始~

> 为了理清关系，这一节从头开始做

**目录结构**

[![image-20220525220447501](assets/68747470733a2f2f73322e6c6f6c692e6e65742f323032322f30352f32352f654b495632556e544c6a6357524a432e706e67.png)](https://camo.githubusercontent.com/c39c646caad849f1c081432e6a9e5d43fd4811b52eb0648d3e0d187892df90b0/68747470733a2f2f73322e6c6f6c692e6e65742f323032322f30352f32352f654b495632556e544c6a6357524a432e706e67)

**我们的项目就叫go-mod**

```
mkdir go-mod
cd go-mod
mkdir hello
```

### 为代码启用依赖项跟踪

**需要设置名字，一般和报名是一样的**

```
PS C:\Users\smile\Desktop\区块链\code\go-mod> go mod init go-mod
go: creating new go.mod: module go-mod
go: to add module requirements and sums:
        go mod tidy
```

**查看模块**

```
module go-mod

go 1.18
```

**编辑hello.go**

```
package main

import "fmt"

func main() {
	fmt.Println("hello word")
}
```

**编译：**

```
PS C:\Users\smile\Desktop\区块链\code\go-mod\hello> go run . 
hello word
```

**目录结构**

```
PS C:\Users\smile\Desktop\区块链\code\go-mod> tree
卷 系统 的文件夹 PATH 列表
卷序列号为 DE95-1D97
C:.
├─hello
└─main

PS C:\Users\smile\Desktop\区块链\code\go-mod> cd .\main\
PS C:\Users\smile\Desktop\区块链\code\go-mod\main> New-Item main.go            

    目录: C:\Users\smile\Desktop\区块链\code\go-mod\main

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         2022/5/25     21:32              0 main.go
```

**创建一个包文件夹,创建一个文件task.go**

```
PS C:\Users\smile\Desktop\区块链\code\go-mod> mkdir models


    目录: C:\Users\smile\Desktop\区块链\code\go-mod


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         2022/5/25     22:00                models

PS C:\Users\smile\Desktop\区块链\code\go-mod> New-Item task.go

    目录: C:\Users\smile\Desktop\区块链\code\go-mod

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         2022/5/25     22:02              0 task.go
```

**主函数**

```
package main

import (
	. "fmt"
	"go-mod/hello"
	"go-mod/models"
)

func main() {
	Println("main主函数")
	hello.Hello()
	Println(models.Name)
	//hello.Hello()
}
```

**编译：**

```
PS C:\Users\smile\Desktop\区块链\code\go-mod> go run .\main.go
main主函数
hello word
test
```

### 所出现问题

文件mod包嵌入使用的问题，导致mod机制没办法正常在子目录使用~

### github导入包

```
package models

import "fmt"
import "github.com/astaxie/beego"

var Name = "test"

func init() {
	fmt.Println("最先开始调用多个")
}

func main() {
	beego.Run()
}
```

**回到主目录**

```
PS C:\Users\smile\Desktop\区块链\code\go-mod>  go get github.com/astaxie/beego
```

**下载依赖，查看go-mod**

```
module go-mod

go 1.18

require (
	github.com/astaxie/beego v1.12.3 // indirect
	github.com/beorn7/perks v1.0.1 // indirect
	github.com/cespare/xxhash/v2 v2.1.1 // indirect
	github.com/golang/protobuf v1.4.2 // indirect
	github.com/hashicorp/golang-lru v0.5.4 // indirect
	github.com/matttproud/golang_protobuf_extensions v1.0.1 // indirect
	github.com/prometheus/client_golang v1.7.0 // indirect
	github.com/prometheus/client_model v0.2.0 // indirect
	github.com/prometheus/common v0.10.0 // indirect
	github.com/prometheus/procfs v0.1.3 // indirect
	github.com/shiena/ansicolor v0.0.0-20151119151921-a422bbe96644 // indirect
	golang.org/x/crypto v0.0.0-20191011191535-87dc89f01550 // indirect
	golang.org/x/net v0.0.0-20190620200207-3b0461eec859 // indirect
	golang.org/x/sys v0.0.0-20200615200032-f1bc736245b1 // indirect
	golang.org/x/text v0.3.0 // indirect
	google.golang.org/protobuf v1.23.0 // indirect
	gopkg.in/yaml.v2 v2.2.8 // indirect
)
```

**还有一个go sum文件**

### 远程推送到github上

1. 在github上新建一个项目Go-mod
2. `go mod init github.com/3293172751/go-mod`
3. 添加readme.m