<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第32节-go语言1-20发布" tabindex="-1"><a class="header-anchor" href="#第32节-go语言1-20发布" aria-hidden="true">#</a> 第32节 go语言1.20发布</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/31.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p><img src="http://sm.nsddd.top/sm202302021326221.png" alt="image-20230202132639133"></p>
<p>可以访问<a href="https://go.dev/dl/" target="_blank" rel="noopener noreferrer">下载页面<ExternalLinkIcon/></a>获取它</p>
<p><strong>向下兼容，无脑升就好了！Go 1.20 amd64 版本 95MB，相比 Go 1.19 144MB，以及 Go 1.18.10 138MB 来说，降幅达到了 49MB</strong>。</p>
<p><a href="https://tip.golang.org/doc/go1.19" target="_blank" rel="noopener noreferrer">最新的 Go 版本 1.20 在Go 1.19<ExternalLinkIcon/></a> 发布六个月后发布。它的大部分更改都在工具链、运行时和库的实现中。一如既往，该版本保持了 Go 1<a href="https://tip.golang.org/doc/go1compat" target="_blank" rel="noopener noreferrer">的兼容性承诺<ExternalLinkIcon/></a>。我们期望几乎所有的 Go 程序都能像以前一样继续编译和运行。</p>
<h2 id="语言的变化" tabindex="-1"><a class="header-anchor" href="#语言的变化" aria-hidden="true">#</a> 语言的变化</h2>
<p><strong>四个变化：</strong></p>
<ol>
<li>Go 1.17 添加了<a href="https://tip.golang.org/ref/spec#Conversions_from_slice_to_array_or_array_pointer" target="_blank" rel="noopener noreferrer">从切片到数组指针的转换<ExternalLinkIcon/></a>。Go 1.20 扩展了它以允许从切片到数组的转换：给定一个切片<code v-pre>x</code>,<code v-pre>[4]byte(x)</code>现在可以写成<code v-pre>*(*[4]byte)(x)</code>.</li>
<li>该<a href="https://tip.golang.org/ref/spec/#Package_unsafe" target="_blank" rel="noopener noreferrer"><code v-pre>unsafe</code>包<ExternalLinkIcon/></a>定义了三个新函数<code v-pre>SliceData</code>、<code v-pre>String</code>和<code v-pre>StringData</code>。与 Go 1.17 一起<code v-pre>Slice</code>，这些函数现在提供了构建和解构切片和字符串值的完整能力，而不依赖于它们的确切表示。</li>
<li>该规范现在定义结构值一次比较一个字段，按照它们在结构类型定义中出现的顺序考虑字段，并在第一个不匹配时停止。之前可以阅读规范，就好像所有字段都需要比较第一个不匹配之外的字段。类似地，该规范现在定义数组值按递增索引顺序一次比较一个元素。在这两种情况下，差异会影响某些比较是否必须恐慌。现有程序没有改变：新的规范措辞描述了实现一直所做的事情。</li>
<li><a href="https://tip.golang.org/ref/spec#Comparison_operators" target="_blank" rel="noopener noreferrer">可比较的类型<ExternalLinkIcon/></a>（例如普通接口）现在可以满足<code v-pre>comparable</code>约束，即使类型参数不是严格可比较的（比较可能会在运行时崩溃）。这使得实例化受约束的类型参数<code v-pre>comparable</code> （例如，用户定义的通用映射键的类型参数）与非严格可比较的类型参数（例如接口类型或包含接口类型的复合类型）成为可能。</li>
</ol>
<h2 id="性能提升" tabindex="-1"><a class="header-anchor" href="#性能提升" aria-hidden="true">#</a> 性能提升</h2>
<p>从 Go 1.21 开始，一些较旧的操作系统将不再受支持：这包括 Windows 7、8、Server 2008 和 Server 2012、macOS 10.13 High Sierra 和 10.14 Mojave。另一方面，Go 1.20 添加了对 RISC-V 上的 FreeBSD 的实验性支持。</p>
<ul>
<li>编译器和垃圾收集器的改进减少了内存开销，并将整体 CPU 性能提高了 2%。</li>
<li>专门针对编译时间的工作导致构建改进高达 10%。这使构建速度与 Go 1.17 保持一致。</li>
</ul>
<h2 id="os-兼容版本" tabindex="-1"><a class="header-anchor" href="#os-兼容版本" aria-hidden="true">#</a> OS 兼容版本</h2>
<p>很多还是 Windows7、8 的用户，赶紧升 Go 1.20  吧，这将是最后一个版本。</p>
<ul>
<li>Go 1.20 是将在 Windows 7、8、Server 2008 和 Server 2012 的任何版本上运行的最后一个版本。Go 1.21 将至少需要 Windows 10 或 Server 2016。</li>
<li>Go 1.20 是将在 macOS 10.13 High Sierra 或 10.14 Mojave 上运行的最后一个版本。Go 1.21 将需要 macOS 10.15 Catalina 或更高版本。</li>
</ul>
<h2 id="tool" tabindex="-1"><a class="header-anchor" href="#tool" aria-hidden="true">#</a> Tool</h2>
<ul>
<li>该<a href="https://go.dev/testing/coverage" target="_blank" rel="noopener noreferrer"><code v-pre>cover</code>工具<ExternalLinkIcon/></a>现在可以收集整个程序的覆盖率概况，而不仅仅是单元测试。</li>
<li>该<a href="https://go.dev/cmd/go" target="_blank" rel="noopener noreferrer"><code v-pre>go</code>工具<ExternalLinkIcon/></a>不再依赖于<code v-pre>$GOROOT/pkg</code>目录中预编译的标准库包存档，并且它们不再随发行版一起提供，从而减少了下载量。相反，标准库中的包是根据需要构建的，并像其他包一样缓存在构建缓存中。</li>
<li>的实施<code v-pre>go test -json</code>已得到改进，以使其在出现杂散写入时更加健壮<code v-pre>stdout</code>。</li>
<li>、<code v-pre>go build</code>和<code v-pre>go install</code>其他与构建相关的命令现在接受一个<code v-pre>-pgo</code>启用配置文件引导优化的标志以及一个<code v-pre>-cover</code>用于整个程序覆盖率分析的标志。</li>
<li>该<code v-pre>go</code>命令现在默认在没有 C 工具链的系统上禁用<code v-pre>cgo</code>。因此，当 Go 安装在没有 C 编译器的系统上时，它现在将对标准库中的包使用纯 Go 构建，这些包可以选择使用 cgo，而不是使用预分发的包存档（已被删除，如上所述） .</li>
<li>该<a href="https://go.dev/cmd/vet" target="_blank" rel="noopener noreferrer"><code v-pre>vet</code>工具<ExternalLinkIcon/></a>报告了在并行运行的测试中可能发生的更多循环变量引用错误。</li>
</ul>
<h2 id="标准库" tabindex="-1"><a class="header-anchor" href="#标准库" aria-hidden="true">#</a> 标准库</h2>
<ul>
<li>新<a href="https://go.dev/pkg/crypto/ecdh" target="_blank" rel="noopener noreferrer"><code v-pre>crypto/ecdh</code><ExternalLinkIcon/></a>包明确支持 NIST 曲线和 Curve25519 上的椭圆曲线 Diffie-Hellman 密钥交换。</li>
<li>新函数返回一个包含错误列表的错误，如果错误类型实现了该方法<a href="https://go.dev/pkg/errors#Join" target="_blank" rel="noopener noreferrer"><code v-pre>errors.Join</code><ExternalLinkIcon/></a>，则可以再次获取错误列表。<code v-pre>Unwrap() []error</code></li>
<li>新<a href="https://go.dev/pkg/net/http#ResponseController" target="_blank" rel="noopener noreferrer"><code v-pre>http.ResponseController</code><ExternalLinkIcon/></a>类型提供对接口未处理的扩展的按请求功能的 <a href="https://go.dev/pkg/net/http#ResponseWriter" target="_blank" rel="noopener noreferrer"><code v-pre>http.ResponseWriter</code><ExternalLinkIcon/></a>访问。</li>
<li><a href="https://go.dev/pkg/net/http/httputil#ReverseProxy" target="_blank" rel="noopener noreferrer"><code v-pre>httputil.ReverseProxy</code><ExternalLinkIcon/></a> 转发代理包括一个新的钩子<code v-pre>Rewrite</code>函数，取代了以前的<code v-pre>Director</code>钩子。</li>
<li>新<a href="https://go.dev/pkg/context#WithCancelCause" target="_blank" rel="noopener noreferrer"><code v-pre>context.WithCancelCause</code><ExternalLinkIcon/></a>函数提供了一种方法来取消具有给定错误的上下文。可以通过调用新 <a href="https://go.dev/pkg/context#Cause" target="_blank" rel="noopener noreferrer"><code v-pre>context.Cause</code><ExternalLinkIcon/></a>函数来检索该错误。</li>
<li>新<a href="https://go.dev/pkg/os/exec#Cmd" target="_blank" rel="noopener noreferrer"><code v-pre>os/exec.Cmd</code><ExternalLinkIcon/></a>字段<a href="https://go.dev/pkg/os/exec#Cmd.Cancel" target="_blank" rel="noopener noreferrer"><code v-pre>Cancel</code><ExternalLinkIcon/></a> 并<a href="https://go.dev/pkg/os/exec#Cmd.WaitDelay" target="_blank" rel="noopener noreferrer"><code v-pre>WaitDelay</code><ExternalLinkIcon/></a>指定 <code v-pre>Cmd</code>其关联<code v-pre>Context</code>被取消或进程退出时的行为。</li>
</ul>
<h2 id="其他的一些内容" tabindex="-1"><a class="header-anchor" href="#其他的一些内容" aria-hidden="true">#</a> 其他的一些内容</h2>
<p><strong>链接器：</strong></p>
<p>Go 1.20 对编译器生成的符号使用<code v-pre>go:</code>and<code v-pre>type:</code>前缀，而不是<code v-pre>go.</code>and <code v-pre>type.</code>。这避免了名称以 . 开头的用户包的混淆<code v-pre>go.</code>。该<a href="https://tip.golang.org/pkg/debug/gosym" target="_blank" rel="noopener noreferrer"><code v-pre>debug/gosym</code><ExternalLinkIcon/></a>软件包理解使用 Go 1.20 及更新版本构建的二进制文件的新命名约定。</p>
<ul>
<li><code v-pre>$GOROOT/pkg</code> 目录不再存储标准存档的预编译包存档，以减少 Go 发行版的大小。</li>
<li>go 命令现在定义架构功能 build flags，如 amd64.V2，以允许根据特定 CPU 架构功能的存在或不存在来选择包实现文件。这对于 x86_64 微架构特性级别的工作来说是个好消息。</li>
<li>go build 和 go install 以及其他与构建相关的命令现在支持 “-cover” flag，用于启用带有 code coverage instrumentation 的构建。</li>
<li>由于在垃圾收集器上的工作，内存开销减少和 CPU 性能提高高达 2%。</li>
<li>对 Profile Guided Optimizations (PGO) 的预览支持。</li>
<li>在 Linux 上，linker 现在在链接时为 glibc 或 musl 选择动态解释器。</li>
<li>一个新的 crypto/ecdh 包，为 NIST curves 和 Curve25519 上的 Elliptic Curve Diffie-Hellman 密钥交换提供明确支持。</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<p>请参考Go官方博客（https://go.dev/blog/go1.20）和Go语言官方文档（https://tip.golang.org/doc/go1.20）了解更多关于Go语言1.20版本的详细信息。</p>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/31.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/33.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


