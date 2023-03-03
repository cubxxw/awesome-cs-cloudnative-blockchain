<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第27节-go-tool" tabindex="-1"><a class="header-anchor" href="#第27节-go-tool" aria-hidden="true">#</a> 第27节 go tool</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/26.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="go-tool" tabindex="-1"><a class="header-anchor" href="#go-tool" aria-hidden="true">#</a> Go Tool</h2>
<p><strong>调出CLI：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/tiktok<span class="token comment"># go tool </span>
addr2line
asm
buildid
cgo
compile
cover
dist
doc
fix
<span class="token function">link</span>
nm
objdump
pack
pprof
test2json
trace
vet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些是 Go 语言的命令行工具。它们用于编译、测试和调试 Go 程序。</p>
<ul>
<li><code v-pre>addr2line</code> 可以将二进制文件中的地址转换为源代码中的行号和函数名。</li>
<li><code v-pre>asm</code> 可以将 Go 源代码编译为汇编语言。</li>
<li><code v-pre>buildid</code> 用于在编译后的二进制文件中添加或检索 build ID。</li>
<li><code v-pre>cgo</code> 用于在 Go 代码中使用 C 代码。</li>
<li><code v-pre>compile</code> 用于编译 Go 源代码。</li>
<li><code v-pre>cover</code> 用于收集和分析 Go 代码覆盖率数据。</li>
<li><code v-pre>dist</code> 用于构建和发布 Go 包。</li>
<li><code v-pre>doc</code> 用于查看 Go 包或程序的文档。</li>
<li><code v-pre>fix</code> 用于自动修复 Go 代码中的语法错误。</li>
<li><code v-pre>link</code> 用于链接 Go 代码。</li>
<li><code v-pre>nm</code> 用于显示符号表。</li>
<li><code v-pre>objdump</code> 用于显示二进制文件中的低级信息。</li>
<li><code v-pre>pack</code> 用于打包 Go 源代码。</li>
<li><code v-pre>pprof</code> <a href="https://github.com/eddycjy/blog/blob/master/content/posts/go/tools/2018-09-15-go-tool-pprof.md" target="_blank" rel="noopener noreferrer">用于收集和分析性能数据。<ExternalLinkIcon/></a></li>
<li><code v-pre>test2json</code> 用于将测试输出转换为 JSON 格式。</li>
<li><code v-pre>trace</code> 用于收集和分析 Go 代码的运行时跟踪信息。</li>
<li><code v-pre>vet</code> 用于检查 Go 代码中的可能错误。</li>
</ul>
<h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h2>
<h3 id="go-tool-compile" tabindex="-1"><a class="header-anchor" href="#go-tool-compile" aria-hidden="true">#</a> <code v-pre>go tool compile</code></h3>
<p><code v-pre>go tool compile</code> 用于编译 Go 源代码。下面是一个简单的例子，它编译了一个名为 &quot;hello.go&quot; 的文件，并生成了一个可执行文件 &quot;hello&quot;。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ go tool compile <span class="token parameter variable">-o</span> hello hello.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>go tool compile</code> 和 <code v-pre>go build</code> 都用于编译 Go 源代码，但它们有一些重要的区别。</p>
<p><code v-pre>go build</code> 是 Go 语言的标准命令，它用于编译 Go 源代码并生成可执行文件或库。它的使用非常简单，只需要指定一个或多个 Go 源文件即可。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>$ <span class="token keyword">go</span> build main<span class="token punctuation">.</span><span class="token keyword">go</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>go tool compile</code> 是 Go 语言的低级命令，它用于编译 Go 源代码并生成机器码。它提供了更多的编译选项和更细粒度的控制。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>$ <span class="token keyword">go</span> tool compile <span class="token operator">-</span>o main main<span class="token punctuation">.</span><span class="token keyword">go</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一般情况下，我们建议使用 <code v-pre>go build</code>，因为它更简单、更易用。如果需要更细粒度的控制或更多的编译选项，可以使用 <code v-pre>go tool compile</code>。</p>
</blockquote>
<h3 id="go-tool-cover" tabindex="-1"><a class="header-anchor" href="#go-tool-cover" aria-hidden="true">#</a> <code v-pre>go tool cover</code></h3>
<p><code v-pre>go tool cover</code> 用于收集和分析 Go 代码覆盖率数据。下面是一个简单的例子，它运行了 &quot;hello_test.go&quot; 中的测试，并生成了一个覆盖率报告 &quot;coverage.out&quot;。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ go <span class="token builtin class-name">test</span> <span class="token parameter variable">-coverprofile</span><span class="token operator">=</span>coverage.out
$ go tool cover <span class="token parameter variable">-func</span><span class="token operator">=</span>coverage.out
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="go-tool-pprof" tabindex="-1"><a class="header-anchor" href="#go-tool-pprof" aria-hidden="true">#</a> <code v-pre>go tool pprof</code></h3>
<p><code v-pre>go tool pprof</code> 用于收集和分析性能数据。下面是一个简单的例子，它运行了程序 &quot;hello&quot;，并生成了一个性能分析文件 &quot;cpu.pprof&quot;。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ go tool pprof <span class="token parameter variable">-http</span><span class="token operator">=</span>:8080 <span class="token parameter variable">-seconds</span><span class="token operator">=</span><span class="token number">60</span> <span class="token parameter variable">-sample_index</span><span class="token operator">=</span><span class="token number">2</span> <span class="token parameter variable">-sample_interval</span><span class="token operator">=</span>1s <span class="token parameter variable">-sample_value</span><span class="token operator">=</span>1s <span class="token parameter variable">-file</span><span class="token operator">=</span>cpu.pprof  hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这些工具提供了很多功能，在使用时，可以查看完整的帮助信息。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ go tool <span class="token operator">&lt;</span>toolname<span class="token operator">></span> <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>cgo🔍</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>root@cubmaster01<span class="token punctuation">:</span><span class="token operator">/</span>workspces<span class="token operator">/</span>tiktok# <span class="token keyword">go</span> tool cgo <span class="token operator">-</span>h
usage<span class="token punctuation">:</span> cgo <span class="token operator">--</span> <span class="token punctuation">[</span>compiler options<span class="token punctuation">]</span> file<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token operator">...</span>
  <span class="token operator">-</span>V    <span class="token builtin">print</span> version and exit
  <span class="token operator">-</span>debug<span class="token operator">-</span>define
        <span class="token builtin">print</span> relevant #defines
  <span class="token operator">-</span>debug<span class="token operator">-</span>gcc
        <span class="token builtin">print</span> gcc invocations
  <span class="token operator">-</span>dynimport <span class="token builtin">string</span>
        <span class="token keyword">if</span> non<span class="token operator">-</span>empty<span class="token punctuation">,</span> <span class="token builtin">print</span> dynamic <span class="token keyword">import</span> data <span class="token keyword">for</span> that file
  <span class="token operator">-</span>dynlinker
        record dynamic linker information in <span class="token operator">-</span>dynimport mode
  <span class="token operator">-</span>dynout <span class="token builtin">string</span>
        write <span class="token operator">-</span>dynimport output to this file
  <span class="token operator">-</span>dynpackage <span class="token builtin">string</span>
        set Go <span class="token keyword">package</span> <span class="token keyword">for</span> <span class="token operator">-</span>dynimport output <span class="token punctuation">(</span><span class="token keyword">default</span> <span class="token string">"main"</span><span class="token punctuation">)</span>
  <span class="token operator">-</span>exportheader <span class="token builtin">string</span>
        where to write export header <span class="token keyword">if</span> any exported functions
  <span class="token operator">-</span>gccgo
        generate files <span class="token keyword">for</span> use with gccgo
  <span class="token operator">-</span>gccgopkgpath <span class="token builtin">string</span>
        <span class="token operator">-</span>fgo<span class="token operator">-</span>pkgpath option used with gccgo
  <span class="token operator">-</span>gccgoprefix <span class="token builtin">string</span>
        <span class="token operator">-</span>fgo<span class="token operator">-</span>prefix option used with gccgo
  <span class="token operator">-</span>godefs
        <span class="token keyword">for</span> bootstrap<span class="token punctuation">:</span> write Go definitions <span class="token keyword">for</span> C file to standard output
  <span class="token operator">-</span>import_runtime_cgo
        <span class="token keyword">import</span> runtime<span class="token operator">/</span>cgo in generated code <span class="token punctuation">(</span><span class="token keyword">default</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token operator">-</span>import_syscall
        <span class="token keyword">import</span> syscall in generated code <span class="token punctuation">(</span><span class="token keyword">default</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token operator">-</span>importpath <span class="token builtin">string</span>
        <span class="token keyword">import</span> path of <span class="token keyword">package</span> being built <span class="token punctuation">(</span><span class="token keyword">for</span> comments in generated files<span class="token punctuation">)</span>
  <span class="token operator">-</span>objdir <span class="token builtin">string</span>
        object directory
  <span class="token operator">-</span>srcdir <span class="token builtin">string</span>
        source directory
  <span class="token operator">-</span>trimpath <span class="token builtin">string</span>
        applies supplied rewrites or trims prefixes to recorded source file paths
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/26.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/28.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


