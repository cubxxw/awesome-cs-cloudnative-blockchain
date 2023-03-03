<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第40节-一站式golang内存洗髓经-节选" tabindex="-1"><a class="header-anchor" href="#第40节-一站式golang内存洗髓经-节选" aria-hidden="true">#</a> 第40节 一站式Golang内存洗髓经(节选)</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/39.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<blockquote>
<p>本篇文章已收录于《Golang 修养之路》<a href="https://www.yuque.com/aceld/golang/ithv8f" target="_blank" rel="noopener noreferrer">www.yuque.com/aceld/golang/ithv8f<ExternalLinkIcon/></a> 第一章第 9 篇</p>
</blockquote>
<p>Golang 的内存管理及设计也是开发者需要了解的领域之一，要理解 Go 语言的内存管理，就必须先理解操作系统以及机器硬件是如何管理内存的。因为 Go 语言的内部机制是建立在这个基础之上的，它的设计，本质上就是尽可能的会发挥操作系统层面的优势，而避开导致低效情况。</p>
<p>本章节会围绕以下六个话题逐步展开。</p>
<p>（1）何为内存。</p>
<p>（2）内存为什么需要管理。</p>
<p>（3）操作系统是如何管理内存的。</p>
<p>（4）如何用 Golang 自己实现一个内存管理模型。</p>
<p>（5）Golang 内存管理之魂：TCMalloc。</p>
<p>（6）Golang 中是如何管理内存的。</p>
<h2 id="_1-何为内存" tabindex="-1"><a class="header-anchor" href="#_1-何为内存" aria-hidden="true">#</a> 1 何为内存<a href="#aa504e">#</a></h2>
<p>说到内存，及时没有任何的软件基础知识，那么第一印象应该想到的是如下实物，如图 1 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/zlvD7RteFS.png!large" alt=""></p>
<h3 id="图-1-物理内存条" tabindex="-1"><a class="header-anchor" href="#图-1-物理内存条" aria-hidden="true">#</a> 图 1 物理内存条<a href="#1fcc27">#</a></h3>
<p>图 1 中常被称之为内存条，是计算机硬件组成的一个部分，也是真正给软件提供内存的物理空间。如果计算机没有内存条，那么根本谈不上有内存之说。</p>
<p>那么内存的作用在于什么呢？如果将计算机的存储媒介中的处理性能与容量做一个对比，会出现如下的金字塔模型，如图 2 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/1dphL5SMT9.png!large" alt=""></p>
<h3 id="图-2-计算机存储媒介金字塔模型" tabindex="-1"><a class="header-anchor" href="#图-2-计算机存储媒介金字塔模型" aria-hidden="true">#</a> 图 2 计算机存储媒介金字塔模型<a href="#15fb10">#</a></h3>
<p>从图中可以得出处理速度与存储容量是成反比的。也就是说，性能越大的计算机硬件资源，越是稀缺，所以合理的利用和分配就越重要。</p>
<p>比如内存与硬盘的对比，因为硬盘的容量是非常廉价的，虽然内存目前也可以用到 10G 级别的使用，但是从处理速度来看的话，两者的差距还是相差甚大的，具体如表 1 所示。</p>
<h3 id="表-1-硬盘与内存对比表" tabindex="-1"><a class="header-anchor" href="#表-1-硬盘与内存对比表" aria-hidden="true">#</a> 表 1 硬盘与内存对比表<a href="#4f6c7a">#</a></h3>
<table><thead><tr><th><strong>DDR3**</strong> 内存读写速度大概<strong><strong> 10G/s</strong></strong>（<strong><strong>10000M</strong></strong>）**</th><th><strong>DDR4**</strong> 内存读写速度大概<strong><strong> 50G/s</strong></strong>（<strong><strong>50000M</strong></strong>）**</th></tr></thead><tbody><tr><td>固态硬盘速度是 300M/s，是内存的三十分之一</td><td>固态硬盘速度是 300M/s，是内存的二百分之一</td></tr><tr><td>机械硬盘的速度是 100M/s，是内存的百分之一</td><td>机械硬盘的速度是 100M/s，是内存的五百分之一</td></tr></tbody></table>
<p>所以将大部分程序逻辑临时用的数据，全部都存在内存之中，比如，变量、全局变量、函数跳转地址、静态库、执行代码、临时开辟的内存结构体（对象）等。</p>
<h2 id="_2-内存为什么需要管理" tabindex="-1"><a class="header-anchor" href="#_2-内存为什么需要管理" aria-hidden="true">#</a> 2 内存为什么需要管理<a href="#18bf22">#</a></h2>
<p>当存储的东西越来越多，也就发现物理内存的容量依然是不够用，那么对物理内存的利用率和合理的分配，管理就变得非常的重要。</p>
<p>（1）操作系统就会对内存进行非常详细的管理。</p>
<p>（2）基于操作系统的基础上，不同语言的内存管理机制也应允而生，有的一些语言并没有提供自动的内存管理模式，有的语言就已经提供了自身程序的内存管理模式，如表 2 所示。</p>
<h3 id="表-2-自动与非自动内存管理的语言" tabindex="-1"><a class="header-anchor" href="#表-2-自动与非自动内存管理的语言" aria-hidden="true">#</a> 表 2 自动与非自动内存管理的语言<a href="#03f41e">#</a></h3>
<table><thead><tr><th><strong>内存自动管理的语言（部分）</strong></th><th><strong>内存非自动管理的语言（部分）</strong></th></tr></thead><tbody><tr><td>Golang</td><td>C</td></tr><tr><td>Java</td><td>C++</td></tr><tr><td>Python</td><td>Rust</td></tr></tbody></table>
<p>所以为了降低内存管理的难度，像 C、C++ 这样的编程语言会完全将分配和回收内存的权限交给开发者，而 Rust 则是通过生命周期限定开发者对非法权限内存的访问来自动回收，因而并没有提供自动管理的一套机制。但是像 Golang、Java、Python 这类为了完全让开发则关注代码逻辑本身，语言层提供了一套管理模式。因为 Golang 编程语言给开发者提供了一套内存管理模式，所以开发者有必要了解一下 Golang 做了哪些助力的功能。</p>
<p>在理解 Golang 语言层内存管理之前，应先了解操作系统针对物理内存做了哪些管理的方式。当插上内存条之后，通过操作系统是如何将软件存放在这个绿色的物理内存条中去的。</p>
<h2 id="_3-操作系统是如何管理内存的" tabindex="-1"><a class="header-anchor" href="#_3-操作系统是如何管理内存的" aria-hidden="true">#</a> 3 操作系统是如何管理内存的<a href="#149166">#</a></h2>
<p>计算机对于内存真正的载体是物理内存条，这个是实打实的物理硬件容量，所以在操作系统中定义这部门的容量叫物理内存。</p>
<p>实则物理内存的布局实际上就是一个内存大数组，如图 3 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/G72Sqei8Um.png!large" alt=""></p>
<h3 id="图-3-物理内存布局" tabindex="-1"><a class="header-anchor" href="#图-3-物理内存布局" aria-hidden="true">#</a> 图 3 物理内存布局<a href="#fcac1d">#</a></h3>
<p>每一个元素都会对应一个地址，称之为物理内存地址。那么 CPU 在运算的过程中，如果需要从内存中取 1 个字节的数据，就需要基于这个数据的物理内存地址去运算即可，而且物理内存地址是连续的，可以根据一个基准地址进行偏移来取得相应的一块连续内存数据。</p>
<p>一个操作系统是不可能只运行一个程序的，那么这个大数组物理内存势必要被 N 个程序分成 N 分，供每个程序使用。但是程序是活的，一个程序可能一会需要 1MB 的内存，一会又需要 1GB 的内存。操作系统只能取这个程序允许的最大内存极限来分配内存给这个进程，但这样会导致每个进程都会多要去一大部分内存，而这些多要的内存却大概率不会被使用，如图 4 所示。<img src="https://cdn.learnku.com/uploads/images/202205/23/58489/IQZQ8Vfysj.png!large" alt=""></p>
<h3 id="图-4-物理内存分配的困局" tabindex="-1"><a class="header-anchor" href="#图-4-物理内存分配的困局" aria-hidden="true">#</a> 图 4 物理内存分配的困局<a href="#27bf6c">#</a></h3>
<p>当 N 个程序同时使用同一块内存时，那么产生读写的冲突也在所难免。这样就会导致这些昂贵的物理内存条，几乎跑不了几个程序，内存的利用率也就提高不上来。</p>
<p>所以就引出了操作系统的内存管理方式，操作系统提供了虚拟内存来解决这件事。</p>
<h3 id="_3-1-虚拟内存" tabindex="-1"><a class="header-anchor" href="#_3-1-虚拟内存" aria-hidden="true">#</a> 3.1 虚拟内存<a href="#dfa00c">#</a></h3>
<p>所谓虚拟，类似是假、凭空而造的大致意思。对比上图 3.3 所示的物理内存布局，虚拟内存的大致表现方式如图 5 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/wPo2lh1X0C.png!large" alt=""></p>
<h3 id="图-5-虚拟内存布局" tabindex="-1"><a class="header-anchor" href="#图-5-虚拟内存布局" aria-hidden="true">#</a> 图 5 虚拟内存布局<a href="#2947cb">#</a></h3>
<p>虚拟内存地址是基于物理内存地址之上凭空而造的一个新的逻辑地址，而操作系统暴露给用户进程的只是虚拟内存地址，操作系统内部会对虚拟内存地址和真实的物理内存地址做映射关系，来管理地址的分配，从而使物理内存的利用率提高。</p>
<p>这样用户程序（进程）只能使用虚拟的内存地址来获取数据，系统会将这个虚拟地址翻译成实际的物理地址。这里面每一个程序统一使用一套连续虚拟地址，比如 0x 0000 0000 ~ 0x ffff ffff。从程序的角度来看，它觉得自己独享了一整块内存，且不用考虑访问冲突的问题。系统会将虚拟地址翻译成物理地址，从内存上加载数据。</p>
<p>但如果仅仅把虚拟内存直接理解为地址的映射关系，那就是过于低估虚拟内存的作用了。</p>
<p>虚拟内存的目的是为了解决以下几件事：</p>
<p>（1）物理内存无法被最大化利用。</p>
<p>（2）程序逻辑内存空间使用独立。</p>
<p>（3）内存不够，继续虚拟磁盘空间。</p>
<p>对于（1），（2）两点，上述应该已经有一定的描述了，其中针对（1）的最大化，虚拟内存还实现了 “读时共享，写时复制” 的机制，可以在物理层同一个字节的内存地址被多个虚拟内存空间映射，表现方式如图 6 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/sF5qe0wzlq.png!large" alt=""></p>
<h3 id="图-6-读时共享-写时复制" tabindex="-1"><a class="header-anchor" href="#图-6-读时共享-写时复制" aria-hidden="true">#</a> 图 6 读时共享，写时复制<a href="#7ecb3a">#</a></h3>
<p>上图所示如果一个进程需要进行写操作，则这个内存将会被复制一份，成为当前进程的独享内存。如果是读操作，可能会多个进程访问的物理空间是相同的空间。</p>
<p>如果一个内存几乎大量都是被读取的，则可能会多个进程共享同一块物理内存，但是他们的各自虚拟内存是不同的。当然这个共享并不是永久的，当其中有一个进程对这个内存发生写，就会复制一份，执行写操作的进程就会将虚拟内存地址映射到新的物理内存地址上。</p>
<p>对于第（3）点，是虚拟内存为了最大化利用物理内存，如果进程使用的内存足够大，则导致物理内存短暂的供不应求，那么虚拟内存也会 “开疆拓土” 从磁盘（硬盘）上虚拟出一定量的空间，挂在虚拟地址上，而且这个动作进程本身是不知道的，因为进程只能够看见自己的虚拟内存空间，如图 7 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/bEPjaY1g3V.png!large" alt=""></p>
<h3 id="图-7-虚拟内存从磁盘映射空间" tabindex="-1"><a class="header-anchor" href="#图-7-虚拟内存从磁盘映射空间" aria-hidden="true">#</a> 图 7 虚拟内存从磁盘映射空间<a href="#81a62c">#</a></h3>
<p>综上可见虚拟内存的重要性，不仅提高了利用率而且整条内存调度的链路完全是对用户态物理内存透明，用户可以安心的使用自身进程独立的虚拟内存空间进行开发。</p>
<h3 id="_3-2-mmu-内存管理单元" tabindex="-1"><a class="header-anchor" href="#_3-2-mmu-内存管理单元" aria-hidden="true">#</a> 3.2 MMU 内存管理单元<a href="#929b49">#</a></h3>
<p>那么对于虚拟内存地址是如何映射到物理内存地址上的呢？会不会是一个固定匹配地址逻辑处理的？假设使用固定匹配地址逻辑做映射，可能会出现很多虚拟内存打到同一个物理内存上，如果发现被占用，则会再重新打。这样对映射地址寻址的代价极大，所以操作系统又加了一层专门用来管理虚拟内存和物理内存映射关系的东西，就是 MMU（Memory Management Unit），如图 8 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/F11MJBbpMd.png!large" alt=""></p>
<h3 id="图-8-mmu-内存管理单元" tabindex="-1"><a class="header-anchor" href="#图-8-mmu-内存管理单元" aria-hidden="true">#</a> 图 8 MMU 内存管理单元<a href="#bd98d3">#</a></h3>
<p>MMU 是在 CPU 里的，或者说是 CPU 具有一个内存管理单元 MMU，下面来介绍一下 MMU 具体的管理逻辑。</p>
<h3 id="_3-3-虚拟内存本身怎么存放" tabindex="-1"><a class="header-anchor" href="#_3-3-虚拟内存本身怎么存放" aria-hidden="true">#</a> 3.3 虚拟内存本身怎么存放<a href="#bfc8c8">#</a></h3>
<p>虚拟内存本身是通过一个叫页表（Page Table）的东西来实现的，接下来介绍页和页表这两个概念。</p>
<h4 id="_1-页" tabindex="-1"><a class="header-anchor" href="#_1-页" aria-hidden="true">#</a> <strong>1. 页</strong><a href="#760b0d">#</a></h4>
<p>页是操作系统中用来描述内存大小的一个单位名称。一个页的含义是大小为 4K（1024*4=4096 字节）的内存空间。操作系统对虚拟内存空间是按照这个单位来管理的。</p>
<h4 id="_2-页表" tabindex="-1"><a class="header-anchor" href="#_2-页表" aria-hidden="true">#</a> <strong>2. 页表</strong><a href="#d29eef">#</a></h4>
<p>页表实际上就是页的集合，就是基于页的一个数组。页只是表示内存的大小，而<strong>页表条目（<strong>PTE</strong><a href="#_ftn1">[1]</a></strong>）, 才是页表数组中的一个元素。</p>
<p>为了方便读者理解，下面用一个抽象的图来表示页、页表、和页表元素 PTE 的概念和关系，如图 9 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/Pi18r4mFiz.png!large" alt=""></p>
<h3 id="图-9-页、页表、pte-之间的关系" tabindex="-1"><a class="header-anchor" href="#图-9-页、页表、pte-之间的关系" aria-hidden="true">#</a> 图 9 页、页表、PTE 之间的关系<a href="#7bba6e">#</a></h3>
<p>虚拟内存的实现方式，大多数都是通过<strong>页表</strong>来实现的。操作系统虚拟内存空间分成一页一页的来管理，每页的大小为 4K（当然这是可以配置的，不同操作系统不一样）。磁盘和主内存之间的置换也是以<strong>页</strong>为单位来操作的。4K 算是通过实践折中出来的通用值，太小了会出现频繁的置换，太大了又浪费内存。</p>
<p>虚拟内存到物理内存的映射关系的存储结构就是由类似上述图 3.9 中的页表记录，<strong>实则是一个数组。这里要注意的是，页是一次读取的内存单元，但是真正起到虚拟内存寻址的是 PTE，也就是页表中的一个元素。PTE 的大致内部结构如图 10 所示。</strong></p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/xznDie9ouV.png!large" alt=""></p>
<h3 id="图-10-pte-内部构造" tabindex="-1"><a class="header-anchor" href="#图-10-pte-内部构造" aria-hidden="true">#</a> 图 10 PTE 内部构造<a href="#8399f1">#</a></h3>
<p>可以看出每个 PTE 是由一个有效位和一个包含物理页号或者磁盘地址组成，有效位表示当前虚拟页是否已经被缓存在主内存中（或者 CPU 的高速缓存 Cache 中）。</p>
<p>虚拟页为何有会是否已经被缓存在主内存中一说？虚拟页表（简称页表）虽然作为虚拟内存与物理内存的映射关系，但是本身也是需要存放在某个位置上，所以自身本身也是占用一定内存的。所以页表本身也是被操作系统放在物理内存的指定位置。CPU 把虚拟地址给 MMU，MMU 去物理内存中查询页表，得到实际的物理地址。当然 MMU 不会每次都去查的，它自己也有一份缓存叫 Translation Lookaside Buffer (TLB)<a href="#_ftn2">[2]</a>，是为了加速地址翻译。CPU、MMU 与 TLB 的相互关系如图 11 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/DwgpY8A3UC.png!large" alt=""></p>
<h3 id="图-11-cpu、mmu-与-tlb-的交互关系" tabindex="-1"><a class="header-anchor" href="#图-11-cpu、mmu-与-tlb-的交互关系" aria-hidden="true">#</a> 图 11 CPU、MMU 与 TLB 的交互关系<a href="#9faa5c">#</a></h3>
<p>从上图可以看出，TLB 是虚拟内存页，即虚拟地址和物理地址映射关系的缓存层。MMU 当收到地址查询指令，第一时间是请求 TLB 的，如果没有才会进行从内存中的虚拟页进行查找，这样可能会触发多次内存读取，而读取 TLB 则不需要内存读取，所进程读取的步骤顺序为：</p>
<p>（1）CPU 进行虚拟地址请求 MMU。</p>
<p>（2）MMU 优先从 TLB 中得到虚拟页。</p>
<p>（3）如果得到则返回给上层。</p>
<p>（4）如果没有则从主存的虚拟页表中查询关系。</p>
<p>下面继续分析 PTE 的内部构造，根据有效位的特征可以得到不同的含义如下：</p>
<p>（1）有效位为 1，表示虚拟页已经被缓存在内存（或者 CPU 高速缓存 TLB-Cache）中。</p>
<p>（2）有效位为 0，表示虚拟页未被创建且没有占用内存（或者 CPU 高速缓存 TLB-Cache），或者表示已经创建虚拟页但是并没有存储到内存（或者 CPU 高速缓存 TLB-Cache）中。</p>
<p>通过上述的标识位，可以将虚拟页集合分成三个子集，如表 3 所示。</p>
<h3 id="表-3-虚拟页被分成的三种子集" tabindex="-1"><a class="header-anchor" href="#表-3-虚拟页被分成的三种子集" aria-hidden="true">#</a> 表 3 虚拟页被分成的三种子集<a href="#9768f6">#</a></h3>
<table><thead><tr><th><strong>有效位</strong></th><th><strong>集合特征</strong></th></tr></thead><tbody><tr><td>1</td><td>虚拟内存已创建和分配页，已缓存在物理内存（或 TLB-Cache）中。</td></tr><tr><td>0</td><td>虚拟内存还未分配或创建。</td></tr><tr><td>0</td><td>虚拟内存已创建和分配页，但未缓存在物理内存（或 TLB-Cache）中。</td></tr></tbody></table>
<p>对于 Golang 开发者，对虚拟内存的存储结构了解到此步即可，如果想更深入的了解 MMU 存储结果可以翻阅其他操作系统或硬件相关书籍或资料。下面来分析一下在访问一次内存的整体流程。</p>
<h3 id="_3-4-cpu-内存访问过程" tabindex="-1"><a class="header-anchor" href="#_3-4-cpu-内存访问过程" aria-hidden="true">#</a> 3.4 CPU 内存访问过程<a href="#53d9ad">#</a></h3>
<p>一次 CPU 内存访问的流程如图 12 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/JnCscKIxBw.png!large" alt=""></p>
<h3 id="图-12-cpu-内存访问的详细流程" tabindex="-1"><a class="header-anchor" href="#图-12-cpu-内存访问的详细流程" aria-hidden="true">#</a> 图 12 CPU 内存访问的详细流程<a href="#08bc59">#</a></h3>
<p>当某个进程进行一次内存访问指令请求，将触发如图 3.12 的内存访问具体的访问流程如下：</p>
<p>（1）进程将内存相关的寄存器指令请求运算发送给 CPU，CPU 得到具体的指令请求。</p>
<p>（2）计算指令被 CPU 加载到寄存器当中，准备执行相关指令逻辑。</p>
<p>（3）CPU 对相关可能请求的内存生成虚拟内存地址。一个虚拟内存地址包括虚拟页号 VPN（Virtual Page Number）和虚拟页偏移量 VPO（Virtual Page Offset）<a href="#_ftn3">[3]</a>。</p>
<p>（4）从虚拟地址中得到虚拟页号 VPN。</p>
<p>（5）通过虚拟页号 VPN 请求 MMU 内存管理单元。</p>
<p>（6）MMU 通过虚拟页号查找对应的 PTE 条目（优先层 TLB 缓存查询）。</p>
<p>（7）通过得到对应的 PTE 上的有效位来判断当前虚拟页是否在主存中。</p>
<p>（8）如果索引到的 PTE 条目的有效位为 1，则表示命中，将对应 PTE 上的物理页号 PPN（Physical Page Number）和虚拟地址中的虚拟页偏移量 VPO 进行串联从而构造出主存中的物理地址 PA（Physical Address）<a href="#_ftn4">[4]</a>，进入步骤（9）。</p>
<p>（9）通过物理内存地址访问物理内存，当前的寻址流程结束。</p>
<p>（10）如果有效位为 0，则表示未命中，一般称这种情况为缺页。此时 MMU 将产生一个缺页异常，抛给操作系统。</p>
<p>（11）操作系统捕获到缺页异常，开始执行异常处理程序。</p>
<p>（12）此时将选择一个牺牲页并将对应的所缺虚拟页调入并更正新页表上的 PTE，如果当前牺牲页有数据，则写入磁盘，得到物理内存页号 PPN（Physical Page Number）。</p>
<p>（13）缺页处理程序更新之前索引到的 PTE，并且写入物理内存怒页号 PPN，有效位设置为 1。</p>
<p>（14）缺页处理程序再次返回到原来的进程，且再次执行缺页指令，CPU 重新将虚拟地址发给 MMU，此时虚拟页已经存在物理内存中，本次一定会命中，通过（1）~（9）流程，最终将请求的物理内存返回给处理器。</p>
<p>以上就是一次 CPU 访问内存的详细流程。可以看出来上述流程中，从第（10）步之后的流程就稍微有一些繁琐。类似产生异常信号、捕获异常，再处理缺页流程，如选择牺牲页，还要将牺牲页的数据存储到磁盘上等等。所以如果频繁的执行（10）~（14）步骤会对性能影响很大。因为牺牲页有可能会涉及到磁盘的访问，而磁盘的访问速度非常的慢，这样就会引发程序性能的急剧下降。</p>
<p>一般从（1）~（9）步流程结束则表示页命中，反之为未命中，所以就会出现一个新的性能级指标，即命中率。命中率是访问次数与页命中次数之比。一般命中率低说明物理内存不足，数据在内存和磁盘之间交换频繁，但如果物理内存充分，则不会出现频繁的内存颠簸现象。</p>
<h3 id="_3-4-内存的局部性" tabindex="-1"><a class="header-anchor" href="#_3-4-内存的局部性" aria-hidden="true">#</a> 3.4 内存的局部性<a href="#b91659">#</a></h3>
<p>上述了解到内存的命中率实际上是一衡量每次内存访问均能被页直接寻址到而不是产生缺页的指标。所以如果经常在一定范围内的内存则出现缺页的情况就会降低。这就是程序的一种局部性特性的体现。</p>
<p>局部性就是在多次内存引用的时候，会出现有的内存被经常引用多次，而且在该位置附近的其他位置，也有可能接下来被引用到。一般大多数程序都会具备局部性的特点。</p>
<p>实际上操作系统在设计过程中经常会用到缓存来提升性能，或者在设计解决方案等架构的时候也会考虑到缓存或者缓冲层的概念，实则就是利用程序或业务天然的局部性特征。因为如果没有局部性的特性，则缓存级别将起不到太大的作用，所以在设计程序或者业务的时候应该多考虑增强程序局部性的特征，这样的程序会更快。</p>
<p>下面是一个非常典型的案例来验证程序局部性的程序示例，具体代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>package MyGolang

func Loop(nums []int, step int) {
   l := len(nums)
   for i := 0; i &lt; step; i++ {
      for j := i; j &lt; l; j += step {
         nums[j] = 4 //访问内存，并写入值
      }
   }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Loop () 函数的功能是遍历数组 nums，并且将 nums 中的每个元素均设置为 4。但是这里用了一个 step 来规定每次遍历的跨度。可以跟读上述代码，如果 step 等于 1，则外层 for 循环只会执行 1 次。内层 for 循环则正常遍历 nums。实则相当于代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func Loop(nums []int, step int) {
   l := len(nums)
   for j := 0; j &lt; l; j += 1 {
       nums[j] = 4 //访问内存，并写入值
   }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 Step 等于 3，则表示外层 for 循环要一共完成 3 次，内层 for 循环每次遍历的数组下标值都相差 3。第一次遍历会被遍历的 nums 下标为 0、3、6、9、12……，第二次遍历会遍历的 nums 下标为 1、4、7、10、13……，第三次遍历会遍历的 nums 下标为 2、5、8、11、14……。那么三次外循环就会将全部遍历完整个 nums 数组。</p>
<p>上述的程序表示了访问数组的局部性，step 跨度越小，则表示访问 nums 相邻内存的局部性约好，step 越大则相反。</p>
<p>接下来用 Golang 的 Benchmark 性能测试来分别对 step 取不同的值进行压测，来看看通过 Benchmark 执行 Loop () 函数而统计出来的几种情况，最终消耗的时间差距为多少。首先创建 loop_test.go 文件，实现一个制作数组并且赋值初始化内存值的函数 CreateSource ()，代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>package MyGolang

import "testing"

func CreateSource(len int) []int {
   nums := make([]int, 0, len)

   for i := 0 ; i &lt; len; i++ {
      nums = append(nums, i)
   }

   return nums
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次实现一个 Benchmark，制作一个长度为 10000 的数组，这里要注意的是创建完数组后要执行 b.ResetTimer () 重置计时，去掉 CreateSource () 消耗的时间，step 跨度为 1 的代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//第一篇/chapter3/MyGolang/loop_test.go

func BenchmarkLoopStep1(b *testing.B) {
   //制作源数据，长度为10000
   src := CreateSource(10000)

   b.ResetTimer()
   for i:=0; i &lt; b.N; i++ {
      Loop(src, 1)
   }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Golang 中的 b.N 表示 Golang 一次压测最终循环的次数。BenchmarkLoopStep1 () 会将 N 次的总耗时时间除以 N 得到平均一次执行 Loop () 函数的耗时。因为要对比多个 step 的耗时差距，按照上述代码再依次实现 step 为 2、3、4、5、6、12、16 等 Benchmark 性能测试代码，如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func BenchmarkLoopStep2(b *testing.B) {
   //制作源数据，长度为10000
   src := CreateSource(10000)

   b.ResetTimer()
   for i:=0; i &lt; b.N; i++ {
      Loop(src, 2)
   }
}

func BenchmarkLoopStep3(b *testing.B) {
   //制作源数据，长度为10000
   src := CreateSource(10000)

   b.ResetTimer()
   for i:=0; i &lt; b.N; i++ {
      Loop(src, 3)
   }
}

func BenchmarkLoopStep4(b *testing.B) {
   //制作源数据，长度为10000
   src := CreateSource(10000)

   b.ResetTimer()
   for i:=0; i &lt; b.N; i++ {
      Loop(src, 4)
   }
}

func BenchmarkLoopStep5(b *testing.B) {
   //制作源数据，长度为10000
   src := CreateSource(10000)

   b.ResetTimer()
   for i:=0; i &lt; b.N; i++ {
      Loop(src, 5)
   }
}

func BenchmarkLoopStep6(b *testing.B) {
   //制作源数据，长度为10000
   src := CreateSource(10000)

   b.ResetTimer()
   for i:=0; i &lt; b.N; i++ {
      Loop(src, 6)
   }
}

func BenchmarkLoopStep12(b *testing.B) {
   //制作源数据，长度为10000
   src := CreateSource(10000)

   b.ResetTimer()
   for i:=0; i &lt; b.N; i++ {
      Loop(src, 12)
   }
}

func BenchmarkLoopStep16(b *testing.B) {
   //制作源数据，长度为10000
   src := CreateSource(10000)

   b.ResetTimer()
   for i:=0; i &lt; b.N; i++ {
      Loop(src, 16)
   }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述每个 Benchmark 都是相似的代码，只有 step 传参不同，接下来通过执行下述指令来进行压测，指令如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go test -bench=.  -count=3

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 “count=3” 表示每个 Benchmark 要执行 3 次，这样是更好验证上述的结果。具体的运行结果如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>goos: darwin
goarch: amd64
pkg: MyGolang
BenchmarkLoopStep1-12            366787      2792 ns/op
BenchmarkLoopStep1-12            432235      2787 ns/op
BenchmarkLoopStep1-12            428527      2849 ns/op
BenchmarkLoopStep2-12            374282      3282 ns/op
BenchmarkLoopStep2-12            363969      3263 ns/op
BenchmarkLoopStep2-12            361790      3315 ns/op
BenchmarkLoopStep3-12            308587      3760 ns/op
BenchmarkLoopStep3-12            311551      4369 ns/op
BenchmarkLoopStep3-12            289584      4622 ns/op
BenchmarkLoopStep4-12            275166      4921 ns/op
BenchmarkLoopStep4-12            264282      4504 ns/op
BenchmarkLoopStep4-12            286933      4869 ns/op
BenchmarkLoopStep5-12            223366      5609 ns/op
BenchmarkLoopStep5-12            202597      5655 ns/op
BenchmarkLoopStep5-12            214666      5623 ns/op
BenchmarkLoopStep6-12            187147      6344 ns/op
BenchmarkLoopStep6-12            177363      6397 ns/op
BenchmarkLoopStep6-12            185377      6333 ns/op
BenchmarkLoopStep12-12           126860      9660 ns/op
BenchmarkLoopStep12-12           127557      9741 ns/op
BenchmarkLoopStep12-12           126658      9492 ns/op
BenchmarkLoopStep16-12            95116     12754 ns/op
BenchmarkLoopStep16-12            95175     12591 ns/op
BenchmarkLoopStep16-12            92106     12533 ns/op
PASS
ok  MyGolang31.712s

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对上述结果以第一行为例进行简单的解读：</p>
<p>（1）“BenchmarkLoopStep1-12” 其中的 “-12” 表示 GOMAXPROCS（线程数）为 12，这个在此处不需要过度的关心。</p>
<p>（2）“366787” 表示一共执行了 366787 次，即代码中 b.N 的值，这个值不是固定不变的。实际上是通过循环调用 366787 次 Loop () 函数得到的最后性能结果。</p>
<p>（3）“2792 ns/op” 表示平均每次 Loop () 函数所消耗的时间是 2792 纳秒。</p>
<p>通过上述结果可以看出，随着 Step 参数的增加，内存访问的局部性就越差，那么执行 Loop () 的性能也就越差，在 Step 为 16 和 Step 为 1 的结果来看，性能相差近 4~5 倍之间。</p>
<p>通过结果可以得出如果要设计出一个更加高效的程序，提高代码的局部性访问是非常有必要的程序性能优化手段之一。</p>
<p>思考 在 Golang 的 GPM 调度器模型中，为什么一个 G 开辟的子 G 优先放在当前的本地 G 队列中，而不是放在其他 M 上的本地 P 队列中？GPM 为何要满足局部性的调度设计？</p>
<h2 id="_4-如何用-golang-语言实现内存管理和内存池设计" tabindex="-1"><a class="header-anchor" href="#_4-如何用-golang-语言实现内存管理和内存池设计" aria-hidden="true">#</a> 4 如何用 Golang 语言实现内存管理和内存池设计<a href="#de9875">#</a></h2>
<p>本节介绍自主实现一个内存管理模块都大致需要哪些基础的开发和组件建设。接下来的一些代码不需要读者去掌握，因为 Golang 已经给开发者提供的内存管理模式，开发者不需要关心 Golang 的内存分配情况。但是为了更好的理解 Golang 的内存管理模型，需要了解如果自己实现一套简单的内存管理模块应该需要关注哪些点和需要实现哪些必要的模块和机制。</p>
<p>本节接下来的内容即是通过 Golang 自我实现一个内存管理模块和内存池的建设，该模块非企业级开发而是促进理解内存管理模型的教程型代码。</p>
<h3 id="_4-1-基于-cgo-的内存-c-接口封装" tabindex="-1"><a class="header-anchor" href="#_4-1-基于-cgo-的内存-c-接口封装" aria-hidden="true">#</a> 4.1 基于 Cgo 的内存 C 接口封装<a href="#64a2ce">#</a></h3>
<p>因为 Golang 语言已经内置的内存管理机制，所以如果用 Golang 原生的语法结构如 Slice、String、Map 等都会自动触发 Golang 的内存管理机制。本案例为了介绍如何实现一个自我管理的内存模型，所以直接使用的 C 语言的 malloc ()、free () 系统调用来开辟和释放内存空间，使用 C 语言的 memcpy ()、memmove () 等进行内存的拷贝和移动。至于如何封装 Golang 语法的 Malloc ()、Free ()、Memcpy ()、Memmove () 等函数，即是利用的 Golang 中的 Cgo 机制。</p>
<p>注意 Cgo 提供了 Golang 和 C 语言相互调用的机制。可以通过 Cgo 用 Golang 调用 C 的接口，对于 C++ 的接口可以用 C 包装一下提供给 Golang 调用。被调用的 C 代码可以直接以源代码形式提供或者打包静态库或动态库在编译时链接。<br>
Cgo 的具体使用教程本章将不继续详细介绍，本章主要介绍下在内存管理设计所涉及到部分 Cgo 语法部分。</p>
<p>开始创建一个 zmem / 目录，作为当前内存实现案例的项目名称。在 zmem / 目录下再创建 c / 文件夹，这里用来实现通过 Cgo 来封装的 C 语言内存管理接口。</p>
<p>在 c / 目录下创建 memory.go 文件，分别封装的 C 语言内存接口代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/c/memory.go

package c

/*
#include &lt;string.h>
#include &lt;stdlib.h>
 */
import "C"
import "unsafe"

func Malloc(size int) unsafe.Pointer {
   return C.malloc(C.size_t(size))
}

func Free(data unsafe.Pointer) {
   C.free(data)
}

func Memmove(dest, src unsafe.Pointer, length int) {
   C.memmove(dest, src, C.size_t(length))
}

func Memcpy(dest unsafe.Pointer, src []byte, length int) {
   srcData := C.CBytes(src)
   C.memcpy(dest, srcData, C.size_t(length))
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来分别介绍上述代码几个需要注意的地方。</p>
<h4 id="_1-import-c" tabindex="-1"><a class="header-anchor" href="#_1-import-c" aria-hidden="true">#</a> 1.import“C”<a href="#1e808a">#</a></h4>
<p>代表 Cgo 模块的启动，其中 import “C” 上面的全部注释代码（中间不允许有空白行）均为 C 语言原生代码。因为在下述接口封装中使用到了 C 语言的 malloc ()、free ()、memmove ()、memcpy () 等函数，这些函数的声明需要包含头文件 string.h 和 stdlib.h，所以在注释部分添加了导入这两个头文件的代码，并且通过 import “C” 导入进来。</p>
<h4 id="_2-unsafe-pointer" tabindex="-1"><a class="header-anchor" href="#_2-unsafe-pointer" aria-hidden="true">#</a> 2.unsafe.Pointer<a href="#a86c02">#</a></h4>
<p>这里以 malloc () 系统调用为例，通过 man<a href="#_ftn5">[5]</a> 手册查看 malloc () 函数的原型如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>#include &lt;stdlib.h>

void *malloc(size_t size);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数 malloc () 形参是 C 语言中的 size_t 数据类型类型，那么在 Golang 中使用对应的 C 类型是 C.size_t，是的，一般的 C 基本类型只需要通过 C 包直接访问即可。但是对于 malloc () 的返回值 void <em>来说，这是一个万能指针，期功能用法类似 Golang 中的 interface {}，但是在语法上并不能将二者直接划等号。而 Golang 给开发这提供了一个可以直接对等 C 中 void</em> 的数据类型，就是 unsafe.Pointer。unsafe.Pointer 是 Golang 封装好的可以比较自由访问的指针类型，其含义和 void <em>万能指针相似。在语法上，也可以直接将 void</em> 类型数据赋值给 unsafe.Pointer 类型数据。</p>
<h4 id="_3-golang-与-c-的字符串等类型转换" tabindex="-1"><a class="header-anchor" href="#_3-golang-与-c-的字符串等类型转换" aria-hidden="true">#</a> 3.Golang 与 C 的字符串等类型转换<a href="#b37edf">#</a></h4>
<p>在 Cgo 中 Go 的字符串与 Byte 数组都会转换为 C 的 char 数组，其中 Golang 的 Cgo 模块提供了几个方法供开发者使用：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Go字符串转换为C字符串。C字符串使用malloc分配，因此需要使用C.free以避免内存泄露
func C.CString(string) *C.char

// Go byte数组转换为C的数组。使用malloc分配的空间，因此需要使用C.free避免内存泄漏
func C.CBytes([]byte) unsafe.Pointer

// C字符串转换为Go字符串
func C.GoString(*C.char) string

// C字符串转换为Go字符串，指定转换长度
func C.GoStringN(*C.char, C.int) string

// C数据转换为byte数组，指定转换的长度
func C.GoBytes(unsafe.Pointer, C.int) []byte

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 C.CBytes () 方法可以将 Golang 的 [] byte 切片转换成 unsafe.Pointer 类型。利用这个转换功能，来分析一下是如何封装 memcpy () 函数的：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func Memcpy(dest unsafe.Pointer, src []byte, length int) {
   srcData := C.CBytes(src)
   C.memcpy(dest, srcData, C.size_t(length))
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新封装的 Memcpy () 的第一个形参是任意指针类型，表示拷贝的目标地址，第二个形参是 [] byte 类型，表示被拷贝的源数据，第三个参数表示本次拷贝数据的长度。因为 C 语言中的 memcpy () 函数原型如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>#include &lt;string.h>

void *memcpy(void *dst, const void *src, size_t n);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 src 数据源形参需要 [] byte 转换为 unsafe.Pointer，因此在调用 C 的接口是通过 C.CBytes () 转换了一下。</p>
<p>Free () 和 Memmove () 方法的封装和上述一样。Free () 与 Malloc () 对应，Memmove () 为移动一块连续内存。</p>
<p>接下来将上述封装做一个简单的单元测试，在 c / 目录下创建 memory_test.go，实现代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>package c_test

import (
   "zmem/c"
   "bytes"
   "encoding/binary"
   "fmt"
   "testing"
   "unsafe"
)

func IsLittleEndian() bool {
   var n int32 = 0x01020304

   //下面是为了将int32类型的指针转换成byte类型的指针
   u := unsafe.Pointer(&amp;n)
   pb := (*byte)(u)

   //取得pb位置对应的值
   b := *pb

   //由于b是byte类型，最多保存8位，那么只能取得开始的8位
   // 小端: 04 (03 02 01)
   // 大端: 01 (02 03 04)
   return (b == 0x04)
}

func IntToBytes(n uint32) []byte {
   x := int32(n)
   bytesBuffer := bytes.NewBuffer([]byte{})

   var order binary.ByteOrder
   if IsLittleEndian() {
      order = binary.LittleEndian
   } else {
      order = binary.BigEndian
   }
   binary.Write(bytesBuffer, order, x)

   return bytesBuffer.Bytes()
}

func TestMemoryC(t *testing.T) {
   data := c.Malloc(4)
   fmt.Printf(" data %+v, %T\n", data, data)
   myData := (*uint32)(data)
   *myData = 5
   fmt.Printf(" data %+v, %T\n", *myData, *myData)

   var a uint32 = 100
   c.Memcpy(data, IntToBytes(a), 4)
   fmt.Printf(" data %+v, %T\n", *myData, *myData)

   c.Free(data)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>单元测试接口是 TestMemoryC ()，首先通过 Malloc () 开辟 4 个字节内存，然后将这 4 个字节赋值为 5，打印结果看 data 的值是否是 5。最后是将 100 通过 Memcpy () 拷贝给这 4 个字节，看最后的结果是否是 100，运行结果如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>=== RUN   TestMemoryC
data 0x9d040a0, unsafe.Pointer
data 5, uint32
data 100, uint32
--- PASS: TestMemoryC (0.00s)
PASS

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过单元测试结果来看，目前的内存开辟和拷贝的相关接口可以正常使用，接下来就是基于这些接口来实现内存管理的模块实现。</p>
<h3 id="_4-2-基础内存缓冲-buf-实现" tabindex="-1"><a class="header-anchor" href="#_4-2-基础内存缓冲-buf-实现" aria-hidden="true">#</a> 4.2 基础内存缓冲 Buf 实现<a href="#a071ec">#</a></h3>
<p>在 zmem 目录下再创建 mem 文件夹，包 mem 模块作为内存管理相关代码的包名，然后再 mem 目下面创建 buf.go，作为 Buf 的代码实现。文件路径结构如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>zmem/
├── README.md
├── c/
│   ├── memory.go
│   └── memory_test.go
├── go.mod
└── mem/
└── buf.go

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来定义一个 Buf 数据结构，具体的定义实现如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf.go

package mem

import "unsafe"

type Buf struct {
   //如果存在多个buffer，是采用链表的形式链接起来
   Next *Buf
   //当前buffer的缓存容量大小
   Capacity int
   //当前buffer有效数据长度
   length int
   //未处理数据的头部位置索引
   head int
   //当前buf所保存的数据地址
   data unsafe.Pointer
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个 Buf 内存缓冲包含如下成员属性：</p>
<p>（1）Capacity，表示当前缓冲的容量大小，实则是底层内存分配的最大内存空间上限。</p>
<p>（2）length，当前缓冲区的有效数据长度，有效数据长度为用户存入但又未访问的剩余数据长度。</p>
<p>（3）head，缓冲中未处理的头部位置索引。</p>
<p>（4）data，是当前 buf 所保存内存的首地址指针，这里用的事 unsafe.Pointer 类型，表示 data 所存放的为基础的虚拟内存地址。</p>
<p>（5）Next，是 Buf 类型的指针，指向下一个 Buf 地址。Buf 与 Buf 之间的关系是一个链表结构。</p>
<p>一个 Buf 的数据内存结构布局如图 13 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/4FVN22kCa6.png!large" alt=""></p>
<h3 id="图-13-buf-的数据结构布局" tabindex="-1"><a class="header-anchor" href="#图-13-buf-的数据结构布局" aria-hidden="true">#</a> 图 13 Buf 的数据结构布局<a href="#95a6de">#</a></h3>
<p>Buf 是采用链表的集合方式，每个 Buf 通过 Next 进行关联，其中 Data 为指向底层开辟出来供用户使用的内存。一个内存中有几个刻度索引，内存首地址索引位置定义为 0，Head 为当前用户应用有效数据的首地址索引，Length 为有效数据尾地址索引，有效数据的长度为 “Length-Head”。Capacity 是开辟内存的尾地址索引，也表示当前 Buf 的可使用内存容量。</p>
<p>接下来来提供一个 Buf 的构造方法，具体代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf.go

//构造，创建一个Buf对象
func NewBuf(size int) *Buf {
   return &amp;Buf{
      Capacity: size,
      length: 0,
      head: 0,
      Next: nil,
      data : c.Malloc(size),
   }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>NewBuf () 接收一个 size 形参，用来表示开辟的内存空间长度。这里调用封装的 c.Malloc () 方法来申请 size 长度的内存空间，并且赋值给 data。</p>
<p>Buf 被初始化之后，需要给 Buf 赋予让调用方传入数据的接口，这里允许一个 Buf 的内存可以赋予 [] byte 类型的源数据，方法名称是 SetBytes ()，定义如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf.go
//给一个Buf填充[]byte数据
func (b *Buf) SetBytes(src []byte) {
   c.Memcpy(unsafe.Pointer(uintptr(b.data)+uintptr(b.head)), src, len(src))
   b.length += len(src)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>操作一共有两个过程组成：</p>
<p>（1）将 [] byte 源数据 src 通过 C 接口的内存拷贝，给 Buf 的 data 赋值。这里要注意的是被拷贝的 data 的起始地址是 b.head。</p>
<p>（2）拷贝之后 Buf 的有效数据长度要相应的累加偏移，具体的过程如图 14 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/7Sm6uBF3yK.png!large" alt=""></p>
<h3 id="图-14-setbytes-内存操作" tabindex="-1"><a class="header-anchor" href="#图-14-setbytes-内存操作" aria-hidden="true">#</a> 图 14 SetBytes 内存操作<a href="#42ad87">#</a></h3>
<p>这里要注意的是，拷贝的起始地址会基于 data 的基地址向右偏移 head 的长度，因为定义是从 Head 到 Length 是有效合法数据。对于 unsafe.Pointer 的地址偏移需要转换为 uintptr 类型进行地址计算。</p>
<p>与 SetBytes () 对应的是 GetBytes ()，是从 Buf 的 data 中获取数据，具体实现代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf.go

//获取一个Buf的数据，以[]byte形式展现
func (b *Buf) GetBytes() []byte {
   data := C.GoBytes(unsafe.Pointer(uintptr(b.data)+uintptr(b.head)), C.int(b.length))
   return data
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 C.GoBytes () 是 Cgo 模块提供的将 C 数据转换为 byte 数组，并且指定转换的长度。</p>
<p>取数据的起始地址依然是基于 data 进行 head 长度的偏移。</p>
<p>Buf 还需要提供一个 Copy () 方法，用来将其他 Buf 缓冲对象直接复制拷贝到自身当中，且 head、length 等于对方完全一样，具体实现的代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf.go

//将其他Buf对象数据考本到自己中
func (b *Buf) Copy(other *Buf) {
   c.Memcpy(b.data, other.GetBytes(), other.length)
   b.head = 0
   b.length = other.length
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来需要提供可以移动 head 的方法，其作用是缩小有效数据长度，当调用方已经使用了一部分数据之后，这部分数据可能会变成非法的非有效数据，那么就需要将 head 向后偏移缩小有效数据的长度，Buf 将提供一个名字叫 Pop () 的方法，具体定义如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf.go

//处理长度为len的数据，移动head和修正length
func (b *Buf) Pop(len int) {
   if b.data == nil {
      fmt.Printf("pop data is nil")
      return
   }
   if len > b.length {
      fmt.Printf("pop len > length")
      return
   }
   b.length -= len
   b.head += len
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一次 Pop () 操作，首先会判断弹出合法有效数据的长度是否越界。然后对应的 head 向右偏移，length 的有效长度对应做缩减，具体的流程如图 15 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/uKA54pZVZ6.png!large" alt=""></p>
<h3 id="图-15-pop-内存操作的-head-与-length-偏移" tabindex="-1"><a class="header-anchor" href="#图-15-pop-内存操作的-head-与-length-偏移" aria-hidden="true">#</a> 图 15 Pop 内存操作的 head 与 length 偏移<a href="#8ac913">#</a></h3>
<p>因为调用方经常的获取数据，然后调用 Pop () 缩减有效长度，那么不出几次，可能就会导致 head 越来越接近 Capacity，也会导致有效数据之前的已经过期的非法数据越来越多。所以 Buf 需要提供一个 Adjust () 方法，来将有效数据的内存迁移至 data 基地址位置，覆盖之前的已使用过的过期数据，将后续的空白可使用空间扩大。Adjust () 的实现方法如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf.go

//将已经处理过的数据，清空,将未处理的数据提前至数据首地址
func (b *Buf) Adjust() {
   if b.head != 0 {
      if (b.length != 0) {
         c.Memmove(b.data, unsafe.Pointer(uintptr(b.data) + uintptr(b.head)), b.length)
      }
      b.head = 0
   }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Adjust () 调用之前封装好的 c.Memmove () 方法，将有效数据内存平移至 Buf 的 data 基地地址，同时将 head 重置到 0 位置，具体的流程如图 16 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/2ZKbGrxHAn.png!large" alt=""></p>
<h3 id="图-16-adjust-操作的内存平移" tabindex="-1"><a class="header-anchor" href="#图-16-adjust-操作的内存平移" aria-hidden="true">#</a> 图 16 Adjust 操作的内存平移<a href="#c19a7c">#</a></h3>
<p>Buf 也要提供一个清空缓冲内存的方法 Clear ()，Clear () 实现很简单，只需要将几个索引值清零即可，Clear () 并不会以操作系统层面回收内存，因为 Buf 的是否回收，是否被重置等需要依赖 BufPool 内存池来管理，将在下一小结介绍内存池管理 Buf 的情况。为了降低系统内存的开辟和回收，Buf 可能长期在内存池中存在。调用方只需要改变几个地址索引值就可以达到内存的使用和回收。Clear () 方法的实现如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf.go

//清空数据
func (b *Buf) Clear() {
   b.length = 0
   b.head = 0
}
其他的提供的访问head和length的方法如下：
func (b *Buf) Head() int {
   return b.head
}

func (b *Buf) Length() int {
   return b.length
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在 Buf 的基本功能已经实现完成了，接下来实现对 Buf 的管理内存池模块。</p>
<h3 id="_4-3-内存池设计与实现" tabindex="-1"><a class="header-anchor" href="#_4-3-内存池设计与实现" aria-hidden="true">#</a> 4.3 内存池设计与实现<a href="#d3dbb6">#</a></h3>
<p>一个 Buf 只是一次内存使用所需要存放数据的缓冲空间，为了方便多个 Buf 直接的申请与管理，则需要设计一个内存池来统一进行 Buf 的调配。</p>
<p>内存池的设计是预开辟内存，就是在首次申请创建内存池的时候，就将池子里全部可以被使用的 Buf 内存空间集合一并申请开辟出来。调用方在申请内存的时候，是通过内存池来申请，内存池从 Buf 集合中选择未被使用或占用的 Buf 返回给调用方。调用方在使用完 Buf</p>
<p>之后，也是将 Buf 退还给内存池。这样调用方即使频繁的申请和回收小空间的内存也不会出现频繁的系统调用申请物理内存空间，降低了内存动态开辟的开销成本，业务方的内存访问速度也会有很大的提升。</p>
<p>下面来实现内存池 BufPool，首先在 zmem/mem/ 目录下创建 buf_pool.go 文件，在当前文件来实现 BufPool 内存池的功能，BufPool 的数据结构，代码如下所示：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf_pool.go
package mem

import (
   "sync"
)

//内存管理池类型
type Pool map[int] *Buf

//Buf内存池
type BufPool struct {
   //所有buffer的一个map集合句柄
   Pool Pool
   PoolLock sync.RWMutex

   //总buffer池的内存大小单位为KB
   TotalMem uint64
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先定义 Pool 数据类型，该类型表示管理全部 Buf 的 Map 集合，其中 Key 表示当前</p>
<p>一组 Buf 的 Capacity 容量，Value 则是一个 Buf 链表。每个 Key 下面挂载着相同 Capacity 的 Buf 集合链表，其实是 BufPool 的成员属性定义如下：</p>
<p>（1）Pool，当前内存池全部的 Buf 缓冲对象集合，是一个 Map 数据结构。</p>
<p>（2）PoolLock，对 Map 读写并发安全的读写锁。</p>
<p>（3）TotalMem，当前 BufPool 所开辟内存池申请虚拟内存的总容量。</p>
<p>接下来提供 BufPoll 的初始化构造函数方法，BufPool 作为内存池，全局应该设计成唯一，所以采用单例模式设计，下面定义公共方法 MemPool ()，用来初始化并且获取 BufPoll 单例对象，具体的实现方式如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf_pool.go

//单例对象
var bufPoolInstance *BufPool
var once sync.Once

//获取BufPool对象（单例模式）
func MemPool() *BufPool{
   once.Do(func() {
      bufPoolInstance = new(BufPool)
      bufPoolInstance.Pool = make(map[int]*Buf)
      bufPoolInstance.TotalMem = 0
      bufPoolInstance.prev = nil
      bufPoolInstance.initPool()
   })

   return bufPoolInstance
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>全局遍历指针 bufPoolInstance 作为指向 BufPool 单例实例的唯一指针，通过 Golang 标准库提供 sync.Once 来做只执行依次的 Do () 方法，来初始化 BufPool。在将 BufPool 成员均赋值完之后，最后通过 initPool () 方法来初始化内存池的内存申请布局。</p>
<p>内存申请 initPool () 会将内存的分配结构如图 17 所示。BufPool 会预先将所有要管理的 Buf 按照内存刻度大小进行分组，如 4KB 的一组，16KB 的一组等待。容量越小的 Buf，所管理的 Buf 链表的数量越多，容量越大的 Buf 数量则越少。全部的 Buf 关系通过 Map 数据结构来管理，由于 Buf 本身是链表数据结构，所以每个 Key 所对应的 Value 只需要保存头结点 Buf 信息即可，之后的 Buf 可以通过 Buf 的 Next 指针找到。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/wzJf7M0K3b.png!large" alt=""></p>
<h3 id="图-17-bufpool-内存池的内存管理布局" tabindex="-1"><a class="header-anchor" href="#图-17-bufpool-内存池的内存管理布局" aria-hidden="true">#</a> 图 17 BufPool 内存池的内存管理布局<a href="#282190">#</a></h3>
<p>BufPool 的 initPool () 初始化内存方法的具体实现如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf_pool.go

const (
   m4K int = 4096
   m16K int = 16384
   m64K int = 655535
   m256K int = 262144
   m1M int = 1048576
   m4M int = 4194304
   m8M int = 8388608
)

/*
     初始化内存池主要是预先开辟一定量的空间
  这里BufPool是一个hash，每个key都是不同空间容量
  对应的value是一个Buf集合的链表

BufPool --> [m4K]  -- Buf-Buf-Buf-Buf...(BufList)
              [m16K] -- Buf-Buf-Buf-Buf...(BufList)
              [m64K] -- Buf-Buf-Buf-Buf...(BufList)
              [m256K]-- Buf-Buf-Buf-Buf...(BufList)
              [m1M] -- Buf-Buf-Buf-Buf...(BufList)
              [m4M] -- Buf-Buf-Buf-Buf...(BufList)
              [m8M] -- Buf-Buf-Buf-Buf...(BufList)
 */
func (bp *BufPool) initPool() {
   //----> 开辟4K buf 内存池
   // 4K的Buf 预先开辟5000个，约20MB供开发者使用
   bp.makeBufList(m4K, 5000)

   //----> 开辟16K buf 内存池
   //16K的Buf 预先开辟1000个，约16MB供开发者使用
   bp.makeBufList(m16K, 1000)

   //----> 开辟64K buf 内存池
   //64K的Buf 预先开辟500个，约32MB供开发者使用
   bp.makeBufList(m64K, 500)

   //----> 开辟256K buf 内存池
   //256K的Buf 预先开辟200个，约50MB供开发者使用
   bp.makeBufList(m256K, 200)

   //----> 开辟1M buf 内存池
   //1M的Buf 预先开辟50个，约50MB供开发者使用
   bp.makeBufList(m1M, 50)

   //----> 开辟4M buf 内存池
   //4M的Buf 预先开辟20个，约80MB供开发者使用
   bp.makeBufList(m4M, 20)

   //----> 开辟8M buf 内存池
   //8M的io_buf 预先开辟10个，约80MB供开发者使用
   bp.makeBufList(m8M, 10)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 makeBufList () 为每次初始化一种刻度容量的 Buf 链表，代码实现如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf_pool.go

func (bp *BufPool) makeBufList(cap int, num int) {
   bp.Pool[cap] = NewBuf(cap)

   var prev *Buf
   prev = bp.Pool[cap]
   for i := 1; i &lt; num; i ++ {
      prev.Next = NewBuf(cap)
      prev = prev.Next
   }
   bp.TotalMem += (uint64(cap)/1024) * uint64(num)
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每次创建一行 BufList 之后，BubPool 内存池的 TotalMem 就对应增加响应申请内存的容量，这个属性就作为当前内存池已经从操作系统获取的内存总容量为多少。</p>
<p>现在 BufPool 已经具备了申请首次初始化内存池的能力，还应该提供从 BufPool 获取一个 Buf 内存的接口，也同时需要当调用方使用完后，再将内存退还给 BufPool 的接口。</p>
<h4 id="_1-获取-buf" tabindex="-1"><a class="header-anchor" href="#_1-获取-buf" aria-hidden="true">#</a> 1. 获取 Buf<a href="#b6ac54">#</a></h4>
<p>下面定义 Alloc () 方法来标识从 BufPool 中申请一个可用的 Buf 对象，具体的代码实现如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf_pool.go

package mem

import (
   "errors"
   "fmt"
   "sync"
)

const (
   //总内存池最大限制单位是Kb 所以目前限制是 5GB
   EXTRA_MEM_LIMIT int = 5 * 1024 * 1024
)

/*
   开辟一个Buf
*/
func (bp *BufPool) Alloc(N int) (*Buf, error) {
   //1 找到N最接近哪hash 组
   var index int
   if N &lt;= m4K {
      index = m4K
   } else if (N &lt;= m16K) {
      index = m16K
   } else if (N &lt;= m64K) {
      index = m64K
   } else if (N &lt;= m256K) {
      index = m256K
   } else if (N &lt;= m1M) {
      index = m1M
   } else if (N &lt;= m4M) {
      index = m4M
   } else if (N &lt;= m8M) {
      index = m8M
   } else {
      return nil, errors.New("Alloc size Too Large!");
   }

   //2 如果该组已经没有，需要额外申请，那么需要加锁保护
   bp.PoolLock.Lock()
   if bp.Pool[index] == nil {
      if (bp.TotalMem + uint64(index/1024)) >= uint64(EXTRA_MEM_LIMIT) {
         errStr := fmt.Sprintf("already use too many memory!\n")
         return nil, errors.New(errStr)
      }

      newBuf := NewBuf(index)
      bp.TotalMem += uint64(index/1024)
      bp.PoolLock.Unlock()
      fmt.Printf("Alloc Mem Size: %d KB\n", newBuf.Capacity/1024)
      return newBuf, nil
   }

   //3 如果有该组有Buf内存存在，那么得到一个Buf并返回，并且从pool中摘除该内存块
   targetBuf := bp.Pool[index]
   bp.Pool[index] = targetBuf.Next
   bp.TotalMem -= uint64(index/1024)
   bp.PoolLock.Unlock()
   targetBuf.Next = nil
   fmt.Printf("Alloc Mem Size: %d KB\n", targetBuf.Capacity/1024)
   return targetBuf, nil
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Alloc () 函数有三个关键步骤：</p>
<p>（1）如果上层需要 N 个字节的大小的空间，找到与 N 最接近的 Buf 链表集合，从当前 Buf 集合取出。</p>
<p>（2）如果该组已经没有节点使用，可以额外申请总申请长度不能够超过最大的限制大小 EXTRA_MEM_LIMIT。</p>
<p>（3）如果有该节点需要的内存块，直接取出，并且将该内存块从 BufPool 摘除。</p>
<h4 id="_2-退还-buf" tabindex="-1"><a class="header-anchor" href="#_2-退还-buf" aria-hidden="true">#</a> 2. 退还 Buf<a href="#277159">#</a></h4>
<p>定义 Revert () 方法为为退还使用后的 Buf 给 BufPool 内存池，具体的代码实现如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//当Alloc之后，当前Buf被使用完，需要重置这个Buf,需要将该buf放回pool中
func (bp *BufPool) Revert(buf *Buf) error {
   //每个buf的容量都是固定的在hash的key中取值
   index := buf.Capacity
   //重置buf中的内置位置指针
   buf.Clear()

   bp.PoolLock.Lock()
   //找到对应的hash组 buf首届点地址
   if _, ok := bp.Pool[index]; !ok {
      errStr := fmt.Sprintf("Index %d not in BufPoll!\n", index)
      return errors.New(errStr)
   }

   //将buffer插回链表头部
   buf.Next = bp.Pool[index]
   bp.Pool[index] = buf
   bp.TotalMem += uint64(index/1024)
   bp.PoolLock.Unlock()
   fmt.Printf("Revert Mem Size: %d KB\n",index/1024)

   return nil
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Revert () 会根据当前 Buf 的 Capacity 找到对应的 Hash 刻度，然后将 Buf 插入到链表的头部，在插入之前通过 Buf 的 Clear () 将 Buf 的全部有效数据清空。</p>
<h3 id="_4-4-内存池的功能单元测试" tabindex="-1"><a class="header-anchor" href="#_4-4-内存池的功能单元测试" aria-hidden="true">#</a> 4.4 内存池的功能单元测试<a href="#794861">#</a></h3>
<p>接下来对上述接口做一些单元测试，在 zmem/mem/ 目录下创建 buf_test.go 文件。</p>
<h4 id="_1-testbufpoolsetget" tabindex="-1"><a class="header-anchor" href="#_1-testbufpoolsetget" aria-hidden="true">#</a> 1.TestBufPoolSetGet<a href="#b442f3">#</a></h4>
<p>首先测试基本的 SetBytes () 和 GetBytes () 方法，单测代码编写如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf_test.go

package mem_test

import (
   "zmem/mem"
   "fmt"
   "testing"
)

func TestBufPoolSetGet(t *testing.T) {
   pool := mem.MemPool()

   buffer, err := pool.Alloc(1)
   if err != nil {
      fmt.Println("pool Alloc Error ", err)
      return
   }

   buffer.SetBytes([]byte("Aceld12345"))
   fmt.Printf("GetBytes = %+v, ToString = %s\n", buffer.GetBytes(), string(buffer.GetBytes()))
   buffer.Pop(4)
   fmt.Printf("GetBytes = %+v, ToString = %s\n", buffer.GetBytes(), string(buffer.GetBytes()))
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>单测用例是首先申请一个内存 buffer，然后设置 “Aceld12345” 内容，然后输出日志，接下来弹出有效数据 4 个字节，再打印 buffer 可以访问的合法数据，执行单元测试代码，通过如下指令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go test -run TestBufPoolSetGet
Alloc Mem Size: 4 KB
GetBytes = [65 99 101 108 100 49 50 51 52 53], ToString = Aceld12345
GetBytes = [100 49 50 51 52 53], ToString = d12345
PASS
ok      zmem/mem        0.010s

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上述结果可得出通过 Pop (4) 之后，已经弹出了 “Acel” 前 4 个字节数据。</p>
<h4 id="_2-testbufpoolcopy" tabindex="-1"><a class="header-anchor" href="#_2-testbufpoolcopy" aria-hidden="true">#</a> 2.TestBufPoolCopy<a href="#3dd246">#</a></h4>
<p>接下来测试 Buf 的 Copy () 赋值方法，具体的代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf_test.go

package mem_test

import (
   "zmem/mem"
   "fmt"
   "testing"
)

func TestBufPoolCopy(t *testing.T) {
   pool := mem.MemPool()

   buffer, err := pool.Alloc(1)
   if err != nil {
      fmt.Println("pool Alloc Error ", err)
      return
   }

   buffer.SetBytes([]byte("Aceld12345"))
   fmt.Printf("Buffer GetBytes = %+v\n", string(buffer.GetBytes()))

   buffer2, err := pool.Alloc(1)
   if err != nil {
      fmt.Println("pool Alloc Error ", err)
      return
   }
   buffer2.Copy(buffer)
   fmt.Printf("Buffer2 GetBytes = %+v\n", string(buffer2.GetBytes()))
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将 buffer 拷贝的 buffer2 中，看 buffer 存放的数据内容，执行单元测试指令和所得到的结果如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go test -run TestBufPoolCopy
Alloc Mem Size: 4 KB
Buffer GetBytes = Aceld12345
Alloc Mem Size: 4 KB
Buffer2 GetBytes = Aceld12345
PASS
ok      zmem/mem        0.008s

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-testbufpooladjust" tabindex="-1"><a class="header-anchor" href="#_3-testbufpooladjust" aria-hidden="true">#</a> 3.TestBufPoolAdjust<a href="#c6e7ed">#</a></h4>
<p>之后来针对 Buf 的 Adjust () 方法进行单元测试，相关代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/buf_test.go

package mem_test

import (
   "zmem/mem"
   "fmt"
   "testing"
)

func TestBufPoolAdjust(t *testing.T) {
   pool := mem.MemPool()

   buffer, err := pool.Alloc(4096)
   if err != nil {
      fmt.Println("pool Alloc Error ", err)
      return
   }

   buffer.SetBytes([]byte("Aceld12345"))
   fmt.Printf("GetBytes = %+v, Head = %d, Length = %d\n", buffer.GetBytes(), buffer.Head(), buffer.Length())
   buffer.Pop(4)
   fmt.Printf("GetBytes = %+v, Head = %d, Length = %d\n", buffer.GetBytes(), buffer.Head(), buffer.Length())
   buffer.Adjust()
   fmt.Printf("GetBytes = %+v, Head = %d, Length = %d\n", buffer.GetBytes(), buffer.Head(), buffer.Length())
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先 buffer 被填充 “Aceld12345”，然后打印 Head 索引和 Length 长度，然后通过 Pop 弹出有效数据 4 个字节，继续打印日志，然后通过 Adjust () 重置 Head，再输出 buffer 信息，通过下述指令执行单元测试和得到的结果如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go test -run TestBufPoolAdjust
Alloc Mem Size: 4 KB
GetBytes = [65 99 101 108 100 49 50 51 52 53], Head = 0, Length = 10
GetBytes = [100 49 50 51 52 53], Head = 4, Length = 6
GetBytes = [100 49 50 51 52 53], Head = 0, Length = 6
PASS
ok      zmem/mem        0.009s

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出第三次输出的日志 Head 已经重置为 0，且 GetBytes () 得到的有效数据没有改变。</p>
<h3 id="_4-5-内存管理应用接口" tabindex="-1"><a class="header-anchor" href="#_4-5-内存管理应用接口" aria-hidden="true">#</a> 4.5 内存管理应用接口<a href="#dc4357">#</a></h3>
<p>前面小结已经基本实现了一个简单的内存池管理，但如果希望更方便的使用，则需要对 Buf 和 BufPool 再做一层封装，这里定义新数据结构 Zbuf，对 Buf 的基本操作做已经封装，使内存管理的接口更加友好，在 zmem/mem/ 目录下创建 zbuf.go 文件，切定义数据类型 Zbuf，具体代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/zbuf.go

package mem

//应用层的buffer数据
type ZBuf struct {
   b *Buf
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来定义 Zbuf 对外提供的一些使用方法。</p>
<h4 id="_1-clear-方法" tabindex="-1"><a class="header-anchor" href="#_1-clear-方法" aria-hidden="true">#</a> 1.Clear () 方法<a href="#4a5c01">#</a></h4>
<p>Zbuf 的 Clear () 方法实则是将 ZBuf 中的 Buf 退还给 BufPool，具体代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/zbuf.go

//清空当前的ZBuf
func (zb *ZBuf) Clear() {
   if zb.b != nil {
      //将Buf重新放回到buf_pool中
      MemPool().Revert(zb.b)
      zb.b = nil
   }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Buf 的 Clear () 中调用了 MemPool () 的 Revert () 方法，回收了当前 Zbuf 中的 Buf 对象。</p>
<h4 id="_2-pop-方法" tabindex="-1"><a class="header-anchor" href="#_2-pop-方法" aria-hidden="true">#</a> 2.Pop () 方法<a href="#858518">#</a></h4>
<p>Zbuf 的 Pop () 方法对之前的 Pop 进行了一些安全性越界校验，具体代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/zbuf.go

//弹出已使用的有效长度
func (zb *ZBuf) Pop(len int) {
   if zb.b == nil || len > zb.b.Length() {
      return
   }

   zb.b.Pop(len)

   //当此时Buf的可用长度已经为0时,将Buf重新放回BufPool中
   if zb.b.Length() == 0 {
      MemPool().Revert(zb.b)
      zb.b = nil
   }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 Buf 在 Pop () 之后的有效数据长度为 0，那么就将当前 Buf 退还给 BufPool。</p>
<h4 id="_3-data-方法" tabindex="-1"><a class="header-anchor" href="#_3-data-方法" aria-hidden="true">#</a> 3.Data () 方法<a href="#0a302c">#</a></h4>
<p>Zbuf 的 Data () 方法就是返回 Buf 的数据，代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/zbuf.go

//获取Buf中的数据
func (zb *ZBuf) Data() []byte {
   if zb.b == nil {
      return nil
   }
   return zb.b.GetBytes()
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-adjust-方法" tabindex="-1"><a class="header-anchor" href="#_4-adjust-方法" aria-hidden="true">#</a> 4.Adjust () 方法<a href="#295873">#</a></h4>
<p>Zbuf 的 Adjust () 方法的封装也没有任何改变：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/zbuf.go

//重置缓冲区
func (zb *ZBuf) Adjust() {
   if zb.b != nil {
      zb.b.Adjust()
   }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-read-方法" tabindex="-1"><a class="header-anchor" href="#_5-read-方法" aria-hidden="true">#</a> 5.Read () 方法<a href="#c57d4e">#</a></h4>
<p>Zbuf 的 Read () 方法是将数据填充到 Zbuf 的 Buf 中。Read () 方法是将被填充的数据作为形参 [] byte 传递进来。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/zbuf.go

//读取数据到Buf中
func (zb *ZBuf) Read(src []byte) (err error){
   if zb.b == nil {
      zb.b, err = MemPool().Alloc(len(src))
      if err != nil {
         fmt.Println("pool Alloc Error ", err)
      }
   } else {
      if zb.b.Head() != 0 {
         return nil
      }
      if zb.b.Capacity - zb.b.Length() &lt; len(src) {
         //不够存，重新从内存池申请
         newBuf, err := MemPool().Alloc(len(src)+zb.b.Length())
         if err != nil {
            return nil
         }
         //将之前的Buf拷贝到新申请的Buf中去
         newBuf.Copy(zb.b)
         //将之前的Buf回收到内存池中
         MemPool().Revert(zb.b)
         //新申请的Buf成为当前的ZBuf
         zb.b = newBuf
      }
   }

   //将内容写进ZBuf缓冲中
   zb.b.SetBytes(src)

   return nil
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果当前 Zbuf 的 Buf 为空则会向 BufPool 中申请内存。如果传递的源数据超过的当前 Buf 所能承载的容量，那么 Zbuf 会申请一个更大的 Buf，将之前的已有的数据通过 Copy () 到新申请的 Buf 中，之后将之前的 Buf 退还给 BufPool 中。</p>
<h4 id="_6-其他可拓展方法等" tabindex="-1"><a class="header-anchor" href="#_6-其他可拓展方法等" aria-hidden="true">#</a> 6. 其他可拓展方法等<a href="#6074ee">#</a></h4>
<p>上述的 Read () 方法代表 Zbuf 从参数获取源数据，如果为了更方便的填充 Zbuf，可以封装类似接口，如 Fd 文件描述符中读取数据到 Zbuf 中、从文件读取数据到 Zbuf 中、从网络套接字读取数据到 Zbuf 中等等，相关函数原型如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//zmem/mem/zbuf.go

//读取数据从Fd文件描述符中
func (zb *ZBuf) ReadFromFd(fd int) error {
   //...
   return nil
}

//将数据写入Fd文件描述符中
func (zb *ZBuf) WriteToFd(fd int) error {
   //...
   return nil
}

//读取数据从文件中
func (zb *ZBuf) ReadFromFile(path string) error {
   //...
   return nil
}

func (zb *ZBuf) WriteToFile(path string) error {
   //...
   return nil
}

//读取数据从网络连接中
func (zb *ZBuf) ReadFromConn(conn net.Conn) error {
   //...
   return nil
}

func (zb *ZBuf) WriteToConn(conn net.Conn) error {
   //...
   return nil
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里就不一一展开的，具体实现方式和 Read () 方法类似。这样 Zbuf 就可以通过不同的媒介来填充 Buf 并且来使用，业务层只需要面向 Zbuf 就可以获取数据，无需关心具体的 IO 层逻辑。</p>
<h2 id="_5-golang-内存管理之魂-tcmalloc" tabindex="-1"><a class="header-anchor" href="#_5-golang-内存管理之魂-tcmalloc" aria-hidden="true">#</a> 5 Golang 内存管理之魂 TCMalloc<a href="#8666ff">#</a></h2>
<p>在了解 Golang 的内存管理之前，一定要了解的基本申请内存模式，即 TCMalloc（Thread Cache Malloc）。Golang 的内存管理就是基于 TCMalloc 的核心思想来构建的。本节将介绍 TCMalloc 的基础理念和结构。</p>
<h3 id="_5-1-tcmalloc" tabindex="-1"><a class="header-anchor" href="#_5-1-tcmalloc" aria-hidden="true">#</a> 5.1 TCMalloc<a href="#f5c42a">#</a></h3>
<p>TCMalloc 最大优势就是每个线程都会独立维护自己的内存池。在之前章节介绍的自定义实现的 Golang 内存池版 BufPool 实则是所有 Goroutine 或者所有线程共享的内存池，其关系如图 18 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/RhCSKk0Jl2.png!large" alt=""></p>
<h3 id="图-18-bufpool-内存池与线程-thread-的关系" tabindex="-1"><a class="header-anchor" href="#图-18-bufpool-内存池与线程-thread-的关系" aria-hidden="true">#</a> 图 18 BufPool 内存池与线程 Thread 的关系<a href="#a618fa">#</a></h3>
<p>这种内存池的设计缺点显而易见，应用方全部的内存申请均需要和全局的 BufPool 交互，为了线程的并发安全，那么频繁的 BufPool 的内存申请和退还需要加互斥和同步机制，影响了内存的使用的性能。</p>
<p>TCMalloc 则是为每个 Thread 预分配一块缓存，每个 Thread 在申请内存时首先会先从这个缓存区 ThreadCache 申请，且所有 ThreadCache 缓存区还共享一个叫 CentralCache 的中心缓存。这里假设目前 Golang 的内存管理用的是原生 TCMalloc 模式，那么线程与内存的关系将如图 19 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/DWdNm4x8Ig.png!large" alt=""></p>
<h3 id="图-19-tcmalloc-内存池与线程-thread-的关系" tabindex="-1"><a class="header-anchor" href="#图-19-tcmalloc-内存池与线程-thread-的关系" aria-hidden="true">#</a> 图 19 TCMalloc 内存池与线程 Thread 的关系<a href="#dbef1e">#</a></h3>
<p>这样做的好处其一是 ThreadCache 做为每个线程独立的缓存，能够明显的提高 Thread 获取高命中的数据，其二是 ThreadCache 也是从堆空间一次性申请，即只触发一次系统调用即可。每个 ThreadCache 还会共同访问 CentralCache，这个与 BufPool 的类似，但是设计更为精细一些。CentralCache 是所有线程共享的缓存，当 ThreadCache 的缓存不足时，就会从 CentralCache 获取，当 ThreadCache 的缓存充足或者过多时，则会将内存退还给 CentralCache。但是 CentralCache 由于共享，那么访问一定是需要加锁的。ThreadCache 作为线程独立的第一交互内存，访问无需加锁，CentralCache 则作为 ThreadCache 临时补充缓存。</p>
<p>TCMalloc 的构造不仅于此，提供了 ThreadCache 和 CentralCache 可以解决小对象内存块的申请，但是对于大块内存 Cache 显然是不适合的。 TCMalloc 将内存分为三类，如表 4 所示。</p>
<h3 id="表-4-tcmalloc-的内存分离" tabindex="-1"><a class="header-anchor" href="#表-4-tcmalloc-的内存分离" aria-hidden="true">#</a> 表 4 TCMalloc 的内存分离<a href="#da2f57">#</a></h3>
<table><thead><tr><th><strong>对象</strong></th><th><strong>容量</strong></th></tr></thead><tbody><tr><td>小对象</td><td>(0,256KB]</td></tr><tr><td>中对象</td><td>(256KB, 1MB]</td></tr><tr><td>大对象</td><td>(1MB, +∞)</td></tr></tbody></table>
<p>所以为了解决中对象和大对象的内存申请，TCMalloc 依然有一个全局共享内存堆 PageHeap，如图 20 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/eWrHJLTEdA.png!large" alt=""></p>
<h3 id="图-20-tcmalloc-中的-pageheap" tabindex="-1"><a class="header-anchor" href="#图-20-tcmalloc-中的-pageheap" aria-hidden="true">#</a> 图 20 TCMalloc 中的 PageHeap<a href="#386c1e">#</a></h3>
<p>PageHeap 也是一次系统调用从虚拟内存中申请的，PageHeap 很明显是全局的，所以访问一定是要加锁。其作用是当 CentralCache 没有足够内存时会从 PageHeap 取，当 CentralCache 内存过多或者充足，则将低命中内存块退还 PageHeap。如果 Thread 需要大对象申请超过的 Cache 容纳的内存块单元大小，也会直接从 PageHeap 获取。</p>
<h3 id="_5-2-tcmalloc-模型相关基础结构" tabindex="-1"><a class="header-anchor" href="#_5-2-tcmalloc-模型相关基础结构" aria-hidden="true">#</a> 5.2 TCMalloc 模型相关基础结构<a href="#56fa92">#</a></h3>
<p>在了解 TCMalloc 的一些内部设计结构时，首要了解的是一些 TCMalloc 定义的基本名词 Page、Span 和 Size Class。</p>
<h4 id="_1-page" tabindex="-1"><a class="header-anchor" href="#_1-page" aria-hidden="true">#</a> 1.Page<a href="#09ea37">#</a></h4>
<p>TCMalloc 中的 Page 与之前章节介绍操作系统对虚拟内存管理的 MMU 定义的物理页有相似的定义，TCMalloc 将虚拟内存空间划分为多份同等大小的 Page，每个 Page 默认是 8KB。</p>
<p>对于 TCMalloc 来说，虚拟内存空间的全部内存都按照 Page 的容量分成均等份，并且给每份 Page 标记了 ID 编号，如图 21 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/3rqWEnJnzb.png!large" alt=""></p>
<h3 id="图-21-tcmalloc-将虚拟内存平均分层-n-份-page" tabindex="-1"><a class="header-anchor" href="#图-21-tcmalloc-将虚拟内存平均分层-n-份-page" aria-hidden="true">#</a> 图 21 TCMalloc 将虚拟内存平均分层 N 份 Page<a href="#5f4cc5">#</a></h3>
<p>将 Page 进行编号的好处是，可以根据任意内存的地址指针，进行固定算法偏移计算来算出所在的 Page。</p>
<h4 id="_2-span" tabindex="-1"><a class="header-anchor" href="#_2-span" aria-hidden="true">#</a> 2.Span<a href="#ed01dc">#</a></h4>
<p>多个连续的 Page 称之为是一个 Span，其定义含义有操作系统的管理的页表相似，Page 和 Span 的关系如图 22 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/nN1qHH89RQ.png!large" alt=""></p>
<h3 id="图-22-tcmalloc-中-page-与-span-的关系" tabindex="-1"><a class="header-anchor" href="#图-22-tcmalloc-中-page-与-span-的关系" aria-hidden="true">#</a> 图 22 TCMalloc 中 Page 与 Span 的关系<a href="#31eb93">#</a></h3>
<p>TCMalloc 是以 Span 为单位向操作系统申请内存的。每个 Span 记录了第一个起始 Page 的编号 Start，和一共有多少个连续 Page 的数量 Length。</p>
<p>为了方便 Span 和 Span 之间的管理，Span 集合是以双向链表的形式构建，如图 23 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/ivmjaMfAeU.png!large" alt=""></p>
<h3 id="图-23-tcmalloc-中-span-存储形式" tabindex="-1"><a class="header-anchor" href="#图-23-tcmalloc-中-span-存储形式" aria-hidden="true">#</a> 图 23 TCMalloc 中 Span 存储形式<a href="#9508dd">#</a></h3>
<h4 id="_3-size-class" tabindex="-1"><a class="header-anchor" href="#_3-size-class" aria-hidden="true">#</a> 3.Size Class<a href="#afde87">#</a></h4>
<p>参考表 3-3 所示，在 256KB 以内的小对象，TCMalloc 会将这些小对象集合划分成多个内存刻度 <a href="#_ftn6">[6]</a>，同属于一个刻度类别下的内存集合称之为属于一个 Size Class。这与之前章节自定义实现的内存池，将 Buf 划分多个刻度的 BufList 类似。</p>
<p>每个 Size Class 都对应一个大小比如 8 字节、16 字节、32 字节等。在申请小对象内存的时候，TCMalloc 会根据使用方申请的空间大小就近向上取最接近的一个 Size Class 的 Span（由多个等空间的 Page 组成）内存块返回给使用方。</p>
<p>如果将 Size Class、Span、Page 用一张图来表示，则具体的抽象关系如图 24 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/TxIGJR26fZ.png!large" alt=""></p>
<h3 id="图-24-tcmalloc-中-size-class、page、span-的结构关系" tabindex="-1"><a class="header-anchor" href="#图-24-tcmalloc-中-size-class、page、span-的结构关系" aria-hidden="true">#</a> 图 24 TCMalloc 中 Size Class、Page、Span 的结构关系<a href="#92d255">#</a></h3>
<p>接下来剖析一下 ThreadCache、CentralCache、PageHeap 的内存管理结构。</p>
<h3 id="_5-3-threadcache" tabindex="-1"><a class="header-anchor" href="#_5-3-threadcache" aria-hidden="true">#</a> 5.3 ThreadCache<a href="#9a33c6">#</a></h3>
<p>在 TCMalloc 中每个线程都会有一份单独的缓存，就是 ThreadCache。ThreadCache 中对于每个 Size Class 都会有一个对应的 FreeList，FreeList 表示当前缓存中还有多少个空闲的内存可用，具体的结构布局如图 25 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/V85EFusAJ5.png!large" alt=""></p>
<h3 id="图-25-tcmalloc-中-threadcache" tabindex="-1"><a class="header-anchor" href="#图-25-tcmalloc-中-threadcache" aria-hidden="true">#</a> 图 25 TCMalloc 中 ThreadCache<a href="#d7e4ec">#</a></h3>
<p>使用方对于从 TCMalloc 申请的小对象，会直接从 TreadCache 获取，实则是从 FreeList 中返回一个空闲的对象，如果对应的 Size Class 刻度下已经没有空闲的 Span 可以被获取了，则 ThreadCache 会从 CentralCache 中获取。当使用方使用完内存之后，归还也是直接归还给当前的 ThreadCache 中对应刻度下的的 FreeList 中。</p>
<p>整条申请和归还的流程是不需要加锁的，因为 ThreadCache 为当前线程独享，但如果 ThreadCache 不够用，需要从 CentralCache 申请内存时，这个动作是需要加锁的。不同 Thread 之间的 ThreadCache 是以双向链表的结构进行关联，是为了方便 TCMalloc 统计和管理。</p>
<h3 id="_5-4-centralcache" tabindex="-1"><a class="header-anchor" href="#_5-4-centralcache" aria-hidden="true">#</a> 5.4 CentralCache<a href="#357cb2">#</a></h3>
<p>CentralCache 是各个线程共用的，所以与 CentralCache 获取内存交互是需要加锁的。CentralCache 缓存的 Size Class 和 ThreadCache 的一样，这些缓存都被放在 CentralFreeList 中，当 ThreadCache 中的某个 Size Class 刻度下的缓存小对象不够用，就会向 CentralCache 对应的 Size Class 刻度的 CentralFreeList 获取，同样的如果 ThreadCache 有多余的缓存对象也会退还给响应的 CentralFreeList，流程和关系如图 26 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/1dkEKE2ak9.png!large" alt=""></p>
<h3 id="图-26-tcmalloc-中-centralcache" tabindex="-1"><a class="header-anchor" href="#图-26-tcmalloc-中-centralcache" aria-hidden="true">#</a> 图 26 TCMalloc 中 CentralCache<a href="#066461">#</a></h3>
<p>CentralCache 与 PageHeap 的角色关系与 ThreadCache 与 CentralCache 的角色关系相似，当 CentralCache 出现 Span 不足时，会从 PageHeap 申请 Span，以及将不再使用的 Span 退还给 PageHeap。</p>
<h3 id="_5-5-pageheap" tabindex="-1"><a class="header-anchor" href="#_5-5-pageheap" aria-hidden="true">#</a> 5.5 PageHeap<a href="#cddb52">#</a></h3>
<p>PageHeap 是提供 CentralCache 的内存来源。PageHead 与 CentralCache 不同的是 CentralCache 是与 ThreadCache 布局一模一样的缓存，主要是起到针对 ThreadCache 的一层二级缓存作用，且只支持小对象内存分配。而 PageHeap 则是针对 CentralCache 的三级缓存。弥补对于中对象内存和大对象内存的分配，PageHeap 也是直接和操作系统虚拟内存衔接的一层缓存，当找不到 ThreadCache、CentralCache、PageHeap 都找不到合适的 Span，PageHeap 则会调用操作系统内存申请系统调用函数来从虚拟内存的堆区中取出内存填充到 PageHeap 当中，具体的结构如图 27 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/H6WUHzoNme.png!large" alt=""></p>
<h3 id="图-27-tcmalloc-中-pageheap" tabindex="-1"><a class="header-anchor" href="#图-27-tcmalloc-中-pageheap" aria-hidden="true">#</a> 图 27 TCMalloc 中 PageHeap<a href="#c70d8a">#</a></h3>
<p>PageHeap 内部的 Span 管理，采用两种不同的方式，对于 128 个 Page 以内的 Span 申请，每个 Page 刻度都会用一个链表形式的缓存来存储。对于 128 个 Page 以上内存申请，PageHeap 是以有序集合（C++ 标准库 STL 中的 Std::Set 容器）来存放。</p>
<h3 id="_5-6-tcmalloc-的小对象分配" tabindex="-1"><a class="header-anchor" href="#_5-6-tcmalloc-的小对象分配" aria-hidden="true">#</a> 5.6 TCMalloc 的小对象分配<a href="#f0d639">#</a></h3>
<p>上述已经将 TCMalloc 的几种基础结构介绍了，接下来总结一下 TCMalloc 针对小对象、中对象和大对象的分配流程。小对象分配流程如图 28 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/sFSOXbjSsK.png!large" alt=""></p>
<h3 id="图-28-tcmalloc-小对象分配流程" tabindex="-1"><a class="header-anchor" href="#图-28-tcmalloc-小对象分配流程" aria-hidden="true">#</a> 图 28 TCMalloc 小对象分配流程<a href="#198bde">#</a></h3>
<p>小对象为占用内存小于等于 256KB 的内存，参考图中的流程，下面将介绍详细流程步骤：</p>
<p>（1）Thread 用户线程应用逻辑申请内存，当前 Thread 访问对应的 ThreadCache 获取内存，此过程不需要加锁。</p>
<p>（2）ThreadCache 的得到申请内存的 SizeClass（一般向上取整，大于等于申请的内存大小），通过 SizeClass 索引去请求自身对应的 FreeList。</p>
<p>（3）判断得到的 FreeList 是否为非空。</p>
<p>（4）如果 FreeList 非空，则表示目前有对应内存空间供 Thread 使用，得到 FreeList 第一个空闲 Span 返回给 Thread 用户逻辑，流程结束。</p>
<p>（5）如果 FreeList 为空，则表示目前没有对应 SizeClass 的空闲 Span 可使用，请求 CentralCache 并告知 CentralCache 具体的 SizeClass。</p>
<p>（6）CentralCache 收到请求后，加锁访问 CentralFreeList，根据 SizeClass 进行索引找到对应的 CentralFreeList。</p>
<p>（7）判断得到的 CentralFreeList 是否为非空。</p>
<p>（8）如果 CentralFreeList 非空，则表示目前有空闲的 Span 可使用。返回多个 Span，将这些 Span（除了第一个 Span）放置 ThreadCache 的 FreeList 中，并且将第一个 Span 返回给 Thread 用户逻辑，流程结束。</p>
<p>（9）如果 CentralFreeList 为空，则表示目前没有可用是 Span 可使用，向 PageHeap 申请对应大小的 Span。</p>
<p>（10）PageHeap 得到 CentralCache 的申请，加锁请求对应的 Page 刻度的 Span 链表。</p>
<p>（11）PageHeap 将得到的 Span 根据本次流程请求的 SizeClass 大小为刻度进行拆分，分成 N 份 SizeClass 大小的 Span 返回给 CentralCache，如果有多余的 Span 则放回 PageHeap 对应 Page 的 Span 链表中。</p>
<p>（12）CentralCache 得到对应的 N 个 Span，添加至 CentralFreeList 中，跳转至第（8）步。</p>
<p>综上是 TCMalloc 一次申请小对象的全部详细流程，接下来分析中对象的分配流程。</p>
<h3 id="_5-7-tcmalloc-的中对象分配" tabindex="-1"><a class="header-anchor" href="#_5-7-tcmalloc-的中对象分配" aria-hidden="true">#</a> 5.7 TCMalloc 的中对象分配<a href="#9acd4b">#</a></h3>
<p>中对象为大于 256KB 且小于等于 1MB 的内存。对于中对象申请分配的流程 TCMalloc 与处理小对象分配有一定的区别。对于中对象分配，Thread 不再按照小对象的流程路径向 ThreadCache 获取，而是直接从 PageHeap 获取，具体的流程如图 29 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/gIEVG5Pnof.png!large" alt=""></p>
<h3 id="图-29-tcmalloc-中对象分配流程" tabindex="-1"><a class="header-anchor" href="#图-29-tcmalloc-中对象分配流程" aria-hidden="true">#</a> 图 29 TCMalloc 中对象分配流程<a href="#b4c551">#</a></h3>
<p>PageHeap 将 128 个 Page 以内大小的 Span 定义为小 Span，将 128 个 Page 以上大小的 Span 定义为大 Span。由于一个 Page 为 8KB，那么 128 个 Page 即为 1MB，所以对于中对象的申请，PageHeap 均是按照小 Span 的申请流程，具体如下：</p>
<p>（1）Thread 用户逻辑层提交内存申请处理，如果本次申请内存超过 256KB 但不超过 1MB 则属于中对象申请。TCMalloc 将直接向 PageHeap 发起申请 Span 请求。</p>
<p>（2）PageHeap 接收到申请后需要判断本次申请是否属于小 Span（128 个 Page 以内），如果是，则走小 Span，即中对象申请流程，如果不是，则进入大对象申请流程，下一节介绍。</p>
<p>（3）PageHeap 根据申请的 Span 在小 Span 的链表中向上取整，得到最适应的第 K 个 Page 刻度的 Span 链表。</p>
<p>（4）得到第 K 个 Page 链表刻度后，将 K 作为起始点，向下遍历找到第一个非空链表，直至 128 个 Page 刻度位置，找到则停止，将停止处的非空 Span 链表作为提供此次返回的内存 Span，将链表中的第一个 Span 取出。如果找不到非空链表，则当错本次申请为大 Span 申请，则进入大对象申请流程。</p>
<p>（5）假设本次获取到的 Span 由 N 个 Page 组成。PageHeap 将 N 个 Page 的 Span 拆分成两个 Span，其中一个为 K 个 Page 组成的 Span，作为本次内存申请的返回，给到 Thread，另一个为 N-K 个 Page 组成的 Span，重新插入到 N-K 个 Page 对应的 Span 链表中。</p>
<p>综上是 TCMalloc 对于中对象分配的详细流程。</p>
<h3 id="_5-8-tcmalloc-的大对象分配" tabindex="-1"><a class="header-anchor" href="#_5-8-tcmalloc-的大对象分配" aria-hidden="true">#</a> 5.8 TCMalloc 的大对象分配<a href="#7b0304">#</a></h3>
<p>对于超过 128 个 Page（即 1MB）的内存分配则为大对象分配流程。大对象分配与中对象分配情况类似，Thread 绕过 ThreadCache 和 CentralCache，直接向 PageHeap 获取。详细的分配流程如图 30 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/X4ZvnfDz7e.png!large" alt=""></p>
<h3 id="图-30-tcmalloc-大对象分配流程" tabindex="-1"><a class="header-anchor" href="#图-30-tcmalloc-大对象分配流程" aria-hidden="true">#</a> 图 30 TCMalloc 大对象分配流程<a href="#747c4e">#</a></h3>
<p>进入大对象分配流程除了申请的 Span 大于 128 个 Page 之外，对于中对象分配如果找不到非空链表也会进入大对象分配流程，大对象分配的具体流程如下：</p>
<p>（1）Thread 用户逻辑层提交内存申请处理，如果本次申请内存超过 1MB 则属于大对象申请。TCMalloc 将直接向 PageHeap 发起申请 Span 。</p>
<p>（2）PageHeap 接收到申请后需要判断本次申请是否属于小 Span（128 个 Page 以内），如果是，则走小 Span 中对象申请流程（上一节已介绍），如果不是，则进入大对象申请流程。</p>
<p>（3）PageHeap 根据 Span 的大小按照 Page 单元进行除法运算，向上取整，得到最接近 Span 的且大于 Span 的 Page 倍数 K，此时的 K 应该是大于 128。如果是从中对象流程分过来的（中对象申请流程可能没有非空链表提供 Span），则 K 值应该小于 128。</p>
<p>（4）搜索 Large Span Set 集合，找到不小于 K 个 Page 的最小 Span（N 个 Page）。如果没有找到合适的 Span，则说明 PageHeap 已经无法满足需求，则向操作系统虚拟内存的堆空间申请一堆内存，将申请到的内存安置在 PageHeap 的内存结构中，重新执行（3）步骤。</p>
<p>（5）将从 Large Span Set 集合得到的 N 个 Page 组成的 Span 拆分成两个 Span，K 个 Page 的 Span 直接返回给 Thread 用户逻辑，N-K 个 Span 退还给 PageHeap。其中如果 N-K 大于 128 则退还到 Large Span Set 集合中，如果 N-K 小于 128，则退还到 Page 链表中。</p>
<p>综上是 TCMalloc 对于大对象分配的详细流程。</p>
<h2 id="_6-golang-堆内存管理" tabindex="-1"><a class="header-anchor" href="#_6-golang-堆内存管理" aria-hidden="true">#</a> 6 Golang 堆内存管理<a href="#3d2c5c">#</a></h2>
<p>本章节将介绍 Golang 的内存管理模型，看本章节之前强烈建议读者将上述章节均阅读理解完成，更有助于理解 Golang 的内存管理机制。</p>
<h3 id="_6-1-golang-内存模型层级结构" tabindex="-1"><a class="header-anchor" href="#_6-1-golang-内存模型层级结构" aria-hidden="true">#</a> 6.1 Golang 内存模型层级结构<a href="#2a1f70">#</a></h3>
<p>Golang 内存管理模型的逻辑层次全景图，如图 31 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/uDZB3Hy50v.png!large" alt=""></p>
<h3 id="图-31-golang-内存管理模块关系" tabindex="-1"><a class="header-anchor" href="#图-31-golang-内存管理模块关系" aria-hidden="true">#</a> 图 31 Golang 内存管理模块关系<a href="#f6387d">#</a></h3>
<p>Golang 内存管理模型与 TCMalloc 的设计极其相似。基本轮廓和概念也几乎相同，只是一些规则和流程存在差异，接下来分析一下 Golang 内存管理模型的基本层级模块组成概念。</p>
<h3 id="_6-2-golang-内存管理单元相关概念" tabindex="-1"><a class="header-anchor" href="#_6-2-golang-内存管理单元相关概念" aria-hidden="true">#</a> 6.2 Golang 内存管理单元相关概念<a href="#174ec7">#</a></h3>
<p>Golang 内存管理中依然保留 TCMalloc 中的 Page、Span、Size Class 等概念。</p>
<h4 id="_1-page-1" tabindex="-1"><a class="header-anchor" href="#_1-page-1" aria-hidden="true">#</a> 1.Page<a href="#09ea37">#</a></h4>
<p>与 TCMalloc 的 Page 一致。Golang 内存管理模型延续了 TCMalloc 的概念，一个 Page 的大小依然是 8KB。Page 表示 Golang 内存管理与虚拟内存交互内存的最小单元。操作系统虚拟内存对于 Golang 来说，依然是划分成等分的 N 个 Page 组成的一块大内存公共池，如图 3.21 所示。</p>
<h4 id="_2-mspan" tabindex="-1"><a class="header-anchor" href="#_2-mspan" aria-hidden="true">#</a> 2.mSpan<a href="#c26313">#</a></h4>
<p>与 TCMalloc 中的 Span 一致。mSpan 概念依然延续 TCMalloc 中的 Span 概念，在 Golang 中将 Span 的名称改为 mSpan，依然表示一组连续的 Page。</p>
<h4 id="_3-size-class-相关" tabindex="-1"><a class="header-anchor" href="#_3-size-class-相关" aria-hidden="true">#</a> 3.Size Class 相关<a href="#006890">#</a></h4>
<p>Golang 内存管理针对 Size Class 对衡量内存的的概念又更加详细了很多，这里面介绍一些基础的有关内存大小的名词及算法。</p>
<p>（1）Object Size，是只协程应用逻辑一次向 Golang 内存申请的对象 Object 大小。Object 是 Golang 内存管理模块针对内存管理更加细化的内存管理单元。一个 Span 在初始化时会被分成多个 Object。比如 Object Size 是 8B（8 字节）大小的 Object，所属的 Span 大小是 8KB（8192 字节），那么这个 Span 就会被平均分割成 1024（8192/8=1024）个 Object。逻辑层向 Golang 内存模型取内存，实则是分配一个 Object 出去。为了更好的让读者理解，这里假设了几个数据来标识 Object Size 和 Span 的关系，如图 32 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/2fxXkOn6an.png!large" alt=""></p>
<h3 id="图-32-object-size-与-span-的关系" tabindex="-1"><a class="header-anchor" href="#图-32-object-size-与-span-的关系" aria-hidden="true">#</a> 图 32 Object Size 与 Span 的关系<a href="#b1a219">#</a></h3>
<p>上图中的 Num Of Object 表示当前 Span 中一共存在多少个 Object。</p>
<p>注意 Page 是 Golang 内存管理与操作系统交互衡量内存容量的基本单元，Golang 内存管理内部本身用来给对象存储内存的基本单元是 Object。</p>
<p>（2）Size Class，Golang 内存管理中的 Size Class 与 TCMalloc 所表示的设计含义是一致的，都表示一块内存的所属规格或者刻度。Golang 内存管理中的 Size Class 是针对 Object Size 来划分内存的。也是划分 Object 大小的级别。比如 Object Size 在 1Byte~8Byte 之间的 Object 属于 Size Class 1 级别，Object Size 在 8B~16Byte 之间的属于 Size Class 2 级别。</p>
<p>（3）Span Class，这个是 Golang 内存管理额外定义的规格属性，是针对 Span 来进行划分的，是 Span 大小的级别。一个 Size Class 会对应两个 Span Class，其中一个 Span 为存放需要 GC 扫描的对象（包含指针的对象），另一个 Span 为存放不需要 GC 扫描的对象（不包含指针的对象），具体 Span Class 与 Size Class 的逻辑结构关系如图 33 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/CDvFCKTFqv.png!large" alt=""></p>
<h3 id="图-33-span-class-与-size-class-的逻辑结构关系" tabindex="-1"><a class="header-anchor" href="#图-33-span-class-与-size-class-的逻辑结构关系" aria-hidden="true">#</a> 图 33 Span Class 与 Size Class 的逻辑结构关系<a href="#70c010">#</a></h3>
<p>其中 Size Class 和 Span Class 的对应关系计算方式可以参考 Golang 源代码，如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//usr/local/go/src/runtime/mheap.go

type spanClass uint8 

//……(省略部分代码)

func makeSpanClass(sizeclass uint8, noscan bool) spanClass {
return spanClass(sizeclass&lt;&lt;1) | spanClass(bool2int(noscan))
}

//……(省略部分代码)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里 makeSpanClass () 函数为通过 Size Class 来得到对应的 Span Class，其中第二个形参 noscan 表示当前对象是否需要 GC 扫描，不难看出来 Span Class 和 Size Class 的对应关系公式如表 3-5 所示。</p>
<h3 id="表-5-tcmalloc-的内存分离" tabindex="-1"><a class="header-anchor" href="#表-5-tcmalloc-的内存分离" aria-hidden="true">#</a> 表 5 TCMalloc 的内存分离<a href="#798f83">#</a></h3>
<table><thead><tr><th><strong>对象</strong></th><th><strong>Size Class **</strong> 与 <strong>** Span Class**</strong> 对应公式 **</th></tr></thead><tbody><tr><td>需要 GC 扫描</td><td>Span Class = Size Class * 2 + 0</td></tr><tr><td>不需要 GC 扫描</td><td>Span Class = Size Class * 2 + 1</td></tr></tbody></table>
<h4 id="_4-size-class-明细" tabindex="-1"><a class="header-anchor" href="#_4-size-class-明细" aria-hidden="true">#</a> 4.Size Class 明细<a href="#5a9565">#</a></h4>
<p>如果再具体一些，则通过 Golang 的源码可以看到，Golang 给内存池中固定划分了 66<a href="#_ftn7">[7]</a> 个 Size Class，这里面列举了详细的 Size Class 和 Object 大小、存放 Object 数量，以及每个 Size Class 对应的 Span 内存大小关系，代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//usr/local/go/src/runtime/sizeclasses.go

package runtime

// 标题Title解释：
// [class]: Size Class
// [bytes/obj]: Object Size，一次对外提供内存Object的大小
// [bytes/span]: 当前Object所对应Span的内存大小
// [objects]: 当前Span一共有多少个Object
// [tail wastre]: 为当前Span平均分层N份Object，会有多少内存浪费
// [max waste]: 当前Size Class最大可能浪费的空间所占百分比

// class  bytes/obj  bytes/span  objects  tail waste  max waste
//     1          8        8192     1024           0        87.50%
//     2         16        8192      512           0        43.75%
//     3         32        8192      256           0        46.88%
//     4         48        8192      170          32        31.52%
//     5         64        8192      128           0        23.44%
//     6         80        8192      102          32        19.07%
//     7         96        8192       85          32        15.95%
//     8        112        8192       73          16        13.56%
//     9        128        8192       64           0        11.72%
//    10        144        8192       56         128        11.82%
//    11        160        8192       51          32        9.73%
//    12        176        8192       46          96        9.59%
//    13        192        8192       42         128        9.25%
//    14        208        8192       39          80        8.12%
//    15        224        8192       36         128        8.15%
//    16        240        8192       34          32        6.62%
//    17        256        8192       32           0        5.86%
//    18        288        8192       28         128        12.16%
//    19        320        8192       25         192        11.80%
//    20        352        8192       23          96        9.88%
//    21        384        8192       21         128        9.51%
//    22        416        8192       19         288        10.71%
//    23        448        8192       18         128        8.37%
//    24        480        8192       17          32        6.82%
//    25        512        8192       16           0        6.05%
//    26        576        8192       14         128        12.33%
//    27        640        8192       12         512        15.48%
//    28        704        8192       11         448        13.93%
//    29        768        8192       10         512        13.94%
//    30        896        8192        9         128        15.52%
//    31       1024        8192        8           0        12.40%
//    32       1152        8192        7         128        12.41%
//    33       1280        8192        6         512        15.55%
//    34       1408       16384       11         896        14.00%
//    35       1536        8192        5         512        14.00%
//    36       1792       16384        9         256        15.57%
//    37       2048        8192        4           0        12.45%
//    38       2304       16384        7         256       12.46%
//    39       2688        8192        3         128        15.59%
//    40       3072       24576        8           0        12.47%
//    41       3200       16384        5         384        6.22%
//    42       3456       24576        7         384        8.83%
//    43       4096        8192        2           0        15.60%
//    44       4864       24576        5         256        16.65%
//    45       5376       16384        3         256        10.92%
//    46       6144       24576        4           0        12.48%
//    47       6528       32768        5         128        6.23%
//    48       6784       40960        6         256        4.36%
//    49       6912       49152        7         768        3.37%
//    50       8192        8192        1           0        15.61%
//    51       9472       57344        6         512        14.28%
//    52       9728       49152        5         512        3.64%
//    53      10240       40960        4           0        4.99%
//    54      10880       32768        3         128        6.24%
//    55      12288       24576        2           0        11.45%
//    56      13568       40960        3         256        9.99%
//    57      14336       57344        4           0        5.35%
//    58      16384       16384        1           0        12.49%
//    59      18432       73728        4           0        11.11%
//    60      19072       57344        3         128        3.57%
//    61      20480       40960        2           0        6.87%
//    62      21760       65536        3         256        6.25%
//    63      24576       24576        1           0        11.45%
//    64      27264       81920        3         128        10.00%
//    65      28672       57344        2           0        4.91%
//    66      32768       32768        1           0        12.50%

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面分别解释一下每一列的含义：</p>
<p>（1）Class 列为 Size Class 规格级别。</p>
<p>（2）bytes/obj 列为 Object Size，即一次对外提供内存 Object 的大小（单位为 Byte），可能有一定的浪费，比如业务逻辑层需要 2B 的数据，实则会定位到 Size Class 为 1，返回一个 Object 即 8B 的内存空间。</p>
<p>（3）bytes/span 列为当前 Object 所对应 Span 的内存大小（单位为 Byte）。</p>
<p>（4）objects 列为当前 Span 一共有多少个 Object，该字段是通过 bytes/span 和 bytes/obj 相除计算而来。</p>
<p>（5）tail waste 列为当前 Span 平均分层 N 份 Object，会有多少内存浪费，这个值是通过 bytes/span 对 bytes/obj 求余得出，即 span% obj。</p>
<p>（6）max waste 列当前 Size Class 最大可能浪费的空间所占百分比。这里面最大的情况就是一个 Object 保存的实际数据刚好是上一级 Size Class 的 Object 大小加上 1B。当前 Size Class 的 Object 所保存的真实数据对象都是这一种情况，这些全部空间的浪费再加上最后的 tail waste 就是 max waste 最大浪费的内存百分比，具体如图 34 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/z1KuvVWFyd.png!large" alt=""></p>
<h3 id="图-34-max-waste-最大浪费空间计算公式" tabindex="-1"><a class="header-anchor" href="#图-34-max-waste-最大浪费空间计算公式" aria-hidden="true">#</a> 图 34 Max Waste 最大浪费空间计算公式<a href="#d6e708">#</a></h3>
<p>图中以 Size Class 为 7 的 Span 为例，通过源代码 runtime/sizeclasses.go 的详细 Size Class 数据可以得知具体 Span 细节如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// class  bytes/obj  bytes/span  objects  tail waste  max waste

// … …
//     6         80        8192      102          32        19.07%
//     7         96        8192       85          32        15.95%
// … …

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从图 3.34 可以看出，Size Class 为 7 的 Span 如果每个 Object 均超过 Size Class 为 7 中的 Object 一个字节。那么就会导致 Size Class 为 7 的 Span 出现最大空间浪费情况。综上可以得出计算最大浪费空间比例的算法公式如下：</p>
<blockquote>
<p>(本级 Object Size – (上级 Object Size + 1)* 本级 Object 数量) / 本级 Span Size</p>
</blockquote>
<h3 id="_6-3-mcache" tabindex="-1"><a class="header-anchor" href="#_6-3-mcache" aria-hidden="true">#</a> 6.3 MCache<a href="#aeb07c">#</a></h3>
<p>从概念来讲 MCache 与 TCMalloc 的 ThreadCache 十分相似，访问 mcache 依然不需要加锁而是直接访问，且 MCache 中依然保存各种大小的 Span。</p>
<p>虽然 MCache 与 ThreadCache 概念相似，二者还是存在一定的区别的，MCache 是与 Golang 协程调度模型 GPM 中的 P 所绑定，而不是和线程绑定。因为 Golang 调度的 GPM 模型，真正可运行的线程 M 的数量与 P 的数量一致，即 GOMAXPROCS 个，所以 MCache 与 P 进行绑定更能节省内存空间使用，可以保证每个 G 使用 MCache 时不需要加锁就可以获取到内存。而 TCMalloc 中的 ThreadCache 随着 Thread 的增多，ThreadCache 的数量也就相对成正比增多，二者绑定关系的区别如图 35 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/Eoa2O9XiiT.png!large" alt=""></p>
<h3 id="图-35-threadcache-与-mcache-的绑定关系区别" tabindex="-1"><a class="header-anchor" href="#图-35-threadcache-与-mcache-的绑定关系区别" aria-hidden="true">#</a> 图 35 ThreadCache 与 mcache 的绑定关系区别<a href="#164589">#</a></h3>
<p>如果将图 35 的 mcache 展开，来看 mcache 的内部构造，则具体的结构形式如图 36 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/kbkO9zhs1K.png!large" alt=""></p>
<h3 id="图-36-mcache-内部构造" tabindex="-1"><a class="header-anchor" href="#图-36-mcache-内部构造" aria-hidden="true">#</a> 图 36 MCache 内部构造<a href="#cffe4d">#</a></h3>
<p>协程逻辑层从 mcache 上获取内存是不需要加锁的，因为一个 P 只有一个 M 在其上运行，不可能出现竞争，由于没有锁限制，mcache 则其到了加速内存分配。</p>
<p>MCache 中每个 Span Class 都会对应一个 MSpan，不同 Span Class 的 MSpan 的总体长度不同，参考 runtime/sizeclasses.go 的标准规定划分。比如对于 Span Class 为 4 的 MSpan 来说，存放内存大小为 1Page，即 8KB。每个对外提供的 Object 大小为 16B，共存放 512 个 Object。其他 Span Class 的存放方式类似。当其中某个 Span Class 的 MSpan 已经没有可提供的 Object 时，MCache 则会向 MCentral 申请一个对应的 MSpan。</p>
<p>在图 3.36 中应该会发现，对于 Span Class 为 0 和 1 的，也就是对应 Size Class 为 0 的规格刻度内存，mcache 实际上是没有分配任何内存的。因为 Golang 内存管理对内存为 0 的数据申请做了特殊处理，如果申请的数据大小为 0 将直接返回一个固定内存地址，不会走 Golang 内存管理的正常逻辑，相关 Golang 源代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//usr/local/go/src/runtime/malloc.go

// Al Allocate an object of size bytes.                                     
// Sm Small objects are allocated from the per-P cache's free lists.        
// La Large objects (> 32 kB) are allocated straight from the heap.         
func mallocgc(size uintptr, typ *_type, needzero bool) unsafe.Pointer {                        
// ……（省略部分代码）

if size == 0 {
return unsafe.Pointer(&amp;zerobase)
}

//……（省略部分代码）
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码可以看见，如果申请的 size 为 0，则直接 return 一个固定地址 zerobase。下面来测试一下有关 0 空间申请的情况，在 Golang 中如 [0] int、 struct {} 所需要大小均是 0，这也是为什么很多开发者在通过 Channel 做同步时，发送一个 struct {} 数据，因为不会申请任何内存，能够适当节省一部分内存空间，测试代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//第一篇/chapter3/MyGolang/zeroBase.go
package main

import (
"fmt"
)

func main() {
var (
//0内存对象
a struct{}
b [0]int

//100个0内存struct{}
c [100]struct{}

//100个0内存struct{},make申请形式
d = make([]struct{}, 100)
)

fmt.Printf("%p\n", &amp;a)
fmt.Printf("%p\n", &amp;b)
fmt.Printf("%p\n", &amp;c[50])    //取任意元素
fmt.Printf("%p\n", &amp;(d[50]))  //取任意元素
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go run zeroBase.go 
0x11aac78
0x11aac78
0x11aac78
0x11aac78

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从结果可以看出，全部的 0 内存对象分配，返回的都是一个固定的地址。</p>
<h3 id="_6-4-mcentral" tabindex="-1"><a class="header-anchor" href="#_6-4-mcentral" aria-hidden="true">#</a> 6.4 MCentral<a href="#fa0bbd">#</a></h3>
<p>MCentral 与 TCMalloc 中的 Central 概念依然相似。向 MCentral 申请 Span 是同样是需要加锁的。当 MCache 中某个 Size Class 对应的 Span 被一次次 Object 被上层取走后，如果出现当前 Size Class 的 Span 空缺情况，MCache 则会向 MCentral 申请对应的 Span。Goroutine、MCache、MCentral、MHeap 互相交换的内存单位是不同，具体如图 37 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/qK281tfKAX.png!large" alt=""></p>
<h3 id="图-37-golang-内存管理各层级内存交换单位" tabindex="-1"><a class="header-anchor" href="#图-37-golang-内存管理各层级内存交换单位" aria-hidden="true">#</a> 图 37 Golang 内存管理各层级内存交换单位<a href="#cd06d7">#</a></h3>
<p>其中协程逻辑层与 MCache 的内存交换单位是 Object，MCache 与 MCentral 的内存交换单位是 Span，而 MCentral 与 MHeap 的内存交换单位是 Page。</p>
<p>MCentral 与 TCMalloc 中的 Central 不同的是 MCentral 针对每个 Span Class 级别有两个 Span 链表，而 TCMalloc 中的 Central 只有一个。MCentral 的内部构造如图 38 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/6NQvk0q25r.png!large" alt=""></p>
<h3 id="图-38-mcentral-的内部构造" tabindex="-1"><a class="header-anchor" href="#图-38-mcentral-的内部构造" aria-hidden="true">#</a> 图 38 MCentral 的内部构造<a href="#673623">#</a></h3>
<p>MCentral 与 MCCache 不同的是，每个级别保存的不是一个 Span，而是一个 Span List 链表。与 TCMalloc 中的 Central 不同的是，MCentral 每个级别都保存了两个 Span List。</p>
<p><strong>注意 图 38 中 MCentral 是表示一层抽象的概念，实际上每个 Span Class 对应的内存数据结构是一个 mcentral，即在 MCentral 这层数据管理中，实际上有 Span Class 个 mcentral 小内存管理单元。</strong></p>
<p><strong>1）NonEmpty Span List</strong></p>
<p>表示还有可用空间的 Span 链表。链表中的所有 Span 都至少有 1 个空闲的 Object 空间。如果 MCentral 上游 MCache 退还 Span，会将退还的 Span 加入到 NonEmpty Span List 链表中。</p>
<p><strong>2）Empty Span List</strong></p>
<p>表示没有可用空间的 Span 链表。该链表上的 Span 都不确定否还有有空闲的 Object 空间。如果 MCentral 提供给一个 Span 给到上游 MCache，那么被提供的 Span 就会加入到 Empty List 链表中。</p>
<p><strong>注意 在 Golang 1.16 版本之后，MCentral 中的 NonEmpty Span List 和 Empty Span List</strong></p>
<p><strong>均由链表管理改成集合管理，分别对应 Partial Span Set 和 Full Span Set。虽然存储的数据结构有变化，但是基本的作用和职责没有区别。</strong></p>
<p>下面是 MCentral 层级中其中一个 Size Class 级别的 MCentral 的定义 Golang 源代码（V1.14 版本）：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//usr/local/go/src/runtime/mcentral.go  , Go V1.14

// Central list of free objects of a given size.
// go:notinheap
type mcentral struct {
lock      mutex      //申请MCentral内存分配时需要加的锁

spanclass spanClass //当前哪个Size Class级别的

// list of spans with a free object, ie a nonempty free list
// 还有可用空间的Span 链表
nonempty  mSpanList 

// list of spans with no free objects (or cached in an mcache)
// 没有可用空间的Span链表，或者当前链表里的Span已经交给mcache
empty     mSpanList 

// nmalloc is the cumulative count of objects allocated from
// this mcentral, assuming all spans in mcaches are
// fully-allocated. Written atomically, read under STW.
// nmalloc是从该mcentral分配的对象的累积计数
// 假设mcaches中的所有跨度都已完全分配。
// 以原子方式书写，在STW下阅读。
nmalloc uint64
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 GolangV1.16 及之后版本（截止本书编写最新时间）的相关 MCentral 结构代码如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//usr/local/go/src/runtime/mcentral.go  , Go V1.16+

//…

type mcentral struct {
// mcentral对应的spanClass
spanclass spanClass

partial  [2]spanSet // 维护全部空闲的Span集合
full     [2]spanSet // 维护存在非空闲的Span集合
}

//…

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新版本的改进是将 List 变成了两个 Set 集合，Partial 集合与 NonEmpty Span List 责任类似，Full 集合与 Empty Span List 责任类似。可以看见 Partial 和 Full 都是一个 [2] spanSet 类型，也就每个 Partial 和 Full 都各有两个 spanSet 集合，这是为了给 GC 垃圾回收来使用的，其中一个集合是已扫描的，另一个集合是未扫描的。</p>
<h3 id="_6-5-mheap" tabindex="-1"><a class="header-anchor" href="#_6-5-mheap" aria-hidden="true">#</a> 6.5 MHeap<a href="#577c48">#</a></h3>
<p>Golang 内存管理的 MHeap 依然是继承 TCMalloc 的 PageHeap 设计。MHeap 的上游是 MCentral，MCentral 中的 Span 不够时会向 MHeap 申请。MHeap 的下游是操作系统，MHeap 的内存不够时会向操作系统的虚拟内存空间申请。访问 MHeap 获取内存依然是需要加锁的。</p>
<p>MHeap 是对内存块的管理对象，是通过 Page 为内存单元进行管理。那么用来详细管理每一系列 Page 的结构称之为一个 HeapArena，它们的逻辑层级关系如图 39 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/rrio7zjjY4.png!large" alt=""></p>
<h3 id="图-39-mheap-内部逻辑层级构造" tabindex="-1"><a class="header-anchor" href="#图-39-mheap-内部逻辑层级构造" aria-hidden="true">#</a> 图 39 MHeap 内部逻辑层级构造<a href="#48d946">#</a></h3>
<p>一个 HeapArena 占用内存 64MB<a href="#_ftn8">[8]</a>，其中里面的内存的是一个一个的 mspan，当然最小单元依然是 Page，图中没有表示出 mspan，因为多个连续的 page 就是一个 mspan。所有的 HeapArena 组成的集合是一个 Arenas，也就是 MHeap 针对堆内存的管理。MHeap 是 Golang 进程全局唯一的所以访问依然加锁。图中又出现了 MCentral，因为 MCentral 本也属于 MHeap 中的一部分。只不过会优先从 MCentral 获取内存，如果没有 MCentral 会从 Arenas 中的某个 HeapArena 获取 Page。</p>
<p>如果再详细剖析 MHeap 里面相关的数据结构和指针依赖关系，可以参考图 40，这里不做过多解释，如果更像详细理解 MHeap 建议研读源代码 /usr/local/go/src/runtime/mheap.go 文件。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/VmLPHYEJAb.png!large" alt=""></p>
<h3 id="图-40-mheap-数据结构引用依赖" tabindex="-1"><a class="header-anchor" href="#图-40-mheap-数据结构引用依赖" aria-hidden="true">#</a> 图 40 MHeap 数据结构引用依赖<a href="#110ffe">#</a></h3>
<p>MHeap 中 HeapArena 占用了绝大部分的空间，其中每个 HeapArean 包含一个 bitmap，其作用是用于标记当前这个 HeapArena 的内存使用情况。其主要是服务于 GC 垃圾回收模块，bitmap 共有两种标记，一个是标记对应地址中是否存在对象，一个是标记此对象是否被 GC 模块标记过，所以当前 HeapArena 中的所有 Page 均会被 bitmap 所标记。</p>
<p>ArenaHint 为寻址 HeapArena 的结构，其有三个成员：</p>
<p>（1）addr，为指向的对应 HeapArena 首地址。</p>
<p>（2）down，为当前的 HeapArena 是否可以扩容。</p>
<p>（3）next，指向下一个 HeapArena 所对应的 ArenaHint 首地址。</p>
<p>从图 3.40 中可以看出，MCentral 实际上就是隶属于 MHeap 的一部分，从数据结构来看，每个 Span Class 对应一个 MCentral，而之前在分析 Golang 内存管理中的逻辑分层中，是将这些 MCentral 集合统一归类为 MCentral 层。</p>
<h3 id="_6-6-tiny-对象分配流程" tabindex="-1"><a class="header-anchor" href="#_6-6-tiny-对象分配流程" aria-hidden="true">#</a> 6.6 Tiny 对象分配流程<a href="#29cd9c">#</a></h3>
<p>在之前章节的表 3-4 中可以得到 TCMalloc 将对象分为了小对象、中对象、和大对象，而 Golang 内存管理将对象的分类进行了更细的一些划分，具体的划分区别对比如表 6 所示。</p>
<h3 id="表-6-golang-内存与-tcmalloc-对内存的分类对比" tabindex="-1"><a class="header-anchor" href="#表-6-golang-内存与-tcmalloc-对内存的分类对比" aria-hidden="true">#</a> 表 6 Golang 内存与 TCMalloc 对内存的分类对比<a href="#4caa71">#</a></h3>
<table><thead><tr><th><strong>TCMalloc</strong></th><th><strong>Golang</strong></th></tr></thead><tbody><tr><td>小对象</td><td>Tiny 对象</td></tr><tr><td>中对象</td><td>小对象</td></tr><tr><td>大对象</td><td>大对象</td></tr></tbody></table>
<p>针对 Tiny 微小对象的分配，实际上 Golang 做了比较特殊的处理，之前在介绍 MCache 的时候并没有提及有关 Tiny 的存储和分配问题，MCache 中不仅保存着各个 Span Class 级别的内存块空间，还有一个比较特殊的 Tiny 存储空间，如图 41 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/uGkWn9hFmu.png!large" alt=""></p>
<h3 id="图-41-mcache-中的-tiny-空间" tabindex="-1"><a class="header-anchor" href="#图-41-mcache-中的-tiny-空间" aria-hidden="true">#</a> 图 41 MCache 中的 Tiny 空间<a href="#0232e6">#</a></h3>
<p>Tiny 空间是从 Size Class = 2（对应 Span Class = 4 或 5）中获取一个 16B 的 Object，作为 Tiny 对象的分配空间。对于 Golang 内存管理为什么需要一个 Tiny 这样的 16B 空间，原因是因为如果协程逻辑层申请的内存空间小于等于 8B，那么根据正常的 Size Class 匹配会匹配到 Size Class = 1（对应 Span Class = 2 或 3），所以像 int32、 byte、 bool 以及小字符串等经常使用的 Tiny 微小对象，也都会使用从 Size Class = 1 申请的这 8B 的空间。但是类似 bool 或者 1 个字节的 byte，也都会各自独享这 8B 的空间，进而导致有一定的内存空间浪费，如图 42 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/MMIyWhR3Bi.png!large" alt=""></p>
<h3 id="图-42-如果微小对象不存在-tiny-空间中" tabindex="-1"><a class="header-anchor" href="#图-42-如果微小对象不存在-tiny-空间中" aria-hidden="true">#</a> 图 42 如果微小对象不存在 Tiny 空间中<a href="#fa8240">#</a></h3>
<p>可以看出来这样当大量的使用微小对象可能会对 Size Class = 1 的 Span 造成大量的浪费。所以 Golang 内存管理决定尽量不使用 Size Class = 1 的 Span，而是将申请的 Object 小于 16B 的申请统一归类为 Tiny 对象申请。具体的申请流程如图 43 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/tGQtrTmWNl.png!large" alt=""></p>
<h3 id="图-43-mcache-中-tiny-微小对象分配流程" tabindex="-1"><a class="header-anchor" href="#图-43-mcache-中-tiny-微小对象分配流程" aria-hidden="true">#</a> 图 43 MCache 中 Tiny 微小对象分配流程<a href="#a29912">#</a></h3>
<p>MCache 中对于 Tiny 微小对象的申请流程如下：</p>
<p>（1）P 向 MCache 申请微小对象如一个 Bool 变量。如果申请的 Object 在 Tiny 对象的大小范围则进入 Tiny 对象申请流程，否则进入小对象或大对象申请流程。</p>
<p>（2）判断申请的 Tiny 对象是否包含指针，如果包含则进入小对象申请流程（不会放在 Tiny 缓冲区，因为需要 GC 走扫描等流程）。</p>
<p>（3）如果 Tiny 空间的 16B 没有多余的存储容量，则从 Size Class = 2（即 Span Class = 4 或 5）的 Span 中获取一个 16B 的 Object 放置 Tiny 缓冲区。</p>
<p>（4）将 1B 的 Bool 类型放置在 16B 的 Tiny 空间中，以字节对齐的方式。</p>
<p>Tiny 对象的申请也是达不到内存利用率 100% 的，就上述图 43 为例，当前 Tiny 缓冲 16B 的内存利用率为，而如果不用 Tiny 微小对象的方式来存储，那么内存的布局将如图 44 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/Wul3ss2Vdd.png!large" alt=""></p>
<h3 id="图-44-不用-tiny-缓冲存储情况" tabindex="-1"><a class="header-anchor" href="#图-44-不用-tiny-缓冲存储情况" aria-hidden="true">#</a> 图 44 不用 Tiny 缓冲存储情况<a href="#5b7e70">#</a></h3>
<p>可以算出利用率为。Golang 内存管理通过 Tiny 对象的处理，可以平均节省 20% 左右的内存。</p>
<h3 id="_6-7-小对象分配流程" tabindex="-1"><a class="header-anchor" href="#_6-7-小对象分配流程" aria-hidden="true">#</a> 6.7 小对象分配流程<a href="#934f71">#</a></h3>
<p>上节已经介绍了分配在 1B 至 16B 的 Tiny 对象的分配流程，那么对于对象在 16B 至 32B 的内存分配，Golang 会采用小对象的分配流程。</p>
<p>分配小对象的标准流程是按照 Span Class 规格匹配的。在之前介绍 MCache 的内部构造已经介绍了，MCache 一共有 67 份 Size Class 其中 Size Class 为 0 的做了特殊的处理直接返回一个固定的地址。Span Class 为 Size Class 的二倍，也就是从 0 至 133 共 134 个 Span Class。</p>
<p>当协程逻辑层 P 主动申请一个小对象的时候，Golang 内存管理的内存申请流程如图 45 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/v0iUFYrCxc.png!large" alt=""></p>
<h3 id="图-45-golang-小对象内存分配流程" tabindex="-1"><a class="header-anchor" href="#图-45-golang-小对象内存分配流程" aria-hidden="true">#</a> 图 45 Golang 小对象内存分配流程<a href="#a7c16d">#</a></h3>
<p>下面来分析一下具体的流程过程：</p>
<p>（1）首先协程逻辑层 P 向 Golang 内存管理申请一个对象所需的内存空间。</p>
<p>（2）MCache 在接收到请求后，会根据对象所需的内存空间计算出具体的大小 Size。</p>
<p>（3）判断 Size 是否小于 16B，如果小于 16B 则进入 Tiny 微对象申请流程，否则进入小对象申请流程。</p>
<p>（4）根据 Size 匹配对应的 Size Class 内存规格，再根据 Size Class 和该对象是否包含指针，来定位是从 noscan Span Class 还是 scan Span Class 获取空间，没有指针则锁定 noscan。</p>
<p>（5）在定位的 Span Class 中的 Span 取出一个 Object 返回给协程逻辑层 P，P 得到内存空间，流程结束。</p>
<p>（6）如果定位的 Span Class 中的 Span 所有的内存块 Object 都被占用，则 MCache 会向 MCentral 申请一个 Span。</p>
<p>（7）MCentral 收到内存申请后，优先从相对应的 Span Class 中的 NonEmpty Span List（或 Partial Set，Golang V1.16+）里取出 Span（多个 Object 组成），NonEmpty Span List 没有则从 Empty List（或 Full Set Golang V1.16+）中取，返回给 MCache。</p>
<p>（8）MCache 得到 MCentral 返回的 Span，补充到对应的 Span Class 中，之后再次执行第（5）步流程。</p>
<p>（9）如果 Empty Span List（或 Full Set）中没有符合条件的 Span，则 MCentral 会向 MHeap 申请内存。</p>
<p>（10）MHeap 收到内存请求从其中一个 HeapArena 从取出一部分 Pages 返回给 MCentral，当 MHeap 没有足够的内存时，MHeap 会向操作系统申请内存，将申请的内存也保存到 HeapArena 中的 mspan 中。MCentral 将从 MHeap 获取的由 Pages 组成的 Span 添加到对应的 Span Class 链表或集合中，作为新的补充，之后再次执行第（7）步。</p>
<p>（11）最后协程业务逻辑层得到该对象申请到的内存，流程结束。</p>
<h3 id="_6-8-大对象分配流程" tabindex="-1"><a class="header-anchor" href="#_6-8-大对象分配流程" aria-hidden="true">#</a> 6.8 大对象分配流程<a href="#9589ee">#</a></h3>
<p>小对象是在 MCache 中分配的，而大对象是直接从 MHeap 中分配。对于不满足 MCache 分配范围的对象，均是按照大对象分配流程处理。</p>
<p>大对象分配流程是协程逻辑层直接向 MHeap 申请对象所需要的适当 Pages，从而绕过从 MCaceh 到 MCentral 的繁琐申请内存流程，大对象的内存分配流程相对比较简单，具体的流程如图 46 所示。</p>
<p><img src="https://cdn.learnku.com/uploads/images/202205/23/58489/uW9ClvLmCi.png!large" alt="sad"></p>
<h3 id="图-46-golang-大对象内存分配流程" tabindex="-1"><a class="header-anchor" href="#图-46-golang-大对象内存分配流程" aria-hidden="true">#</a> 图 46 Golang 大对象内存分配流程<a href="#be8a6d">#</a></h3>
<p>下面来分析一下具体的大对象内存分配流程：</p>
<p>（1）协程逻辑层申请大对象所需的内存空间，如果超过 32KB，则直接绕过 MCache 和 MCentral 直接向 MHeap 申请。</p>
<p>（2）MHeap 根据对象所需的空间计算得到需要多少个 Page。</p>
<p>（3）MHeap 向 Arenas 中的 HeapArena 申请相对应的 Pages。</p>
<p>（4）如果 Arenas 中没有 HeapA 可提供合适的 Pages 内存，则向操作系统的虚拟内存申请，且填充至 Arenas 中。</p>
<p>（5）MHeap 返回大对象的内存空间。</p>
<p>（6）协程逻辑层 P 得到内存，流程结束。</p>
<h2 id="_7-小结" tabindex="-1"><a class="header-anchor" href="#_7-小结" aria-hidden="true">#</a> 7 小结<a href="#c55eda">#</a></h2>
<p>本章从操作系统的虚拟内存申请到 Golang 内存模型进行的理论的推进和逐层剖析。通过本章的内存，可以了解到无论是操作系统虚拟内存管理，还是 C++ 的 TCMalloc、Golang 内存模型，均有一个共同特点，就是分层的缓存机制。针对不同的内存场景采用不同的独特解决方式，提高局部性逻辑和细微粒度内存的复用率。这也是程序设计的至高理念。</p>
<p><a href="#_ftnref1">[1]</a> PTE 是 Page Table Entry 的缩写，表示页表条目。PTE 是由一个有效位和 N 位地址字段构成，能够有效标识这个虚拟内存地址是否分配了物理内存。</p>
<p><a href="#_ftnref2">[2]</a>CPU 每次访问虚拟内存，虚拟地址都必须转换为对应的物理地址。从概念上说，这个转换需要遍历页表，页表是三级页表，就需要 3 次内存访问。就是说，每次虚拟内存访问都会导致 4 次物理内存访问。简单点说，如果一次虚拟内存访问对应了 4 次物理内存访问，肯定比 1 次物理访问慢，这样虚拟内存肯定不会发展起来。幸运的是，有一个聪明的做法解决了大部分问题：现代 CPU 使用一小块关联内存，用来缓存最近访问的虚拟页的 PTE。这块内存称为 <em>translation lookaside buffer</em>(TLB)，参考《<a href="https://www.informit.com/store/ia-64-linux-kernel-design-and-implementation-9780130610140?w_ptgrevartcl=Virtual+Memory+in+the+IA-64+Linux+Kernel_29961" target="_blank" rel="noopener noreferrer">IA-64 Linux Kernel: Design and Implementation<ExternalLinkIcon/></a>》</p>
<p><a href="#_ftnref3">[3]</a> 一个虚拟地址 VA（Virtual Address）= 虚拟页号 VPN + 虚拟页偏移量 VPO。</p>
<p><a href="#_ftnref4">[4]</a> 一个物理地址 PA（Physical Address）= 物理页号 PPN * 页长度 PageSize+ 物理页号偏移 PPO（Physical Page Offset）</p>
<p><a href="#_ftnref5">[5]</a> Man 手册页（Manua pages，缩写 man page）是在 Linux 操作系统在线软件文档的一种普遍形式。内容包括计算机程序库和系统调用等命令的帮助手册。</p>
<p><a href="#_ftnref6">[6]</a> TCMalloc 官方文档称一共划分 88 个 size-classes，“Each small object size maps to one of approximately 88 allocatable size-classes”，参考《TCMalloc : Thread-Caching Malloc》<a href="https://gperftools.github.io/gperftools/tcmalloc.html" target="_blank" rel="noopener noreferrer">gperftools.github.io/gperftools/tc...<ExternalLinkIcon/></a></p>
<p><a href="#_ftnref7">[7]</a> 参考 Golang 1.14 版本，其中还有扩展到 128 个 size class 的对应关系，本书不详细介绍，具体细节参考 Golang 源码 /usr/local/go/src/runtime/sizeclasses.go 文件。</p>
<p><a href="#_ftnref8">[8]</a> 在 Linux64 位操作系统上。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/39.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/41.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


