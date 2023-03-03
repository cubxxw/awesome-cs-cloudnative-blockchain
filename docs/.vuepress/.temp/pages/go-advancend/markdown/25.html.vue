<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第25节-信息队列kafka入门学习" tabindex="-1"><a class="header-anchor" href="#第25节-信息队列kafka入门学习" aria-hidden="true">#</a> 第25节 信息队列Kafka入门学习</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/24.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>
<ul>
<li><a href="https://juejin.cn/post/7146133960865611806" target="_blank" rel="noopener noreferrer">掘金kafka科普<ExternalLinkIcon/></a></li>
<li><a href="https://kafka.apache.org/" target="_blank" rel="noopener noreferrer">Apache Kafka官网<ExternalLinkIcon/></a></li>
<li><a href="https://zh.wikipedia.org/zh-cn/Kafka" target="_blank" rel="noopener noreferrer">ZN Kafka 维基<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/apache/kafka" target="_blank" rel="noopener noreferrer">Kafka - GitHub<ExternalLinkIcon/></a></li>
</ul>
<h2 id="什么是kafka" tabindex="-1"><a class="header-anchor" href="#什么是kafka" aria-hidden="true">#</a> 什么是Kafka</h2>
<p><strong>官方介绍</strong>：Apache Kafka 是一个开源分布式事件流平台，被数千家公司用于高性能数据管道、流分析、数据集成和任务关键型应用程序。</p>
<p><strong>维基</strong>：<strong>Kafka</strong>是由<a href="https://zh.wikipedia.org/wiki/Apache%E8%BD%AF%E4%BB%B6%E5%9F%BA%E9%87%91%E4%BC%9A" target="_blank" rel="noopener noreferrer">Apache软件基金会<ExternalLinkIcon/></a>开发的一个<a href="https://zh.wikipedia.org/wiki/%E5%BC%80%E6%BA%90" target="_blank" rel="noopener noreferrer">开源<ExternalLinkIcon/></a><a href="https://zh.wikipedia.org/wiki/%E6%B5%81%E5%A4%84%E7%90%86" target="_blank" rel="noopener noreferrer">流处理<ExternalLinkIcon/></a>平台，由<a href="https://zh.wikipedia.org/wiki/Scala" target="_blank" rel="noopener noreferrer">Scala<ExternalLinkIcon/></a>和<a href="https://zh.wikipedia.org/wiki/Java" target="_blank" rel="noopener noreferrer">Java<ExternalLinkIcon/></a>编写。该项目的目标是为处理实时数据提供一个统一、高吞吐、低延迟的平台。其持久化层本质上是一个“按照分布式事务日志架构的大规模发布/订阅消息队列”，[<a href="https://zh.wikipedia.org/zh-cn/Kafka#cite_note-4" target="_blank" rel="noopener noreferrer">4]<ExternalLinkIcon/></a>这使它作为企业级基础设施来处理流式数据非常有价值。此外，Kafka可以通过Kafka Connect连接到外部系统（用于数据输入/输出），并提供了Kafka Streams——一个<a href="https://zh.wikipedia.org/wiki/Java" target="_blank" rel="noopener noreferrer">Java<ExternalLinkIcon/></a>流式处理<a href="https://zh.wikipedia.org/wiki/%E5%BA%93_(%E8%AE%A1%E7%AE%97%E6%9C%BA)" target="_blank" rel="noopener noreferrer">库<ExternalLinkIcon/></a>。</p>
<p><img src="http://sm.nsddd.top/sm202301161137678.png" alt="image-20230116113759591"></p>
<p><strong>消息系统</strong></p>
<p>Kafka 和传统的消息系统(也称作消息中间件)都具备系统解耦、冗余存储、流量削峰、缓冲、异步通信、扩展性、可恢复性等功能。与此同时，Kafka 还提供了大多数消息系统难以实现的消息顺序性保障及回溯消费的功能。</p>
<p><strong>存储系统</strong></p>
<p>Kafka 把消息持久化到磁盘，相比于其他基于内存存储的系统而言，有效地降低了数据丢失的风险。也正是得益于 Kafka 的消息持久化功能和多副本机制，我们可以把 Kafka 作为长期的数据存储系统来使用，只需要把对应的数据保留策略设置 为“永久”或启用主题的日志压缩功能即可。</p>
<ul>
<li>
<p>参考：可行性分析：<a href="www.confluent.io/blog/okay-s%E2%80%A6">www.confluent.io/blog/okay-s…</a></p>
</li>
<li>
<p>案例：<a href="www.confluent.io/blog/publis%E2%80%A6">www.confluent.io/blog/publis…</a></p>
</li>
</ul>
<p><strong>流式处理平台</strong></p>
<p>Kafka 不仅为每个流行的流式处理框架提供了可靠的数据来源，还提供了一个完整的流式处理类库，比如窗口、连接、变换和聚合等各类操作。</p>
<h2 id="kafka基础概念" tabindex="-1"><a class="header-anchor" href="#kafka基础概念" aria-hidden="true">#</a> Kafka基础概念</h2>
<h3 id="架构" tabindex="-1"><a class="header-anchor" href="#架构" aria-hidden="true">#</a> 架构</h3>
<p><img src="http://sm.nsddd.top/sm202301161158683.png" alt="image-20230116115851564"></p>
<p>Kafka存储的消息来自任意多被称为“生产者”（Producer）的进程。数据从而可以被分配到不同的“分区”（Partition）、不同的“Topic”下。在一个分区内，这些消息被索引并连同时间戳存储在一起。其它被称为“消费者”（Consumer）的进程可以从分区查询消息。Kafka运行在一个由一台或多台服务器组成的集群上，并且分区可以跨集群结点分布。</p>
<p>Kafka高效地处理实时流式数据，可以实现与Storm、HBase和Spark的集成。作为聚类部署到多台服务器上，Kafka处理它所有的发布和订阅消息系统使用了四个API，即生产者API、消费者API、Stream API和Connector API。它能够传递大规模流式消息，自带容错功能，已经取代了一些传统消息系统，如JMS、AMQP等。</p>
<p>Kafka架构的主要术语包括Topic、Record和Broker。Topic由Record组成，Record持有不同的信息，而Broker则负责复制消息。Kafka有四个主要API：</p>
<ul>
<li><strong>生产者API</strong>：支持应用程序发布Record流。</li>
<li><strong>消费者API</strong>：支持应用程序订阅Topic和处理Record流。</li>
<li><strong>Stream API</strong>：将输入流转换为输出流，并产生结果。</li>
<li><strong>Connector API</strong>：执行可重用的生产者和消费者API，可将Topic链接到现有应用程序。</li>
</ul>
<p>📜 对上面的解释：</p>
<ul>
<li>Topic 用来对消息进行分类，每个进入到Kafka的信息都会被放到一个Topic下</li>
<li>Broker 用来实现数据存储的主机服务器</li>
<li>Partition 每个Topic中的消息会被分为若干个Partition，以提高消息的处理效率</li>
<li>Producer 消息的生产者</li>
<li>Consumer 消息的消费者</li>
<li>Consumer Group 消息的消费群组</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/24.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/26.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


