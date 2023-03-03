# go-air实现热加载

[toc]

## go air

☁️ 热重载 Go 应用的工具



## 特色

+ 彩色的日志输出
+ 自定义构建或必要的命令
+ 支持外部子目录
+ 在 Air 启动之后，允许监听新创建的路径
+ 更棒的构建过程



## 安装

> go-air支持几种安装方式

### 推荐使用 install.sh

```
# binary 文件会是在 $(go env GOPATH)/bin/air
curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

# 或者把它安装在 ./bin/ 路径下
curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s

air -v
```

P.S. 非常感谢 mattn 的 [PR](https://github.com/cosmtrek/air/pull/1)，使得 Air 支持 Windows 平台。



### 使用 go install

> 如果因为网络问题没办法下载，请看下面的配置镜像源的方法

使用 Go 的版本为 1.16 或更高:

```
go install github.com/cosmtrek/air@latest
```

![air](https://github.com/cosmtrek/air/raw/master/docs/air.png)



### 配置镜像源

> 提醒 ⚠️
>
> + 官方提供的全球源速度也很快
> + windown也可以使用Linux命令安装 — 就是`sh`，具体看我的Linux学习

**在 Linux 或 macOS 上面，需要运行下面命令**（或者，可以把以下命令写到 `.bashrc` 或 `.bash_profile` 文件中）：

```bash
# 启用 Go Modules 功能
go env -w GO111MODULE=on

# 配置 GOPROXY 环境变量，以下三选一

# 1. 七牛 CDN
go env -w  GOPROXY=https://goproxy.cn,direct

# 2. 阿里云
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct

# 3. 官方
go env -w  GOPROXY=https://goproxy.io,direct
```

**最好确认以下**

```bash
$ go env | grep GOPROXY
GOPROXY="https://goproxy.cn"
```



**在 Windows 上，需要运行下面命令：**

```bash
# 启用 Go Modules 功能
$env:GO111MODULE="on"

# 配置 GOPROXY 环境变量，以下三选一

# 1. 七牛 CDN
$env:GOPROXY="https://goproxy.cn,direct"

# 2. 阿里云
$env:GOPROXY="https://mirrors.aliyun.com/goproxy/,direct"

# 3. 官方
$env:GOPROXY="https://goproxy.io,direct"
```

**测试一下**

```bash
go install github.com/cosmtrek/air@latest
```

> 本地如果有模块缓存，可以使用命令清空 `go clean --modcache` 。
>
> ⚡ `go install`一般安装到环境变量的`bin`目录下面，可以用下面命令查看Go语言环境变量
>
> ```
> go env
> ```

![image-20221004184910837](http://sm.nsddd.top/smimage-20221004184910837.png?xxw@nsddd.top)



### 使用Docker

请拉取这个 Docker 镜像 [cosmtrek/air](https://hub.docker.com/r/cosmtrek/air).

```bash
docker run -it --rm \
    -w "<PROJECT>" \
    -e "air_wd=<PROJECT>" \
    -v $(pwd):<PROJECT> \
    -p <PORT>:<APP SERVER PORT> \
    cosmtrek/air
    -c <CONF>
```

例如，我的项目之一是在 Docker 上运行的：

```bash
docker run -it --rm \
    -w "/go/src/github.com/cosmtrek/hub" \
    -v $(pwd):/go/src/github.com/cosmtrek/hub \
    -p 9090:9090 \
    cosmtrek/air
```

> Windows上面每次都需要启动docker，所以我不想选择这个



## ✨ beta 版本的特性

支持使用参数来配置 air 字段:

如果你只是想配置构建命令和运行命令，您可以直接使用以下命令，而无需配置文件:

```
air --build.cmd "go build -o bin/api cmd/run.go" --build.bin "./bin/api"
```

对于以列表形式输入的参数，使用逗号来分隔项目:

```
air --build.cmd "go build -o bin/api cmd/run.go" --build.bin "./bin/api" --build.exclude_dir "templates,build"
```



## 使用方法

您可以添加 `alias air='~/.air'` 到您的 `.bashrc` 或 `.zshrc` 后缀的文件.

首先，进入你的项目文件夹

```
cd /path/to/your_project
```

最简单的方法是执行

```
# 优先在当前路径查找 `.air.toml` 后缀的文件，如果没有找到，则使用默认的
air -c .air.toml
```

您可以运行以下命令初始化，把默认配置添加到当前路径下的`.air.toml` 文件。

```
air init
```

在这之后，你只需执行 `air` 命令，无需添加额外的变量，它就能使用 `.air.toml` 文件中的配置了。

```
air
```

如欲修改配置信息，请参考 [air_example.toml](https://github.com/cosmtrek/air/blob/master/air_example.toml) 文件。



### 运行时参数

您可以通过把变量添加在 air 命令之后来传递参数。

```
# 会执行 ./tmp/main bench
air bench

# 会执行 ./tmp/main server --port 8080
air server --port 8080
```

You can separate the arguments passed for the air command and the built binary with `--` argument.

```
# 会运行 ./tmp/main -h
air -- -h

# 会使用个性化配置来运行 air，然后把 -h 后的变量和值添加到运行的参数中
air -c .air.toml -- -h
```



### Docker-compose

```
services:
  my-project-with-air:
    image: cosmtrek/air
    # working_dir value has to be the same of mapped volume
    working_dir: /project-package
    ports:
      - <any>:<any>
    environment:
      - ENV_A=${ENV_A}
      - ENV_B=${ENV_B}
      - ENV_C=${ENV_C}
    volumes:
      - ./project-relative-path/:/project-package/
```



### 调试

运行 `air -d` 命令能打印所有日志。



## Q&A

### 遇到 "command not found: air" 或 "No such file or directory" 该怎么办？

```
export GOPATH=$HOME/xxxxx
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
export PATH=$PATH:$(go env GOPATH)/bin <---- 请确认这行在您的配置信息中！！！
```



## 部署

请注意：这需要 Go 1.16+ ，因为我使用 `go mod` 来管理依赖。

```
# 1. 首先复刻（fork）这个项目

# 2. 其次克隆（clone）它
mkdir -p $GOPATH/src/github.com/cosmtrek
cd $GOPATH/src/github.com/cosmtrek
git clone git@github.com:<YOUR USERNAME>/air.git

# 3. 再次安装依赖
cd air
make ci

# 4. 这样就可以快乐地探索和玩耍啦！
make install
```

顺便说一句: 欢迎 PR~



### 发布新版本

```
# 1. checkout 到 master 分支
git checkout master

# 2. 添加需要发布的版本号
git tag v1.xx.x

# 3. 推送到远程
git push origin v1.xx.x

ci 会加工和处理，然后会发布新版本。等待大约五分钟，你就能获取到新版本了。
```