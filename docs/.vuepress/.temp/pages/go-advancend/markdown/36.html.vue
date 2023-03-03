<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第36节-go语言细节" tabindex="-1"><a class="header-anchor" href="#第36节-go语言细节" aria-hidden="true">#</a> 第36节 Go语言细节</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/35.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="go语言命令" tabindex="-1"><a class="header-anchor" href="#go语言命令" aria-hidden="true">#</a> Go语言命令</h2>
<ul>
<li>go vat：静态检测</li>
</ul>
<p><strong>Go语言全部都是值传递，所以不会改变值。</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>mySlice <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">,</span><span class="token number">40</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">}</span>

<span class="token comment">// It doesn't change the slice value</span>
<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span>value <span class="token operator">:=</span> <span class="token keyword">range</span> mySlice <span class="token punctuation">{</span>
	value <span class="token operator">*=</span> <span class="token number">2</span> 
<span class="token punctuation">}</span>

<span class="token comment">// It can change the slice value</span>
<span class="token keyword">for</span> index<span class="token punctuation">,</span><span class="token boolean">_</span> <span class="token operator">:=</span> <span class="token keyword">range</span> mySlice <span class="token punctuation">{</span>
    mySlice<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">*=</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>指针传参固定写法：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    para <span class="token operator">:=</span> Paramenter<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">"aaa"</span><span class="token punctuation">}</span>
    <span class="token function">changeParament</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>para<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">changeParament</span><span class="token punctuation">(</span>para <span class="token operator">*</span>Paramenter<span class="token punctuation">,</span>value <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    para<span class="token punctuation">.</span>name <span class="token operator">=</span> value
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/35.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/37.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


