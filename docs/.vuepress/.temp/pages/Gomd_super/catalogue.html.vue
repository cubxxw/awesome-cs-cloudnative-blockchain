<template><div><h1 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h1>
<p>[toc]</p>
<h2 id="go语言目录结构" tabindex="-1"><a class="header-anchor" href="#go语言目录结构" aria-hidden="true">#</a> Go语言目录结构</h2>
<p>项目的目录结构通常也是门面，内行人通过目录结构基本就能看出开发者是否有经验。</p>
<p>Go 官网并没有给出一个目录结构的标准模板，但是 <a href="https://github.com/golang-standards/project-layout" target="_blank" rel="noopener noreferrer">golang-standards<ExternalLinkIcon/></a> 倒是给出了一个，目录结构如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>├── api
├── assets
├── build
│   ├── ci
│   └── package
├── cmd
│   └── _your_app_
├── configs
├── deployments
├── docs
├── examples
├── githooks
├── init
├── internal
│   ├── app
│   │   └── _your_app_
│   └── pkg
│       └── _your_private_lib_
├── pkg
│   └── _your_public_lib_
├── scripts
├── <span class="token builtin class-name">test</span>
├── third_party
├── tools
├── vendor
├── web
│   ├── app
│   ├── static
│   └── template
├── website
├── .gitignore
├── LICENSE.md
├── Makefile
├── README.md
└── go.mod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="go-目录" tabindex="-1"><a class="header-anchor" href="#go-目录" aria-hidden="true">#</a> Go 目录</h2>
<h3 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd" aria-hidden="true">#</a> cmd</h3>
<p>当前项目的<strong>可执行文件</strong>。<code v-pre>cmd</code> 目录下的每一个<strong>子目录名称都应该匹配可执行文件</strong>。比如果我们的项目是一个 <code v-pre>grpc</code> 服务，在 <code v-pre>/cmd/myapp/main.go</code> 中就包含了启动服务进程的代码，编译后生成的可执行文件就是 <code v-pre>myapp</code>。</p>
<p>不要在 <code v-pre>/cmd</code> 目录中放置太多的代码，我们应该将公有代码放置到 <code v-pre>/pkg</code> 中，将私有代码放置到 <code v-pre>/internal</code> 中并在 <code v-pre>/cmd</code> 中引入这些包，<strong>保证 main 函数中的代码尽可能简单和少</strong>。</p>
<p>🗃️<strong>收集一些很有名的项目目录例子</strong>：</p>
<ul>
<li>https://github.com/heptio/ark/tree/master/cmd</li>
<li>https://github.com/moby/moby/tree/master/cmd</li>
<li>https://github.com/prometheus/prometheus/tree/master/cmd</li>
<li>https://github.com/influxdata/influxdb/tree/master/cmd</li>
<li>https://github.com/kubernetes/kubernetes/tree/master/cmd</li>
<li>https://github.com/satellity/satellity/tree/master/cmd</li>
<li>https://github.com/dapr/dapr/tree/master/cmd</li>
</ul>
<h3 id="internal" tabindex="-1"><a class="header-anchor" href="#internal" aria-hidden="true">#</a> internal</h3>
<p><strong>私有的</strong>应用程序代码库。这些是不希望被其他人导入的代码。请注意：这种模式是 Go 编译器强制执行的。详细内容情况 Go 1.4 的 <a href="https://golang.org/doc/go1.4#internalpackages" target="_blank" rel="noopener noreferrer">release notes<ExternalLinkIcon/></a>。并且，在项目的目录树中的<strong>任意位置都可以有 internal 目录</strong>，而不仅仅是在顶级目录中。</p>
<p>可以在内部代码包中添加一些额外的结构，来分隔共享和非共享的内部代码。这不是必选项（尤其是在小项目中），但是有一个直观的包用途是很棒的。比如：应用程序代码放在 <code v-pre>/internal/app</code> 目录（如，<code v-pre>internal/app/myapp</code>），而应用程序的共享代码放在 <code v-pre>/internal/pkg</code> 目录（如，<code v-pre>internal/pkg/myprivlib</code>）中。</p>
<h3 id="pkg" tabindex="-1"><a class="header-anchor" href="#pkg" aria-hidden="true">#</a> pkg</h3>
<p><strong>外部应用程</strong>序可以使用的库代码（如，<code v-pre>/pkg/mypubliclib</code>）。其他项目将会导入这些库来保证项目可以正常运行，所以在将代码放在这里前，一定要三四而行。请注意，internal 目录是一个更好的选择来确保项目私有代码不会被其他人导入，因为这是 Go 强制执行的。使用 <code v-pre>/pkg</code> 目录来明确表示代码可以被其他人安全的导入仍然是一个好方式。Travis Jeffery 撰写的关于 <a href="https://travisjeffery.com/b/2019/11/i-ll-take-pkg-over-internal/" target="_blank" rel="noopener noreferrer">I’ll take pkg over internal<ExternalLinkIcon/></a> 文章很好地概述了 <code v-pre>pkg</code> 和 <code v-pre>inernal</code> 目录以及何时使用它们。</p>
<p>当根目录包含大量非 Go 组件和目录时，这也是一种将 Go 代码分组到一个位置的方法，从而使运行各种 Go 工具更加容易（在如下的文章中都有提到：<a href="https://www.youtube.com/watch?v=PTE4VJIdHPg" target="_blank" rel="noopener noreferrer">2018 年 GopherCon Best Practices for Industrial Programming<ExternalLinkIcon/></a>，<a href="https://www.youtube.com/watch?v=oL6JBUk6tj0" target="_blank" rel="noopener noreferrer">GopherCon 2018: Kat Zien - How Do You Structure Your Go Apps<ExternalLinkIcon/></a>，<a href="https://www.youtube.com/watch?v=3gQa1LWwuzk" target="_blank" rel="noopener noreferrer">Golab 2018 Massimiliano Pippi - Project layout patterns in Go<ExternalLinkIcon/></a>。</p>
<p><code v-pre>/pkg</code> 在许多开源项目中都使用了，但未被普遍接受，并且 Go 社区中的某些人不推荐这样做。</p>
<p>如果项目确实很小并且嵌套的层次并不会带来多少价值（除非你就是想用它），那么就不要使用它。但当项目变得很大，并且根目录中包含的内容相当繁杂（尤其是有很多非 Go 的组件）时，可以考虑使用 <code v-pre>/pkg</code>。</p>
<h3 id="vendor" tabindex="-1"><a class="header-anchor" href="#vendor" aria-hidden="true">#</a> vendor</h3>
<p>应用程序的依赖关系（通过手动或者使用喜欢的依赖管理工具，如新增的内置 Go Modules 特性）。执行 <code v-pre>go mod vendor</code> 命令将会在项目中创建 <code v-pre>/vendor</code> 目录，注意，如果使用的不是 Go 1.14 版本，在执行 <code v-pre>go build</code> 进行编译时，需要添加 <code v-pre>-mod=vendor</code> 命令行选项，因为它不是默认选项。</p>
<p>构建库文件时，不要提交应用程序依赖项。</p>
<p>请注意，从 1.13 开始，Go 也启动了模块代理特性（使用 <a href="https://proxy.golang.org/" target="_blank" rel="noopener noreferrer">https://proxy.golang.org<ExternalLinkIcon/></a> 作为默认的模块代理服务器）。点击<a href="https://blog.golang.org/module-mirror-launch" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>阅读有关它的更多信息，来了解它是否符合所需要求和约束。如果 Go Module 满足需要，那么就不需要 vendor 目录。</p>
<p>注：在 Go 语言中组织代码的方式还有一种叫” 平铺 “的，也就是<strong>在根目录下放项目的代码</strong>。这种方式在很多<strong>框架或者库</strong>中非常常见，如果想要引入一个使用 pkg 目录结构的框架时，我们往往需要使用 <code v-pre>github.com/golang/project/pkg/somepkg</code>，当代码都平铺在项目的根目录时只需要使用 <code v-pre>github.com/golang/project</code>，很明显地减少了引用依赖包语句的长度。所以，对于一个 Go 语言的<strong>框架或者库，将代码平铺在根目录下也很正常</strong>，但是在一个 Go 语言的<strong>服务中使用这种代码组织方法可能就没有那么合适了</strong>。</p>
<h2 id="服务端应用程序目录" tabindex="-1"><a class="header-anchor" href="#服务端应用程序目录" aria-hidden="true">#</a> 服务端应用程序目录</h2>
<h3 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> api</h3>
<p>项目<strong>对外提供和依赖</strong>的 API 文件。比如：<strong>OpenAPI/Swagger specs, JSON schema 文件, protocol 定义文件</strong>等。</p>
<p>比如，<a href="https://github.com/kubernetes/kubernetes/tree/master/api" target="_blank" rel="noopener noreferrer">Kubernetes<ExternalLinkIcon/></a> 项目的 api 目录结构如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>api
├── api-rules
    └── xxx.plist
├── openapi-spec
    └── swagger.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，在 go 中用的比较多的 <strong>gRPC proto 文件，也比较适合放在 api 目录下</strong>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>api
└── protobuf-spec
    └── test
        ├── test.pb.go
        └── test.proto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="web-应用程序目录" tabindex="-1"><a class="header-anchor" href="#web-应用程序目录" aria-hidden="true">#</a> Web 应用程序目录</h2>
<h3 id="web" tabindex="-1"><a class="header-anchor" href="#web" aria-hidden="true">#</a> web</h3>
<p>Web 应用程序特定的组件：静态 Web 资源，服务器端模板和单页应用（Single-Page App，SPA）</p>
<h2 id="通用应用程序目录" tabindex="-1"><a class="header-anchor" href="#通用应用程序目录" aria-hidden="true">#</a> 通用应用程序目录</h2>
<h3 id="build" tabindex="-1"><a class="header-anchor" href="#build" aria-hidden="true">#</a> build</h3>
<p><strong>打包和持续集成</strong>所需的文件。</p>
<ul>
<li>build/ci：存放持续集成的配置和脚本，如果持续集成平台对配置文件有路径要求，则可将其 link 到指定位置。</li>
<li>build/package：存放 AMI、Docker、系统包（deb、rpm、pkg）的配置和脚本等。</li>
</ul>
<p>例子：</p>
<ul>
<li>https://github.com/cockroachdb/cockroach/tree/master/build</li>
</ul>
<h3 id="configs" tabindex="-1"><a class="header-anchor" href="#configs" aria-hidden="true">#</a> configs</h3>
<p>配置文件模板或默认配置。</p>
<h3 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> deployment</h3>
<p>IaaS，PaaS，系统和容器编排部署配置和模板（docker-compose，kubernetes/helm，mesos，terraform，<code v-pre>bosh</code>）。请注意，在某些存储库中（尤其是使用 kubernetes 部署的应用程序），该目录的名字是 /deploy。</p>
<h3 id="init" tabindex="-1"><a class="header-anchor" href="#init" aria-hidden="true">#</a> init</h3>
<p>系统初始化（systemd、upstart、sysv）和进程管理（runit、supervisord）配置。</p>
<h3 id="scripts" tabindex="-1"><a class="header-anchor" href="#scripts" aria-hidden="true">#</a> scripts</h3>
<p>用于执行各种构建，安装，分析等操作的脚本。</p>
<p>这些脚本使根级别的 Makefile 变得更小更简单，例如：https://github.com/hashicorp/terraform/blob/master/Makefile。</p>
<h3 id="test" tabindex="-1"><a class="header-anchor" href="#test" aria-hidden="true">#</a> test</h3>
<p><strong>外部测试应用程序和测试数据</strong>。随时根据需要构建 <code v-pre>/test</code> 目录。对于较大的项目，有一个数据子目录更好一些。例如，如果需要 Go 忽略目录中的内容，则可以使用 <code v-pre>/test/data</code> 或 <code v-pre>/test/testdata</code> 这样的目录名字。请注意，Go 还将忽略以 “.” 或“_”开头的目录或文件，因此可以更具灵活性的来命名测试数据目录。</p>
<h2 id="其他目录" tabindex="-1"><a class="header-anchor" href="#其他目录" aria-hidden="true">#</a> 其他目录</h2>
<h3 id="assets" tabindex="-1"><a class="header-anchor" href="#assets" aria-hidden="true">#</a> assets</h3>
<p>项目中使用的其他资源（图像、logo 等）。</p>
<h3 id="docs" tabindex="-1"><a class="header-anchor" href="#docs" aria-hidden="true">#</a> docs</h3>
<p><strong>设计和用户文档</strong>（除了 godoc 生成的文档）。</p>
<h3 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> examples</h3>
<p>应用程序或公共库的示例程序。</p>
<h3 id="githooks" tabindex="-1"><a class="header-anchor" href="#githooks" aria-hidden="true">#</a> githooks</h3>
<p>Git 钩子。</p>
<h3 id="third-party" tabindex="-1"><a class="header-anchor" href="#third-party" aria-hidden="true">#</a> third_party</h3>
<p>外部辅助工具，fork 的代码和其他第三方工具（例如：Swagger UI）。</p>
<h3 id="tools" tabindex="-1"><a class="header-anchor" href="#tools" aria-hidden="true">#</a> tools</h3>
<p>此项目的支持工具。请注意，这些工具可以从 <code v-pre>/pkg</code> 和 <code v-pre>/internal</code> 目录导入代码。</p>
<p>例子：</p>
<ul>
<li>https://github.com/istio/istio/tree/master/tools</li>
<li>https://github.com/openshift/origin/tree/master/tools</li>
<li>https://github.com/dapr/dapr/tree/master/tools</li>
</ul>
<h3 id="website" tabindex="-1"><a class="header-anchor" href="#website" aria-hidden="true">#</a> website</h3>
<p>如果不使用 Github pages，则在这里放置项目的网站数据。</p>
<p>例子：</p>
<ul>
<li>https://github.com/hashicorp/vault/tree/master/website</li>
<li>https://github.com/perkeep/perkeep/tree/master/website</li>
</ul>
<h2 id="不应该出现的目录" tabindex="-1"><a class="header-anchor" href="#不应该出现的目录" aria-hidden="true">#</a> 不应该出现的目录</h2>
<h3 id="src" tabindex="-1"><a class="header-anchor" href="#src" aria-hidden="true">#</a> src</h3>
<blockquote>
<p>抱歉，现在已经有<a href="https://github.com/3293172751/go-mod" target="_blank" rel="noopener noreferrer">mod<ExternalLinkIcon/></a>包了</p>
</blockquote>
<p>有一些 Go 项目确实包含 <code v-pre>src</code> 文件夹，但通常只有在开发者是从 Java（这是 Java 中一个通用的模式）转过来的情况下才会有。如果可以的话请不要使用这种 Java 模式。你肯定不希望你的 Go 代码和项目看起来像 Java。</p>
<p>不要将项目级别的 <code v-pre>/src</code> 目录与 Go 用于其工作空间的 <code v-pre>/src</code> 目录混淆，就像 <a href="https://golang.org/doc/code.html" target="_blank" rel="noopener noreferrer">How to Write Go Code<ExternalLinkIcon/></a> 中描述的那样。<code v-pre>$GOPATH</code>环境变量指向当前的工作空间（默认情况下指向非 Windows 系统中的 $HOME/go）。此工作空间包括顶级 <code v-pre>/pkg</code>，<code v-pre>/bin</code> 和 <code v-pre>/src</code> 目录。实际的项目最终变成 <code v-pre>/src</code> 下的子目录，因此，如果项目中有 <code v-pre>/src</code> 目录，则项目路径将会变成：<code v-pre>/some/path/to/workspace/src/your_project/src/your_code.go</code>。请注意，使用 Go 1.11，可以将项目放在 <code v-pre>GOPATH</code> 之外，但这并不意味着使用此布局模式是个好主意。</p>
<h2 id="其他文件" tabindex="-1"><a class="header-anchor" href="#其他文件" aria-hidden="true">#</a> 其他文件</h2>
<h3 id="makefile" tabindex="-1"><a class="header-anchor" href="#makefile" aria-hidden="true">#</a> Makefile</h3>
<blockquote>
<p>你是不是以为只有C语言才独有<code v-pre>makrfile</code>，不是这样噢</p>
</blockquote>
<p>在任何一个项目中都会存在一些需要运行的脚本，这些脚本文件应该被放到 <code v-pre>/scripts</code> 目录中并<strong>由 Makefile 触发</strong>。</p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2>
<p>每个公司、组织内部都有自己的组织方式，但每个项目都应该有一定的规范。虽然这种规范的约定没有那么强制，但是只要达成了一致之后，对于团队中组员快速理解和入门项目都是很有帮助的。有时候<strong>一些规范，就是团队的共同语言，定好了规范，减少了不必要的重复沟通，有利于提高整体的效率</strong>。</p>
<p>项目目录也一样，本篇文章讲的是参考 <a href="https://github.com/golang-standards/project-layout" target="_blank" rel="noopener noreferrer">golang-standards<ExternalLinkIcon/></a> 提供的规范。但是，<strong>最重要的还是要与自己的团队商量，讨论并整理出适合自己的一套项目目录规范</strong>。</p>
<p><strong>一致的项目目录规范，有助于组员快速理解其他人的代码，不容易造成团队的” 单点故障 “；团队团结一致，共同维护和升级项目目录结构，可不断沉淀，不断提高效率，减少犯错</strong>。</p>
<h2 id="延伸阅读" tabindex="-1"><a class="header-anchor" href="#延伸阅读" aria-hidden="true">#</a> 延伸阅读</h2>
<ul>
<li><a href="https://makeoptim.com/golang/clean-architecture" target="_blank" rel="noopener noreferrer">在 Golang 上使用整洁架构（Clean Architecture）<ExternalLinkIcon/></a></li>
<li><a href="https://makeoptim.com/golang/clean-architecture-2" target="_blank" rel="noopener noreferrer">在 Golang 上使用整洁架构（Clean Architecture）-2<ExternalLinkIcon/></a></li>
<li><a href="https://makeoptim.com/golang/clean-architecture-3" target="_blank" rel="noopener noreferrer">在 Golang 上使用整洁架构（Clean Architecture）-3<ExternalLinkIcon/></a></li>
<li><a href="https://makeoptim.com/golang/effective-go" target="_blank" rel="noopener noreferrer">Effective Go 中文<ExternalLinkIcon/></a></li>
<li><a href="https://makeoptim.com/golang/standards/code-review-comments" target="_blank" rel="noopener noreferrer">Code Review 规范<ExternalLinkIcon/></a></li>
<li><a href="https://makeoptim.com/golang/new-features" target="_blank" rel="noopener noreferrer">golang 1.14 1.15 1.16 新特性一览<ExternalLinkIcon/></a></li>
</ul>
</div></template>


