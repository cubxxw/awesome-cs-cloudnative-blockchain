<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第3节-并发与并行" tabindex="-1"><a class="header-anchor" href="#第3节-并发与并行" aria-hidden="true">#</a> 第3节 并发与并行</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/2.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
</blockquote>
<hr>
<p>[TOC]</p>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/markdown/%E5%B9%B6%E5%8F%91.md" target="_blank" rel="noopener noreferrer">并发介绍<ExternalLinkIcon/></a></li>
</ul>
<h3 id="并发和并行关系" tabindex="-1"><a class="header-anchor" href="#并发和并行关系" aria-hidden="true">#</a> 并发和并行关系</h3>
<p><strong>1. 多线程程序在单核上运行，就是并发</strong></p>
<ul>
<li>从微观上看，一个时间段只有一个程序在执行</li>
</ul>
<p><strong>2. 多线程程序在多核上运行，就是并行</strong></p>
<ul>
<li>Go语言支持并行，因为并行的速度更快，在多个CPU上同时进行</li>
</ul>
<p><img src="http://sm.nsddd.top/smimage-20220707145115419.png" alt="image-20220707145115419"></p>
<p><strong>在我们的日志监控系统中，对于log_process是可以把每一个模块都独立出来的</strong></p>
<ul>
<li>实时读取</li>
<li>解析</li>
<li>写入</li>
</ul>
<p><strong>我们的goroutine是并发的执行呢，还是并行的执行呢~</strong></p>
<p>goroutinue，本质上就是协程。但也存在两点不同：</p>
<ul>
<li>
<p>goroutine可以实现并行，也就是说，多个协程可以在多个处理器上跑。而协程同一时刻只能在一个处理器上跑（把宿主语言想象成单线程就好了）。</p>
</li>
<li>
<p>goroutine之间通信是通过channel，而协程通信时通过yield和resume()操作。</p>
</li>
</ul>
<p><strong>每个进程中的内存：</strong></p>
<ol>
<li>地址空间</li>
<li>全局变量</li>
<li>打开文件</li>
<li>子进程</li>
<li>即将发生的定时器</li>
<li>信号与信号处理程序</li>
<li>账户信息</li>
</ol>
<p><strong>每个线程中的内容：</strong></p>
<ol>
<li>程序计数器（记录要执行的哪条指令）</li>
<li>寄存器 （保存线程当前的工作变量）</li>
<li>堆栈（唯一堆栈，来记录执行历史）</li>
<li>状态</li>
</ol>
<p><strong>由于线程具有进程的某些性质，所以有时被称为轻量级线程，多线程</strong></p>
<h5 id="线程与进程的区别可以归纳为以下4点" tabindex="-1"><a class="header-anchor" href="#线程与进程的区别可以归纳为以下4点" aria-hidden="true">#</a> 线程与进程的区别可以归纳为以下4点：</h5>
<ol>
<li>
<p>地址空间和其它资源（如打开文件）：进程间相互独立，同一进程的各线程间共享。某进程内的线程在其它进程不可见。</p>
</li>
<li>
<p>通信：进程间通信IPC，线程间可以直接读写进程数据段（如全局变量）来进行通信——需要进程同步和互斥手段的辅助，以保证数据的一致性。</p>
</li>
<li>
<p>调度和切换：线程上下文切换比进程上下文切换要快得多。</p>
</li>
<li>
<p>在多线程OS中，进程不是一个可执行的实体。</p>
</li>
</ol>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/2.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/4.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


