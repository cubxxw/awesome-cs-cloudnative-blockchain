<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第19节-go-实现-ping" tabindex="-1"><a class="header-anchor" href="#第19节-go-实现-ping" aria-hidden="true">#</a> 第19节 go 实现 ping</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/18.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="icmp" tabindex="-1"><a class="header-anchor" href="#icmp" aria-hidden="true">#</a> ICMP</h2>
<h3 id="icmpとは" tabindex="-1"><a class="header-anchor" href="#icmpとは" aria-hidden="true">#</a> ICMPとは？</h3>
<ol>
<li>ICMP（互联网控制消息协议）是 IP 协议的“错误通知”和“控制消息”</li>
<li>用于传输 的协议。 检查实现 TCP/IP 的计算机之间的通信状态</li>
<li>使用。 ICMP 是一种在互联网层（OSI 参考模型的网络层）上运行的协议。</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">推荐 ICMP 的功能与使用</p>
<ul>
<li><a href="https://github.com/cubxxw/cs-awesome-Block_Chain/blob/master/web/markdown/20.md" target="_blank" rel="noopener noreferrer">https://github.com/cubxxw/cs-awesome-Block_Chain/blob/master/web/markdown/20.md<ExternalLinkIcon/></a></li>
</ul>
</div>
<h3 id="报文头" tabindex="-1"><a class="header-anchor" href="#报文头" aria-hidden="true">#</a> 报文头</h3>
<p>ICMP报头从IP报头的第160位开始（IP首部20字节）（除非使用了IP报头的可选部分）。</p>
<table>
<thead>
<tr>
<th style="text-align:center">Bits</th>
<th style="text-align:center">160-167</th>
<th style="text-align:center">168-175</th>
<th style="text-align:center">176-183</th>
<th style="text-align:center">184-191</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><strong>160</strong></td>
<td style="text-align:center">Type</td>
<td style="text-align:center">Code</td>
<td style="text-align:center">校验码（checksum）</td>
<td style="text-align:center">校验码（checksum）</td>
</tr>
<tr>
<td style="text-align:center"><strong>192</strong></td>
<td style="text-align:center">Rest of Header</td>
<td style="text-align:center">Rest of Header</td>
<td style="text-align:center">Rest of Header</td>
<td style="text-align:center">Rest of Header</td>
</tr>
</tbody>
</table>
<img src="http://sm.nsddd.top/smasdasdf.png" alt="TCP/IP协议族的网络层基础（5）——ICMP协议以及ping命令_TLpigff的博客-CSDN博客" style="zoom:150%;" />
<h3 id="icmp-的格式" tabindex="-1"><a class="header-anchor" href="#icmp-的格式" aria-hidden="true">#</a> ICMP 的格式</h3>
<p>ICMP 消息由四个字段组成：类型、代码、校验和和和数据。</p>
<table>
<thead>
<tr>
<th>每个字段</th>
<th>英语符号</th>
<th>位数</th>
<th>每个字段的说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>类型</td>
<td>Type</td>
<td>8 bit</td>
<td>包含 ICMP 消息的功能类型值。 值见下表。</td>
</tr>
<tr>
<td>代码</td>
<td>Code</td>
<td>8 bit</td>
<td>包含 ICMP 消息的详细功能代码的值。 值见下表。</td>
</tr>
<tr>
<td>校验和</td>
<td>Checksum</td>
<td>16 bit</td>
<td>检查是否存在错误。</td>
</tr>
<tr>
<td>主题</td>
<td>Data</td>
<td>可变长度</td>
<td>长度因 ICMP 的“类型”而异。</td>
</tr>
</tbody>
</table>
<h2 id="go语言实现-ping-操作" tabindex="-1"><a class="header-anchor" href="#go语言实现-ping-操作" aria-hidden="true">#</a> Go语言实现 Ping 操作</h2>
<div class="custom-container tip"><p class="custom-container-title">步骤</p>
<ol>
<li>ping 操作原理 ICMP</li>
<li>实现 ping 操作的两个关键点</li>
<li>ping 操作</li>
</ol>
</div>
<p>我们希望可以发送 64 字节的数据 <code v-pre>-l 64</code></p>
<h3 id="flag-的作用" tabindex="-1"><a class="header-anchor" href="#flag-的作用" aria-hidden="true">#</a> flag 的作用</h3>
<p>Go语言内置的<code v-pre>flag</code>包实现了命令行参数的解析，<code v-pre>flag</code>包使得开发命令行工具更为简单。</p>
<p><strong>可以简单的获取命令行参数：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token comment">//os.Args demo</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//os.Args是一个[]string</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> index<span class="token punctuation">,</span> arg <span class="token operator">:=</span> <span class="token keyword">range</span> os<span class="token punctuation">.</span>Args <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"args[%d]=%v\n"</span><span class="token punctuation">,</span> index<span class="token punctuation">,</span> arg<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>🚀 编译结果如下：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>code<span class="token punctuation">\</span>go-super<span class="token operator">></span> go run  .<span class="token punctuation">\</span><span class="token number">74</span>-main.go wefa     
args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span>C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token punctuation">\</span>AppData<span class="token punctuation">\</span>Local<span class="token punctuation">\</span>Temp<span class="token punctuation">\</span>go-build1593224315<span class="token punctuation">\</span>b001<span class="token punctuation">\</span>exe<span class="token punctuation">\</span><span class="token number">74</span>-main.exe
args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span>wefa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>是不是可以和我们之前的Cobra联合起来了，或许我们可以使用 Cobra 对吧~</p>
</div>
<h3 id="lag-type" tabindex="-1"><a class="header-anchor" href="#lag-type" aria-hidden="true">#</a> lag.Type()</h3>
<p>基本格式如下：</p>
<p><code v-pre>flag.Type(flag名, 默认值, 帮助信息)*Type</code> 例如我们要定义姓名、年龄、婚否三个命令行参数，我们可以按如下方式定义：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>name <span class="token operator">:=</span> flag<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"张三"</span><span class="token punctuation">,</span> <span class="token string">"姓名"</span><span class="token punctuation">)</span>
age <span class="token operator">:=</span> flag<span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">"年龄"</span><span class="token punctuation">)</span>
married <span class="token operator">:=</span> flag<span class="token punctuation">.</span><span class="token function">Bool</span><span class="token punctuation">(</span><span class="token string">"married"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">"婚否"</span><span class="token punctuation">)</span>
delay <span class="token operator">:=</span> flag<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span><span class="token string">"delay"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">"时间间隔"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，此时<code v-pre>name</code>、<code v-pre>age</code>、<code v-pre>married</code>、<code v-pre>delay</code>均为对应类型的指针。</p>
<h3 id="flag-typevar" tabindex="-1"><a class="header-anchor" href="#flag-typevar" aria-hidden="true">#</a> flag.TypeVar()</h3>
<p>基本格式如下： <code v-pre>flag.TypeVar(Type指针, flag名, 默认值, 帮助信息)</code> 例如我们要定义姓名、年龄、婚否三个命令行参数，我们可以按如下方式定义：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> name <span class="token builtin">string</span>
<span class="token keyword">var</span> age <span class="token builtin">int</span>
<span class="token keyword">var</span> married <span class="token builtin">bool</span>
<span class="token keyword">var</span> delay time<span class="token punctuation">.</span>Duration
flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>name<span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"张三"</span><span class="token punctuation">,</span> <span class="token string">"姓名"</span><span class="token punctuation">)</span>
flag<span class="token punctuation">.</span><span class="token function">IntVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>age<span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">"年龄"</span><span class="token punctuation">)</span>
flag<span class="token punctuation">.</span><span class="token function">BoolVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>married<span class="token punctuation">,</span> <span class="token string">"married"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">"婚否"</span><span class="token punctuation">)</span>
flag<span class="token punctuation">.</span><span class="token function">DurationVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>delay<span class="token punctuation">,</span> <span class="token string">"delay"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">"时间间隔"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="flag-parse" tabindex="-1"><a class="header-anchor" href="#flag-parse" aria-hidden="true">#</a> flag.Parse()</h3>
<p>通过以上两种方法定义好命令行flag参数后，需要通过调用<code v-pre>flag.Parse()</code>来对命令行参数进行解析。</p>
<p>支持的命令行参数格式有以下几种：</p>
<ul>
<li><code v-pre>-flag xxx</code> （使用空格，一个<code v-pre>-</code>符号）</li>
<li><code v-pre>--flag xxx</code> （使用空格，两个<code v-pre>-</code>符号）</li>
<li><code v-pre>-flag=xxx</code> （使用等号，一个<code v-pre>-</code>符号）</li>
<li><code v-pre>--flag=xxx</code> （使用等号，两个<code v-pre>-</code>符号）</li>
</ul>
<p>其中，布尔类型的参数必须使用等号的方式指定。</p>
<p><code v-pre>Parse</code>解析<code v-pre>os.Args[1:]</code>中的命令行标志。必须在定义所有标志之后和在程序访问标志之前调用。</p>
<h3 id="else" tabindex="-1"><a class="header-anchor" href="#else" aria-hidden="true">#</a> else</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>flag<span class="token punctuation">.</span><span class="token function">Args</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">////返回命令行参数后的其他参数，以[]string类型</span>
flag<span class="token punctuation">.</span><span class="token function">NArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">//返回命令行参数后的其他参数个数</span>
flag<span class="token punctuation">.</span><span class="token function">NFlag</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//返回使用的命令行参数个数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取命令行参数" tabindex="-1"><a class="header-anchor" href="#获取命令行参数" aria-hidden="true">#</a> 获取命令行参数</h2>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
实现ping操作
*/</span>

<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"flag"</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	timeout <span class="token builtin">int64</span>
	size    <span class="token builtin">int</span>
	count   <span class="token builtin">int</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">getCommandArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>timeout<span class="token punctuation">,</span> size<span class="token punctuation">,</span> count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getCommandArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//获取命令行参数</span>
	flag<span class="token punctuation">.</span><span class="token function">Int64Var</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>timeout<span class="token punctuation">,</span> <span class="token string">"t"</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token string">"请求超时时间，单位毫秒"</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">IntVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>size<span class="token punctuation">,</span> <span class="token string">"s"</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token string">"请求数据包大小，单位字节"</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">IntVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>count<span class="token punctuation">,</span> <span class="token string">"c"</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"请求次数"</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//解析命令行参数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:<span class="token punctuation">\</span>go-super<span class="token operator">></span> go run  .<span class="token punctuation">\</span><span class="token number">73</span>-main.go               
<span class="token number">1000</span> <span class="token number">32</span> <span class="token number">4</span>
PS D:<span class="token punctuation">\</span>go-super<span class="token operator">></span> go run  .<span class="token punctuation">\</span><span class="token number">73</span>-main.go <span class="token parameter variable">-t</span> <span class="token number">1234</span> <span class="token parameter variable">-s</span> <span class="token number">128</span> <span class="token parameter variable">-c</span> <span class="token number">6</span>
<span class="token number">1234</span> <span class="token number">128</span> <span class="token number">6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取请求" tabindex="-1"><a class="header-anchor" href="#获取请求" aria-hidden="true">#</a> 获取请求</h2>
<p><strong>注意大小端区别：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
实现ping操作
*/</span>

<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bytes"</span>
	<span class="token string">"encoding/binary"</span>
	<span class="token string">"flag"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"net"</span>
	<span class="token string">"os"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> ICMP <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Type     <span class="token builtin">uint8</span>  <span class="token comment">//消息类型</span>
	Code     <span class="token builtin">uint8</span>  <span class="token comment">//类型子码</span>
	Checksum <span class="token builtin">uint16</span> <span class="token comment">//校验和</span>
	<span class="token comment">//标识符和序列号</span>
	ID  <span class="token builtin">uint16</span> <span class="token comment">//标识符</span>
	Seq <span class="token builtin">uint16</span> <span class="token comment">//序列号</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	timeout <span class="token builtin">int64</span>
	size    <span class="token builtin">int</span>
	count   <span class="token builtin">int</span>
	icmp    <span class="token operator">*</span>ICMP <span class="token operator">=</span> <span class="token operator">&amp;</span>ICMP<span class="token punctuation">{</span>
		Type<span class="token punctuation">:</span>     <span class="token number">8</span><span class="token punctuation">,</span>
		Code<span class="token punctuation">:</span>     <span class="token number">0</span><span class="token punctuation">,</span>
		Checksum<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
		ID<span class="token punctuation">:</span>       <span class="token number">6</span><span class="token punctuation">,</span>
		Seq<span class="token punctuation">:</span>      <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">getCommandArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">//目标ip地址</span>
	desIp <span class="token operator">:=</span> os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">//获取最后一个参数</span>

	<span class="token comment">//构建请求</span>
	conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">DialTimeout</span><span class="token punctuation">(</span><span class="token string">"ip4:icmp"</span><span class="token punctuation">,</span> desIp<span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token operator">*</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"请求失败"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	data <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> size<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"正在 Ping"</span><span class="token punctuation">,</span> desIp<span class="token punctuation">,</span> <span class="token string">" 具有 32 字节的数据:"</span><span class="token punctuation">,</span> <span class="token string">"data:"</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>

	<span class="token keyword">var</span> buffer bytes<span class="token punctuation">.</span>Buffer
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"大端："</span><span class="token punctuation">)</span>
	binary<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buffer<span class="token punctuation">,</span> binary<span class="token punctuation">.</span>BigEndian<span class="token punctuation">,</span> <span class="token operator">&amp;</span>icmp<span class="token punctuation">)</span> <span class="token comment">//写入类型</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"icmp:"</span><span class="token punctuation">,</span> icmp<span class="token punctuation">)</span>

	<span class="token keyword">var</span> buffer2 bytes<span class="token punctuation">.</span>Buffer
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"小端："</span><span class="token punctuation">)</span>
	binary<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buffer2<span class="token punctuation">,</span> binary<span class="token punctuation">.</span>LittleEndian<span class="token punctuation">,</span> <span class="token operator">&amp;</span>icmp<span class="token punctuation">)</span> <span class="token comment">//写入类型</span>
	<span class="token comment">/*
		binary.BigEndian: 大端序
		binary.LittleEndian: 小端序
	*/</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"icmp:"</span><span class="token punctuation">,</span> icmp<span class="token punctuation">)</span>

	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> count<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"发送失败"</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//设置超时时间</span>
		conn<span class="token punctuation">.</span><span class="token function">SetReadDeadline</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"接收失败"</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"接收成功"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getCommandArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//获取命令行参数</span>
	flag<span class="token punctuation">.</span><span class="token function">Int64Var</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>timeout<span class="token punctuation">,</span> <span class="token string">"t"</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token string">"请求超时时间，单位毫秒"</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">IntVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>size<span class="token punctuation">,</span> <span class="token string">"s"</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token string">"请求数据包大小，单位字节"</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">IntVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>count<span class="token punctuation">,</span> <span class="token string">"c"</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"请求次数"</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//解析命令行参数</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ go run  73-main.go -t 128 -s 36 -c 6 www.baidu.com
正在 Ping www.baidu.com  具有 32 字节的数据: data: [0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0]
大端：icmp: &amp;{8 0 0 1 1}
小端：icmp: &amp;{8 0 0 1 1}
发送失败
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>校验：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Checksum</span><span class="token punctuation">(</span>data <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token builtin">uint16</span> <span class="token punctuation">{</span> <span class="token comment">//定义校验和函数：参数为字节切片，返回值为uint16</span>
	<span class="token keyword">var</span> sum <span class="token builtin">uint32</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token number">2</span> <span class="token punctuation">{</span> <span class="token comment">//每次取两个字节</span>
		sum <span class="token operator">+=</span> <span class="token function">uint32</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">&lt;&lt;</span><span class="token number">8</span> <span class="token operator">+</span> <span class="token function">uint32</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">//将每两个字节转换为uint16类型，然后相加</span>
	<span class="token punctuation">}</span>
	sum <span class="token operator">=</span> <span class="token punctuation">(</span>sum <span class="token operator">>></span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>sum <span class="token operator">&amp;</span> <span class="token number">0xffff</span><span class="token punctuation">)</span> <span class="token comment">//高16位与低16位相加</span>
	sum <span class="token operator">+=</span> sum <span class="token operator">>></span> <span class="token number">16</span>                   <span class="token comment">//将进位的1加到低16位</span>
	<span class="token keyword">return</span> <span class="token function">uint16</span><span class="token punctuation">(</span><span class="token operator">^</span>sum<span class="token punctuation">)</span>                <span class="token comment">//取反</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例</h2>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bytes"</span>
	<span class="token string">"encoding/binary"</span>
	<span class="token string">"flag"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"log"</span>
	<span class="token string">"math"</span>
	<span class="token string">"net"</span>
	<span class="token string">"os"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> ICMP <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Type        <span class="token builtin">uint8</span>
	Code        <span class="token builtin">uint8</span>
	Checksum    <span class="token builtin">uint16</span>
	Identifier  <span class="token builtin">uint16</span>
	SequenceNum <span class="token builtin">uint16</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	icmp    ICMP
	laddr   <span class="token operator">=</span> net<span class="token punctuation">.</span>IPAddr<span class="token punctuation">{</span>IP<span class="token punctuation">:</span> net<span class="token punctuation">.</span><span class="token function">ParseIP</span><span class="token punctuation">(</span><span class="token string">"ip"</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
	num     <span class="token builtin">int</span>
	timeout <span class="token builtin">int64</span>
	size    <span class="token builtin">int</span>
	stop    <span class="token builtin">bool</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">ParseArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	args <span class="token operator">:=</span> os<span class="token punctuation">.</span>Args

	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token punctuation">{</span> <span class="token comment">// 没有输入主机地址</span>
		<span class="token function">Usage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	desIp <span class="token operator">:=</span> args<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>

	conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">DialTimeout</span><span class="token punctuation">(</span><span class="token string">"ip:icmp"</span><span class="token punctuation">,</span> desIp<span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token operator">*</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//icmp头部填充</span>
	icmp<span class="token punctuation">.</span>Type <span class="token operator">=</span> <span class="token number">8</span>
	icmp<span class="token punctuation">.</span>Code <span class="token operator">=</span> <span class="token number">0</span>
	icmp<span class="token punctuation">.</span>Checksum <span class="token operator">=</span> <span class="token number">0</span>
	icmp<span class="token punctuation">.</span>Identifier <span class="token operator">=</span> <span class="token number">1</span>
	icmp<span class="token punctuation">.</span>SequenceNum <span class="token operator">=</span> <span class="token number">1</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n正在 ping %s 具有 %d 字节的数据:\n"</span><span class="token punctuation">,</span> desIp<span class="token punctuation">,</span> size<span class="token punctuation">)</span>

	<span class="token keyword">var</span> buffer bytes<span class="token punctuation">.</span>Buffer
	binary<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buffer<span class="token punctuation">,</span> binary<span class="token punctuation">.</span>BigEndian<span class="token punctuation">,</span> icmp<span class="token punctuation">)</span> <span class="token comment">// 以大端模式写入</span>
	data <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> size<span class="token punctuation">)</span>                    <span class="token comment">//</span>
	buffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
	data <span class="token operator">=</span> buffer<span class="token punctuation">.</span><span class="token function">Bytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">var</span> SuccessTimes <span class="token builtin">int</span> <span class="token comment">// 成功次数</span>
	<span class="token keyword">var</span> FailTimes <span class="token builtin">int</span>    <span class="token comment">// 失败次数</span>
	<span class="token keyword">var</span> minTime <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token function">int</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>MaxInt32<span class="token punctuation">)</span>
	<span class="token keyword">var</span> maxTime <span class="token builtin">int</span>
	<span class="token keyword">var</span> totalTime <span class="token builtin">int</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> num<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		icmp<span class="token punctuation">.</span>SequenceNum <span class="token operator">=</span> <span class="token function">uint16</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token comment">// 检验和设为0</span>
		data<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">byte</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
		data<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">byte</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

		data<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">byte</span><span class="token punctuation">(</span>icmp<span class="token punctuation">.</span>SequenceNum <span class="token operator">>></span> <span class="token number">8</span><span class="token punctuation">)</span>
		data<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">byte</span><span class="token punctuation">(</span>icmp<span class="token punctuation">.</span>SequenceNum<span class="token punctuation">)</span>
		icmp<span class="token punctuation">.</span>Checksum <span class="token operator">=</span> <span class="token function">CheckSum</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
		data<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">byte</span><span class="token punctuation">(</span>icmp<span class="token punctuation">.</span>Checksum <span class="token operator">>></span> <span class="token number">8</span><span class="token punctuation">)</span>
		data<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">byte</span><span class="token punctuation">(</span>icmp<span class="token punctuation">.</span>Checksum<span class="token punctuation">)</span>

		<span class="token comment">// 开始时间</span>
		t1 <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		conn<span class="token punctuation">.</span><span class="token function">SetDeadline</span><span class="token punctuation">(</span>t1<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">65535</span><span class="token punctuation">)</span>
		n<span class="token punctuation">,</span> err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"请求超时。"</span><span class="token punctuation">)</span>
			FailTimes<span class="token operator">++</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		et <span class="token operator">:=</span> <span class="token function">int</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Since</span><span class="token punctuation">(</span>t1<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000000</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> minTime <span class="token operator">></span> et <span class="token punctuation">{</span>
			minTime <span class="token operator">=</span> et
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> maxTime <span class="token operator">&lt;</span> et <span class="token punctuation">{</span>
			maxTime <span class="token operator">=</span> et
		<span class="token punctuation">}</span>
		totalTime <span class="token operator">+=</span> et
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"来自 %s 的回复: 字节=%d 时间=%dms TTL=%d\n"</span><span class="token punctuation">,</span> desIp<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token number">28</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> et<span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
		SuccessTimes<span class="token operator">++</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n%s 的 Ping 统计信息:\n"</span><span class="token punctuation">,</span> desIp<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"    数据包: 已发送 = %d，已接收 = %d，丢失 = %d (%.2f%% 丢失)，\n"</span><span class="token punctuation">,</span> SuccessTimes<span class="token operator">+</span>FailTimes<span class="token punctuation">,</span> SuccessTimes<span class="token punctuation">,</span> FailTimes<span class="token punctuation">,</span> <span class="token function">float64</span><span class="token punctuation">(</span>FailTimes<span class="token operator">*</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token function">float64</span><span class="token punctuation">(</span>SuccessTimes<span class="token operator">+</span>FailTimes<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> maxTime <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> minTime <span class="token operator">!=</span> <span class="token function">int</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>MaxInt32<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"往返行程的估计时间(以毫秒为单位):\n"</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"    最短 = %dms，最长 = %dms，平均 = %dms\n"</span><span class="token punctuation">,</span> minTime<span class="token punctuation">,</span> maxTime<span class="token punctuation">,</span> totalTime<span class="token operator">/</span>SuccessTimes<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">CheckSum</span><span class="token punctuation">(</span>data <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token builtin">uint16</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> sum <span class="token builtin">uint32</span>
	<span class="token keyword">var</span> length <span class="token operator">=</span> <span class="token function">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
	<span class="token keyword">var</span> index <span class="token builtin">int</span>
	<span class="token keyword">for</span> length <span class="token operator">></span> <span class="token number">1</span> <span class="token punctuation">{</span> <span class="token comment">// 溢出部分直接去除</span>
		sum <span class="token operator">+=</span> <span class="token function">uint32</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">&lt;&lt;</span><span class="token number">8</span> <span class="token operator">+</span> <span class="token function">uint32</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span>index<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
		index <span class="token operator">+=</span> <span class="token number">2</span>
		length <span class="token operator">-=</span> <span class="token number">2</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> length <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		sum <span class="token operator">+=</span> <span class="token function">uint32</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// CheckSum的值是16位，计算是将高16位加低16位，得到的结果进行重复以该方式进行计算，直到高16位为0</span>
	<span class="token comment">/*
	   sum的最大情况是：ffffffff
	   第一次高16位+低16位：ffff + ffff = 1fffe
	   第二次高16位+低16位：0001 + fffe = ffff
	   即推出一个结论，只要第一次高16位+低16位的结果，再进行之前的计算结果用到高16位+低16位，即可处理溢出情况
	*/</span>
	sum <span class="token operator">=</span> <span class="token function">uint32</span><span class="token punctuation">(</span>sum<span class="token operator">>></span><span class="token number">16</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">uint32</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span>
	sum <span class="token operator">=</span> <span class="token function">uint32</span><span class="token punctuation">(</span>sum<span class="token operator">>></span><span class="token number">16</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">uint32</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token function">uint16</span><span class="token punctuation">(</span><span class="token operator">^</span>sum<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ParseArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	flag<span class="token punctuation">.</span><span class="token function">Int64Var</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>timeout<span class="token punctuation">,</span> <span class="token string">"w"</span><span class="token punctuation">,</span> <span class="token number">1500</span><span class="token punctuation">,</span> <span class="token string">"等待每次回复的超时时间(毫秒)"</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">IntVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>num<span class="token punctuation">,</span> <span class="token string">"n"</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"要发送的请求数"</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">IntVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>size<span class="token punctuation">,</span> <span class="token string">"l"</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token string">"要发送缓冲区大小"</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">BoolVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>stop<span class="token punctuation">,</span> <span class="token string">"t"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">"Ping 指定的主机，直到停止"</span><span class="token punctuation">)</span>

	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Usage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	argNum <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">)</span>
	<span class="token keyword">if</span> argNum <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>
			<span class="token string">`
用法: ping [-t] [-a] [-n count] [-l size] [-f] [-i TTL] [-v TOS]
            [-r count] [-s count] [[-j host-list] | [-k host-list]]
            [-w timeout] [-R] [-S srcaddr] [-c compartment] [-p]
            [-4] [-6] target_name
选项:
    -t             Ping 指定的主机，直到停止。
                   若要查看统计信息并继续操作，请键入 Ctrl+Break；
                   若要停止，请键入 Ctrl+C。
    -a             将地址解析为主机名。
    -n count       要发送的回显请求数。
    -l size        发送缓冲区大小。
    -f             在数据包中设置“不分段”标记(仅适用于 IPv4)。
    -i TTL         生存时间。
    -v TOS         服务类型(仅适用于 IPv4。该设置已被弃用，
                   对 IP 标头中的服务类型字段没有任何
                   影响)。
    -r count       记录计数跃点的路由(仅适用于 IPv4)。
    -s count       计数跃点的时间戳(仅适用于 IPv4)。
    -j host-list   与主机列表一起使用的松散源路由(仅适用于 IPv4)。
    -k host-list    与主机列表一起使用的严格源路由(仅适用于 IPv4)。
    -w timeout     等待每次回复的超时时间(毫秒)。
    -R             同样使用路由标头测试反向路由(仅适用于 IPv6)。
                   根据 RFC 5095，已弃用此路由标头。
                   如果使用此标头，某些系统可能丢弃
                   回显请求。
    -S srcaddr     要使用的源地址。
    -c compartment 路由隔离舱标识符。
    -p             Ping Hyper-V 网络虚拟化提供程序地址。
    -4             强制使用 IPv4。
    -6             强制使用 IPv6。
`</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ go run  <span class="token number">76</span>-main.go <span class="token parameter variable">-t</span> <span class="token number">128</span> <span class="token parameter variable">-s</span> <span class="token number">36</span> <span class="token parameter variable">-c</span> <span class="token number">6</span> www.baidu.com     
正在 <span class="token function">ping</span> www.baidu.com 具有 <span class="token number">32</span> 字节的数据:
来自 www.baidu.com 的回复: 字节<span class="token operator">=</span><span class="token number">32</span> 时间<span class="token operator">=</span>25ms <span class="token assign-left variable">TTL</span><span class="token operator">=</span><span class="token number">55</span>
来自 www.baidu.com 的回复: 字节<span class="token operator">=</span><span class="token number">32</span> 时间<span class="token operator">=</span>26ms <span class="token assign-left variable">TTL</span><span class="token operator">=</span><span class="token number">55</span>
来自 www.baidu.com 的回复: 字节<span class="token operator">=</span><span class="token number">32</span> 时间<span class="token operator">=</span>21ms <span class="token assign-left variable">TTL</span><span class="token operator">=</span><span class="token number">55</span>

www.baidu.com 的 Ping 统计信息:
    数据包: 已发送 <span class="token operator">=</span> <span class="token number">4</span>，已接收 <span class="token operator">=</span> <span class="token number">4</span>，丢失 <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.00</span>% 丢失<span class="token punctuation">)</span>，
往返行程的估计时间<span class="token punctuation">(</span>以毫秒为单位<span class="token punctuation">)</span>:
    最短 <span class="token operator">=</span> 21ms，最长 <span class="token operator">=</span> 29ms，平均 <span class="token operator">=</span> 25ms
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/18.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/20.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


