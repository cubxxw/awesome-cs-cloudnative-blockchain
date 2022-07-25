# git版本控制

前提是 本地已经有了 git的origin master库 

或者克隆需要回退的代码到本地

1. 查询历史对应不同版本的ID ，用于回退使用

   ```
    git log --pretty=oneline
   ```



2. 使用`git log`命令查看所有的历史版本，获取你git的某个历史版本的id

​    假设查到历史版本的id是`813aa6dc84038d304e201d691d7fbdde9e28d97a`。

```
git reset --hard 813aa6dc84038d304e201d691d7fbdde9e28d97a
```



**git log的命令**

```shell
选项 　　　　　　　　说明
-p    　　　　　　  按补丁格式显示每个更新之间的差异
--word-diff       按 word diff 格式显示差异
--stat    　　　   显示每次更新的文件修改统计信息
--shortstat       只显示 --stat 中最后的行数修改添加移除统计
--name-only       仅在提交信息后显示已修改的文件清单
--name-status     显示新增、修改、删除的文件清单
--abbrev-commit   仅显示 SHA-1 的前几个字符，而非所有的 40 个字符
--relative-date   使用较短的相对时间显示(比如，“2 weeks ago”)
--graph    　　　　显示 ASCII 图形表示的分支合并历史
--pretty    　　　 使用其他格式显示历史提交信息可用的选项包括oneline，short，full，fuller 和format(后跟指定格式)
--oneline        `--pretty=oneline --abbrev-commit` 的简化用法
```



3. 把修改推到远程服务器

```
git push -f -u origin master  
```



4. git push



### 版本切换

 　首先，Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新提交的版本，上一个版本就是HEAD^， 上上一个版本就是HEAD^^ ，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。、
 　现在，我们要把当前版本“alter to 2”回退到上一个版本“alter to 1”，就可以使用git reset命令，

```
git reset --hard HEAD^
```

，将文件返回到上一个版本，用`cat 1.txt`，内容为1，说明版本回退成功。
 　我们用git log再看看现在版本库的状态，发现最新的那个版本“alter to 2”已经看不到了。

![img](https:////upload-images.jianshu.io/upload_images/15401334-3dd9ebfca56e991a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)


 　如果想返回到最新的版本，可以使用命令

```
git reset --hard commit_id
```


 　但是，如果找到最新版本的1.txt的commit id呢？Git提供了一个命令

```
git reflog
```

该命令按照之前经过的所有的commit路径按序来排列，用来记录你的每一次命令。

![image-20220519192124465](https://s2.loli.net/2022/05/19/UQyJ9zeh1fXCEi5.png)

　

下面使用git reset命令，将文件恢复到最新版本。

```undefined
 git reset --hard 7ee5c95
```

现在`cat 1.txt`，内容是2，成功将版本回退到最新版本。



## 总结

  Git允许我们使用命令`git reset --hard commit_id`在版本的历史之间切换。
 　HEAD可以用来替换commit_id，HEAD指向的版本是当前版本，上一个版本就是HEAD^ ，上上一个版本就是HEAD^^ ，往上100个版本写成HEAD~100。
 　当然了，^和~这两个特殊符号，除了用在HEAD上外，还可以用在<branchName>上或Commit ID上。如master^，代表master的上一个版本；1f2f476~1代表Commit ID为1f2f476的上一个版本。
 　可以用git log可以查看提交历史，或者用git reflog查看命令历史，以便确定要切换的版本的版本号。

