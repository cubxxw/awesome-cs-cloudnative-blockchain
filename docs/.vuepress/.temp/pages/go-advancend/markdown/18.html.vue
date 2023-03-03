<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第18节-go-模糊测试" tabindex="-1"><a class="header-anchor" href="#第18节-go-模糊测试" aria-hidden="true">#</a> 第18节 go 模糊测试</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/17.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="why-you-need-it" tabindex="-1"><a class="header-anchor" href="#why-you-need-it" aria-hidden="true">#</a> Why you need it？</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>对测试进行一部分的增强，我们平常写代码后肯定需要一部分的单元测试，在原有基础上增强。</p>
</div>
<h2 id="测试源" tabindex="-1"><a class="header-anchor" href="#测试源" aria-hidden="true">#</a> 测试源</h2>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> reverse<span class="token punctuation">[</span>T <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token punctuation">(</span>s T<span class="token punctuation">)</span> T <span class="token punctuation">{</span>
	b <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> j<span class="token punctuation">;</span> i<span class="token punctuation">,</span> j <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> j<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		b<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> b<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> b<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> b<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token function">T</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"反转之前："</span><span class="token punctuation">,</span> <span class="token string">"hello"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"反转之后："</span><span class="token punctuation">,</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"反转之前："</span><span class="token punctuation">,</span> <span class="token string">"hello welcome to golang"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"反转之后："</span><span class="token punctuation">,</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token string">"hello welcome to golang"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"c:\Users\smile\Desktop<span class="token entity" title="\t">\t</span>est<span class="token entity" title="\f">\f</span>uzz-demo<span class="token entity" title="\r">\r</span>everse.go"</span>
反转之前： hello
反转之后： olleh
反转之前： hello welcome to golang
反转之后： gnalog ot emoclew olleh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="需要测试" tabindex="-1"><a class="header-anchor" href="#需要测试" aria-hidden="true">#</a> 需要测试</h2>
<p><strong>我们测试过上面的字符串是没有问题的，但是怎么知道测试其他的内容会不会出现问题呢？</strong></p>
<p>我们需要单元测试：<code v-pre>reverse_test.go</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> Reverse<span class="token punctuation">[</span>T <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token punctuation">(</span>s T<span class="token punctuation">)</span> T <span class="token punctuation">{</span>
	b <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> j<span class="token punctuation">;</span> i<span class="token punctuation">,</span> j <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> j<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		b<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> b<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> b<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> b<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token function">T</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"反转之前："</span><span class="token punctuation">,</span> <span class="token string">"hello"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"反转之后："</span><span class="token punctuation">,</span> <span class="token function">Reverse</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"反转之前："</span><span class="token punctuation">,</span> <span class="token string">"hello welcome to golang"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"反转之后："</span><span class="token punctuation">,</span> <span class="token function">Reverse</span><span class="token punctuation">(</span><span class="token string">"hello welcome to golang"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<details class="custom-container details"><summary>补充</summary>
<p>按理说我们只需要 <code v-pre>go test</code>  就可以执行测试用例，但是我们报错：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>directory <span class="token builtin class-name">.</span> is contained <span class="token keyword">in</span> a module that is not one of the workspace modules listed <span class="token keyword">in</span> go.work. You can <span class="token function">add</span> the module to the workspace using go work use <span class="token builtin class-name">.</span>
<span class="token comment"># 目录中。包含在不是go.work中列出的工作空间模块之一的模块中。您可以使用go work use将模块添加到工作区。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们如果要使用 <code v-pre>go work</code> 下的测试，我们需要加入到工作区：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> go work use .\fuzz-demo\
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>⚠️ 如果是工作区，我们可以直接在工作区测试：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go <span class="token builtin class-name">test</span> mszlu.com/fuzz-demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token punctuation">\</span>Desktop<span class="token punctuation">\</span>test<span class="token punctuation">\</span>fuzz-demo<span class="token operator">></span> go <span class="token builtin class-name">test</span>        
--- FAIL: TestReverse <span class="token punctuation">(</span><span class="token number">0</span>.00s<span class="token punctuation">)</span>
    reverse_test.go:27: reverse<span class="token punctuation">(</span><span class="token string">"abc!def12321fedcba"</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">"abcdef12321fed!cba"</span>, want <span class="token string">"abc!def12321fedcba"</span>
FAIL
<span class="token builtin class-name">exit</span> status <span class="token number">1</span>
FAIL    nsddd.top/fuzz-demo     <span class="token number">0</span>.235s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是的，我留下了一个小bug，我们试着解决它：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span><span class="token string">"abc!def12321fedcba"</span>, <span class="token string">"abcdef12321fed!cba"</span><span class="token punctuation">}</span>,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token punctuation">\</span>Desktop<span class="token punctuation">\</span>test<span class="token punctuation">\</span>fuzz-demo<span class="token operator">></span> go <span class="token builtin class-name">test</span>
PASS
ok      nsddd.top/fuzz-demo     <span class="token number">0</span>.274s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2>
<p>即使我们看起来万无一失，但是实际上还是有个问题，当我们输入中文的时候，我们知道此时的<code v-pre>byte[]</code> 是很弱鸡的~</p>
<p>💡简单的一个案例如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>package main

<span class="token function">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"testing"</span>
<span class="token punctuation">)</span>

func <span class="token function-name function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt.Println<span class="token punctuation">(</span><span class="token string">"这是fuzz-demo的reverse_test.go"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

func TestReverse<span class="token punctuation">(</span>t *testing.T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	testcases :<span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>struct <span class="token punctuation">{</span> //定义一个结构体数组
		in, want string //分别是输入和期望输出
	<span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token punctuation">{</span><span class="token string">"hello"</span>, <span class="token string">"olleh"</span><span class="token punctuation">}</span>,
		<span class="token punctuation">{</span><span class="token string">"hello welcome to golang"</span>, <span class="token string">"gnalog ot emoclew olleh"</span><span class="token punctuation">}</span>,
		<span class="token punctuation">{</span><span class="token string">""</span>, <span class="token string">""</span><span class="token punctuation">}</span>,
		<span class="token punctuation">{</span><span class="token string">"a"</span>, <span class="token string">"a"</span><span class="token punctuation">}</span>,
		<span class="token punctuation">{</span><span class="token string">"ab"</span>, <span class="token string">"ba"</span><span class="token punctuation">}</span>,
		<span class="token punctuation">{</span><span class="token string">"abc!"</span>, <span class="token string">"!cba"</span><span class="token punctuation">}</span>,
		<span class="token punctuation">{</span><span class="token string">"abc!def12321fedcba"</span>, <span class="token string">"abcdef12321fed!cba"</span><span class="token punctuation">}</span>,
		<span class="token punctuation">{</span><span class="token string">"我是中国人"</span>, <span class="token string">"人中国是我"</span><span class="token punctuation">}</span>,
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> _, c :<span class="token operator">=</span> range testcases <span class="token punctuation">{</span>
		got :<span class="token operator">=</span> reverse<span class="token punctuation">(</span>c.in<span class="token punctuation">)</span>
		<span class="token keyword">if</span> got <span class="token operator">!=</span> c.want <span class="token punctuation">{</span>
			t.Errorf<span class="token punctuation">(</span><span class="token string">"reverse(%q) == %q, want %q"</span>, c.in, got, c.want<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>💡简单的一个案例如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token punctuation">\</span>Desktop<span class="token punctuation">\</span>test<span class="token punctuation">\</span>fuzz-demo<span class="token operator">></span> go <span class="token builtin class-name">test</span>
--- FAIL: TestReverse <span class="token punctuation">(</span><span class="token number">0</span>.00s<span class="token punctuation">)</span>
    reverse_test.go:28: reverse<span class="token punctuation">(</span><span class="token string">"我是中国人"</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">"<span class="token entity" title="\xba">\xba</span><span class="token entity" title="\xba">\xba</span>佛學䯘摈<span class="token entity" title="\xe6">\xe6</span>"</span>, want <span class="token string">"人中国是我"</span>
FAIL
<span class="token builtin class-name">exit</span> status <span class="token number">1</span>
FAIL    nsddd.top/fuzz-demo     <span class="token number">0</span>.264s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>当然，我们的目的不仅仅是为了解决它，而是说明我们的测试方法或许可以改进；</p>
<p>我们可能写不了那么多的测试用例，那么我们可以使用模糊测试了</p>
</div>
<h2 id="模糊测试" tabindex="-1"><a class="header-anchor" href="#模糊测试" aria-hidden="true">#</a> 模糊测试</h2>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"testing"</span>
	<span class="token string">"unicode/utf8"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"这是fuzz-demo的reverse_test.go"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestReverse</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	testcases <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span> <span class="token punctuation">{</span> <span class="token comment">//定义一个结构体数组</span>
		in<span class="token punctuation">,</span> want <span class="token builtin">string</span> <span class="token comment">//分别是输入和期望输出</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token punctuation">{</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"olleh"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token string">"hello welcome to golang"</span><span class="token punctuation">,</span> <span class="token string">"gnalog ot emoclew olleh"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token string">"a"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token string">"ab"</span><span class="token punctuation">,</span> <span class="token string">"ba"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token string">"abc!"</span><span class="token punctuation">,</span> <span class="token string">"!cba"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token string">"abc!def12321fedcba"</span><span class="token punctuation">,</span> <span class="token string">"abcdef12321fed!cba"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// {"我是中国人", "人中国是我"},</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> testcases <span class="token punctuation">{</span>
		got <span class="token operator">:=</span> <span class="token function">Reverse</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>in<span class="token punctuation">)</span>
		<span class="token keyword">if</span> got <span class="token operator">!=</span> c<span class="token punctuation">.</span>want <span class="token punctuation">{</span>
			t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"reverse(%q) == %q, want %q"</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>in<span class="token punctuation">,</span> got<span class="token punctuation">,</span> c<span class="token punctuation">.</span>want<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">FuzzReverse</span><span class="token punctuation">(</span>f <span class="token operator">*</span>testing<span class="token punctuation">.</span>F<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// ...这是模糊测试的代码</span>
	<span class="token comment">// 添加测试集</span>
	testcases <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"hello world"</span><span class="token punctuation">,</span> <span class="token string">"hello welcome to golang"</span><span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">,</span> <span class="token string">"123124"</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> testcases <span class="token punctuation">{</span>
		<span class="token comment">//添加测试集</span>
		f<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	f<span class="token punctuation">.</span><span class="token function">Fuzz</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">,</span> a <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		got <span class="token operator">:=</span> <span class="token function">Reverse</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
		inRevers <span class="token operator">:=</span> <span class="token function">Reverse</span><span class="token punctuation">(</span>got<span class="token punctuation">)</span> <span class="token comment">//反转两次，应该和原来的一样(a == inRevers)</span>
		<span class="token keyword">if</span> got <span class="token operator">==</span> inRevers <span class="token punctuation">{</span>
			t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"reverse(%q) == %q, want %q"</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> got<span class="token punctuation">,</span> a<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> utf8<span class="token punctuation">.</span><span class="token function">ValidString</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>utf8<span class="token punctuation">.</span><span class="token function">ValidString</span><span class="token punctuation">(</span>got<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Reverse produced invalid UTF-8 string: %q"</span><span class="token punctuation">,</span> got<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="custom-container tip"><p class="custom-container-title">执行方法</p>
<p>执行所有 Fuzz 开头的模糊测试：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> go <span class="token builtin class-name">test</span> <span class="token parameter variable">-fuzz</span><span class="token operator">=</span>Fuzz  <span class="token comment"># 执行所有 Fuzz 开头的模糊测试</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\test\fuzz-demo> go test -fuzz=Fuzz
--- FAIL: TestReverse (0.00s)
    reverse_test.go:29: reverse("我是中国人") == "\xba\xba佛學䯘摈\xe6", want "人中国是我"
FAIL
exit status 1
FAIL    nsddd.top/fuzz-demo     0.268s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/17.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/19.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


