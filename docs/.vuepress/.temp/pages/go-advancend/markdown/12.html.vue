<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第12节-go语言的并发特性" tabindex="-1"><a class="header-anchor" href="#第12节-go语言的并发特性" aria-hidden="true">#</a> 第12节 Go语言的并发特性</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/11.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="并发模型" tabindex="-1"><a class="header-anchor" href="#并发模型" aria-hidden="true">#</a> 并发模型</h2>
<p>在早期，CPU 都是以单核的形式顺序执行机器指令。Go 语言的祖先 C 语言正是这种顺序编程语言的代表。顺序编程语言中的顺序是指：所有的指令都是以串行的方式执行，在相同的时刻有且仅有一个 CPU 在顺序执行程序的指令。</p>
<p>Goroutine是 Go 语言特有的并发体，是一种轻量级的线程，由 go 关键字启动。在真实的 Go 语言的实现中，goroutine 和系统线程也不是等价的。尽管两者的区别实际上只是一个量的区别，但正是这个量变引发了 Go 语言并发编程质的飞跃。</p>
<h2 id="go与并发" tabindex="-1"><a class="header-anchor" href="#go与并发" aria-hidden="true">#</a> Go与并发</h2>
<ul>
<li><a href="../code/12.go">对应的文件</a></li>
</ul>
<p><strong>Go语言推荐CSP并发模型</strong></p>
<ul>
<li>
<p>不同于传统多线程通过共享内存来通信，CSP是以通信的方式来共享内存</p>
</li>
<li>
<p>Go通过一些机制大大减少了开发并发代码的难度（但是并没有提高并发性）</p>
</li>
</ul>
<blockquote>
<p>在并发编程中，对共享资源的正确访问需要精确的控制，在目前的绝大多数语言中，都是通过加锁等线程同步方案来解决这一困难问题，而 Go 语言却另辟蹊径，它将共享的值通过 Channel 传递(实际上多个独立执行的线程很少主动共享资源)。在任意给定的时刻，最好只有一个 Goroutine 能够拥有该资源。数据竞争从设计层面上就被杜绝了。</p>
</blockquote>
<h2 id="go语言" tabindex="-1"><a class="header-anchor" href="#go语言" aria-hidden="true">#</a> Go语言</h2>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/11.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/13.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


