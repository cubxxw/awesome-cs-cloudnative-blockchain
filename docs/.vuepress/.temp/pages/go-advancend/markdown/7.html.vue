<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第7节-influxdb的概念和安装" tabindex="-1"><a class="header-anchor" href="#第7节-influxdb的概念和安装" aria-hidden="true">#</a> 第7节 InfluxDB的概念和安装</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/6.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h3 id="写入模块的实现" tabindex="-1"><a class="header-anchor" href="#写入模块的实现" aria-hidden="true">#</a> 写入模块的实现</h3>
<ol>
<li>初始化Influxdb cllient</li>
<li>从write channel中读取到监控数据</li>
<li>构造数据并且写入到influxdb</li>
</ol>
<h3 id="监控需求" tabindex="-1"><a class="header-anchor" href="#监控需求" aria-hidden="true">#</a> 监控需求</h3>
<ul>
<li>某个<strong>协议</strong>下的某个请求在某一个请求方法的<strong>QPS</strong>&amp;<strong>响应时间</strong>&amp;<strong>流量</strong></li>
</ul>
<h3 id="influxdb" tabindex="-1"><a class="header-anchor" href="#influxdb" aria-hidden="true">#</a> influxdb</h3>
<ul>
<li>
<p><a href="https://www.influxdata.com/" target="_blank" rel="noopener noreferrer">influxdb官网<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/influxdata/influxdb" target="_blank" rel="noopener noreferrer">开源仓库GitHub地址<ExternalLinkIcon/></a></p>
</li>
</ul>
<p>InfluxDB 是一个开源时间序列平台，使用Golang编写的开源的时序型数据库。这包括用于存储和查询数据、在后台处理数据以用于 ETL 或监控和警报目的、用户仪表板以及可视化和探索数据等的 API。这个 repo 上的 master 分支现在代表最新的 InfluxDB，它现在包括 Kapacitor（后台处理）和 Chronograf（UI）的功能，所有这些都在一个二进制文件中。</p>
<p><strong>特性:</strong></p>
<ul>
<li>部署简单，无依赖（Go语言特性）</li>
<li>内置http支持，使用http读写</li>
<li>类sql的灵活查询（max,min,sum等）</li>
</ul>
<p><strong>influxdb的重要概念</strong></p>
<ul>
<li>datebase：数据库</li>
<li>measurement：数据库中的表</li>
<li>points：表里面的一行数据
<ul>
<li>tags：各种有索引的属性</li>
<li>fields：各种记录的值</li>
<li>time：数据记录的时间戳，也是自动生成的主索引</li>
</ul>
</li>
</ul>
<h3 id="安装influxdb" tabindex="-1"><a class="header-anchor" href="#安装influxdb" aria-hidden="true">#</a> 安装influxdb</h3>
<p><strong>我使用的是docker镜像进行安装</strong></p>
<ul>
<li><a href="https://hub.docker.com/_/influxdb" target="_blank" rel="noopener noreferrer">镜像地址<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/docker/README.md" target="_blank" rel="noopener noreferrer">docker教程地址<ExternalLinkIcon/></a></li>
</ul>
<p><strong>查看镜像</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/home/smile# docker search -f stars=3 --limit 5 influxdb
NAME               DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
influxdb           InfluxDB is an open source time series datab…   1582      [OK]       
telegraf           Telegraf is an agent for collecting metrics …   575       [OK]       
chronograf         Chronograf is a visualization tool for time …   313       [OK]       
bitnami/influxdb  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>安装命令</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull influxdb   #拉取到本地
docker run -it influxdb #运行镜像
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看镜像和绑定的端口</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/home/smile<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE              COMMAND                  CREATED          STATUS          PORTS      NAMES
c5541213e802   influxdb           <span class="token string">"/entrypoint.sh infl…"</span>   <span class="token number">20</span> seconds ago   Up <span class="token number">18</span> seconds   <span class="token number">8086</span>/tcp   elated_jepsen
f19e7fbc3d18   v2f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="influxdb使用" tabindex="-1"><a class="header-anchor" href="#influxdb使用" aria-hidden="true">#</a> influxdb使用</h3>
<p>显示数据库</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>show databases
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建数据库</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>create database influxdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除数据库</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>drop database influxdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用数据库</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>use influxdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="使用到的字段" tabindex="-1"><a class="header-anchor" href="#使用到的字段" aria-hidden="true">#</a> 使用到的字段</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>type Message struct {
	//使用结构体来存储提取出来的监控数据
	TimeLocal                    time.Time //时间
	BytesSent                    int       //流量
	Path, Method, Scheme, Status string    //请求路径
	UpstreamTime, RequestTime    float64   //监控数据
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Tags：Path, Method, Scheme, Status</li>
<li>Fields：UpstreamTime, RequestTime，BytesSent</li>
<li>Time：TimeLocal</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/6.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/8.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


