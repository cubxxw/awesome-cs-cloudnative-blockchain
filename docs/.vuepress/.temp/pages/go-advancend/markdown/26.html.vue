<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第26节-go语言进阶与依赖管理" tabindex="-1"><a class="header-anchor" href="#第26节-go语言进阶与依赖管理" aria-hidden="true">#</a> 第26节 Go语言进阶与依赖管理</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/25.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="语言进阶" tabindex="-1"><a class="header-anchor" href="#语言进阶" aria-hidden="true">#</a> 语言进阶</h2>
<h3 id="通信共享内存" tabindex="-1"><a class="header-anchor" href="#通信共享内存" aria-hidden="true">#</a> 通信共享内存</h3>
<p><strong>通信共享内存（Communicating Sequential Processes, CSP）是一种并发编程模型，它将并发程序视为若干独立的进程，这些进程之间通过通信来协调工作。</strong></p>
<p>其中一种常用的通信方式是共享内存，即多个进程共用一块内存区域，并通过读写操作来实现通信。这种方式的优点是通信速度快，因为数据不需要经过网络传输，但缺点是需要额外的同步机制来保证数据的一致性。</p>
<p>通信共享内存是一种比较流行的并发编程模型，并且在一些多处理器系统中得到了广泛应用。</p>
<p><img src="http://sm.nsddd.top/sm202301151043893.png" alt="image-20230115104310586"></p>
<h3 id="缓冲通道" tabindex="-1"><a class="header-anchor" href="#缓冲通道" aria-hidden="true">#</a> 缓冲通道</h3>
<p>在 Go 语言中，通道是用于在 goroutines 之间传递数据的类型。通道可以是无缓冲的或有缓冲的。</p>
<ol>
<li>无缓冲通道：在没有接收方接收之前，发送方会被阻塞。这意味着如果发送方试图发送数据，而接收方并没有准备好接收，那么发送方将会一直等待。</li>
<li>有缓冲通道：具有固定大小的缓冲区。在接收方没有准备好接收之前，发送方可以继续发送数据，直到缓冲区满为止。这意味着发送方不会被阻塞，直到缓冲区满。</li>
</ol>
<p>使用无缓冲通道时，消息传递会更加同步，因为发送方和接收方必须同时准备好。</p>
<p>而使用有缓冲通道时，消息传递会更加异步，因为发送方和接收方不必同时准备好。</p>
<p><img src="http://sm.nsddd.top/sm202301151046692.png" alt="image-20230115104638471"></p>
<p><strong>💡简单的一个案例如下：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301151057598.png" alt="image-20230115105753367"></p>
<p><strong>📜 对上面的解释：</strong></p>
<p>我们在前面解释过了，有缓冲的适合异步，无缓冲的适合同步，我们代入生产者和消费者的角色。</p>
<p>通过 <code v-pre>src channel</code> 实现 A 协程和 B 协程的通信。</p>
<p>生产者同步的去生产，消费者异步的去取出数据，这样可以通过通信实现共享内存。</p>
<p>同样的看输出的顺序性，这个程序是 <strong>并发安全</strong> 的</p>
<blockquote>
<p>[[并发安全]] ：并发安全是指在多个线程或进程并发执行时，程序的正确性不会受到影响。并发安全的程序可以在多个线程或进程中并发执行，而不会出现数据不一致的问题。</p>
<p>并发安全的程序通常需要使用一些机制来确保在多个线程或进程并发执行时不会出现竞争条件。这些机制包括互斥锁、读写锁、信号量等。</p>
</blockquote>
<h3 id="共享内存通信" tabindex="-1"><a class="header-anchor" href="#共享内存通信" aria-hidden="true">#</a> 共享内存通信</h3>
<p>共享内存通信是指多个进程之间通过共享同一块物理内存来进行通信的方式。在这种方式中，多个进程可以同时读写共享内存中的数据，从而实现进程间的通信。</p>
<p>共享内存通信的优点在于通信速度快，因为数据不需要经过网络传输。<strong>但是，由于多个进程可以同时对共享内存进行操作，因此需要额外的同步机制来保证数据的一致性，以避免数据竞争等问题。</strong></p>
<p>共享内存通信是一种常用的进程间通信方式，在多处理器系统中得到了广泛应用。</p>
<p><strong>这样的我们采用 加锁和解锁 来解决：</strong></p>
<p>使用全局变量和互斥锁实现共享内存通信：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> data <span class="token builtin">int</span>
<span class="token keyword">var</span> lock sync<span class="token punctuation">.</span>Mutex

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//加锁</span>
        data <span class="token operator">+=</span> <span class="token number">1</span>
        lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">//解锁</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<blockquote>
<p>对临界区权限控制保证并发安全。</p>
</blockquote>
<p>使用 Channel 实现共享内存通信:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ch <span class="token operator">&lt;-</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 sync.Map 实现共享内存通信:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> data sync<span class="token punctuation">.</span>Map
    data<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    value<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> data<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这三种方法都可以实现共享内存通信</p>
<h3 id="go语言使用waitgroup-实现同步" tabindex="-1"><a class="header-anchor" href="#go语言使用waitgroup-实现同步" aria-hidden="true">#</a> Go语言使用waitGroup 实现同步</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">worker</span><span class="token punctuation">(</span>id <span class="token builtin">int</span><span class="token punctuation">,</span> wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Worker %d starting\n"</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span>

    <span class="token comment">// Do some work here</span>

    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Worker %d done\n"</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span>

    <span class="token comment">// Notify the WaitGroup that this worker is done</span>
    wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token comment">// Increment the WaitGroup counter</span>
        wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token comment">// Create a new goroutine for each worker</span>
        <span class="token keyword">go</span> <span class="token function">worker</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token operator">&amp;</span>wg<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Wait for all the workers to finish</span>
    wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"All workers done"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<ul>
<li>在上面的代码中，我们在 <code v-pre>main</code> 函数中定义了一个 <code v-pre>sync.WaitGroup</code> 类型的变量 <code v-pre>wg</code>。</li>
<li>我们在循环中创建了五个工作 goroutine，并且在每次循环中调用 <code v-pre>wg.Add(1)</code> 来增加 WaitGroup 计数器。</li>
<li>每个 worker goroutine 在完成工作后，会调用 <code v-pre>wg.Done()</code> 来减少 WaitGroup 计数器。</li>
<li>在 <code v-pre>main</code> 函数的最后，我们调用 <code v-pre>wg.Wait()</code> 来等待所有 worker goroutine 完成工作。</li>
<li>当 WaitGroup 计数器归零时， <code v-pre>wg.Wait()</code> 函数才会返回，这样我们就可以确保所有 worker goroutine 都完成工作之后再继续执行后面的代码。</li>
</ul>
<p>简单来说，waitGroup 是一种用来等待一组 goroutine 结束的工具。每个goroutine完成时会调用Done函数，在main函数中调用wait函数等待所有goroutine结束。</p>
<h2 id="依赖管理" tabindex="-1"><a class="header-anchor" href="#依赖管理" aria-hidden="true">#</a> 依赖管理</h2>
<p>Go语言提供了一种简单而高效的依赖管理方式，叫做&quot;go mod&quot;。它是Go语言1.11版本中引入的，可以解决项目依赖管理和版本控制问题。</p>
<p>使用&quot;go mod&quot;来管理依赖非常简单，只需要在命令行中输入&quot;go mod init&quot;来初始化项目，然后在代码中import需要的包，&quot;go mod&quot;会自动下载并管理这些依赖。</p>
<p>在项目中可以使用&quot;go.mod&quot;文件和&quot;go.sum&quot;文件来管理项目的依赖关系和版本信息，这使得团队协作和部署变得更加方便。</p>
<blockquote>
<p>在了解 Kubernetes 的源码的时候，观察到一个 vendor 目录，这个目录对我们来说很重要！</p>
</blockquote>
<h3 id="go-vendor" tabindex="-1"><a class="header-anchor" href="#go-vendor" aria-hidden="true">#</a> Go Vendor</h3>
<p><strong>方法：</strong></p>
<p>项目目录下添加 vendor 文件，所有依赖包副本形式放在 $ProjectRoot/vendor</p>
<p><strong>依赖寻址方式：vendor –&gt;  GOPATH</strong></p>
<p>[[vendor]]⭕ :</p>
<p><strong>目录结构：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># cd vendor/;ls</span>
bitbucket.org     go.etcd.io         go.opencensus.io     go.starlark.net  modules.txt
cloud.google.com  golang.org         go.opentelemetry.io  go.uber.org      OWNERS
github.com        google.golang.org  gopkg.in             k8s.io           sigs.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go Vendor是Go语言中一种依赖管理方式，它提供了一种将项目依赖的第三方库打包到项目中的方式。它通过在项目目录下创建一个&quot;vendor&quot;目录来管理依赖，将第三方库拷贝到该目录中。</p>
<p>在使用Go Vendor时，需要使用工具（如&quot;govendor&quot;）来管理依赖，包括添加、更新和删除依赖。这种方式的优点是可以更好地控制项目依赖的版本，并且不会因为网络问题或者其他原因导致依赖下载失败。</p>
<p>Kubernetes中的vendor是指将第三方库依赖打包进Kubernetes项目中，这样就不需要在运行Kubernetes时再去下载依赖。这样做的好处是可以确保项目在不同环境中的稳定性和可靠性，并且可以更好地控制项目依赖的版本。</p>
<h2 id="go-mod" tabindex="-1"><a class="header-anchor" href="#go-mod" aria-hidden="true">#</a> go mod</h2>
<p><strong>命令：</strong></p>
<ul>
<li><strong><code v-pre>go mod download</code>: 下载项目所有依赖。</strong></li>
<li><code v-pre>go mod edit</code>: 打开编辑器来编辑 go.mod 文件。</li>
<li><code v-pre>go mod graph</code>: 打印项目依赖图。</li>
<li><strong><code v-pre>go mod init</code>: 初始化一个新的 go.mod 文件，并在其中添加当前模块。</strong></li>
<li><strong><code v-pre>go mod tidy</code>: 删除无用的依赖。</strong></li>
<li><code v-pre>go mod vendor</code>: 将项目依赖复制到 vendor 目录中。</li>
<li><code v-pre>go mod verify</code>: 检查依赖的签名。</li>
<li><code v-pre>go mod why</code>: 显示为什么需要依赖。</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202301151210538.png" alt="image-20230115121030371"></p>
<h3 id="依赖分发" tabindex="-1"><a class="header-anchor" href="#依赖分发" aria-hidden="true">#</a> 依赖分发</h3>
<p>在 Go 语言中，依赖的分发通常通过包管理器进行。Go 语言支持多种包管理工具，如 go mod、govendor、glide 等，它们都可以用来管理项目依赖。</p>
<ul>
<li>go mod是 Go 官方推荐的依赖管理工具，它采用了模块化管理方式，可以很好地解决依赖版本冲突和网络问题。</li>
<li>govendor是一个第三方包管理工具，它支持将依赖打包到项目中，可以确保项目在不同环境中的稳定性和可靠性。</li>
<li>glide是一个基于 glide.yaml 的 Go 包管理工具，支持多种版本管理策略。</li>
</ul>
<p>除了这些包管理工具之外，还可以通过其他方式来管理和分发 Go 语言的依赖。比如将项目打包成二进制文件，或者将项目发布到代码仓库，其他人可以通过 git clone 来获取项目代码和依赖。</p>
<p><img src="http://sm.nsddd.top/sm202301151204471.png" alt="image-20230115120436202"></p>
<p>Go proxy是Go语言中用来设置代理服务器的一种方式。当使用Go语言进行网络请求时，如果网络环境需要使用代理服务器，可以使用Go proxy来设置代理。</p>
<p><img src="http://sm.nsddd.top/sm202301151209722.png" alt="image-20230115120907556"></p>
<h2 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h2>
<p>学习Go语言的测试是很有用的。 Go语言提供了自带的测试框架，可以很容易地编写单元测试和性能测试。</p>
<p>在Go语言中，测试文件的命名应该以 _test.go 为后缀。 测试函数的命名应该以 Test 开头。</p>
<p><img src="http://sm.nsddd.top/sm202301151215148.png" alt="image-20230115121537963"></p>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"testing"</span>

<span class="token keyword">func</span> <span class="token function">TestAdd</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">:=</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
    expected <span class="token operator">:=</span> <span class="token number">3</span>
    <span class="token keyword">if</span> result <span class="token operator">!=</span> expected <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"add(1, 2) = %d; expected %d"</span><span class="token punctuation">,</span> result<span class="token punctuation">,</span> expected<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试覆盖率" tabindex="-1"><a class="header-anchor" href="#测试覆盖率" aria-hidden="true">#</a> 测试覆盖率</h3>
<p>单元测试覆盖率是一种测量代码中有多少行/函数/分支被测试过的指标。它可以帮助你确定你的代码中是否有未被测试过的部分。</p>
<p>Go语言有一个内置的命令 <code v-pre>go test -cover</code> 可以帮助你计算代码的测试覆盖率。 例如，你可以运行 <code v-pre>go test -cover</code> 来计算<code v-pre>main_test.go</code>文件中的测试覆盖率。</p>
<p>你也可以使用第三方工具来查看更详细的报告，例如 go-carpet, gocov, 和 goveralls。</p>
<p>⚠️ 覆盖率并不能代表代码质量，高覆盖率也并不能保证你的代码是正确的。测试覆盖率只是一个参考指标，可以帮助你发现未被测试的代码。</p>
<p>需要结合测试设计原则，和业务场景来决定测试覆盖率的阈值。</p>
<p><strong>覆盖率–tips：</strong></p>
<ul>
<li>一般覆盖率 50% ~ 60%，较高覆盖率 80% +</li>
<li>测试分支相互独立、全面覆盖</li>
<li>测试单元粒度足够小、函数单一职责</li>
</ul>
<h3 id="测试依赖" tabindex="-1"><a class="header-anchor" href="#测试依赖" aria-hidden="true">#</a> 测试依赖</h3>
<p>测试依赖是指在执行测试之前需要先创建或配置的对象或资源。 例如，如果你的测试需要连接到数据库，那么连接数据库就是一个测试依赖（还有Cache、file…)。</p>
<p>在 Go 语言中，您可以使用一些技巧来管理测试依赖，例如：</p>
<ul>
<li>使用 setup 函数来创建和配置测试依赖。</li>
<li>使用 defer 语句来在测试结束后清理测试依赖。</li>
<li>使用 mock 库来替换真实依赖。</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202301151239560.png" alt="image-20230115123906424"></p>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"io/ioutil"</span>
    <span class="token string">"os"</span>
    <span class="token string">"testing"</span>
<span class="token punctuation">)</span>

<span class="token comment">// TestReadFile 是一个读取文件的测试函数</span>
<span class="token keyword">func</span> <span class="token function">TestReadFile</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 测试依赖：创建一个临时文件，并写入内容</span>
    file<span class="token punctuation">,</span> err <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">TempFile</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"test"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Failed to create temp file: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> os<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 清理测试依赖</span>
    <span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> file<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Failed to write to temp file: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 测试案例：调用 readFile 函数读取文件内容</span>
    content<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">readFile</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Failed to read file: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> content <span class="token operator">!=</span> <span class="token string">"Hello World!"</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Unexpected content: %s"</span><span class="token punctuation">,</span> content<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mock打桩" tabindex="-1"><a class="header-anchor" href="#mock打桩" aria-hidden="true">#</a> Mock打桩</h3>
<ul>
<li><a href="https://github.com/golang/mock" target="_blank" rel="noopener noreferrer">Golang mock <ExternalLinkIcon/></a></li>
</ul>
<p>Mock 函数打桩是一种将真实依赖替换为模拟实现的技术。它可以帮助你在测试中更好地控制依赖，从而使测试更加稳定和可靠。</p>
<ul>
<li>为函数打桩</li>
<li>为方法打桩</li>
</ul>
<p>在 Go 语言中，你可以使用第三方库来帮助你编写 mock 函数，例如 mockgen 和 testify/mock 。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"testing"</span>

    <span class="token string">"github.com/stretchr/testify/mock"</span>
<span class="token punctuation">)</span>

<span class="token comment">// MyDependency 是一个接口，定义了需要 mock 的函数</span>
<span class="token keyword">type</span> MyDependency <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">DoSomething</span><span class="token punctuation">(</span>input <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>output <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// MyDependencyFunc 是一个函数，实现了 MyDependency 接口</span>
<span class="token keyword">func</span> <span class="token function">MyDependencyFunc</span><span class="token punctuation">(</span>input <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>output <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 真实的实现</span>
    <span class="token keyword">return</span> <span class="token string">"real output"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestMyFunc</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建 mock 实现</span>
    mockDependency <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>MyDependencyMock<span class="token punctuation">)</span>
    mockDependency<span class="token punctuation">.</span><span class="token function">On</span><span class="token punctuation">(</span><span class="token string">"DoSomething"</span><span class="token punctuation">,</span> <span class="token string">"input"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Return</span><span class="token punctuation">(</span><span class="token string">"mock output"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
    <span class="token comment">// 将 mock 实现传入需要测试的函数</span>
    output<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">myFunc</span><span class="token punctuation">(</span>mockDependency<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Unexpected error: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> output <span class="token operator">!=</span> <span class="token string">"mock output"</span> <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Unexpected output: %s"</span><span class="token punctuation">,</span> output<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基准测试" tabindex="-1"><a class="header-anchor" href="#基准测试" aria-hidden="true">#</a> 基准测试</h3>
<p>基准测试(benchmark test)是一种测量代码性能的测试方法。它可以帮助你了解代码在不同输入条件下的性能表现。</p>
<p>Go语言有一个内置的命令<code v-pre>go test -bench</code>，可以帮助你编写和运行基准测试。</p>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"testing"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">BenchmarkAdd</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> b<span class="token punctuation">.</span>N<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<ul>
<li>BenchmarkAdd是一个基准测试函数,它测试了一个名为 add 的函数。</li>
<li>b.N 表示基准测试要运行的次数。</li>
<li>add(i, i) 函数调用了需要测试的函数，它是测试案例。</li>
</ul>
<p>运行基准测试可以使用命令 <code v-pre>go test -bench=.</code> 其中 <code v-pre>.</code> 代表当前目录下所有的基准测试。</p>
<p>基准测试的结果会显示每次运行的时间，这样你就可以比较不同实现之间的性能差异。</p>
<p><strong>并行基准测试：</strong></p>
<p>并行基准测试是指同时运行多个基准测试来提高测试效率。在 Go 语言中，可以使用 <code v-pre>testing.B.RunParallel</code> 函数来实现并行基准测试。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"testing"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">BenchmarkAdd</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    b<span class="token punctuation">.</span><span class="token function">RunParallel</span><span class="token punctuation">(</span>
        <span class="token keyword">func</span><span class="token punctuation">(</span>pb <span class="token operator">*</span>testing<span class="token punctuation">.</span>PB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> pb<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>b.RunParallel</code> 函数会并行运行多个基准测试。</li>
<li><code v-pre>pb.Next()</code> 表示运行下一次基准测试。</li>
<li><code v-pre>add(1, 2)</code> 函数调用了需要测试的函数，它是测试案例。</li>
</ul>
<p>请注意，在并行基准测试中，整体运行次数是由 <code v-pre>testing.B.N</code> 来控制的，而不是单个 goroutine。因此，并行基准测试可能需要更多的内存和 CPU 资源，因此在实际使用中需要根据需求权衡是否使用并行基准测试。</p>
<p>另外,在并行基准测试中，如果你的函数有共享的变量和状态，需要注意使用互斥锁或其他同步机制来保证线程安全。</p>
<h2 id="项目实践" tabindex="-1"><a class="header-anchor" href="#项目实践" aria-hidden="true">#</a> 项目实践</h2>
<ul>
<li><a href="http://sm.nsddd.top/sm202301151511679.png" target="_blank" rel="noopener noreferrer">项目地址<ExternalLinkIcon/></a></li>
</ul>
<h3 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h3>
<ul>
<li><a href="https://forum.juejin.cn/youthcamp/post/7081211487762513928?from=1" target="_blank" rel="noopener noreferrer">页面<ExternalLinkIcon/></a></li>
</ul>
<p><strong>需求</strong></p>
<ol>
<li>实现一个展示话题（标题，文字描述）和回帖列表的后端http接口；</li>
<li>本地文件存储数据</li>
</ol>
<p><strong>组件及技术点</strong></p>
<ul>
<li>web框架：Gin - <a href="https://github.com/gin-gonic/gin#quick-start" target="_blank" rel="noopener noreferrer">github.com/gin-gonic/g…<ExternalLinkIcon/></a>
<ul>
<li>了解go web框架的简单使用</li>
</ul>
</li>
<li>分层结构设计：<a href="https://github.com/bxcodec/go-clean-arch" target="_blank" rel="noopener noreferrer">github.com/bxcodec/go-…<ExternalLinkIcon/></a>
<ul>
<li>了解分层设计的概念</li>
</ul>
</li>
<li>文件操作：读文件<a href="https://pkg.go.dev/io" target="_blank" rel="noopener noreferrer">pkg.go.dev/io<ExternalLinkIcon/></a></li>
<li>数据查询：索引<a href="www.baike.com/wikiid/5527%E2%80%A6">www.baike.com/wikiid/5527…</a></li>
</ul>
<p><img src="http://sm.nsddd.top/sm202301151423555.png" alt="image-20230115142324412"></p>
<h3 id="分层结构" tabindex="-1"><a class="header-anchor" href="#分层结构" aria-hidden="true">#</a> 分层结构</h3>
<p>Go语言项目的分层结构通常包括三个部分：模型层、服务层和控制器层。</p>
<ol>
<li>模型层 (Model layer)： 负责存储和维护数据。这一层通常与数据库相关，负责定义数据结构和数据库操作。</li>
<li>服务层 (Service layer)： 负责处理业务逻辑。这一层通常与模型层和其他服务层相关，负责实现业务逻辑并调用模型层和其他服务层的函数。</li>
<li>控制器层 (Controller layer)： 负责处理 Web 请求和响应。这一层通常与服务层相关，负责解析 Web 请求并调用服务层的函数来响应请求。这一层通常使用路由和控制器函数来处理请求和响应。</li>
</ol>
<blockquote>
<p>以上三层之间应该保持松耦合关系，避免相互依赖。这样可以使得代码更易于维护和测试。</p>
<p>另外,还有一个会用到的是数据传输层（DTO）,用来在不同层之间传递数据,以避免相互依赖。</p>
<p>最后,关于项目文件结构，可以按照不同层放置在不同的文件夹中,这样可以更容易地维护和组织代码.</p>
</blockquote>
<p><img src="http://sm.nsddd.top/sm202301151501920.png" alt="image-20230115150104748"></p>
<p><strong>组件工具</strong></p>
<ul>
<li><a href="https://github.com/gin-gonic/gin#quick-start" target="_blank" rel="noopener noreferrer">github.com/gin-gonic/g…<ExternalLinkIcon/></a></li>
</ul>
<p><strong>目录结构：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ tree.com
卷 Data 的文件夹 <span class="token environment constant">PATH</span> 列表
卷序列号为 3EA4-3AC8
D:.
├─attention
├─concurrence
├─handler
├─repository  <span class="token comment"># 数据层</span>
├─service	<span class="token comment"># 逻辑层</span>
└─util


$ <span class="token function">ls</span> <span class="token parameter variable">-al</span>
total <span class="token number">154</span>
drwxr-xr-x <span class="token number">1</span> smile <span class="token number">197121</span>     <span class="token number">0</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">1</span> smile <span class="token number">197121</span>     <span class="token number">0</span> Jan <span class="token number">15</span> <span class="token number">15</span>:15 <span class="token punctuation">..</span>
drwxr-xr-x <span class="token number">1</span> smile <span class="token number">197121</span>     <span class="token number">0</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 .git
-rw-r--r-- <span class="token number">1</span> smile <span class="token number">197121</span>   <span class="token number">289</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 .gitignore
-rw-r--r-- <span class="token number">1</span> smile <span class="token number">197121</span> <span class="token number">11558</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 LICENSE
-rw-r--r-- <span class="token number">1</span> smile <span class="token number">197121</span>    <span class="token number">20</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 README.md
drwxr-xr-x <span class="token number">1</span> smile <span class="token number">197121</span>     <span class="token number">0</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 attention
-rw-r--r-- <span class="token number">1</span> smile <span class="token number">197121</span> <span class="token number">49210</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 avatar.jpg
drwxr-xr-x <span class="token number">1</span> smile <span class="token number">197121</span>     <span class="token number">0</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 concurrence
-rw-r--r-- <span class="token number">1</span> smile <span class="token number">197121</span>  <span class="token number">2464</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 example.sql
-rw-r--r-- <span class="token number">1</span> smile <span class="token number">197121</span>  <span class="token number">1435</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 go.mod
-rw-r--r-- <span class="token number">1</span> smile <span class="token number">197121</span> <span class="token number">13570</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 go.sum
drwxr-xr-x <span class="token number">1</span> smile <span class="token number">197121</span>     <span class="token number">0</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 handler
drwxr-xr-x <span class="token number">1</span> smile <span class="token number">197121</span>     <span class="token number">0</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 repository
drwxr-xr-x <span class="token number">1</span> smile <span class="token number">197121</span>     <span class="token number">0</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 <span class="token function">service</span>
-rw-r--r-- <span class="token number">1</span> smile <span class="token number">197121</span>  <span class="token number">1075</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 sever.go
drwxr-xr-x <span class="token number">1</span> smile <span class="token number">197121</span>     <span class="token number">0</span> Jan <span class="token number">15</span> <span class="token number">15</span>:16 util
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="数据层" tabindex="-1"><a class="header-anchor" href="#数据层" aria-hidden="true">#</a> 数据层</h4>
<p><strong>主要包括 Topic、Post、user</strong></p>
<p><img src="http://sm.nsddd.top/sm202301151509833.png" alt="image-20230115150921578"></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Post <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id         <span class="token builtin">int64</span>     <span class="token string">`gorm:"column:id"`</span>
	ParentId   <span class="token builtin">int64</span>     <span class="token string">`gorm:"parent_id"`</span>
	UserId     <span class="token builtin">int64</span>     <span class="token string">`gorm:"column:user_id"`</span>
	Content    <span class="token builtin">string</span>    <span class="token string">`gorm:"column:content"`</span>
	DiggCount  <span class="token builtin">int32</span>     <span class="token string">`gorm:"column:digg_count"`</span>
	CreateTime time<span class="token punctuation">.</span>Time <span class="token string">`gorm:"column:create_time"`</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> Topic <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id         <span class="token builtin">int64</span>     <span class="token string">`gorm:"column:id"`</span>
	UserId     <span class="token builtin">int64</span>     <span class="token string">`gorm:"column:user_id"`</span>
	Title      <span class="token builtin">string</span>    <span class="token string">`gorm:"column:title"`</span>
	Content    <span class="token builtin">string</span>    <span class="token string">`gorm:"column:content"`</span>
	CreateTime time<span class="token punctuation">.</span>Time <span class="token string">`gorm:"column:create_time"`</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id         <span class="token builtin">int64</span>     <span class="token string">`gorm:"column:id"`</span>
	Name       <span class="token builtin">string</span>    <span class="token string">`gorm:"column:name"`</span>
	Avatar     <span class="token builtin">string</span>    <span class="token string">`gorm:"column:avatar"`</span>
	Level      <span class="token builtin">int</span>       <span class="token string">`gorm:"column:level"`</span>
	CreateTime time<span class="token punctuation">.</span>Time <span class="token string">`gorm:"column:create_time"`</span>
	ModifyTime time<span class="token punctuation">.</span>Time <span class="token string">`gorm:"column:modify_time"`</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如何实现查询操作？可以通过全扫描对应，MySQL全表扫描，这样能实现，但是并不高效。</strong></p>
<p>⭕ <strong>或许我们可以用索引，我们通过目录定位结果。</strong></p>
<p>Map 时间复杂度是 O1</p>
<p><img src="http://sm.nsddd.top/sm202301151509659.png" alt="image-20230115150928396"></p>
<p><strong>实例：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301151509726.png" alt="image-20230115150938547"></p>
<p><img src="http://sm.nsddd.top/sm202301151509112.png" alt="image-20230115150956917"></p>
<p><strong>有了这两个函数,我们就可以上传到逻辑层,对其进行封装.</strong></p>
<h4 id="逻辑层" tabindex="-1"><a class="header-anchor" href="#逻辑层" aria-hidden="true">#</a> 逻辑层</h4>
<p>对传入的进行校验,然后组装实体</p>
<p><img src="http://sm.nsddd.top/sm202301151510759.png" alt="image-20230115151045530"></p>
<p><img src="http://sm.nsddd.top/sm202301151510012.png" alt="image-20230115151054819"></p>
<p><img src="http://sm.nsddd.top/sm202301151511382.png" alt="image-20230115151104214"></p>
<h4 id="视图层" tabindex="-1"><a class="header-anchor" href="#视图层" aria-hidden="true">#</a> 视图层</h4>
<p><strong>控制层：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301151511081.png" alt="image-20230115151110888"></p>
<p><strong>通过 gin 搭建web框架：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301151511006.png" alt="image-20230115151121826"></p>
<p><img src="http://sm.nsddd.top/sm202301151511679.png" alt="image-20230115151143752"></p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>对于学习Go语言来说，一定要学习它的设计思维和编程思维，而不是带入别的语言来批判新的语言，这样你总归无路可循。</p>
<p>在掌握Go基础之后，可以 <strong>通过“三刷”的方式掌握SQL、Redis、Linux、Nginx的基础知识点</strong>，这样就有能力开发Web项目了。</p>
<p>要进阶就要学 “<strong>微服务</strong>” 和 “<strong>DDD</strong>”！</p>
<p>软件的架构模式总的说经历了三个阶段的演进：<strong>从单机、集中式到分布式微服务架构</strong>。</p>
<p>分布式微服务架构是主流趋势，越来越多的企业采用分布式微服务架构进行业务转型。</p>
<p><strong>那么如何才能更好的从单体架构和集中式架构转型到分布式微服务架构呢？答案就是：DDD。</strong> 这也是我们的进阶之道。</p>
<blockquote>
<p>DDD (Domain Driven Design)：领域驱动设计。</p>
</blockquote>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/25.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/27.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


