[toc]

---

[😶‍🌫️需要联系我联系我🖱️](xxw@nsddd.top)

>   go语言的官方文档学习笔记很全，推荐去官网学习

[😶‍🌫️我的学习笔记(Github)](https://github.com/3293172751/CS_COURSE)

❤️💕💕 **[MY博客](https://nsddd.top)**

---

# git的分支

如何在 GitHub 的项目中创建一个分支呢？ 其实很简单啦，直接点击 Branch，然后在弹出的文本框中添加自己的 Branch Name 然后点击蓝色的Create branch就可以了，这样一来，你这个项目就有2个分支了（master 和 reademe-edits）。

![img](https://s2.loli.net/2022/03/25/cisZIAWzOBbXQhl.png)



**注：**

由上面的分支合并的流程图可以发现，**1 个库可以有多个分支并行的进行开发，但是最后只有 1 个会被 merge 进来，因此当某一个分支被合并到进 master 分支后，其他的并行分支的提交都会被是作为冲突 conflict，解决这个冲突的唯一办法就是，每次做修改之前，记得更新版本库，使自己的分支与 master 分支保持一致。**

 

**具体操作步骤:**

## 一、上传一个独立的分支

（比如代码是从工程中直接DOWNLOAD ZIP文件如BowlingScore-test.zip，该文件与原MASTER分支是独立的）

**1、Git init （在本地工程目录下），生成.git 文件夹**

```
Git init 
```

**2、上传修改的文件**

```
git add * (*可替换成具体要上传的文件名，*表示提交所有有变化的文件) 
```

**3、添加上传文件的描述**

```
 git commit -m "test"  （”test“为分支名） 
```

**4、（创建分支）**

```
git branch test 
```

**5、（切换分支）**

```
git checkout test 
```

**6、与远程分支相关联**

```
git remote add origin https://github.com/yangxiaoyan20/BowlingScore.git   
```

（”BowlingScore“ 为工程名） 

**7、（将分支上传）**

```
git push origin test 
```

注意:提示 “请输入github用户名和密码“

## 二、上传一个与MASTER相关的分支
（该分支是从MASTER中git clone 得到，相关信息在 .git 文件中）

修改后源码后，在进行如下操作

```
git add .
git commit -m "test" &nbsp;（”test“为分支名）
git branch test（创建分支）
git checkout &nbsp;test （切换分支）
git push origin test:test 
```



## 三、其他常用指令

```
删除分支：
git branch -d <branchName>

查看所有的分支：
git branch -a

重命名分支
git branch -m main master
```

**上面的操作都是本地的，需要同步到远程**

```
git push -u origin master
```



---

参考:

>  [https://guides.github.com/activities/hello-world/](https://guides.github.com/activities/hello-world/)

> [https://www.liaoxuefeng.com/wiki/896043488029600](https://www.liaoxuefeng.com/wiki/896043488029600)

 

 

 