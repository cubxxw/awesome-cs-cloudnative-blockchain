<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第14节-go版本控制" tabindex="-1"><a class="header-anchor" href="#第14节-go版本控制" aria-hidden="true">#</a> 第14节 Go版本控制</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/13.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>一直以来选择的版本控制的方式：</p>
<p>💡 <strong>Git</strong></p>
<div class="custom-container tip"><p class="custom-container-title">Go语言支持二进制安装</p>
<p>golang</p>
<p><strong>二进制分布</strong></p>
<p>官方二进制发行版可在https://go.dev/dl/获得。</p>
<p>下载二进制版本后，请访问https://go.dev/doc/install 以获取安装说明。</p>
</div>
<p>克隆 Go 源码：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/golang/go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>选择需要的分支：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> release-branch.go1.15 origin/release-branch.go1.15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将 go 整个目录复制到 /usr/local/go1.15，编译安装：</p>
<p>创建软链：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ln</span> <span class="token parameter variable">-s</span> go1.15 go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>如果想要切换版本，只需要做类似上面的步骤，最后将 go 这个软链指向要切换的版本。</p>
</blockquote>
<h2 id="安装-goup" tabindex="-1"><a class="header-anchor" href="#安装-goup" aria-hidden="true">#</a> 安装 goup</h2>
<div class="custom-container danger"><p class="custom-container-title">goup</p>
<p>goup 版本控制</p>
<p>因为 goup GitHub仓库更新的不是很频繁，距离上一次更新是两个月前，所以不考虑。</p>
</div>
<p>因为 goup 本身是 Go 语言实现的，因此他通过一个脚本下载对应系统的预编译 goup 程序。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go get <span class="token parameter variable">-u</span> <span class="token parameter variable">-v</span> github.com/owenthereal/goup 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一行代码安装 goup（推荐的方式）：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sSf</span> https://raw.githubusercontent.com/owenthereal/goup/master/install.sh <span class="token operator">|</span> <span class="token function">sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="gvm" tabindex="-1"><a class="header-anchor" href="#gvm" aria-hidden="true">#</a> gvm</h2>
<p>gvm 是一个很强大的版本控制工具，仓库地址：</p>
<ul>
<li><a href="https://github.com/moovweb/gvm" target="_blank" rel="noopener noreferrer">github - gvm<ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">提示</p>
<p>如果因为网络原因，可以选择国内的 gitee</p>
</div>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://gitee.com/voidint/gvm/releases/download/v1.0.0/gvm1.0.0.linux-386.tar.gz <span class="token operator">&amp;&amp;</span><span class="token punctuation">\</span>
<span class="token function">mv</span> gvm1.0.0.linux-386.tar.gz  /tmp/<span class="token punctuation">;</span> <span class="token builtin class-name">cd</span> /tmp/  <span class="token operator">&amp;&amp;</span><span class="token punctuation">\</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> gvm1.0.0.linux-386.tar.gz <span class="token parameter variable">-C</span> /usr/local/bin/ <span class="token operator">&amp;&amp;</span><span class="token punctuation">\</span>
cat<span class="token operator">>></span>~/.bashrc<span class="token operator">&lt;&lt;</span><span class="token string">EOF
export GOROOT="<span class="token variable">${<span class="token environment constant">HOME</span>}</span>/.g/go"
export PATH="<span class="token variable">${<span class="token environment constant">HOME</span>}</span>/.g/go/bin:<span class="token environment constant">$PATH</span>"
export G_MIRROR=https://golang.google.cn/dl/
EOF</span>
<span class="token comment"># https://goproxy.io</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>国内</summary>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat>>~/.bashrc&lt;&lt;EOF
export GOROOT="${HOME}/.g/go"
export PATH="${HOME}/.g/go/bin:$PATH"
export G_MIRROR=https://goproxy.io/dl/
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p><strong>查看可用的Go语言版本：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gvm ls-remote stable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>安装目标的版本：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gvm <span class="token function">install</span> <span class="token number">1.12</span>.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看版本（all）：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gvm ls-remote
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>切换版本：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>gvm use 1.12.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/13.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/15.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


