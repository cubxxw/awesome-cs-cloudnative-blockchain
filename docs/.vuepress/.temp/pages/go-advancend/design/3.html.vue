<template><div><ul>
<li><a href="https://github.com/3293172751/cs-awesome-Block_Chain" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第3节-开闭原则" tabindex="-1"><a class="header-anchor" href="#第3节-开闭原则" aria-hidden="true">#</a> 第3节 开闭原则</h1>
<div><a href = '2.md' style='float:left'>⬆️上一节🔗</a><a href = '4.md' style='float: right'>⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕Java和Golang的设计模式，设计模式介绍、创建者模式、结构型模式、行为型模式。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="原则" tabindex="-1"><a class="header-anchor" href="#原则" aria-hidden="true">#</a> 原则</h2>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>开闭原则 <strong>(Open-Closed Principle, OCP)</strong></p>
<p>类的改动是通过增加代码进行的，而不是修改源代码。</p>
</div>
<h2 id="没有使用开闭原则" tabindex="-1"><a class="header-anchor" href="#没有使用开闭原则" aria-hidden="true">#</a> 没有使用开闭原则</h2>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// The principle of opening and closing</span>
<span class="token comment">// Path: 79-main.go</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token comment">// The principle of opening and closing</span>
<span class="token keyword">type</span> Banker <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// Deposit business</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Banker<span class="token punctuation">)</span> <span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"存款成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Withdrawal business</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Banker<span class="token punctuation">)</span> <span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"取款成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Transfer business</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Banker<span class="token punctuation">)</span> <span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"转账成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	b <span class="token operator">:=</span> <span class="token operator">&amp;</span>Banker<span class="token punctuation">{</span><span class="token punctuation">}</span>

	b<span class="token punctuation">.</span><span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	b<span class="token punctuation">.</span><span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	b<span class="token punctuation">.</span><span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需求：我们需要加一个股票功能，我们需要额外添加功能。</p>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>但是我们类可能看不出来，如果一个类很庞大，添加功能的时候就需要特别小心。</p>
<p>这就是设计的弊端。</p>
</div>
<p>那么，如果我们拥有接口, <code v-pre>interface</code>这个东西，那么我们就可以抽象一层出来，制作一个抽象的Banker模块，然后提供一个抽象的方法。 分别根据这个抽象模块，去实现<code v-pre>支付Banker（实现支付方法）</code>,<code v-pre>转账Banker（实现转账方法）</code></p>
<p><img src="http://sm.cubxxw.com/smimage-20221127231259024.png" alt="image-20221127231259024"></p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>那么即使 Banker 的添加，不会修改 任何已经稳定的代码，出现问题也不会连累其他模块。</p>
</div>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 开闭原则</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">// 抽象的银行接口</span>
<span class="token keyword">type</span> Banker <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">//存款</span>
	<span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//取款</span>
	<span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//转账</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现银行接口</span>
<span class="token keyword">type</span> Bank <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// 存款</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Bank<span class="token punctuation">)</span> <span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"存款成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 取款</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Bank<span class="token punctuation">)</span> <span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"取款成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 转账</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Bank<span class="token punctuation">)</span> <span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"转账成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 我们可以再定义一个支付宝的银行接口</span>
<span class="token keyword">type</span> Alipay <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// 存款</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>Alipay<span class="token punctuation">)</span> <span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"支付宝存款成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 取款</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>Alipay<span class="token punctuation">)</span> <span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"支付宝取款成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	b <span class="token operator">:=</span> <span class="token operator">&amp;</span>Bank<span class="token punctuation">{</span><span class="token punctuation">}</span>  <span class="token comment">//实现了接口</span>
	b<span class="token punctuation">.</span><span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	b<span class="token punctuation">.</span><span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	b<span class="token punctuation">.</span><span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 

	a <span class="token operator">:=</span> <span class="token operator">&amp;</span>Alipay<span class="token punctuation">{</span><span class="token punctuation">}</span>
	a<span class="token punctuation">.</span><span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	a<span class="token punctuation">.</span><span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p>
<p><code v-pre>Alipay{}</code> 结构体并不是需要去实现接口。所以作为扩展性。</p>
</div>
<h2 id="实现架构层-基于抽象层业务封装" tabindex="-1"><a class="header-anchor" href="#实现架构层-基于抽象层业务封装" aria-hidden="true">#</a> 实现架构层，基于抽象层业务封装</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>实现一个架构层，基于抽象层进行业务封装，针对 interface 进行封装。</p>
</div>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// The principle of opening and closing</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">//Abstract bank interface</span>
<span class="token keyword">type</span> Banker <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">//deposit</span>
	<span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//Withdrawal</span>
	<span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//Transfer</span>
<span class="token punctuation">}</span>

<span class="token comment">//Implement the bank interface</span>
<span class="token keyword">type</span> Bank <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">//deposit</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Bank<span class="token punctuation">)</span> <span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"存款成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//Withdrawal</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Bank<span class="token punctuation">)</span> <span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"取款成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//Transfer</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Bank<span class="token punctuation">)</span> <span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"转账成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//We can define another Alipay bank interface</span>
<span class="token keyword">type</span> Alipay <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">//deposit</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>Alipay<span class="token punctuation">)</span> <span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"支付宝存款成功"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//Withdrawal</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>Alipay<span class="token punctuation">)</span> <span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Alipay withdrawal successful"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//Transfer</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>Alipay<span class="token punctuation">)</span> <span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Alipay transfer successful"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//Implement an abstraction layer to isolate the different implementation layers so that new implementation layers can be added without modifying the original code, which is the open-close principle</span>
<span class="token keyword">func</span> <span class="token function">BankBusiness</span><span class="token punctuation">(</span>bank Banker<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	bank<span class="token punctuation">.</span><span class="token function">Deposit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//The business of deposits</span>
	<span class="token function">BankBusiness</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Bank<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token function">BankBusiness</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Alipay<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super\80-main.go"</span>
存款成功
支付宝存款成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '2.md' style='float:left'>⬆️上一节🔗</a><a href = '4.md' style='float: right'>⬇️下一节🔗</a></div></li></ul>
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


