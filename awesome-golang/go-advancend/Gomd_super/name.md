# Go语言命名规范

[toc]

## 参考

> [Uber](https://www.uber.com/) 是一家美国硅谷的科技公司，也是 Go 语言的早期 adopter。其开源了很多 golang 项目，诸如被 Gopher 圈熟知的 [zap](https://github.com/uber-go/zap)、[jaeger](https://github.com/jaegertracing/jaeger) 等。2018 年年末 Uber 将内部的 [Go 风格规范](https://github.com/uber-go/guide) 开源到 GitHub，经过一年的积累和更新，该规范已经初具规模，并受到广大 Gopher 的关注。Uber是该规范的中文版本。

+ [x] [参考谷歌的命名规则](https://github.com/golang/go/wiki/CodeReviewComments)
+ [x] [Uber Go 语言编码规范中文版](https://github.com/xxjwxc/uber_go_guide_cn)



## 目录

**目录建议全部小写为主（因为Linux区分大小写)，个人比较习惯使用中画线**

> 不太建议下划线，下划线在某些地方可能下划线不明显（变量名可以用字母、下划线组成）。

```
my-project-name
```

**子目录按照作用，使用单词表示，有复数情况，使用复数命名。**

```
scripts
```



## 文件

**文件个人比较习惯使用下画线**

```
my_file_name
```



## 变量

**变量命名两种方法**

+ 下划线命名：`my_varibale`
+ 驼峰式命名：`myVariale`

### javascript：驼峰

### css：中划线



