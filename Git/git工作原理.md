[toc]

---

[😶‍🌫️需要联系我联系我🖱️](xxw@nsddd.top)

>   go语言的官方文档学习笔记很全，推荐去官网学习

[😶‍🌫️我的学习笔记(Github)](https://github.com/3293172751/CS_COURSE)

❤️💕💕 **[MY博客](https://nsddd.top)**

---

# git的基本流程

\1.   workspace:工作区，就是平常存放代码的地方

\2.   index/stage:暂存区，用于临时存放你的改动，事实上也就是一个文件，保存即将提交到文件列表的信息。

\3.   repository:仓库区（或本地仓库），就是安全存放数据的地方

\4.   remote:远程仓库，托管代码服务器，可以简单理解为是你的项目组中的一台电脑用于远程数据交换。

---

列出分支基本命令：git branch

想回顾下提交历史，我们可以使用 `git log`

 **`git tag -a v1.0` 命令给最新一次提交打上（HEAD）"v1.0"的标签。**

>  -a 选项意为"创建一个带注解的标签"。 不用 -a 选项也可以执行的，但它不会记录这标签是啥时候打的，谁打的，也不会让你添加个标签的注解。 我推荐一直创建带注解的标签。

查看当前配置有哪些远程的仓库：`git remote`

删除远程仓库你可以使用命令：`git remote rm [别名]`

---

.git：隐藏文件夹---存放git管理信息的目录，初始化仓库时候自动创建

![img](https://s2.loli.net/2022/03/24/9CwcO75zgjB8YdM.jpg)

**git update** **：git 更新**

**git**的工作流程：

1. 在工作目录下添加、修改文件

2. 将需要进行版本管理的文件放在暂存区域 **git add.**

3. 将暂存区域的文件提交到git仓库  **git commit**

4. 将文件提交到远程   **git push**

 

返回到本地：

**1.  git pull  --直接返回到本地****

**2.  git reset**

**3.  git checkout**

 

git init  --初始化项目

或者克隆远程目录：

git clone [url] https://github.com/3293172751/nsssds.git

![img](https://s2.loli.net/2022/03/24/ms8EIdiNwqnArWV.jpg)

 **克隆的时候要注意：带上`recurse-submodules `  不然克隆可能会不完整**

```
git clone --recurse-submodules
```

—

git status ---查看文件状态命令 是否被跟踪

![img](https://s2.loli.net/2022/03/24/eQbSfIas21XURn5.jpg)

 

提示没有文件被跟踪

此时用git add .  把所有文件放在暂存区（注意点要有空格）

![img](https://s2.loli.net/2022/03/24/YOKzcCA3hkVRNQ8.jpg)

 

```
get commit -m  提交暂存区的内容到本地仓库

-m :提交信息

get commit -m ”注释“
```

**有时候我们不想把某些文件纳入到版本控制中，比如说数据库文件，临时文件，设计文件等等。**

```
#.txt     忽略所有.txt的文件，这样的话上传上去不会被选中

！.txt   除了.txt的文件看，其余文件全部选中

/temp 仅仅忽略该目录的文件，不包括其他目录temp

build/  忽略build目录下的所有文件
```

有些公司是自己搭建git服务器

要设置自己本地SSH公匙，实现免密登陆

生成公钥：

进入C:\users\Administrator\.ssh（在用户目录，我的是smile）

生成公钥  ssh-keygen -t rsa

![img](https://s2.loli.net/2022/03/24/9pTtirjXes1M2BH.jpg)

 

生成公钥后会产生两个文件

![img](https://s2.loli.net/2022/03/24/PRnrGWz1es4gMNq.jpg)

 

pub:公共的  --另一个是私有的

![img](https://s2.loli.net/2022/03/24/EbS9XgJQaV7d4lN.jpg)

我的gitree密钥：

```
ssh-rsa AAAAB。。。。。。。。 
```

使用码云建立自己的仓库：

公式------------

IDEA集成



**分支保护：**

```
git branch :查看分支

git branch -r  远程分支

git branch newdev  --新建一个分支
```

**多个分支并行执行，可以避免代码冲突**

 分支保护是为了防止相关成员推送代码到重要的分支（例如 master 分支），便于仓库的分支管理，点击前往保护分支规则设置。

 

**1.  常规分支：仓库成员（开发者权限及以上）可推送分支**

**2.  保护分支：可自定义保护策略，默认仓库管理员才能管理（推送）被保护的分支**

**3.  只读分支：任何人都无法推送代码（包括管理员和所有者），需要推送代码时应设为“常规”或“保护”分支**

****