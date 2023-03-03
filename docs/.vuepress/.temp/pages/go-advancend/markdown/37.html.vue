<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第37节-go语言深刨底层原理" tabindex="-1"><a class="header-anchor" href="#第37节-go语言深刨底层原理" aria-hidden="true">#</a> 第37节 Go语言深刨底层原理</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/36.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="线程加锁" tabindex="-1"><a class="header-anchor" href="#线程加锁" aria-hidden="true">#</a> 线程加锁</h2>
<p>Go语言中 sync 包里提供了互斥锁 Mutex 和读写锁 RWMutex 用于处理并发过程中可能出现同时两个或多个协程（或线程）读或写同一个变量的情况。</p>
<p><strong>锁是 sync 包中的核心，它主要有两个方法，分别是加锁（Lock）和解锁（Unlock）。</strong></p>
<p>在并发的情况下，多个线程或协程同时其修改一个变量，使用锁能保证在某一时间内，只有一个协程或线程修改这一变量。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"time"</span>
<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>idx <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            a <span class="token operator">+=</span> <span class="token number">1</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从理论上来说，上面的程序会将 a 的值依次递增输出，然而实际结果却是下面这样子的。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">537</span>
<span class="token number">995</span>
<span class="token number">996</span>
<span class="token number">997</span>
<span class="token number">538</span>
<span class="token number">999</span>
<span class="token number">1000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通过运行结果可以看出 a 的值并不是按顺序递增输出的，这是为什么呢？</strong></p>
<p>协程的执行顺序大致如下所示：</p>
<ul>
<li>从寄存器读取 a 的值；</li>
<li>然后做加法运算；</li>
<li>最后写到寄存器。</li>
</ul>
<p>按照上面的顺序，假如有一个协程取得 a 的值为 3，然后执行加法运算，此时又有一个协程对 a 进行取值，得到的值同样是 3，最终两个协程的返回结果是相同的。</p>
<p>而锁的概念就是，当一个协程正在处理 a 时将 a 锁定，其它协程需要等待该协程处理完成并将 a 解锁后才能再进行操作，也就是说同时处理 a 的协程只能有一个，从而避免上面示例中的情况出现。</p>
<h3 id="互斥锁-mutex" tabindex="-1"><a class="header-anchor" href="#互斥锁-mutex" aria-hidden="true">#</a> 互斥锁 Mutex</h3>
<p>上面的示例中出现的问题怎么解决呢？加一个互斥锁 Mutex 就可以了。那什么是互斥锁呢 ？互斥锁中其有两个方法可以调用，如下所示：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>func <span class="token punctuation">(</span>m *Mutex<span class="token punctuation">)</span> Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>
func <span class="token punctuation">(</span>m *Mutex<span class="token punctuation">)</span> Unlock<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"sync"</span>
    <span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">var</span> lock sync<span class="token punctuation">.</span>Mutex
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>idx <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">defer</span> lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            a <span class="token operator">+=</span> <span class="token number">1</span>
            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"goroutine %d, a=%d\n"</span><span class="token punctuation">,</span> idx<span class="token punctuation">,</span> a<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 等待 1s 结束主程序</span>
    <span class="token comment">// 确保所有协程执行完</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>goroutine <span class="token number">995</span>, <span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">996</span>
goroutine <span class="token number">996</span>, <span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">997</span>
goroutine <span class="token number">997</span>, <span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">998</span>
goroutine <span class="token number">998</span>, <span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">999</span>
goroutine <span class="token number">999</span>, <span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">1000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sync-包的介绍" tabindex="-1"><a class="header-anchor" href="#sync-包的介绍" aria-hidden="true">#</a> sync 包的介绍</h2>
<p><code v-pre>sync</code>包中比较常用的几个方法及其功能的介绍：</p>
<ol>
<li><code v-pre>sync.Mutex</code>：互斥锁，它是一种最基本的锁，也是最常用的一种锁。互斥锁只有两种状态：锁定和未锁定，每次只能有一个线程获取锁，其他线程需要等待锁被释放后才能再次尝试获取锁。</li>
<li><code v-pre>sync.RWMutex</code>：读写锁，它是一种高级锁，适用于读多写少的场景。读写锁与互斥锁不同的是，读写锁支持多个读操作同时进行，但写操作只能有一个进行。当读操作和写操作同时存在时，写操作优先级更高。</li>
<li><code v-pre>sync.WaitGroup</code>：等待组，它用于等待一组goroutine执行完成。等待组有两个主要方法：<code v-pre>Add</code>方法用于添加goroutine数量，<code v-pre>Done</code>方法用于减少goroutine数量。当等待组内所有goroutine执行完成后，调用<code v-pre>Wait</code>方法可以阻塞等待直到所有goroutine完成。</li>
<li><code v-pre>sync.Cond</code>：条件变量，它可以让一个goroutine等待另一个goroutine的信号，从而实现线程间的同步。条件变量通常与互斥锁一起使用，可以让等待某个条件的goroutine在条件满足时被唤醒。</li>
<li><code v-pre>sync.Once</code>：一次性初始化，它用于保证一个函数只被执行一次。<code v-pre>Once</code>的主要方法是<code v-pre>Do</code>，它接收一个函数作为参数，只有在第一次调用<code v-pre>Do</code>方法时，才会执行该函数。后续对<code v-pre>Do</code>方法的调用都将被忽略。</li>
</ol>
<h3 id="sync-mutex" tabindex="-1"><a class="header-anchor" href="#sync-mutex" aria-hidden="true">#</a> <code v-pre>sync.Mutex</code></h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
    count <span class="token builtin">int</span>
    lock  sync<span class="token punctuation">.</span>Mutex
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">defer</span> lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            count<span class="token operator">++</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"count:"</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，我们定义了一个全局变量<code v-pre>count</code>和一个<code v-pre>sync.Mutex</code>类型的锁<code v-pre>lock</code>。然后我们开启了10个goroutine，每个goroutine都会对<code v-pre>count</code>进行加一的操作，这个加一的操作需要先获取锁，然后在操作完成后再释放锁。在这个过程中，如果没有使用锁，那么多个goroutine同时对<code v-pre>count</code>进行修改，就会导致数据不一致（是指的是其他函数如果也对count进行修改）。使用<code v-pre>sync.Mutex</code>能够保证每次只有一个goroutine能够修改<code v-pre>count</code>，从而保证数据的一致性。</p>
<p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"c:\Users\smile\Desktop<span class="token entity" title="\t">\t</span>est\sync.go"</span>
count: <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sync-rwmutex" tabindex="-1"><a class="header-anchor" href="#sync-rwmutex" aria-hidden="true">#</a> <code v-pre>sync.RWMutex</code></h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
    count <span class="token builtin">int</span>
    rwlock sync<span class="token punctuation">.</span>RWMutex
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            rwlock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">defer</span> rwlock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            count<span class="token operator">++</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            rwlock<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">defer</span> rwlock<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"count:"</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，我们使用了<code v-pre>sync.RWMutex</code>类型的锁<code v-pre>rwlock</code>。前面的10个goroutine都对<code v-pre>count</code>进行了加一的操作，这个操作需要获取写锁。后面的10个goroutine都只是读取<code v-pre>count</code>的值，这个操作只需要获取读锁。使用读写锁能够提高并发性能，<strong>因为读操作可以同时进行，而写操作只能有一个进行。</strong></p>
<p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"c:\Users\smile\Desktop<span class="token entity" title="\t">\t</span>est\sync.go"</span>
count: <span class="token number">0</span>
count: <span class="token number">10</span>
count: <span class="token number">10</span>
count: <span class="token number">10</span>
count: <span class="token number">10</span>
count: <span class="token number">10</span>
count: <span class="token number">10</span>
count: <span class="token number">10</span>
count: <span class="token number">10</span>
count: <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sync-waitgroup" tabindex="-1"><a class="header-anchor" href="#sync-waitgroup" aria-hidden="true">#</a> <code v-pre>sync.WaitGroup</code></h3>
<p><img src="http://sm.nsddd.top/sm202302282346627.png" alt="image-20230228234629382"></p>
<p><code v-pre>sync.WaitGroup</code>：等待组，它用于等待一组goroutine执行完成。等待组有两个主要方法：<code v-pre>Add</code>方法用于添加goroutine数量，<code v-pre>Done</code>方法用于减少goroutine数量。当等待组内所有goroutine执行完成后，调用<code v-pre>Wait</code>方法可以阻塞等待直到所有goroutine完成。</p>
<h3 id="sync-cond" tabindex="-1"><a class="header-anchor" href="#sync-cond" aria-hidden="true">#</a> <code v-pre>sync.Cond</code></h3>
<p><img src="http://sm.nsddd.top/sm202302282350135.png" alt="image-20230228235054943"></p>
<p><code v-pre>sync.Cond</code>：条件变量，它可以让一个goroutine等待另一个goroutine的信号，从而实现线程间的同步。条件变量通常与互斥锁一起使用，可以让等待某个条件的goroutine在条件满足时被唤醒。</p>
<h3 id="sync-once" tabindex="-1"><a class="header-anchor" href="#sync-once" aria-hidden="true">#</a> <code v-pre>sync.Once</code></h3>
<p><code v-pre>sync.Once</code>：一次性初始化，它用于保证一个函数只被执行一次。<code v-pre>Once</code>的主要方法是<code v-pre>Do</code>，它接收一个函数作为参数，只有在第一次调用<code v-pre>Do</code>方法时，才会执行该函数。后续对<code v-pre>Do</code>方法的调用都将被忽略。</p>
<h2 id="线程调度" tabindex="-1"><a class="header-anchor" href="#线程调度" aria-hidden="true">#</a> 线程调度</h2>
<p>Go语言的线程调度还是蛮重要的，细节讲一下：</p>
<ul>
<li>进程：资源分配的基本单位</li>
<li>线程：这是调度分配的基本单位（用户态线程不分配资源——）</li>
</ul>
<p><strong>无论是线程还是进程，其实我的理解是，线程也是属于进程，在 Linux 中都是以 <code v-pre>task_struct</code> 描述，从内核的本质上看，与进程无本质区别。</strong></p>
<p><img src="http://sm.nsddd.top/sm202302282340463.png" alt="image-20230228234015309"></p>
<p>上面的图 告诉我们，线程也可以是一种特殊的进程，进程也是从 init system 根进程 中 不断地 fork 出来的二叉树。那么线程也是一直 copy 进程。</p>
<h2 id="调度策略" tabindex="-1"><a class="header-anchor" href="#调度策略" aria-hidden="true">#</a> 调度策略</h2>
<p>不同的操作系统，大型的系统，比如说 Linux、Kubernetes 都有自己的调度策略。</p>
<p>对于 Go语言 来说，轻量级协程可算是终结者级别的武器，更是有深厚的调度策略值得我们去研究：</p>
<p>这些如何去调度这些协程何时去执行、如何更合理的分配操作系统资源，需要一个设计良好的调度器来支持。</p>
<p><strong>为了引出一个调度策略的话题，我们从一个简单的 go func() 开始：</strong></p>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码中，我们开启了10个协程，每个协程打印去打印i这个变量。由于这10个协程的调度时机并不固定，所以等到协程被调度执行的时候才会去取循环中变量i的值。</p>
<p>我们写的这段代码，每个我们开启的协程都是一个计算任务，这些任务会被提交给go的runtime。如果计算任务非常多，有成千上万个，那么这些任务是不可能同时被立刻执行的，所以这个计算任务一定会被先暂存起来，一般的做法是放到内存的队列中等待被执行。</p>
<p>而消费端则是一个go runtime维护的一个<strong>调度循环</strong>。调度循环简单来说，就是不断从队列中消费计算任务并执行。这里本质上就是一个生产者-消费者模型，实现了用户任务与调度器的解耦。</p>
<p><img src="http://sm.nsddd.top/sm202303011534248.png" alt="image-20230301153417002"></p>
<p>这里图中的G就代表我们的一个<strong>goroutine计算任务</strong>，M就代表<strong>操作系统线程</strong></p>
<h3 id="linux的内存使用" tabindex="-1"><a class="header-anchor" href="#linux的内存使用" aria-hidden="true">#</a> Linux的内存使用</h3>
<p><strong>Linux 进程的内存使用：</strong></p>
<p><img src="http://sm.nsddd.top/sm202303011535829.png" alt="image-20230301153554711"></p>
<blockquote>
<p>上面是高地址：栈，先进先出，栈是向下生长的，线程中就是栈内存管理</p>
<p>后面是堆，堆是向上生长的</p>
</blockquote>
<p>在早期内存管理中，如果程序太大，超过了空闲内存容量，就没有办法把全部程序装入到内存，这时怎么办？ 在许多年前，人们采用了一种叫做覆盖技术，这样一种解决方案。</p>
<p>这个方案就是 <strong>虚拟内存技术</strong>，它的基本思路： <strong>程序运行进程的总大小可以超过实际可用的物理内存的大小。每个进程都可以有自己独立的虚拟地址空间。然后通过CPU和MMU把虚拟内存地址转换为实际物理地址。</strong></p>
<p>这个就相当于在物理内存和程序之间增加了一个中间层，虚拟内存。 虚拟存储也可以看作是对内存的一种抽象。而且这种抽象带来诸多好处：</p>
<ol>
<li>它将内存看成是一个存储在磁盘上的地址空间的高速缓存，在内存中只保留了活动区域，可以根据需要在磁盘和内存间来回传送数据，高效使用内存。</li>
<li>它为每个进程提供了一致的地址空间，简化了存储的管理。</li>
<li>对进程起到保护作用，不被其他进程地址空间破坏，因为每个进程的地址空间都是相互独立。</li>
</ol>
<p><strong>Linux发展到现在支持多级页表。</strong></p>
<p><strong>我们对上面图的📜 对上面的解释：</strong></p>
<ul>
<li><code v-pre>Kernel space</code>：linux内核空间内存</li>
<li><code v-pre>Stack</code>：进程栈空间，程序运行时使用。它向下增长，系统自动管理</li>
<li><code v-pre>Memory Mapping Segment</code>：内存映射区，通过mmap系统调用，将文件映射到进程的地址空间，或者匿名映射。</li>
<li><code v-pre>Heap</code>：堆空间。这个就是程序里动态分配的空间。linux下使用malloc调用扩展（用brk/sbrk扩展内存空间），free函数释放（也就是缩减内存空间）</li>
<li><code v-pre>BSS</code>段：包含未初始化的静态变量和全局变量</li>
<li><code v-pre>Data</code>段：代码里已初始化的静态变量、全局变量</li>
<li><code v-pre>Text</code>段：代码段，进程的可执行文件</li>
</ul>
<p><strong>我们运行 Go语言 的一个二进制文件，或者编译成二进制的时候，查看:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ size sealer
   text       data     bss     dec         hex    filename
<span class="token number">70667900</span>    <span class="token number">1079425</span>   <span class="token number">413880</span>  <span class="token number">72161205</span>    44d17b5  sealer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以逐渐📜 对上面的解释：</strong></p>
<ul>
<li><code v-pre>text</code>：这是程序的代码段大小，它包含了可执行的机器指令。在这个示例中，<code v-pre>text</code> 大小为 <code v-pre>70667900</code> 字节，也就是约 <code v-pre>67.4 MB</code>。这个值通常会占用可执行文件大小的很大一部分。</li>
<li><code v-pre>data</code>：这是程序的已初始化数据大小，包括全局变量和静态变量等。在这个示例中，<code v-pre>data</code> 大小为 <code v-pre>1079425</code> 字节，也就是约 <code v-pre>1 MB</code>。</li>
<li><code v-pre>bss</code>：这是程序的未初始化数据大小，包括未初始化的全局变量和静态变量等。在这个示例中，<code v-pre>bss</code> 大小为 <code v-pre>413880</code> 字节，也就是约 <code v-pre>0.4 MB</code>。</li>
<li><code v-pre>dec</code>：这是程序的总大小，包括 <code v-pre>text</code>、<code v-pre>data</code> 和 <code v-pre>bss</code> 等。在这个示例中，<code v-pre>dec</code> 大小为 <code v-pre>72161205</code> 字节，也就是约 <code v-pre>68.8 MB</code>。</li>
<li><code v-pre>hex</code>：这是 <code v-pre>dec</code> 的十六进制表示。</li>
</ul>
<blockquote>
<p>⚠️ 注意： Go语言是不支持 静态变量的~</p>
<p><strong>所以说：Go语言是不能写入 data、bss、dec的，是通过  runtime 自带的变量。</strong></p>
</blockquote>
<h3 id="go语言对内存的访问" tabindex="-1"><a class="header-anchor" href="#go语言对内存的访问" aria-hidden="true">#</a> Go语言对内存的访问</h3>
<p><img src="http://sm.nsddd.top/sm202303011557108.png" alt="image-20230301155705966"></p>
<p><strong>我们最终的目的是了解 进程切换的开销，所以回到主题：</strong></p>
<h3 id="进程切换开销" tabindex="-1"><a class="header-anchor" href="#进程切换开销" aria-hidden="true">#</a> 进程切换开销</h3>
<p><strong>进程的切换，整个进程的虚拟地址都将会切换掉。</strong></p>
<p>进程切换是指从一个进程切换到另一个进程。在操作系统中，进程切换通常需要执行一些额外的操作，以便将控制权从当前进程转移到另一个进程。这些操作涉及到操作系统内核的一些特定的处理和资源调度，因此会带来一定的开销。</p>
<p><img src="http://sm.nsddd.top/sm202303011602381.png" alt="image-20230301160221278"></p>
<p><strong>直接开销是指直接与进程切换相关的开销，包括：</strong></p>
<ul>
<li>保存和恢复寄存器状态：进程切换时，操作系统需要保存当前进程的寄存器状态，并恢复新进程的寄存器状态。</li>
<li>更新内核数据结构：操作系统需要更新进程控制块（Process Control Block，PCB）等内核数据结构，以便管理进程的状态和资源。</li>
<li>刷新内存和硬件缓存：当一个进程被挂起时，操作系统需要将其在内存和硬件缓存中的数据刷新到磁盘或其他介质中。</li>
<li>上下文切换：操作系统需要切换到新进程的上下文，以便在正确的环境下运行新进程。</li>
</ul>
<p><strong>间接开销是指与进程切换相关的其他开销，包括：</strong></p>
<ul>
<li>内存分配和释放：进程切换可能需要分配和释放内存，这些操作需要消耗时间和资源。</li>
<li>调度决策：进程切换可能会导致操作系统重新评估进程的优先级和调度策略，这需要一些开销。</li>
<li>虚拟内存管理：进程切换可能会导致虚拟内存管理机制重新映射物理内存和虚拟内存，这需要一些开销。</li>
</ul>
<blockquote>
<p>线程我们知道，可以不需要资源的分配哈，是不是更容易切换？ 是的</p>
</blockquote>
<h3 id="线程切换开销" tabindex="-1"><a class="header-anchor" href="#线程切换开销" aria-hidden="true">#</a> 线程切换开销</h3>
<p><strong>线程从内核的角度看：线程依旧是一个进程。依然需要系统调用。</strong></p>
<ul>
<li>线程本质上只是一批共享资源的进程，线程本质上仍然需要内核进行线程切换。</li>
<li>一组线程因为共享内存资源，因此一个进程的所有线程共享虚拟地址资源，线程相比较进程：<strong>主要是节省了虚拟地址空间的切换。</strong></li>
</ul>
<h3 id="用户线程" tabindex="-1"><a class="header-anchor" href="#用户线程" aria-hidden="true">#</a> 用户线程</h3>
<p>🆗，我们也知道对吧，还有个用户线程，用户线程在用户空间创建的可执行单元，创建和销毁完全在用户态完成。</p>
<p><img src="http://sm.nsddd.top/sm202303011606492.png" alt="image-20230301160649352"></p>
<p><strong>那么 Goruntime 就是基于 GMP 模型实现用户态线程的。</strong></p>
<h3 id="goruntime" tabindex="-1"><a class="header-anchor" href="#goruntime" aria-hidden="true">#</a> Goruntime</h3>
<p><img src="http://sm.nsddd.top/sm202303011607199.png" alt="image-20230301160726026"></p>
<p>在 Go 中，<strong>线程是运行 goroutine 的实体，调度器的功能是把可运行的 goroutine 分配到工作线程上</strong>。</p>
<p><strong>Processor，它包含了运行 goroutine 的资源</strong>，如果线程想运行 goroutine，必须先获取 P，P 中还包含了可运行的 G 队列。</p>
<p><img src="http://sm.nsddd.top/sm202303011614340.png" alt="image-20230301161437159"></p>
<ol>
<li>全局队列（Global Queue）：存放等待运行的 G。</li>
<li>P 的本地队列：同全局队列类似，存放的也是等待运行的 G，存的数量有限，不超过 256 个。新建 G’时，G’优先加入到 P 的本地队列，如果队列满了，则会把本地队列中一半的 G 移动到全局队列。</li>
<li>P 列表：所有的 P 都在程序启动时创建，并保存在数组中，最多有 GOMAXPROCS(可配置) 个。</li>
<li>M：线程想运行任务就得获取 P，从 P 的本地队列获取 G，P 队列为空时，M 也会尝试从全局队列拿一批 G 放到 P 的本地队列，或从其他 P 的本地队列偷一半放到自己 P 的本地队列。M 运行 G，G 执行之后，M 会从 P 获取下一个 G，不断重复下去。</li>
</ol>
<p><strong>模型细节：</strong></p>
<p><img src="http://sm.nsddd.top/sm202303011617950.png" alt="image-20230301161757756"></p>
<h3 id="调度策略-1" tabindex="-1"><a class="header-anchor" href="#调度策略-1" aria-hidden="true">#</a> 调度策略</h3>
<h4 id="生产者" tabindex="-1"><a class="header-anchor" href="#生产者" aria-hidden="true">#</a> 生产者</h4>
<p>接上面的例子，我们生产了10个计算任务，我们一定是要在内存中先把它存起来等待调度器去消费的。那么很显然，最合适的数据结构就是队列，先来先服务。但是这样做是有问题的。现在我们都是多核多线程模型，消费者肯定不止有一个，所以如果多个消费者去消费同一个队列，会出现线程安全的问题，必须加锁。所有计算任务G都必须在M上来执行。</p>
<p><img src="http://sm.nsddd.top/sm202303011535328.png" alt="image-20230301153520194"></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/36.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/38.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
<h3 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> Links</h3>
<ul>
<li>https://learnku.com/articles/41728</li>
<li>https://juejin.cn/post/6893866059326029837</li>
</ul>
</div></template>


