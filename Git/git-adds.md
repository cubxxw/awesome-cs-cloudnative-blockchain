# 项目添加多个远程仓库

[toc]

## 第一种方式

1. 添加一个远程库 名字不能是origin

   ```
   git remote add myname https://github.com/C-UB/CUB-learning.git
   ```

2. 查看远程库和地址

   ```
   git remote -v
   ```

   ![image-20220528162959401](https://s2.loli.net/2022/05/28/KtjHqyGbP3o5VEO.png)

3. 拉，推

   ```
   git pull myname  远程分支名：本地分支名
   git push myname  本地分支名：远程分支名
   ```

   

## 第二种方式

**（好处是推送时，可以同时推送到另外一个库）**

1. 添加另外一个远程库

```
git remote set-url --add origin https://github.com/C-UB/CUB-learning.git
```

2. 推送

```
git remote -v

git push origin master:master
```

3. 取消本地目录下关联的远程库：

```csharp
git remote remove origin
```



### 案例：

```bash
PS C:\Users\smile\Desktop\区块链> git remote set-url --add origin https://github.com/C-UB/CUB-learning.git
PS C:\Users\smile\Desktop\区块链> git remote -v
cub-blockchain  https://github.com/C-UB/CUB-learning.git (fetch)
cub-blockchain  https://github.com/C-UB/CUB-learning.git (push)
myname  https://github.com/C-UB/CUB-learning.git (fetch)
myname  https://github.com/C-UB/CUB-learning.git (push)
origin  https://github.com/3293172751/golang-rearn.git (fetch)
origin  https://github.com/3293172751/golang-rearn.git (push)
origin  https://github.com/C-UB/CUB-learning.git (push)
PS C:\Users\smile\Desktop\区块链>
```

