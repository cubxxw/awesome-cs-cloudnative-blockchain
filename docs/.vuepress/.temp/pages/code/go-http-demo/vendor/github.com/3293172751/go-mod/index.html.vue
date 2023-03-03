<template><div><h1 id="go-mod包-多模块工作区-workspaces" tabindex="-1"><a class="header-anchor" href="#go-mod包-多模块工作区-workspaces" aria-hidden="true">#</a> Go-mod包 &amp; 多模块工作区（Workspaces）</h1>
<p>[toc]</p>
<h2 id="⚡-go-mod" tabindex="-1"><a class="header-anchor" href="#⚡-go-mod" aria-hidden="true">#</a> ⚡ go mod</h2>
<h3 id="包的导入方式" tabindex="-1"><a class="header-anchor" href="#包的导入方式" aria-hidden="true">#</a> 包的导入方式</h3>
<ol>
<li>
<p>绝对路径导入（在GOPATH目录中导入包）</p>
</li>
<li>
<p>相对路径导入（不建议！！！）</p>
</li>
<li>
<p>点导入</p>
<ul>
<li>
<p>相当于直接复制源文件过来，此时不需要用.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Println("hello word")
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>别名导入</p>
</li>
<li>
<p>下划线导入</p>
</li>
</ol>
<h3 id="go-mod方式管理包" tabindex="-1"><a class="header-anchor" href="#go-mod方式管理包" aria-hidden="true">#</a> Go-mod方式管理包</h3>
<h4 id="优势" tabindex="-1"><a class="header-anchor" href="#优势" aria-hidden="true">#</a> 优势：</h4>
<ul>
<li><strong>代码可以放在任意位置，不用设置GOPATH</strong></li>
<li><strong>自动下载依赖管理</strong></li>
<li><strong>版本控制</strong></li>
<li><strong>不允许使用相对导入</strong></li>
<li><strong>replace机制（goproxy代理机制）</strong></li>
</ul>
<h3 id="项目开始" tabindex="-1"><a class="header-anchor" href="#项目开始" aria-hidden="true">#</a> 项目开始~</h3>
<blockquote>
<p>为了理清关系，这一节从头开始做</p>
</blockquote>
<p><strong>目录结构</strong></p>
<p><img src="https://s2.loli.net/2022/05/25/eKIV2UnTLjcWRJC.png" alt="image-20220525220447501"></p>
<p><strong>我们的项目就叫go-mod</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mkdir go-mod
cd go-mod
mkdir hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为代码启用依赖项跟踪" tabindex="-1"><a class="header-anchor" href="#为代码启用依赖项跟踪" aria-hidden="true">#</a> 为代码启用依赖项跟踪</h3>
<p><strong>需要设置名字，一般和报名是一样的</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\区块链\code\go-mod> go mod init go-mod
go: creating new go.mod: module go-mod
go: to add module requirements and sums:
        go mod tidy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看模块</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>module go-mod

go 1.18
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编辑hello.go</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>package main

import "fmt"

func main() {
	fmt.Println("hello word")
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\区块链\code\go-mod\hello> go run . 
hello word
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>目录结构</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token punctuation">\</span>Desktop<span class="token punctuation">\</span>区块链<span class="token punctuation">\</span>code<span class="token punctuation">\</span>go-mod<span class="token operator">></span> tree
卷 系统 的文件夹 <span class="token environment constant">PATH</span> 列表
卷序列号为 DE95-1D97
C:.
├─hello
└─main

PS C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token punctuation">\</span>Desktop<span class="token punctuation">\</span>区块链<span class="token punctuation">\</span>code<span class="token punctuation">\</span>go-mod<span class="token operator">></span> <span class="token builtin class-name">cd</span> .<span class="token punctuation">\</span>main<span class="token punctuation">\</span>
PS C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token punctuation">\</span>Desktop<span class="token punctuation">\</span>区块链<span class="token punctuation">\</span>code<span class="token punctuation">\</span>go-mod<span class="token punctuation">\</span>main<span class="token operator">></span> New-Item main.go            

    目录: C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token punctuation">\</span>Desktop<span class="token punctuation">\</span>区块链<span class="token punctuation">\</span>code<span class="token punctuation">\</span>go-mod<span class="token punctuation">\</span>main

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         <span class="token number">2022</span>/5/25     <span class="token number">21</span>:32              <span class="token number">0</span> main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建一个包文件夹,创建一个文件task.go</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\区块链\code\go-mod> mkdir models


    目录: C:\Users\smile\Desktop\区块链\code\go-mod


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         2022/5/25     22:00                models

PS C:\Users\smile\Desktop\区块链\code\go-mod> New-Item task.go

    目录: C:\Users\smile\Desktop\区块链\code\go-mod

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         2022/5/25     22:02              0 task.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>主函数</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>package main

import (
	. "fmt"
	"go-mod/hello"
	"go-mod/models"
)

func main() {
	Println("main主函数")
	hello.Hello()
	Println(models.Name)
	//hello.Hello()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\区块链\code\go-mod> go run .\main.go
main主函数
hello word
test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="所出现问题" tabindex="-1"><a class="header-anchor" href="#所出现问题" aria-hidden="true">#</a> 所出现问题</h3>
<p>文件mod包嵌入使用的问题，导致mod机制没办法正常在子目录使用~</p>
<h3 id="github导入包" tabindex="-1"><a class="header-anchor" href="#github导入包" aria-hidden="true">#</a> github导入包</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> models

<span class="token keyword">import</span> <span class="token string">"fmt"</span>
<span class="token keyword">import</span> <span class="token string">"github.com/astaxie/beego"</span>

<span class="token keyword">var</span> Name <span class="token operator">=</span> <span class="token string">"test"</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"最先开始调用多个"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	beego<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>回到主目录</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS C:\Users\smile\Desktop\区块链\code\go-mod>  go get github.com/astaxie/beego
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>下载依赖，查看go-mod</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>module go-mod

go 1.18

require (
	github.com/astaxie/beego v1.12.3 // indirect
	github.com/beorn7/perks v1.0.1 // indirect
	github.com/cespare/xxhash/v2 v2.1.1 // indirect
	github.com/golang/protobuf v1.4.2 // indirect
	github.com/hashicorp/golang-lru v0.5.4 // indirect
	github.com/matttproud/golang_protobuf_extensions v1.0.1 // indirect
	github.com/prometheus/client_golang v1.7.0 // indirect
	github.com/prometheus/client_model v0.2.0 // indirect
	github.com/prometheus/common v0.10.0 // indirect
	github.com/prometheus/procfs v0.1.3 // indirect
	github.com/shiena/ansicolor v0.0.0-20151119151921-a422bbe96644 // indirect
	golang.org/x/crypto v0.0.0-20191011191535-87dc89f01550 // indirect
	golang.org/x/net v0.0.0-20190620200207-3b0461eec859 // indirect
	golang.org/x/sys v0.0.0-20200615200032-f1bc736245b1 // indirect
	golang.org/x/text v0.3.0 // indirect
	google.golang.org/protobuf v1.23.0 // indirect
	gopkg.in/yaml.v2 v2.2.8 // indirect
)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>还有一个go sum文件</strong></p>
<h3 id="远程推送到github上" tabindex="-1"><a class="header-anchor" href="#远程推送到github上" aria-hidden="true">#</a> 远程推送到github上</h3>
<ol>
<li>在github上新建一个项目Go-mod</li>
<li><code v-pre>go mod init github.com/3293172751/go-mod</code></li>
<li>添加readme.m</li>
</ol>
<h2 id="⚡-go-workspace" tabindex="-1"><a class="header-anchor" href="#⚡-go-workspace" aria-hidden="true">#</a> ⚡ go workspace</h2>
<h2 id="why-you-need-it" tabindex="-1"><a class="header-anchor" href="#why-you-need-it" aria-hidden="true">#</a> Why you need it？</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>在参与sealos工程的时候，它们用到了Go语言新特性：Workspaces</p>
<ul>
<li><a href="https://github.com/labring/sealos/blob/main/DEVELOPGUIDE.md" target="_blank" rel="noopener noreferrer">https://github.com/labring/sealos/blob/main/DEVELOPGUIDE.md<ExternalLinkIcon/></a></li>
</ul>
<p>由于sealos使用的是go1.18的workspace特性，添加新模块后，需要<code v-pre>go work usr -r .</code>在root目录下运行更新同步的workspace。</p>
<p>我们这篇来学习和使用这个新特性</p>
</div>
<p>Go 多模块工作区能够使开发者能够更容易地同时处理多个模块的工作，如:</p>
<blockquote>
<p>方便进行依赖的代码调试(打断点、修改代码)、排查依赖代码 bug
方便同时进行多个仓库/模块并行开发调试</p>
</blockquote>
<h2 id="简单上手" tabindex="-1"><a class="header-anchor" href="#简单上手" aria-hidden="true">#</a> 简单上手</h2>
<p>当前目录结构</p>
<p><img src="http://sm.nsddd.top/smimage-20221120151919161.png" alt="image-20221120151919161"></p>
<h3 id="文件内容" tabindex="-1"><a class="header-anchor" href="#文件内容" aria-hidden="true">#</a> 文件内容</h3>
<p><strong>mod包内容：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>module nsddd<span class="token punctuation">.</span>top<span class="token operator">/</span>mszlu<span class="token operator">-</span>common

<span class="token keyword">go</span> <span class="token number">1.19</span>

<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>

module nsddd<span class="token punctuation">.</span>top<span class="token operator">/</span>fly<span class="token operator">-</span>fish

<span class="token keyword">go</span> <span class="token number">1.19</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对应文件：</strong></p>
<p><code v-pre>mszlu-common/utils.go</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> utils

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"这是utils.go"</span><span class="token punctuation">)</span>

	<span class="token comment">//调用fly-fish的main.go</span>
 
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>fly-fish/main.go</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"这是fly-fish的main.go"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如何调用" tabindex="-1"><a class="header-anchor" href="#如何调用" aria-hidden="true">#</a> 如何调用</h3>
<p>我们希望调用另一个 mod 模块的函数，我们使用work</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go work init ./fly-fish
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>使用<code v-pre>fly-fish</code></strong></p>
<p>我们再加入一个工作区：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go work use ./mszlu-common
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>此时工作目录文件：<code v-pre>go.work</code></strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">go</span> <span class="token number">1.19</span>

use <span class="token punctuation">(</span>
	<span class="token punctuation">.</span><span class="token operator">/</span>fly<span class="token operator">-</span>fish
	<span class="token punctuation">.</span><span class="token operator">/</span>mszlu<span class="token operator">-</span>common
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="调用-utils" tabindex="-1"><a class="header-anchor" href="#调用-utils" aria-hidden="true">#</a> 调用 utils</h3>
<p><code v-pre>fly-fish/main.go</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>

	utils <span class="token string">"nsddd.top/mszlu-common"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"这是fly-fish的main.go"</span><span class="token punctuation">)</span>
	utils<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Running<span class="token punctuation">]</span> go run <span class="token string">"c:\Users\smile\Desktop<span class="token entity" title="\t">\t</span>est<span class="token entity" title="\f">\f</span>ly-fish\main.go"</span>
这是fly-fish的main.go
这是utils.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="go-work-支持命令" tabindex="-1"><a class="header-anchor" href="#go-work-支持命令" aria-hidden="true">#</a> <code v-pre>go work</code> 支持命令</h2>
<ul>
<li>通常情况下，建议不要提交 <strong>go.work</strong> 文件到 git 上，因为它主要用于本地代码开发。</li>
<li>推荐在: <code v-pre>$GOPATH</code> 路径下执行，生成 <strong>go.work</strong> 文件</li>
<li><code v-pre>go work init</code> 初始化工作区文件，用于生成 <strong>go.work</strong> 工作区文件</li>
</ul>
<blockquote>
<p>初始化并写入一个新的 <strong>go.work</strong> 到当前路径下，可以指定需要添加的代码模块
示例: <code v-pre>go work init ./hello</code> 将本地仓库 <strong>hello</strong> 添加到工作区
<strong>hello</strong> 仓库必须是 go mod 依赖管理的仓库(<strong>./hello/go.mod</strong> 文件必须存在)</p>
</blockquote>
<ul>
<li><code v-pre>go work use</code> 添加新的模块到工作区</li>
</ul>
<blockquote>
<p>命令示例:
<code v-pre>go work use ./example</code> 添加一个模块到工作区
<code v-pre>go work use ./example ./example1</code> 添加多个模块到工作区
<code v-pre>go work use -r ./example</code> 递归 <strong>./example</strong> 目录到当前工作区
删除命令使用 <code v-pre>go work edit -dropuse=./example</code> 功能</p>
</blockquote>
<ul>
<li><code v-pre>go work edit</code> 用于编辑 <strong>go.work</strong> 文件</li>
</ul>
<blockquote>
<p>可以使用 <code v-pre>edit</code> 命令编辑和手动编辑 <code v-pre>go.work</code> 文件效果是相同的 示例:
<code v-pre>go work edit -fmt go.work</code> 重新格式化 <strong>go.work</strong> 文件
<code v-pre>go work edit -replace=github.com/link1st/example=./example go.work</code> 替换代码模块
<code v-pre>go work edit -dropreplace=github.com/link1st/example</code> 删除替换代码模块
<code v-pre>go work edit -use=./example go.work</code> 添加新的模块到工作区
<code v-pre>go work edit -dropuse=./example go.work</code> 从工作区中删除模块</p>
</blockquote>
<ul>
<li><code v-pre>go work sync</code> 将工作区的构建列表同步到工作区的模块</li>
<li><code v-pre>go env GOWORK</code></li>
</ul>
<blockquote>
<p>查看环境变量，查看当前工作区文件路径 可以排查工作区文件是否设置正确，<strong>go.work</strong> 路径找不到可以使用 GOWORK 指定</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>> go env GOWORK
$GOPATH/src/link1st/link1st/workspaces/go.work
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="go-work-文件结构" tabindex="-1"><a class="header-anchor" href="#go-work-文件结构" aria-hidden="true">#</a> <strong>go.work</strong> 文件结构</h3>
<ul>
<li>文件结构和 <strong>go.mod</strong> 文件结构类似，支持 Go 版本号、指定工作区和需要替换的仓库</li>
<li>文件结构示例:</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go 1.18

use (
    ./hello
    ./example
)

replace (
    github.com/link1st/example => ./example1
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="use-指定使用的模块目录" tabindex="-1"><a class="header-anchor" href="#use-指定使用的模块目录" aria-hidden="true">#</a> <code v-pre>use</code> 指定使用的模块目录</h4>
<ul>
<li>可以使用 <code v-pre>go work use hello</code> 添加模块，也可以手动修改 <strong>go.work</strong> 工作区添加新的模块</li>
<li>在工作区中添加了模块路径，编译的时候会自动使用 <strong>use</strong> 中的本地代码进行代码编译，和 <code v-pre>replaces</code> 功能类似。</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 单模块结构
use ./hello

# 多模块结构
use (
    ./hello
    ./example
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="replaces-替换依赖仓库地址" tabindex="-1"><a class="header-anchor" href="#replaces-替换依赖仓库地址" aria-hidden="true">#</a> <code v-pre>replaces</code> 替换依赖仓库地址</h4>
<ul>
<li><code v-pre>replaces</code> 命令与 <strong>go.mod</strong> 指令相同，用于替换项目中依赖的仓库地址</li>
<li>需要注意的是 <code v-pre>replaces</code> 和 <code v-pre>use</code> 不能同时指定相同的本地路径</li>
</ul>
<blockquote>
<p>同时指定报错信息:
go: workspace module github.com/link1st/example is replaced at all versions in the go.work file. To fix, remove the replacement from the go.work file or specify the version at which to replace the module.</p>
</blockquote>
<ul>
<li>错误示例</li>
</ul>
<blockquote>
<p>同时在 <code v-pre>use</code> 和 <code v-pre>replace</code> 指定相同的本地路径</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go 1.18

use (
    ./hello
    ./example
)

replace (
    github.com/link1st/example => ./example
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="go-work-文件优先级高于-go-mod-中定义" tabindex="-1"><a class="header-anchor" href="#go-work-文件优先级高于-go-mod-中定义" aria-hidden="true">#</a> <strong>go.work</strong> 文件优先级高于 <strong>go.mod</strong> 中定义</h4>
<ul>
<li>在同时使用 <strong>go.work</strong> 和 <strong>go.mod</strong> <code v-pre>replace</code> 功能的的时候分别指定不同的代码仓库路径，<strong>go.work</strong> 优先级高于 <strong>go.mod</strong> 中定义</li>
</ul>
<blockquote>
<p><strong>go.mod</strong> 中定义替换为本地仓库 <strong>example</strong></p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>replace (
    github.com/link1st/example => ./example1
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>go.work</strong> 中定义替换为本地仓库 <strong>example1</strong></p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>replace (
    github.com/link1st/example => ./example1
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在代码构建时候使用的是 <strong>go.work</strong> 指定的 <strong>example1</strong> 仓库的代码，<strong>go.work</strong> 优先级别更高</li>
</ul>
<h3 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h3>
<ul>
<li>在 Go 1.18 <code v-pre>go run</code> 和 <code v-pre>go build</code> 都会默认使用工作区功能</li>
<li><code v-pre>GOWORK</code> 也可以指定配置 <strong>go.work</strong> 文件位置</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>export GOWORK="~/go/src/test/go.18/workspace/go.work"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="如何禁用工作区" tabindex="-1"><a class="header-anchor" href="#如何禁用工作区" aria-hidden="true">#</a> 如何禁用工作区</h3>
<ul>
<li>Go 全局变量 <code v-pre>GOWORK</code> 设置 <code v-pre>off</code> 则可以禁用工作区功能</li>
</ul>
<blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>export GOWORK=off
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<h2 id="开发流程演示" tabindex="-1"><a class="header-anchor" href="#开发流程演示" aria-hidden="true">#</a> 开发流程演示</h2>
<ul>
<li>演示如何使用多模块工作区功能。在现在微服务盛行的年代，一个人会维护多个代码仓库，很多的时候是多个仓库进行同时开发</li>
<li>假设我们现在进行 <strong>hello</strong> 仓库开发，实现的功能是，实现将输入的字符串反转并输出，字符串反转功能依赖于 <strong>github.com/link1st/example</strong> (下文统称 <strong>example</strong>)公共仓库实现</li>
<li>新建 <strong>hello</strong> 项目</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mkdir hello
cd hello
# 代码仓库启动 go mod 依赖管理，生成 go.mod 文件
go mod init github.com/link1st/link1st/workspaces/hello
# 下载依赖包
go get github.com/link1st/example
# 编写 main 文件
vim main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>main.go</strong> 代码</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Package main main 文件，go 多模块工作区演示代码
// 实现将输入的字符串反转输出并输出
package main

import (
    "flag"
    "fmt"

    "github.com/link1st/example/stringutil"
)

var (
    str = ""
)

func init() {
    flag.StringVar(&amp;str, "str", str, "输入字符")
    flag.Parse()
}

func main() {
    if str == "" {
        fmt.Println("示例: go run main.go -str hello")
        fmt.Println("str 参数必填")
        flag.Usage()
        return
    }

    // 调用公共仓库，进行字符串反转
    str = stringutil.Reversal(str)
    // 输出反转后的字符串
    fmt.Println(str)
    return
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>运行代码 <code v-pre>go run main.go -str &quot;hello world&quot;</code> 或 <code v-pre>go run github.com/link1st/link1st/workspaces/hello -str &quot;hello world&quot;</code> 可以看到输出了 <strong>hello world</strong> 反转以后的字符串</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>> go run main.go -str "hello world"
dlrow olleh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>到这里，最初的功能已经完成，但是后续需求变动，不仅需要输出反转以后的字符串，还需要将字符串大写</li>
<li>我们则需要去 <strong>example</strong> 仓库中添加开发 <strong>将字符串大写的功能</strong></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 回到工作根目录，将 common 代码下载到本地进行添加新的功能
# 下载依赖的 example 包
git clone git@github.com:link1st/example.git
# 在 example 包中添加 字符串大学的功能
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>vim example/stringutil/to_upper.go</strong> 代码如下</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Package stringutil stringutil
package stringutil

import (
    "unicode"
)

// ToUpper 将字符串进行大写
func ToUpper(s string) string {
    r := []rune(s)
    for i := range r {
        r[i] = unicode.ToUpper(r[i])
    }
    return string(r)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>由于代码还在本地调试，未提交 git 仓库中，这个时候就需要用到 Go 多模块工作区的功能了。</li>
<li>进入项目根目录，初始化我们现在正在开发的模块</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 初始化 go.work 文件
go work init  ./hello ./example
# 查看 go.work 文件内容
cat go.work
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>文件结构如下</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go 1.18

use (
    ./example
    ./hello
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>回到 <strong>hello</strong> 项目，<code v-pre>vim main.go</code> 将字符串大写的功能添加上。</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func main() {
    ...

    // 调用公共仓库，进行字符串反转
    str = stringutil.Reversal(str)
    // 增加字符大写的功能
    str = stringutil.ToUpper(str)
    // 输出反转后的字符串
    fmt.Println(str)
    
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>运行代码</li>
</ul>
<blockquote>
<p>可以看到输出了反转并 <strong>大写</strong> 的字符串，大写的函数功能只在本地，未提交到 git 上，这样我们就实现了可以同时在两个模块上并行开发</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go run main.go -str "hello world"
DLROW OLLEH
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>到这里，演示的代码已经全部完成</li>
</ul>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<ul>
<li>使用 Go 多模块工作区的功能，可以让我们轻松在多个模块之间切换工作，更能适应现代微服务架构开发。</li>
</ul>
<h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>
<p><a href="https://github.com/link1st/link1st/tree/master/workspaces" target="_blank" rel="noopener noreferrer">Go 1.18 新特性多模块工作区教程<ExternalLinkIcon/></a></p>
<p><a href="https://go.dev/blog/go1.18" target="_blank" rel="noopener noreferrer">Go 1.18 is released!<ExternalLinkIcon/></a></p>
<p><a href="https://go.dev/doc/tutorial/workspaces" target="_blank" rel="noopener noreferrer">Tutorial: Getting started with multi-module workspaces<ExternalLinkIcon/></a></p>
</div></template>


