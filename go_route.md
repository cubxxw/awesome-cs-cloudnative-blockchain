

## 路线图

---

![image-20220403155757049](https://s2.loli.net/2022/04/03/QkPSJrhimqpXLGz.png)



## 资源

### 看书路线

+ ##### [Go语言中文文档](https://www.topgoer.com/)

​				⏬ 

+ ##### [Go语言圣经](https://github.com/gopl-zh/gopl-zh.github.com)

  ​	**其他路线：**

  + https://docs.hacknode.org/gopl-zh/

  + https://books.studygolang.com/gopl-zh/

  + https://wizardforcel.gitbooks.io/gopl-zh/

  + https://docs.hundan.org/gopl-zh/

  + https://book.itsfun.top/gopl-zh/          #每夜自动构建

    ⏬ 

+ ##### Go[语言高级编程](https://github.com/chai2010/advanced-go-programming-book)

  ​	**其他路线：**

  + [SUMMARY.md](https://github.com/chai2010/advanced-go-programming-book/blob/master/SUMMARY.md)
  + https://chai2010.cn/advanced-go-programming-book/
  + https://www.gitbook.com/book/chai2010/advanced-go-programming-book/

  ---

  ### github上面一些好的Go项目
  
  ####  插件
  
  - QQ、微信（WeChat）、支付宝（AliPay）的Go版本SDK http://github.com/go-pay/gopay
  - 发送邮件库 https://github.com/go-gomail/gomail
  - 读写Microsoft Excel https://github.com/360EntSecGroup-Skylar/excelize [详细资料](https://pan.baidu.com/s/1fBUBE2nmE0NNa066mcp4nw)
  - 生成uuid https://github.com/satori/go.uuid
  - 开源，分布式，简单高效的搜索引擎 https://github.com/go-ego/riot
  - 基于 Go 的高性能 MySQL Proxy https://github.com/flike/kingshard
  - yaml对Go语言的支持 https://github.com/go-yaml/yaml/tree/v2.2.7
  - Codis是一个分布式Redis解决方案数据库代理 https://github.com/CodisLabs/codis
  - 用Go语言编写的markdown解析器 https://github.com/yuin/goldmark
  
  #### 项目
  
  - 基于beego框架的接口在线文档管理系统 https://github.com/lifei6671/mindoc
  - 开源文库系统 https://github.com/truthhun/DocHub
  - Go常用规范定义案例 https://github.com/zc2638/go-standard
  - 开源监控度量的看板系统 https://github.com/zc2638/go-standard
  - go应用开发的调试工具 https://github.com/derekparker/delve
  - 高并发、重量级爬虫软件 https://github.com/henrylee2cn/pholcus
  - Web分析 https://github.com/matomo-org/matomo
  
  ----
  
  ### 开发路线

1. **先决条件**
   - [Go](https://golangbot.com/)
   - [Go Modules](https://blog.golang.org/using-go-modules)
   - [SQL](https://www.w3schools.com/sql/default.asp)
2. **通用开发技能**
   - 学习 GIT，在 GitHub 上建立一些仓库，与其它人分享你的代码
   - 了解 HTTP(S) 协议，request 方法（GET, POST, PUT, PATCH, DELETE, OPTIONS）
   - 不要害怕使用 Google，[Google 搜索的力量](http://www.powersearchingwithgoogle.com/)
   - 看一些和数据结构以及算法有关的书籍
   - 学习关于认证的基础实现
   - 面向对象原则等等
3. **命令行工具**
   1. [cobra](https://github.com/spf13/cobra)
   2. [urfave/cli](https://github.com/urfave/cli)
4. **网页框架 + 路由**
   1. [Echo](https://github.com/labstack/echo)
   2. [Beego](https://github.com/astaxie/beego)
   3. [Gin](https://github.com/gin-gonic/gin)
   4. [Revel](https://github.com/revel/revel)
   5. [Chi](https://github.com/go-chi/chi)
5. **数据库**
   1. 关系型
      1. [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-2017)
      2. [PostgreSQL](https://www.postgresql.org/)
      3. [MariaDB](https://mariadb.org/)
      4. [MySQL](https://www.mysql.com/)
      5. [CockroachDB](https://www.cockroachlabs.com/)
   2. **云数据库**
      - [CosmosDB](https://docs.microsoft.com/en-us/azure/cosmos-db)
      - [DynamoDB](https://aws.amazon.com/dynamodb/)
   3. **搜索引擎**
      - [ElasticSearch](https://www.elastic.co/)
      - [Solr](http://lucene.apache.org/solr/)
      - [Sphinx](http://sphinxsearch.com/)
   4. **NoSQL**
      - [MongoDB](https://www.mongodb.com/)
      - [Redis](https://redis.io/)
      - [Apache Cassandra](http://cassandra.apache.org/)
      - [LiteDB](https://github.com/mbdavid/LiteDB)
      - [RavenDB](https://github.com/ravendb/ravendb)
      - [CouchDB](http://couchdb.apache.org/)
6. **对象关系映射框架**
   1. [Gorm](https://github.com/jinzhu/gorm)
   2. [Xorm](https://github.com/go-xorm/xorm)
7. **高速缓存**
   1. [GCache](https://github.com/bluele/gcache)
   2. 分布式缓存
      1. [Go-Redis](https://github.com/go-redis/redis)
      2. [GoMemcached](https://github.com/bradfitz/gomemcache)
8. **日志**
   1. 日志框架
      - [Zap](https://github.com/uber-go/zap)
      - [ZeroLog](https://github.com/rs/zerolog)
      - [Logrus](https://github.com/sirupsen/logrus)
   2. 日志管理系统
      - [Sentry.io](http://sentry.io)
      - [Loggly.com](https://loggly.com)
9. **实时通讯**
   1. [Socket.IO](https://socket.io/)
10. **API 客户端**
    1. REST
       - [Gentleman](https://github.com/h2non/gentleman)
       - [GRequests](https://github.com/kennethreitz/grequests)
       - [heimdall](https://github.com/heimdal/heimdal)
    2. [GraphQL](https://graphql.org/)
       - [gqlgen](https://github.com/99designs/gqlgen)
       - [graphql-go](https://github.com/graph-gophers/graphql-go)
11. **最好知道**
    - [Validator](https://github.com/chriso/validator.js/)
    - [Glow](https://github.com/pytorch/glow)
    - [GJson](https://github.com/tidwall/gjson)
    - [Authboss](https://github.com/volatiletech/authboss)
    - [Go-Underscore](https://github.com/ahl5esoft/golang-underscore)
12. **测试**
    1. 单元，行为，集成测试
       1. [GoMock](https://github.com/golang/mock)
       2. [Testify](https://github.com/stretchr/testify)
       3. [GinkGo](https://github.com/onsi/ginkgo)
       4. [GoMega](https://github.com/onsi/gomega)
       5. [GoCheck](https://github.com/go-check/check)
       6. [GoDog](https://github.com/DATA-DOG/godog)
       7. [GoConvey](https://github.com/smartystreets/goconvey)
    2. 端对端测试
       - [Selenium](https://github.com/tebeka/selenium)
       - [Endly](https://github.com/viant/endly)
13. **任务调度**
    - [Gron](https://github.com/roylee0704/gron)
    - [JobRunner](https://github.com/bamzi/jobrunner)
14. **微服务**
    1. 消息代理
       - [RabbitMQ](https://www.rabbitmq.com/tutorials/tutorial-one-go.html)
       - [Apache Kafka](https://kafka.apache.org/)
       - [ActiveMQ](https://github.com/apache/activemq)
       - [Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview)
    2. 消息总线
       - [Message-Bus](https://github.com/vardius/message-bus)
    3. 框架
       - [GoKit](https://github.com/go-kit/kit)
       - [Micro](https://github.com/micro/go-micro)
       - [rpcx](https://github.com/smallnest/rpcx)
       - [istio](https://github.com/istio/istio)
    4. RPC
       - [Protocol Buffers](https://github.com/protocolbuffers/protobuf)
       - [gRPC-Go](https://github.com/grpc/grpc-go)
       - [gRPC-Gateway](https://github.com/grpc-ecosystem/grpc-gateway)
       - [Twirp](https://github.com/twitchtv/twirp)
15. **[Go-模式](https://github.com/tmrts/go-patterns)**

