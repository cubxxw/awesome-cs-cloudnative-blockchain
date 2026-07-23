<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第8节-写入模块的实现" tabindex="-1"><a class="header-anchor" href="#第8节-写入模块的实现" aria-hidden="true">#</a> 第8节 写入模块的实现</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/7.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
</blockquote>
<hr>
<p>[TOC]</p>
<h3 id="写入模块的实现" tabindex="-1"><a class="header-anchor" href="#写入模块的实现" aria-hidden="true">#</a> 写入模块的实现</h3>
<ol>
<li>初始化Influxdb cllient</li>
<li>从write channel中读取到监控数据</li>
<li>构造数据并且写入到influxdb</li>
</ol>
<p><strong>pull包</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go get github.com/influxdata/influxdb1-client/v2  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>导入包</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>import "github.com/influxdata/influxdb1-client/v2"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="写入模块程序" tabindex="-1"><a class="header-anchor" href="#写入模块程序" aria-hidden="true">#</a> 写入模块程序</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>w <span class="token operator">*</span>WriteToInfluxDB<span class="token punctuation">)</span> <span class="token function">Writer</span><span class="token punctuation">(</span>wc <span class="token keyword">chan</span> <span class="token operator">*</span>Message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//写入模块</span>
	infSli <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>w<span class="token punctuation">.</span>influxDBsn<span class="token punctuation">,</span> <span class="token string">"@"</span><span class="token punctuation">)</span> <span class="token comment">//使用@做切割</span>

	<span class="token comment">// Create a new HTTPClient</span>
	c<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewHTTPClient</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>HTTPConfig<span class="token punctuation">{</span>
		Addr<span class="token punctuation">:</span>     infSli<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//地址</span>
		Username<span class="token punctuation">:</span> infSli<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//用户名</span>
		Password<span class="token punctuation">:</span> infSli<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//密码</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> c<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// Create a new point batch</span>
	bp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewBatchPoints</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>BatchPointsConfig<span class="token punctuation">{</span>
		Database<span class="token punctuation">:</span>  infSli<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
		Precision<span class="token punctuation">:</span> infSli<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> wc <span class="token punctuation">{</span>
		<span class="token comment">// 循环的写入数据</span>
		<span class="token comment">/*
			+ Tags：Path, Method, Scheme, Status
			+ Fields：UpstreamTime, RequestTime，BytesSent
			+ Time：TimeLocal
		*/</span>
		tags <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"Path"</span><span class="token punctuation">:</span> v<span class="token punctuation">.</span>Path<span class="token punctuation">,</span> <span class="token string">"Method"</span><span class="token punctuation">:</span> v<span class="token punctuation">.</span>Method<span class="token punctuation">,</span> <span class="token string">"Scheme"</span><span class="token punctuation">:</span> v<span class="token punctuation">.</span>Scheme<span class="token punctuation">,</span> <span class="token string">"Status"</span><span class="token punctuation">:</span> v<span class="token punctuation">.</span>Status<span class="token punctuation">}</span>
		fields <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
			<span class="token string">"UpstreamTime"</span><span class="token punctuation">:</span> v<span class="token punctuation">.</span>UpstreamTime<span class="token punctuation">,</span>
			<span class="token string">"RequestTime"</span><span class="token punctuation">:</span>  v<span class="token punctuation">.</span>RequestTime<span class="token punctuation">,</span>
			<span class="token string">"BytesSent"</span><span class="token punctuation">:</span>    v<span class="token punctuation">.</span>BytesSent<span class="token punctuation">,</span>
		<span class="token punctuation">}</span>

		pt<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">NewPoint</span><span class="token punctuation">(</span><span class="token string">"nginx_log"</span><span class="token punctuation">,</span> tags<span class="token punctuation">,</span> fields<span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//创建Influxdb字段</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"client.NewPoint err = "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		bp<span class="token punctuation">.</span><span class="token function">AddPoint</span><span class="token punctuation">(</span>pt<span class="token punctuation">)</span>

		<span class="token comment">// Write the batch</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>bp<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// Close client resources</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"write success"</span><span class="token punctuation">)</span> <span class="token comment">//如果写入成功就打印日志</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/7.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/9.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


