<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第2节-go并发编程–日志分析系统介绍" tabindex="-1"><a class="header-anchor" href="#第2节-go并发编程–日志分析系统介绍" aria-hidden="true">#</a> 第2节 Go并发编程–日志分析系统介绍</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/1.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
</blockquote>
<hr>
<p>[TOC]</p>
<blockquote>
<p>到这里默认你满足了高级篇的学习条件，如果你还没有满足，可以移步到基础篇</p>
<p>如果你一定要学习，又没有安装Go语言环境，<a href="https://tour.golang.org/welcome/1" target="_blank" rel="noopener noreferrer">可以来这里<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<h3 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h3>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/markdown/%E5%B9%B6%E5%8F%91.md" target="_blank" rel="noopener noreferrer">并发学习<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/3293172751/os" target="_blank" rel="noopener noreferrer">操作系统学习<ExternalLinkIcon/></a></li>
</ul>
<p><strong>项目会完整发布到GitHub仓库，有需要的可以在GitHub上面⭐收藏，fock进行贡献</strong></p>
<ul>
<li><a href="https://github.com/3293172751/log-monitoring" target="_blank" rel="noopener noreferrer">GitHub项目地址<ExternalLinkIcon/></a></li>
</ul>
<hr>
<p>Golang是一门简单高效的编程语言，我在编写学习的过程中也被其特性所吸引，日志监控系统是生产环境中必备的功能系统，它的作用可以说仅次于核心系统 而Golang的协程实现可以很好的帮我们完成这一核心功能，通过模拟读取nginx输出的日志文件，使用log_proccess.go进行实时读取解析写入到influxdb存储， 再由grafana进行实时展现。mock_data.go是我用于模拟日志输出的一个应用程序。</p>
<p><strong>下面是我们的开发流程图</strong></p>
<div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
    日志文件<span class="token arrow operator">--></span>log_process<span class="token arrow operator">--></span>influxdb<span class="token arrow operator">--></span>grafana
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>Golang的并发实现可以通过goroutine执行，而多个goroutine间的数据同步与通信则是channel，且多个channel可以选择数据的读取与写入。 这里需要认真理解下并发与并行。并发：指同一时刻，系统通过调度，来回切换交替的运行多个任务，“看起来”是同时进行；并行：指同一时刻， 两个任务“真正的”同时进行；</p>
</blockquote>
<h3 id="日志分析系统实战" tabindex="-1"><a class="header-anchor" href="#日志分析系统实战" aria-hidden="true">#</a> 日志分析系统实战</h3>
<p><strong>1、系统架构设计</strong></p>
<p><strong>2、读取模块的实现</strong></p>
<ul>
<li>
<p>打开文件</p>
</li>
<li>
<p>从文件末尾开始逐行读取</p>
</li>
<li>
<p>写入Read Channel</p>
</li>
</ul>
<p><strong>3、解析模块的实现</strong></p>
<ul>
<li>
<p>从Read Channel中读取每行日志数据</p>
</li>
<li>
<p>正则提取所需的监控数据（path、status、method等）</p>
</li>
<li>
<p>写入Write Channel</p>
</li>
</ul>
<p><strong>4、写入模块的实现</strong></p>
<ul>
<li>
<p>初始化influxdb client</p>
</li>
<li>
<p>从Write Channel中读取监控数据</p>
</li>
<li>
<p>构造数据并写入influxdb</p>
</li>
</ul>
<p><strong>5、绘制监控图</strong></p>
<ul>
<li>用grafana</li>
</ul>
<p><strong>6、监控模块的实现</strong></p>
<ul>
<li>
<p>总处理日志行数</p>
</li>
<li>
<p>系统吞出量</p>
</li>
<li>
<p>read channel长度</p>
</li>
<li>
<p>write channel长度</p>
</li>
<li>
<p>运行总时间</p>
</li>
</ul>
<h3 id="常见的并发模型" tabindex="-1"><a class="header-anchor" href="#常见的并发模型" aria-hidden="true">#</a> 常见的并发模型</h3>
<ul>
<li>进程&amp;线程（Apache)    —C10k</li>
<li>异步非阻塞（Nginx，libevent，NodeJS)    —复杂度高</li>
<li>协程（<strong>Golang</strong>，Erlang，Lua)    —比线程更轻量、更高效</li>
</ul>
<h3 id="golang并发实现" tabindex="-1"><a class="header-anchor" href="#golang并发实现" aria-hidden="true">#</a> Golang并发实现</h3>
<ul>
<li><strong>程序并发执行（goroutine)</strong></li>
<li><strong>多个goroutine之间的数据同步和通信（channels)</strong></li>
<li><strong>多个channel选择数据读取或者写入（select）</strong></li>
</ul>
<h4 id="_1-goroutine" tabindex="-1"><a class="header-anchor" href="#_1-goroutine" aria-hidden="true">#</a> 1. goroutine</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>foo()  	//执行函数foo，程序等待函数foo返回
go foo()   //执行函数foo  @2
bar()  //不用等待foo返回（协程）并发执行--不会阻塞
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>此时引入了一个问题，在@2中程序是怎么在多个goroutine之间通信的呢？</strong></p>
<h4 id="_2-channels" tabindex="-1"><a class="header-anchor" href="#_2-channels" aria-hidden="true">#</a> 2. channels</h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>c <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span>   <span class="token comment">//创建一个channel</span>
<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">*</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    c <span class="token operator">&lt;-</span> <span class="token string">"message from closure"</span>   <span class="token comment">//发送数据到channel中</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
msg <span class="token operator">:=</span> <span class="token operator">&lt;-</span>c   <span class="token comment">//阻塞直到接收到数据</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-select" tabindex="-1"><a class="header-anchor" href="#_3-select" aria-hidden="true">#</a> 3. Select</h4>
<p><strong>select从多个channel中读取或者写入数据</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">select</span> <span class="token punctuation">{</span>
<span class="token keyword">case</span> v <span class="token operator">:=</span> <span class="token operator">&lt;-</span> c1<span class="token punctuation">:</span>  <span class="token comment">//if c1 has date </span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"channel 1 sends"</span><span class="token punctuation">,</span>v<span class="token punctuation">)</span>
<span class="token keyword">case</span> v<span class="token operator">:=</span> <span class="token operator">&lt;-</span> c2<span class="token punctuation">:</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"channel 2 sends"</span><span class="token punctuation">,</span>v<span class="token punctuation">)</span>
<span class="token keyword">default</span><span class="token punctuation">:</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"neither channel was ready"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="influxdb简介" tabindex="-1"><a class="header-anchor" href="#influxdb简介" aria-hidden="true">#</a> Influxdb简介</h3>
<p>Influxdb是一个开源的时序性的数据库，使用Go语言编写，被广泛应用于存储系统的监控数据，IoT行业的实时数据等场景。有以下特性：</p>
<ul>
<li>
<p>部署简单，无外部依赖</p>
</li>
<li>
<p>内置http支持，使用http读写</p>
</li>
<li>
<p>类sql的灵活查询（max，min，sum等）</p>
</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/1.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/3.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


