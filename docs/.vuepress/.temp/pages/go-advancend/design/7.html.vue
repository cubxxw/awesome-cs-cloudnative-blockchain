<template><div><ul>
<li><a href="https://github.com/3293172751/cs-awesome-Block_Chain" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第7节-工厂模式-创建型模式" tabindex="-1"><a class="header-anchor" href="#第7节-工厂模式-创建型模式" aria-hidden="true">#</a> 第7节 工厂模式（创建型模式）</h1>
<div><a href = '6.md' style='float:left'>⬆️上一节🔗</a><a href = '8.md' style='float: right'>⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕Java和Golang的设计模式，设计模式介绍、创建者模式、结构型模式、行为型模式。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="创建形模式" tabindex="-1"><a class="header-anchor" href="#创建形模式" aria-hidden="true">#</a> 创建形模式</h2>
<table>
<thead>
<tr>
<th><strong>模式名称</strong></th>
<th><strong>模式名称</strong></th>
<th><strong>作用</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>创建型模式  Creational Pattern</strong></td>
<td>单例模式★★★★☆</td>
<td>是保证一个类仅有一个实例，并提供一个访问它的全局访问点。</td>
</tr>
<tr>
<td>简单工厂模式★★★☆☆</td>
<td>通过专门定义一个类来负责创建其他类的实例，被创建的实例通常都具有共同的父类。</td>
<td></td>
</tr>
<tr>
<td>工厂方法模式★★★★★</td>
<td>定义一个创建产品对象的工厂接口，将实际创建工作推迟到子类中。</td>
<td></td>
</tr>
<tr>
<td>抽象工厂模式★★★★★</td>
<td>提供一个创建一系列相关或者相互依赖的接口，而无需指定它们具体的类。</td>
<td></td>
</tr>
<tr>
<td>原型模式★★★☆☆</td>
<td>用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。</td>
<td></td>
</tr>
<tr>
<td>建造者模式★★☆☆☆</td>
<td>将一个复杂的构建与其表示相分离，使得同样的构建过程可以创建不同的表示。</td>
<td></td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>目前标准的创建型设计模式共有6种（注：设计模式种类并非仅仅局限于此，设计模式实则是一种编程思想，开发者可以根据自身经验来总结出很多种设计模式思想，这6中创建型设计模式为早期官方认可的标准模式）</p>
</div>
<h2 id="简单工厂模式" tabindex="-1"><a class="header-anchor" href="#简单工厂模式" aria-hidden="true">#</a> 简单工厂模式</h2>
<p>一般逻辑💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Factory mode</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">//Define a fruit structure</span>
<span class="token keyword">type</span> Fruit <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">//................................................................</span>

<span class="token punctuation">}</span>

<span class="token comment">//Define a method of obtaining fruit</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>f <span class="token operator">*</span>Fruit<span class="token punctuation">)</span> <span class="token function">GetFruit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token string">"fruit"</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f <span class="token operator">*</span>Fruit<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> name <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token string">"apple"</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"我是苹果"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token string">"apple"</span>
	<span class="token keyword">case</span> <span class="token string">"orange"</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"我是橘子"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token string">"orange"</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"我是水果"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token string">"fruit"</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//Define a fruit method (create a fruit)</span>
<span class="token keyword">func</span> <span class="token function">NewFruit</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Fruit <span class="token punctuation">{</span>
	fruit <span class="token operator">:=</span> <span class="token operator">&amp;</span>Fruit<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">switch</span> name <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token string">"apple"</span><span class="token punctuation">:</span>
		<span class="token comment">//Create an apple</span>
	<span class="token keyword">case</span> <span class="token string">"orange"</span><span class="token punctuation">:</span>
		<span class="token comment">//Create an orange</span>
	<span class="token keyword">case</span> <span class="token string">"banana"</span><span class="token punctuation">:</span>
		<span class="token comment">//Create a banana</span>
	<span class="token keyword">case</span> <span class="token string">"pear"</span><span class="token punctuation">:</span>
		<span class="token comment">//Create a pear</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"没有这个水果"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> fruit
<span class="token punctuation">}</span>

<span class="token comment">//Business logic</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//Create a fruit</span>
	fruit <span class="token operator">:=</span> <span class="token function">NewFruit</span><span class="token punctuation">(</span><span class="token string">"apple"</span><span class="token punctuation">)</span>
	<span class="token comment">//Get fruit</span>
	fruit<span class="token punctuation">.</span><span class="token function">GetFruit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//Get the name of the fruit</span>
	fruit<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"apple"</span><span class="token punctuation">)</span>

	fruit <span class="token operator">=</span> <span class="token function">NewFruit</span><span class="token punctuation">(</span><span class="token string">"orange"</span><span class="token punctuation">)</span>
	fruit<span class="token punctuation">.</span><span class="token function">GetFruit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fruit<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"orange"</span><span class="token punctuation">)</span>

	fruit <span class="token operator">=</span> <span class="token function">NewFruit</span><span class="token punctuation">(</span><span class="token string">"banana"</span><span class="token punctuation">)</span>
	fruit<span class="token punctuation">.</span><span class="token function">GetFruit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fruit<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"banana"</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super\84-main.go"</span>
我是苹果
我是橘子
我是水果
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">问题</p>
<p>不难看出，Fruit类是一个“巨大的”类，在该类的设计中存在如下几个问题：</p>
<p>​	(1) 在Fruit类中包含很多“if…else…” （或者 switch） 代码块，整个类的代码相当冗长，代码越长，阅读难度、维护难度和测试难度也越大；而且大量条件语句的存在还将影响系统的性能，程序在执行过程中需要做大量的条件判断。</p>
<p>​	(2) Fruit类的职责过重，它负责初始化和显示所有的水果对象，将各种水果对象的初始化代码和显示代码集中在一个类中实现，违反了“单一职责原则”，不利于类的重用和维护；</p>
<p>(3) 当需要增加新类型的水果时，必须修改Fruit类的构造函数NewFruit()和其他相关方法源代码，违反了“开闭原则”。</p>
<p>关键是来观察 <code v-pre>main()</code> 函数，<code v-pre>main()</code> 函数与 <code v-pre>Fruit</code> 类是两个模块。当业务层希望创建一个对象的时候，将直接依赖Fruit类型的构造方法 <code v-pre>NewFruit()</code>，这样随着Fruit的越来越复杂，那么业务层的开发逻辑也需要依赖Fruit模块的更新，且随之改变，这样将导致业务层开发需要观察Fruit模块做改动，影响业务层的开发效率和稳定性。整体的依赖关系为。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>业务逻辑层 ---<span class="token operator">></span> 基础类模块
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么如何将业务层创建对象与基础类模块做解耦呢，这里即可以在中间加一层工厂模块层，来降低业务逻辑层对基础模块层的直接依赖和耦合关联。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>业务逻辑层 ---<span class="token operator">></span> 工厂模块 ---<span class="token operator">></span> 基础类模块
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>​	这样就引出了需要对工厂模块的一些设计和加工生成基础模块对象的模式。</p>
</div>
<h2 id="简单工厂模式设计" tabindex="-1"><a class="header-anchor" href="#简单工厂模式设计" aria-hidden="true">#</a> 简单工厂模式设计</h2>
<p>简单工厂模式并不属于GoF的23种设计模式。他是开发者自发认为的一种非常简易的设计模式，其角色和职责如下：</p>
<p>​	<strong>工厂（Factory）角色</strong>：简单工厂模式的核心，它负责实现创建所有实例的内部逻辑。工厂类可以被外界直接调用，创建所需的产品对象。</p>
<p>​	<strong>抽象产品（AbstractProduct）角色</strong>：简单工厂模式所创建的所有对象的父类，它负责描述所有实例所共有的公共接口。</p>
<p>​	<strong>具体产品（Concrete Product）角色</strong>：简单工厂模式所创建的具体实例对象。</p>
<p><img src="http://sm.cubxxw.com/smimage-20221128142632119.png" alt="image-20221128142632119"></p>
<p><strong>改进类图：</strong></p>
<p><img src="http://sm.cubxxw.com/smimage-20221128143357792.png" alt="image-20221128143357792"></p>
<p><strong>工厂作为交际，我们不需要针对具体的水果，工厂返回就好了</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">//------抽象层------</span>
<span class="token keyword">type</span> Fruit <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">String</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">//------实现层------</span>
<span class="token keyword">type</span> Apple <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>apple <span class="token operator">*</span>Apple<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"apple"</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">"apple"</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Orange <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>orange <span class="token operator">*</span>Orange<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"orange"</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">"orange"</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Banana <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>banana <span class="token operator">*</span>Banana<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"banana"</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">"banana"</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Pear <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>pear <span class="token operator">*</span>Pear<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"pear"</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">"pear"</span>
<span class="token punctuation">}</span>

<span class="token comment">//------工厂层------</span>
<span class="token keyword">type</span> Factory <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>factory <span class="token operator">*</span>Factory<span class="token punctuation">)</span> <span class="token function">GetFruit</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> Fruit <span class="token punctuation">{</span>
	<span class="token keyword">var</span> fruit Fruit
	<span class="token keyword">switch</span> name <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token string">"apple"</span><span class="token punctuation">:</span>
		fruit <span class="token operator">=</span> <span class="token operator">&amp;</span>Apple<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">case</span> <span class="token string">"orange"</span><span class="token punctuation">:</span>
		fruit <span class="token operator">=</span> <span class="token operator">&amp;</span>Orange<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">case</span> <span class="token string">"banana"</span><span class="token punctuation">:</span>
		fruit <span class="token operator">=</span> <span class="token operator">&amp;</span>Banana<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">case</span> <span class="token string">"pear"</span><span class="token punctuation">:</span>
		fruit <span class="token operator">=</span> <span class="token operator">&amp;</span>Pear<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> fruit
<span class="token punctuation">}</span>

<span class="token comment">//------业务逻辑层------</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	Factory <span class="token operator">:=</span> <span class="token operator">&amp;</span>Factory<span class="token punctuation">{</span><span class="token punctuation">}</span>
	apple <span class="token operator">:=</span> Factory<span class="token punctuation">.</span><span class="token function">GetFruit</span><span class="token punctuation">(</span><span class="token string">"apple"</span><span class="token punctuation">)</span>
	apple<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"apple"</span><span class="token punctuation">)</span>

	orange <span class="token operator">:=</span> Factory<span class="token punctuation">.</span><span class="token function">GetFruit</span><span class="token punctuation">(</span><span class="token string">"orange"</span><span class="token punctuation">)</span>
	orange<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"orange"</span><span class="token punctuation">)</span>

	banana <span class="token operator">:=</span> Factory<span class="token punctuation">.</span><span class="token function">GetFruit</span><span class="token punctuation">(</span><span class="token string">"banana"</span><span class="token punctuation">)</span>
	banana<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"banana"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super\85-main.go"</span>
apple
orange
banana
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="简单工厂方法模式的优缺点" tabindex="-1"><a class="header-anchor" href="#简单工厂方法模式的优缺点" aria-hidden="true">#</a> 简单工厂方法模式的优缺点</h3>
<p><strong>优点：</strong></p>
<ol>
<li>
<p>实现了对象创建和使用的分离。</p>
</li>
<li>
<p>不需要记住具体类名，记住参数即可，减少使用者记忆量。</p>
</li>
</ol>
<p><strong>缺点：</strong></p>
<ol>
<li>
<p>对工厂类职责过重，一旦不能工作，系统受到影响。</p>
</li>
<li>
<p>增加系统中类的个数，复杂度和理解度增加。</p>
</li>
<li>
<p>违反“开闭原则”，添加新产品需要修改工厂逻辑，工厂越来越复杂。</p>
</li>
</ol>
<p><strong>适用场景：</strong></p>
<ol>
<li>
<p>工厂类负责创建的对象比较少，由于创建的对象较少，不会造成工厂方法中的业务逻辑太过复杂。</p>
</li>
<li>
<p>客户端只知道传入工厂类的参数，对于如何创建对象并不关心。</p>
</li>
</ol>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '6.md' style='float:left'>⬆️上一节🔗</a><a href = '8.md' style='float: right'>⬇️下一节🔗</a></div></li></ul>
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


