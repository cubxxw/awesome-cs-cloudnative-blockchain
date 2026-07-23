<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第4节-流程构建和分析" tabindex="-1"><a class="header-anchor" href="#第4节-流程构建和分析" aria-hidden="true">#</a> 第4节 流程构建和分析</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/3.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h3 id="创建一个go-mod和仓库" tabindex="-1"><a class="header-anchor" href="#创建一个go-mod和仓库" aria-hidden="true">#</a> 创建一个go-mod和仓库</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\log-monitoring> go mod init github.com/3293172751/log-monitoring/tree/master
go: creating new go.mod: module github.com/3293172751/log-monitoring/tree/master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="程序框架" tabindex="-1"><a class="header-anchor" href="#程序框架" aria-hidden="true">#</a> 程序框架</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">type</span> LogProcess <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	rc <span class="token keyword">chan</span> <span class="token builtin">string</span>   <span class="token comment">//多个goroutine之间的数据同步和通信（channels)</span>
	wc <span class="token keyword">chan</span> <span class="token builtin">string</span>   <span class="token comment">//写入模块同步数据</span>
	<span class="token comment">//系统分为三个模块</span>
	<span class="token comment">// + 实时读取  -- 文件路径</span>
	<span class="token comment">// + 解析</span>
	<span class="token comment">// + 写入  -- 写入的时候需要ip</span>
	path       <span class="token builtin">string</span> <span class="token comment">//读取文件的路径</span>
	influxDBsn <span class="token builtin">string</span> <span class="token comment">//写入的信息</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LogProcess<span class="token punctuation">)</span> <span class="token function">ReadFromFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//读取模块</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LogProcess<span class="token punctuation">)</span> <span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//解析模块</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LogProcess<span class="token punctuation">)</span> <span class="token function">WriteToInfluxDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//写入模块</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	logprocess <span class="token operator">:=</span> <span class="token operator">&amp;</span>LogProcess<span class="token punctuation">{</span>
		rc<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		wc<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		path<span class="token punctuation">:</span>       <span class="token string">"log/access.log"</span><span class="token punctuation">,</span>
		influxDBsn<span class="token punctuation">:</span> <span class="token string">"username&amp;password.."</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//使用goroutinue提高程序的性能</span>
    <span class="token keyword">go</span> <span class="token punctuation">(</span><span class="token operator">*</span>lp<span class="token punctuation">)</span>logprocess<span class="token punctuation">.</span><span class="token function">ReadFromFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    <span class="token comment">//调用读取模块</span>
	<span class="token keyword">go</span> logprocess<span class="token punctuation">.</span><span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span>         <span class="token comment">//调用解析模块</span>
	<span class="token keyword">go</span> logprocess<span class="token punctuation">.</span><span class="token function">WriteToInfluxDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//调用写入模块</span>

    <span class="token comment">//程序执行完后就自动退出了</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用<code v-pre>*LogProcess</code>引用类型原因：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (l *LogProcess) Process() {
	//解析模块
}
logprocess := &amp;LogProcess{}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>不用拷贝，对于性能有很大的提升</li>
<li>用引用就可以用<code v-pre>l</code>参数直接修改结构体的数值</li>
</ul>
<h3 id="程序测试" tabindex="-1"><a class="header-anchor" href="#程序测试" aria-hidden="true">#</a> 程序测试</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LogProcess<span class="token punctuation">)</span> <span class="token function">ReadFromFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//读取模块</span>
	line <span class="token operator">:=</span> <span class="token string">"message"</span>
	l<span class="token punctuation">.</span>rc <span class="token operator">&lt;-</span> line <span class="token comment">//数据的流向</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LogProcess<span class="token punctuation">)</span> <span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//解析模块</span>
	data <span class="token operator">:=</span> <span class="token operator">&lt;-</span>l<span class="token punctuation">.</span>rc
	l<span class="token punctuation">.</span>wc <span class="token operator">&lt;-</span> strings<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
	<span class="token comment">//处理数据--将data中的所有字符修改为其大写格式。对于非ASCII字符，它的大写格式需要查表转换</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LogProcess<span class="token punctuation">)</span> <span class="token function">WriteToInfluxDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//写入模块</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>l<span class="token punctuation">.</span>wc<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译结果</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[Running] go run "c:\Users\smile\Desktop\log-monitoring\log_process.go"
MESSAGE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="程序优化" tabindex="-1"><a class="header-anchor" href="#程序优化" aria-hidden="true">#</a> 程序优化</h3>
<p><strong>我们只能往<code v-pre>WriteToInfluxDB()</code>中写入数据，如果有更多的数据（队列或者标准输出中），此时需要用到接口模式，把写入和读出模块抽象出来</strong></p>
<p><strong>用来约束实现类的功能。</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"strings"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Reader <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Read</span><span class="token punctuation">(</span>rc <span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Writer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Writer</span><span class="token punctuation">(</span>wc <span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> LogProcess <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	rc <span class="token keyword">chan</span> <span class="token builtin">string</span> <span class="token comment">//多个goroutine之间的数据同步和通信（channels)</span>
	wc <span class="token keyword">chan</span> <span class="token builtin">string</span> <span class="token comment">//写入模块同步数据</span>
	<span class="token comment">//系统分为三个模块</span>
	<span class="token comment">// + 实时读取  -- 文件路径</span>
	<span class="token comment">// + 解析</span>
	<span class="token comment">// + 写入  -- 写入的时候需要</span>
	read  Reader <span class="token comment">//接口定义</span>
	write Writer
<span class="token punctuation">}</span>

<span class="token keyword">type</span> ReadFromFile <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	path <span class="token builtin">string</span> <span class="token comment">//读取文件的路径</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> WriteToInfluxDB <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	influxDBsn <span class="token builtin">string</span> <span class="token comment">//写入的信息</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>ReadFromFile<span class="token punctuation">)</span> <span class="token function">Read</span><span class="token punctuation">(</span>rc <span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//读取模块</span>
	line <span class="token operator">:=</span> <span class="token string">"messAge"</span>
	rc <span class="token operator">&lt;-</span> line <span class="token comment">//数据的流向</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LogProcess<span class="token punctuation">)</span> <span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//解析模块</span>
	data <span class="token operator">:=</span> <span class="token operator">&lt;-</span>l<span class="token punctuation">.</span>rc
	l<span class="token punctuation">.</span>wc <span class="token operator">&lt;-</span> strings<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
	<span class="token comment">//处理数据--将data中的所有字符修改为其大写格式。对于非ASCII字符，它的大写格式需要查表转换</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>w <span class="token operator">*</span>WriteToInfluxDB<span class="token punctuation">)</span> <span class="token function">Writer</span><span class="token punctuation">(</span>wc <span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//写入模块</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>wc<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	r <span class="token operator">:=</span> <span class="token operator">&amp;</span>ReadFromFile<span class="token punctuation">{</span>
		path<span class="token punctuation">:</span> <span class="token string">"log/access.log"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	w <span class="token operator">:=</span> <span class="token operator">&amp;</span>WriteToInfluxDB<span class="token punctuation">{</span>
		influxDBsn<span class="token punctuation">:</span> <span class="token string">"username&amp;password.."</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	logprocess <span class="token operator">:=</span> <span class="token operator">&amp;</span>LogProcess<span class="token punctuation">{</span>
		rc<span class="token punctuation">:</span>    <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		wc<span class="token punctuation">:</span>    <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		read<span class="token punctuation">:</span>  r<span class="token punctuation">,</span>
		write<span class="token punctuation">:</span> w<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//使用goroutinue提高程序的性能</span>
	<span class="token keyword">go</span> logprocess<span class="token punctuation">.</span>read<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>logprocess<span class="token punctuation">.</span>rc<span class="token punctuation">)</span>    <span class="token comment">//调用读取模块</span>
	<span class="token keyword">go</span> logprocess<span class="token punctuation">.</span><span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span>                   <span class="token comment">//调用解析模块</span>
	<span class="token keyword">go</span> logprocess<span class="token punctuation">.</span>write<span class="token punctuation">.</span><span class="token function">Writer</span><span class="token punctuation">(</span>logprocess<span class="token punctuation">.</span>wc<span class="token punctuation">)</span> <span class="token comment">//调用写入模块</span>

	<span class="token comment">//程序执行完后就自动退出了,需要等待</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>程序编译</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[Running] go run "c:\Users\smile\Desktop\log-monitoring\log_process.go"
MESSAGE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>为什么我们定义了两个接口就提升了它的可扩展性呢？</strong></p>
<blockquote>
<p>看起来程序虽然更加复杂了，但是我们如果后期添加新的读取写入模块，只需要对接口修改</p>
</blockquote>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/3.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/5.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


