<template><div><ul>
<li><a href="https://github.com/3293172751/cs-awesome-Block_Chain" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第4节-依赖倒转原则" tabindex="-1"><a class="header-anchor" href="#第4节-依赖倒转原则" aria-hidden="true">#</a> 第4节 依赖倒转原则</h1>
<div><a href = '3.md' style='float:left'>⬆️上一节🔗</a><a href = '5.md' style='float: right'>⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕Java和Golang的设计模式，设计模式介绍、创建者模式、结构型模式、行为型模式。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="原则" tabindex="-1"><a class="header-anchor" href="#原则" aria-hidden="true">#</a> 原则</h2>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p><strong>(Dependence</strong>  <strong>Inversion Principle, DIP)</strong></p>
<p>依赖于抽象(接口)，不要依赖具体的实现(类)，也就是针对接口编程。</p>
</div>
<h2 id="没有使用依赖倒转" tabindex="-1"><a class="header-anchor" href="#没有使用依赖倒转" aria-hidden="true">#</a> 没有使用依赖倒转</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 依赖倒转原则</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">//+司机张三、李四、王五</span>
<span class="token comment">//+++张三开奔驰</span>
<span class="token comment">//+++李四开宝马</span>

<span class="token comment">//张三奔驰</span>
<span class="token keyword">type</span> Zhangsan <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">//李四宝马</span>
<span class="token keyword">type</span> Lisi <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">//张三开奔驰</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Zhangsan<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"奔驰在跑"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//奔驰</span>
<span class="token keyword">type</span> Benz <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">//宝马</span>
<span class="token keyword">type</span> Bmw <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">//奔驰</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Benz<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"奔驰在跑"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//宝马</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Lisi<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"宝马在跑"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//张三想开宝马</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Zhangsan<span class="token punctuation">)</span> <span class="token function">WantRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"张三想开宝马"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//李四想开奔驰</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Lisi<span class="token punctuation">)</span> <span class="token function">WantRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"李四想开奔驰"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//张三开奔驰</span>
	zhangsan <span class="token operator">:=</span> <span class="token operator">&amp;</span>Zhangsan<span class="token punctuation">{</span><span class="token punctuation">}</span>
	zhangsan<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//李四开宝马</span>
	lisi <span class="token operator">:=</span> <span class="token operator">&amp;</span>Lisi<span class="token punctuation">{</span><span class="token punctuation">}</span>
	lisi<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">//张三想开宝马</span>
	zhangsan<span class="token punctuation">.</span><span class="token function">WantRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//李四想开奔驰</span>
	lisi<span class="token punctuation">.</span><span class="token function">WantRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super\81-main.go"</span>
奔驰在跑
宝马在跑
张三想开宝马
李四想开奔驰
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">📜 对上面的解释</p>
<p>我们可以看出这样设计的弊端，我们希望张三开奔驰，李四想开奔驰的时候，需要额外加方法。</p>
<p><img src="http://sm.nsddd.top/smimage-20221128112622244.png" alt="image-20221128112622244"></p>
<p><strong>我们应该尽量降低耦合度的发生</strong></p>
<p>我们来看上面的代码和图中每个模块之间的依赖关系，实际上并没有用到任何的<code v-pre>interface</code>接口层的代码，显然最后我们的两个业务 <code v-pre>张三开奔驰</code>, <code v-pre>李四开宝马</code>，程序中也都实现了。但是这种设计的问题就在于，小规模没什么问题，但是一旦程序需要扩展，比如我现在要增加一个<code v-pre>丰田汽车</code> 或者 司机<code v-pre>王五</code>， 那么模块和模块的依赖关系将成指数级递增，想蜘蛛网一样越来越难维护和捋顺。</p>
</div>
<h2 id="使用依赖倒转" tabindex="-1"><a class="header-anchor" href="#使用依赖倒转" aria-hidden="true">#</a> 使用依赖倒转</h2>
<p><img src="http://sm.nsddd.top/smimage-20221128113217815.png" alt="image-20221128113217815"></p>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>我们需要记住需要引入抽象层，接口其实最大的目的也是为了实现抽象，对接业务层和实现层。</p>
<p>我们依照抽象层，依次实现每个实现层的模块，在我们写实现层代码的时候，实际上我们只需要参考对应的抽象层实现就好了，实现每个模块，也和其他的实现的模块没有关系，这样也符合了上面介绍的开闭原则。这样实现起来每个模块只依赖对象的接口，而和其他模块没关系，依赖关系单一。系统容易扩展和维护。</p>
<p>我们在指定业务逻辑也是一样，只需要参考抽象层的接口来业务就好了，抽象层暴露出来的接口就是我们业务层可以使用的方法，然后可以通过多态的线下，接口指针指向哪个实现模块，调用了就是具体的实现方法，这样我们业务逻辑层也是依赖抽象成编程。</p>
</div>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">//====> abstract layer &lt;========</span>
<span class="token keyword">type</span> Car <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Driver <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Drive</span><span class="token punctuation">(</span>car Car<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//====> Implementation layer &lt;========</span>
<span class="token keyword">type</span> BenZ <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>benz <span class="token operator">*</span>BenZ<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Benz is running..."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Bmw <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>bmw <span class="token operator">*</span>Bmw<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Bmw is running..."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Zhang_3 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>zhang3 <span class="token operator">*</span>Zhang_3<span class="token punctuation">)</span> <span class="token function">Drive</span><span class="token punctuation">(</span>car Car<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Zhang3 drive -->"</span><span class="token punctuation">,</span> car<span class="token punctuation">)</span>
	car<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Li_4 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>li4 <span class="token operator">*</span>Li_4<span class="token punctuation">)</span> <span class="token function">Drive</span><span class="token punctuation">(</span>car Car<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"li4 drive -->"</span><span class="token punctuation">,</span> car<span class="token punctuation">)</span>
	car<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Wangwu <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>wangwu <span class="token operator">*</span>Wangwu<span class="token punctuation">)</span> <span class="token function">Drive</span><span class="token punctuation">(</span>car Car<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"wangwu drive -->"</span><span class="token punctuation">,</span> car<span class="token punctuation">)</span>
	car<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//====> Business logic layer &lt;=========</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//Zhang 3 drives BMW</span>
	<span class="token keyword">var</span> bmw Car <span class="token operator">=</span> <span class="token operator">&amp;</span>Bmw<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">//In 4 Mercedes drives</span>
	<span class="token keyword">var</span> benz Car <span class="token operator">=</span> <span class="token operator">&amp;</span>BenZ<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token keyword">var</span> zhang3 Driver <span class="token operator">=</span> <span class="token operator">&amp;</span>Zhang_3<span class="token punctuation">{</span><span class="token punctuation">}</span>
	zhang3<span class="token punctuation">.</span><span class="token function">Drive</span><span class="token punctuation">(</span>bmw<span class="token punctuation">)</span>

	<span class="token comment">//Zhang San wants to drive a BMW</span>
	zhang3<span class="token punctuation">.</span><span class="token function">Drive</span><span class="token punctuation">(</span>benz<span class="token punctuation">)</span>

	<span class="token keyword">var</span> li4 Driver
	li4 <span class="token operator">=</span> <span class="token operator">&amp;</span>Li_4<span class="token punctuation">{</span><span class="token punctuation">}</span>
	li4<span class="token punctuation">.</span><span class="token function">Drive</span><span class="token punctuation">(</span>benz<span class="token punctuation">)</span>

	<span class="token comment">//Li si wants to drive Mercedes</span>
	li4<span class="token punctuation">.</span><span class="token function">Drive</span><span class="token punctuation">(</span>bmw<span class="token punctuation">)</span>

	<span class="token keyword">var</span> wangwu Driver <span class="token operator">=</span> <span class="token operator">&amp;</span>Wangwu<span class="token punctuation">{</span><span class="token punctuation">}</span>
	wangwu<span class="token punctuation">.</span><span class="token function">Drive</span><span class="token punctuation">(</span>benz<span class="token punctuation">)</span>
	wangwu<span class="token punctuation">.</span><span class="token function">Drive</span><span class="token punctuation">(</span>bmw<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super\82-main.go"</span>
Zhang3 drive --<span class="token operator">></span> <span class="token operator">&amp;</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
Bmw is running<span class="token punctuation">..</span>.
Zhang3 drive --<span class="token operator">></span> <span class="token operator">&amp;</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
Benz is running<span class="token punctuation">..</span>.
li4 drive --<span class="token operator">></span> <span class="token operator">&amp;</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
Benz is running<span class="token punctuation">..</span>.
li4 drive --<span class="token operator">></span> <span class="token operator">&amp;</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
Bmw is running<span class="token punctuation">..</span>.
wangwu drive --<span class="token operator">></span> <span class="token operator">&amp;</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
Benz is running<span class="token punctuation">..</span>.
wangwu drive --<span class="token operator">></span> <span class="token operator">&amp;</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
Bmw is running<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '3.md' style='float:left'>⬆️上一节🔗</a><a href = '5.md' style='float: right'>⬇️下一节🔗</a></div></li></ul>
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


