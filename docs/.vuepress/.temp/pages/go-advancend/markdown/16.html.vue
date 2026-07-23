<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第16节-go-genericity-泛型" tabindex="-1"><a class="header-anchor" href="#第16节-go-genericity-泛型" aria-hidden="true">#</a> 第16节 Go genericity（泛型）</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/15.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="先决条件" tabindex="-1"><a class="header-anchor" href="#先决条件" aria-hidden="true">#</a> 先决条件</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>随着 2022 年 3 月 15 日 go 1.18 正式发布，新版本除了对性能的提升之外，还引入了很多新功能，其中就有 go 期盼已久的功能泛型(Generics)，同时还引入的多模块工作区(Workspaces)和模糊测试(Fuzzing)。</p>
<ul>
<li>**安装 Go 1.18 或更高版本。**有关安装说明，请参阅<a href="https://go.dev/doc/install" target="_blank" rel="noopener noreferrer">安装 Go<ExternalLinkIcon/></a>.</li>
<li>**用于编辑代码的工具。**您拥有的任何文本编辑器都可以正常工作。</li>
<li>**命令终端。**Go 在 Linux 和 Mac 上的任何终端以及 Windows 中的 PowerShell 或 cmd 上运行良好。</li>
</ul>
</div>
<h2 id="上手–解决相加问题" tabindex="-1"><a class="header-anchor" href="#上手–解决相加问题" aria-hidden="true">#</a> 上手–解决相加问题</h2>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">type</span> MySlice<span class="token punctuation">[</span>T <span class="token builtin">int</span> <span class="token operator">|</span> <span class="token builtin">float64</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>T

<span class="token keyword">func</span> <span class="token punctuation">(</span>s MySlice<span class="token punctuation">[</span>T<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token function">Sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> T <span class="token punctuation">{</span>
	<span class="token keyword">var</span> sum T
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> s <span class="token punctuation">{</span>
		sum <span class="token operator">+=</span> v
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> sum
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> MySlice<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	v <span class="token operator">:=</span> MySlice<span class="token punctuation">[</span><span class="token builtin">float64</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1.1</span><span class="token punctuation">,</span> <span class="token number">2.2</span><span class="token punctuation">,</span> <span class="token number">3.3</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	u <span class="token operator">:=</span> MySlice<span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"world"</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>u<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super<span class="token entity" title="\71">\71</span>-main.go"</span>
<span class="token number">6</span>
<span class="token number">6.6</span>
helloworld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">📜 对上面的解释</p>
<p>泛型函数，该函数可以接收包含整数或浮点值的映射，从而有效地将刚刚编写的两个函数替换为单个函数。</p>
<p>若要支持任一类型的值，该单个函数将需要一种方法来声明它支持的类型。另一方面，调用代码需要一种方法来指定它是使用整数还是浮点映射进行调用。</p>
<p>类型参数必须支持泛型代码对其执行的所有操作。例如，如果函数的代码要尝试对其约束包含数值类型的类型参数执行<code v-pre>string</code>操作（如索引），则代码将无法编译。</p>
</div>
<p><strong>类比两个数也是可以的~</strong></p>
<details class="custom-container details"><summary>💡简单的一个案例如下：</summary>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">type</span> MySlice<span class="token punctuation">[</span>T <span class="token builtin">int</span> <span class="token operator">|</span> <span class="token builtin">float64</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>T

<span class="token keyword">func</span> <span class="token punctuation">(</span>s MySlice<span class="token punctuation">[</span>T<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token function">Sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> T <span class="token punctuation">{</span>
	<span class="token keyword">var</span> sum T
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> s <span class="token punctuation">{</span>
		sum <span class="token operator">+=</span> v
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> sum
<span class="token punctuation">}</span>

<span class="token comment">//泛型（genericity）函数</span>
<span class="token keyword">func</span> Add<span class="token punctuation">[</span>T <span class="token builtin">int</span> <span class="token operator">|</span> <span class="token builtin">float64</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b T<span class="token punctuation">)</span> T <span class="token punctuation">{</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> MySlice<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	v <span class="token operator">:=</span> MySlice<span class="token punctuation">[</span><span class="token builtin">float64</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1.1</span><span class="token punctuation">,</span> <span class="token number">2.2</span><span class="token punctuation">,</span> <span class="token number">3.3</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	u <span class="token operator">:=</span> MySlice<span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"world"</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>u<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1.1</span><span class="token punctuation">,</span> <span class="token number">2.2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"world"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super<span class="token entity" title="\71">\71</span>-main.go"</span>
<span class="token number">6</span>
<span class="token number">6.6</span>
helloworld
<span class="token number">3</span>
<span class="token number">3.3000000000000003</span>
helloworld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以同过一个方法去适配很多个方法。</p>
</details>
<div class="custom-container danger"><p class="custom-container-title">⚠️需要注意</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>func Add<span class="token punctuation">[</span>T int <span class="token operator">|</span> float64 <span class="token operator">|</span> string<span class="token punctuation">]</span><span class="token punctuation">(</span>a, b T<span class="token punctuation">)</span> T <span class="token punctuation">{</span>
	<span class="token builtin class-name">return</span> a + b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们的泛型（genericity）类型如果指定 any ，那么是不会成功的（<code v-pre>interface{}</code>只能返回一个值</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> Add<span class="token punctuation">[</span>T any<span class="token punctuation">]</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b T<span class="token punctuation">)</span> T <span class="token punctuation">{</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们看一下 any 源码：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> any <span class="token operator">=</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>any ：表示 Go语言 所有内置的基本类型</li>
<li>comparable：表示在Go语言里面所有内置的可比较类型</li>
</ul>
<p>🔽 我们也可以自定义泛型（genericity）类型</p>
</div>
<h2 id="自定义泛型-genericity-约束" tabindex="-1"><a class="header-anchor" href="#自定义泛型-genericity-约束" aria-hidden="true">#</a> 自定义泛型（genericity）约束</h2>
<p>如果类型太多了怎么办，我们针对<code v-pre>Add[T int | float64 | string](a, b T) T</code> 而言，我们使用 <code v-pre>interface</code>定义：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
自定义泛型（genericity）类型
*/</span>

<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">type</span> MyInt <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token builtin">int</span> <span class="token operator">|</span> <span class="token builtin">int64</span> <span class="token operator">|</span> <span class="token builtin">int32</span> <span class="token operator">|</span> <span class="token builtin">int16</span> <span class="token operator">|</span> <span class="token builtin">int8</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> GetMaxNum<span class="token punctuation">[</span>T MyInt<span class="token punctuation">]</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b T<span class="token punctuation">)</span> T <span class="token punctuation">{</span>
	<span class="token keyword">if</span> a <span class="token operator">></span> b <span class="token punctuation">{</span>
		<span class="token keyword">return</span> a
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> b
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">GetMaxNum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：<code v-pre>2</code></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/15.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/17.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


