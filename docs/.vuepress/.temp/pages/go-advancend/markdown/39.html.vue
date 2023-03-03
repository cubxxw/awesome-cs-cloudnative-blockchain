<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第39节-内存管理" tabindex="-1"><a class="header-anchor" href="#第39节-内存管理" aria-hidden="true">#</a> 第39节 内存管理</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/38.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="内存管理" tabindex="-1"><a class="header-anchor" href="#内存管理" aria-hidden="true">#</a> 内存管理</h2>
<p>程序中的数据和变量都会被分配到程序所在的虚拟内存中</p>
<p>内存空间包含两个重要区域：</p>
<ul>
<li>栈区（Stack）</li>
<li>堆区（Heap）</li>
</ul>
<p>函数调用的参数、返回值以及局部变量大都会被分配到栈上，这部分内存会由编译器进行管理；不同编程语言使用不同的方法管理堆区的内存，C++ 等编程语言会由工程师主动申请和释放内存，Go 以及 Java 等编程语言会由工程师和编译器共同管理，堆中的对象由内存分配器分配并由垃圾收集器回收。</p>
<blockquote>
<p>对于 Java 和 Golang 所推崇的内存管理方式是： 手动管理麻烦而且容易出错。我有能力来帮你做内存管理</p>
<p>对于 C 和 CPP 所推崇的内存管理的方式是： 内存管理太重要了，所以如果交给机器管理我不能放心。</p>
</blockquote>
<h2 id="设计原理" tabindex="-1"><a class="header-anchor" href="#设计原理" aria-hidden="true">#</a> 设计原理</h2>
<p>内存管理一般包含三个不同的组件，分别是用户程序（Mutator）、分配器（Allocator）和收集器（Collector），当用户程序申请内存时，它会通过内存分配器申请新内存，而分配器会负责从堆中初始化相应的内存区域。</p>
<p><img src="http://sm.nsddd.top/sm202303011635560.png" alt="image-20230301163511423"></p>
<p>在前两节，我们学习到了 Heap：</p>
<p><code v-pre>Heap</code>：堆空间。这个就是程序里动态分配的空间。linux下使用malloc调用扩展（用brk/sbrk扩展内存空间），free函数释放（也就是缩减内存空间）</p>
<p>对于 Go语言 来说，就是有 Conllector（垃圾回收器），回收内存空间，经常去扫描。</p>
<ul>
<li>初始化连续内存块作为堆</li>
<li>在内存申请的时候，Allocator 从堆内存的未分配区域分割小的内存块</li>
<li>用链表将已经分配的内存链接</li>
<li>需要信息扫描每个内存块的 元数据 （matedata) ：大小、时候使用、下一个内存块的地址</li>
<li>内存回收就是扫描堆空间，将不在使用的内存设置为 <code v-pre>unused</code></li>
</ul>
<p><strong>Go语言的内存分配器怎么样？</strong></p>
<blockquote>
<p>Go 语言的内存分配器实现非常复杂，在分析内存分配器的实现之前，我们需要了解内存分配的设计原理，掌握内存的分配过程。这里会详细介绍内存分配器的分配方法以及 Go 语言内存分配器的分级分配、虚拟内存布局和地址空间。</p>
</blockquote>
<h3 id="分配方法" tabindex="-1"><a class="header-anchor" href="#分配方法" aria-hidden="true">#</a> 分配方法</h3>
<p>编程语言的内存分配器一般包含两种分配方法，</p>
<ul>
<li>一种是线性分配器（Sequential Allocator，Bump Allocator）</li>
<li>另一种是空闲链表分配器（Free-List Allocator）</li>
</ul>
<h4 id="线性分配器" tabindex="-1"><a class="header-anchor" href="#线性分配器" aria-hidden="true">#</a> 线性分配器</h4>
<p><strong>线性分配（Bump Allocator）是一种高效的内存分配方法</strong>，但是有较大的局限性。当我们使用线性分配器时，只需要在内存中维护一个指向内存特定位置的指针，如果用户程序向分配器申请内存，分配器只需要检查剩余的空闲内存、返回分配的内存区域并修改指针在内存中的位置，即移动下图中的指针：</p>
<p><img src="http://sm.nsddd.top/sm202303011642926.png" alt="image-20230301164247852"></p>
<p>虽然线性分配器实现为它带来了较快的执行速度以及较低的实现复杂度，<strong>但是线性分配器无法在内存被释放时重用内存。</strong></p>
<p>如下图所示，如果已经分配的内存被回收，线性分配器无法重新利用红色的内存：</p>
<p><img src="http://sm.nsddd.top/sm202303011647507.png" alt="image-20230301164710407"></p>
<p>因为线性分配器具有上述特性，<strong>所以需要与合适的垃圾回收算法配合使用</strong>，例如：标记压缩（Mark-Compact）、复制回收（Copying GC）和分代回收（Generational GC）等算法，它们可以通过拷贝的方式整理存活对象的碎片，将空闲内存定期合并，这样就能利用线性分配器的效率提升内存分配器的性能了。</p>
<p><strong>因为线性分配器需要与具有拷贝特性的垃圾回收算法配合，所以 C 和 C++ 等需要直接对外暴露指针的语言就无法使用该策略</strong>，我们会在下一节详细介绍常见垃圾回收算法的设计原理。</p>
<h4 id="空闲链表分配器" tabindex="-1"><a class="header-anchor" href="#空闲链表分配器" aria-hidden="true">#</a> 空闲链表分配器</h4>
<p>空闲链表分配器（Free-List Allocator）可以重用已经被释放的内存，**它在内部会维护一个类似链表的数据结构。**当用户程序申请内存时，空闲链表分配器会依次遍历空闲的内存块，找到足够大的内存，然后申请新的资源并修改链表：</p>
<p><img src="http://sm.nsddd.top/sm202303011651611.png" alt="image-20230301165138387"></p>
<p>因为不同的内存块通过指针构成了链表，所以使用这种方式的分配器可以重新利用回收的资源，但是因为分配内存时需要遍历链表，所以它的时间复杂度是 <code v-pre>O(n)</code>。</p>
<p>空闲链表分配器可以选择不同的策略在链表中的内存块中进行选择，最常见的是以下四种：</p>
<ul>
<li>首次适应（First-Fit）— 从链表头开始遍历，选择第一个大小大于申请内存的内存块；</li>
<li>循环首次适应（Next-Fit）— 从上次遍历的结束位置开始遍历，选择第一个大小大于申请内存的内存块；</li>
<li>最优适应（Best-Fit）— 从链表头遍历整个链表，选择最合适的内存块；</li>
<li>隔离适应（Segregated-Fit）— 将内存分割成多个链表，每个链表中的内存块大小相同，申请内存时先找到满足条件的链表，再从链表中选择合适的内存块；</li>
</ul>
<p>上述四种策略的前三种就不过多介绍了，Go 语言使用的内存分配策略与第四种策略有些相似，我们通过下图了解该策略的原理：</p>
<p><img src="http://sm.nsddd.top/sm202303011652621.png" alt="image-20230301165249539"></p>
<p>如上图所示，该策略会将内存分割成由 4、8、16、32 字节的内存块组成的链表，当我们向内存分配</p>
<p>器申请 8 字节的内存时，它会在上图中找到满足条件的空闲内存块并返回。隔离适应的分配策略减少了需要遍历的内存块数量，提高了内存分配的效率。</p>
<p><strong>分级分配:</strong></p>
<p>线程缓存分配（Thread-Caching Malloc，TCMalloc）是用于分配内存的机制，它比 glibc 中的 <code v-pre>malloc</code> 还要快很多。Go 语言的内存分配器就借鉴了 TCMalloc 的设计实现高速的内存分配，它的核心理念是使用多级缓存将对象根据大小分类，并按照类别实施不同的分配策略。</p>
<h2 id="threadcachemalloc" tabindex="-1"><a class="header-anchor" href="#threadcachemalloc" aria-hidden="true">#</a> ThreadCacheMalloc</h2>
<p>在了解Golang的内存管理之前，需要了解下基本申请内存模式，即TCMalloc(Thread Cache malloc)。</p>
<p>golang的内存管理就是基于TCMalloc的核心思想来构建的。</p>
<p>TCMalloc 是一种内存分配器，旨在替代具有以下特征的系统默认分配器：</p>
<blockquote>
<p><strong>TCMalloc最大优势就是每个线程都会维护自己的独立内存池。</strong></p>
</blockquote>
<ul>
<li>对大多数对象进行快速、无争议的分配和解除分配。根据模式，按线程或按逻辑 CPU 缓存对象。大多数分配不需要采用锁，因此多线程应用程序的争用率较低且具有良好的扩展性。</li>
<li>灵活使用内存，因此释放的内存可以针对不同的对象大小重复使用，或返回给操作系统。</li>
<li>通过分配相同大小的对象的“页”来降低每个对象的内存开销。从而节省空间地表示小物体。</li>
<li>低开销采样，可详细了解应用程序内存使用情况。</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202303011658491.png" alt="image-20230301165846390"></p>
<p><strong>对象大小定义：</strong></p>
<ul>
<li><strong>小对象大小</strong>：0 ~ 256 kb</li>
<li><strong>中对象大小</strong>：256kb ~ 1 MB</li>
<li><strong>大对象大小</strong>：&gt; 1MB</li>
</ul>
<p>下面分别介绍下相关内存池：</p>
<h3 id="threadcache-小对象内存快的申请" tabindex="-1"><a class="header-anchor" href="#threadcache-小对象内存快的申请" aria-hidden="true">#</a> ThreadCache（小对象内存快的申请）:</h3>
<p>ThreadCache是每个线程独立的缓存，能够明显提高Thread获取高命中的数据。</p>
<p>Thread Cache作为线程独立的交互内存，访问无需加锁。</p>
<p>ThreadCache是从堆空间一次性申请，只触发一次系统调用。</p>
<h3 id="centralcache-小对象内存快的申请" tabindex="-1"><a class="header-anchor" href="#centralcache-小对象内存快的申请" aria-hidden="true">#</a> CentralCache（小对象内存快的申请）:</h3>
<p>当ThreadCache缓存不足时，就会从CentralCache获取。</p>
<p>当ThreadCache缓存充足或过多时，则会将内存退还给Central Cache。</p>
<p>Central Cache由于共享，访问的时候时候需要加锁。</p>
<h3 id="pageheap-中、大对象内存快的申请" tabindex="-1"><a class="header-anchor" href="#pageheap-中、大对象内存快的申请" aria-hidden="true">#</a> PageHeap（中、大对象内存快的申请）:</h3>
<p>Page Heap也是一次系统调用从虚拟内存中申请。</p>
<p>Page Heap也是全局的，访问需要加锁。</p>
<p>Central Cache没有足够的内存时，就会从Page Heap获取。</p>
<p>当Central Cache内存过多或者充足时，会直接从Page Heap获取。</p>
<h2 id="tcmalloc模型相关基础结构-page、span、size-class" tabindex="-1"><a class="header-anchor" href="#tcmalloc模型相关基础结构-page、span、size-class" aria-hidden="true">#</a> TCMalloc模型相关基础结构（Page、Span、Size Class）</h2>
<h3 id="page" tabindex="-1"><a class="header-anchor" href="#page" aria-hidden="true">#</a> Page</h3>
<p>TCMalloc将虚拟内存空间划分为同等大小的Page，每个Page默认是8KB，并且每分Page都标记了ID编号，ID编号的好处是：<strong>可以根据任意内存的地址指针，根据固定算法偏移计算出所在的Page。</strong></p>
<p><img src="http://sm.nsddd.top/sm202303011706945.png" alt="image-20230301170643817"></p>
<h3 id="span" tabindex="-1"><a class="header-anchor" href="#span" aria-hidden="true">#</a> Span</h3>
<p>多个连续的Page称为一个Span。</p>
<p><strong>TCMalloc是以Span为单位向操作系统申请内存的。</strong></p>
<p>每个span记录了起始Page的编号start和一共有多少个连续Page的数量length。</p>
<p>Span和Span之间的管理是以双向链表的形式构建。</p>
<p><img src="http://sm.nsddd.top/sm202303011707724.png" alt="image-20230301170705593"></p>
<h3 id="size-class" tabindex="-1"><a class="header-anchor" href="#size-class" aria-hidden="true">#</a> Size Class</h3>
<p>同属于同一个内存大小的集合，该集合为一个Size Class 。</p>
<p>例如：内存块大小为8B 的都属于SizeClass1，内存块大小为16B 的都属于SizeClass2。</p>
<p>SizeClass、Span、Page用一张图表示如下。</p>
<p><img src="http://sm.nsddd.top/sm202303011707888.png" alt="image-20230301170727758"></p>
<p><strong>Golang内存管理模型与TCMalloc设计很相似，只是一些规则和流程存在差异。</strong></p>
<img src="http://sm.nsddd.top/sm202303011711729.png" alt="image-20230301171114542" style="zoom:33%;" />
<p>Golang内存管理中依然保留TCMalloc中的Page、Span、Size Class等概念。</p>
<h3 id="page-同tcmalloc相同" tabindex="-1"><a class="header-anchor" href="#page-同tcmalloc相同" aria-hidden="true">#</a> Page（同TCMalloc相同）</h3>
<p>与TCMalloc中的Page一样，一个Page大小仍然时8KB。</p>
<p>Page是内存管理与虚拟内存交互的最小单元。</p>
<h3 id="mspan-同tcmalloc相同" tabindex="-1"><a class="header-anchor" href="#mspan-同tcmalloc相同" aria-hidden="true">#</a> mSpan（同TCMalloc相同）</h3>
<p>与TCMalloc中的span一致，mspn也是一组连续的Page。</p>
<h3 id="object-tcmalloc中没有" tabindex="-1"><a class="header-anchor" href="#object-tcmalloc中没有" aria-hidden="true">#</a> object(TCMalloc中没有)</h3>
<p>一个span在初始化时，会被切割成一堆相同大小的object.</p>
<p>例如：一个object大小为16b，span大小时8K ，那么就会初始化出8+1024/16=512个object。</p>
<blockquote>
<p>Page是Golang内存管理与操作系统交互的基本单元。</p>
<p>Object是对象存储的基本单元。</p>
</blockquote>
<h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2>
<p>Go语言在早期的时候确实 GC 不怎么样，时间太久了，但是经过几代的优化，越来越好了。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/38.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/40.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
<h3 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> Links</h3>
<p>Memory management in Go generally consists of three different components: the user program (Mutator), allocator, and collector. When a user program requests memory, it does so through the memory allocator, and when the memory is no longer needed, it is returned to the allocator.</p>
<p>Go is a garbage-collected language that has pointers but does not have as much flexibility in pointer operations as C. In most cases, users do not need to manage memory themselves, but understanding how Go manages memory is essential to writing efficient code.</p>
<p>Go's memory management system consists of two primary components: a memory allocator and a garbage collector. The allocator is responsible for allocating and deallocating memory, while the garbage collector is responsible for freeing memory that is no longer in use.</p>
<p>The Go memory allocator is a modified version of the Hoard allocator. The allocator uses per-thread caches and multiple page sizes to reduce contention and improve performance. When a user program requests memory, the allocator first checks the per-thread cache for available memory. If the cache is empty, the allocator allocates a new page of memory from the operating system and adds it to the per-thread cache.</p>
<p>The garbage collector in Go is a concurrent, mark-and-sweep collector that runs in the background while the user program continues to execute. When the garbage collector runs, it marks all the memory that is still in use, and then frees the memory that is not marked. The garbage collector is designed to minimize pauses in the user program, so it runs concurrently with the user program and only stops the program briefly to perform mark and sweep operations.</p>
<p>Overall, Go's memory management system is designed to be efficient and minimize the burden on users, while still providing strong guarantees about memory safety.</p>
<p><strong>参考资料：</strong></p>
<ul>
<li><a href="https://draveness.me/golang/docs/part3-runtime/ch07-memory/golang-memory-allocator/" target="_blank" rel="noopener noreferrer">Go 语言内存分配器的实现原理 - 面向信仰编程<ExternalLinkIcon/></a></li>
<li><a href="https://tiancaiamao.gitbooks.io/go-internals/content/zh/06.0.html" target="_blank" rel="noopener noreferrer">内存管理· 深入解析Go - tiancaiamao<ExternalLinkIcon/></a></li>
<li><a href="https://cloud.tencent.com/developer/article/2051585" target="_blank" rel="noopener noreferrer">超干货！彻底搞懂Golang内存管理和垃圾回收 - 腾讯云<ExternalLinkIcon/></a></li>
<li>https://draveness.me/golang/docs/part3-runtime/ch07-memory/golang-memory-allocator/</li>
<li>https://blog.51cto.com/u_10983441/5358688</li>
</ul>
</div></template>


