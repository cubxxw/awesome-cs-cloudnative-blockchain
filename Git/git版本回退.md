# git版本回退

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



3. 把修改推到远程服务器

```
git push -f -u origin master  
```



4. git push