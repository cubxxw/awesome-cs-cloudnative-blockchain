<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第24节-socks5-代理-调用第三方api案例" tabindex="-1"><a class="header-anchor" href="#第24节-socks5-代理-调用第三方api案例" aria-hidden="true">#</a> 第24节 SOCKS5 代理（调用第三方API案例）</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/23.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="clash介绍" tabindex="-1"><a class="header-anchor" href="#clash介绍" aria-hidden="true">#</a> Clash介绍</h2>
<ul>
<li><a href="https://github.com/Dreamacro/clash" target="_blank" rel="noopener noreferrer">clash 项目地址<ExternalLinkIcon/></a></li>
</ul>
<p><strong>特点：</strong></p>
<ul>
<li>支持身份验证的本地HTTP/HTTPS/SOCKS服务器</li>
<li>Shadowsocks（R）、VMess、特洛伊木马、Snell、SOCKS5、HTTP（S）出站支持</li>
<li>内置 <a href="https://www.rfc-editor.org/rfc/rfc3089" target="_blank" rel="noopener noreferrer">伪ip<ExternalLinkIcon/></a>DNS服务器，旨在最大限度地减少DNS污染攻击的影响。支持DoH/DoT上游。</li>
<li>基于域、GEOIP、IP-CIDR或进程名称的规则将数据包路由到不同的目的地</li>
<li>代理组允许用户实施强大的规则。支持自动回退、负载平衡或基于延迟自动选择代理</li>
<li>远程提供程序，允许用户远程获取代理列表，而不是在配置中硬编码</li>
<li>透明代理：使用自动路由表/规则管理重定向TCP和TProxy TCP/UDP</li>
<li>通过全面的HTTP RESTful API控制器进行热重新加载</li>
</ul>
<h2 id="原理介绍" tabindex="-1"><a class="header-anchor" href="#原理介绍" aria-hidden="true">#</a> 原理介绍</h2>
<p>SOCKS5是用于通过代理服务器安全地路由网络流量的协议。它通常用于绕过网络限制和访问被阻止的网站。SOCKS5为SOCKS协议添加了额外的功能，例如验证用户身份的能力以及对TCP和UDP流量的支持。SOCKS5代理服务器充当客户端和目标服务器之间的中间人，在它们之间转发流量，同时隐藏客户端的IP地址。这允许客户端访问目标服务器上的资源，就好像它们位于同一网络上一样。</p>
<p><img src="http://sm.nsddd.top/sm202301141645441.png" alt="image-20230114164536220"></p>
<h2 id="第一步-一个简单的链接" tabindex="-1"><a class="header-anchor" href="#第一步-一个简单的链接" aria-hidden="true">#</a> 第一步，一个简单的链接</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	server<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"127.0.0.1:1080"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		client<span class="token punctuation">,</span> err <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Accept failed %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">go</span> <span class="token function">process</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">process</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		b<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span>b<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>测试：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go run main.go
nc 127.0.0.1 1080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="认证阶段" tabindex="-1"><a class="header-anchor" href="#认证阶段" aria-hidden="true">#</a> 认证阶段</h2>
<p>代码：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net"</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> socks5Ver <span class="token operator">=</span> <span class="token number">0x05</span>
<span class="token keyword">const</span> cmdBind <span class="token operator">=</span> <span class="token number">0x01</span>
<span class="token keyword">const</span> atypIPV4 <span class="token operator">=</span> <span class="token number">0x01</span>
<span class="token keyword">const</span> atypeHOST <span class="token operator">=</span> <span class="token number">0x03</span>
<span class="token keyword">const</span> atypeIPV6 <span class="token operator">=</span> <span class="token number">0x04</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	server<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"127.0.0.1:1080"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		client<span class="token punctuation">,</span> err <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Accept failed %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">go</span> <span class="token function">process</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">process</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
	err <span class="token operator">:=</span> <span class="token function">auth</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"client %v auth failed:%v"</span><span class="token punctuation">,</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"auth success"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">auth</span><span class="token punctuation">(</span>reader <span class="token operator">*</span>bufio<span class="token punctuation">.</span>Reader<span class="token punctuation">,</span> conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// +----+----------+----------+</span>
	<span class="token comment">// |VER | NMETHODS | METHODS  |</span>
	<span class="token comment">// +----+----------+----------+</span>
	<span class="token comment">// | 1  |    1     | 1 to 255 |</span>
	<span class="token comment">// +----+----------+----------+</span>
	<span class="token comment">// VER: 协议版本，socks5为0x05</span>
	<span class="token comment">// NMETHODS: 支持认证的方法数量</span>
	<span class="token comment">// METHODS: 对应NMETHODS，NMETHODS的值为多少，METHODS就有多少个字节。RFC预定义了一些值的含义，内容如下:</span>
	<span class="token comment">// X’00’ NO AUTHENTICATION REQUIRED</span>
	<span class="token comment">// X’02’ USERNAME/PASSWORD</span>

	ver<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read ver failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> ver <span class="token operator">!=</span> socks5Ver <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"not supported ver:%v"</span><span class="token punctuation">,</span> ver<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	methodSize<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read methodSize failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	method <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> methodSize<span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> method<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read method failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"ver"</span><span class="token punctuation">,</span> ver<span class="token punctuation">,</span> <span class="token string">"method"</span><span class="token punctuation">,</span> method<span class="token punctuation">)</span>
	<span class="token comment">// +----+--------+</span>
	<span class="token comment">// |VER | METHOD |</span>
	<span class="token comment">// +----+--------+</span>
	<span class="token comment">// | 1  |   1    |</span>
	<span class="token comment">// +----+--------+</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span>socks5Ver<span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"write failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="请求阶段" tabindex="-1"><a class="header-anchor" href="#请求阶段" aria-hidden="true">#</a> 请求阶段</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"encoding/binary"</span>
	<span class="token string">"errors"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net"</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> socks5Ver <span class="token operator">=</span> <span class="token number">0x05</span>
<span class="token keyword">const</span> cmdBind <span class="token operator">=</span> <span class="token number">0x01</span>
<span class="token keyword">const</span> atypIPV4 <span class="token operator">=</span> <span class="token number">0x01</span>
<span class="token keyword">const</span> atypeHOST <span class="token operator">=</span> <span class="token number">0x03</span>
<span class="token keyword">const</span> atypeIPV6 <span class="token operator">=</span> <span class="token number">0x04</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	server<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"127.0.0.1:1080"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		client<span class="token punctuation">,</span> err <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Accept failed %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">go</span> <span class="token function">process</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">process</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
	err <span class="token operator">:=</span> <span class="token function">auth</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"client %v auth failed:%v"</span><span class="token punctuation">,</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	err <span class="token operator">=</span> <span class="token function">connect</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"client %v auth failed:%v"</span><span class="token punctuation">,</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">auth</span><span class="token punctuation">(</span>reader <span class="token operator">*</span>bufio<span class="token punctuation">.</span>Reader<span class="token punctuation">,</span> conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// +----+----------+----------+</span>
	<span class="token comment">// |VER | NMETHODS | METHODS  |</span>
	<span class="token comment">// +----+----------+----------+</span>
	<span class="token comment">// | 1  |    1     | 1 to 255 |</span>
	<span class="token comment">// +----+----------+----------+</span>
	<span class="token comment">// VER: 协议版本，socks5为0x05</span>
	<span class="token comment">// NMETHODS: 支持认证的方法数量</span>
	<span class="token comment">// METHODS: 对应NMETHODS，NMETHODS的值为多少，METHODS就有多少个字节。RFC预定义了一些值的含义，内容如下:</span>
	<span class="token comment">// X’00’ NO AUTHENTICATION REQUIRED</span>
	<span class="token comment">// X’02’ USERNAME/PASSWORD</span>

	ver<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read ver failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> ver <span class="token operator">!=</span> socks5Ver <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"not supported ver:%v"</span><span class="token punctuation">,</span> ver<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	methodSize<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read methodSize failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	method <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> methodSize<span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> method<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read method failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// +----+--------+</span>
	<span class="token comment">// |VER | METHOD |</span>
	<span class="token comment">// +----+--------+</span>
	<span class="token comment">// | 1  |   1    |</span>
	<span class="token comment">// +----+--------+</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span>socks5Ver<span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"write failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">connect</span><span class="token punctuation">(</span>reader <span class="token operator">*</span>bufio<span class="token punctuation">.</span>Reader<span class="token punctuation">,</span> conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// |VER | CMD |  RSV  | ATYP | DST.ADDR | DST.PORT |</span>
	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// | 1  |  1  | X'00' |  1   | Variable |    2     |</span>
	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// VER 版本号，socks5的值为0x05</span>
	<span class="token comment">// CMD 0x01表示CONNECT请求</span>
	<span class="token comment">// RSV 保留字段，值为0x00</span>
	<span class="token comment">// ATYP 目标地址类型，DST.ADDR的数据对应这个字段的类型。</span>
	<span class="token comment">//   0x01表示IPv4地址，DST.ADDR为4个字节</span>
	<span class="token comment">//   0x03表示域名，DST.ADDR是一个可变长度的域名</span>
	<span class="token comment">// DST.ADDR 一个可变长度的值</span>
	<span class="token comment">// DST.PORT 目标端口，固定2个字节</span>

	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> buf<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read header failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	ver<span class="token punctuation">,</span> cmd<span class="token punctuation">,</span> atyp <span class="token operator">:=</span> buf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>
	<span class="token keyword">if</span> ver <span class="token operator">!=</span> socks5Ver <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"not supported ver:%v"</span><span class="token punctuation">,</span> ver<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> cmd <span class="token operator">!=</span> cmdBind <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"not supported cmd:%v"</span><span class="token punctuation">,</span> ver<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	addr <span class="token operator">:=</span> <span class="token string">""</span>
	<span class="token keyword">switch</span> atyp <span class="token punctuation">{</span>
	<span class="token keyword">case</span> atypIPV4<span class="token punctuation">:</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read atyp failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		addr <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%d.%d.%d.%d"</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> atypeHOST<span class="token punctuation">:</span>
		hostSize<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read hostSize failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		host <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> hostSize<span class="token punctuation">)</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> host<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read host failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		addr <span class="token operator">=</span> <span class="token function">string</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span>
	<span class="token keyword">case</span> atypeIPV6<span class="token punctuation">:</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"IPv6: no supported yet"</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"invalid atyp"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read port failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	port <span class="token operator">:=</span> binary<span class="token punctuation">.</span>BigEndian<span class="token punctuation">.</span><span class="token function">Uint16</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"dial"</span><span class="token punctuation">,</span> addr<span class="token punctuation">,</span> port<span class="token punctuation">)</span>

	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// |VER | REP |  RSV  | ATYP | BND.ADDR | BND.PORT |</span>
	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// | 1  |  1  | X'00' |  1   | Variable |    2     |</span>
	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// VER socks版本，这里为0x05</span>
	<span class="token comment">// REP Relay field,内容取值如下 X’00’ succeeded</span>
	<span class="token comment">// RSV 保留字段</span>
	<span class="token comment">// ATYPE 地址类型</span>
	<span class="token comment">// BND.ADDR 服务绑定的地址</span>
	<span class="token comment">// BND.PORT 服务绑定的端口DST.PORT</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token number">0x05</span><span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">,</span> <span class="token number">0x01</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"write failed: %w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="relay-阶段" tabindex="-1"><a class="header-anchor" href="#relay-阶段" aria-hidden="true">#</a> relay 阶段</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"encoding/binary"</span>
	<span class="token string">"errors"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net"</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> socks5Ver <span class="token operator">=</span> <span class="token number">0x05</span>
<span class="token keyword">const</span> cmdBind <span class="token operator">=</span> <span class="token number">0x01</span>
<span class="token keyword">const</span> atypIPV4 <span class="token operator">=</span> <span class="token number">0x01</span>
<span class="token keyword">const</span> atypeHOST <span class="token operator">=</span> <span class="token number">0x03</span>
<span class="token keyword">const</span> atypeIPV6 <span class="token operator">=</span> <span class="token number">0x04</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	server<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"127.0.0.1:1080"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		client<span class="token punctuation">,</span> err <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Accept failed %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">go</span> <span class="token function">process</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">process</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
	err <span class="token operator">:=</span> <span class="token function">auth</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"client %v auth failed:%v"</span><span class="token punctuation">,</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	err <span class="token operator">=</span> <span class="token function">connect</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"client %v auth failed:%v"</span><span class="token punctuation">,</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">auth</span><span class="token punctuation">(</span>reader <span class="token operator">*</span>bufio<span class="token punctuation">.</span>Reader<span class="token punctuation">,</span> conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// +----+----------+----------+</span>
	<span class="token comment">// |VER | NMETHODS | METHODS  |</span>
	<span class="token comment">// +----+----------+----------+</span>
	<span class="token comment">// | 1  |    1     | 1 to 255 |</span>
	<span class="token comment">// +----+----------+----------+</span>
	<span class="token comment">// VER: 协议版本，socks5为0x05</span>
	<span class="token comment">// NMETHODS: 支持认证的方法数量</span>
	<span class="token comment">// METHODS: 对应NMETHODS，NMETHODS的值为多少，METHODS就有多少个字节。RFC预定义了一些值的含义，内容如下:</span>
	<span class="token comment">// X’00’ NO AUTHENTICATION REQUIRED</span>
	<span class="token comment">// X’02’ USERNAME/PASSWORD</span>

	ver<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read ver failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> ver <span class="token operator">!=</span> socks5Ver <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"not supported ver:%v"</span><span class="token punctuation">,</span> ver<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	methodSize<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read methodSize failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	method <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> methodSize<span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> method<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read method failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// +----+--------+</span>
	<span class="token comment">// |VER | METHOD |</span>
	<span class="token comment">// +----+--------+</span>
	<span class="token comment">// | 1  |   1    |</span>
	<span class="token comment">// +----+--------+</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span>socks5Ver<span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"write failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">connect</span><span class="token punctuation">(</span>reader <span class="token operator">*</span>bufio<span class="token punctuation">.</span>Reader<span class="token punctuation">,</span> conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// |VER | CMD |  RSV  | ATYP | DST.ADDR | DST.PORT |</span>
	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// | 1  |  1  | X'00' |  1   | Variable |    2     |</span>
	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// VER 版本号，socks5的值为0x05</span>
	<span class="token comment">// CMD 0x01表示CONNECT请求</span>
	<span class="token comment">// RSV 保留字段，值为0x00</span>
	<span class="token comment">// ATYP 目标地址类型，DST.ADDR的数据对应这个字段的类型。</span>
	<span class="token comment">//   0x01表示IPv4地址，DST.ADDR为4个字节</span>
	<span class="token comment">//   0x03表示域名，DST.ADDR是一个可变长度的域名</span>
	<span class="token comment">// DST.ADDR 一个可变长度的值</span>
	<span class="token comment">// DST.PORT 目标端口，固定2个字节</span>

	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> buf<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read header failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	ver<span class="token punctuation">,</span> cmd<span class="token punctuation">,</span> atyp <span class="token operator">:=</span> buf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>
	<span class="token keyword">if</span> ver <span class="token operator">!=</span> socks5Ver <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"not supported ver:%v"</span><span class="token punctuation">,</span> ver<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> cmd <span class="token operator">!=</span> cmdBind <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"not supported cmd:%v"</span><span class="token punctuation">,</span> ver<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	addr <span class="token operator">:=</span> <span class="token string">""</span>
	<span class="token keyword">switch</span> atyp <span class="token punctuation">{</span>
	<span class="token keyword">case</span> atypIPV4<span class="token punctuation">:</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read atyp failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		addr <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%d.%d.%d.%d"</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> atypeHOST<span class="token punctuation">:</span>
		hostSize<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read hostSize failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		host <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> hostSize<span class="token punctuation">)</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> host<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read host failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		addr <span class="token operator">=</span> <span class="token function">string</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span>
	<span class="token keyword">case</span> atypeIPV6<span class="token punctuation">:</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"IPv6: no supported yet"</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"invalid atyp"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read port failed:%w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	port <span class="token operator">:=</span> binary<span class="token punctuation">.</span>BigEndian<span class="token punctuation">.</span><span class="token function">Uint16</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"dial"</span><span class="token punctuation">,</span> addr<span class="token punctuation">,</span> port<span class="token punctuation">)</span>

	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// |VER | REP |  RSV  | ATYP | BND.ADDR | BND.PORT |</span>
	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// | 1  |  1  | X'00' |  1   | Variable |    2     |</span>
	<span class="token comment">// +----+-----+-------+------+----------+----------+</span>
	<span class="token comment">// VER socks版本，这里为0x05</span>
	<span class="token comment">// REP Relay field,内容取值如下 X’00’ succeeded</span>
	<span class="token comment">// RSV 保留字段</span>
	<span class="token comment">// ATYPE 地址类型</span>
	<span class="token comment">// BND.ADDR 服务绑定的地址</span>
	<span class="token comment">// BND.PORT 服务绑定的端口DST.PORT</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token number">0x05</span><span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">,</span> <span class="token number">0x01</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"write failed: %w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/23.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/25.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


