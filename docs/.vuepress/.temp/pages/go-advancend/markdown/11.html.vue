<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第11节-go语言特性代码展示与新特性泛型" tabindex="-1"><a class="header-anchor" href="#第11节-go语言特性代码展示与新特性泛型" aria-hidden="true">#</a> 第11节 Go语言特性代码展示与新特性泛型</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/10.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="go18" tabindex="-1"><a class="header-anchor" href="#go18" aria-hidden="true">#</a> Go18</h2>
<blockquote>
<p>go 1.18 的正式版（go version go1.18 windows/amd64  ），今天我们就GO的新特性：泛型 进行简单的尝鲜使用。
GO 中泛型涉及到两个关键词：<strong>类型参数</strong>、<strong>类型约束</strong></p>
</blockquote>
<h2 id="值、引用、指针" tabindex="-1"><a class="header-anchor" href="#值、引用、指针" aria-hidden="true">#</a> 值、引用、指针</h2>
<ul>
<li><a href="../code/11.go">对应的文件</a></li>
</ul>
<h2 id="泛型和约束" tabindex="-1"><a class="header-anchor" href="#泛型和约束" aria-hidden="true">#</a> 泛型和约束</h2>
<h3 id="go-中泛型的语法" tabindex="-1"><a class="header-anchor" href="#go-中泛型的语法" aria-hidden="true">#</a> GO 中泛型的语法</h3>
<p>以下示例中 [] 类型参数type0、type2，其中type0受可比较类型约束 ，type1 受 int64 或 float64 类型约束。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> funcName<span class="token punctuation">[</span>type0 comparable<span class="token punctuation">,</span> type1 <span class="token builtin">int64</span> <span class="token operator">|</span> <span class="token builtin">float64</span><span class="token punctuation">]</span><span class="token punctuation">(</span>arg0 type0<span class="token punctuation">,</span> arg1 type1<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>该函数内部打印每个参数的类型和值</p>
</blockquote>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">funcName</span><span class="token punctuation">(</span><span class="token string">"arg0"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token function">funcName</span><span class="token punctuation">(</span><span class="token string">"arg0"</span><span class="token punctuation">,</span> <span class="token number">3.5</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> funcName<span class="token punctuation">[</span>type0 comparable<span class="token punctuation">,</span> type1 <span class="token builtin">int</span> <span class="token operator">|</span> <span class="token builtin">float64</span><span class="token punctuation">]</span><span class="token punctuation">(</span>arg0 type0<span class="token punctuation">,</span> arg1 type1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"arg0 type: %T value: %v\t"</span><span class="token punctuation">,</span> arg0<span class="token punctuation">,</span> arg0<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"arg1 type: %T value: %v\n"</span><span class="token punctuation">,</span> arg1<span class="token punctuation">,</span> arg1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>arg0 type: string value: arg0   arg1 type: int value: 1
arg0 type: string value: arg0   arg1 type: float64 value: 3.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Go泛型 若存在违反泛型函数中的类型约束，能够在编译时捕获</p>
<p>我们尝试给<code v-pre>funcName</code> 函数的第二个参数传如<code v-pre>string</code>字面量</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func main(){
	funcName("arg0", "string")
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译结果：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>command-line-arguments

.\test_1.go:9:10: string does not implement int|float64 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指定类型参数调用" tabindex="-1"><a class="header-anchor" href="#指定类型参数调用" aria-hidden="true">#</a> 指定类型参数调用</h3>
<p>指定类型参数-在方括号内的类型名称-来明确你所调用的函数中应该用哪些类型来替代类型参数</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	funcName<span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token string">"arg0"</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过interfac进行类型约束" tabindex="-1"><a class="header-anchor" href="#通过interfac进行类型约束" aria-hidden="true">#</a> 通过interfac进行类型约束</h3>
<p>类型约束可以通过<code v-pre>interface</code> 进行绑定</p>
<p>声明一个Number interface类型作为类型限制
在<code v-pre>interface</code>内声明<code v-pre>int64</code>和<code v-pre>float64</code>的合集</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>type Number interface {
   float64 | int
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>修改实例函数 arg1 类型参数的类型约束为接口 Number</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">funcName</span><span class="token punctuation">(</span><span class="token string">"arg0"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token function">funcName</span><span class="token punctuation">(</span><span class="token string">"arg0"</span><span class="token punctuation">,</span> <span class="token number">3.5</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> funcName<span class="token punctuation">[</span>type0 comparable<span class="token punctuation">,</span> type1 Number<span class="token punctuation">]</span><span class="token punctuation">(</span>arg0 type0<span class="token punctuation">,</span> arg1 type1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"arg0 type: %T value: %v\t"</span><span class="token punctuation">,</span> arg0<span class="token punctuation">,</span> arg0<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"arg1 type: %T value: %v\n"</span><span class="token punctuation">,</span> arg1<span class="token punctuation">,</span> arg1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>arg0 type: string value: arg0   arg1 type: int value: 1
arg0 type: string value: arg0   arg1 type: float64 value: 3.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/10.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/12.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


