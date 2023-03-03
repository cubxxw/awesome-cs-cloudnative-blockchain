<template><div><h1 id="chan环形队列-先进先出" tabindex="-1"><a class="header-anchor" href="#chan环形队列-先进先出" aria-hidden="true">#</a> chan环形队列 先进先出</h1>
<p>[toc]</p>
<p>😶‍🌫️go语言官方编程指南：<a href="https://golang.org/#" target="_blank" rel="noopener noreferrer">https://golang.org/#<ExternalLinkIcon/></a></p>
<blockquote>
<p>go语言的官方文档学习笔记很全，推荐去官网学习</p>
</blockquote>
<p>😶‍🌫️我的学习笔记：github: <a href="https://github.com/3293172751/golang-rearn" target="_blank" rel="noopener noreferrer">https://github.com/3293172751/golang-rearn<ExternalLinkIcon/></a></p>
<hr>
<p><strong>区块链技术（也称之为分布式账本技术）</strong>，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录</p>
<blockquote>
<p>❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客<a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="_1-1-环形缓冲区结构" tabindex="-1"><a class="header-anchor" href="#_1-1-环形缓冲区结构" aria-hidden="true">#</a> 1.1 环形缓冲区结构</h2>
<p>​       环形缓冲区通常有一个读指针和一个写指针。读指针指向环形缓冲区中可读的数据，写指针指向环形缓冲区中可写的缓冲区。通过移动读指针和写指针就可以实现缓冲区的数据读取和写入。在通常情况下，环形缓冲区的读用户仅仅会影响读指针，而写用户仅仅会影响写指针。如果仅仅有一个读用户和一个写用户，那么不需要添加互斥保护机制就可以保证数据的正确性。如果有多个读写用户访问环形缓冲区，那么必须添加互斥保护机制来确保多个用户互斥访问环形缓冲区。</p>
<h2 id="_1-2-环形缓冲区一种读写实现机制" tabindex="-1"><a class="header-anchor" href="#_1-2-环形缓冲区一种读写实现机制" aria-hidden="true">#</a> 1.2 环形缓冲区一种读写实现机制</h2>
<p>一般的，圆形缓冲区需要4个指针</p>
<p>在内存中实际开始位置；</p>
<p><strong>在内存中实际结束位置，也可以用缓冲区长度代替；</strong></p>
<p><strong>存储在缓冲区中的有效数据的开始位置（读指针）；</strong></p>
<p><strong>存储在缓冲区中的有效数据的结尾位置（写指针）。</strong></p>
<p>缓冲区是满、或是空，都有可能出现读指针与写指针指向同一位置：</p>
<p>缓冲区中总是有一个存储单元保持未使用状态。缓冲区最多存入（size-1）个数据。如果读写指针指向同一位置，则缓冲区为空。如果写指针位于读指针的相邻后一个位置，则缓冲区为满。</p>
<p><img src="https://s2.loli.net/2022/03/20/6EgmtVuvlj2YMxU.jpg" alt="img"></p>
<h2 id="_2-chan内部数据结构" tabindex="-1"><a class="header-anchor" href="#_2-chan内部数据结构" aria-hidden="true">#</a> 2 chan内部数据结构</h2>
<h3 id="_2-1-chan的数据结构" tabindex="-1"><a class="header-anchor" href="#_2-1-chan的数据结构" aria-hidden="true">#</a> 2.1 chan的数据结构</h3>
<p><strong>chan实质是个环形缓冲区，外加一个接受者协程队列和一个发送者协程队列</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>buf      ：环形缓冲区
sendx ：用于记录buf这个循环链表中的发送的index
recvx  ：用于记录buf这个循环链表中接收的index
recvq  ：接受者协程队列
sendq ：发送者协程队列
lock    ：互斥锁
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-有缓冲区和无缓冲区chan的区别" tabindex="-1"><a class="header-anchor" href="#_2-2-有缓冲区和无缓冲区chan的区别" aria-hidden="true">#</a> 2.2 有缓冲区和无缓冲区chan的区别</h3>
<h5 id="_2-2-1-无缓冲chan数据同步过程和sudog结构" tabindex="-1"><a class="header-anchor" href="#_2-2-1-无缓冲chan数据同步过程和sudog结构" aria-hidden="true">#</a> 2.2.1 无缓冲chan数据同步过程和sudog结构</h5>
<p>创建一个发送者列表和接收者列表都为空的 channel。
第一个协程向 channel 发送变量的值
channel 从池中获取一个sudog结构体变量，用于表示发送者。sudog 结构体会保持对发送者所在协程的引用，以及发送变量的引用。
发送者加入sendq队列。
发送者协程进入等待状态。
第二个协程将从 channel 中读取一个消息
channel 将sendq列表中等待状态的发送者出队列。
chanel 使用memmove函数将发送者要发送的值进行拷贝，包装入sudog结构体，再传递给 channel 接收者的接收变量。
在第五步中被挂起的第一个协程将恢复运行并释放第三步中获取的sudog结构体。</p>
<h5 id="_2-2-1-有缓冲chan" tabindex="-1"><a class="header-anchor" href="#_2-2-1-有缓冲chan" aria-hidden="true">#</a> 2.2.1 有缓冲chan</h5>
<p>有缓冲chan实质是使用了完整的环形缓冲区，只要缓冲区有空闲，则发送者无需进入等待队列，直接将数据放入环形缓冲区中，如果缓冲区有数据，接受者无需进入等待队列，直接从环形缓冲区中获取数据。</p>
<h2 id="_3-关键源码分析" tabindex="-1"><a class="header-anchor" href="#_3-关键源码分析" aria-hidden="true">#</a> 3 关键源码分析</h2>
<h3 id="_3-1-chan数据结构源码" tabindex="-1"><a class="header-anchor" href="#_3-1-chan数据结构源码" aria-hidden="true">#</a> 3.1 chan数据结构源码</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> hchan <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	qcount   <span class="token builtin">uint</span>           <span class="token comment">// total data in the queue</span>
	dataqsiz <span class="token builtin">uint</span>           <span class="token comment">// size of the circular queue</span>
	buf      unsafe<span class="token punctuation">.</span>Pointer <span class="token comment">// points to an array of dataqsiz elements</span>
	elemsize <span class="token builtin">uint16</span>
	closed   <span class="token builtin">uint32</span>
	elemtype <span class="token operator">*</span>_type <span class="token comment">// element type</span>
	sendx    <span class="token builtin">uint</span>   <span class="token comment">// send index</span>
	recvx    <span class="token builtin">uint</span>   <span class="token comment">// receive index</span>
	recvq    waitq  <span class="token comment">// list of recv waiters</span>
	sendq    waitq  <span class="token comment">// list of send waiters</span>
<span class="token comment">// lock protects all fields in hchan, as well as several</span>
<span class="token comment">// fields in sudogs blocked on this channel.</span>
<span class="token comment">//</span>
<span class="token comment">// Do not change another G's status while holding this lock</span>
<span class="token comment">// (in particular, do not ready a G), as this can deadlock</span>
<span class="token comment">// with stack shrinking.</span>
lock mutex
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-sudog数据结构源码" tabindex="-1"><a class="header-anchor" href="#_3-2-sudog数据结构源码" aria-hidden="true">#</a> 3.2 sudog数据结构源码</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// sudog represents a g in a wait list, such as for sending/receiving</span>
<span class="token comment">// on a channel.</span>
<span class="token comment">//</span>
<span class="token comment">// sudog is necessary because the g ↔ synchronization object relation</span>
<span class="token comment">// is many-to-many. A g can be on many wait lists, so there may be</span>
<span class="token comment">// many sudogs for one g; and many gs may be waiting on the same</span>
<span class="token comment">// synchronization object, so there may be many sudogs for one object.</span>
<span class="token comment">//</span>
<span class="token comment">// sudogs are allocated from a special pool. Use acquireSudog and</span>
<span class="token comment">// releaseSudog to allocate and free them.</span>
<span class="token keyword">type</span> sudog <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// The following fields are protected by the hchan.lock of the</span>
	<span class="token comment">// channel this sudog is blocking on. shrinkstack depends on</span>
	<span class="token comment">// this for sudogs involved in channel ops.</span>
g 		<span class="token operator">*</span>g
<span class="token comment">// isSelect indicates g is participating in a select, so</span>
<span class="token comment">// g.selectDone must be CAS'd to win the wake-up race.</span>
isSelect <span class="token builtin">bool</span>
next     <span class="token operator">*</span>sudog
prev     <span class="token operator">*</span>sudog
elem     unsafe<span class="token punctuation">.</span>Pointer <span class="token comment">// data element (may point to stack)</span>
 
<span class="token comment">// The following fields are never accessed concurrently.</span>
<span class="token comment">// For channels, waitlink is only accessed by g.</span>
<span class="token comment">// For semaphores, all fields (including the ones above)</span>
<span class="token comment">// are only accessed when holding a semaRoot lock.</span>
 
acquiretime <span class="token builtin">int64</span>
releasetime <span class="token builtin">int64</span>
ticket      <span class="token builtin">uint32</span>
parent      <span class="token operator">*</span>sudog <span class="token comment">// semaRoot binary tree</span>
waitlink    <span class="token operator">*</span>sudog <span class="token comment">// g.waiting list or semaRoot</span>
waittail    <span class="token operator">*</span>sudog <span class="token comment">// semaRoot</span>
c           <span class="token operator">*</span>hchan <span class="token comment">// channel</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-chan的构造过程" tabindex="-1"><a class="header-anchor" href="#_3-3-chan的构造过程" aria-hidden="true">#</a> 3.3 chan的构造过程</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">makechan</span><span class="token punctuation">(</span>t <span class="token operator">*</span>chantype<span class="token punctuation">,</span> size <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>hchan <span class="token punctuation">{</span>
	elem <span class="token operator">:=</span> t<span class="token punctuation">.</span>elem
<span class="token comment">// compiler checks this but be safe.</span>
<span class="token keyword">if</span> elem<span class="token punctuation">.</span>size <span class="token operator">>=</span> <span class="token number">1</span><span class="token operator">&lt;&lt;</span><span class="token number">16</span> <span class="token punctuation">{</span>
	<span class="token function">throw</span><span class="token punctuation">(</span><span class="token string">"makechan: invalid channel element type"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> hchanSize<span class="token operator">%</span>maxAlign <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">||</span> elem<span class="token punctuation">.</span>align <span class="token operator">></span> maxAlign <span class="token punctuation">{</span>
	<span class="token function">throw</span><span class="token punctuation">(</span><span class="token string">"makechan: bad alignment"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
 
mem<span class="token punctuation">,</span> overflow <span class="token operator">:=</span> math<span class="token punctuation">.</span><span class="token function">MulUintptr</span><span class="token punctuation">(</span>elem<span class="token punctuation">.</span>size<span class="token punctuation">,</span> <span class="token function">uintptr</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> overflow <span class="token operator">||</span> mem <span class="token operator">></span> maxAlloc<span class="token operator">-</span>hchanSize <span class="token operator">||</span> size <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token function">plainError</span><span class="token punctuation">(</span><span class="token string">"makechan: size out of range"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
 
<span class="token comment">// Hchan does not contain pointers interesting for GC when elements stored in buf do not contain pointers.</span>
<span class="token comment">// buf points into the same allocation, elemtype is persistent.</span>
<span class="token comment">// SudoG's are referenced from their owning thread so they can't be collected.</span>
<span class="token comment">// TODO(dvyukov,rlh): Rethink when collector can move allocated objects.</span>
<span class="token keyword">var</span> c <span class="token operator">*</span>hchan
<span class="token keyword">switch</span> <span class="token punctuation">{</span>
<span class="token keyword">case</span> mem <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
	<span class="token comment">// Queue or element size is zero.</span>
	c <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>hchan<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token function">mallocgc</span><span class="token punctuation">(</span>hchanSize<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// Race detector uses this location for synchronization.</span>
	c<span class="token punctuation">.</span>buf <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">raceaddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">case</span> elem<span class="token punctuation">.</span>ptrdata <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
	<span class="token comment">// Elements do not contain pointers.</span>
	<span class="token comment">// Allocate hchan and buf in one call.</span>
	c <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>hchan<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token function">mallocgc</span><span class="token punctuation">(</span>hchanSize<span class="token operator">+</span>mem<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	c<span class="token punctuation">.</span>buf <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">,</span> hchanSize<span class="token punctuation">)</span>
<span class="token keyword">default</span><span class="token punctuation">:</span>
	<span class="token comment">// Elements contain pointers.</span>
	c <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>hchan<span class="token punctuation">)</span>
	c<span class="token punctuation">.</span>buf <span class="token operator">=</span> <span class="token function">mallocgc</span><span class="token punctuation">(</span>mem<span class="token punctuation">,</span> elem<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
 
c<span class="token punctuation">.</span>elemsize <span class="token operator">=</span> <span class="token function">uint16</span><span class="token punctuation">(</span>elem<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
c<span class="token punctuation">.</span>elemtype <span class="token operator">=</span> elem
c<span class="token punctuation">.</span>dataqsiz <span class="token operator">=</span> <span class="token function">uint</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span>
 
<span class="token keyword">if</span> debugChan <span class="token punctuation">{</span>
	<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"makechan: chan="</span><span class="token punctuation">,</span> c<span class="token punctuation">,</span> <span class="token string">"; elemsize="</span><span class="token punctuation">,</span> elem<span class="token punctuation">.</span>size<span class="token punctuation">,</span> <span class="token string">"; dataqsiz="</span><span class="token punctuation">,</span> size<span class="token punctuation">,</span> <span class="token string">"\n"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> c
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，如果不传入size或size=0，则没有为环形缓冲区分配内存，职位chan结构分配内存</p>
<h3 id="_3-4-无缓冲收发" tabindex="-1"><a class="header-anchor" href="#_3-4-无缓冲收发" aria-hidden="true">#</a> 3.4 无缓冲收发</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Sends and receives on unbuffered or empty-buffered channels are the</span>
<span class="token comment">// only operations where one running goroutine writes to the stack of</span>
<span class="token comment">// another running goroutine. The GC assumes that stack writes only</span>
<span class="token comment">// happen when the goroutine is running and are only done by that</span>
<span class="token comment">// goroutine. Using a write barrier is sufficient to make up for</span>
<span class="token comment">// violating that assumption, but the write barrier has to work.</span>
<span class="token comment">// typedmemmove will call bulkBarrierPreWrite, but the target bytes</span>
<span class="token comment">// are not in the heap, so that will not help. We arrange to call</span>
<span class="token comment">// memmove and typeBitsBulkBarrier instead.</span>

<span class="token keyword">func</span> <span class="token function">sendDirect</span><span class="token punctuation">(</span>t <span class="token operator">*</span>_type<span class="token punctuation">,</span> sg <span class="token operator">*</span>sudog<span class="token punctuation">,</span> src unsafe<span class="token punctuation">.</span>Pointer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// src is on our stack, dst is a slot on another stack.</span>
	<span class="token comment">// Once we read sg.elem out of sg, it will no longer</span>
	<span class="token comment">// be updated if the destination's stack gets copied (shrunk).</span>
	<span class="token comment">// So make sure that no preemption points can happen between read &amp; use.</span>
	dst <span class="token operator">:=</span> sg<span class="token punctuation">.</span>elem
	<span class="token function">typeBitsBulkBarrier</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token function">uintptr</span><span class="token punctuation">(</span>dst<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">uintptr</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span><span class="token punctuation">,</span> t<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
	<span class="token comment">// No need for cgo write barrier checks because dst is always</span>
	<span class="token comment">// Go memory.</span>
	<span class="token function">memmove</span><span class="token punctuation">(</span>dst<span class="token punctuation">,</span> src<span class="token punctuation">,</span> t<span class="token punctuation">.</span>size<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">recvDirect</span><span class="token punctuation">(</span>t <span class="token operator">*</span>_type<span class="token punctuation">,</span> sg <span class="token operator">*</span>sudog<span class="token punctuation">,</span> dst unsafe<span class="token punctuation">.</span>Pointer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// dst is on our stack or the heap, src is on another stack.</span>
	<span class="token comment">// The channel is locked, so src will not move during this</span>
	<span class="token comment">// operation.</span>
	src <span class="token operator">:=</span> sg<span class="token punctuation">.</span>elem
	<span class="token function">typeBitsBulkBarrier</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token function">uintptr</span><span class="token punctuation">(</span>dst<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">uintptr</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span><span class="token punctuation">,</span> t<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
	<span class="token function">memmove</span><span class="token punctuation">(</span>dst<span class="token punctuation">,</span> src<span class="token punctuation">,</span> t<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
</div></template>


