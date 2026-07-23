<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第10节-go-air实现项目热加载" tabindex="-1"><a class="header-anchor" href="#第10节-go-air实现项目热加载" aria-hidden="true">#</a> 第10节 go air实现项目热加载</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/9.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="开始准备" tabindex="-1"><a class="header-anchor" href="#开始准备" aria-hidden="true">#</a> 开始准备</h2>
<p><strong>使用window的cmd终端，我们直接使用命令<code v-pre>code .</code>打开当前文件的vscode</strong></p>
<blockquote>
<p>使用<code v-pre>Start .</code>可以打开文件资源管理器</p>
</blockquote>
<h3 id="windows安装go-air实现项目热加载" tabindex="-1"><a class="header-anchor" href="#windows安装go-air实现项目热加载" aria-hidden="true">#</a> Windows安装go air实现项目热加载</h3>
<p>Air 是为 Go 应用开发设计的另外一个热重载的命令行工具。只需在你的项目根目录下输入 <code v-pre>air</code>，然后把它放在一边，专注于你的代码即可。</p>
<ul>
<li>[x] <a href="https://github.com/cosmtrek/air" target="_blank" rel="noopener noreferrer">仓库地址<ExternalLinkIcon/></a></li>
</ul>
<p><strong>安装air</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go get -u github.com/cosmtrek/air
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<h3 id="推荐使用-install-sh" tabindex="-1"><a class="header-anchor" href="#推荐使用-install-sh" aria-hidden="true">#</a> 推荐使用 install.sh</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># binary 文件会是在 $(go env GOPATH)/bin/air</span>
<span class="token function">curl</span> <span class="token parameter variable">-sSfL</span> https://raw.githubusercontent.com/cosmtrek/air/master/install.sh <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> -- <span class="token parameter variable">-b</span> <span class="token variable"><span class="token variable">$(</span>go <span class="token function">env</span> GOPATH<span class="token variable">)</span></span>/bin

<span class="token comment"># 或者把它安装在 ./bin/ 路径下</span>
<span class="token function">curl</span> <span class="token parameter variable">-sSfL</span> https://raw.githubusercontent.com/cosmtrek/air/master/install.sh <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span>

air <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>P.S. 非常感谢 mattn 的 <a href="https://github.com/cosmtrek/air/pull/1" target="_blank" rel="noopener noreferrer">PR<ExternalLinkIcon/></a>，使得 Air 支持 Windows 平台。</p>
<h3 id="使用-go-install" tabindex="-1"><a class="header-anchor" href="#使用-go-install" aria-hidden="true">#</a> 使用 go install</h3>
<p>使用 Go 的版本为 1.16 或更高:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go install github.com/cosmtrek/air@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h3>
<p>请拉取这个 Docker 镜像 <a href="https://hub.docker.com/r/cosmtrek/air" target="_blank" rel="noopener noreferrer">cosmtrek/air<ExternalLinkIcon/></a>.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-w</span> <span class="token string">"&lt;PROJECT>"</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-e</span> <span class="token string">"air_wd=&lt;PROJECT>"</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:<span class="token operator">&lt;</span>PROJECT<span class="token operator">></span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>PORT<span class="token operator">></span>:<span class="token operator">&lt;</span>APP SERVER PORT<span class="token operator">></span> <span class="token punctuation">\</span>
    cosmtrek/air
    <span class="token parameter variable">-c</span> <span class="token operator">&lt;</span>CONF<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，我的项目之一是在 Docker 上运行的：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-w</span> <span class="token string">"/go/src/github.com/cosmtrek/hub"</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/go/src/github.com/cosmtrek/hub <span class="token punctuation">\</span>
    <span class="token parameter variable">-p</span> <span class="token number">9090</span>:9090 <span class="token punctuation">\</span>
    cosmtrek/air
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="http://sm.cubxxw.com/smimage-20220822170342761.png" alt="image-20220822170342761" style="zoom:50%;" />
<h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h2>
<p>您可以添加 <code v-pre>alias air='~/.air'</code> 到您的 <code v-pre>.bashrc</code> 或 <code v-pre>.zshrc</code> 后缀的文件.</p>
<p>首先，进入你的项目文件夹</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cd /path/to/your_project
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最简单的方法是执行</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 优先在当前路径查找 `.air.toml` 后缀的文件，如果没有找到，则使用默认的
air -c .air.toml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以运行以下命令初始化，把默认配置添加到当前路径下的<code v-pre>.air.toml</code> 文件。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>air init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>唯一需要讲的地方是在配置文件<code v-pre>.air.toml</code>中：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cmd = "go build -o ./tmp/main.exe ."
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>cmd是可以执行air的目录，即使你<code v-pre>go mod init ”name&quot;</code> 初始化了，但是也是要加入相对路径的，比如说加入项目根目录下的cmd文件</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cmd = "go build -o ./tmp/main.exe ./cmd"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="http://sm.cubxxw.com/smimage-20220822170925614.png" alt="image-20220822170925614" style="zoom:25%;" />
</blockquote>
<p>在这之后，你只需执行 <code v-pre>air</code> 命令，无需添加额外的变量，它就能使用 <code v-pre>.air.toml</code> 文件中的配置了。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>air
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如欲修改配置信息，请参考 <a href="https://github.com/cosmtrek/air/blob/master/air_example.toml" target="_blank" rel="noopener noreferrer">air_example.toml<ExternalLinkIcon/></a> 文件.</p>
<h3 id="运行时参数" tabindex="-1"><a class="header-anchor" href="#运行时参数" aria-hidden="true">#</a> 运行时参数</h3>
<p>您可以通过把变量添加在 air 命令之后来传递参数。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 会执行 ./tmp/main bench
air bench

# 会执行 ./tmp/main server --port 8080
air server --port 8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can separate the arguments passed for the air command and the built binary with <code v-pre>--</code> argument.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 会运行 ./tmp/main -h</span>
air -- <span class="token parameter variable">-h</span>

<span class="token comment"># 会使用个性化配置来运行 air，然后把 -h 后的变量和值添加到运行的参数中</span>
air <span class="token parameter variable">-c</span> .air.toml -- <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> Docker-compose</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>services:
  my-project-with-air:
    image: cosmtrek/air
    <span class="token comment"># working_dir value has to be the same of mapped volume</span>
    working_dir: /project-package
    ports:
      - <span class="token operator">&lt;</span>any<span class="token operator">></span>:<span class="token operator">&lt;</span>any<span class="token operator">></span>
    environment:
      - <span class="token assign-left variable">ENV_A</span><span class="token operator">=</span><span class="token variable">${ENV_A}</span>
      - <span class="token assign-left variable">ENV_B</span><span class="token operator">=</span><span class="token variable">${ENV_B}</span>
      - <span class="token assign-left variable">ENV_C</span><span class="token operator">=</span><span class="token variable">${ENV_C}</span>
    volumes:
      - ./project-relative-path/:/project-package/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="调试" tabindex="-1"><a class="header-anchor" href="#调试" aria-hidden="true">#</a> 调试</h3>
<p>运行 <code v-pre>air -d</code> 命令能打印所有日志。</p>
<details class="custom-container details"><summary>Q&A</summary>
<p>遇到 &quot;command not found: air&quot; 或 &quot;No such file or directory&quot; 该怎么办？</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPATH</span><span class="token operator">=</span><span class="token environment constant">$HOME</span>/xxxxx
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$GOROOT</span>/bin:<span class="token variable">$GOPATH</span>/bin
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span>go <span class="token function">env</span> GOPATH<span class="token variable">)</span></span>/bin <span class="token operator">&lt;</span>---- 请确认这行在您的配置信息中！！！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2>
<p>请注意：这需要 Go 1.16+ ，因为我使用 <code v-pre>go mod</code> 来管理依赖。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 1. 首先复刻（fork）这个项目</span>

<span class="token comment"># 2. 其次克隆（clone）它</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">$GOPATH</span>/src/github.com/cosmtrek
<span class="token builtin class-name">cd</span> <span class="token variable">$GOPATH</span>/src/github.com/cosmtrek
<span class="token function">git</span> clone git@github.com:<span class="token operator">&lt;</span>YOUR USERNAME<span class="token operator">></span>/air.git

<span class="token comment"># 3. 再次安装依赖</span>
<span class="token builtin class-name">cd</span> air
<span class="token function">make</span> ci

<span class="token comment"># 4. 这样就可以快乐地探索和玩耍啦！</span>
<span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>顺便说一句: 欢迎 PR~</p>
<h3 id="发布新版本" tabindex="-1"><a class="header-anchor" href="#发布新版本" aria-hidden="true">#</a> 发布新版本</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 1. checkout 到 master 分支</span>
<span class="token function">git</span> checkout master

<span class="token comment"># 2. 添加需要发布的版本号</span>
<span class="token function">git</span> tag v1.xx.x

<span class="token comment"># 3. 推送到远程</span>
<span class="token function">git</span> push origin v1.xx.x

ci 会加工和处理，然后会发布新版本。等待大约五分钟，你就能获取到新版本了。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/9.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/11.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


