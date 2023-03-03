<template><div><ul>
<li><a href="https://github.com/3293172751/cs-awesome-Block_Chain" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第5节-合成复用原则" tabindex="-1"><a class="header-anchor" href="#第5节-合成复用原则" aria-hidden="true">#</a> 第5节 合成复用原则</h1>
<div><a href = '4.md' style='float:left'>⬆️上一节🔗</a><a href = '6.md' style='float: right'>⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕Java和Golang的设计模式，设计模式介绍、创建者模式、结构型模式、行为型模式。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="原则" tabindex="-1"><a class="header-anchor" href="#原则" aria-hidden="true">#</a> 原则</h2>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>如果使用继承，会导致父类的任何变换都可能影响到子类的行为。如果使用对象组合，就降低了这种依赖关系。对于继承和组合，优先使用组合。</p>
<p>合成复用原则 <strong>(Composite Reuse Principle, CRP)</strong> ：通过组合来实现父类方法</p>
</div>
<h2 id="继承和组合" tabindex="-1"><a class="header-anchor" href="#继承和组合" aria-hidden="true">#</a> 继承和组合</h2>
<p>代替继承，Go 语言通过允许将一个结构嵌入到另一个结构中来鼓励组合，这种方式允许调用在<a href="https://golang.org/doc/effective_go.html#embedding" target="_blank" rel="noopener noreferrer">嵌入<ExternalLinkIcon/></a>结构上定义的方法，就像在包含结构上定义一样。</p>
<p>注意：在这篇文章中，我偶尔会使用面向对象的术语，如基类、子类和覆盖。请记住，Go <em>不支持</em>这些概念;我在这里使用这些术语来说明使用 Go 以这种方式思考会导致问题。</p>
<h2 id="使用合并复用" tabindex="-1"><a class="header-anchor" href="#使用合并复用" aria-hidden="true">#</a> 使用合并复用</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Merge reuse principle</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">//Define a kitten structure and realize the method of eating and sleeping.</span>
<span class="token keyword">type</span> Cat <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token comment">//kitten eats</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Cat<span class="token punctuation">)</span> <span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"CatA eat"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> CatB <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">//继承Cat</span>
	Cat
<span class="token punctuation">}</span>

<span class="token comment">//kitten sleeps</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>CatB<span class="token punctuation">)</span> <span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"CatB sleep"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 组合复用原则(使用组合/聚合关系代替继承关系)</span>
<span class="token keyword">type</span> CatC <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">//组合Cat</span>
	C  <span class="token operator">*</span>Cat  <span class="token comment">//组合一个Cat类型的指针</span>
	CB <span class="token operator">*</span>CatB <span class="token comment">//组合一个CatB类型的指针</span>
<span class="token punctuation">}</span>

<span class="token comment">//kitten eats</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>CatC<span class="token punctuation">)</span> <span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>C<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//调用Cat的Eat方法</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"CatC eat"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	Cat <span class="token operator">:=</span> <span class="token operator">&amp;</span>Cat<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">//kitten eats</span>
	Cat<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"=================继承================="</span><span class="token punctuation">)</span>
	CatB <span class="token operator">:=</span> <span class="token operator">&amp;</span>CatB<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">//kitten eats</span>
	CatB<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//kitten sleeps</span>
	CatB<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"=================组合================="</span><span class="token punctuation">)</span>
	CatC <span class="token operator">:=</span> <span class="token operator">&amp;</span>CatC<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">//kitten eats</span>
	CatC<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//kitten sleeps</span>
	CatC<span class="token punctuation">.</span>CB<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	CatC<span class="token punctuation">.</span>C<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super\83-main.go"</span>
CatA eat
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>继承<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
CatA eat
CatB <span class="token function">sleep</span>
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>组合<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
CatA eat
CatC eat
CatB <span class="token function">sleep</span>
CatA eat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '4.md' style='float:left'>⬆️上一节🔗</a><a href = '6.md' style='float: right'>⬇️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/go-advancend/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://nsddd.top/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © :本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


