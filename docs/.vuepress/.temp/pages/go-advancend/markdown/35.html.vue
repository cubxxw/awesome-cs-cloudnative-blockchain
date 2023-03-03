<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第35节-12-factors" tabindex="-1"><a class="header-anchor" href="#第35节-12-factors" aria-hidden="true">#</a> 第35节 12 factors</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/34.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<ul>
<li><a href="https://12factor.net/" target="_blank" rel="noopener noreferrer">节选 12 factor 基于此学习并补充~<ExternalLinkIcon/></a></li>
</ul>
<p>在现代，软件通常作为服务交付：称为<em>网络应用程序</em>或<em>软件即服务</em>。十二因素应用程序是一种用于构建软件即服务应用程序的方法，它：</p>
<ul>
<li>使用<strong>声明式</strong>格式进行设置自动化，以最大限度地减少新开发人员加入项目的时间和成本；</li>
<li>与底层操作系统有一个<strong>干净的合同</strong>，在执行环境之间提供<strong>最大的可移植性；</strong></li>
<li>适合<strong>部署</strong>在现代<strong>云平台</strong>上，无需服务器和系统管理；</li>
<li><strong>最大限度地减少开发和生产之间的差异</strong>，实现<strong>持续部署</strong>以实现最大的敏捷性；</li>
<li>并且可以在不对工具、架构或开发实践进行重大更改的情况下<strong>进行扩展。</strong></li>
</ul>
<p>十二因素方法论可以应用于以任何编程语言编写的应用程序，这些应用程序使用支持服务（数据库、队列、内存缓存等）的任意组合。</p>
<h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2>
<p>本文档的贡献者直接参与了数百个应用程序的开发和部署，并通过我们在 Heroku 平台上的工作间接见证了数十万个应用程序的开发、运行和<a href="http://www.heroku.com/" target="_blank" rel="noopener noreferrer">扩展<ExternalLinkIcon/></a>。</p>
<p>本文档综合了我们对各种各样的软件即服务应用程序的所有经验和观察。它是对应用程序开发理想实践的三角测量，特别关注应用程序随时间有机增长的动态、开发应用程序代码库的开发人员之间的协作动态，以及避免软件侵蚀的<a href="http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/" target="_blank" rel="noopener noreferrer">成本<ExternalLinkIcon/></a>。</p>
<p>我们的动机是提高对我们在现代应用程序开发中看到的一些系统性问题的认识，提供一个共享的词汇表来讨论这些问题，并为这些问题提供一组广泛的概念性解决方案以及附带的术语。该格式的灵感来自 Martin Fowler 的书籍*<a href="https://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC" target="_blank" rel="noopener noreferrer">Patterns of Enterprise Application Architecture<ExternalLinkIcon/></a>* and <em><a href="https://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C" target="_blank" rel="noopener noreferrer">Refactoring<ExternalLinkIcon/></a></em>。</p>
<h2 id="基准代码" tabindex="-1"><a class="header-anchor" href="#基准代码" aria-hidden="true">#</a> 基准代码</h2>
<blockquote>
<p>一份基准代码（<em>Codebase</em>），多份部署（<em>deploy</em>）</p>
</blockquote>
<p>12-Factor应用(译者注：应该是说一个使用本文概念来设计的应用，下同)通常会使用版本控制系统加以管理，如<a href="http://git-scm.com/" target="_blank" rel="noopener noreferrer">Git<ExternalLinkIcon/></a>, <a href="https://www.mercurial-scm.org/" target="_blank" rel="noopener noreferrer">Mercurial<ExternalLinkIcon/></a>, <a href="http://subversion.apache.org/" target="_blank" rel="noopener noreferrer">Subversion<ExternalLinkIcon/></a>。一份用来跟踪代码所有修订版本的数据库被称作 <em>代码库</em>（code repository, code repo, repo）。</p>
<p>在类似 SVN 这样的集中式版本控制系统中，<em>基准代码</em> 就是指控制系统中的这一份代码库；而在 Git 那样的分布式版本控制系统中，<em>基准代码</em>  则是指最上游的那份代码库。</p>
<p><img src="http://sm.nsddd.top/sm202302262130214.png" alt="一份代码库对应多份部署"></p>
<p>基准代码和应用之间总是保持一一对应的关系：</p>
<ul>
<li>一旦有多个基准代码，就不能称为一个应用，而是一个分布式系统。分布式系统中的每一个组件都是一个应用，每一个应用可以分别使用 12-Factor 进行开发。</li>
<li>多个应用共享一份基准代码是有悖于 12-Factor 原则的。解决方案是将共享的代码拆分为独立的类库，然后使用 <a href="https://12factor.net/zh_cn/dependencies" target="_blank" rel="noopener noreferrer">依赖管理<ExternalLinkIcon/></a> 策略去加载它们。</li>
</ul>
<p>尽管每个应用只对应一份基准代码，但可以同时存在多份部署。每份 <em>部署</em> 相当于运行了一个应用的实例。通常会有一个生产环境，一个或多个预发布环境。此外，每个开发人员都会在自己本地环境运行一个应用实例，这些都相当于一份部署。</p>
<p>所有部署的基准代码相同，但每份部署可以使用其不同的版本。比如，开发人员可能有一些提交还没有同步至预发布环境；预发布环境也有一些提交没有同步至生产环境。但它们都共享一份基准代码，我们就认为它们只是相同应用的不同部署而已。</p>
<h2 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h2>
<blockquote>
<p>显式声明依赖关系（ <em>dependency</em> ）</p>
</blockquote>
<p>大多数编程语言都会提供一个打包系统，用来为各个类库提供打包服务，就像 Perl 的 <a href="http://www.cpan.org/" target="_blank" rel="noopener noreferrer">CPAN<ExternalLinkIcon/></a> 或是 Ruby 的 <a href="http://rubygems.org/" target="_blank" rel="noopener noreferrer">Rubygems<ExternalLinkIcon/></a> 。通过打包系统安装的类库可以是系统级的（称之为 “site packages”），或仅供某个应用程序使用，部署在相应的目录中（称之为 “vendoring” 或 “bunding”）。</p>
<p><strong>12-Factor规则下的应用程序不会隐式依赖系统级的类库。</strong> 它一定通过 <em>依赖清单</em> ，确切地声明所有依赖项。此外，在运行过程中通过 <em>依赖隔离</em> 工具来确保程序不会调用系统中存在但清单中未声明的依赖项。这一做法会统一应用到生产和开发环境。</p>
<p>例如， Ruby 的 <a href="https://bundler.io/" target="_blank" rel="noopener noreferrer">Bundler<ExternalLinkIcon/></a> 使用 <code v-pre>Gemfile</code> 作为依赖项声明清单，使用 <code v-pre>bundle exec</code> 来进行依赖隔离。Python 中则可分别使用两种工具 – <a href="http://www.pip-installer.org/en/latest/" target="_blank" rel="noopener noreferrer">Pip<ExternalLinkIcon/></a> 用作依赖声明， <a href="http://www.virtualenv.org/en/latest/" target="_blank" rel="noopener noreferrer">Virtualenv<ExternalLinkIcon/></a> 用作依赖隔离。甚至 C 语言也有类似工具， <a href="http://www.gnu.org/s/autoconf/" target="_blank" rel="noopener noreferrer">Autoconf<ExternalLinkIcon/></a> 用作依赖声明，静态链接库用作依赖隔离。无论用什么工具，依赖声明和依赖隔离必须一起使用，否则无法满足 12-Factor 规范。</p>
<p>显式声明依赖的优点之一是为新进开发者简化了环境配置流程。新进开发者可以检出应用程序的基准代码，安装编程语言环境和它对应的依赖管理工具，只需通过一个 <em>构建命令</em> 来安装所有的依赖项，即可开始工作。例如，Ruby/Bundler 下使用 <code v-pre>bundle install</code>，而 Clojure/<a href="https://github.com/technomancy/leiningen#readme" target="_blank" rel="noopener noreferrer">Leiningen<ExternalLinkIcon/></a> 则是 <code v-pre>lein deps</code>。</p>
<p>12-Factor 应用同样不会隐式依赖某些系统工具，如 ImageMagick 或是<code v-pre>curl</code>。即使这些工具存在于几乎所有系统，但终究无法保证所有未来的系统都能支持应用顺利运行，或是能够和应用兼容。如果应用必须使用到某些系统工具，那么这些工具应该被包含在应用之中。</p>
<h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2>
<blockquote>
<p>在环境中存储配置</p>
</blockquote>
<p>通常，应用的 <em>配置</em> 在不同 <a href="https://12factor.net/zh_cn/codebase" target="_blank" rel="noopener noreferrer">部署<ExternalLinkIcon/></a> (预发布、生产环境、开发环境等等)间会有很大差异。这其中包括：</p>
<ul>
<li>数据库，Memcached，以及其他 <a href="https://12factor.net/zh_cn/backing-services" target="_blank" rel="noopener noreferrer">后端服务<ExternalLinkIcon/></a> 的配置</li>
<li>第三方服务的证书，如 Amazon S3、Twitter 等</li>
<li>每份部署特有的配置，如域名等</li>
</ul>
<p>有些应用在代码中使用常量保存配置，这与 12-Factor 所要求的<strong>代码和配置严格分离</strong>显然大相径庭。配置文件在各部署间存在大幅差异，代码却完全一致。</p>
<p>判断一个应用是否正确地将配置排除在代码之外，一个简单的方法是看该应用的基准代码是否可以立刻开源，而不用担心会暴露任何敏感的信息。</p>
<p>需要指出的是，这里定义的“配置”并<strong>不</strong>包括应用的内部配置，比如 Rails 的 <code v-pre>config/routes.rb</code>，或是使用 <a href="http://spring.io/" target="_blank" rel="noopener noreferrer">Spring<ExternalLinkIcon/></a> 时 <a href="http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html" target="_blank" rel="noopener noreferrer">代码模块间的依赖注入关系<ExternalLinkIcon/></a> 。这类配置在不同部署间不存在差异，所以应该写入代码。</p>
<p>另外一个解决方法是使用配置文件，但不把它们纳入版本控制系统，就像 Rails 的 <code v-pre>config/database.yml</code> 。这相对于在代码中使用常量已经是长足进步，但仍然有缺点：总是会不小心将配置文件签入了代码库；配置文件的可能会分散在不同的目录，并有着不同的格式，这让找出一个地方来统一管理所有配置变的不太现实。更糟的是，这些格式通常是语言或框架特定的。</p>
<p><strong>12-Factor推荐将应用的配置存储于 *环境变量* 中</strong>（ <em>env vars</em>, <em>env</em> ）。环境变量可以非常方便地在不同的部署间做修改，却不动一行代码；与配置文件不同，不小心把它们签入代码库的概率微乎其微；与一些传统的解决配置问题的机制（比如 Java 的属性配置文件）相比，环境变量与语言和系统无关。</p>
<p>配置管理的另一个方面是分组。有时应用会将配置按照特定部署进行分组（或叫做“环境”），例如Rails中的 <code v-pre>development</code>,<code v-pre>test</code>, 和 <code v-pre>production</code> 环境。这种方法无法轻易扩展：更多部署意味着更多新的环境，例如 <code v-pre>staging</code> 或 <code v-pre>qa</code> 。 随着项目的不断深入，开发人员可能还会添加他们自己的环境，比如 <code v-pre>joes-staging</code> ，这将导致各种配置组合的激增，从而给管理部署增加了很多不确定因素。</p>
<p>12-Factor 应用中，环境变量的粒度要足够小，且相对独立。它们永远也不会组合成一个所谓的“环境”，而是独立存在于每个部署之中。当应用程序不断扩展，需要更多种类的部署时，这种配置管理方式能够做到平滑过渡。</p>
<h2 id="iv-后端服务" tabindex="-1"><a class="header-anchor" href="#iv-后端服务" aria-hidden="true">#</a> IV. 后端服务</h2>
<blockquote>
<p>把后端服务(<em>backing services</em>)当作附加资源</p>
</blockquote>
<p><em>后端服务</em>是指程序运行所需要的通过网络调用的各种服务，如数据库（<a href="http://dev.mysql.com/" target="_blank" rel="noopener noreferrer">MySQL<ExternalLinkIcon/></a>，<a href="http://couchdb.apache.org/" target="_blank" rel="noopener noreferrer">CouchDB<ExternalLinkIcon/></a>），消息/队列系统（<a href="http://www.rabbitmq.com/" target="_blank" rel="noopener noreferrer">RabbitMQ<ExternalLinkIcon/></a>，<a href="https://beanstalkd.github.io/" target="_blank" rel="noopener noreferrer">Beanstalkd<ExternalLinkIcon/></a>），SMTP 邮件发送服务（<a href="http://www.postfix.org/" target="_blank" rel="noopener noreferrer">Postfix<ExternalLinkIcon/></a>），以及缓存系统（<a href="http://memcached.org/" target="_blank" rel="noopener noreferrer">Memcached<ExternalLinkIcon/></a>）。</p>
<p>类似数据库的后端服务，通常由部署应用程序的系统管理员一起管理。除了本地服务之外，应用程序有可能使用了第三方发布和管理的服务。示例包括 SMTP（例如 <a href="http://postmarkapp.com/" target="_blank" rel="noopener noreferrer">Postmark<ExternalLinkIcon/></a>），数据收集服务（例如 <a href="http://newrelic.com/" target="_blank" rel="noopener noreferrer">New Relic<ExternalLinkIcon/></a> 或 <a href="http://www.loggly.com/" target="_blank" rel="noopener noreferrer">Loggly<ExternalLinkIcon/></a>），数据存储服务（如 <a href="http://http//aws.amazon.com/s3/" target="_blank" rel="noopener noreferrer">Amazon S3<ExternalLinkIcon/></a>），以及使用 API 访问的服务（例如 <a href="http://dev.twitter.com/" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>, <a href="https://developers.google.com/maps/" target="_blank" rel="noopener noreferrer">Google Maps<ExternalLinkIcon/></a>, <a href="http://www.last.fm/api" target="_blank" rel="noopener noreferrer">Last.fm<ExternalLinkIcon/></a>）。</p>
<p><strong>12-Factor 应用不会区别对待本地或第三方服务。</strong> 对应用程序而言，两种都是附加资源，通过一个 url 或是其他存储在 <a href="https://12factor.net/zh_cn/config" target="_blank" rel="noopener noreferrer">配置<ExternalLinkIcon/></a> 中的服务定位/服务证书来获取数据。12-Factor 应用的任意 <a href="https://12factor.net/zh_cn/codebase" target="_blank" rel="noopener noreferrer">部署<ExternalLinkIcon/></a> ，都应该可以在不进行任何代码改动的情况下，将本地 MySQL 数据库换成第三方服务（例如 <a href="http://aws.amazon.com/rds/" target="_blank" rel="noopener noreferrer">Amazon RDS<ExternalLinkIcon/></a>）。类似的，本地 SMTP 服务应该也可以和第三方 SMTP 服务（例如 Postmark ）互换。上述 2 个例子中，仅需修改配置中的资源地址。</p>
<p>每个不同的后端服务是一份 <em>资源</em> 。例如，一个 MySQL 数据库是一个资源，两个 MySQL 数据库（用来数据分区）就被当作是 2 个不同的资源。12-Factor 应用将这些数据库都视作 <em>附加资源</em> ，这些资源和它们附属的部署保持松耦合。</p>
<p><img src="http://sm.nsddd.top/sm202302272244649.png" alt="一种部署附加4个后端服务"></p>
<p>部署可以按需加载或卸载资源。例如，如果应用的数据库服务由于硬件问题出现异常，管理员可以从最近的备份中恢复一个数据库，<strong>卸载当前的数据库，然后加载新的数据库 – 整个过程都不需要修改代码。</strong></p>
<h2 id="构建-发布-运行" tabindex="-1"><a class="header-anchor" href="#构建-发布-运行" aria-hidden="true">#</a> 构建，发布，运行</h2>
<blockquote>
<p>严格分离构建和运行</p>
</blockquote>
<p><a href="https://12factor.net/zh_cn/codebase" target="_blank" rel="noopener noreferrer">基准代码<ExternalLinkIcon/></a> 转化为一份部署(非开发环境)需要以下三个阶段：</p>
<ul>
<li><em>构建阶段</em> 是指将代码仓库转化为可执行包的过程。构建时会使用指定版本的代码，获取和打包 <a href="https://12factor.net/zh_cn/dependencies" target="_blank" rel="noopener noreferrer">依赖项<ExternalLinkIcon/></a>，编译成二进制文件和资源文件。</li>
<li><em>发布阶段</em> 会将构建的结果和当前部署所需 <a href="https://12factor.net/zh_cn/config" target="_blank" rel="noopener noreferrer">配置<ExternalLinkIcon/></a> 相结合，并能够立刻在运行环境中投入使用。</li>
<li><em>运行阶段</em> （或者说“运行时”）是指针对选定的发布版本，在执行环境中启动一系列应用程序 <a href="https://12factor.net/zh_cn/processes" target="_blank" rel="noopener noreferrer">进程<ExternalLinkIcon/></a>。</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202302272245783.png" alt="代码被构建，然后和配置结合成为发布版本"></p>
<p><strong>12-factor 应用严格区分构建，发布，运行这三个步骤。</strong> 举例来说，直接修改处于运行状态的代码是非常不可取的做法，因为这些修改很难再同步回构建步骤。</p>
<p>部署工具通常都提供了发布管理工具，最引人注目的功能是退回至较旧的发布版本。比如， <a href="https://github.com/capistrano/capistrano/wiki" target="_blank" rel="noopener noreferrer">Capistrano<ExternalLinkIcon/></a> 将所有发布版本都存储在一个叫 <code v-pre>releases</code> 的子目录中，当前的在线版本只需映射至对应的目录即可。该工具的 <code v-pre>rollback</code> 命令可以很容易地实现回退版本的功能。</p>
<p>每一个发布版本必须对应一个唯一的发布 ID，例如可以使用发布时的时间戳（<code v-pre>2011-04-06-20:32:17</code>），亦或是一个增长的数字（<code v-pre>v100</code>）。发布的版本就像一本只能追加的账本，一旦发布就不可修改，任何的变动都应该产生一个新的发布版本。</p>
<p>新的代码在部署之前，需要开发人员触发构建操作。但是，运行阶段不一定需要人为触发，而是可以自动进行。如服务器重启，或是进程管理器重启了一个崩溃的进程。因此，运行阶段应该保持尽可能少的模块，这样假设半夜发生系统故障而开发人员又捉襟见肘也不会引起太大问题。构建阶段是可以相对复杂一些的，因为错误信息能够立刻展示在开发人员面前，从而得到妥善处理。</p>
<h2 id="进程" tabindex="-1"><a class="header-anchor" href="#进程" aria-hidden="true">#</a> 进程</h2>
<blockquote>
<p>以一个或多个无状态进程运行应用</p>
</blockquote>
<p>运行环境中，应用程序通常是以一个和多个 <em>进程</em> 运行的。</p>
<p>最简单的场景中，代码是一个独立的脚本，运行环境是开发人员自己的笔记本电脑，进程由一条命令行（例如<code v-pre>python my_script.py</code>）。另外一个极端情况是，复杂的应用可能会使用很多 <a href="https://12factor.net/zh_cn/concurrency" target="_blank" rel="noopener noreferrer">进程类型<ExternalLinkIcon/></a> ，也就是零个或多个进程实例。</p>
<p><strong>12-Factor 应用的进程必须无状态且 <a href="http://en.wikipedia.org/wiki/Shared_nothing_architecture" target="_blank" rel="noopener noreferrer">无共享<ExternalLinkIcon/></a> 。</strong> 任何需要持久化的数据都要存储在 <a href="https://12factor.net/zh_cn/backing-services" target="_blank" rel="noopener noreferrer">后端服务<ExternalLinkIcon/></a> 内，比如数据库。</p>
<p>内存区域或磁盘空间可以作为进程在做某种事务型操作时的缓存，例如下载一个很大的文件，对其操作并将结果写入数据库的过程。12-Factor应用根本不用考虑这些缓存的内容是不是可以保留给之后的请求来使用，这是因为应用启动了多种类型的进程，将来的请求多半会由其他进程来服务。即使在只有一个进程的情形下，先前保存的数据（内存或文件系统中）也会因为重启（如代码部署、配置更改、或运行环境将进程调度至另一个物理区域执行）而丢失。</p>
<p>源文件打包工具（<a href="http://documentcloud.github.com/jammit/" target="_blank" rel="noopener noreferrer">Jammit<ExternalLinkIcon/></a>, <a href="http://django-compressor.readthedocs.org/" target="_blank" rel="noopener noreferrer">django-compressor<ExternalLinkIcon/></a>） 使用文件系统来缓存编译过的源文件。12-Factor 应用更倾向于在 <a href="https://12factor.net/zh_cn/build-release-run" target="_blank" rel="noopener noreferrer">构建步骤<ExternalLinkIcon/></a> 做此动作——正如 <a href="http://guides.rubyonrails.org/asset_pipeline.html" target="_blank" rel="noopener noreferrer">Rails资源管道<ExternalLinkIcon/></a> ，而不是在运行阶段。</p>
<p>一些互联网系统依赖于 “<a href="http://en.wikipedia.org/wiki/Load_balancing_(computing)#Persistence" target="_blank" rel="noopener noreferrer">粘性 session<ExternalLinkIcon/></a>”， 这是指将用户 session 中的数据缓存至某进程的内存中，并将同一用户的后续请求路由到同一个进程。粘性 session 是 12-Factor 极力反对的。Session 中的数据应该保存在诸如 <a href="http://memcached.org/" target="_blank" rel="noopener noreferrer">Memcached<ExternalLinkIcon/></a> 或 <a href="http://redis.io/" target="_blank" rel="noopener noreferrer">Redis<ExternalLinkIcon/></a> 这样的带有过期时间的缓存中。</p>
<h2 id="端口绑定" tabindex="-1"><a class="header-anchor" href="#端口绑定" aria-hidden="true">#</a> 端口绑定</h2>
<blockquote>
<p>通过端口绑定(<em>Port binding</em>)来提供服务</p>
</blockquote>
<p>互联网应用有时会运行于服务器的容器之中。例如 PHP 经常作为 <a href="http://httpd.apache.org/" target="_blank" rel="noopener noreferrer">Apache HTTPD<ExternalLinkIcon/></a> 的一个模块来运行，正如 Java 运行于 <a href="http://tomcat.apache.org/" target="_blank" rel="noopener noreferrer">Tomcat<ExternalLinkIcon/></a> 。</p>
<p><strong>12-Factor 应用完全自我加载</strong> 而不依赖于任何网络服务器就可以创建一个面向网络的服务。互联网应用 <strong>通过端口绑定来提供服务</strong> ，并监听发送至该端口的请求。</p>
<p>本地环境中，开发人员通过类似<code v-pre>http://localhost:5000/</code>的地址来访问服务。在线上环境中，请求统一发送至公共域名而后路由至绑定了端口的网络进程。</p>
<p>通常的实现思路是，将网络服务器类库通过 <a href="https://12factor.net/zh_cn/dependencies" target="_blank" rel="noopener noreferrer">依赖声明<ExternalLinkIcon/></a> 载入应用。例如，Python 的 <a href="http://www.tornadoweb.org/" target="_blank" rel="noopener noreferrer">Tornado<ExternalLinkIcon/></a>, Ruby 的<a href="http://code.macournoyer.com/thin/" target="_blank" rel="noopener noreferrer">Thin<ExternalLinkIcon/></a> , Java 以及其他基于 JVM 语言的 <a href="http://www.eclipse.org/jetty/" target="_blank" rel="noopener noreferrer">Jetty<ExternalLinkIcon/></a>。完全由 <em>用户端</em> ，确切的说应该是应用的代码，发起请求。和运行环境约定好绑定的端口即可处理这些请求。</p>
<p>HTTP 并不是唯一一个可以由端口绑定提供的服务。其实几乎所有服务器软件都可以通过进程绑定端口来等待请求。例如，使用 <a href="http://xmpp.org/" target="_blank" rel="noopener noreferrer">XMPP<ExternalLinkIcon/></a> 的 <a href="http://www.ejabberd.im/" target="_blank" rel="noopener noreferrer">ejabberd<ExternalLinkIcon/></a> ， 以及使用 <a href="http://redis.io/topics/protocol" target="_blank" rel="noopener noreferrer">Redis 协议<ExternalLinkIcon/></a> 的 <a href="http://redis.io/" target="_blank" rel="noopener noreferrer">Redis<ExternalLinkIcon/></a> 。</p>
<p>还要指出的是，端口绑定这种方式也意味着一个应用可以成为另外一个应用的 <a href="https://12factor.net/zh_cn/backing-services" target="_blank" rel="noopener noreferrer">后端服务<ExternalLinkIcon/></a> ，调用方将服务方提供的相应 URL 当作资源存入 <a href="https://12factor.net/zh_cn/config" target="_blank" rel="noopener noreferrer">配置<ExternalLinkIcon/></a> 以备将来调用。</p>
<h2 id="并发" tabindex="-1"><a class="header-anchor" href="#并发" aria-hidden="true">#</a> 并发</h2>
<blockquote>
<p>通过进程模型进行扩展</p>
</blockquote>
<p>任何计算机程序，一旦启动，就会生成一个或多个进程。互联网应用采用多种进程运行方式。例如，PHP 进程作为 Apache 的子进程存在，随请求按需启动。Java 进程则采取了相反的方式，在程序启动之初 JVM 就提供了一个超级进程储备了大量的系统资源(CPU 和内存)，并通过多线程实现内部的并发管理。上述 2 个例子中，进程是开发人员可以操作的最小单位。</p>
<p><img src="http://sm.nsddd.top/sm202302272252313.png" alt="扩展表现为运行中的进程，工作多样性表现为进程类型。"></p>
<p>**在 12-factor 应用中，进程是一等公民。**12-Factor 应用的进程主要借鉴于 <a href="https://adam.herokuapp.com/past/2011/5/9/applying_the_unix_process_model_to_web_apps/" target="_blank" rel="noopener noreferrer">unix 守护进程模型<ExternalLinkIcon/></a> 。开发人员可以运用这个模型去设计应用架构，将不同的工作分配给不同的 <em>进程类型</em> 。例如，HTTP 请求可以交给 web 进程来处理，而常驻的后台工作则交由 worker 进程负责。</p>
<p>这并不包括个别较为特殊的进程，例如通过虚拟机的线程处理并发的内部运算，或是使用诸如 <a href="https://github.com/eventmachine/eventmachine" target="_blank" rel="noopener noreferrer">EventMachine<ExternalLinkIcon/></a>, <a href="http://twistedmatrix.com/trac/" target="_blank" rel="noopener noreferrer">Twisted<ExternalLinkIcon/></a>, <a href="http://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js<ExternalLinkIcon/></a> 的异步/事件触发模型。但一台独立的虚拟机的扩展有瓶颈（垂直扩展），所以应用程序必须可以在多台物理机器间跨进程工作。</p>
<p>上述进程模型会在系统急需扩展时大放异彩。 <a href="https://12factor.net/zh_cn/processes" target="_blank" rel="noopener noreferrer">12-Factor 应用的进程所具备的无共享，水平分区的特性<ExternalLinkIcon/></a> 意味着添加并发会变得简单而稳妥。这些进程的类型以及每个类型中进程的数量就被称作 <em>进程构成</em> 。</p>
<p>12-Factor 应用的进程 <a href="http://dustin.github.com/2010/02/28/running-processes.html" target="_blank" rel="noopener noreferrer">不需要守护进程<ExternalLinkIcon/></a> 或是写入 PID 文件。相反的，应该借助操作系统的进程管理器(例如 <a href="https://www.freedesktop.org/wiki/Software/systemd/" target="_blank" rel="noopener noreferrer">systemd<ExternalLinkIcon/></a> ，分布式的进程管理云平台，或是类似 <a href="http://blog.daviddollar.org/2011/05/06/introducing-foreman.html" target="_blank" rel="noopener noreferrer">Foreman<ExternalLinkIcon/></a> 的工具)，来管理 <a href="https://12factor.net/zh_cn/logs" target="_blank" rel="noopener noreferrer">输出流<ExternalLinkIcon/></a> ，响应崩溃的进程，以及处理用户触发的重启和关闭超级进程的请求。</p>
<h2 id="易处理" tabindex="-1"><a class="header-anchor" href="#易处理" aria-hidden="true">#</a> 易处理</h2>
<blockquote>
<p>快速启动和优雅终止可最大化健壮性</p>
</blockquote>
<p><strong>12-Factor 应用的 <a href="https://12factor.net/zh_cn/processes" target="_blank" rel="noopener noreferrer">进程<ExternalLinkIcon/></a> 是 *易处理（disposable）*的，意思是说它们可以瞬间开启或停止。</strong> 这有利于快速、弹性的伸缩应用，迅速部署变化的 <a href="https://12factor.net/zh_cn/codebase" target="_blank" rel="noopener noreferrer">代码<ExternalLinkIcon/></a> 或 <a href="https://12factor.net/zh_cn/config" target="_blank" rel="noopener noreferrer">配置<ExternalLinkIcon/></a> ，稳健的部署应用。</p>
<p>进程应当追求 <strong>最小启动时间</strong> 。 理想状态下，进程从敲下命令到真正启动并等待请求的时间应该只需很短的时间。更少的启动时间提供了更敏捷的 <a href="https://12factor.net/zh_cn/build-release-run" target="_blank" rel="noopener noreferrer">发布<ExternalLinkIcon/></a> 以及扩展过程，此外还增加了健壮性，因为进程管理器可以在授权情形下容易的将进程搬到新的物理机器上。</p>
<p>进程 <strong>一旦接收 <a href="http://en.wikipedia.org/wiki/SIGTERM" target="_blank" rel="noopener noreferrer">终止信号（<code v-pre>SIGTERM</code>）<ExternalLinkIcon/></a> 就会优雅的终止</strong> 。</p>
<ul>
<li>就网络进程而言，**优雅终止是指停止监听服务的端口，即拒绝所有新的请求，并继续执行当前已接收的请求，然后退出。**此类型的进程所隐含的要求是HTTP请求大多都很短(不会超过几秒钟)，而在长时间轮询中，客户端在丢失连接后应该马上尝试重连。</li>
<li>对于 worker 进程来说，优雅终止是指将当前任务退回队列。例如，<a href="http://www.rabbitmq.com/" target="_blank" rel="noopener noreferrer">RabbitMQ<ExternalLinkIcon/></a> 中，worker 可以发送一个<a href="http://www.rabbitmq.com/amqp-0-9-1-quickref.html#basic.nack" target="_blank" rel="noopener noreferrer"><code v-pre>NACK</code><ExternalLinkIcon/></a>信号。 <a href="https://beanstalkd.github.io/" target="_blank" rel="noopener noreferrer">Beanstalkd<ExternalLinkIcon/></a> 中，任务终止并退回队列会在worker断开时自动触发。有锁机制的系统诸如 <a href="https://github.com/collectiveidea/delayed_job#readme" target="_blank" rel="noopener noreferrer">Delayed Job<ExternalLinkIcon/></a> 则需要确定释放了系统资源。此类型的进程所隐含的要求是，任务都应该 <a href="http://en.wikipedia.org/wiki/Reentrant_(subroutine)" target="_blank" rel="noopener noreferrer">可重复执行<ExternalLinkIcon/></a> ， 这主要由将结果包装进事务或是使重复操作 <a href="http://en.wikipedia.org/wiki/Idempotence" target="_blank" rel="noopener noreferrer">幂等<ExternalLinkIcon/></a> 来实现。</li>
</ul>
<p>进程还应当<strong>在面对突然死亡时保持健壮</strong>，例如底层硬件故障。虽然这种情况比起优雅终止来说少之又少，但终究有可能发生。一种推荐的方式是使用一个健壮的后端队列，例如 <a href="https://beanstalkd.github.io/" target="_blank" rel="noopener noreferrer">Beanstalkd<ExternalLinkIcon/></a> ，它可以在客户端断开或超时后自动退回任务。无论如何，12-Factor 应用都应该可以设计能够应对意外的、不优雅的终结。<a href="http://lwn.net/Articles/191059/" target="_blank" rel="noopener noreferrer">Crash-only design<ExternalLinkIcon/></a> 将这种概念转化为 <a href="http://couchdb.apache.org/docs/overview.html" target="_blank" rel="noopener noreferrer">合乎逻辑的理论<ExternalLinkIcon/></a>。</p>
<h2 id="开发环境与线上环境等价" tabindex="-1"><a class="header-anchor" href="#开发环境与线上环境等价" aria-hidden="true">#</a> 开发环境与线上环境等价</h2>
<blockquote>
<p>尽可能的保持开发，预发布，线上环境相同</p>
</blockquote>
<p>从以往经验来看，开发环境（即开发人员的本地 <a href="https://12factor.net/zh_cn/codebase" target="_blank" rel="noopener noreferrer">部署<ExternalLinkIcon/></a>）和线上环境（外部用户访问的真实部署）之间存在着很多差异。这些差异表现在以下三个方面：</p>
<ul>
<li><strong>时间差异：</strong> 开发人员正在编写的代码可能需要几天，几周，甚至几个月才会上线。</li>
<li><strong>人员差异：</strong> 开发人员编写代码，运维人员部署代码。</li>
<li><strong>工具差异：</strong> 开发人员或许使用 Nginx，SQLite，OS X，而线上环境使用 Apache，MySQL 以及 Linux。</li>
</ul>
<p><strong>12-Factor 应用想要做到 <a href="http://avc.com/2011/02/continuous-deployment/" target="_blank" rel="noopener noreferrer">持续部署<ExternalLinkIcon/></a> 就必须缩小本地与线上差异。</strong> 再回头看上面所描述的三个差异:</p>
<ul>
<li>缩小时间差异：开发人员可以几小时，甚至几分钟就部署代码。</li>
<li>缩小人员差异：开发人员不只要编写代码，更应该密切参与部署过程以及代码在线上的表现。</li>
<li>缩小工具差异：尽量保证开发环境以及线上环境的一致性。</li>
</ul>
<p>将上述总结变为一个表格如下：</p>
<table>
<thead>
<tr>
<th></th>
<th>传统应用</th>
<th>12-Factor 应用</th>
</tr>
</thead>
<tbody>
<tr>
<td>每次部署间隔</td>
<td>数周</td>
<td>几小时</td>
</tr>
<tr>
<td>开发人员 vs 运维人员</td>
<td>不同的人</td>
<td>相同的人</td>
</tr>
<tr>
<td>开发环境 vs 线上环境</td>
<td>不同</td>
<td>尽量接近</td>
</tr>
</tbody>
</table>
<p><a href="https://12factor.net/zh_cn/backing-services" target="_blank" rel="noopener noreferrer">后端服务<ExternalLinkIcon/></a> 是保持开发与线上等价的重要部分，例如数据库，队列系统，以及缓存。许多语言都提供了简化获取后端服务的类库，例如不同类型服务的 <em>适配器</em> 。下列表格提供了一些例子。</p>
<table>
<thead>
<tr>
<th>类型</th>
<th>语言</th>
<th>类库</th>
<th>适配器</th>
</tr>
</thead>
<tbody>
<tr>
<td>数据库</td>
<td>Ruby/Rails</td>
<td>ActiveRecord</td>
<td>MySQL, PostgreSQL, SQLite</td>
</tr>
<tr>
<td>队列</td>
<td>Python/Django</td>
<td>Celery</td>
<td>RabbitMQ, Beanstalkd, Redis</td>
</tr>
<tr>
<td>缓存</td>
<td>Ruby/Rails</td>
<td>ActiveSupport::Cache</td>
<td>Memory, filesystem, Memcached</td>
</tr>
</tbody>
</table>
<p>开发人员有时会觉得在本地环境中使用轻量的后端服务具有很强的吸引力，而那些更重量级的健壮的后端服务应该使用在生产环境。例如，本地使用 SQLite 线上使用 PostgreSQL；又如本地缓存在进程内存中而线上存入 Memcached。</p>
<p><strong>12-Factor 应用的开发人员应该反对在不同环境间使用不同的后端服务</strong> ，即使适配器已经可以几乎消除使用上的差异。这是因为，不同的后端服务意味着会突然出现的不兼容，从而导致测试、预发布都正常的代码在线上出现问题。这些错误会给持续部署带来阻力。从应用程序的生命周期来看，消除这种阻力需要花费很大的代价。</p>
<p>与此同时，轻量的本地服务也不像以前那样引人注目。借助于<a href="http://mxcl.github.com/homebrew/" target="_blank" rel="noopener noreferrer">Homebrew<ExternalLinkIcon/></a>，<a href="https://help.ubuntu.com/community/AptGet/Howto" target="_blank" rel="noopener noreferrer">apt-get<ExternalLinkIcon/></a>等现代的打包系统，诸如Memcached、PostgreSQL、RabbitMQ 等后端服务的安装与运行也并不复杂。此外，使用类似 <a href="http://www.opscode.com/chef/" target="_blank" rel="noopener noreferrer">Chef<ExternalLinkIcon/></a> 和 <a href="http://docs.puppetlabs.com/" target="_blank" rel="noopener noreferrer">Puppet<ExternalLinkIcon/></a> 的声明式配置工具，结合像 <a href="http://vagrantup.com/" target="_blank" rel="noopener noreferrer">Vagrant<ExternalLinkIcon/></a> 这样轻量的虚拟环境就可以使得开发人员的本地环境与线上环境无限接近。与同步环境和持续部署所带来的益处相比，安装这些系统显然是值得的。</p>
<p>不同后端服务的适配器仍然是有用的，因为它们可以使移植后端服务变得简单。但应用的所有部署，这其中包括开发、预发布以及线上环境，都应该使用同一个后端服务的相同版本。</p>
<h2 id="日志" tabindex="-1"><a class="header-anchor" href="#日志" aria-hidden="true">#</a> 日志</h2>
<blockquote>
<p>把日志当作事件流</p>
</blockquote>
<p><em>日志</em> 使得应用程序运行的动作变得透明。在基于服务器的环境中，日志通常被写在硬盘的一个文件里，但这只是一种输出格式。</p>
<p>日志应该是 <a href="https://adam.herokuapp.com/past/2011/4/1/logs_are_streams_not_files/" target="_blank" rel="noopener noreferrer">事件流<ExternalLinkIcon/></a> 的汇总，将所有运行中进程和后端服务的输出流按照时间顺序收集起来。尽管在回溯问题时可能需要看很多行，日志最原始的格式确实是一个事件一行。日志没有确定开始和结束，但随着应用在运行会持续的增加。</p>
<p><strong>12-factor应用本身从不考虑存储自己的输出流。</strong> 不应该试图去写或者管理日志文件。相反，每一个运行的进程都会直接的标准输出（<code v-pre>stdout</code>）事件流。开发环境中，开发人员可以通过这些数据流，实时在终端看到应用的活动。</p>
<p>在预发布或线上部署中，每个进程的输出流由运行环境截获，并将其他输出流整理在一起，然后一并发送给一个或多个最终的处理程序，用于查看或是长期存档。这些存档路径对于应用来说不可见也不可配置，而是完全交给程序的运行环境管理。类似 <a href="https://github.com/heroku/logplex" target="_blank" rel="noopener noreferrer">Logplex<ExternalLinkIcon/></a> 和 <a href="https://github.com/fluent/fluentd" target="_blank" rel="noopener noreferrer">Fluentd<ExternalLinkIcon/></a> 的开源工具可以达到这个目的。</p>
<p>这些事件流可以输出至文件，或者在终端实时观察。最重要的，输出流可以发送到 <a href="http://www.splunk.com/" target="_blank" rel="noopener noreferrer">Splunk<ExternalLinkIcon/></a> 这样的日志索引及分析系统，或 <a href="http://hive.apache.org/" target="_blank" rel="noopener noreferrer">Hadoop/Hive<ExternalLinkIcon/></a> 这样的通用数据存储系统。这些系统为查看应用的历史活动提供了强大而灵活的功能，包括：</p>
<ul>
<li>找出过去一段时间特殊的事件。</li>
<li>图形化一个大规模的趋势，比如每分钟的请求量。</li>
<li>根据用户定义的条件实时触发警报，比如每分钟的报错超过某个警戒线。</li>
</ul>
<h2 id="管理进程" tabindex="-1"><a class="header-anchor" href="#管理进程" aria-hidden="true">#</a> 管理进程</h2>
<blockquote>
<p>后台管理任务当作一次性进程运行</p>
</blockquote>
<p><a href="https://12factor.net/zh_cn/concurrency" target="_blank" rel="noopener noreferrer">进程构成<ExternalLinkIcon/></a>（process formation）是指用来处理应用的常规业务（比如处理 web 请求）的一组进程。与此不同，开发人员经常希望执行一些管理或维护应用的一次性任务，例如：</p>
<ul>
<li>运行数据移植（Django 中的 <code v-pre>manage.py migrate</code>, Rails 中的 <code v-pre>rake db:migrate</code>）。</li>
<li>运行一个控制台（也被称为 <a href="http://en.wikipedia.org/wiki/Read-eval-print_loop" target="_blank" rel="noopener noreferrer">REPL<ExternalLinkIcon/></a> shell），来执行一些代码或是针对线上数据库做一些检查。大多数语言都通过解释器提供了一个 REPL 工具（<code v-pre>python</code> 或 <code v-pre>perl</code>） ，或是其他命令（Ruby 使用 <code v-pre>irb</code>, Rails 使用 <code v-pre>rails console</code>）。</li>
<li>运行一些提交到代码仓库的一次性脚本。</li>
</ul>
<p>一次性管理进程应该和正常的 <a href="https://12factor.net/zh_cn/processes" target="_blank" rel="noopener noreferrer">常驻进程<ExternalLinkIcon/></a> 使用同样的环境。这些管理进程和任何其他的进程一样使用相同的 <a href="https://12factor.net/zh_cn/codebase" target="_blank" rel="noopener noreferrer">代码<ExternalLinkIcon/></a> 和 <a href="https://12factor.net/zh_cn/config" target="_blank" rel="noopener noreferrer">配置<ExternalLinkIcon/></a> ，基于某个 <a href="https://12factor.net/zh_cn/build-release-run" target="_blank" rel="noopener noreferrer">发布版本<ExternalLinkIcon/></a> 运行。后台管理代码应该随其他应用程序代码一起发布，从而避免同步问题。</p>
<p>所有进程类型应该使用同样的 <a href="https://12factor.net/zh_cn/dependencies" target="_blank" rel="noopener noreferrer">依赖隔离<ExternalLinkIcon/></a> 技术。例如，如果Ruby的web进程使用了命令 <code v-pre>bundle exec thin start</code> ，那么数据库移植应使用 <code v-pre>bundle exec rake db:migrate</code> 。同样的，如果一个 Python 程序使用了 Virtualenv，则需要在运行 Tornado Web 服务器和任何 <code v-pre>manage.py</code> 管理进程时引入 <code v-pre>bin/python</code> 。</p>
<p>12-factor 尤其青睐那些提供了 REPL shell 的语言，因为那会让运行一次性脚本变得简单。在本地部署中，开发人员直接在命令行使用 shell 命令调用一次性管理进程。在线上部署中，开发人员依旧可以使用ssh或是运行环境提供的其他机制来运行这样的进程。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/34.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/36.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


