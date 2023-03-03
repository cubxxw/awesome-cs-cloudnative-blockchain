<template><div><h1 id="go-mod包" tabindex="-1"><a class="header-anchor" href="#go-mod包" aria-hidden="true">#</a> Go mod包</h1>
<p>[toc]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<ul>
<li>
<p>[x] <a href="https://github.com/3293172751/go-mod/" target="_blank" rel="noopener noreferrer">项目地址仓库<ExternalLinkIcon/></a></p>
</li>
<li>
<p><strong>包（package）：是多个Go源码的集合</strong></p>
</li>
<li>
<p>package不局限于一个文件，<strong>可以由多个文件组成。</strong></p>
</li>
<li>
<p>**不要求package的名称和所在目录名相同，**但是你最好保持相同，否则容易引起歧义（规范性）。</p>
</li>
<li>
<p>每个子目录中<strong>只能存在一个package</strong>，否则编译时会报错。</p>
</li>
<li>
<p>package是以<strong>绝对路径GOPATH来寻址</strong>，不要用相对路径来import。</p>
</li>
</ul>
<h2 id="go-mod-init" tabindex="-1"><a class="header-anchor" href="#go-mod-init" aria-hidden="true">#</a> Go mod init</h2>
<blockquote>
<p>Go mod init是一个包管理工具</p>
</blockquote>
<p><strong>子目录无需init,仅需要在==根目录下生成go.mod==</strong></p>
<h2 id="go-module" tabindex="-1"><a class="header-anchor" href="#go-module" aria-hidden="true">#</a> Go module</h2>
<p><strong>阿里云代理go module服务器镜像</strong></p>
<ul>
<li><a href="http://mirrors.aliyun.com/goproxy/" target="_blank" rel="noopener noreferrer">地址<ExternalLinkIcon/></a></li>
</ul>
<h2 id="切换" tabindex="-1"><a class="header-anchor" href="#切换" aria-hidden="true">#</a> 切换</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$env:GOPROXY = "https://mirrors.aliyun.com/goproxy/"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="自己新创建一个项目" tabindex="-1"><a class="header-anchor" href="#自己新创建一个项目" aria-hidden="true">#</a> 自己新创建一个项目</h2>
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
<img src="@source/Gomd_super/images/image-20221003182659317.png" alt="image-20221003182659317" style="zoom:47%;" />
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
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"hello word"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>PS C<span class="token punctuation">:</span>\Users\smile\Desktop\区块链\code\<span class="token keyword">go</span><span class="token operator">-</span>mod\hello<span class="token operator">></span> <span class="token keyword">go</span> run <span class="token punctuation">.</span> 
hello word
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>目录结构</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>PS C<span class="token punctuation">:</span>\Users\smile\Desktop\区块链\code\<span class="token keyword">go</span><span class="token operator">-</span>mod<span class="token operator">></span> tree
卷 系统 的文件夹 PATH 列表
卷序列号为 DE95<span class="token operator">-</span>1D97
C<span class="token punctuation">:</span><span class="token punctuation">.</span>
├─hello
└─main

PS C<span class="token punctuation">:</span>\Users\smile\Desktop\区块链\code\<span class="token keyword">go</span><span class="token operator">-</span>mod<span class="token operator">></span> cd <span class="token punctuation">.</span>\main\
PS C<span class="token punctuation">:</span>\Users\smile\Desktop\区块链\code\<span class="token keyword">go</span><span class="token operator">-</span>mod\main<span class="token operator">></span> New<span class="token operator">-</span>Item main<span class="token punctuation">.</span><span class="token keyword">go</span>            

    目录<span class="token punctuation">:</span> C<span class="token punctuation">:</span>\Users\smile\Desktop\区块链\code\<span class="token keyword">go</span><span class="token operator">-</span>mod\main

Mode                 LastWriteTime         Length Name
<span class="token operator">--</span><span class="token operator">--</span>                 <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>         <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span>
<span class="token operator">-</span>a<span class="token operator">--</span><span class="token operator">--</span>         <span class="token number">2022</span><span class="token operator">/</span><span class="token number">5</span><span class="token operator">/</span><span class="token number">25</span>     <span class="token number">21</span><span class="token punctuation">:</span><span class="token number">32</span>              <span class="token number">0</span> main<span class="token punctuation">.</span><span class="token keyword">go</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建一个包文件夹,创建一个文件task.go</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>PS C<span class="token punctuation">:</span>\Users\smile\Desktop\区块链\code\<span class="token keyword">go</span><span class="token operator">-</span>mod<span class="token operator">></span> mkdir models


    目录<span class="token punctuation">:</span> C<span class="token punctuation">:</span>\Users\smile\Desktop\区块链\code\<span class="token keyword">go</span><span class="token operator">-</span>mod


Mode                 LastWriteTime         Length Name
<span class="token operator">--</span><span class="token operator">--</span>                 <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>         <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span>
d<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>         <span class="token number">2022</span><span class="token operator">/</span><span class="token number">5</span><span class="token operator">/</span><span class="token number">25</span>     <span class="token number">22</span><span class="token punctuation">:</span><span class="token number">00</span>                models

PS C<span class="token punctuation">:</span>\Users\smile\Desktop\区块链\code\<span class="token keyword">go</span><span class="token operator">-</span>mod<span class="token operator">></span> New<span class="token operator">-</span>Item task<span class="token punctuation">.</span><span class="token keyword">go</span>

    目录<span class="token punctuation">:</span> C<span class="token punctuation">:</span>\Users\smile\Desktop\区块链\code\<span class="token keyword">go</span><span class="token operator">-</span>mod

Mode                 LastWriteTime         Length Name
<span class="token operator">--</span><span class="token operator">--</span>                 <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>         <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span>
<span class="token operator">-</span>a<span class="token operator">--</span><span class="token operator">--</span>         <span class="token number">2022</span><span class="token operator">/</span><span class="token number">5</span><span class="token operator">/</span><span class="token number">25</span>     <span class="token number">22</span><span class="token punctuation">:</span><span class="token number">02</span>              <span class="token number">0</span> task<span class="token punctuation">.</span><span class="token keyword">go</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>主函数</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token punctuation">.</span> <span class="token string">"fmt"</span>
	<span class="token string">"go-mod/hello"</span>
	<span class="token string">"go-mod/models"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"main主函数"</span><span class="token punctuation">)</span>
	hello<span class="token punctuation">.</span><span class="token function">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Println</span><span class="token punctuation">(</span>models<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
	<span class="token comment">//hello.Hello()</span>
<span class="token punctuation">}</span><span class="token keyword">go</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译：</strong></p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>还有一个go sum文件</strong></p>
<h3 id="远程推送到github上" tabindex="-1"><a class="header-anchor" href="#远程推送到github上" aria-hidden="true">#</a> 远程推送到github上</h3>
<ol>
<li>在github上新建一个项目Go-mod</li>
<li><code v-pre>go mod init github.com/3293172751/go-mod</code></li>
<li>添加<code v-pre>readme.m</code></li>
</ol>
</div></template>


