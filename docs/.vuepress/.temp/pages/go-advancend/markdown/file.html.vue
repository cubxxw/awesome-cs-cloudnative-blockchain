<template><div><h1 id="go语言批量处理文件" tabindex="-1"><a class="header-anchor" href="#go语言批量处理文件" aria-hidden="true">#</a> Go语言批量处理文件</h1>
<p>[toc]</p>
<h2 id="实现基本的批量创建文件和输入模板" tabindex="-1"><a class="header-anchor" href="#实现基本的批量创建文件和输入模板" aria-hidden="true">#</a> 实现基本的批量创建文件和输入模板</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-06-30 18:06:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-15 14:59:25
 * @FilePath: \undefinedd:\文档\git\CS_COURSE\python3\script.go
 * @Description: github - markdown
 */</span>

<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os"</span>
	<span class="token string">"os/exec"</span>
	<span class="token string">"strconv"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"欢迎使用xiongxinwei构建的脚本，"</span> <span class="token operator">+</span> <span class="token string">"一键构建GitHub的文档结构\n"</span> <span class="token operator">+</span> <span class="token string">"关于我：\n"</span> <span class="token operator">+</span>
		<span class="token string">"	+ 博客：http://cubxxw.com\n"</span> <span class="token operator">+</span>
		<span class="token string">"	+ GitHub地址: https://github.com/3293172751"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"请选择是否(yes\\no)创建目录"</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> yes<span class="token punctuation">,</span> fname <span class="token builtin">string</span>
	fmt<span class="token punctuation">.</span><span class="token function">Scanln</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>yes<span class="token punctuation">)</span>
	<span class="token keyword">if</span> yes <span class="token operator">==</span> <span class="token string">"yes"</span> <span class="token punctuation">{</span> <span class="token comment">//输入的是yes 则 创建目录</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"请选择创建目录的名称(输入yes默认markdown文件夹)"</span><span class="token punctuation">)</span>
		<span class="token keyword">var</span> markdown <span class="token builtin">string</span>
		fmt<span class="token punctuation">.</span><span class="token function">Scanln</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>markdown<span class="token punctuation">)</span>
		<span class="token keyword">if</span> markdown <span class="token operator">!=</span> <span class="token string">"yes"</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Scanln</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>fname<span class="token punctuation">)</span> <span class="token comment">//输入文件夹名称</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token comment">//选择默认markdown格式</span>
			fname <span class="token operator">=</span> <span class="token string">"markdown"</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Mkdir</span><span class="token punctuation">(</span>fname<span class="token punctuation">,</span> <span class="token number">0666</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"err = "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"你选择了使用原来的目录,您当前的目录文件有："</span><span class="token punctuation">)</span>
		cmd <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"ls"</span><span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>cmd<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"请选择你要构建GitHub项目的目录"</span><span class="token punctuation">)</span>
		<span class="token keyword">var</span> text <span class="token builtin">int</span>
		fmt<span class="token punctuation">.</span><span class="token function">Scanln</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>text<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// str := "markdown" //目录</span>

	<span class="token comment">// // MkdirAll 递归创建目录</span>
	<span class="token comment">// if err := os.Mkdir(str, 0666); err != nil {</span>
	<span class="token comment">// 	fmt.Println("err=", err)</span>
	<span class="token comment">// }</span>
	<span class="token keyword">var</span> a<span class="token punctuation">,</span> n <span class="token builtin">int</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"输入文件开始的编号"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Scanln</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"请输入你要构建markdown的文件个数:"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Scanln</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>n<span class="token punctuation">)</span>

	<span class="token keyword">var</span> st <span class="token builtin">string</span> <span class="token comment">//要说的话</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"请输入项目介绍"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Scanln</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>st<span class="token punctuation">)</span>

	<span class="token keyword">var</span> xm <span class="token builtin">string</span> <span class="token comment">//项目地址</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"请输入项目的地址"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Scanln</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>xm<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>

		a1 <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
		a2 <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		a3 <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		filePath <span class="token operator">:=</span> fname <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> a1 <span class="token operator">+</span> <span class="token string">".md"</span>
		file<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span>filePath<span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_WRONLY<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token punctuation">,</span> <span class="token number">0666</span><span class="token punctuation">)</span>
		<span class="token comment">//在原来的基础上追加666表示访问权限</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"文件打开失败"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//及时关闭file句柄</span>
		<span class="token keyword">defer</span> file<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">//写入文件时，使用带缓存的 *Writer</span>
		write <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewWriter</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"+ [author]("</span> <span class="token operator">+</span> xm <span class="token operator">+</span> <span class="token string">")\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"# 第"</span> <span class="token operator">+</span> a1 <span class="token operator">+</span> <span class="token string">"节\n"</span><span class="token punctuation">)</span>

		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">)</span>
		<span class="token comment">//批量加入文件，</span>

		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"&lt;div>&lt;a href = '"</span> <span class="token operator">+</span> a3 <span class="token operator">+</span> <span class="token string">".md"</span> <span class="token operator">+</span> <span class="token string">"' style='float:left'>⬆️上一节🔗&lt;/a>&lt;a href = '"</span> <span class="token operator">+</span> a2 <span class="token operator">+</span> <span class="token string">".md"</span> <span class="token operator">+</span> <span class="token string">"' style='float: right'>⬇️下一节🔗&lt;/a>&lt;/div>\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"&lt;br>\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"> ❤️💕💕"</span> <span class="token operator">+</span> st <span class="token operator">+</span> <span class="token string">"Myblog:[http://cubxxw.com](http://cubxxw.com/)\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"---\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"[TOC]\n"</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"## END 链接\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"&lt;ul>&lt;li>&lt;div>&lt;a href = '"</span> <span class="token operator">+</span> a3 <span class="token operator">+</span> <span class="token string">".md"</span> <span class="token operator">+</span> <span class="token string">"' style='float:left'>⬆️上一节🔗&lt;/a>&lt;a href = '"</span> <span class="token operator">+</span> a2 <span class="token operator">+</span> <span class="token string">".md"</span> <span class="token operator">+</span> <span class="token string">"' style='float: right'>⬇️下一节🔗&lt;/a>&lt;/div>&lt;/li>&lt;/ul>\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"+ [Ⓜ️回到目录🏠](../README.md)\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"+ [**🫵参与贡献💞❤️‍🔥💖**](https://cubxxw.com/archives/contributors))\n"</span><span class="token punctuation">)</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">)</span>
		<span class="token comment">// 版权声明</span>
		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"+ ✴️版权声明 &amp;copy; :本书所有内容遵循[CC-BY-SA 3.0协议（署名-相同方式共享）&amp;copy;](http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0协议文本) \n"</span><span class="token punctuation">)</span>

		write<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">)</span>
		<span class="token comment">//Flush将缓存的文件真正写入到文件中</span>
		write<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		a <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token number">1</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


