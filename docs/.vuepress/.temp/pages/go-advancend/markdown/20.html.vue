<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第20节-golang云原生部署" tabindex="-1"><a class="header-anchor" href="#第20节-golang云原生部署" aria-hidden="true">#</a> 第20节 Golang云原生部署</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/19.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p><strong>我们使用 <code v-pre>beego</code> 教程中学到的 <code v-pre>bee</code> 命令构建一个 dockerfile，当然也可以自己写：</strong></p>
<h3 id="dockerize-命令" tabindex="-1"><a class="header-anchor" href="#dockerize-命令" aria-hidden="true">#</a> dockerize 命令</h3>
<p>这个命令可以通过生成<code v-pre>Dockerfile</code>文件来实现<code v-pre>docker</code>化你的应用。</p>
<p><strong>例子:</strong></p>
<p>生成一个以<code v-pre>1.9.2</code>版本Go环境为基础镜像的Dockerfile,并暴露9000端口:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bee dockerize -image="library/golang:1.9.2" -expose=8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>更多帮助信息可执行<code v-pre>bee help dockerize</code>.</p>
<div class="custom-container tip"><p class="custom-container-title">打开 dockerfile 文件：</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> library/golang:1.9.2</span>

<span class="token comment"># Godep for vendoring</span>
<span class="token instruction"><span class="token keyword">RUN</span> go get github.com/tools/godep</span>

<span class="token comment"># Recompile the standard library without CGO</span>
<span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 go install -a std</span>

<span class="token instruction"><span class="token keyword">ENV</span> APP_DIR <span class="token variable">$GOPATHD</span>:\文档\最近的\awesome-golang\docs\code\beego</span>
<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p <span class="token variable">$APP_DIR</span></span>

<span class="token comment"># Set the entrypoint</span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> (cd <span class="token variable">$APP_DIR</span> &amp;&amp; ./D:\文档\最近的\awesome-golang\docs\code\beego)</span>
<span class="token instruction"><span class="token keyword">ADD</span> . <span class="token variable">$APP_DIR</span></span>

<span class="token comment"># Compile the binary and statically link</span>
<span class="token instruction"><span class="token keyword">RUN</span> cd <span class="token variable">$APP_DIR</span> &amp;&amp; CGO_ENABLED=0 godep go build -ldflags <span class="token string">'-d -w -s'</span></span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h4 id="部署dockerfile" tabindex="-1"><a class="header-anchor" href="#部署dockerfile" aria-hidden="true">#</a> 部署dockerfile</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build -t mybeego:1.0 .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="方式二-测试项目" tabindex="-1"><a class="header-anchor" href="#方式二-测试项目" aria-hidden="true">#</a> 方式二：测试项目</h2>
<p><strong>拉取镜像：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://gitee.com/nickdemo/helloworld.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>构建镜像：</strong></p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ul>
<li><code v-pre>go env -w </code>：设置镜像</li>
<li><code v-pre>WORKDIR</code>：设置工作目录（指定创建容器后，终端 <strong>默认登陆进来的工作目录</strong>）</li>
</ul>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> golang:1.18</span>
<span class="token instruction"><span class="token keyword">ADD</span> ./ /go/src/helloworld/</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /go/src/helloworld</span>
<span class="token instruction"><span class="token keyword">RUN</span> go env -w GOPROXY=https://proxy.golang.com.cn,https://goproxy.cn,direct</span>
<span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o app .</span>

<span class="token instruction"><span class="token keyword">FROM</span> alpine:latest</span>
<span class="token instruction"><span class="token keyword">ENV</span> env1=env1value</span>
<span class="token instruction"><span class="token keyword">ENV</span> env2=env2value</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> nick</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app/</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">0</span></span> /go/src/helloworld/app ./</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">"./app"</span>]</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"--param1=p1"</span>,<span class="token string">"--param2=p2"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="部署dockerfile-1" tabindex="-1"><a class="header-anchor" href="#部署dockerfile-1" aria-hidden="true">#</a> 部署dockerfile</h4>
<ul>
<li><code v-pre>–no-cache</code>：不使用缓存</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build -t helloworld:1.0 .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="推送镜像" tabindex="-1"><a class="header-anchor" href="#推送镜像" aria-hidden="true">#</a> 推送镜像</h2>
<p>name：hello-world</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> push <span class="token number">3293172751</span>/hello-world:tagname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>tag：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span>  tag helloworld:1.0 <span class="token number">3293172751</span>/hello-world:1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>push:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker push  3293172751/hello-world:1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="定义-k8s-应用程序载体-pod" tabindex="-1"><a class="header-anchor" href="#定义-k8s-应用程序载体-pod" aria-hidden="true">#</a> 定义 k8s 应用程序载体 Pod</h2>
<ul>
<li><code v-pre>restartPolicy</code>
<ul>
<li>Always：除正常退出外，都会重启我们的容器</li>
<li>Never：任何情况下，容器关闭都不会重启</li>
<li>Onfailure：程序异常退出</li>
</ul>
</li>
<li><code v-pre>imagePullPolicy</code>
<ul>
<li>Always：每次部署都重新拉取镜像</li>
<li>Never：只使用本地镜像</li>
<li>ifNotPresent：如果本地存在，则不拉取</li>
</ul>
</li>
<li><code v-pre>command</code>：启动命令</li>
<li><code v-pre>resources</code>：对资源的限用</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>apiVersion v1
kind Pod 
metadata
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myhello<span class="token punctuation">-</span>pod<span class="token punctuation">-</span>demo
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
  	<span class="token key atrule">name</span><span class="token punctuation">:</span> myhello<span class="token punctuation">-</span>pod<span class="token punctuation">-</span>demo
  	<span class="token key atrule">env</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myhello
  	<span class="token key atrule">image</span><span class="token punctuation">:</span> 
  	<span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> ifNotPresent
  	<span class="token key atrule">ports</span><span class="token punctuation">:</span>
  	<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  	<span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"./app"</span><span class="token punctuation">]</span>
  	<span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"--param1=k8s-p1"</span><span class="token punctuation">,</span><span class="token string">"--param2=k8s-p2"</span><span class="token punctuation">]</span>
  	<span class="token key atrule">resources</span><span class="token punctuation">:</span>
  	  <span class="token key atrule">limits</span><span class="token punctuation">:</span>
  	    <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
  	  <span class="token key atrule">requests</span><span class="token punctuation">:</span>
  	  	<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
  	  	<span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
 <span class="token key atrule">env</span><span class="token punctuation">:</span> 
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> env1
   <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"k8s-env1"</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> env2
   <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"k8s-env2"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/19.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/21.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div>
</div></template>


