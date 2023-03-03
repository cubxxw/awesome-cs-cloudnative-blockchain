<template><div><h1 id="go语言精度丢失问题" tabindex="-1"><a class="header-anchor" href="#go语言精度丢失问题" aria-hidden="true">#</a> Go语言精度丢失问题</h1>
<nav class="table-of-contents"><ul><li><router-link to="#问题描述">问题描述</router-link><ul><li><router-link to="#为什么不直接使用-float64">为什么不直接使用 float64？</router-link></li><li><router-link to="#为什么不直接使用-big-rat">为什么不直接使用 big.Rat？</router-link></li><li><router-link to="#出现原因总结">出现原因总结</router-link></li></ul></li><li><router-link to="#解决方法">解决方法</router-link></li><li><router-link to="#完美解决">完美解决</router-link></li></ul></nav>
<p>[toc]</p>
<h2 id="问题描述" tabindex="-1"><a class="header-anchor" href="#问题描述" aria-hidden="true">#</a> 问题描述</h2>
<p><strong>在使用Go做项目的时候，一定要注意Go语言的精度丢失问题，如下：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">[</span>root@mail golang<span class="token punctuation">]</span># cat gofloat<span class="token punctuation">.</span><span class="token keyword">go</span> 
<span class="token comment">/*************************************************************************
    > File Name: gofloat.go
    > Author: smile
    > Mail: 3293172751nss@gmail.com 
    > Created Time: Wed 31 Aug 2022 05:43:18 PM CST
 ************************************************************************/</span>
<span class="token keyword">package</span> main
<span class="token keyword">import</span><span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token comment">//Go语言精度丢失问题</span>
    m1 <span class="token operator">:=</span> <span class="token number">8.3</span>
    m2 <span class="token operator">:=</span> <span class="token number">3.8</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"m1 - m2 = "</span><span class="token punctuation">,</span>m1 <span class="token operator">-</span> m2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token punctuation">[</span>root@mail golang<span class="token punctuation">]</span># <span class="token keyword">go</span> run  gofloat<span class="token punctuation">.</span><span class="token keyword">go</span>
m1 <span class="token operator">-</span> m2 <span class="token operator">=</span>  <span class="token number">4.500000000000001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>可以看到输出的<code v-pre>m1</code> - <code v-pre>m2</code> =  <code v-pre>4.500000000000001</code></p>
</blockquote>
<h3 id="为什么不直接使用-float64" tabindex="-1"><a class="header-anchor" href="#为什么不直接使用-float64" aria-hidden="true">#</a> 为什么不直接使用 float64？</h3>
<p>因为 float64（或任何二进制浮点类型，实际上）不能<code v-pre>0.1</code>准确地表示数字。</p>
<p>考虑以下代码：http://play.golang.org/p/TQBd4yJe6B您可能期望它打印出来<code v-pre>10</code>，但实际上打印出来<code v-pre>9.999999999999831</code>。随着时间的推移，这些小错误真的会加起来！</p>
<h3 id="为什么不直接使用-big-rat" tabindex="-1"><a class="header-anchor" href="#为什么不直接使用-big-rat" aria-hidden="true">#</a> 为什么不直接使用 big.Rat？</h3>
<p>big.Rat 适合表示有理数，但 Decimal 更适合表示金钱。为什么？这是一个（人为的）示例：</p>
<p>假设你使用 big.Rat，你有两个数字，x 和 y，都代表 1/3，你有<code v-pre>z = 1 - x - y = 1/3</code>. 如果将每一个都打印出来，则字符串输出必须在某处停止（为简单起见，假设它停止在 3 个十进制数字处），因此您将得到 0.333、0.333 和 0.333。但是另一个 0.001 去哪儿了？</p>
<p>这是上面的示例代码：<a href="http://play.golang.org/p/lCZZs0w9KE" target="_blank" rel="noopener noreferrer">http 😕/play.golang.org/p/lCZZs0w9KE<ExternalLinkIcon/></a></p>
<p>使用 Decimal，打印出来的字符串准确地表示数字。所以，如果你有<code v-pre>x = y = 1/3</code>（精度为 3），它们实际上将等于 0.333，当你这样做时<code v-pre>z = 1 - x - y</code>，它们<code v-pre>z</code>将等于 0.334。没有钱是下落不明的！</p>
<p>你还是要小心。如果您想以<code v-pre>N</code>3 种方式拆分数字，则不能只发送<code v-pre>N/3</code>给三个不同的人。你必须选择一个发送 <code v-pre>N - (2/3*N)</code>到。该人将获得一分钱的剩余部分。</p>
<p>但是，使用 Decimal 比使用 big.Rat 更容易小心。</p>
<h3 id="出现原因总结" tabindex="-1"><a class="header-anchor" href="#出现原因总结" aria-hidden="true">#</a> 出现原因总结</h3>
<ul>
<li>
<p>出现浮点数不精确的原因是，浮点数储存至内存中时，2的-1、-2……-n次方不能精确表示小数部分，所以再把这个数从地址中取出来进行计算就出现了偏差。</p>
</li>
<li>
<p>不是所有的float相加减乘除都一定出现偏差，具体要根据golang实现IEEE 754的情况定。</p>
</li>
</ul>
<h2 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h2>
<blockquote>
<p>使用第三方包来解决精度丢失问题</p>
<ul>
<li><a href="https://github.com/shopspring/decimal" target="_blank" rel="noopener noreferrer">https://github.com/shopspring/decimal<ExternalLinkIcon/></a></li>
</ul>
</blockquote>
<p><strong>用法</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/shopspring/decimal"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	price<span class="token punctuation">,</span> err <span class="token operator">:=</span> decimal<span class="token punctuation">.</span><span class="token function">NewFromString</span><span class="token punctuation">(</span><span class="token string">"136.02"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	quantity <span class="token operator">:=</span> decimal<span class="token punctuation">.</span><span class="token function">NewFromInt</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>

	fee<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> decimal<span class="token punctuation">.</span><span class="token function">NewFromString</span><span class="token punctuation">(</span><span class="token string">".035"</span><span class="token punctuation">)</span>
	taxRate<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> decimal<span class="token punctuation">.</span><span class="token function">NewFromString</span><span class="token punctuation">(</span><span class="token string">".08875"</span><span class="token punctuation">)</span>

	subtotal <span class="token operator">:=</span> price<span class="token punctuation">.</span><span class="token function">Mul</span><span class="token punctuation">(</span>quantity<span class="token punctuation">)</span>

	preTax <span class="token operator">:=</span> subtotal<span class="token punctuation">.</span><span class="token function">Mul</span><span class="token punctuation">(</span>fee<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>decimal<span class="token punctuation">.</span><span class="token function">NewFromFloat</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	total <span class="token operator">:=</span> preTax<span class="token punctuation">.</span><span class="token function">Mul</span><span class="token punctuation">(</span>taxRate<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>decimal<span class="token punctuation">.</span><span class="token function">NewFromFloat</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Subtotal:"</span><span class="token punctuation">,</span> subtotal<span class="token punctuation">)</span>                      <span class="token comment">// Subtotal: 408.06</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Pre-tax:"</span><span class="token punctuation">,</span> preTax<span class="token punctuation">)</span>                         <span class="token comment">// Pre-tax: 422.3421</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Taxes:"</span><span class="token punctuation">,</span> total<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>preTax<span class="token punctuation">)</span><span class="token punctuation">)</span>                <span class="token comment">// Taxes: 37.482861375</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Total:"</span><span class="token punctuation">,</span> total<span class="token punctuation">)</span>                            <span class="token comment">// Total: 459.824961375</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Tax rate:"</span><span class="token punctuation">,</span> total<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>preTax<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Div</span><span class="token punctuation">(</span>preTax<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// Tax rate: 0.08875</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="完美解决" tabindex="-1"><a class="header-anchor" href="#完美解决" aria-hidden="true">#</a> 完美解决</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-08-31 17:58:18
 * @LastEditors: xiongxinwei 3293172751nss@gmail.com
 * @LastEditTime: 2022-08-31 17:58:35
 * @FilePath: \code\gofloat\gofloat.go
 * @Description: Go语言精度丢失问题
 */</span>
 <span class="token keyword">package</span> main

 <span class="token keyword">import</span> <span class="token punctuation">(</span>
	 <span class="token string">"fmt"</span>
 
	 <span class="token string">"github.com/shopspring/decimal"</span>
 <span class="token punctuation">)</span>
 
 <span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
	 <span class="token comment">//Go语言精度丢失问题</span>
	 m1 <span class="token operator">:=</span> <span class="token number">8.3</span>
	 m2 <span class="token operator">:=</span> <span class="token number">3.8</span>
	 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"m1 - m2 = "</span><span class="token punctuation">,</span> m1<span class="token operator">-</span>m2<span class="token punctuation">)</span>
 
	 <span class="token keyword">var</span> num1 <span class="token builtin">float64</span> <span class="token operator">=</span> <span class="token number">3.1</span>
	 <span class="token keyword">var</span> num2 <span class="token builtin">float64</span> <span class="token operator">=</span> <span class="token number">4.2</span>
	 d1 <span class="token operator">:=</span> decimal<span class="token punctuation">.</span><span class="token function">NewFromFloat</span><span class="token punctuation">(</span>num1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>decimal<span class="token punctuation">.</span><span class="token function">NewFromFloat</span><span class="token punctuation">(</span>num2<span class="token punctuation">)</span><span class="token punctuation">)</span>
	 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"num1 - num2 = "</span><span class="token punctuation">,</span> d1<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS D:\文档\git\Block_Chain\go-advancend\code\gofloat> go run .\gofloat.go
m1 - m2 =  4.500000000000001
num1 - num2 =  7.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


