<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第38节-内存管理-节选" tabindex="-1"><a class="header-anchor" href="#第38节-内存管理-节选" aria-hidden="true">#</a> 第38节 内存管理（节选）</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/37.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h2>
<h2 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h2>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<ul>
<li>[x] <a href="https://learnku.com/articles/41728" target="_blank" rel="noopener noreferrer">原文链接<ExternalLinkIcon/></a></li>
</ul>
<blockquote>
<p>本章节已收录《Golang修养之路》www.yuque.com/aceld/golang/ithv8f 第一篇第2章节。 该文章主要详细具体的介绍Goroutine调度器过程及原理，可以对Go调度器的详细调度过程有一个清晰的理解，花 费4天时间作了30+...</p>
</blockquote>
<p>本章节已收录《Golang 修养之路》<a href="https://www.yuque.com/aceld/golang/ithv8f" target="_blank" rel="noopener noreferrer">www.yuque.com/aceld/golang/ithv8f<ExternalLinkIcon/></a> 第一篇第 2 章节。</p>
<blockquote>
<p>该文章主要详细具体的介绍 Goroutine 调度器过程及原理，可以对 Go 调度器的详细调度过程有一个清晰的理解，花 费 4 天时间作了 30 + 张图 (推荐收藏)，包括如下几个章节。</p>
</blockquote>
<blockquote>
<p>本章节含视频版:<br>
<a href="https://www.bilibili.com/video/BV19r4y1w7Nx" target="_blank" rel="noopener noreferrer"><img src="https://cdn.learnku.com/uploads/images/202201/25/58489/rxrnLas6f5.png!large" alt=""><ExternalLinkIcon/></a></p>
</blockquote>
<p><code v-pre>第一章</code> Golang 调度器的由来</p>
<p><code v-pre>第二章</code> Goroutine 调度器的 GMP 模型及设计思想</p>
<p><code v-pre>第三章</code> Goroutine 调度场景过程全图文解析</p>
<h2 id="一、golang-调度器-的由来" tabindex="-1"><a class="header-anchor" href="#一、golang-调度器-的由来" aria-hidden="true">#</a> 一、Golang “调度器” 的由来？<a href="#a19960">#</a></h2>
<h3 id="_1-单进程时代不需要调度器" tabindex="-1"><a class="header-anchor" href="#_1-单进程时代不需要调度器" aria-hidden="true">#</a> (1) 单进程时代不需要调度器<a href="#e9b84b">#</a></h3>
<p>我们知道，一切的软件都是跑在操作系统上，真正用来干活 (计算) 的是 CPU。早期的操作系统每个程序就是一个进程，直到一个程序运行完，才能进行下一个进程，就是 “单进程时代”</p>
<p>一切的程序只能串行发生。<br>
<img src="https://cdn.learnku.com/uploads/images/202003/11/58489/06IoYRyruP.png!large" alt=""></p>
<p>早期的单进程操作系统，面临 2 个问题：</p>
<ol>
<li>
<p>单一的执行流程，计算机只能一个任务一个任务处理。</p>
</li>
<li>
<p>进程阻塞所带来的 CPU 时间浪费。</p>
</li>
</ol>
<p>那么能不能有多个进程来宏观一起来执行多个任务呢？</p>
<p>后来操作系统就具有了<strong>最早的并发能力：多进程并发</strong>，当一个进程阻塞的时候，切换到另外等待执行的进程，这样就能尽量把 CPU 利用起来，CPU 就不浪费了。</p>
<h3 id="_2-多进程-线程时代有了调度器需求" tabindex="-1"><a class="header-anchor" href="#_2-多进程-线程时代有了调度器需求" aria-hidden="true">#</a> (2) 多进程 / 线程时代有了调度器需求<a href="#80b97a">#</a></h3>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/sLve6TagD3.png!large" alt=""></p>
<p>在多进程 / 多线程的操作系统中，就解决了阻塞的问题，因为一个进程阻塞 cpu 可以立刻切换到其他进程中去执行，而且调度 cpu 的算法可以保证在运行的进程都可以被分配到 cpu 的运行时间片。这样从宏观来看，似乎多个进程是在同时被运行。</p>
<p>但新的问题就又出现了，进程拥有太多的资源，进程的创建、切换、销毁，都会占用很长的时间，CPU 虽然利用起来了，但如果进程过多，CPU 有很大的一部分都被用来进行进程调度了。</p>
<p><strong>怎么才能提高 CPU 的利用率呢？</strong></p>
<p>但是对于 Linux 操作系统来讲，cpu 对进程的态度和线程的态度是一样的。<br>
<img src="https://cdn.learnku.com/uploads/images/202003/11/58489/dNWd00AiEZ.png!large" alt=""></p>
<p>很明显，CPU 调度切换的是进程和线程。尽管线程看起来很美好，但实际上多线程开发设计会变得更加复杂，要考虑很多同步竞争等问题，如锁、竞争冲突等。</p>
<h3 id="_3-协程来提高-cpu-利用率" tabindex="-1"><a class="header-anchor" href="#_3-协程来提高-cpu-利用率" aria-hidden="true">#</a> (3) 协程来提高 CPU 利用率<a href="#49925f">#</a></h3>
<p>多进程、多线程已经提高了系统的并发能力，但是在当今互联网高并发场景下，为每个任务都创建一个线程是不现实的，因为会消耗大量的内存 (进程虚拟内存会占用 4GB [32 位操作系统], 而线程也要大约 4MB)。</p>
<p>大量的进程 / 线程出现了新的问题</p>
<ul>
<li>高内存占用</li>
<li>调度的高消耗 CPU</li>
</ul>
<p>好了，然后工程师们就发现，其实一个线程分为 “内核态 “线程和” 用户态 “线程。</p>
<p>一个 “用户态线程” 必须要绑定一个 “内核态线程”，但是 CPU 并不知道有 “用户态线程” 的存在，它只知道它运行的是一个 “内核态线程”(Linux 的 PCB 进程控制块)。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/TfStmYsfyF.png!large" alt=""></p>
<p>这样，我们再去细化去分类一下，内核线程依然叫 “线程 (thread)”，用户线程叫 “协程 (co-routine)”.</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/vgzlKzvOUL.png!large" alt=""></p>
<p>看到这里，我们就要开脑洞了，既然一个协程 (co-routine) 可以绑定一个线程 (thread)，那么能不能多个协程 (co-routine) 绑定一个或者多个线程 (thread) 上呢。</p>
<p>之后，我们就看到了有 3 种协程和线程的映射关系：</p>
<blockquote>
<h2 id="n-1-关系" tabindex="-1"><a class="header-anchor" href="#n-1-关系" aria-hidden="true">#</a> N:1 关系<a href="#35c656">#</a></h2>
</blockquote>
<p>N 个协程绑定 1 个线程，优点就是<strong>协程在用户态线程即完成切换，不会陷入到内核态，这种切换非常的轻量快速</strong>。但也有很大的缺点，1 个进程的所有协程都绑定在 1 个线程上</p>
<p>缺点：</p>
<ul>
<li>某个程序用不了硬件的多核加速能力</li>
<li>一旦某协程阻塞，造成线程阻塞，本进程的其他协程都无法执行了，根本就没有并发的能力了。</li>
</ul>
<p><img src="https://cdn.learnku.com/uploads/images/202003/12/58489/kfPbThcyRU.png!large" alt=""></p>
<blockquote>
<h2 id="_1-1-关系" tabindex="-1"><a class="header-anchor" href="#_1-1-关系" aria-hidden="true">#</a> 1:1 关系<a href="#47d01a">#</a></h2>
</blockquote>
<p>1 个协程绑定 1 个线程，这种最容易实现。协程的调度都由 CPU 完成了，不存在 N:1 缺点，</p>
<p>缺点：</p>
<ul>
<li>协程的创建、删除和切换的代价都由 CPU 完成，有点略显昂贵了。</li>
</ul>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/EhNQY2VCpk.png!large" alt=""></p>
<blockquote>
<h2 id="m-n-关系" tabindex="-1"><a class="header-anchor" href="#m-n-关系" aria-hidden="true">#</a> M:N 关系<a href="#5fd9e1">#</a></h2>
</blockquote>
<p>M 个协程绑定 1 个线程，是 N:1 和 1:1 类型的结合，克服了以上 2 种模型的缺点，但实现起来最为复杂。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/12/58489/ANDQLx3g9U.png!large" alt=""></p>
<p>协程跟线程是有区别的，线程由 CPU 调度是抢占式的，<strong>协程由用户态调度是协作式的</strong>，一个协程让出 CPU 后，才执行下一个协程。</p>
<h3 id="_4-go-语言的协程-goroutine" tabindex="-1"><a class="header-anchor" href="#_4-go-语言的协程-goroutine" aria-hidden="true">#</a> (4) Go 语言的协程 goroutine<a href="#65b43b">#</a></h3>
<p><strong>Go 为了提供更容易使用的并发方法，使用了 goroutine 和 channel</strong>。goroutine 来自协程的概念，让一组可复用的函数运行在一组线程之上，即使有协程阻塞，该线程的其他协程也可以被 <code v-pre>runtime</code> 调度，转移到其他可运行的线程上。最关键的是，程序员看不到这些底层的细节，这就降低了编程的难度，提供了更容易的并发。</p>
<p>Go 中，协程被称为 goroutine，它非常轻量，一个 goroutine 只占几 KB，并且这几 KB 就足够 goroutine 运行完，这就能在有限的内存空间内支持大量 goroutine，支持了更多的并发。虽然一个 goroutine 的栈只占几 KB，但实际是可伸缩的，如果需要更多内容，<code v-pre>runtime</code> 会自动为 goroutine 分配。</p>
<p>Goroutine 特点：</p>
<ul>
<li>占用内存更小（几 kb）</li>
<li>调度更灵活 (runtime 调度)</li>
</ul>
<h3 id="_5-被废弃的-goroutine-调度器" tabindex="-1"><a class="header-anchor" href="#_5-被废弃的-goroutine-调度器" aria-hidden="true">#</a> (5) 被废弃的 goroutine 调度器<a href="#7b24f7">#</a></h3>
<p>好了，既然我们知道了协程和线程的关系，那么最关键的一点就是调度协程的调度器的实现了。</p>
<p>Go 目前使用的调度器是 2012 年重新设计的，因为之前的调度器性能存在问题，所以使用 4 年就被废弃了，那么我们先来分析一下被废弃的调度器是如何运作的？</p>
<blockquote>
<p>大部分文章都是会用 G 来表示 Goroutine，用 M 来表示线程，那么我们也会用这种表达的对应关系。</p>
</blockquote>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/Af6GQ3GSlb.png!large" alt=""></p>
<p>下面我们来看看被废弃的 golang 调度器是如何实现的？</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/uWk9pzdREk.png!large" alt=""></p>
<p>M 想要执行、放回 G 都必须访问全局 G 队列，并且 M 有多个，即多线程访问同一资源需要加锁进行保证互斥 / 同步，所以全局 G 队列是有互斥锁进行保护的。</p>
<p>老调度器有几个缺点：</p>
<ol>
<li>创建、销毁、调度 G 都需要每个 M 获取锁，这就形成了<strong>激烈的锁竞争</strong>。</li>
<li>M 转移 G 会造成<strong>延迟和额外的系统负载</strong>。比如当 G 中包含创建新协程的时候，M 创建了 G’，为了继续执行 G，需要把 G’交给 M’执行，也造成了<strong>很差的局部性</strong>，因为 G’和 G 是相关的，最好放在 M 上执行，而不是其他 M’。</li>
<li>系统调用 (CPU 在 M 之间的切换) 导致频繁的线程阻塞和取消阻塞操作增加了系统开销。</li>
</ol>
<h2 id="二、goroutine-调度器的-gmp-模型的设计思想" tabindex="-1"><a class="header-anchor" href="#二、goroutine-调度器的-gmp-模型的设计思想" aria-hidden="true">#</a> 二、Goroutine 调度器的 GMP 模型的设计思想<a href="#0240a5">#</a></h2>
<p>面对之前调度器的问题，Go 设计了新的调度器。</p>
<p>在新调度器中，除了 M (thread) 和 G (goroutine)，又引进了 P (Processor)。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/zaZ4nQYcZe.png!large" alt=""></p>
<p><strong>Processor，它包含了运行 goroutine 的资源</strong>，如果线程想运行 goroutine，必须先获取 P，P 中还包含了可运行的 G 队列。</p>
<h3 id="_1-gmp-模型" tabindex="-1"><a class="header-anchor" href="#_1-gmp-模型" aria-hidden="true">#</a> (1) GMP 模型<a href="#0a5fa4">#</a></h3>
<p>在 Go 中，<strong>线程是运行 goroutine 的实体，调度器的功能是把可运行的 goroutine 分配到工作线程上</strong>。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/Ugu3C2WSpM.jpeg!large" alt=""></p>
<ol>
<li><strong>全局队列</strong>（Global Queue）：存放等待运行的 G。</li>
<li><strong>P 的本地队列</strong>：同全局队列类似，存放的也是等待运行的 G，存的数量有限，不超过 256 个。新建 G’时，G’优先加入到 P 的本地队列，如果队列满了，则会把本地队列中一半的 G 移动到全局队列。</li>
<li><strong>P 列表</strong>：所有的 P 都在程序启动时创建，并保存在数组中，最多有 <code v-pre>GOMAXPROCS</code>(可配置) 个。</li>
<li><strong>M</strong>：线程想运行任务就得获取 P，从 P 的本地队列获取 G，P 队列为空时，M 也会尝试从全局队列<strong>拿</strong>一批 G 放到 P 的本地队列，或从其他 P 的本地队列<strong>偷</strong>一半放到自己 P 的本地队列。M 运行 G，G 执行之后，M 会从 P 获取下一个 G，不断重复下去。</li>
</ol>
<p><strong>Goroutine 调度器和 OS 调度器是通过 M 结合起来的，每个 M 都代表了 1 个内核线程，OS 调度器负责把内核线程分配到 CPU 的核上执行</strong>。</p>
<blockquote>
<h2 id="有关-p-和-m-的个数问题" tabindex="-1"><a class="header-anchor" href="#有关-p-和-m-的个数问题" aria-hidden="true">#</a> 有关 P 和 M 的个数问题<a href="#cee2c4">#</a></h2>
</blockquote>
<p>1、P 的数量：</p>
<ul>
<li>由启动时环境变量 <code v-pre>$GOMAXPROCS</code> 或者是由 <code v-pre>runtime</code> 的方法 <code v-pre>GOMAXPROCS()</code> 决定。这意味着在程序执行的任意时刻都只有 <code v-pre>$GOMAXPROCS</code> 个 goroutine 在同时运行。</li>
</ul>
<p>2、M 的数量:</p>
<ul>
<li>go 语言本身的限制：go 程序启动时，会设置 M 的最大数量，默认 10000. 但是内核很难支持这么多的线程数，所以这个限制可以忽略。</li>
<li>runtime/debug 中的 SetMaxThreads 函数，设置 M 的最大数量</li>
<li>一个 M 阻塞了，会创建新的 M。</li>
</ul>
<p>M 与 P 的数量没有绝对关系，一个 M 阻塞，P 就会去创建或者切换另一个 M，所以，即使 P 的默认数量是 1，也有可能会创建很多个 M 出来。</p>
<blockquote>
<h2 id="p-和-m-何时会被创建" tabindex="-1"><a class="header-anchor" href="#p-和-m-何时会被创建" aria-hidden="true">#</a> P 和 M 何时会被创建<a href="#257bcb">#</a></h2>
</blockquote>
<p>1、P 何时创建：在确定了 P 的最大数量 n 后，运行时系统会根据这个数量创建 n 个 P。</p>
<p>2、M 何时创建：没有足够的 M 来关联 P 并运行其中的可运行的 G。比如所有的 M 此时都阻塞住了，而 P 中还有很多就绪任务，就会去寻找空闲的 M，而没有空闲的，就会去创建新的 M。</p>
<h3 id="_2-调度器的设计策略" tabindex="-1"><a class="header-anchor" href="#_2-调度器的设计策略" aria-hidden="true">#</a> (2) 调度器的设计策略<a href="#4852af">#</a></h3>
<p><strong>复用线程</strong>：避免频繁的创建、销毁线程，而是对线程的复用。</p>
<p>1）work stealing 机制</p>
<p>当本线程无可运行的 G 时，尝试从其他线程绑定的 P 偷取 G，而不是销毁线程。</p>
<p>2）hand off 机制</p>
<p>当本线程因为 G 进行系统调用阻塞时，线程释放绑定的 P，把 P 转移给其他空闲的线程执行。</p>
<p><strong>利用并行</strong>：<code v-pre>GOMAXPROCS</code> 设置 P 的数量，最多有 <code v-pre>GOMAXPROCS</code> 个线程分布在多个 CPU 上同时运行。<code v-pre>GOMAXPROCS</code> 也限制了并发的程度，比如 <code v-pre>GOMAXPROCS = 核数/2</code>，则最多利用了一半的 CPU 核进行并行。</p>
<p><strong>抢占</strong>：在 coroutine 中要等待一个协程主动让出 CPU 才执行下一个协程，在 Go 中，一个 goroutine 最多占用 CPU 10ms，防止其他 goroutine 被饿死，这就是 goroutine 不同于 coroutine 的一个地方。</p>
<p><strong>全局 G 队列</strong>：在新的调度器中依然有全局 G 队列，但功能已经被弱化了，当 M 执行 work stealing 从其他 P 偷不到 G 时，它可以从全局 G 队列获取 G。</p>
<h3 id="_3-go-func-调度流程" tabindex="-1"><a class="header-anchor" href="#_3-go-func-调度流程" aria-hidden="true">#</a> (3) go func () 调度流程<a href="#cd748d">#</a></h3>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/a4vWtvRWGQ.jpeg!large" alt="asd"></p>
<p>从上图我们可以分析出几个结论：</p>
<p>1、我们通过 go func () 来创建一个 goroutine；</p>
<p>2、有两个存储 G 的队列，一个是局部调度器 P 的本地队列、一个是全局 G 队列。新创建的 G 会先保存在 P 的本地队列中，如果 P 的本地队列已经满了就会保存在全局的队列中；</p>
<p>3、G 只能运行在 M 中，一个 M 必须持有一个 P，M 与 P 是 1：1 的关系。M 会从 P 的本地队列弹出一个可执行状态的 G 来执行，如果 P 的本地队列为空，就会向其他的 MP 组合偷取一个可执行的 G 来执行；</p>
<p>4、一个 M 调度 G 执行的过程是一个循环机制；</p>
<p>5、当 M 执行某一个 G 时候如果发生了 syscall 或则其余阻塞操作，M 会阻塞，如果当前有一些 G 在执行，runtime 会把这个线程 M 从 P 中摘除 (detach)，然后再创建一个新的操作系统的线程 (如果有空闲的线程可用就复用空闲线程) 来服务于这个 P；</p>
<p>6、当 M 系统调用结束时候，这个 G 会尝试获取一个空闲的 P 执行，并放入到这个 P 的本地队列。如果获取不到 P，那么这个线程 M 变成休眠状态， 加入到空闲线程中，然后这个 G 会被放入全局队列中。</p>
<h3 id="_4-调度器的生命周期" tabindex="-1"><a class="header-anchor" href="#_4-调度器的生命周期" aria-hidden="true">#</a> (4) 调度器的生命周期<a href="#17f58b">#</a></h3>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/j37FX8nek9.png!large" alt=""></p>
<p>特殊的 M0 和 G0</p>
<p><strong>M0</strong></p>
<p><code v-pre>M0</code> 是启动程序后的编号为 0 的主线程，这个 M 对应的实例会在全局变量 runtime.m0 中，不需要在 heap 上分配，M0 负责执行初始化操作和启动第一个 G， 在之后 M0 就和其他的 M 一样了。</p>
<p><strong>G0</strong></p>
<p><code v-pre>G0</code> 是每次启动一个 M 都会第一个创建的 goroutine，G0 仅用于负责调度的 G，G0 不指向任何可执行的函数，每个 M 都会有一个自己的 G0。在调度或系统调用时会使用 G0 的栈空间，全局变量的 G0 是 M0 的 G0。</p>
<p>我们来跟踪一段代码</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>package main

import "fmt"

func main() {
    fmt.Println("Hello world")
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们来针对上面的代码对调度器里面的结构做一个分析。</p>
<p>也会经历如上图所示的过程：</p>
<ol>
<li>runtime 创建最初的线程 m0 和 goroutine g0，并把 2 者关联。</li>
<li>调度器初始化：初始化 m0、栈、垃圾回收，以及创建和初始化由 GOMAXPROCS 个 P 构成的 P 列表。</li>
<li>示例代码中的 main 函数是 <code v-pre>main.main</code>，<code v-pre>runtime</code> 中也有 1 个 main 函数 ——<code v-pre>runtime.main</code>，代码经过编译后，<code v-pre>runtime.main</code> 会调用 <code v-pre>main.main</code>，程序启动时会为 <code v-pre>runtime.main</code> 创建 goroutine，称它为 main goroutine 吧，然后把 main goroutine 加入到 P 的本地队列。</li>
<li>启动 m0，m0 已经绑定了 P，会从 P 的本地队列获取 G，获取到 main goroutine。</li>
<li>G 拥有栈，M 根据 G 中的栈信息和调度信息设置运行环境</li>
<li>M 运行 G</li>
<li>G 退出，再次回到 M 获取可运行的 G，这样重复下去，直到 <code v-pre>main.main</code> 退出，<code v-pre>runtime.main</code> 执行 Defer 和 Panic 处理，或调用 <code v-pre>runtime.exit</code> 退出程序。</li>
</ol>
<p>调度器的生命周期几乎占满了一个 Go 程序的一生，<code v-pre>runtime.main</code> 的 goroutine 执行之前都是为调度器做准备工作，<code v-pre>runtime.main</code> 的 goroutine 运行，才是调度器的真正开始，直到 <code v-pre>runtime.main</code> 结束而结束。</p>
<h3 id="_5-可视化-gmp-编程" tabindex="-1"><a class="header-anchor" href="#_5-可视化-gmp-编程" aria-hidden="true">#</a> (5) 可视化 GMP 编程<a href="#aa8835">#</a></h3>
<p>有 2 种方式可以查看一个程序的 GMP 的数据。</p>
<p><strong>方式 1：go tool trace</strong></p>
<p>trace 记录了运行时的信息，能提供可视化的 Web 页面。</p>
<p>简单测试代码：main 函数创建 trace，trace 会运行在单独的 goroutine 中，然后 main 打印”Hello World” 退出。</p>
<blockquote>
<p>trace.go</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>package main

import (
    "os"
    "fmt"
    "runtime/trace"
)

func main() {

    //创建trace文件
    f, err := os.Create("trace.out")
    if err != nil {
        panic(err)
    }

    defer f.Close()

    //启动trace goroutine
    err = trace.Start(f)
    if err != nil {
        panic(err)
    }
    defer trace.Stop()

    //main
    fmt.Println("Hello World")
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行程序</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go run trace.go 
Hello World

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会得到一个 <code v-pre>trace.out</code> 文件，然后我们可以用一个工具打开，来分析这个文件。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go tool trace trace.out 
2020/02/23 10:44:11 Parsing trace...
2020/02/23 10:44:11 Splitting trace...
2020/02/23 10:44:11 Opening browser. Trace viewer is listening on http://127.0.0.1:33479


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过浏览器打开 <code v-pre>http://127.0.0.1:33479</code> 网址，点击 <code v-pre>view trace</code> 能够看见可视化的调度流程。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/Xr9qi3emlx.png!large" alt=""></p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/vYyO9YJmam.png!large" alt=""></p>
<p><strong>G 信息</strong></p>
<p>点击 Goroutines 那一行可视化的数据条，我们会看到一些详细的信息。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/QLm0KK1hhd.png!large" alt=""></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>  一共有两个G在程序中，一个是特殊的G0，是每个M必须有的一个初始化的G，这个我们不必讨论。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 G1 应该就是 main goroutine (执行 main 函数的协程)，在一段时间内处于可运行和运行的状态。</p>
<p><strong>M 信息</strong></p>
<p>点击 Threads 那一行可视化的数据条，我们会看到一些详细的信息。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/mYYA4V17yF.png!large" alt=""></p>
<p>一共有两个 M 在程序中，一个是特殊的 M0，用于初始化使用，这个我们不必讨论。</p>
<p><strong>P 信息</strong><br>
<img src="https://cdn.learnku.com/uploads/images/202003/11/58489/QbWwbth8uN.png!large" alt=""></p>
<p>G1 中调用了 <code v-pre>main.main</code>，创建了 <code v-pre>trace goroutine g18</code>。G1 运行在 P1 上，G18 运行在 P0 上。</p>
<p>这里有两个 P，我们知道，一个 P 必须绑定一个 M 才能调度 G。</p>
<p>我们在来看看上面的 M 信息。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/5kS6NfpQAI.png!large" alt=""></p>
<p>我们会发现，确实 G18 在 P0 上被运行的时候，确实在 Threads 行多了一个 M 的数据，点击查看如下：</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/EN1OESafVZ.png!large" alt=""></p>
<p>多了一个 M2 应该就是 P0 为了执行 G18 而动态创建的 M2.</p>
<p><strong>方式 2：Debug trace</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>package main

import (
    "fmt"
    "time"
)

func main() {
    for i := 0; i &lt; 5; i++ {
        time.Sleep(time.Second)
        fmt.Println("Hello World")
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译</p>
<p>通过 Debug 方式运行</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ GODEBUG=schedtrace=1000 ./trace2 
SCHED 0ms: gomaxprocs=2 idleprocs=0 threads=4 spinningthreads=1 idlethreads=1 runqueue=0 [0 0]
Hello World
SCHED 1003ms: gomaxprocs=2 idleprocs=2 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0]
Hello World
SCHED 2014ms: gomaxprocs=2 idleprocs=2 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0]
Hello World
SCHED 3015ms: gomaxprocs=2 idleprocs=2 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0]
Hello World
SCHED 4023ms: gomaxprocs=2 idleprocs=2 threads=4 spinningthreads=0 idlethreads=2 runqueue=0 [0 0]
Hello World


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>SCHED</code>：调试信息输出标志字符串，代表本行是 goroutine 调度器的输出；</li>
<li><code v-pre>0ms</code>：即从程序启动到输出这行日志的时间；</li>
<li><code v-pre>gomaxprocs</code>: P 的数量，本例有 2 个 P, 因为默认的 P 的属性是和 cpu 核心数量默认一致，当然也可以通过 GOMAXPROCS 来设置；</li>
<li><code v-pre>idleprocs</code>: 处于 idle 状态的 P 的数量；通过 gomaxprocs 和 idleprocs 的差值，我们就可知道执行 go 代码的 P 的数量；</li>
<li>t<code v-pre>hreads: os threads/M</code> 的数量，包含 scheduler 使用的 m 数量，加上 runtime 自用的类似 sysmon 这样的 thread 的数量；</li>
<li><code v-pre>spinningthreads</code>: 处于自旋状态的 os thread 数量；</li>
<li><code v-pre>idlethread</code>: 处于 idle 状态的 os thread 的数量；</li>
<li><code v-pre>runqueue=0</code>： Scheduler 全局队列中 G 的数量；</li>
<li><code v-pre>[0 0]</code>: 分别为 2 个 P 的 local queue 中的 G 的数量。</li>
</ul>
<p>下一篇，我们来继续详细的分析 GMP 调度原理的一些场景问题。</p>
<h2 id="三、go-调度器调度场景过程全解析" tabindex="-1"><a class="header-anchor" href="#三、go-调度器调度场景过程全解析" aria-hidden="true">#</a> 三、Go 调度器调度场景过程全解析<a href="#8c0526">#</a></h2>
<h3 id="_1-场景-1" tabindex="-1"><a class="header-anchor" href="#_1-场景-1" aria-hidden="true">#</a> (1) 场景 1<a href="#449d66">#</a></h3>
<p>P 拥有 G1，M1 获取 P 后开始运行 G1，G1 使用 <code v-pre>go func()</code> 创建了 G2，为了局部性 G2 优先加入到 P1 的本地队列。<br>
<img src="https://cdn.learnku.com/uploads/images/202003/11/58489/Pm8LOYcsWQ.png!large" alt=""></p>
<h3 id="_2-场景-2" tabindex="-1"><a class="header-anchor" href="#_2-场景-2" aria-hidden="true">#</a> (2) 场景 2<a href="#7c811f">#</a></h3>
<p>G1 运行完成后 (函数：<code v-pre>goexit</code>)，M 上运行的 goroutine 切换为 G0，G0 负责调度时协程的切换（函数：<code v-pre>schedule</code>）。从 P 的本地队列取 G2，从 G0 切换到 G2，并开始运行 G2 (函数：<code v-pre>execute</code>)。实现了线程 M1 的复用。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/12/58489/JWDtmKG3rK.png!large" alt=""></p>
<h3 id="_3-场景-3" tabindex="-1"><a class="header-anchor" href="#_3-场景-3" aria-hidden="true">#</a> (3) 场景 3<a href="#f1738e">#</a></h3>
<p>假设每个 P 的本地队列只能存 3 个 G。G2 要创建了 6 个 G，前 3 个 G（G3, G4, G5）已经加入 p1 的本地队列，p1 本地队列满了。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/12/58489/UpjRxzIBd3.png!large" alt=""></p>
<h3 id="_4-场景-4" tabindex="-1"><a class="header-anchor" href="#_4-场景-4" aria-hidden="true">#</a> (4) 场景 4<a href="#c171ee">#</a></h3>
<p>G2 在创建 G7 的时候，发现 P1 的本地队列已满，需要执行<strong>负载均衡</strong> (把 P1 中本地队列中前一半的 G，还有新创建 G <strong>转移</strong>到全局队列)</p>
<blockquote>
<p>（实现中并不一定是新的 G，如果 G 是 G2 之后就执行的，会被保存在本地队列，利用某个老的 G 替换新 G 加入全局队列）</p>
</blockquote>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/chqTgsiuWi.png!large" alt=""></p>
<p>这些 G 被转移到全局队列时，会被打乱顺序。所以 G3,G4,G7 被转移到全局队列。</p>
<h3 id="_5-场景-5" tabindex="-1"><a class="header-anchor" href="#_5-场景-5" aria-hidden="true">#</a> (5) 场景 5<a href="#c9eb2b">#</a></h3>
<p>G2 创建 G8 时，P1 的本地队列未满，所以 G8 会被加入到 P1 的本地队列。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/12/58489/nukEY92G6D.png!large" alt=""></p>
<p>G8 加入到 P1 点本地队列的原因还是因为 P1 此时在与 M1 绑定，而 G2 此时是 M1 在执行。所以 G2 创建的新的 G 会优先放置到自己的 M 绑定的 P 上。</p>
<h3 id="_6-场景-6" tabindex="-1"><a class="header-anchor" href="#_6-场景-6" aria-hidden="true">#</a> (6) 场景 6<a href="#584b9e">#</a></h3>
<p>规定：<strong>在创建 G 时，运行的 G 会尝试唤醒其他空闲的 P 和 M 组合去执行</strong>。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/11/58489/2FWNXSuHfX.png!large" alt=""></p>
<p>假定 G2 唤醒了 M2，M2 绑定了 P2，并运行 G0，但 P2 本地队列没有 G，M2 此时为自旋线程**（没有 G 但为运行状态的线程，不断寻找 G）**。</p>
<h3 id="_7-场景-7" tabindex="-1"><a class="header-anchor" href="#_7-场景-7" aria-hidden="true">#</a> (7) 场景 7<a href="#54beb7">#</a></h3>
<p>M2 尝试从全局队列 (简称 “GQ”) 取一批 G 放到 P2 的本地队列（函数：<code v-pre>findrunnable()</code>）。M2 从全局队列取的 G 数量符合下面的公式：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>n = min(len(GQ)/GOMAXPROCS + 1, len(GQ/2))

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>至少从全局队列取 1 个 g，但每次不要从全局队列移动太多的 g 到 p 本地队列，给其他 p 留点。这是<strong>从全局队列到 P 本地队列的负载均衡</strong>。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/12/58489/0fn8DGqI8N.jpeg!large" alt=""></p>
<p>假定我们场景中一共有 4 个 P（GOMAXPROCS 设置为 4，那么我们允许最多就能用 4 个 P 来供 M 使用）。所以 M2 只从能从全局队列取 1 个 G（即 G3）移动 P2 本地队列，然后完成从 G0 到 G3 的切换，运行 G3。</p>
<h3 id="_8-场景-8" tabindex="-1"><a class="header-anchor" href="#_8-场景-8" aria-hidden="true">#</a> (8) 场景 8<a href="#6bde1f">#</a></h3>
<p>假设 G2 一直在 M1 上运行，经过 2 轮后，M2 已经把 G7、G4 从全局队列获取到了 P2 的本地队列并完成运行，全局队列和 P2 的本地队列都空了，如场景 8 图的左半部分。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/12/58489/qn1NRMLqnp.png!large" alt=""></p>
<p><strong>全局队列已经没有 G，那 m 就要执行 work stealing (偷取)：从其他有 G 的 P 哪里偷取一半 G 过来，放到自己的 P 本地队列</strong>。P2 从 P1 的本地队列尾部取一半的 G，本例中一半则只有 1 个 G8，放到 P2 的本地队列并执行。</p>
<h3 id="_9-场景-9" tabindex="-1"><a class="header-anchor" href="#_9-场景-9" aria-hidden="true">#</a> (9) 场景 9<a href="#ac8b1d">#</a></h3>
<p>G1 本地队列 G5、G6 已经被其他 M 偷走并运行完成，当前 M1 和 M2 分别在运行 G2 和 G8，M3 和 M4 没有 goroutine 可以运行，M3 和 M4 处于<strong>自旋状态</strong>，它们不断寻找 goroutine。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/12/58489/1DjlseEGTT.png!large" alt=""></p>
<p>为什么要让 m3 和 m4 自旋，自旋本质是在运行，线程在运行却没有执行 G，就变成了浪费 CPU. 为什么不销毁现场，来节约 CPU 资源。因为创建和销毁 CPU 也会浪费时间，我们<strong>希望当有新 goroutine 创建时，立刻能有 M 运行它</strong>，如果销毁再新建就增加了时延，降低了效率。当然也考虑了过多的自旋线程是浪费 CPU，所以系统中最多有 <code v-pre>GOMAXPROCS</code> 个自旋的线程 (当前例子中的 <code v-pre>GOMAXPROCS</code>=4，所以一共 4 个 P)，多余的没事做线程会让他们休眠。</p>
<h3 id="_10-场景-10" tabindex="-1"><a class="header-anchor" href="#_10-场景-10" aria-hidden="true">#</a> (10) 场景 10<a href="#f27a15">#</a></h3>
<p>假定当前除了 M3 和 M4 为自旋线程，还有 M5 和 M6 为空闲的线程 (没有得到 P 的绑定，注意我们这里最多就只能够存在 4 个 P，所以 P 的数量应该永远是 M&gt;=P, 大部分都是 M 在抢占需要运行的 P)，G8 创建了 G9，G8 进行了<strong>阻塞的系统调用</strong>，M2 和 P2 立即解绑，P2 会执行以下判断：如果 P2 本地队列有 G、全局队列有 G 或有空闲的 M，P2 都会立马唤醒 1 个 M 和它绑定，否则 P2 则会加入到空闲 P 列表，等待 M 来获取可用的 p。本场景中，P2 本地队列有 G9，可以和其他空闲的线程 M5 绑定。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202003/12/58489/k3HKE9U21M.png!large" alt=""></p>
<h3 id="_11-场景-11" tabindex="-1"><a class="header-anchor" href="#_11-场景-11" aria-hidden="true">#</a> (11) 场景 11<a href="#89d394">#</a></h3>
<p>G8 创建了 G9，假如 G8 进行了<strong>非阻塞系统调用</strong>。<br>
<img src="https://cdn.learnku.com/uploads/images/202003/12/58489/zBvpl8ENSb.png!large" alt=""></p>
<p>M2 和 P2 会解绑，但 M2 会记住 P2，然后 G8 和 M2 进入<strong>系统调用</strong>状态。当 G8 和 M2 退出系统调用时，会尝试获取 P2，如果无法获取，则获取空闲的 P，如果依然没有，G8 会被记为可运行状态，并加入到全局队列，M2 因为没有 P 的绑定而变成休眠状态 (长时间休眠等待 GC 回收销毁)。</p>
<h2 id="四、小结" tabindex="-1"><a class="header-anchor" href="#四、小结" aria-hidden="true">#</a> 四、小结<a href="#7da648">#</a></h2>
<p>总结，Go 调度器很轻量也很简单，足以撑起 goroutine 的调度工作，并且让 Go 具有了原生（强大）并发的能力。<strong>Go 调度本质是把大量的 goroutine 分配到少量线程上去执行，并利用多核并行，实现更强大的并发。</strong></p>
<h2 id="关于作者" tabindex="-1"><a class="header-anchor" href="#关于作者" aria-hidden="true">#</a> 关于作者：</h2>
<p>作者：<code v-pre>Aceld(刘丹冰)</code></p>
<p>mail: <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=danbing.at@gmail.com" target="_blank" rel="noopener noreferrer">danbing.at@gmail.com<ExternalLinkIcon/></a><br>
github: <a href="https://github.com/aceld" target="_blank" rel="noopener noreferrer">github.com/aceld<ExternalLinkIcon/></a><br>
原创书籍 gitbook: <a href="http://legacy.gitbook.com/@aceld" target="_blank" rel="noopener noreferrer">legacy.gitbook.com/@aceld<ExternalLinkIcon/></a></p>
<blockquote>
<p>本作品采用<a href="https://learnku.com/docs/guide/cc4.0/6589" target="_blank" rel="noopener noreferrer">《CC 协议》<ExternalLinkIcon/></a>，转载必须注明作者和本文链接</p>
</blockquote>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/37.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/39.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


