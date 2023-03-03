<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第28节-高质量编程简介及编码规范" tabindex="-1"><a class="header-anchor" href="#第28节-高质量编程简介及编码规范" aria-hidden="true">#</a> 第28节 高质量编程简介及编码规范</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/27.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h2>
<ol>
<li>在课程开始之前，克隆<a href="https://github.com/wolfogre/go-pprof-practice" target="_blank" rel="noopener noreferrer">网址一<ExternalLinkIcon/></a>到本地，保证能够编译运行</li>
<li>尝试使用 test 命令，编写并运行简单测试<a href="https://go.dev/doc/tutorial/add-a-test" target="_blank" rel="noopener noreferrer">网址二<ExternalLinkIcon/></a></li>
<li>尝试使用 -bench 参数，对编写的函数进行性能测试<a href="https://link.juejin.cn/?target=https%3A%2F%2Fpkg.go.dev%2Ftesting%23hdr-Benchmarks" target="_blank" rel="noopener noreferrer">网址三<ExternalLinkIcon/></a></li>
</ol>
<h2 id="高质量代码" tabindex="-1"><a class="header-anchor" href="#高质量代码" aria-hidden="true">#</a> 高质量代码</h2>
<p>编写的代码达到正确的、可靠的、简介清晰的目标可称之为高质量代码。</p>
<ul>
<li>边界条件（错误调用处理）</li>
<li>异常情况处理</li>
<li>易读易维护</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202301171533160.png" alt="image-20230117153307968"></p>
<h3 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h3>
<ul>
<li>注释解释代码的作用</li>
<li>注释解释代码如何做的</li>
<li>注释解释代码实现的原因</li>
<li>注释解释代码在什么情况下会出错</li>
</ul>
<p><strong>好的代码有很多注释，坏的代码需要很多注释。</strong></p>
<h2 id="命名规范" tabindex="-1"><a class="header-anchor" href="#命名规范" aria-hidden="true">#</a> 命名规范</h2>
<p><strong>规范：</strong></p>
<ol>
<li>包名应该是小写字母，不能包含下划线或者短横线。</li>
<li>变量名和函数名应该是小写字母，如果名字由多个单词组成，则每个单词之间应该使用驼峰式命名。</li>
<li>类型名和接口名应该是大写字母，如果名字由多个单词组成，则每个单词之间应该使用驼峰式命名。</li>
<li>常量名应该全部大写，如果名字由多个单词组成，则每个单词之间应该使用下划线连接。</li>
<li>变量名和函数名不能以下划线或短横线开头。</li>
<li>不能使用与Go语言关键字相同的名字。</li>
<li>注意缩略词全大写，位于开头的话可以全小写（HTTP、XML）</li>
</ol>
<p><img src="http://sm.nsddd.top/sm202301171549104.png" alt="image-20230117154947011"></p>
<h3 id="函数命名规范" tabindex="-1"><a class="header-anchor" href="#函数命名规范" aria-hidden="true">#</a> 函数命名规范</h3>
<p>在 Go 语言中，函数命名规范如下:</p>
<ol>
<li>函数名应该是小写字母，如果名字由多个单词组成，则每个单词之间应该使用驼峰式命名，首字母小写。</li>
<li>函数名不能以下划线或短横线开头。</li>
<li>不能使用与Go语言关键字相同的名字。</li>
<li>函数名不能缩写，应该使用全称。</li>
<li>函数名应该能够清楚地描述函数的功能。</li>
</ol>
<p><img src="http://sm.nsddd.top/sm202301171554556.png" alt="image-20230117155415454"></p>
<h3 id="包的规范" tabindex="-1"><a class="header-anchor" href="#包的规范" aria-hidden="true">#</a> 包的规范</h3>
<p>在 Go 语言中，包名命名规范如下:</p>
<ol>
<li>包名应该是小写字母，不能包含下划线或者短横线。</li>
<li>包名应该能够清楚地描述该包的功能。</li>
<li>包名应该尽量短，并且避免使用缩写。</li>
<li>包名应该尽量避免和其他包名相同。</li>
<li>包名应该是全局唯一的， 不能和其他任何已经发布的包或者其他项目重名。</li>
<li>包名不能与Go语言关键字相同。</li>
<li>包名不能以下划线或短横线开头。</li>
</ol>
<p>注意：Go语言默认支持在线安装包，所以包名必须是全局唯一的， 建议使用公司或者组织名称作为包名的前缀。</p>
<p><img src="http://sm.nsddd.top/sm202301171555035.png" alt="image-20230117155500912"></p>
<h2 id="错误和异常处理" tabindex="-1"><a class="header-anchor" href="#错误和异常处理" aria-hidden="true">#</a> 错误和异常处理</h2>
<p><img src="http://sm.nsddd.top/sm202301171602992.png" alt="image-20230117160247843"></p>
<p><code v-pre>errors.New</code> 函数是 Go 语言标准库中定义的一个函数，它用于创建一个新的错误。该函数接受一个字符串作为参数，该字符串描述了错误的原因。这个函数会返回一个实现了 <code v-pre>error</code> 接口的对象，可以在程序中使用这个对象来报告错误。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"errors"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">divide</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">divide</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> b <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"cannot divide by zero"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> a <span class="token operator">/</span> b<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cannot divide by zero
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的程序中，divide函数检查分母是否为0，如果是，则使用errors.New函数创建了一个新的错误，描述了错误原因为“cannot divide by zero”.在main函数中，使用if语句判断返回值是否为错误，如果是，则输出错误信息.</p>
<p>记住，<code v-pre>errors.New</code> 不会添加额外的调试信息到错误中,如果需要添加更多的信息，可以使用 fmt.Errorf 函数.</p>
<p><img src="http://sm.nsddd.top/sm202301171606958.png" alt="image-20230117160650790"></p>
<p><code v-pre>fmt.Errorf</code> 函数是 Go 语言标准库中定义的一个函数，它用于格式化错误信息并创建一个新的错误。该函数接受一个格式字符串和一些参数作为参数，格式字符串描述了错误的原因，参数用于替换格式字符串中的占位符。这个函数会返回一个实现了 <code v-pre>error</code> 接口的对象，可以在程序中使用这个对象来报告错误。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">divide</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">divide</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> b <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"cannot divide %d by %d"</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS D:\文档\my\go-pprof-practice> go run .\test.go
cannot divide 10 by 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化" aria-hidden="true">#</a> 性能优化</h2>
<p><strong>如何评估：</strong></p>
<ul>
<li>性能表现需要实际数据说明</li>
<li>Go语言提供了支持基准性能测试benchmark工具</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go test -bench=. -benchmen
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/sm202301171631293.png" alt="image-20230117163103118"></p>
<p><strong>程序在初始化的时候指定大小，可以看到执行时间是之前的 1/3 大小。</strong></p>
<p><img src="http://sm.nsddd.top/sm202301171631051.png" alt="image-20230117163132940"></p>
<p><strong>这个和底层数据结构相关的。</strong></p>
<p>🤔 可以看到当容量不够的时候，底层是先有一次扩容 （✖2）操作，然后再添加，消耗时间~</p>
<p><img src="http://sm.nsddd.top/sm202301171634233.png" alt="image-20230117163410113"></p>
<h3 id="大内存未释放" tabindex="-1"><a class="header-anchor" href="#大内存未释放" aria-hidden="true">#</a> 大内存未释放</h3>
<p>切片是引用的一段空间，所以原底层再内存中的引用得不到释放。</p>
<p>在 Go 语言中，使用 <code v-pre>copy</code> 函数可以避免重新切片 (re-slice) 造成的性能问题。</p>
<p>重新切片是指对一个已经存在的切片进行切片操作，这样会导致新的内存分配，从而降低程序的性能。</p>
<blockquote>
<p>当我们重新切片一个已经存在的切片时，如果新切片的长度或容量超过了原切片的长度或容量，则需要重新分配内存来容纳新切片。这样会导致新的内存分配，从而降低程序的性能。</p>
<p>需要注意的是，当重新切片的长度和容量小于等于原切片的长度和容量时，则不会进行重新分配内存的操作。</p>
<p>而使用copy函数复制数据可以避免这个问题，因为它只是将数据从一个切片复制到另一个切片，不会导致内存的重新分配.</p>
</blockquote>
<p>使用 <code v-pre>copy</code> 函数可以避免这个问题。 <code v-pre>copy</code> 函数接受两个参数，分别是目标切片和源切片，它会将源切片中的数据复制到目标切片中，而不是新分配内存。</p>
<p><img src="http://sm.nsddd.top/sm202301171636018.png" alt="image-20230117163610901"></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义一个切片</span>
    s <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>

    <span class="token comment">// 使用重新切片操作,复制s的前3个元素到s1</span>
    s1 <span class="token operator">:=</span> s<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span>

    <span class="token comment">//使用copy函数,复制s的前3个元素到s2</span>
    s2 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token function">copy</span><span class="token punctuation">(</span>s2<span class="token punctuation">,</span> s<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 copy 函数复制数据可以节省内存的分配和垃圾回收的时间,提高性能。</p>
<p>注意，copy 函数只能复制切片的数据，不能复制切片的底层数组。如果需要复制底层数组，可以使用其他方法如 <code v-pre>append</code> 函数来实现。</p>
<h2 id="map优化建议" tabindex="-1"><a class="header-anchor" href="#map优化建议" aria-hidden="true">#</a> map优化建议</h2>
<p>和<code v-pre>slice</code> 类似：</p>
<p><img src="http://sm.nsddd.top/sm202301171645393.png" alt="image-20230117164516197"></p>
<p><strong>分配内存建议：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301171645873.png" alt="image-20230117164529754"></p>
<h2 id="字符串处理-优化" tabindex="-1"><a class="header-anchor" href="#字符串处理-优化" aria-hidden="true">#</a> 字符串处理，优化</h2>
<p><strong>不同拼接字符串的方法对应的性能有差异：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301171650729.png" alt="image-20230117165018556"></p>
<p><img src="http://sm.nsddd.top/sm202301171650473.png" alt="image-20230117165024292"></p>
<p>Go语言中常见的拼接字符串的方式有以下几种:</p>
<p>使用 <code v-pre>+</code> 运算符:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>s1 <span class="token operator">:=</span> <span class="token string">"Hello"</span>
s2 <span class="token operator">:=</span> <span class="token string">"World"</span>
s3 <span class="token operator">:=</span> s1 <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> s2
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span> <span class="token comment">// "Hello World"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code v-pre>fmt.Sprintf</code> 函数:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>Copy codes1 <span class="token operator">:=</span> <span class="token string">"Hello"</span>
s2 <span class="token operator">:=</span> <span class="token string">"World"</span>
s3 <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%s %s"</span><span class="token punctuation">,</span> s1<span class="token punctuation">,</span> s2<span class="token punctuation">)</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span> <span class="token comment">// "Hello World"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code v-pre>strings.Join</code> 函数:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>s <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"Hello"</span><span class="token punctuation">,</span> <span class="token string">"World"</span><span class="token punctuation">}</span>
s3 <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">)</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span> <span class="token comment">// "Hello World"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code v-pre>bytes.Buffer</code>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> buffer bytes<span class="token punctuation">.</span>Buffer
buffer<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"Hello"</span><span class="token punctuation">)</span>
buffer<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">" "</span><span class="token punctuation">)</span>
buffer<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"World"</span><span class="token punctuation">)</span>
s3 <span class="token operator">:=</span> buffer<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span> <span class="token comment">// "Hello World"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在结合你的具体需求来选择合适的方式来拼接字符串。</p>
<p>在拼接字符串数量较多时，使用 <code v-pre>fmt.Sprintf</code>, <code v-pre>strings.Join</code> 以及 bytes.Buffer 是更优秀的选择。 而在拼接字符串数量较少时，使用 <code v-pre>+</code> 运算符是比较简单直接的选择。</p>
<p>需要注意的是，在使用 <code v-pre>+</code> 运算符拼接字符串时，如果字符串数量较多，会产生大量的临时对象，导致频繁的内存分配和垃圾回收，影响性能。而使用 <code v-pre>fmt.Sprintf</code>, <code v-pre>strings.Join</code> 以及 <code v-pre>bytes.Buffer</code> 不会有这个问题。</p>
<p>另外，在处理大量数据时，使用 bytes.Buffer 效率更高，因为它是基于字节的，而不是基于字符的。</p>
<p>总之,在选择字符串拼接的方式时，要考虑到字符串的数量、性能和可读性等因素。</p>
<p><img src="http://sm.nsddd.top/sm202301171652457.png" alt="image-20230117165239305"></p>
<p><strong>但是bytes.Buffer和strings.builder底层区别也影响了它们的性能：</strong></p>
<ol>
<li>bytes.Buffer是基于字节的，内部使用一个动态数组来存储字节。它提供了一些方法来操作字节，如 Write, WriteString, WriteByte 等。</li>
<li>strings.Builder 是基于字符的，内部使用一个动态数组来存储字符。它提供了一些方法来操作字符，如 Write, WriteString, WriteByte 等。</li>
<li>在性能上，bytes.Buffer 和 strings.Builder 的性能差异不大，但是在处理大量字节数据时，bytes.Buffer 会更快一些，因为它是基于字节的。 而strings.Builder 更适合处理字符数据。</li>
<li>在选择使用bytes.Buffer 和 strings.Builder 时，要根据你的具体需求，如果你需要处理大量字节数据，使用 bytes.Buffer 更加合适。如果处理的是字符串，使用strings.Builder 更加合适。</li>
<li>需要注意的是，在Go 1.13版本之后,strings.Builder 已经成为了标准库中的标准字符串拼接方式。</li>
</ol>
<h2 id="空结构体-占位符" tabindex="-1"><a class="header-anchor" href="#空结构体-占位符" aria-hidden="true">#</a> 空结构体 占位符</h2>
<p>在 Go 语言中，空结构体 (empty struct) 可以被用作占位符。空结构体是一种特殊的结构体，它没有任何字段，也就是说它没有任何内存占用。</p>
<p>这种用途常用在 channel 上, 因为空结构体占用内存最小，可以高效地在 channel 上传递信号。</p>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	done <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Doing some work..."</span><span class="token punctuation">)</span>
		<span class="token function">close</span><span class="token punctuation">(</span>done<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Waiting for work to be done..."</span><span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span>done
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Work done!"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>my<span class="token punctuation">\</span>go-pprof-practice<span class="token operator">></span> go run .<span class="token punctuation">\</span>test.go
Waiting <span class="token keyword">for</span> work to be done<span class="token punctuation">..</span>.
Doing some work<span class="token punctuation">..</span>.
Work done<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<p>在这个例子中，我们使用了一个空结构体类型的 channel 来传递信号，当 goroutine 完成了工作之后就会向 channel 中发送一个空结构体，主 goroutine 通过读取 channel 中的数据来判断工作是否完成。</p>
<p>需要注意的是，由于空结构体不占用任何内存，所以它在 channel 中传递的是一个空消息，不能在 channel 中传递数据。</p>
<p>空结构体还有其它用途，例如作为占位符在 map 中使用、作为锁的实现等。</p>
<p><img src="http://sm.nsddd.top/sm202301171656299.png" alt="image-20230117165629098"></p>
<h3 id="作为占位符在-map-中使用" tabindex="-1"><a class="header-anchor" href="#作为占位符在-map-中使用" aria-hidden="true">#</a> 作为占位符在 map 中使用</h3>
<p>作为占位符在 map 中使用，用来检查一个键是否存在：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>m <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
m<span class="token punctuation">[</span><span class="token string">"key1"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> m<span class="token punctuation">[</span><span class="token string">"key1"</span><span class="token punctuation">]</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ok<span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">=</span> m<span class="token punctuation">[</span><span class="token string">"key2"</span><span class="token punctuation">]</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ok<span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="作为锁的实现-用来实现互斥操作" tabindex="-1"><a class="header-anchor" href="#作为锁的实现-用来实现互斥操作" aria-hidden="true">#</a> 作为锁的实现，用来实现互斥操作</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> lock <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">myFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Acquiring lock..."</span><span class="token punctuation">)</span>
    lock <span class="token operator">=</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Lock acquired."</span><span class="token punctuation">)</span>
    <span class="token comment">// do some work</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Releasing lock..."</span><span class="token punctuation">)</span>
    lock <span class="token operator">=</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Lock released."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="作为占位符在结构体中使用" tabindex="-1"><a class="header-anchor" href="#作为占位符在结构体中使用" aria-hidden="true">#</a> 作为占位符在结构体中使用</h3>
<p><strong>用来减少结构体的内存占用。</strong></p>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"unsafe"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> myStruct <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
	data <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
	<span class="token boolean">_</span>    <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> myStruct2 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
	data <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> myStruct<span class="token punctuation">{</span>
		name<span class="token punctuation">:</span> <span class="token string">"example"</span><span class="token punctuation">,</span>
		data<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Size of myStruct: %d bytes\n\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>

	s2 <span class="token operator">:=</span> myStruct2<span class="token punctuation">{</span>
		name<span class="token punctuation">:</span> <span class="token string">"example2"</span><span class="token punctuation">,</span>
		data<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Size of myStruct2: %d bytes\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">{</span>example <span class="token punctuation">[</span><span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">5</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
Size of myStruct<span class="token punctuation">:</span> <span class="token number">48</span> bytes

<span class="token punctuation">{</span>example2 <span class="token punctuation">[</span><span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">5</span> <span class="token number">6</span> <span class="token number">7</span> <span class="token number">8</span> <span class="token number">9</span> <span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
Size of myStruct2<span class="token punctuation">:</span> <span class="token number">40</span> bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里使用了空结构体作为占位符，减少了结构体的内存占用。</p>
<p><strong>还有就是它可以用来标记某种类型, 例如：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> MyType <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t MyType<span class="token punctuation">)</span><span class="token function">DoSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// do something</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token boolean">_</span> MyInterface <span class="token operator">=</span> MyType<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就可以避免编译错误。</p>
<p>总之, 空结构体作为占位符是一种高效的方式，在很多场景下都可以使用。</p>
<h2 id="atomic包" tabindex="-1"><a class="header-anchor" href="#atomic包" aria-hidden="true">#</a> atomic包</h2>
<p>Go语言的atomic包提供了一组原子操作函数，这些函数可以在并发环境中安全地更新基本数据类型，例如整型和浮点数。<strong>这些函数在底层使用了CPU的原子指令，可以保证在多线程环境中更新操作的原子性。</strong></p>
<p>atomic包中提供了以下常用函数：</p>
<ul>
<li>AddInt32、AddInt64等：对指定的整型变量执行加法操作。</li>
<li>CompareAndSwapInt32、CompareAndSwapInt64等：如果当前变量的值等于预期值，则将其设置为新值。</li>
<li>LoadInt32、LoadInt64等：读取指定变量的值。</li>
<li>StoreInt32、StoreInt64等：将指定变量设置为指定值。</li>
</ul>
<p>请注意，atomic包中的函数仅适用于基本数据类型，如果需要对复杂数据类型进行原子操作，可以使用sync/atomic包中的函数。</p>
<p>实例：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"sync/atomic"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> i <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token number">0</span>
    atomic<span class="token punctuation">.</span><span class="token function">AddInt32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>i<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment">// 1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="性能对比" tabindex="-1"><a class="header-anchor" href="#性能对比" aria-hidden="true">#</a> 性能对比</h3>
<p><img src="http://sm.nsddd.top/sm202301171713805.png" alt="image-20230117171344626"></p>
<h3 id="使用actomic包" tabindex="-1"><a class="header-anchor" href="#使用actomic包" aria-hidden="true">#</a> 使用actomic包</h3>
<p><img src="http://sm.nsddd.top/sm202301171715939.png" alt="image-20230117171535814"></p>
<h3 id="actomic保持线程安全" tabindex="-1"><a class="header-anchor" href="#actomic保持线程安全" aria-hidden="true">#</a> actomic保持线程安全</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"sync"</span>
    <span class="token string">"sync/atomic"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> counter <span class="token builtin">int64</span>
    <span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            atomic<span class="token punctuation">.</span><span class="token function">AddInt64</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>counter<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个例子中，我们创建了一个int64类型的变量counter，并在100个goroutine中并发地执行AddInt64函数对其进行自增操作。由于 AddInt64函数是原子的，所以不会发生竞态条件。在所有goroutine执行完毕后，counter的值应该为100，并且不会受到其它线程的影响。</p>
<h2 id="性能优化分析工具" tabindex="-1"><a class="header-anchor" href="#性能优化分析工具" aria-hidden="true">#</a> 性能优化分析工具</h2>
<h3 id="优化建议" tabindex="-1"><a class="header-anchor" href="#优化建议" aria-hidden="true">#</a> 优化建议</h3>
<p><strong>Go语言性能调优有以下几点建议:</strong></p>
<ol>
<li>使用 Go 的内置性能分析工具，如 pprof，可以帮助诊断程序中的性能瓶颈。</li>
<li>避免使用高开销的操作，例如过多的内存分配和字符串连接。</li>
<li>使用 Go 协程，可以提高程序的并发性能。</li>
<li>使用 Go 的编译器优化，例如禁用内联（-gcflags=-l）和优化级别（-O）。</li>
<li>使用 Go 的原生并发类型，如 channel，而不是使用第三方库。</li>
<li>使用 Go 的垃圾回收器，可以减少内存分配和回收的开销。</li>
<li>尽量避免使用反射。</li>
<li>可以使用 cgo调用C语言代码来提升性能</li>
</ol>
<p><strong>优化原则：</strong></p>
<ol>
<li>优化最热点的代码: 通过性能分析工具（例如 pprof）来识别程序中的性能瓶颈并优化。</li>
<li>尽量减少不必要的操作: 比如内存分配、字符串连接等高开销操作。</li>
<li>使用合适的数据结构和算法: 例如使用 hash 表代替暴力查找，使用优化后的算法等。</li>
<li>使用并发和并行技术: 例如使用 Go 协程、channel 来提高程序的并发性能。</li>
<li>尽量避免使用反射: 使用反射会带来性能上的代价。</li>
<li>使用编译器优化: 例如禁用内联、使用优化级别等。</li>
<li>利用硬件加速: 例如使用 GPU 加速等。</li>
<li>优先使用高效的第三方库: 使用高效的第三方库可以减少代码量并提高性能。</li>
<li>经常进行性能测试和监控: 性能优化不是一次性的，需要经常进行性能测试和监控，及时发现并解决性能问题。</li>
</ol>
<h3 id="性能分析工具-pprof" tabindex="-1"><a class="header-anchor" href="#性能分析工具-pprof" aria-hidden="true">#</a> 性能分析工具 pprof</h3>
<p>pprof是 Go 语言的性能分析工具，它可以帮助诊断程序中的性能瓶颈。</p>
<p>使用方法:</p>
<ol>
<li>在程序中导入 &quot;net/http/pprof&quot; 包</li>
<li>启动 pprof HTTP 服务器，通常是在 main 函数中调用 <code v-pre>go func() { log.Println(http.ListenAndServe(&quot;localhost:6060&quot;, nil)) }()</code></li>
<li>使用浏览器或命令行工具访问 pprof 的 HTTP 服务器，例如： <code v-pre>http://localhost:6060/debug/pprof/</code></li>
<li>通过 pprof 提供的不同的 web页面 或 命令行工具 查看性能统计信息</li>
</ol>
<p>pprof 支持多种类型的性能分析，包括 CPU profile、memory profile、block profile、goroutine profile、threadcreate profile、heap profile等.</p>
<p><img src="http://sm.nsddd.top/sm202301181539789.png" alt="image-20230118153922625"></p>
<h3 id="pprof项目实战" tabindex="-1"><a class="header-anchor" href="#pprof项目实战" aria-hidden="true">#</a> pprof项目实战</h3>
<p>将最开始的项目 clone 到本地，在这个项目中，写了一些造成性能问题的代码炸弹。</p>
<p><strong>编译并保持链接：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go run main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>浏览器查看指标：</strong></p>
<ul>
<li>http://localhost:6060/debug/pprof/</li>
</ul>
<p><strong>pprof命令排查：</strong></p>
<blockquote>
<p>保持连接，另开终端：</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go tool pprof <span class="token string">"http://localhost:6060/debug/pprof/profile?seconds=10"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="topn-—-查看占用资源最多的函数" tabindex="-1"><a class="header-anchor" href="#topn-—-查看占用资源最多的函数" aria-hidden="true">#</a> topN — 查看占用资源最多的函数：</h4>
<p><img src="http://sm.nsddd.top/sm202301181622460.png" alt="image-20230118162256355"></p>
<p>📜 对上面的解释：</p>
<ul>
<li>flat = cum，函数中没有调用其他的函数</li>
<li>flat = 0，函数中只有其他函数的调用</li>
</ul>
<h4 id="list命令" tabindex="-1"><a class="header-anchor" href="#list命令" aria-hidden="true">#</a> list命令</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>pprof<span class="token punctuation">)</span> list Eat
Total: <span class="token number">2</span>.77s
ROUTINE <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span> github.com/wolfogre/go-pprof-practice/animal/felidae/tiger.<span class="token punctuation">(</span>*Tiger<span class="token punctuation">)</span>.Eat <span class="token keyword">in</span> D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>my<span class="token punctuation">\</span>go-pprof-practice<span class="token punctuation">\</span>animal<span class="token punctuation">\</span>felidae<span class="token punctuation">\</span>tiger<span class="token punctuation">\</span>tiger.go
     <span class="token number">2</span>.73s      <span class="token number">2</span>.74s <span class="token punctuation">(</span>flat, cum<span class="token punctuation">)</span> <span class="token number">98.92</span>% of Total
         <span class="token builtin class-name">.</span>          <span class="token builtin class-name">.</span>     <span class="token number">19</span>:<span class="token punctuation">}</span>
         <span class="token builtin class-name">.</span>          <span class="token builtin class-name">.</span>     <span class="token number">20</span>:
         <span class="token builtin class-name">.</span>          <span class="token builtin class-name">.</span>     <span class="token number">21</span>:func <span class="token punctuation">(</span>t *Tiger<span class="token punctuation">)</span> <span class="token function-name function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token builtin class-name">.</span>          <span class="token builtin class-name">.</span>     <span class="token number">22</span>:   log.Println<span class="token punctuation">(</span>t.Name<span class="token punctuation">(</span><span class="token punctuation">)</span>, <span class="token string">"eat"</span><span class="token punctuation">)</span>
         <span class="token builtin class-name">.</span>          <span class="token builtin class-name">.</span>     <span class="token number">23</span>:   loop :<span class="token operator">=</span> <span class="token number">10000000000</span>
     <span class="token number">2</span>.73s      <span class="token number">2</span>.74s     <span class="token number">24</span>:   <span class="token keyword">for</span> i :<span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> loop<span class="token punctuation">;</span> i++ <span class="token punctuation">{</span>
         <span class="token builtin class-name">.</span>          <span class="token builtin class-name">.</span>     <span class="token number">25</span>:           // <span class="token keyword">do</span> nothing
         <span class="token builtin class-name">.</span>          <span class="token builtin class-name">.</span>     <span class="token number">26</span>:   <span class="token punctuation">}</span>
         <span class="token builtin class-name">.</span>          <span class="token builtin class-name">.</span>     <span class="token number">27</span>:<span class="token punctuation">}</span>
         <span class="token builtin class-name">.</span>          <span class="token builtin class-name">.</span>     <span class="token number">28</span>:
         <span class="token builtin class-name">.</span>          <span class="token builtin class-name">.</span>     <span class="token number">29</span>:func <span class="token punctuation">(</span>t *Tiger<span class="token punctuation">)</span> <span class="token function-name function">Drink</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">(</span>pprof<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>问题出在第 24 L</strong></p>
<h4 id="调用关系可视化" tabindex="-1"><a class="header-anchor" href="#调用关系可视化" aria-hidden="true">#</a> 调用关系可视化</h4>
<p><img src="http://sm.nsddd.top/sm202301181636935.png" alt="image-20230118163659804"></p>
<p><strong>解决后，发现协程数下降：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301181639282.png" alt="image-20230118163915913"></p>
<h2 id="性能调优实战" tabindex="-1"><a class="header-anchor" href="#性能调优实战" aria-hidden="true">#</a> 性能调优实战</h2>
<p>pprof是性能调试工具，可以生成类似火焰图、堆栈图，内存分析图等。</p>
<p>整个分析的过程分为两步：1. 导出数据，2. 分析数据。</p>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p>allocs：查看过去所有内存分配的样本。</p>
<p>block：查看导致阻塞同步的堆栈跟踪。</p>
<p>cmdline： 当前程序的命令行的完整调用路径。</p>
<p>goroutine：查看当前所有运行的 goroutines 堆栈跟踪。</p>
<p>heap：查看活动对象的内存分配情况。</p>
<p>mutex：查看导致互斥锁的竞争持有者的堆栈跟踪。</p>
<p>profile： 默认进行 30s 的 CPU Profiling，得到一个分析用的 profile 文件。</p>
<p>threadcreate：查看创建新 OS 线程的堆栈跟踪。</p>
<p>trace：<a href="https://mp.weixin.qq.com/s/I9xSMxy32cALSNQAN8wlnQ" target="_blank" rel="noopener noreferrer">mp.weixin.qq.com/s/I9xSMxy32…<ExternalLinkIcon/></a></p>
<h3 id="过程和原理" tabindex="-1"><a class="header-anchor" href="#过程和原理" aria-hidden="true">#</a> 过程和原理</h3>
<p><img src="http://sm.nsddd.top/sm202301181641399.png" alt="image-20230118164157274"></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/27.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/29.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


