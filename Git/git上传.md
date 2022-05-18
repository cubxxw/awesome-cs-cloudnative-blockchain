需要联系我联系我🖱️](xxw@nsddd.top)

>   go语言的官方文档学习笔记很全，推荐去官网学习

[😶‍🌫️我的学习笔记(Github)](https://github.com/3293172751/CS_COURSE)

❤️💕💕 **[MY博客](https://nsddd.top)**

---

# 上传到GitHub步骤

**\1.  进入Github首页，点击New repository新建一个项目**

**\2.  填写相应信息后点击create repository即可**

> a.  Repository name: 仓库名称（输入名字，最好不要使用中文）
>
> b.  Description(可选): 仓库描述介绍
>
> c.  Public, Private : 仓库权限（公开共享，私有或指定合作者）
>
> d.  Initialize this repository with a README: 添加一个README.md
>
> e.  gitignore: 不需要进行版本管理的仓库类型，对应生成文件.gitignore
>
> f.   license: 证书类型，对应生成文件LICENSE

**\3.  创建成功以后，界面如下，copy这个地址备用。**

**\4.  接下来就到本地操作了，首先右键你的项目，如果你之前安装git成功的话，右键会出现两个新选项，分别为Git Gui Here,Git Bash Here,这里我们选择Git Bash Here，进入如下界面，Test_Bluetooth即为我的项目名。**

**\5.  接下来输入如下代码（关键步骤），把github上面的仓库克隆到本地**

git clone [https://github.com/CKTim/BlueTooth.git（https://github.com/CKTim/BlueTooth.git替换成你之前复制的地址）](https://github.com/CKTim/BlueTooth.git（https:/github.com/CKTim/BlueTooth.git替换成你之前复制的地址）)

 

![img](https://s2.loli.net/2022/03/24/3zKZfi8JWxvrQlc.jpg)

 

![img](https://s2.loli.net/2022/03/24/FQYpXEeqnr4s9LB.jpg)

 

![img](https://s2.loli.net/2022/03/24/K7rmqH9u56esnQW.jpg)

- **将本地仓库和远程仓库关联。**

在本地仓库执行：

```
$ git remote add origin git@github.com:BNK-ALONG/teach-design-platform.git
```

origin后面就是刚刚创建好的远程仓库的地址。

- **将本地仓库的东西推送到远程仓库。**

刚刚我们只是将本地仓库和远程仓库进行了关联，但是两者的东西还没有同步，远程仓库还是空的。

通过以下命令：

```
$ git push-u originmaster
```

由于新建的远程仓库是空的，所以要加上-u这个参数，等远程仓库里面有了内容之后，下次再从本地库上传内容的时候只需下面这样就可以了：

```
$ git pushoriginmaster
```

或者可以更简单的：

```
$ git push
```

当然，这样会默认推送到主支干master。

push完成之后：

 

这时候再重新进入刚才在Github新建的仓库，就可以看到本地仓库的项目已经上传成功了！大功告成🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉

至此，将本地的一个新项目上传到Github的全过程就完成啦。

补坑：

如果在第9步新建一个Github仓库时，选择了

Initialize this repository with a README（就是创建仓库的时候自动给你创建一个README.md文件），那么在push的时候，会报错

```
error:failed to push some refs to https://github.com/BNK-ALONG/teach-design-platform.git
```

这是因为新建的Github仓库的README.md文件不在本地仓库的目录中，这是问题其实在多人协作开发中是一定存在的，多个人共同关联一个远程仓库，在把你本地的修改上传（push)之前，要把别人的代码更新到自己的本地仓库，不然怎么达到协作开发呢？

将远程仓库最新的更新拉取到本地，并合并到主支干：

```
$ git pull --rebase origin master
```

这时再重新push就可以成功了。

