<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第23节-在线词典-调用第三方api案例" tabindex="-1"><a class="header-anchor" href="#第23节-在线词典-调用第三方api案例" aria-hidden="true">#</a> 第23节 在线词典（调用第三方API案例）</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/22.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议你先了解基础和进阶篇。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p><strong>实现一个简单的在线词典，使用 CLI 的参数调用第三方词典并且返回翻译，效果如下：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#\go-by-example\simpledict\v4> go run .\main.go cloud</span>
cloud UK: <span class="token punctuation">[</span>klaud<span class="token punctuation">]</span> US: <span class="token punctuation">[</span>klaʊd<span class="token punctuation">]</span>
n.云<span class="token punctuation">;</span>大群<span class="token punctuation">;</span><span class="token punctuation">(</span>镜面<span class="token punctuation">)</span>朦胧<span class="token punctuation">;</span>黑影<span class="token punctuation">;</span>阴影<span class="token punctuation">;</span>瑕疵<span class="token punctuation">;</span>嫌疑<span class="token punctuation">;</span>集合
vt.如云一般地覆盖<span class="token punctuation">;</span>使阴暗<span class="token punctuation">;</span>玷污<span class="token punctuation">;</span>弄脏
vi.阴云密布<span class="token punctuation">;</span>变模糊
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tdd" tabindex="-1"><a class="header-anchor" href="#tdd" aria-hidden="true">#</a> TDD</h2>
<p>[[TDD]] 是测试驱动开发的缩写。这是一种软件开发方法，要求在编写代码之前先编写测试，并在编写代码时重复运行这些测试。这样可以确保代码按预期工作，并在开发过程中发现问题。</p>
<p>举个例子，假设我们要编写一个Go语言函数，该函数接受两个整数并返回它们的和。在使用TDD方法开发时，我们首先编写测试函数，如下所示：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestSum</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">:=</span> <span class="token function">Sum</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
    expected <span class="token operator">:=</span> <span class="token number">5</span>
    <span class="token keyword">if</span> result <span class="token operator">!=</span> expected <span class="token punctuation">{</span>
        t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Expected %d but got %d"</span><span class="token punctuation">,</span> expected<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个测试函数使用了Go语言的testing包，它检查调用Sum(2,3)是否返回正确的结果。</p>
<p>然后我们编写Sum函数</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Sum</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时我们可以运行测试，如果测试通过，则说明Sum函数按预期工作。如果测试不通过，则说明函数存在问题，我们需要调整代码并再次运行测试。</p>
<p>最后我们可以运行 go test 来运行所有的单元测试。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ go <span class="token builtin class-name">test</span>
PASS
ok      example/sum        <span class="token number">0</span>.002s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们就可以确保代码按预期工作，并在开发过程中发现问题。</p>
<p><strong>作为一个开源的爱好者，我喜欢在GitHub actions进行测试，在 projects 上进行项目跟踪和管理。</strong></p>
<p>在GitHub中使用 Projects 和 Actions 来实现CI/CD流程需要几个步骤。</p>
<ol>
<li>在GitHub上创建一个新项目，或打开现有项目。</li>
<li>在项目根目录下创建一个名为 &quot;.github/workflows&quot; 的目录，并在其中创建一个 yml 文件来配置你的工作流程。 例如，你可以创建一个名为 &quot;ci.yml&quot; 的文件来配置持续集成工作流程。</li>
<li>在yml文件中，使用 GitHub Actions 提供的语法配置你的工作流程。例如，你可以配置在每次提交后运行单元测试，并在测试通过后自动部署到生产环境。</li>
<li>提交更改并推送到GitHub。</li>
<li>使用 GitHub Projects 来管理你的项目。在 GitHub 上创建一个项目仪表板，并将其与你的项目关联。你可以使用此仪表板来跟踪项目进度，查看待办事项列表和问题跟踪。</li>
<li>通过在 GitHub Actions 中配置 webhooks，可以让每次提交都自动触发工作流程。</li>
<li>在Actions中查看构建和部署结果。</li>
</ol>
<p><strong>ci.yaml 文件：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> CI

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> main
  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> main

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout code
      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2

    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run tests
      <span class="token key atrule">run</span><span class="token punctuation">:</span> go test <span class="token punctuation">-</span>v ./<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>⚠️ 当然，你也可以修改 yaml 文件，配置一个简单的工作流程，在每次 issue 创建或 pull request 时将相关信息写入项目。这样可以节省很多时间，具体用法看GitHub官方文档，我觉得很麻烦不演示了。</p>
</blockquote>
<p><strong>当然，我们应该充分利用 GitHub 带给我们的帮助，对于我来说，对于一个优秀的GitHub使用者来说，在工程代码开战前，你是否应该考虑 文档、测试先行、CI 帮助你自动推进。</strong></p>
<h2 id="测试覆盖率-coverage" tabindex="-1"><a class="header-anchor" href="#测试覆盖率-coverage" aria-hidden="true">#</a> 测试覆盖率 coverage</h2>
<p>对于 coverage 来说，对于开源项目无疑是非常重要的，如下：</p>
<p><img src="http://sm.cubxxw.com/sm202301141501718.png" alt="image-20230114150113512"></p>
<p>**覆盖率高达 98% 的项目，必然更受 contributor 喜爱。 **</p>
<p>当然，除此之外，code climate（代码审核）也很重要，4.0 的指数意味着质量的保证。</p>
<blockquote>
<p>Code Climate 是一个在线代码质量分析平台，可以帮助您提高代码质量并管理技术债务。它可以对您的代码进行静态分析，以检测和报告潜在的问题，如代码重复、漏洞、代码覆盖率等。</p>
<p>Code Climate 可以与 GitHub 集成，并在每次提交或拉取请求时自动运行分析。您可以在 Code Climate 的网站上查看分析报告和统计数据，并使用其中的工具来管理您的代码库。</p>
</blockquote>
<h2 id="获取-api" tabindex="-1"><a class="header-anchor" href="#获取-api" aria-hidden="true">#</a> 获取 API</h2>
<p>选择 <a href="https://fanyi.caiyunapp.com" target="_blank" rel="noopener noreferrer">彩云科技<ExternalLinkIcon/></a></p>
<p><img src="http://sm.cubxxw.com/sm202301141547085.png" alt="image-20230114154742796"></p>
<p><strong>接下来，我们就可以找到自己想要的数据了：</strong></p>
<p><img src="http://sm.cubxxw.com/sm202301141548925.png" alt="image-20230114154857843"></p>
<p><strong>下一步，我们想办法去 Golang 获取请求。</strong></p>
<h2 id="一键生成请求" tabindex="-1"><a class="header-anchor" href="#一键生成请求" aria-hidden="true">#</a> 一键生成请求</h2>
<p><strong>右键复制请求 cURL ，得到请求的 json 数据：</strong></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>curl 'https<span class="token operator">:</span><span class="token comment">//api.interpreter.caiyunai.com/v1/dict' \</span>
  -H 'authority<span class="token operator">:</span> api.interpreter.caiyunai.com' \
  -H 'accept<span class="token operator">:</span> application/json<span class="token punctuation">,</span> text/plain<span class="token punctuation">,</span> *<span class="token comment">/*' \
  -H 'accept-language: zh-CN,zh;q=0.9,zh-HK;q=0.8,en-ZA;q=0.7,en;q=0.6' \
  -H 'app-name: xy' \
  -H 'content-type: application/json;charset=UTF-8' \
  -H 'device-id;' \
  -H 'origin: https://fanyi.caiyunapp.com' \
  -H 'os-type: web' \
  -H 'os-version;' \
  -H 'referer: https://fanyi.caiyunapp.com/' \
  -H 'sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' \
  -H 'x-authorization: token:qgemv4jr1y38jyq6vhvi' \
  --data-raw '{"trans_type":"en2zh","source":"hello"}' \
  --compressed
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>生成代码：</strong></p>
<ul>
<li>[x] <a href="https://curlconverter.com/go/" target="_blank" rel="noopener noreferrer">网址<ExternalLinkIcon/></a></li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io/ioutil"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"strings"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">var</span> data <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span><span class="token string">`{"trans_type":"en2zh","source":"hello"}`</span><span class="token punctuation">)</span>
    
    <span class="token comment">//设置请求头</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">,</span> <span class="token string">"https://api.interpreter.caiyunai.com/v1/dict"</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"authority"</span><span class="token punctuation">,</span> <span class="token string">"api.interpreter.caiyunai.com"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"accept"</span><span class="token punctuation">,</span> <span class="token string">"application/json, text/plain, */*"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"accept-language"</span><span class="token punctuation">,</span> <span class="token string">"zh-CN,zh;q=0.9,zh-HK;q=0.8,en-ZA;q=0.7,en;q=0.6"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"app-name"</span><span class="token punctuation">,</span> <span class="token string">"xy"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"content-type"</span><span class="token punctuation">,</span> <span class="token string">"application/json;charset=UTF-8"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"device-id"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"origin"</span><span class="token punctuation">,</span> <span class="token string">"https://fanyi.caiyunapp.com"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"os-type"</span><span class="token punctuation">,</span> <span class="token string">"web"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"os-version"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"referer"</span><span class="token punctuation">,</span> <span class="token string">"https://fanyi.caiyunapp.com/"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"sec-ch-ua"</span><span class="token punctuation">,</span> `<span class="token string">"Not?A_Brand"</span><span class="token punctuation">;</span>v<span class="token operator">=</span><span class="token string">"8"</span><span class="token punctuation">,</span> <span class="token string">"Chromium"</span><span class="token punctuation">;</span>v<span class="token operator">=</span><span class="token string">"108"</span><span class="token punctuation">,</span> <span class="token string">"Google Chrome"</span><span class="token punctuation">;</span>v<span class="token operator">=</span><span class="token string">"108"</span><span class="token string">`)
	req.Header.Set("sec-ch-ua-mobile", "?0")
	req.Header.Set("sec-ch-ua-platform", `</span>"Windows"`<span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"sec-fetch-dest"</span><span class="token punctuation">,</span> <span class="token string">"empty"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"sec-fetch-mode"</span><span class="token punctuation">,</span> <span class="token string">"cors"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"sec-fetch-site"</span><span class="token punctuation">,</span> <span class="token string">"cross-site"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"user-agent"</span><span class="token punctuation">,</span> <span class="token string">"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"x-authorization"</span><span class="token punctuation">,</span> <span class="token string">"token:qgemv4jr1y38jyq6vhvi"</span><span class="token punctuation">)</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">//defer：栈</span>
	bodyText<span class="token punctuation">,</span> err <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s\n"</span><span class="token punctuation">,</span> bodyText<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>最近的<span class="token punctuation">\</span>awesome-golang<span class="token punctuation">\</span>docs<span class="token punctuation">\</span>code<span class="token punctuation">\</span>go-by-example<span class="token punctuation">\</span>simpledict<span class="token punctuation">\</span>v<span class="token operator"><span class="token file-descriptor important">4</span>></span> go run .<span class="token punctuation">\</span>test.go cloud
<span class="token punctuation">{</span><span class="token string">"rc"</span>:0,<span class="token string">"wiki"</span>:<span class="token punctuation">{</span><span class="token string">"known_in_laguages"</span>:19,<span class="token string">"description"</span>:<span class="token punctuation">{</span><span class="token string">"source"</span><span class="token builtin class-name">:</span><span class="token string">"salutation or greeting"</span>,<span class="token string">"target"</span>:null<span class="token punctuation">}</span>,<span class="token string">"id"</span><span class="token builtin class-name">:</span><span class="token string">"Q12068060"</span>,<span class="token string">"item"</span>:<span class="token punctuation">{</span><span class="token string">"source"</span><span class="token builtin class-name">:</span><span class="token string">"hello"</span>,<span class="token string">"target"</span><span class="token builtin class-name">:</span><span class="token string">"Hello"</span><span class="token punctuation">}</span>,<span class="token string">"image_url"</span><span class="token builtin class-name">:</span><span class="token string">"http:\/\/www.caiyunapp.com\/imgs\/link_default_img.png"</span>,<span class="token string">"is_subject"</span><span class="token builtin class-name">:</span><span class="token string">"true"</span>,<span class="token string">"sitelink"</span><span class="token builtin class-name">:</span><span class="token string">"https:\/\/www.caiyunapp.com\/read_mode\/?id=5c1654ca4faac90001a6f17a"</span><span class="token punctuation">}</span>,<span class="token string">"dictionary"</span>:<span class="token punctuation">{</span><span class="token string">"prons"</span>:<span class="token punctuation">{</span><span class="token string">"en-us"</span><span class="token builtin class-name">:</span><span class="token string">"[h<span class="token entity" title="\u0259">\u0259</span><span class="token entity" title="\u02c8">\u02c8</span>lo]"</span>,<span class="token string">"en"</span><span class="token builtin class-name">:</span><span class="token string">"[<span class="token entity" title="\u02c8">\u02c8</span>he<span class="token entity" title="\u02c8">\u02c8</span>l<span class="token entity" title="\u0259">\u0259</span>u]"</span><span class="token punctuation">}</span>,<span class="token string">"explanations"</span>:<span class="token punctuation">[</span><span class="token string">"int.<span class="token entity" title="\u5582">\u5582</span>;<span class="token entity" title="\u54c8">\u54c8</span><span class="token entity" title="\u7f57">\u7f57</span>"</span>,<span class="token string">"n.<span class="token entity" title="\u5f15">\u5f15</span><span class="token entity" title="\u4eba">\u4eba</span><span class="token entity" title="\u6ce8">\u6ce8</span><span class="token entity" title="\u610f">\u610f</span><span class="token entity" title="\u7684">\u7684</span><span class="token entity" title="\u547c">\u547c</span><span class="token entity" title="\u58f0">\u58f0</span>"</span>,<span class="token string">"v.<span class="token entity" title="\u5411">\u5411</span><span class="token entity" title="\u4eba">\u4eba</span><span class="token entity" title="\u547c">\u547c</span>(<span class="token entity" title="\u5582">\u5582</span>)"</span><span class="token punctuation">]</span>,<span class="token string">"synonym"</span>:<span class="token punctuation">[</span><span class="token string">"greetings"</span>,<span class="token string">"salutations"</span><span class="token punctuation">]</span>,<span class="token string">"antonym"</span>:<span class="token punctuation">[</span><span class="token punctuation">]</span>,<span class="token string">"wqx_example"</span>:<span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">"say hello to"</span>,<span class="token string">"<span class="token entity" title="\u5411">\u5411</span><span class="token entity" title="\u67d0">\u67d0</span><span class="token entity" title="\u4eba">\u4eba</span><span class="token entity" title="\u95ee">\u95ee</span><span class="token entity" title="\u5019">\u5019</span>,<span class="token entity" title="\u548c">\u548c</span><span class="token entity" title="\u67d0">\u67d0</span><span class="token entity" title="\u4eba">\u4eba</span><span class="token entity" title="\u6253">\u6253</span><span class="token entity" title="\u62db">\u62db</span><span class="token entity" title="\u547c">\u547c</span>"</span><span class="token punctuation">]</span>,<span class="token punctuation">[</span><span class="token string">"Say hello to him for me . "</span>,<span class="token string">"<span class="token entity" title="\u4ee3">\u4ee3</span><span class="token entity" title="\u6211">\u6211</span><span class="token entity" title="\u95ee">\u95ee</span><span class="token entity" title="\u5019">\u5019</span><span class="token entity" title="\u4ed6">\u4ed6</span><span class="token entity" title="\u3002">\u3002</span>"</span><span class="token punctuation">]</span><span class="token punctuation">]</span>,<span class="token string">"entry"</span><span class="token builtin class-name">:</span><span class="token string">"hello"</span>,<span class="token string">"type"</span><span class="token builtin class-name">:</span><span class="token string">"word"</span>,<span class="token string">"related"</span>:<span class="token punctuation">[</span><span class="token punctuation">]</span>,<span class="token string">"source"</span><span class="token builtin class-name">:</span><span class="token string">"wenquxing"</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>给出的请求序列化，得到的是 json反序列化即可~</strong></p>
<h2 id="列化-json" tabindex="-1"><a class="header-anchor" href="#列化-json" aria-hidden="true">#</a> 列化 json</h2>
<p>序列化方法：</p>
<p><img src="http://sm.cubxxw.com/sm202301141609708.png" alt="image-20230114160934553"></p>
<p><strong>变更：</strong></p>
<p><img src="http://sm.cubxxw.com/sm202301141612077.png" alt="image-20230114161211900"></p>
<h2 id="反序列化" tabindex="-1"><a class="header-anchor" href="#反序列化" aria-hidden="true">#</a> 反序列化</h2>
<ul>
<li>[x] <a href="https://oktools.net/" target="_blank" rel="noopener noreferrer">在线工具 - OKTools json转发其他语言结构体和代码<ExternalLinkIcon/></a></li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> AutoGenerated <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Rc <span class="token builtin">int</span> <span class="token string">`json:"rc"`</span>
	Wiki <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		KnownInLaguages <span class="token builtin">int</span> <span class="token string">`json:"known_in_laguages"`</span>
		Description <span class="token keyword">struct</span> <span class="token punctuation">{</span>
			Source <span class="token builtin">string</span> <span class="token string">`json:"source"`</span>
			Target <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token string">`json:"target"`</span>
		<span class="token punctuation">}</span> <span class="token string">`json:"description"`</span>
		ID <span class="token builtin">string</span> <span class="token string">`json:"id"`</span>
		Item <span class="token keyword">struct</span> <span class="token punctuation">{</span>
			Source <span class="token builtin">string</span> <span class="token string">`json:"source"`</span>
			Target <span class="token builtin">string</span> <span class="token string">`json:"target"`</span>
		<span class="token punctuation">}</span> <span class="token string">`json:"item"`</span>
		ImageURL <span class="token builtin">string</span> <span class="token string">`json:"image_url"`</span>
		IsSubject <span class="token builtin">string</span> <span class="token string">`json:"is_subject"`</span>
		Sitelink <span class="token builtin">string</span> <span class="token string">`json:"sitelink"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"wiki"`</span>
	Dictionary <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Prons <span class="token keyword">struct</span> <span class="token punctuation">{</span>
			EnUs <span class="token builtin">string</span> <span class="token string">`json:"en-us"`</span>
			En <span class="token builtin">string</span> <span class="token string">`json:"en"`</span>
		<span class="token punctuation">}</span> <span class="token string">`json:"prons"`</span>
		Explanations <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`json:"explanations"`</span>
		Synonym <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`json:"synonym"`</span>
		Antonym <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token string">`json:"antonym"`</span>
		WqxExample <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`json:"wqx_example"`</span>
		Entry <span class="token builtin">string</span> <span class="token string">`json:"entry"`</span>
		Type <span class="token builtin">string</span> <span class="token string">`json:"type"`</span>
		Related <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token string">`json:"related"`</span>
		Source <span class="token builtin">string</span> <span class="token string">`json:"source"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"dictionary"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="源码和测试" tabindex="-1"><a class="header-anchor" href="#源码和测试" aria-hidden="true">#</a> 源码和测试</h2>
<p><strong>💡简单的一个案例如下：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bytes"</span>
	<span class="token string">"encoding/json"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io/ioutil"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token comment">/*
cURL
*/</span>

<span class="token keyword">type</span> DictRequest <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	TransType <span class="token builtin">string</span> <span class="token string">`json:"trans_type"`</span>
	Source    <span class="token builtin">string</span> <span class="token string">`json:"source"`</span>
	UserID    <span class="token builtin">string</span> <span class="token string">`json:"user_id"`</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> DictResponse <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Rc   <span class="token builtin">int</span> <span class="token string">`json:"rc"`</span>
	Wiki <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		KnownInLaguages <span class="token builtin">int</span> <span class="token string">`json:"known_in_laguages"`</span>
		Description     <span class="token keyword">struct</span> <span class="token punctuation">{</span>
			Source <span class="token builtin">string</span>      <span class="token string">`json:"source"`</span>
			Target <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token string">`json:"target"`</span>
		<span class="token punctuation">}</span> <span class="token string">`json:"description"`</span>
		ID   <span class="token builtin">string</span> <span class="token string">`json:"id"`</span>
		Item <span class="token keyword">struct</span> <span class="token punctuation">{</span>
			Source <span class="token builtin">string</span> <span class="token string">`json:"source"`</span>
			Target <span class="token builtin">string</span> <span class="token string">`json:"target"`</span>
		<span class="token punctuation">}</span> <span class="token string">`json:"item"`</span>
		ImageURL  <span class="token builtin">string</span> <span class="token string">`json:"image_url"`</span>
		IsSubject <span class="token builtin">string</span> <span class="token string">`json:"is_subject"`</span>
		Sitelink  <span class="token builtin">string</span> <span class="token string">`json:"sitelink"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"wiki"`</span>
	Dictionary <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Prons <span class="token keyword">struct</span> <span class="token punctuation">{</span>
			EnUs <span class="token builtin">string</span> <span class="token string">`json:"en-us"`</span>
			En   <span class="token builtin">string</span> <span class="token string">`json:"en"`</span>
		<span class="token punctuation">}</span> <span class="token string">`json:"prons"`</span>
		Explanations <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>      <span class="token string">`json:"explanations"`</span>
		Synonym      <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>      <span class="token string">`json:"synonym"`</span>
		Antonym      <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>      <span class="token string">`json:"antonym"`</span>
		WqxExample   <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>    <span class="token string">`json:"wqx_example"`</span>
		Entry        <span class="token builtin">string</span>        <span class="token string">`json:"entry"`</span>
		Type         <span class="token builtin">string</span>        <span class="token string">`json:"type"`</span>
		Related      <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token string">`json:"related"`</span>
		Source       <span class="token builtin">string</span>        <span class="token string">`json:"source"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"dictionary"`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">query</span><span class="token punctuation">(</span>word <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>
	request <span class="token operator">:=</span> DictRequest<span class="token punctuation">{</span>TransType<span class="token punctuation">:</span> <span class="token string">"en2zh"</span><span class="token punctuation">,</span> Source<span class="token punctuation">:</span> word<span class="token punctuation">}</span>
	buf<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">var</span> data <span class="token operator">=</span> bytes<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"POST"</span><span class="token punctuation">,</span> <span class="token string">"https://api.interpreter.caiyunai.com/v1/dict"</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Connection"</span><span class="token punctuation">,</span> <span class="token string">"keep-alive"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"DNT"</span><span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"os-version"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"sec-ch-ua-mobile"</span><span class="token punctuation">,</span> <span class="token string">"?0"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"User-Agent"</span><span class="token punctuation">,</span> <span class="token string">"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"app-name"</span><span class="token punctuation">,</span> <span class="token string">"xy"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">,</span> <span class="token string">"application/json;charset=UTF-8"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Accept"</span><span class="token punctuation">,</span> <span class="token string">"application/json, text/plain, */*"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"device-id"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"os-type"</span><span class="token punctuation">,</span> <span class="token string">"web"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"X-Authorization"</span><span class="token punctuation">,</span> <span class="token string">"token:qgemv4jr1y38jyq6vhvi"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Origin"</span><span class="token punctuation">,</span> <span class="token string">"https://fanyi.caiyunapp.com"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Sec-Fetch-Site"</span><span class="token punctuation">,</span> <span class="token string">"cross-site"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Sec-Fetch-Mode"</span><span class="token punctuation">,</span> <span class="token string">"cors"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Sec-Fetch-Dest"</span><span class="token punctuation">,</span> <span class="token string">"empty"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Referer"</span><span class="token punctuation">,</span> <span class="token string">"https://fanyi.caiyunapp.com/"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Accept-Language"</span><span class="token punctuation">,</span> <span class="token string">"zh-CN,zh;q=0.9"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Cookie"</span><span class="token punctuation">,</span> <span class="token string">"_ym_uid=16456948721020430059; _ym_d=1645694872"</span><span class="token punctuation">)</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	bodyText<span class="token punctuation">,</span> err <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> resp<span class="token punctuation">.</span>StatusCode <span class="token operator">!=</span> <span class="token number">200</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"bad StatusCode:"</span><span class="token punctuation">,</span> resp<span class="token punctuation">.</span>StatusCode<span class="token punctuation">,</span> <span class="token string">"body"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>bodyText<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">var</span> dictResponse DictResponse
	err <span class="token operator">=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>bodyText<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dictResponse<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> <span class="token string">"UK:"</span><span class="token punctuation">,</span> dictResponse<span class="token punctuation">.</span>Dictionary<span class="token punctuation">.</span>Prons<span class="token punctuation">.</span>En<span class="token punctuation">,</span> <span class="token string">"US:"</span><span class="token punctuation">,</span> dictResponse<span class="token punctuation">.</span>Dictionary<span class="token punctuation">.</span>Prons<span class="token punctuation">.</span>EnUs<span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> item <span class="token operator">:=</span> <span class="token keyword">range</span> dictResponse<span class="token punctuation">.</span>Dictionary<span class="token punctuation">.</span>Explanations <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stderr<span class="token punctuation">,</span> <span class="token string">`usage: simpleDict WORD
example: simpleDict hello
		`</span><span class="token punctuation">)</span>
		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	word <span class="token operator">:=</span> os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
	<span class="token function">query</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码是使用 Go 语言请求翻译 API，然后对响应数据进行解析。</p>
<p>首先是导入了一些 Go 内置库，其中 &quot;net/http&quot; 和 &quot;encoding/json&quot; 在本代码中起到重要作用。</p>
<p>接着定义了 DictRequest 和 DictResponse 两个结构体，它们分别用于请求数据和响应数据的解析。</p>
<p>query 函数中，首先创建了一个 http.Client 实例，然后使用 json.Marshal 将请求数据转换为 json 格式，并使用 http.NewRequest 创建了一个新的请求。</p>
<p>接着设置请求头信息，这些信息都是请求 API 所需的。最后调用 client.Do 函数发送请求。</p>
<p>在这里，响应数据被解析到了 DictResponse 结构体中，并输出到终端。</p>
<p><strong>🚀 编译结果如下：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>PS D:\文档\最近的\awesome-golang\docs\code\go-by-example\simpledict\v4> go run .\main.go  cub   
cub UK: [kʌb] US: [kʌb]
n.幼仔
[俗]初出茅庐者
[口语]小伙子;牛栏;牛棚;饲料槽
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/22.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/24.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


