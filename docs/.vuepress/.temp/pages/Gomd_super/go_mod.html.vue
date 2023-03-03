<template><div><h1 id="go-mod包" tabindex="-1"><a class="header-anchor" href="#go-mod包" aria-hidden="true">#</a> Go-mod包</h1>
<p>[toc]</p>
<hr>
<h2 id="go-mod项目地址" tabindex="-1"><a class="header-anchor" href="#go-mod项目地址" aria-hidden="true">#</a> <em><a href="https://github.com/3293172751/go-mod" target="_blank" rel="noopener noreferrer">Go-mod项目地址<ExternalLinkIcon/></a></em></h2>
<p><a href="https://github.com/3293172751/go-mod" target="_blank" rel="noopener noreferrer">https://github.com/3293172751/go-mod<ExternalLinkIcon/></a></p>
<hr>
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
</div></template>


