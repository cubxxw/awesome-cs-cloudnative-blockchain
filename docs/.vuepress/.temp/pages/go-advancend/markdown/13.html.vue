<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第13节-go语言退出、结束函数或者协程方式" tabindex="-1"><a class="header-anchor" href="#第13节-go语言退出、结束函数或者协程方式" aria-hidden="true">#</a> 第13节 Go语言退出、结束函数或者协程方式</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/12.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>Go语言中有很多让我觉得误解的一些终结语句，我想 <code v-pre>block</code> 和 <code v-pre>continue</code> 只是最基本的也是最简单的。</p>
<p><strong>Go语言几种退出程序的方式：</strong></p>
<ol>
<li><code v-pre>os.Exit()</code> 退出程序</li>
<li><code v-pre>panic()</code> 抛出异常</li>
<li><code v-pre>return</code> 退出函数</li>
<li><code v-pre>defer + recover()</code> 捕获异常</li>
<li><code v-pre>runtime.Goexit()</code> 退出当前协程</li>
<li><code v-pre>os.Kill</code> 杀死进程</li>
<li><code v-pre>os.Interrupt</code> 中断进程</li>
<li><code v-pre>block</code> 跳出循环  （不讲）</li>
<li><code v-pre>continue</code>  跳出当前循环 继续下一次循环 （不讲）</li>
</ol>
</div>
<h2 id="runtime-goexit-退出当前协程" tabindex="-1"><a class="header-anchor" href="#runtime-goexit-退出当前协程" aria-hidden="true">#</a> runtime.Goexit() 退出当前协程</h2>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"runtime"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//Go语言几种退出程序的方式</span>
	<span class="token comment">//1. os.Exit() 退出程序</span>
	<span class="token comment">//2. panic() 抛出异常</span>
	<span class="token comment">//3. return 退出函数</span>
	<span class="token comment">//4. defer + recover() 捕获异常</span>
	<span class="token comment">//5. runtime.Goexit() 退出当前协程</span>
	<span class="token comment">//6. os.Kill 杀死进程</span>
	<span class="token comment">//7. os.Interrupt 中断进程</span>
	<span class="token comment">//8. block 跳出循环</span>
	<span class="token comment">//9. continue  跳出当前循环 继续下一次循环</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 开始的部分"</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 开始的部分"</span><span class="token punctuation">)</span>
		<span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 开始的部分"</span><span class="token punctuation">)</span>
			<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 开始的部分"</span><span class="token punctuation">)</span>
				runtime<span class="token punctuation">.</span><span class="token function">Goexit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//退出当前协程</span>

				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 结束的部分"</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 结束的部分"</span><span class="token punctuation">)</span>
            <span class="token comment">//等待2s</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 结束的部分"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//等待5s</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 结束的部分"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super<span class="token entity" title="\61">\61</span>-main.go"</span>
main<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
最里面go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
func<span class="token punctuation">(</span><span class="token punctuation">)</span> 结束的部分
go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 结束的部分
main<span class="token punctuation">(</span><span class="token punctuation">)</span> 结束的部分
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">📜 对上面的解释：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>runtime.Goexit() //退出当前协程
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只是退出当前的 <code v-pre>go func()</code> 协程，并不是当前函数。</p>
</div>
<h2 id="os-exit-1-退出当前程序" tabindex="-1"><a class="header-anchor" href="#os-exit-1-退出当前程序" aria-hidden="true">#</a> os.Exit(-1) 退出当前程序</h2>
<div class="custom-container tip"><p class="custom-container-title">函数定义：</p>
<p>函数定义：<code v-pre>func Exit(code int)</code></p>
<p>Exit 函数可以让当前程序以给出的状态码 <code v-pre>code</code> 退出。一般来说，状态码 <code v-pre>0</code> 表示成功，非 <code v-pre>0</code> 表示出错。程序会立刻终止，并且 <code v-pre>defer</code> 的函数不会被执行。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> num <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">0</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Enter number:"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Scanf</span><span class="token punctuation">(</span><span class="token string">"%d"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>num<span class="token punctuation">)</span>

	<span class="token keyword">if</span> num <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"n > 0  Program terminated\n"</span><span class="token punctuation">)</span>
		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> num <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"n &lt; 0  Program continue\n"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Program finished normally\n"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>code<span class="token punctuation">\</span>go-super<span class="token operator">></span> go run .<span class="token punctuation">\</span><span class="token number">66</span>-main.go
Enter number:2
n <span class="token operator">></span> <span class="token number">0</span>  Program terminated
PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>code<span class="token punctuation">\</span>go-super<span class="token operator">></span> go run .<span class="token punctuation">\</span><span class="token number">66</span>-main.go
Enter number:-1
n <span class="token operator">&lt;</span> <span class="token number">0</span>  Program <span class="token builtin class-name">continue</span>
Program finished normally
PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>code<span class="token punctuation">\</span>go-super<span class="token operator">></span> go run .<span class="token punctuation">\</span><span class="token number">66</span>-main.go
Enter number:0
Program finished normally
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 开始的部分"</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 开始的部分"</span><span class="token punctuation">)</span>
		<span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 开始的部分"</span><span class="token punctuation">)</span>
			<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 开始的部分"</span><span class="token punctuation">)</span>
				os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">//退出程序</span>

				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 结束的部分"</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token comment">//等待2s</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>    
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 结束的部分"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 结束的部分"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//等待5s</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 结束的部分"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> <span class="token keyword">go</span> run <span class="token string">"d:\文档\最近的\awesome-golang\docs\code\go-super\61-main.go"</span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
<span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
最里面<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
exit status <span class="token number">0xffffffff</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">📜 对上面的解释：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">//退出程序</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>退出当前的 <code v-pre>func main()</code>  程序</p>
</div>
<h2 id="os-exit-0-中断进程" tabindex="-1"><a class="header-anchor" href="#os-exit-0-中断进程" aria-hidden="true">#</a> os.Exit(0) 中断进程</h2>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 开始的部分"</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 开始的部分"</span><span class="token punctuation">)</span>
		<span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 开始的部分"</span><span class="token punctuation">)</span>
			<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 开始的部分"</span><span class="token punctuation">)</span>
				<span class="token comment">//中断进程</span>
				os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 结束的部分"</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token comment">//等待2s</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 结束的部分"</span><span class="token punctuation">)</span>

		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 结束的部分"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//等待5s</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 结束的部分"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super<span class="token entity" title="\63">\63</span>-main.go"</span>
main<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
最里面go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">📜 对上面的解释：</p>
<p>状态码为 0 ，退出但是不报错</p>
</div>
<h2 id="panic-抛出异常退出" tabindex="-1"><a class="header-anchor" href="#panic-抛出异常退出" aria-hidden="true">#</a> panic() 抛出异常退出</h2>
<details class="custom-container details"><summary>或许你可以使用defer func() 抛出异常继续执行</summary>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 开始的部分"</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 开始的部分"</span><span class="token punctuation">)</span>
		<span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 开始的部分"</span><span class="token punctuation">)</span>
			<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 开始的部分"</span><span class="token punctuation">)</span>
				<span class="token comment">//defer异常捕获</span>
				<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
						fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() defer异常捕获"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 抛出异常退出"</span><span class="token punctuation">)</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 结束的部分"</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token comment">//等待2s</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 结束的部分"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 结束的部分"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//等待5s</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 结束的部分"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[Running] go run "d:\文档\最近的\awesome-golang\docs\code\go-super\61-main.go"
main() 开始的部分
go func() 开始的部分
func() 开始的部分
最里面go func() 开始的部分
最里面go func() defer异常捕获 最里面go func() 抛出异常退出
func() 结束的部分
go func() 结束的部分
main() 结束的部分
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//Go语言几种退出程序的方式</span>
	<span class="token comment">//1. os.Exit() 退出程序</span>
	<span class="token comment">//2. panic() 抛出异常</span>
	<span class="token comment">//3. return 退出函数</span>
	<span class="token comment">//4. defer + recover() 捕获异常</span>
	<span class="token comment">//5. runtime.Goexit() 退出当前协程</span>
	<span class="token comment">//6. os.Kill 杀死进程</span>
	<span class="token comment">//7. os.Interrupt 中断进程</span>
	<span class="token comment">//8. block 跳出循环</span>
	<span class="token comment">//9. continue  跳出当前循环 继续下一次循环</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 开始的部分"</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 开始的部分"</span><span class="token punctuation">)</span>
		<span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 开始的部分"</span><span class="token punctuation">)</span>
			<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 开始的部分"</span><span class="token punctuation">)</span>

				<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 抛出异常退出"</span><span class="token punctuation">)</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 结束的部分"</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token comment">//等待2s</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 结束的部分"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 结束的部分"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//等待5s</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 结束的部分"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super<span class="token entity" title="\61">\61</span>-main.go"</span>
main<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
最里面go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
panic: 最里面go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 抛出异常退出

goroutine <span class="token number">7</span> <span class="token punctuation">[</span>running<span class="token punctuation">]</span>:
main.main.func1.1.1<span class="token punctuation">(</span><span class="token punctuation">)</span>
	d:/文档/最近的/awesome-golang/docs/code/go-super/61-main.go:28 +0x65
created by main.main.func1.1
	d:/文档/最近的/awesome-golang/docs/code/go-super/61-main.go:25 +0x65
<span class="token builtin class-name">exit</span> status <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">📜 对上面的解释：</p>
<p>可以看出来这两者之间的差距，<code v-pre>recover()</code>使得 <strong>程序结束当前协程~继续执行使用。</strong></p>
<p>不使用的化，会直接退出~</p>
</div>
<h2 id="return-跳出当前函数" tabindex="-1"><a class="header-anchor" href="#return-跳出当前函数" aria-hidden="true">#</a> return 跳出当前函数</h2>
<p><strong>return 是我们最常用的一个用法：在设定返回值为1002，然后return触发defer语句，执行完成后（即便是defer抛出panic后被捕获），返回1002。</strong></p>
<p><strong>我们都知道 <code v-pre>panic</code> 会触发<code v-pre>defer</code>：</strong> 由于 <code v-pre>return</code>会触发 <code v-pre>defer</code>，函数抛出 <code v-pre>panic</code> 也会触发 <code v-pre>defer</code>。所以我们可以在 <code v-pre>defer</code> 中，特别是通过 <code v-pre>recovery()</code> 函数捕获 <code v-pre>panic</code> 后，修改函数的返回值。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">Test0</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
 
<span class="token keyword">func</span> <span class="token function">Test0</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span>ret <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		err<span class="token operator">:=</span><span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err<span class="token operator">!=</span><span class="token boolean">nil</span><span class="token punctuation">{</span>
			ret<span class="token operator">=</span>fmt<span class="token punctuation">.</span><span class="token function">Sprint</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"this is a panic"</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">"normal"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>this is a panic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">📜 对上面的解释：</p>
<p>注意 <code v-pre>panic</code> 和 <code v-pre>return</code> 的循序很重要，如果当 <code v-pre>return &quot;normal&quot;</code> 在前面，那么很明显会输出 <code v-pre>normal</code> ，<code v-pre>this is a panic</code> 将不会输出。</p>
</div>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 开始的部分"</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 开始的部分"</span><span class="token punctuation">)</span>
		<span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 开始的部分"</span><span class="token punctuation">)</span>
			<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 开始的部分"</span><span class="token punctuation">)</span>
				<span class="token keyword">return</span>

				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 结束的部分"</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token comment">//等待2s</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 结束的部分"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 结束的部分"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//等待5s</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 结束的部分"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"d:\文档\最近的<span class="token entity" title="\a">\a</span>wesome-golang\docs<span class="token entity" title="\c">\c</span>ode\go-super<span class="token entity" title="\61">\61</span>-main.go"</span>
main<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
最里面go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
func<span class="token punctuation">(</span><span class="token punctuation">)</span> 结束的部分
go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 结束的部分
main<span class="token punctuation">(</span><span class="token punctuation">)</span> 结束的部分
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>::: warning📜 对上面的解释：
<code v-pre>return</code> 直接跳出当前的函数， 注意这个函数也可以是当前的协程 <code v-pre>go func()</code></p>
<p>:::</p>
<h2 id="lable跳转标签" tabindex="-1"><a class="header-anchor" href="#lable跳转标签" aria-hidden="true">#</a> Lable跳转标签</h2>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//Go语言几种退出程序的方式</span>
	<span class="token comment">//1. os.Exit() 退出程序</span>
	<span class="token comment">//2. panic() 抛出异常</span>
	<span class="token comment">//3. return 退出函数</span>
	<span class="token comment">//4. defer + recover() 捕获异常</span>
	<span class="token comment">//5. runtime.Goexit() 退出当前协程</span>
	<span class="token comment">//6. os.Kill 杀死进程</span>
	<span class="token comment">//7. os.Interrupt 中断进程</span>
	<span class="token comment">//8. block 跳出循环</span>
	<span class="token comment">//9. continue  跳出当前循环 继续下一次循环</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 开始的部分"</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 开始的部分"</span><span class="token punctuation">)</span>
		<span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 开始的部分"</span><span class="token punctuation">)</span>
			<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			Lable1<span class="token punctuation">:</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 开始的部分"</span><span class="token punctuation">)</span>
				<span class="token comment">//等待1s</span>
				time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
				<span class="token comment">// 标签跳转</span>
				<span class="token keyword">goto</span> Lable1

				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最里面go func() 结束的部分"</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token comment">//等待2s</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"func() 结束的部分"</span><span class="token punctuation">)</span>

		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go func() 结束的部分"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//等待5s</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main() 结束的部分"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>code<span class="token punctuation">\</span>go-super<span class="token operator">></span> go run .<span class="token punctuation">\</span><span class="token number">64</span>-main.go
main<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
最里面go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
最里面go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
func<span class="token punctuation">(</span><span class="token punctuation">)</span> 结束的部分
go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 结束的部分
最里面go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
最里面go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
最里面go func<span class="token punctuation">(</span><span class="token punctuation">)</span> 开始的部分
main<span class="token punctuation">(</span><span class="token punctuation">)</span> 结束的部分
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/12.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/14.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


