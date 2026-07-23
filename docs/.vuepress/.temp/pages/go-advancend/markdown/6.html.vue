<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第6节-解析模块的实现" tabindex="-1"><a class="header-anchor" href="#第6节-解析模块的实现" aria-hidden="true">#</a> 第6节 解析模块的实现</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/5.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
</blockquote>
<hr>
<p>[TOC]</p>
<h3 id="解析模块的功能" tabindex="-1"><a class="header-anchor" href="#解析模块的功能" aria-hidden="true">#</a> 解析模块的功能</h3>
<ol>
<li>从Read Channel中读取每行日志数据</li>
<li>正则表达式提取所需要的监控数据（path，status,method等）
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/zhenze.md" target="_blank" rel="noopener noreferrer">正则表达式教程<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>写入到write channel</li>
</ol>
<h3 id="解析模块的实现" tabindex="-1"><a class="header-anchor" href="#解析模块的实现" aria-hidden="true">#</a> 解析模块的实现</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LogProcess<span class="token punctuation">)</span> <span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//解析模块</span>
	<span class="token comment">/* 输入数据：
	[07/July/2022:18:01:41 +0000] http "GET /foo?query=t HTTP/1.0" 200 2133 "-"
	"KeepAliveClient" "-" 1.005 1.854
	*/</span>
	<span class="token comment">//处理数据--将data中的所有字符修改为其大写格式。对于非ASCII字符，它的大写格式需要查表转换</span>
	r <span class="token operator">:=</span> regexp<span class="token punctuation">.</span><span class="token function">MustCompile</span><span class="token punctuation">(</span><span class="token string">`\[([^\]]+)\]\s+(.*?)\s+\"(.*?)\"\s+(\d{3})\s+(\d+)\s+\"([^"]+
	)\"\s+\"(.*?)\"\s+\"([\d\.-]+)\"\s+([\d\.-]+)\s+([\d\.-]+)`</span><span class="token punctuation">)</span>

	loc<span class="token punctuation">,</span> err <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">LoadLocation</span><span class="token punctuation">(</span><span class="token string">"Asia/Shanghai"</span><span class="token punctuation">)</span> <span class="token comment">//我们用的是上海时区</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>                                <span class="token comment">//可以忽略err一般不会有错</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"time error:%s"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> l<span class="token punctuation">.</span>rc <span class="token punctuation">{</span>
		ret <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">FindStringSubmatch</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//匹配数据内容，正则括号内容匹配到返回到</span>
		<span class="token comment">//fmt.Println(ret)</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">14</span> <span class="token punctuation">{</span> <span class="token comment">//正则表达式有十三个括号</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"FindStringSubmatch fail:"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">continue</span> <span class="token comment">//继续下一次匹配</span>
		<span class="token punctuation">}</span>

		message <span class="token operator">:=</span> <span class="token operator">&amp;</span>Message<span class="token punctuation">{</span><span class="token punctuation">}</span>
		t<span class="token punctuation">,</span> err <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">ParseInLocation</span><span class="token punctuation">(</span><span class="token string">"09/Jan/2006:15:04:05 +0000"</span><span class="token punctuation">,</span> ret<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> loc<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"parseninlocation error:%s"</span><span class="token punctuation">,</span> ret<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		message<span class="token punctuation">.</span>TimeLocal <span class="token operator">=</span> t
		byteSent<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>ret<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">//将string类型转化为int</span>
		<span class="token comment">// if err != nil {</span>
		<span class="token comment">// 	panic(fmt.Sprintf("parseninlocation error:%s", err.Error(), ret[4]))</span>
		<span class="token comment">// }</span>
		message<span class="token punctuation">.</span>BytesSent <span class="token operator">=</span> byteSent

		<span class="token comment">//第六个括号匹配的是GET /foo?query=t HTTP/1.0</span>
		reqSli <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>ret<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">)</span> <span class="token comment">//按照空格切割第六个字段</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>reqSli<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">3</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"strings.split fail"</span><span class="token punctuation">,</span> ret<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">//长度不是3说明报错了</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>

		message<span class="token punctuation">.</span>Method <span class="token operator">=</span> reqSli<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

		u<span class="token punctuation">,</span> err <span class="token operator">:=</span> url<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>reqSli<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"url parse fail"</span><span class="token punctuation">,</span> ret<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		message<span class="token punctuation">.</span>Path <span class="token operator">=</span> u<span class="token punctuation">.</span>Path <span class="token comment">//此时可以直接从结构体中取到path</span>

		message<span class="token punctuation">.</span>Scheme <span class="token operator">=</span> ret<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token comment">//HTTP/1.0协议可以直接赋值给mess</span>
		message<span class="token punctuation">.</span>Status <span class="token operator">=</span> ret<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span>

		<span class="token comment">//UpstreamTime, RequestTime    float64   //监控数据  1.005 1.854在十二到十三</span>
		upstreamTime<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseFloat</span><span class="token punctuation">(</span>ret<span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span> <span class="token comment">//转化为float64</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"err = "</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> ret<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		requestTime<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseFloat</span><span class="token punctuation">(</span>ret<span class="token punctuation">[</span><span class="token number">13</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span> <span class="token comment">//转化为float64</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"err = "</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> ret<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		message<span class="token punctuation">.</span>UpstreamTime <span class="token operator">=</span> upstreamTime
		message<span class="token punctuation">.</span>RequestTime <span class="token operator">=</span> requestTime

		l<span class="token punctuation">.</span>wc <span class="token operator">&lt;-</span> message <span class="token comment">//data是byte类型，需要转化为string类型</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/5.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/7.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


