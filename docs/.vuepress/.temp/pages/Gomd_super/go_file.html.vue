<template><div><h1 id="go语言文本编码处理" tabindex="-1"><a class="header-anchor" href="#go语言文本编码处理" aria-hidden="true">#</a> Go语言文本编码处理</h1>
<p>[toc]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>有时候，我们需要用到Go语言处理一些很特殊的业务，就比如说我的仓库，如果不用程序的化，依次去编写文章是非常消耗时间和精力的，这个时候脚本或者程序代码可以帮助我们解决很多事情，比如说我现在的需求是：我需要用Go语言编写一个程序，满足下面的需求：</p>
<ol>
<li>可以创建文件夹，和<code v-pre>README.md</code>文件</li>
<li>可以按照不同人或者不同的项目需要来编写程序代码</li>
<li>可以读取电脑上面的文件</li>
<li>在每一个文件里面，需要准备基本的模板</li>
<li>在<code v-pre>README.md</code>中也写入基本的模板</li>
<li>导入或者下载项目所需要的工具或者脚本</li>
</ol>
<h2 id="判断是否字符串是否包含字符串" tabindex="-1"><a class="header-anchor" href="#判断是否字符串是否包含字符串" aria-hidden="true">#</a> 判断是否字符串是否包含字符串</h2>
<p>介绍strings使用方法</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"strings"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token string">"hello word!"</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">"?"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\区块链\code\gin>  go run .\main.go
true false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>包含hello返回true，不包含？返回false</strong></p>
<p><strong>看下contains源码</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Contains reports whether substr is within s.
func Contains(s, substr string) bool {
	return Index(s, substr) >= 0
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串拆分" tabindex="-1"><a class="header-anchor" href="#字符串拆分" aria-hidden="true">#</a> 字符串拆分</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"strings"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token string">"hello word!"</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">"?"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	ss <span class="token operator">:=</span> <span class="token string">"a&amp;s*a##av"</span>
	splitedStr <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>ss<span class="token punctuation">,</span> <span class="token string">"#"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>splitedStr<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\区块链\code\gin>  go run .\main.go
true false
[a&amp;s*a  av]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>看下源码</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Split</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> sep <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token function">genSplit</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> sep<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

<span class="token comment">// SplitAfter slices s into all substrings after each instance of sep and</span>
<span class="token comment">// returns a slice of those substrings.</span>
<span class="token comment">//</span>
<span class="token comment">// If s does not contain sep and sep is not empty, SplitAfter returns</span>
<span class="token comment">// a slice of length 1 whose only element is s.</span>
<span class="token comment">//</span>
<span class="token comment">// If sep is empty, SplitAfter splits after each UTF-8 sequence. If</span>
<span class="token comment">// both s and sep are empty, SplitAfter returns an empty slice.</span>
<span class="token comment">//</span>
<span class="token comment">// It is equivalent to SplitAfterN with a count of -1.</span>
<span class="token keyword">func</span> <span class="token function">SplitAfter</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> sep <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">genSplit</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> sep<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>sep<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可以使用join将其合并起来" tabindex="-1"><a class="header-anchor" href="#可以使用join将其合并起来" aria-hidden="true">#</a> 可以使用join将其合并起来</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>fmt.Println("string.Join(splitedStr,"#"))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>看下join源码</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Join</span><span class="token punctuation">(</span>elems <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> sep <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> <span class="token function">len</span><span class="token punctuation">(</span>elems<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token string">""</span>
	<span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
		<span class="token keyword">return</span> elems<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
	n <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>sep<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>elems<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>elems<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		n <span class="token operator">+=</span> <span class="token function">len</span><span class="token punctuation">(</span>elems<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">var</span> b Builder
	b<span class="token punctuation">.</span><span class="token function">Grow</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
	b<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>elems<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> s <span class="token operator">:=</span> <span class="token keyword">range</span> elems<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
		b<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>sep<span class="token punctuation">)</span>
		b<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> b<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串转化" tabindex="-1"><a class="header-anchor" href="#字符串转化" aria-hidden="true">#</a> 字符串转化</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"strconv"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token string">"zxcvzbnznz"</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"s="</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// func Itoa(i int) string {</span>
	<span class="token comment">// 	return FormatInt(int64(i), 10)</span>
	<span class="token comment">// }</span>
	a<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span><span class="token string">"12"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"err = "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\区块链\code\gin>  go run .\main.go
s= zxcvzbnznz
100
12
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>继续</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"strconv"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token string">"zxcvzbnznz"</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"s="</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// func Itoa(i int) string {</span>
	<span class="token comment">// 	return FormatInt(int64(i), 10)</span>
	<span class="token comment">// }</span>
	a<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseBool</span><span class="token punctuation">(</span><span class="token string">"t"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"err = "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">/*func ParseBool(str string) (bool, error) {
		switch str {
		case "1", "t", "T", "true", "TRUE", "True":
			return true, nil
		case "0", "f", "F", "false", "FALSE", "False":
			return false, nil
		}
		return false, syntaxError("ParseBool", str)
	}*/</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"a="</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
	a1<span class="token punctuation">,</span> err1 <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseFloat</span><span class="token punctuation">(</span><span class="token string">"123.2134"</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err1 <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"err = "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">/*func ParseFloat(s string, bitSize int) (float64, error) {
		f, n, err := parseFloatPrefix(s, bitSize)
		if n != len(s) &amp;&amp; (err == nil || err.(*NumError).Err != ErrSyntax) {
			return 0, syntaxError(fnParseFloat, s)
		}
		return f, err
	}*/</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"a1="</span><span class="token punctuation">,</span> a1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\区块链\code\gin>  go run .\main.go
s= zxcvzbnznz
100
a= true
a1= 123.2134
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="序列化和反序列化" tabindex="-1"><a class="header-anchor" href="#序列化和反序列化" aria-hidden="true">#</a> 序列化和反序列化</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"encoding/xml"</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> Person<span class="token punctuation">{</span><span class="token string">"smiel"</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"person = "</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span>
	<span class="token keyword">if</span> data<span class="token punctuation">,</span> err <span class="token operator">:=</span> xml<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"err = "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">/*func Marshal(v any) ([]byte, error) {
	var b bytes.Buffer
	if err := NewEncoder(&amp;b).Encode(v); err != nil {
		return nil, err
	}
	return b.Bytes(), nil
}*/</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\区块链\code\gin>  go run .\main.go
person =  {smiel 19}
&lt;Person>&lt;Name>smiel&lt;/Name>&lt;Age>19&lt;/Age>&lt;/Person>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这个默认不是可读性的xml需要格式化</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>xml.MarshalIndent(p,""," ")
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>第二个：前缀</li>
<li>第三个：缩进</li>
</ul>
<p><strong>底层源码</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func MarshalIndent(v any, prefix, indent string) ([]byte, error) {
	var b bytes.Buffer
	enc := NewEncoder(&amp;b)
	enc.Indent(prefix, indent)
	if err := enc.Encode(v); err != nil {
		return nil, err
	}
	return b.Bytes(), nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>此时还有一个小技巧，我的err放在if语句中，此时可以确定作用域仅仅在if语句中</strong></p>
<h2 id="使用flag获取复杂参数" tabindex="-1"><a class="header-anchor" href="#使用flag获取复杂参数" aria-hidden="true">#</a> 使用flag获取复杂参数</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"flag"</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	methodPtr <span class="token operator">:=</span> flag<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"method"</span><span class="token punctuation">,</span> <span class="token string">"default"</span><span class="token punctuation">,</span> <span class="token string">"method of sample"</span><span class="token punctuation">)</span>
	<span class="token comment">//func String(name string, value string, usage string) *string {</span>
	<span class="token comment">//return CommandLine.String(name, value, usage)}</span>
	valuePtr <span class="token operator">:=</span> flag<span class="token punctuation">.</span><span class="token function">Int64</span><span class="token punctuation">(</span><span class="token string">"value"</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"value of sample"</span><span class="token punctuation">)</span>

	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>methodPtr<span class="token punctuation">,</span> <span class="token operator">*</span>valuePtr<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>C:\Users\smile\Desktop\区块链\code\gin>go build main.go

C:\Users\smile\Desktop\区块链\code\gin>a.exe
'a.exe' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

C:\Users\smile\Desktop\区块链\code\gin>go build main.go

C:\Users\smile\Desktop\区块链\code\gin>main.exe
default -1

C:\Users\smile\Desktop\区块链\code\gin>main.exe -method helloxiongxinwei@mail.com
helloxiongxinwei@mail.com -1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="控制命令行操作" tabindex="-1"><a class="header-anchor" href="#控制命令行操作" aria-hidden="true">#</a> 控制命令行操作</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"bytes"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os/exec"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">cmd1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//首先生成cmd结构体,该结构体包含了很多信息，如执行命令的参数，命令的标准输入输出等</span>
	command <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"ls"</span><span class="token punctuation">,</span> <span class="token string">"-l"</span><span class="token punctuation">)</span>
	<span class="token comment">//给标准输入以及标准错误初始化一个buffer，每条命令的输出位置可能是不一样的，</span>
	<span class="token comment">//比如有的命令会将输出放到stdout，有的放到stderr</span>
	command<span class="token punctuation">.</span>Stdout <span class="token operator">=</span> <span class="token operator">&amp;</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">{</span><span class="token punctuation">}</span>
	command<span class="token punctuation">.</span>Stderr <span class="token operator">=</span> <span class="token operator">&amp;</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">//执行命令，直到命令结束</span>
	err <span class="token operator">:=</span> command<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">//打印程序中的错误以及命令行标准错误中的输出</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>command<span class="token punctuation">.</span>Stderr<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//打印命令行的标准输出</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>command<span class="token punctuation">.</span>Stdout<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">cmd2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//首先生成cmd结构体</span>
	cmd <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"strace"</span><span class="token punctuation">,</span> <span class="token string">"-p"</span><span class="token punctuation">,</span> <span class="token string">"15284"</span><span class="token punctuation">)</span>
	<span class="token comment">//调用stderrPipe生成一个管道，该管道连接到命令行进程的标准错误， 该方法返回一个</span>
	<span class="token comment">//ReadCloser， 我们可以通过读取返回的ReadCloser来实时读取命令行进程的标准错误</span>
	piper<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">StderrPipe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//开始执行命令</span>
	cmd<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//使用bufio包封装的方法实现对reader的读取</span>
	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>piper<span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">//换行分隔</span>
		line<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//打印内容</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//等待命令结束并回收子进程资源等</span>
	cmd<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"调用cmd1函数:"</span><span class="token punctuation">)</span>
	<span class="token function">cmd1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"调用cmd2函数:"</span><span class="token punctuation">)</span>
	<span class="token function">cmd2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	command <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"ifconfig"</span><span class="token punctuation">)</span>
	command<span class="token punctuation">.</span>Stdout <span class="token operator">=</span> <span class="token operator">&amp;</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">{</span><span class="token punctuation">}</span>
	command<span class="token punctuation">.</span>Stderr <span class="token operator">=</span> <span class="token operator">&amp;</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">//执行命令，直到命令结束</span>
	err <span class="token operator">:=</span> command<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">//打印程序中的错误以及命令行标准错误中的输出</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>command<span class="token punctuation">.</span>Stderr<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>command<span class="token punctuation">.</span>Stdout<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看底层源码：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Command</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> arg <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Cmd <span class="token punctuation">{</span>
	cmd <span class="token operator">:=</span> <span class="token operator">&amp;</span>Cmd<span class="token punctuation">{</span>
		Path<span class="token punctuation">:</span> name<span class="token punctuation">,</span>
		Args<span class="token punctuation">:</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token punctuation">,</span> arg<span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> filepath<span class="token punctuation">.</span><span class="token function">Base</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">==</span> name <span class="token punctuation">{</span>
		<span class="token keyword">if</span> lp<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">LookPath</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			cmd<span class="token punctuation">.</span>lookPathErr <span class="token operator">=</span> err
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			cmd<span class="token punctuation">.</span>Path <span class="token operator">=</span> lp
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> cmd
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="补充-变量的作用域" tabindex="-1"><a class="header-anchor" href="#补充-变量的作用域" aria-hidden="true">#</a> 补充：变量的作用域</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">style</span><span class="token punctuation">(</span>method <span class="token builtin">string</span><span class="token punctuation">,</span> value <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//this.method = method</span>
	method <span class="token operator">=</span> <span class="token string">"smile3"</span>
	value <span class="token operator">=</span> <span class="token number">1003</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">style2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> method <span class="token builtin">string</span>
	<span class="token keyword">var</span> value <span class="token builtin">int</span>
	method <span class="token operator">=</span> <span class="token string">"smile"</span>
	value <span class="token operator">=</span> <span class="token number">100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> method <span class="token builtin">string</span>
	<span class="token keyword">var</span> value <span class="token builtin">int</span>
	method <span class="token operator">=</span> <span class="token string">"hello main"</span>
	value <span class="token operator">=</span> <span class="token number">10</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">" === "</span><span class="token punctuation">)</span>
	<span class="token function">style2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">" === "</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">" === "</span><span class="token punctuation">)</span>
	<span class="token function">style</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">" == 3"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>C:\Users\smile\Desktop\区块链\code\gin>go run main.go
hello main
10
 ===
smile
100
 ===
hello main
10
 ===
smile3
1003
 == 3
hello main
10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


