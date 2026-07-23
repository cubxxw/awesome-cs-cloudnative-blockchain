<template><div><ul>
<li><a href="https://github.com/3293172751/cs-awesome-Block_Chain" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第2节-单一职责原则" tabindex="-1"><a class="header-anchor" href="#第2节-单一职责原则" aria-hidden="true">#</a> 第2节 单一职责原则</h1>
<div><a href = '1.md' style='float:left'>⬆️上一节🔗</a><a href = '3.md' style='float: right'>⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕Java和Golang的设计模式，设计模式介绍、创建者模式、结构型模式、行为型模式。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="什么是单一职责原则" tabindex="-1"><a class="header-anchor" href="#什么是单一职责原则" aria-hidden="true">#</a> 什么是单一职责原则</h2>
<div class="custom-container tip"><p class="custom-container-title">单一职责原则</p>
<p>类的职责单一，对外只提供一种功能，二引起类变化的原因都只有一个</p>
</div>
<h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
 * @Description: 单一职责原则
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-10-26 20:08:39
 * @LastEditTime: 2022-10-26 20:15:04
 * @FilePath: \code\设计模式\设计模式第1节.go
 * @Github_Address: https://github.com/3293172751/cs-awesome-Block_Chain
 * Copyright (c) 2022 by xiongxinwei 3293172751nss@gmail.com, All Rights Reserved. @blog: http://cubxxw.com
 */</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">Work</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">Drive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// Path: 设计模式\设计模式第1节.go</span>
<span class="token comment">//上面的代码可以设计成单一职责原则</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Password <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Password <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">GetInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"获取用户信息"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Password<span class="token punctuation">)</span> <span class="token function">GetInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"获取密码信息"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span><span class="token punctuation">}</span>
	p<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	p<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	p<span class="token punctuation">.</span><span class="token function">Work</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	p<span class="token punctuation">.</span><span class="token function">Drive</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">//单一职责原则</span>
	u <span class="token operator">:=</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span><span class="token punctuation">}</span>
	u<span class="token punctuation">.</span><span class="token function">GetInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	pwd <span class="token operator">:=</span> <span class="token operator">&amp;</span>Password<span class="token punctuation">{</span><span class="token punctuation">}</span>
	pwd<span class="token punctuation">.</span><span class="token function">GetInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs\go-advancend<span class="token entity" title="\c">\c</span>ode\设计模式\设计模式第1节.go"</span>
获取用户信息
获取密码信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '1.md' style='float:left'>⬆️上一节🔗</a><a href = '3.md' style='float: right'>⬇️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/go-advancend/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://cubxxw.com/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © :本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


