<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第15节-cobra" tabindex="-1"><a class="header-anchor" href="#第15节-cobra" aria-hidden="true">#</a> 第15节 Cobra</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/14.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="cobra-简介" tabindex="-1"><a class="header-anchor" href="#cobra-简介" aria-hidden="true">#</a> cobra 简介</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ul>
<li>cobra 是一个用于生成命令行工具的框架 （本身也是一个命令行工具）</li>
<li>非常简单，易用</li>
<li>使用它的项目很多 （kubernetes、etcd、hugo、docker……)</li>
</ul>
<p><strong>开源地址：https://github.com/spf13/cobra</strong></p>
</div>
<h2 id="cobra-安装" tabindex="-1"><a class="header-anchor" href="#cobra-安装" aria-hidden="true">#</a> Cobra 安装</h2>
<ul>
<li><code v-pre>-u</code> ：update</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go get -u github.com/spf13/cobra@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="项目中导入" tabindex="-1"><a class="header-anchor" href="#项目中导入" aria-hidden="true">#</a> 项目中导入</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">import</span> <span class="token string">"github.com/spf13/cobra"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="cobra-cli" tabindex="-1"><a class="header-anchor" href="#cobra-cli" aria-hidden="true">#</a> cobra-cli</h2>
<p><code v-pre>cobra-cli</code>是一个命令行程序，用于生成 Cobra 应用程序和命令文件。它将引导您的应用程序脚手架以快速开发基于 Cobra 的应用程序。这是将 Cobra 合并到您的应用程序中的最简单方法。</p>
<p>它可以通过运行来安装：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">go</span> install github<span class="token punctuation">.</span>com<span class="token operator">/</span>spf13<span class="token operator">/</span>cobra<span class="token operator">-</span>cli@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="cobra-项目创建" tabindex="-1"><a class="header-anchor" href="#cobra-项目创建" aria-hidden="true">#</a> cobra 项目创建</h2>
<p>建议使用Go Module 模式，首先，创建一个Go Module项目，名称采用 <code v-pre>clid</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>mkdir clid<span class="token punctuation">;</span> cd clid 
<span class="token keyword">go</span> mod init clid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>一般使用上面的方法有点麻烦，那么可以帮助你生成开源协议和一些东西：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cobra init clid  <span class="token parameter variable">-a</span> xiongxinwei <span class="token parameter variable">-l</span> MIT 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">📜 对上面的解释</p>
<ul>
<li>默认使用的  <a href="https://github.com/c-ub/cub/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">Apache License 2.0 <ExternalLinkIcon/></a>© 协议</li>
<li>可以指定作者 <code v-pre>-a</code></li>
<li>可以指定协议 <code v-pre>-l</code>  (MIT / Apache)</li>
</ul>
</div>
<h2 id="编译" tabindex="-1"><a class="header-anchor" href="#编译" aria-hidden="true">#</a> 编译</h2>
<p>我们创建完之后是可以直接用 <code v-pre>go build</code> 编译项目的：</p>
<details class="custom-container details"><summary>编译信息展开</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:clid<span class="token operator">></span> go build
PS D:clid<span class="token operator">></span> <span class="token function">ls</span>

    Directory: D:clid

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----          <span class="token number">2022</span>/11/15     <span class="token number">9</span>:32                cmd
-a---          <span class="token number">2022</span>/11/15     <span class="token number">9</span>:49        <span class="token number">4336640</span> clid.exe
-a---          <span class="token number">2022</span>/11/15     <span class="token number">9</span>:04            <span class="token number">177</span> go.mod
-a---          <span class="token number">2022</span>/11/15     <span class="token number">9</span>:04            <span class="token number">896</span> go.sum
-a---          <span class="token number">2022</span>/11/15     <span class="token number">9</span>:32          <span class="token number">11358</span> LICENSE
-a---          <span class="token number">2022</span>/11/15     <span class="token number">9</span>:49            <span class="token number">622</span> main.go

PS D:clid<span class="token operator">></span> .<span class="token punctuation">\</span>clid.exe
A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library <span class="token keyword">for</span> Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="main-go" tabindex="-1"><a class="header-anchor" href="#main-go" aria-hidden="true">#</a> main.go</h3>
<p>我们观察<code v-pre>main.go</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
Copyright © 2022 xiongxinwei

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"go-advancend-code/cobra/cmd"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cmd<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>很简单的一个函数，就只有 <code v-pre>cmd.Execute()</code></p>
<p><code v-pre>Execute</code>将所有子命令添加到根命令并适当设置标志。它由<code v-pre>main.main()</code>调用。它只需要在<code v-pre>rootCmd</code>上发生一次。</p>
</blockquote>
<p><em>那么我们可以去看 <code v-pre>root.go</code>文件了</em></p>
<h3 id="root-go" tabindex="-1"><a class="header-anchor" href="#root-go" aria-hidden="true">#</a> root.go</h3>
<p><strong><code v-pre>cmd/root.go</code> 目录：</strong></p>
<p>这个目录是会影响到项目的协议的~</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
Copyright © 2022 xiongxinwei

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/</span>
<span class="token keyword">package</span> cmd

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"os"</span>

	<span class="token string">"github.com/spf13/cobra"</span>
<span class="token punctuation">)</span>



<span class="token comment">// rootCmd represents the base command when called without any subcommands</span>
<span class="token keyword">var</span> rootCmd <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
	Use<span class="token punctuation">:</span>   <span class="token string">"cobra"</span><span class="token punctuation">,</span>
	Short<span class="token punctuation">:</span> <span class="token string">"A brief description of your application"</span><span class="token punctuation">,</span>
	Long<span class="token punctuation">:</span> 
    <span class="token string">`A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`</span><span class="token punctuation">,</span>
	<span class="token comment">// Uncomment the following line if your bare application</span>
	<span class="token comment">// has an action associated with it:</span>
	<span class="token comment">// Run: func(cmd *cobra.Command, args []string) { },</span>
<span class="token punctuation">}</span>

<span class="token comment">// Execute adds all child commands to the root command and sets flags appropriately.</span>
<span class="token comment">// This is called by main.main(). It only needs to happen once to the rootCmd.</span>
<span class="token keyword">func</span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	err <span class="token operator">:=</span> rootCmd<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// Here you will define your flags and configuration settings.</span>
	<span class="token comment">// Cobra supports persistent flags, which, if defined here,</span>
	<span class="token comment">// will be global for your application.</span>

	<span class="token comment">// rootCmd.PersistentFlags().StringVar(&amp;cfgFile, "config", "", "config file (default is $HOME/.cobra.yaml)")</span>

	<span class="token comment">// Cobra also supports local flags, which will only run</span>
	<span class="token comment">// when this action is called directly.</span>
	rootCmd<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BoolP</span><span class="token punctuation">(</span><span class="token string">"toggle"</span><span class="token punctuation">,</span> <span class="token string">"t"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">"Help message for toggle"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>我们可以看到上面有 <code v-pre>run</code> 、<code v-pre>short</code>、<code v-pre>Long</code></p>
<p>是的，我们可以修改这些信息来调整输出信息</p>
</div>
<p>修改 <code v-pre>long</code> ：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> rootCmd <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
	Use<span class="token punctuation">:</span>   <span class="token string">"cobra"</span><span class="token punctuation">,</span>
	Short<span class="token punctuation">:</span> <span class="token string">"A brief description of your application"</span><span class="token punctuation">,</span>
	Long<span class="token punctuation">:</span>  <span class="token string">`一个帮助信息`</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:clid<span class="token operator">></span> go run .<span class="token punctuation">\</span>main.go
一个帮助信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="为命令加上一个子命令" tabindex="-1"><a class="header-anchor" href="#为命令加上一个子命令" aria-hidden="true">#</a> 为命令加上一个子命令</h2>
<p><strong>添加一个名叫 <code v-pre>test</code> 的子命令</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cobra add test -a xiongxinwei -l MIT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>效果</strong> 可以看出来 <code v-pre>cmd</code>目录下多了一个 <code v-pre>test.go</code> ：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:clid<span class="token operator">></span> <span class="token builtin class-name">pwd</span>

Path
----
D:clid

PS D:clid<span class="token operator">></span> <span class="token function">ls</span> cmd

    Directory: D:clid<span class="token punctuation">\</span>cmd

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          <span class="token number">2022</span>/11/15     <span class="token number">9</span>:52           <span class="token number">1973</span> root.go

PS D:clid<span class="token operator">></span> cobra <span class="token function">add</span> <span class="token builtin class-name">test</span>
<span class="token builtin class-name">test</span> created at D:clid
PS D:clid<span class="token operator">></span> <span class="token function">ls</span> cmd       

    Directory: D:clid<span class="token punctuation">\</span>cmd

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          <span class="token number">2022</span>/11/15     <span class="token number">9</span>:52           <span class="token number">1973</span> root.go
-a---          <span class="token number">2022</span>/11/15     <span class="token number">9</span>:58           <span class="token number">1064</span> test.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修改基本信息运行：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// testCmd represents the test command</span>
<span class="token keyword">var</span> testCmd <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
	Use<span class="token punctuation">:</span>   <span class="token string">"测试use"</span><span class="token punctuation">,</span>
	Short<span class="token punctuation">:</span> <span class="token string">"测试short"</span><span class="token punctuation">,</span>
	Long<span class="token punctuation">:</span>  <span class="token string">`测试long信息`</span><span class="token punctuation">,</span>
	Run<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"测试run"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:clid<span class="token operator">></span> go run .<span class="token punctuation">\</span>main.go
一个帮助信息

Usage:
  cobra <span class="token punctuation">[</span>command<span class="token punctuation">]</span>

Available Commands:
  completion  Generate the autocompletion script <span class="token keyword">for</span> the specified shell
  <span class="token builtin class-name">help</span>        Help about any <span class="token builtin class-name">command</span>
  测试use       测试short

Flags:
  -h, <span class="token parameter variable">--help</span>     <span class="token builtin class-name">help</span> <span class="token keyword">for</span> cobra
  -t, <span class="token parameter variable">--toggle</span>   Help message <span class="token keyword">for</span> toggle

Use <span class="token string">"cobra [command] --help"</span> <span class="token keyword">for</span> <span class="token function">more</span> information about a command.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尝试：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>.<span class="token punctuation">\</span>clid.exe 测试use
测试run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>再一次尝试：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:clid<span class="token operator">></span> .<span class="token punctuation">\</span>clid.exe 测试use <span class="token parameter variable">-h</span>
测试long信息

Usage:
  cobra 测试use <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>

Flags:
  -h, <span class="token parameter variable">--help</span>   <span class="token builtin class-name">help</span> <span class="token keyword">for</span> 测试use
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">so</p>
<p>所以我们突然明白了，原来这个命令主要是基于 主命令 <code v-pre>root.go</code> 下面的，<code v-pre>root.go</code> 就是 <code v-pre>cobra</code></p>
<p>我们就可以基于此设置一系列子命令</p>
</div>
<h3 id="绑定父命令" tabindex="-1"><a class="header-anchor" href="#绑定父命令" aria-hidden="true">#</a> 绑定父命令</h3>
<p>每个子命令都有一个 <code v-pre>init</code> 函数，就是用来绑定的~</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	rootCmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>testCmd<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建一个 <code v-pre>version</code> 命令</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cobra add version -a xiongxinwei -l MIT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>修改：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
Copyright © 2022 xiongxinwei

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/</span>
<span class="token keyword">package</span> cmd

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>

	<span class="token string">"github.com/spf13/cobra"</span>
<span class="token punctuation">)</span>

<span class="token comment">// versionCmd represents the version command</span>
<span class="token keyword">var</span> versionCmd <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
	Use<span class="token punctuation">:</span>   <span class="token string">"version"</span><span class="token punctuation">,</span>
	Short<span class="token punctuation">:</span> <span class="token string">"A brief description of your command"</span><span class="token punctuation">,</span>
	Long<span class="token punctuation">:</span> <span class="token string">`A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`</span><span class="token punctuation">,</span>
	Run<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"version called"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// rootCmd.AddCommand(versionCmd)</span>

	testCmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>versionCmd<span class="token punctuation">)</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>PS D<span class="token punctuation">:</span>clid<span class="token operator">></span> <span class="token keyword">go</span> build               
PS D<span class="token punctuation">:</span>clid<span class="token operator">></span> <span class="token punctuation">.</span>\clid<span class="token punctuation">.</span>exe test  
测试run
PS D<span class="token punctuation">:</span>clid<span class="token operator">></span> <span class="token punctuation">.</span>\clid<span class="token punctuation">.</span>exe version
Error<span class="token punctuation">:</span> unknown command <span class="token string">"version"</span> <span class="token keyword">for</span> <span class="token string">"cobra"</span>
Run 'cobra <span class="token operator">--</span>help' <span class="token keyword">for</span> usage<span class="token punctuation">.</span>
PS D<span class="token punctuation">:</span>clid<span class="token operator">></span> <span class="token punctuation">.</span>\clid<span class="token punctuation">.</span>exe test version
version called
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>可以看到绑定到 <code v-pre>test</code> 上面了，当然你可以取消注释，同时绑定两个~</strong></p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token function">PS</span> D:\文档\最近的\awesome-golang\docs\go-advancend\code\cobra\clid> <span class="token punctuation">.</span>\clid<span class="token punctuation">.</span>exe test version
version called
<span class="token function">PS</span> D:\文档\最近的\awesome-golang\docs\go-advancend\code\cobra\clid> <span class="token punctuation">.</span>\clid<span class="token punctuation">.</span>exe version
version called
<span class="token function">PS</span> D:\文档\最近的\awesome-golang\docs\go-advancend\code\cobra\clid> <span class="token punctuation">.</span>\clid<span class="token punctuation">.</span>exe test
测试run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h2 id="为命令添加选项" tabindex="-1"><a class="header-anchor" href="#为命令添加选项" aria-hidden="true">#</a> 为命令添加选项</h2>
<p>这个我们就需要去 <code v-pre>init()</code> 函数中添加方法了：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
Copyright © 2022 xiongxinwei

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/</span>
<span class="token keyword">package</span> cmd

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>

	<span class="token string">"github.com/spf13/cobra"</span>
<span class="token punctuation">)</span>

<span class="token comment">// versionCmd represents the version command</span>
<span class="token keyword">var</span> versionCmd <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
	Use<span class="token punctuation">:</span>   <span class="token string">"version"</span><span class="token punctuation">,</span>
	Short<span class="token punctuation">:</span> <span class="token string">"关于版本信息短描述"</span><span class="token punctuation">,</span>
	Long<span class="token punctuation">:</span>  <span class="token string">`关于版本信息长描述`</span><span class="token punctuation">,</span>
	Run<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"version called"</span><span class="token punctuation">)</span>
		author<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token string">"author"</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"作者是："</span><span class="token punctuation">,</span> author<span class="token punctuation">)</span>

	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	rootCmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>versionCmd<span class="token punctuation">)</span>

	testCmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>versionCmd<span class="token punctuation">)</span>

	<span class="token comment">// 添加参数</span>
	versionCmd<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">StringP</span><span class="token punctuation">(</span><span class="token string">"author"</span><span class="token punctuation">,</span> <span class="token string">"n"</span><span class="token punctuation">,</span> <span class="token string">"default"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">)</span> <span class="token comment">//名称，简写，默认值，描述</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>go-advancend<span class="token punctuation">\</span>code<span class="token punctuation">\</span>cobra<span class="token punctuation">\</span>clid<span class="token operator">></span> go build
PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>go-advancend<span class="token punctuation">\</span>code<span class="token punctuation">\</span>cobra<span class="token punctuation">\</span>clid<span class="token operator">></span> .<span class="token punctuation">\</span>clid.exe version <span class="token parameter variable">-help</span>
Error: unknown shorthand flag: <span class="token string">'e'</span> <span class="token keyword">in</span> <span class="token parameter variable">-elp</span>
Usage:
  cobra <span class="token builtin class-name">test</span> version <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>

Flags:
  -n, <span class="token parameter variable">--author</span> string   name <span class="token punctuation">(</span>default <span class="token string">"default"</span><span class="token punctuation">)</span>
  -h, <span class="token parameter variable">--help</span>            <span class="token builtin class-name">help</span> <span class="token keyword">for</span> version

PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>go-advancend<span class="token punctuation">\</span>code<span class="token punctuation">\</span>cobra<span class="token punctuation">\</span>clid<span class="token operator">></span> .<span class="token punctuation">\</span>clid.exe version
version called
作者是： default
PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>go-advancend<span class="token punctuation">\</span>code<span class="token punctuation">\</span>cobra<span class="token punctuation">\</span>clid<span class="token operator">></span> .<span class="token punctuation">\</span>clid.exe <span class="token builtin class-name">test</span> version
version called
作者是： default
PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>go-advancend<span class="token punctuation">\</span>code<span class="token punctuation">\</span>cobra<span class="token punctuation">\</span>clid<span class="token operator">></span> .<span class="token punctuation">\</span>clid.exe <span class="token builtin class-name">test</span> <span class="token parameter variable">-h</span>     
测试long信息

Usage:
  cobra <span class="token builtin class-name">test</span> <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>
  cobra <span class="token builtin class-name">test</span> <span class="token punctuation">[</span>command<span class="token punctuation">]</span>

Available Commands:
  version     关于版本信息短描述

Flags:
  -h, <span class="token parameter variable">--help</span>   <span class="token builtin class-name">help</span> <span class="token keyword">for</span> <span class="token builtin class-name">test</span>

Use <span class="token string">"cobra test [command] --help"</span> <span class="token keyword">for</span> <span class="token function">more</span> information about a command.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>指定参数：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS D:\文档\最近的\awesome-golang\docs\go-advancend\code\cobra\clid> .\clid.exe  version -n 王艺桦     
version called
作者是： 王艺桦
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="补充-run参数的匿名函数" tabindex="-1"><a class="header-anchor" href="#补充-run参数的匿名函数" aria-hidden="true">#</a> 补充 run参数的匿名函数</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// versionCmd represents the version command</span>
<span class="token keyword">var</span> versionCmd <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
	Use<span class="token punctuation">:</span>   <span class="token string">"version"</span><span class="token punctuation">,</span>
	Short<span class="token punctuation">:</span> <span class="token string">"关于版本信息短描述"</span><span class="token punctuation">,</span>
	Long<span class="token punctuation">:</span>  <span class="token string">`关于版本信息长描述`</span><span class="token punctuation">,</span>
	Run<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"version called"</span><span class="token punctuation">)</span>
		author<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token string">"author"</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"作者是："</span><span class="token punctuation">,</span> author<span class="token punctuation">)</span>

	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>cmd</code> 是一个指针，可以通过<code v-pre>cmd</code>来获取参数</li>
<li><code v-pre>args</code> 是一个数组，可以通过<code v-pre>args</code>来获取参数</li>
</ul>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
Copyright © 2022 xiongxinwei

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/</span>
<span class="token keyword">package</span> cmd

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"strconv"</span>

	<span class="token string">"github.com/spf13/cobra"</span>
<span class="token punctuation">)</span>

<span class="token comment">// versionCmd represents the version command</span>
<span class="token keyword">var</span> versionCmd <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
	Use<span class="token punctuation">:</span>   <span class="token string">"version"</span><span class="token punctuation">,</span>
	Short<span class="token punctuation">:</span> <span class="token string">"关于版本信息短描述"</span><span class="token punctuation">,</span>
	Long<span class="token punctuation">:</span>  <span class="token string">`关于版本信息长描述`</span><span class="token punctuation">,</span>
	Run<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"version called"</span><span class="token punctuation">)</span>
		author<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token string">"author"</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"作者是："</span><span class="token punctuation">,</span> author<span class="token punctuation">)</span>

		<span class="token keyword">var</span> x <span class="token builtin">int</span>
		<span class="token comment">//string 转换为 int</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> args <span class="token punctuation">{</span>
			tmp<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
			x <span class="token operator">+=</span> tmp
		<span class="token punctuation">}</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"x is "</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	rootCmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>versionCmd<span class="token punctuation">)</span>

	testCmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>versionCmd<span class="token punctuation">)</span>

	<span class="token comment">// 添加参数</span>
	versionCmd<span class="token punctuation">.</span><span class="token function">Flags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">StringP</span><span class="token punctuation">(</span><span class="token string">"author"</span><span class="token punctuation">,</span> <span class="token string">"n"</span><span class="token punctuation">,</span> <span class="token string">"default"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">)</span> <span class="token comment">//名称，简写，默认值，描述</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>go-advancend<span class="token punctuation">\</span>code<span class="token punctuation">\</span>cobra<span class="token punctuation">\</span>clid<span class="token operator">></span> .<span class="token punctuation">\</span>clid.exe version <span class="token parameter variable">-n</span> 老王 <span class="token number">123</span> <span class="token number">12</span> <span class="token number">412</span> <span class="token number">543</span> <span class="token number">12</span>
version called
作者是： 老王
x is  <span class="token number">1102</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/14.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/16.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


