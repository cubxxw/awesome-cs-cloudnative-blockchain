# 计算机网络 – TCP/IP

<p align='center'>
<a href="https://www.linkedin.cn/injobs/in/xiongxinwei-xiong-7606a0227" target="_blank"><img src="https://img.shields.io/badge/linkedin-xiongxinwei-yellowgreen?logo=linkedin"></a>
<a href="https://twitter.com/xxw3293172751" target="_blank"><img src="https://img.shields.io/badge/twitter-%40xxw3293172751-informational?logo=twitter"></a>
<a href="https://www.zhihu.com/people/3293172751" target="_blank"><img src="https://img.shields.io/badge/%E7%9F%A5%E4%B9%8E-%E9%93%BE%E5%AD%A6%E8%80%85%E7%A4%BE%E5%8C%BA-blue?logo=zhihu"></a>
<a href="https://s2.loli.net/2022/07/05/sQHuozItvWg1heA.jpg" target="_blank"><img src="https://img.shields.io/badge/%E5%BE%AE%E4%BF%A1-smile-brightgreen?logo=wechat"></a>
<a href="https://space.bilibili.com/14089380" target="_blank"><img src="https://img.shields.io/badge/b%E7%AB%99-%E6%97%A0%E4%B8%8E%E4%BC%A6%E6%AF%94%E7%9A%84%E5%BE%97%E5%BE%97-red?logo=bilibili"></a>
</p>
<p align='center'>
<a href="https://weibo.com/u/6248930985" target="_blank"><img src="https://img.shields.io/badge/%E5%BE%AE%E5%8D%9A-%E6%97%A0%E4%B8%8E%E4%BC%A6%E6%AF%94%E7%9A%84%E5%BE%97%E5%BE%97-critical?style=social&logo=Sina%20Weibo"></a>
<a href="https://github.com/3293172751" target="_blank"><img src="https://img.shields.io/badge/Github-xiongxinwei-inactive?style=social&logo=github"></a>
</p>
---

## 课程推荐

 🧷计网著名教材《自顶向下方法》的配套学习资源 [Computer Networking: A Top-Down Approach](https://csdiy.wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/topdown/)。

+ [x] https://gaia.cs.umass.edu/kurose_ross/videos/1/

没有什么能比自己写个 TCP/IP 协议栈更能加深对计算机网络的理解了，所以不妨试试 [Stanford CS144: Computer Network](https://csdiy.wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/CS144/)，8 个 Project 带你实现整个协议栈。

> https://cs144.github.io/系列课程偏向实战，在这门课的 Project 中，你将用 C++ 循序渐进地搭建出整个 TCP/IP 协议栈，实现 IP 路由以及 ARP 协议，最后利用你自己的协议栈代替 Linux Kernel 的网络协议栈和其他学生的计算机进行通信，非常 amazing！😍 

---

 ⚠️**这个板块包括计算机网络、TCP/IP、网络抓包的实现、Linux网络编程**



## 目录

### 应用层和传输层基础

- [x] [📶第1节 应用层协议的实现](markdown/1.md)

- [x] [📶第2节 计算机网络和因特网](markdown/2.md)

- [x] [📶第3节 应用层—协议](markdown/3.md)

- [x] [📶第4节 HTTP协议](markdown/4.md)

- [x] [📶第5节 FTP协议](markdown/5.md)

- [x] [📶第6节 SMTP协议](markdown/6.md)

- [x] [📶第7节 DNS协议](markdown/7.md)

- [x] [📶第8节 P2P应用与BitTorrent协议](markdown/8.md)

- [x] [📶第9节 视频流和内容分发网](markdown/9.md)

  

---

### socket套接字编程

> socket套接字编程是网络变长的主要方式。
>
> socket把复杂的TCP/IP协议族隐藏了起来，对程序员来说，只要用好函数，就可以完成网络通信。

- [x] [📶第10节 网络编程基础](markdown/10.md)
- [x] [📶第11节 大小端字节序和地址转化](markdown/11.md)
- [x] [📶第12节 TCP和UDP通信流程](markdown/12.md)

- [x] [📶第13节 sockaddr数据结构](markdown/13.md)
- [x] [📶第14节 win套接字通信](markdown/14.md)
- [x] [📶第15节 C语言套接字通信](markdown/15.md)
- [x] [📶第16节 并发实现N:1多个客户端连接一个服务器](markdown/16.md)
- [x] [📶第17节 golang中的socket通信 ](markdown/17.md)
- [x] [📶第18节 Python里的socket编程](markdown/18.md)
- [x] [📶第19节 传输层协议](markdown/19.md)



---

### 网络抓包的实现

- [x] [📶第20节 ICMP以及功能使用](markdown/20.md)

- [x] [📶第21节 WireShark抓包原理及筛选](markdown/21.md)
- [x] [📶第22节 对常用协议抓包并分析原理](markdown/22.md)
- [x] [📶第23节 TCP协议抓包](markdown/23.md)
- [x] [📶第24节 HTTP协议抓包](markdown/24.md)
- [x] [📶第25节 WireShark抓包解决服务器无法上网](markdown/25.md)
- [x] [📶第26节 应用层和传输控制层协议](markdown/26.md)



---

### 数据通信基础

> 板块是三个部分：分别是**路由器、交换机和防火墙**
>
> 对应的是`HCIA-Datacom`对应的等级网络工程师（最合适的是HCIP）。

- [x] [📶路由器和交换机区别](markdown/27.md)
- [x] [📶](markdown/28.md)
- [x] [📶](markdown/29.md)
- [x] [📶](markdown/30.md)
- [x] [📶](markdown/31.md)
- [x] [📶](markdown/32.md)
- [x] [📶](markdown/33.md)
- [x] [📶](markdown/34.md)
- [x] [📶](markdown/35.md)
- [x] [📶](markdown/36.md)
- [x] [📶](markdown/37.md)
- [x] [📶](markdown/38.md)
- [x] [📶](markdown/39.md)
- [x] [📶](markdown/40.md)
- [x] [📶](markdown/41.md)
- [x] [📶](markdown/42.md)
- [x] [📶](markdown/43.md)
- [x] [📶](markdown/44.md)
- [x] [📶](markdown/45.md)
- [x] [📶](markdown/46.md)
- [x] [📶](markdown/47.md)
- [x] [📶](markdown/48.md)
- [x] [📶](markdown/49.md)
- [x] [📶](markdown/50.md)



## Linux网络编程

### socket套接字编程

> socket套接字编程是网络变长的主要方式。
>
> socket把复杂的TCP/IP协议族隐藏了起来，对程序员来说，只要用好函数，就可以完成网络通信。

- [x] [📶第10节 网络编程基础](markdown/10.md)
- [x] [📶第11节 大小端字节序和地址转化](markdown/11.md)
- [x] [📶第12节 TCP和UDP通信流程](markdown/12.md)

- [x] [📶第13节 sockaddr数据结构](markdown/13.md)
- [x] [📶第14节 win套接字通信](markdown/14.md)
- [x] [📶第15节 C语言套接字通信](markdown/15.md)
- [x] [📶第16节 并发实现N:1多个客户端连接一个服务器](markdown/16.md)
- [x] [📶第17节 golang中的socket通信 ](markdown/17.md)
- [x] [📶第18节 Python里的socket编程](markdown/18.md)
- [x] [📶第19节 传输层协议](markdown/19.md)

 51. [](markdown/51.md)

 52. [](markdown/52.md)

 53. [](markdown/53.md)

 54. [](markdown/54.md)

 55. [](markdown/55.md)

 56. [](markdown/56.md)

 57. [](markdown/57.md)

 58. [](markdown/58.md)

 59. [](markdown/59.md)

 60. [](markdown/60.md)

 61. [](markdown/61.md)

 62. [](markdown/62.md)

 63. [](markdown/63.md)

 64. [](markdown/64.md)

 65. [](markdown/65.md)

 66. [](markdown/66.md)

 67. [](markdown/67.md)

 68. [](markdown/68.md)

 69. [](markdown/69.md)

 70. [](markdown/70.md)

 71. [](markdown/71.md)

 72. [](markdown/72.md)

 73. [](markdown/73.md)

 74. [](markdown/74.md)

 75. [](markdown/75.md)

 76. [](markdown/76.md)

 77. [](markdown/77.md)

 78. [](markdown/78.md)

 79. [](markdown/79.md)

 80. [](markdown/80.md)

 81. [](markdown/81.md)

 82. [](markdown/82.md)

 83. [](markdown/83.md)

 84. [](markdown/84.md)

 85. [](markdown/85.md)

 86. [](markdown/86.md)

 87. [](markdown/87.md)

 88. [](markdown/88.md)

 89. [](markdown/89.md)

 90. [](markdown/90.md)

 91. [](markdown/91.md)

 92. [](markdown/92.md)

 93. [](markdown/93.md)

 94. [](markdown/94.md)

 95. [](markdown/95.md)

 96. [](markdown/96.md)

 97. [](markdown/97.md)

 98. [](markdown/98.md)

 99. [](markdown/99.md)

 100. [](markdown/100.md)





## 参与贡献

**要求：**

+ [**你需要学会使用markdown🖱️**](https://github.com/3293172751/CS_COURSE/blob/master/markdown/README.md)
+ [符合Google代码规范](https://zh-google-styleguide.readthedocs.io/en/latest/google-cpp-styleguide/)

#### [参与贡献❤️❤️💕💕](https://github.com/3293172751/CS_COURSE/blob/master/Git/git-contributor.md/)

<font size = 2>如果你也想对本项目做出贡献，那么你可以先把该项目进行 `fork` 或者 `git clone` 到本地，然后自己建立一个分支 `your-branch`，然后上传资料到 对应目录 下，图片信息可以上传到` /images`，然后更新 `README`。 </font>



## 版权声明

本书所有内容遵循 [CC-BY-SA 3.0协议（署名-相同方式共享）](http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0协议文本)
