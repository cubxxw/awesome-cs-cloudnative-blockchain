# Docker

:::  tip 
这将会是一个很特别的仓库

喜欢一定要在[GitHub](https://github.com/cubxxw/awesome-cs-cloudnative-blockchain)上给个⭐

:::



## 为什么要学习 Docker？

> Docker 是世界领先的软件容器平台。
>开发人员利用 Docker 可以消除协作编码时“在我的机器上可正常工作”的问题。
> 运维人员利用 Docker 可以在隔离容器中并行运行和管理应用，获得更好的计算密度。
>企业利用 Docker 可以构建敏捷的软件交付管道，以更快的速度、更高的安全性和可靠的信誉为 Linux 和 Windows Server 应用发布新功能。



## ⭕怎么学习docker

> 学习docker之前最好有下面基础
>
> +  [计算机网络 – TCP/IP – 抓包 – Linux网络编程](https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/web/README.md) （有一点网络基础就好）
> +  [有Linux的基础](https://github.com/cubxxw/awesome-cs-course/blob/master/linux/README.md)
> +  [有Git的基础](https://github.com/cubxxw/awesome-cs-course/blob/master/Git/README.md)
>
> **编程语言不限**
>
> -  [🖱️GO 基础部分🔥](https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/TOC.md)
> -  [🖱️GO web框架](https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/go-web)
> -  [🖱️Go语言100篇进阶🔥](https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/Gomd_super/README.md)
> -  [🖱️Go 高级篇](https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/go-advancend/README.md)
>
> ---

## 🔮学完docker或许你可以试试这些

### 建立你自己的`Docker`

-  [🔱🔧🧰**C** ：500 行代码中的 Linux 容器](https://blog.lizzie.io/linux-containers-in-500-loc.html)
-  [🔱🔧🧰**Go** ：自己的构建包100 去构建自己的构建包](https://www.infoq.com/articles/build-a-container-golang)
-  [🔱🔧🧰**Go**：在 Go 中从头开始制造容器](https://www.youtube.com/watch?v=8fi7uSYlOdc)[视频]
-  [🔱🔧🧰**Python**：Linux 容器研讨会：从头开始重构 Docker](https://github.com/Fewbytes/rubber-docker)
-  [🔱🔧🧰**Python**：一个概念模仿Docker，用10% Python编写](https://github.com/tonybaloney/mocker)
-  [🔱🔧🧰**Shell** ：Docker 在大约 100 行 bash 中实现](https://github.com/p8952/bocker)



### 从docker进阶到k8s

::: warning
⚠️ 正在更新⚡~关注等待~

+ [k8s & 云原生](https://docker.cubxxw.com/Cloud-Native-k8s/)

:::



###  💱安装docker

:::: code-group
::: code-group-item ubuntu

```bash
sudo apt install docker
```
:::
::: code-group-item centos

```shell
yum install docker
```
:::
::::



## 🅱️最新补充

::: warning 温馨提示
这个板块是后面在使用`docker`慢慢补充的

:::



[💢🚝浅谈 linux 中的根文件系统（rootfs 的原理和介绍）](./41.md)

[💢🚝补充：Docker nginx篇](42.md)

[💢🚝补充：修改docker镜像的映射端口（如何修改镜像配置文件）](43.md)

[💢🚝补充：docker搭建Gitlab 服务器](44.md)

[💢🚝补充：docker搭建jenkins）](45.md)

[💢🚝补充：docker镜像打包导入到另一台服务器](46.md)

[💢🚝补充：docker底层的内核](47.md)

[💢🚝补充：构建镜像（集群镜像），从scratch开始](48.md)

[💢🚝补充：Docker Swarm 集群管理](49.md)

[💢🚝补充：docker 联合文件系统 深入解读](50.md)




## 🗒️Docker基础篇目录

🐋 1. [Docker概述](1.md)

🐋 2. [docker系统架构](2.md)

🐋 3. [docker和传统虚拟机](3.md)

🐋 4. [docker安装](4.md)

🐋 5. [在 Ubuntu 上安装 Docker 引擎](5.md)

🐋 6. [Docker引擎（engine）详解](6.md)

🐋 7. [镜像配置 — 加速](7.md)

🐋 8. [docker帮助启动类命令](8.md)

🐋 9. [docker镜像命令](9.md)

🐋 10. [ubuntu容器说明 — 容器的启动和运行](10.md)

🐋 11. [深入理解镜像底层](11.md)

🐋 12. [docker提交以及命名空间](12.md)

🐋 13. [使用hub.docker](13.md)

🐋 14. [容器数据卷](14.md)

🐋 15. [docker基础篇最后补充-资源](15.md)

🐋 16. [tomcat安装挂载](16.md)

🐋 17. [docker安装MySQL](17.md)

🐋 18. [docker安装redis](18.md)

🐋 19. [mysql主从复制docker版](19.md)

🐋 20. [分布式存储之hash取余算法](20.md)

🐋 21. [3主3从redis集群扩缩容配置案例说明](21.md)

🐋 22. [redis主从扩容](22.md)

🐋 23. [redis主从缩容](23.md)

🐋 24. [DockerFile解析](24.md)

🐋 25. [dockerfile保留字](25.md)

🐋 26. [dockerfile案例](26.md)

🐋 27. [虚悬镜像](27.md)

🐋 28. [编写自定义镜像myubuntu](28.md)

🐋 29. [Docker微服务实战](29.md)

🐋 30. [docker 网络](30.md)

🐋 31. [docker网络模式](31.md)

🐋 32. [bridge是什么](32.md)

🐋 33. [host是什么](33.md)

🐋 34. [none是什么](34.md)

🐋 35. [container是什么](35.md)

🐋 36. [自定义网络格式](36.md)

🐋 37. [Docker平台架构图解](37.md)

🐋 38. [docker-compose容器编排](38.md)

🐋 39. [Compose核心概念](39.md)

🐋 40. [改造升级微服务工程docker_boot](40.md)

---

+  [ 🖱️脑图下载](脑图笔记)

---

## ✨参与贡献

**[🫵参与贡献❤️❤️💕💕](https://cubxxw.com/archives/contributors)**

**要求：**

- [**你需要学会使用markdown🖱️**](https://github.com/cubxxw/awesome-cs-course/blob/master/markdown/README.md)
- [**符合Google代码规范**](https://zh-google-styleguide.readthedocs.io/en/latest/google-cpp-styleguide/)

如果你也想对本项目做出贡献，那么你可以先把该项目进行 `fork` 或者 `git clone` 到本地，然后自己建立一个分支 `your-branch`，然后上传资料到 对应目录 下，图片信息可以上传到` /images`，然后更新 `README`。
