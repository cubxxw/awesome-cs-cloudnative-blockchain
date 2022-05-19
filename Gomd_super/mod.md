# Go mod包

[toc]

### 介绍

+ **包（package）：是多个Go源码的集合**

+ package不局限于一个文件，**可以由多个文件组成。**

+ **不要求package的名称和所在目录名相同，**但是你最好保持相同，否则容易引起歧义（规范性）。

+ 每个子目录中**只能存在一个package**，否则编译时会报错。

+ package是以**绝对路径GOPATH来寻址**，不要用相对路径来import。



### Go mod init

> Go mod init是一个包管理工具

**子目录无需init,仅需要在==根目录下生成go.mod==**



### Go module

**阿里云代理go module服务器镜像**

##### [地址](http://mirrors.aliyun.com/goproxy/)

### 切换

```
$env:GOPROXY = "https://mirrors.aliyun.com/goproxy/"
```



### 自己新创建一个项目

1. `vim main.go`
2. 