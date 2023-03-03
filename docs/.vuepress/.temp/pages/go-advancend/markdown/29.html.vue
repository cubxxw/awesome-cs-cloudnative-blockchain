<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第29节-go语言框架三件套-web-rpc-gorm" tabindex="-1"><a class="header-anchor" href="#第29节-go语言框架三件套-web-rpc-gorm" aria-hidden="true">#</a> 第29节 Go语言框架三件套（Web/RPC/GORM)</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/28.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="orm、gorm" tabindex="-1"><a class="header-anchor" href="#orm、gorm" aria-hidden="true">#</a> ORM、GORM</h2>
<p><img src="http://sm.nsddd.top/sm202301202100697.png" alt="image-20230120210000499"></p>
<p>ORM全称是：Object Relational Mapping(<strong>对象关系映射</strong>)，其主要作用是在编程中，把<strong>面向对象</strong>的概念跟数据库中<strong>表的概念</strong>对应起来。</p>
<p><em>举例来说就是，我定义一个对象，那就对应着一张表，这个对象的实例，就对应着表中的一条记录。</em></p>
<p>GORM：是Golang语言中一款<strong>性能极好</strong>的ORM库，对开发人员相对是比较友好的。</p>
<h2 id="grom" tabindex="-1"><a class="header-anchor" href="#grom" aria-hidden="true">#</a> GROM</h2>
<h4 id="gorm特性" tabindex="-1"><a class="header-anchor" href="#gorm特性" aria-hidden="true">#</a> GORM特性</h4>
<ul>
<li>全功能 ORM</li>
<li>关联 (Has One，Has Many，Belongs To，Many To Many，多态，单表继承)</li>
<li>Create，Save，Update，Delete，Find 中钩子方法</li>
<li>支持 <code v-pre>Preload</code>、<code v-pre>Joins</code> 的预加载</li>
<li>事务，嵌套事务，Save Point，Rollback To Saved Point</li>
<li>Context、预编译模式、DryRun 模式</li>
<li>批量插入，FindInBatches，Find/Create with Map，使用 SQL 表达式、Context Valuer 进行 CRUD</li>
<li>SQL 构建器，Upsert，数据库锁，Optimizer/Index/Comment Hint，命名参数，子查询</li>
<li>复合主键，索引，约束</li>
<li>Auto Migration</li>
<li>自定义 Logger</li>
<li>灵活的可扩展插件 API：Database Resolver（多数据库，读写分离）、Prometheus…</li>
<li>每个特性都经过了测试的重重考验</li>
<li>开发者友好</li>
</ul>
<h3 id="驱动方式链接" tabindex="-1"><a class="header-anchor" href="#驱动方式链接" aria-hidden="true">#</a> 驱动方式链接</h3>
<p><strong>GORM 是通过驱动的方式来链接数据库的，目前支持 Mysql、SQLSever、PostgreSQL、SQLite。如果需要链接其他类型的数据库，可以 复用/自行 开发驱动。</strong></p>
<ul>
<li>驱动，是指软件驱动程序。是一种中间件，它能够将应用程序与硬件或其他系统之间的信息进行转换。在数据库领域中，驱动程序就是一种软件，它能够将应用程序与数据库之间的信息进行转换。</li>
<li>驱动程序通常提供一组标准的数据库连接接口。这些接口包括连接数据库、执行 SQL 语句、获取结果集等。应用程序可以使用这些接口与数据库进行交互。</li>
</ul>
<p>在 GORM 中，驱动程序是将 Go 语言与数据库之间的信息进行转换的软件。 GORM 库使用驱动程序来连接数据库，并使用驱动程序提供的接口来进行数据库操作。这样，GORM 库就不用关心数据库是哪种数据库，只要有驱动程序就可以连接数据库。</p>
<p>驱动是一种软件，它能够将 Go 语言与数据库之间的信息进行转换。驱动通过一组标准的数据库连接接口来提供连接数据库的功能。</p>
<p>GORM 的设计原则是对数据库访问进行封装，而不是对 SQL 语句进行封装。这样可以让开发人员专注于业务逻辑，而不用关心数据库的细节。</p>
<p><strong>以驱动的方式链接数据库的好处是：</strong></p>
<ul>
<li>使用驱动可以支持多种数据库，而不用对 GORM 进行修改。</li>
<li>使用驱动可以更好地支持数据库的新特性。</li>
<li>使用驱动可以更好地进行数据库性能优化。</li>
</ul>
<h4 id="dsn" tabindex="-1"><a class="header-anchor" href="#dsn" aria-hidden="true">#</a> DSN</h4>
<p>[[DSN]] 是 Data Source Name 的缩写，是一种数据库连接字符串，它提供了连接数据库所需的所有信息。</p>
<p>DSN 的格式通常包括数据库类型、数据库名称、用户名、密码和连接地址等信息。</p>
<p>例如对于 <a href="https://github.com/go-sql-driver/mysql" target="_blank" rel="noopener noreferrer">mysql 数据库<ExternalLinkIcon/></a>来说，DSN 格式如下:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>user<span class="token punctuation">:</span>password@<span class="token function">tcp</span><span class="token punctuation">(</span>host<span class="token punctuation">:</span>port<span class="token punctuation">)</span><span class="token operator">/</span>dbname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>其中：</strong></p>
<ul>
<li><code v-pre>user</code>: 数据库用户名</li>
<li><code v-pre>password</code>: 数据库密码</li>
<li><code v-pre>host</code>: 数据库地址</li>
<li><code v-pre>port</code>: 数据库端口</li>
<li><code v-pre>dbname</code>: 数据库名称</li>
</ul>
<p>DSN 字符串的格式可能因数据库类型而异。</p>
<p>使用DSN字符串连接数据库是一种常用的方式，因为它简化了连接数据库的过程，并且使用DSN字符串连接的数据库驱动程序通常支持多种数据库类型，这样就不用写多个连接数据库的函数了。</p>
<h4 id="安装和简单实用" tabindex="-1"><a class="header-anchor" href="#安装和简单实用" aria-hidden="true">#</a> 安装和简单实用</h4>
<p><strong>GORM安装</strong>：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>go get <span class="token operator">-</span>u gorm<span class="token punctuation">.</span>io/gorm
go get <span class="token operator">-</span>u gorm<span class="token punctuation">.</span>io/driver/sqlite
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Quick Start</strong>：</p>
<div class="language-Go ext-Go line-numbers-mode"><pre v-pre class="language-Go"><code>package main

import (
  &quot;gorm.io/gorm&quot;
  &quot;gorm.io/driver/sqlite&quot;
)

// 创建数据模型
type Product struct {
  gorm.Model
  Code  string
  Price uint
}

func main() {
  db, err := gorm.Open(sqlite.Open(&quot;test.db&quot;), &amp;gorm.Config{})
  if err != nil {
    panic(&quot;failed to connect database&quot;)
  }

  // 迁移 schema
  db.AutoMigrate(&amp;Product{})

  // Create
  db.Create(&amp;Product{Code: &quot;D42&quot;, Price: 100})

  // Read
  var product Product
  db.First(&amp;product, 1) // 根据整型主键查找
  db.First(&amp;product, &quot;code = ?&quot;, &quot;D42&quot;) // 查找 code 字段值为 D42 的记录

  // Update - 将 product 的 price 更新为 200
  db.Model(&amp;product).Update(&quot;Price&quot;, 200)
  // Update - 更新多个字段
  db.Model(&amp;product).Updates(Product{Price: 200, Code: &quot;F42&quot;}) // 仅更新非零值字段
  db.Model(&amp;product).Updates(map[string]interface{}{&quot;Price&quot;: 200, &quot;Code&quot;: &quot;F42&quot;})

  // Delete - 删除 product
  db.Delete(&amp;product, 1)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Mysql 的💡简单的一个案例如下：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>

    <span class="token string">"github.com/jinzhu/gorm"</span>
    <span class="token boolean">_</span> <span class="token string">"github.com/jinzhu/gorm/dialects/mysql"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义数据模型</span>
<span class="token keyword">type</span> Product <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ID    <span class="token builtin">uint</span>   <span class="token string">`gorm:"primary_key"`</span>
    Name  <span class="token builtin">string</span> <span class="token string">`gorm:"size:255"`</span>
    Price <span class="token builtin">uint</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 建立数据库连接</span>
    db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"mysql"</span><span class="token punctuation">,</span> <span class="token string">"root:password@/dbname?charset=utf8&amp;parseTime=True&amp;loc=Local"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"连接数据库失败"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> db<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 自动迁移数据库结构</span>
    db<span class="token punctuation">.</span><span class="token function">AutoMigrate</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Product<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 创建一条数据</span>
    db<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Product<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">"面包"</span><span class="token punctuation">,</span> Price<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 查询所有数据</span>
    <span class="token keyword">var</span> products <span class="token punctuation">[</span><span class="token punctuation">]</span>Product
    db<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>products<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"所有产品："</span><span class="token punctuation">,</span> products<span class="token punctuation">)</span>

    <span class="token comment">// 更新一条数据</span>
    db<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Product<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">"name = ?"</span><span class="token punctuation">,</span> <span class="token string">"面包"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token string">"price"</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>

    <span class="token comment">// 删除一条数据</span>
    db<span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">"name = ?"</span><span class="token punctuation">,</span> <span class="token string">"面包"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Product<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>📜 对上面的解释：</p>
<ol>
<li>在 main 函数中，我们通过调用 gorm.Open(&quot;mysql&quot;, &quot;root:password@/dbname?charset=utf8&amp;parseTime=True&amp;loc=Local&quot;) 来建立数据库连接。</li>
<li>我们使用 db.AutoMigrate(&amp;Product{}) 来自动迁移数据库结构，即自动根据 Product 结构体创建数据表。</li>
<li>我们使用 db.Create(&amp;Product{Name: &quot;面包&quot;, Price: 3}) 来创建一条数据。</li>
<li>使用 db.Find(&amp;products) 来查询所有数据并将其存入 products 变量中。</li>
<li>我们使用 db.Model(&amp;Product{}).Where(&quot;name = ?&quot;, &quot;面包&quot;).Update(&quot;price&quot;, 4) 来更新名称为 &quot;面包&quot; 的产品的价格。</li>
<li>我们使用 db.Where(&quot;name = ?&quot;, &quot;面包&quot;).Delete(&amp;Product{}) 来删除名称为 &quot;面包&quot; 的产品。</li>
<li>最后，通过 defer db.Close() 关闭数据库连接。</li>
</ol>
</blockquote>
<p>更细节的操作可以参考：<a href="https://gorm.io/zh_CN/docs/index.html" target="_blank" rel="noopener noreferrer">GORM 指南 | GORM - The fantastic ORM library for Golang, aims to be developer friendly<ExternalLinkIcon/></a>.</p>
<p>可以使用gorm.Open()函数打开数据库连接。 例如：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"mysql"</span><span class="token punctuation">,</span> <span class="token string">"user:password@/dbname?charset=utf8&amp;parseTime=True&amp;loc=Local"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里是一些基本的GORM用法，尝试使用它来 <strong>创建、读取、更新和删除</strong> 数据库记录。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// create</span>
db<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Product<span class="token punctuation">{</span>Code<span class="token punctuation">:</span> <span class="token string">"L1212"</span><span class="token punctuation">,</span> Price<span class="token punctuation">:</span> <span class="token number">1000</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// read</span>
<span class="token keyword">var</span> product Product
db<span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>product<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// find product with id 1</span>

<span class="token comment">// update</span>
db<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>product<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token string">"Price"</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>

<span class="token comment">// delete</span>
db<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>product<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="解决数据冲突" tabindex="-1"><a class="header-anchor" href="#解决数据冲突" aria-hidden="true">#</a> 解决数据冲突</h4>
<p>在 GORM 中，使用 OnConflict 方法可以解决数据冲突问题。这个方法可以让你指定在冲突时应该采取的操作。</p>
<p>一般来说，在执行插入操作时可能会因为主键重复而导致数据冲突。使用 OnConflict 方法可以解决这个问题。</p>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>db<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Product<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">"面包"</span><span class="token punctuation">,</span> Price<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">OnConflict</span><span class="token punctuation">(</span><span class="token string">"(name) DO UPDATE SET price = excluded.price"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行代码表示 <strong>如果 name 列重复时，将执行更新操作来更新 price 列。</strong></p>
<p>还可以使用 <code v-pre>OnConflict(&quot;(name) DO NOTHING&quot;)</code> 来让重复的数据不做任何操作。</p>
<p>OnConflict 方法非常有用，因为它可以帮助你解决数据冲突问题，并让你更好地控制你的数据库。</p>
<h4 id="使用默认值" tabindex="-1"><a class="header-anchor" href="#使用默认值" aria-hidden="true">#</a> 使用默认值</h4>
<p>GORM 支持在数据库中设置默认值。这可以通过在结构体中使用 &quot;default&quot; 标签来实现。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Product <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    Name  <span class="token builtin">string</span>
    Price <span class="token builtin">int</span> <span class="token string">`gorm:"default:0"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的话，在创建或更新数据时，如果没有指定 Price 列的值，那么会自动将其设置为 0。</p>
<p>默认值还可以使用SQL表达式和函数来进行设置。</p>
<p>例如，如果你想让 <code v-pre>created_at</code> 列默认值为当前时间，你可以这样定义：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Product <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    Name  <span class="token builtin">string</span>
    Price <span class="token builtin">int</span> <span class="token string">`gorm:"default:0"`</span>
    CreatedAt  time<span class="token punctuation">.</span>Time <span class="token string">`gorm:"default:now()"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置默认值是非常有用的，它可以帮助你简化代码并减少错误。</p>
<h3 id="first-使用详细" tabindex="-1"><a class="header-anchor" href="#first-使用详细" aria-hidden="true">#</a> First 使用详细</h3>
<p><code v-pre>First</code> 是 GORM 中查询数据的一种方法，它可以返回第一条符合条件的数据。使用 <code v-pre>First</code> 方法时需要传递一个参数，这个参数可以是模型结构体的指针或接口。</p>
<p><img src="http://sm.nsddd.top/sm202301271609289.png" alt="image-20230127160958022"></p>
<p>例如，如果你想查询第一条名称为 &quot;Apple&quot; 的产品数据，你可以这样写：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> product Product
db<span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>product<span class="token punctuation">,</span> <span class="token string">"name = ?"</span><span class="token punctuation">,</span> <span class="token string">"Apple"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的参数是一个模型结构体的指针，第二个参数是查询条件，第三个参数是条件的值。</p>
<p><strong>也可以使用链式查询来实现这个操作</strong>，如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> product Product
db<span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">"name = ?"</span><span class="token punctuation">,</span> <span class="token string">"Apple"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>product<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>⚠️ <strong>在链式调用的时候，需要注意~！</strong></p>
</blockquote>
<p>使用时需要注意，如果查询不到符合条件的数据，<code v-pre>First</code> 方法将不会返回错误，而是返回一个空结构体。所以需要在使用时自己判断是否查询到数据。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> product Product
err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">"name = ?"</span><span class="token punctuation">,</span> <span class="token string">"Apple"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>product<span class="token punctuation">)</span><span class="token punctuation">.</span>Error
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要在查询不到数据时返回错误，可以使用 <code v-pre>FirstOrInit</code> 和 <code v-pre>FirstOrCreate</code> 方法，它们在查询不到数据时会返回错误。</p>
<p>在使用 First 方法时, 如果传入的结构体中有组合索引，但没有使用 Where 函数来限制组合索引的值会触发。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"github.com/jinzhu/gorm"</span>
    <span class="token boolean">_</span> <span class="token string">"github.com/jinzhu/gorm/dialects/mysql"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ID   <span class="token builtin">int</span>
    Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"mysql"</span><span class="token punctuation">,</span> <span class="token string">"root:password@tcp(127.0.0.1:3306)/test?charset=utf8&amp;parseTime=True&amp;loc=Local"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> db<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 查询第一条ID为1的用户</span>
    <span class="token keyword">var</span> user User
    db<span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们使用了GORM的<code v-pre>First</code>方法来查询第一条ID为1的用户。需要注意的是，如果查询不到符合条件的记录，<code v-pre>First</code>方法会返回<code v-pre>ecordNotFound</code>错误。</p>
<p>使用时需要注意，如果传递的参数是结构体指针，gorm会将查询结果赋值到结构体上，而传递结构体则不会有赋值操作。</p>
<p>另外，在使用<code v-pre>First</code>方法查询时，如果没有符合条件的记录，返回的错误是<code v-pre>RecordNotFound</code>,需要在业务代码中特判这个错误。</p>
<h4 id="find" tabindex="-1"><a class="header-anchor" href="#find" aria-hidden="true">#</a> Find</h4>
<p><code v-pre>Find</code> 方法用来查询符合条件的记录，并以切片的形式返回。</p>
<p>下面是一个示例代码，假设有一个名为<code v-pre>users</code>的表，你需要查询所有年龄大于30岁的用户：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"github.com/jinzhu/gorm"</span>
    <span class="token boolean">_</span> <span class="token string">"github.com/jinzhu/gorm/dialects/mysql"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ID       <span class="token builtin">int</span>
    Name     <span class="token builtin">string</span>
    Age      <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"mysql"</span><span class="token punctuation">,</span> <span class="token string">"root:password@/dbname?charset=utf8&amp;parseTime=True&amp;loc=Local"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"failed to connect database"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> db<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">var</span> users <span class="token punctuation">[</span><span class="token punctuation">]</span>User
    db<span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">"age > ?"</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>users<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>users<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们首先打开了一个数据库链接，然后定义了一个<code v-pre>User</code>结构体，用来存储查询到的用户信息。</p>
<p>接着我们使用<code v-pre>Where</code>方法限定查询条件，并调用<code v-pre>Find</code>方法查询数据。<code v-pre>Find</code>方法的第一个参数是一个结构体切片的指针，用来存储查询到的记录。</p>
<p>最后我们打印出查询到的用户信息。</p>
<p>⚠️ 注意：如果没有符合条件的记录，<code v-pre>Find</code>方法会返回一个空的切片。</p>
<h4 id="first-和-find" tabindex="-1"><a class="header-anchor" href="#first-和-find" aria-hidden="true">#</a> First 和 Find</h4>
<p><code v-pre>First</code>方法和<code v-pre>Find</code>方法都是用来查询记录的，但是它们的用法和返回结果有所不同。</p>
<p><code v-pre>First</code>方法会查询并返回第一条符合条件的记录。它的返回值是一个结构体，如果没有符合条件的记录，会返回<code v-pre>RecordNotFound</code>错误。</p>
<p><code v-pre>Find</code>方法会查询所有符合条件的记录，并将它们以切片的形式返回。它的返回值是一个结构体切片，如果没有符合条件的记录，会返回一个空的切片。</p>
<p>举个例子，如果你要查询一个表中的第一条记录，可以使用<code v-pre>First</code>方法；如果你要查询一个表中所有符合条件的记录，可以使用<code v-pre>Find</code>方法。</p>
<p>总的来说，如果你只需要查询一条记录，使用<code v-pre>First</code>方法会更加高效，因为它只会查询一条记录；如果你需要查询多条记录，使用<code v-pre>Find</code>方法会更加方便。</p>
<h3 id="更新数据" tabindex="-1"><a class="header-anchor" href="#更新数据" aria-hidden="true">#</a> 更新数据</h3>
<p>Gorm 提供了 <code v-pre>Save</code> 、 <code v-pre>Updates</code> 和 <code v-pre>Update</code> 方法用来更新数据。</p>
<ul>
<li><code v-pre>Save</code> 方法更新所有字段，如果没有主键或者自增字段会新增一条记录。</li>
<li><code v-pre>Updates</code> 方法用来更新指定字段。</li>
<li><code v-pre>Update</code> 方法用来更新指定字段并且指定更新条件。</li>
</ul>
<p>下面是一个示例代码，假设有一个名为<code v-pre>users</code>的表，你需要更新id为1的用户的姓名为 &quot;John Doe&quot;</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"github.com/jinzhu/gorm"</span>
    <span class="token boolean">_</span> <span class="token string">"github.com/jinzhu/gorm/dialects/mysql"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ID       <span class="token builtin">int</span>
    Name     <span class="token builtin">string</span>
    Age      <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"mysql"</span><span class="token punctuation">,</span> <span class="token string">"root:password@/dbname?charset=utf8&amp;parseTime=True&amp;loc=Local"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"failed to connect database"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> db<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">var</span> user User
    db<span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// find user with id 1</span>
    user<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">"John Doe"</span>
    db<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们首先打开了一个数据库链接，然后定义了一个<code v-pre>User</code>结构体，用来存储查询到的用户信息。</p>
<p>接着我们使用<code v-pre>First</code>方法查询id 为1的用户，并更新用户的姓名。</p>
<p>最后我们使用<code v-pre>Save</code>方法更新数据。</p>
<p>如果只需要更新一些字段，可以使用 <code v-pre>Updates</code> 方法,例如:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>db<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Updates</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"John Doe"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token number">25</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Gorm 更新数据有两种方式：</strong></p>
<ol>
<li>使用 Update 方法：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>db<span class="token punctuation">.</span><span class="token function">Model</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"new_name"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方式可以对指定字段进行更新，而不会影响其他字段的值。</p>
<ol start="2">
<li>使用 Save 方法：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>user<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">"new_name"</span>
db<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式会更新整个结构体。</p>
<p>在使用这些方法之前，需要确保记录已经在数据库中存在。如果需要在更新之前判断记录是否存在，可以使用 <code v-pre>FirstOrCreate</code> 方法。</p>
<p>注意，在使用 Save 方法时，如果结构体中有没有被赋值的字段，那么这些字段可能会被赋上空值，所以需要特别小心。</p>
<p>顺便提一下，在更新数据时，Gorm 会自动跟踪更新时间，如果更新时间字段名为 <code v-pre>updated_at</code>，则自动更新，如果需要自定义字段名，需要手动设置。</p>
<h3 id="删除" tabindex="-1"><a class="header-anchor" href="#删除" aria-hidden="true">#</a> 删除</h3>
<p>Gorm 提供了 Delete 方法来删除数据。</p>
<p>使用 Delete 方法可以删除一条记录，方法的参数是要删除的记录的指针。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>db<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个方法会将这条记录从数据库中删除，删除之后该记录就不再是有效的。</p>
<p>如果要删除多条记录，可以使用 Where 方法限制删除范围。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>db<span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">"age > ?"</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span>User<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个方法会删除年龄大于20岁的所有用户。</p>
<p>注意，在删除数据时，Gorm 不会自动跟踪删除时间，如果需要记录删除时间，需要手动设置。</p>
<h4 id="物理删除和软删除" tabindex="-1"><a class="header-anchor" href="#物理删除和软删除" aria-hidden="true">#</a> 物理删除和软删除</h4>
<p>物理删除和软删除是 Gorm 提供的两种不同的删除方式。</p>
<ol>
<li><strong>物理删除就是直接从数据库中删除记录</strong>，不管有没有其他业务逻辑的依赖，这种方式删除的数据不可恢复，需要谨慎使用。</li>
<li>软删除是通过在数据表中添加一个删除标记来标记记录被删除，这种方式删除的数据可以恢复，适用于不需要永久删除数据的场景。</li>
</ol>
<p>Gorm 提供了一些辅助方法来支持软删除，比如 DeletedAt 字段，在使用 Delete 方法删除数据时会自动设置这个字段，可以通过 Unscoped 方法来忽略这个字段来进行物理删除。</p>
<p><strong>Gorm默认不支持软删除，需要手动支持。Gorm 提供了 gorm.DeletedAt 用于帮助用户实现软删除</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"time"</span>

	<span class="token string">"github.com/jinzhu/gorm"</span>
	<span class="token boolean">_</span> <span class="token string">"github.com/jinzhu/gorm/dialects/sqlite"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	ID        <span class="token builtin">uint</span> <span class="token string">`gorm:"primary_key"`</span>
	Name      <span class="token builtin">string</span>
	Age       <span class="token builtin">uint</span>
	DeletedAt <span class="token operator">*</span>time<span class="token punctuation">.</span>Time <span class="token string">`sql:"index"`</span> <span class="token comment">// 定义软删除字段</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"sqlite3"</span><span class="token punctuation">,</span> <span class="token string">"test.db"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> db<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 开启软删除</span>
	db<span class="token punctuation">.</span><span class="token function">AutoMigrate</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>User<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>User<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"deleted_at is not null"</span><span class="token punctuation">)</span>
	db<span class="token punctuation">.</span><span class="token function">Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">"gorm:delete"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>scope <span class="token operator">*</span>gorm<span class="token punctuation">.</span>Scope<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>scope<span class="token punctuation">.</span><span class="token function">HasError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">var</span> extraOption <span class="token builtin">string</span>
			<span class="token keyword">if</span> str<span class="token punctuation">,</span> ok <span class="token operator">:=</span> scope<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"gorm:delete_option"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
				extraOption <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprint</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>

			deletedOnField<span class="token punctuation">,</span> hasDeletedOnField <span class="token operator">:=</span> scope<span class="token punctuation">.</span><span class="token function">FieldByName</span><span class="token punctuation">(</span><span class="token string">"DeletedAt"</span><span class="token punctuation">)</span>

			<span class="token keyword">if</span> <span class="token operator">!</span>scope<span class="token punctuation">.</span>Search<span class="token punctuation">.</span>Unscoped <span class="token operator">&amp;&amp;</span> hasDeletedOnField <span class="token punctuation">{</span>
				scope<span class="token punctuation">.</span><span class="token function">Raw</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span>
					<span class="token string">"UPDATE %v SET %v=%v%v%v"</span><span class="token punctuation">,</span>
					scope<span class="token punctuation">.</span><span class="token function">QuotedTableName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
					scope<span class="token punctuation">.</span><span class="token function">Quote</span><span class="token punctuation">(</span>deletedOnField<span class="token punctuation">.</span>DBName<span class="token punctuation">)</span><span class="token punctuation">,</span>
					scope<span class="token punctuation">.</span><span class="token function">AddToVars</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
					<span class="token function">addExtraSpaceIfExist</span><span class="token punctuation">(</span>scope<span class="token punctuation">.</span><span class="token function">CombinedConditionSql</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
					<span class="token function">addExtraSpaceIfExist</span><span class="token punctuation">(</span>extraOption<span class="token punctuation">)</span><span class="token punctuation">,</span>
				<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
				scope<span class="token punctuation">.</span><span class="token function">Raw</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span>
					<span class="token string">"DELETE FROM %v%v%v"</span><span class="token punctuation">,</span>
					scope<span class="token punctuation">.</span><span class="token function">QuotedTableName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
					<span class="token function">addExtraSpaceIfExist</span><span class="token punctuation">(</span>scope<span class="token punctuation">.</span><span class="token function">CombinedConditionSql</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
					<span class="token function">addExtraSpaceIfExist</span><span class="token punctuation">(</span>extraOption<span class="token punctuation">)</span><span class="token punctuation">,</span>
				<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 创建用户</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">"John"</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">}</span>
	db<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>

	<span class="token comment">// 软删除用户</span>
	db<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>

	<span class="token comment">// 查询已被软删除的用户</span>
	<span class="token keyword">var</span> deletedUser User
	db<span class="token punctuation">.</span><span class="token function">Unscoped</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">First</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>deletedUser<span class="token punctuation">,</span> <span class="token string">"name = ?"</span><span class="token punctuation">,</span> <span class="token string">"John"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Deleted user: %+v\n"</span><span class="token punctuation">,</span> deletedUser<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h3>
<p>Gorm支持多种方式来管理数据库的事务。一种常用的方式是使用<code v-pre>db.Begin()</code>来开启一个事务，然后使用<code v-pre>tx.Commit()</code>或<code v-pre>tx.Rollback()</code>来结束事务。</p>
<p>在GORM中，事务是通过DB对象的<code v-pre>Begin()</code>方法来开始一个事务，该方法返回一个<code v-pre>TX</code>对象。然后你可以在TX对象上执行数据库操作，最后调用<code v-pre>Commit()</code>或<code v-pre>Rollback()</code>来结束事务。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>tx <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 注意在后面从这里开始，你应该使用 `tx` 而不是 `db`</span>
<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        tx<span class="token punctuation">.</span><span class="token function">Rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">:=</span> tx<span class="token punctuation">.</span>Error<span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 执行数据库操作</span>
<span class="token keyword">if</span> err <span class="token operator">:=</span> tx<span class="token punctuation">.</span><span class="token function">Commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Error<span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者 使用 <code v-pre>db.Transaction(func(tx *gorm.DB) error{})</code> 来进行事务操作</p>
<p>如果你需要在一组数据库操作之间开始和结束事务，可以使用<code v-pre>db.Transaction(func(tx *gorm.DB) error{})</code> 来进行事务操作</p>
<p><code v-pre>tansaction</code> 方法用于自动提交事务，避免用户漏写 Commit、Rollbcak</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Transaction</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>tx <span class="token operator">*</span>gorm<span class="token punctuation">.</span>DB<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token comment">// 执行数据库操作</span>
    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：如果返回值为nil，事务会提交，如果返回值非nil，事务会回滚。</p>
<h3 id="gorm-hook" tabindex="-1"><a class="header-anchor" href="#gorm-hook" aria-hidden="true">#</a> GORM Hook</h3>
<p>GORM Hook是GORM中的一种事件钩子机制，它允许在对数据库进行操作时，在特定的时间点执行额外的代码。</p>
<p>GORM Hook提供了多种事件类型，如创建、更新、查询和删除等。</p>
<p>可以使用<code v-pre>db.Callback()</code>来定义Hook，如下所示：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"github.com/jinzhu/gorm"</span>
    <span class="token boolean">_</span> <span class="token string">"github.com/jinzhu/gorm/dialects/sqlite"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Product <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    Code  <span class="token builtin">string</span>
    Price <span class="token builtin">uint</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"sqlite3"</span><span class="token punctuation">,</span> <span class="token string">"test.db"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"failed to connect database"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> db<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    db<span class="token punctuation">.</span><span class="token function">AutoMigrate</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Product<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 定义钩子</span>
    db<span class="token punctuation">.</span><span class="token function">Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Before</span><span class="token punctuation">(</span><span class="token string">"gorm:begin_transaction"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
        <span class="token function">Register</span><span class="token punctuation">(</span><span class="token string">"gorm:before_create"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>scope <span class="token operator">*</span>gorm<span class="token punctuation">.</span>Scope<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"在创建之前执行的代码"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    db<span class="token punctuation">.</span><span class="token function">Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span><span class="token string">"gorm:commit_or_rollback_transaction"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
        <span class="token function">Register</span><span class="token punctuation">(</span><span class="token string">"gorm:after_create"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>scope <span class="token operator">*</span>gorm<span class="token punctuation">.</span>Scope<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"在创建之后执行的代码"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 创建一个Product实例并保存</span>
    db<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Product<span class="token punctuation">{</span>Code<span class="token punctuation">:</span> <span class="token string">"L1212"</span><span class="token punctuation">,</span> Price<span class="token punctuation">:</span> <span class="token number">1000</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个例子，当数据库创建操作时会触发<code v-pre>gorm:before_create</code>事件，并执行函数中的代码</p>
<p>可以使用如下的事件类型：</p>
<ul>
<li><code v-pre>Before/After(&quot;gorm:create&quot;)</code></li>
<li><code v-pre>Before/After(&quot;gorm:query&quot;)</code></li>
<li><code v-pre>Before/After(&quot;gorm:update&quot;)</code></li>
<li><code v-pre>Before/After(&quot;gorm:delete&quot;)</code></li>
</ul>
<p>通过这些事件类型，可以在对数据库进行操作时，对数据进行预处理或后处理，也可以在数据库操作失败时进行错误处理。</p>
<h3 id="gorm-性能提高" tabindex="-1"><a class="header-anchor" href="#gorm-性能提高" aria-hidden="true">#</a> Gorm 性能提高</h3>
<p>GORM是一个ORM库，它会在运行时执行很多操作，因此其运行性能可能不如直接使用原生SQL。但是，还是有一些方法可以提高GORM的性能。</p>
<ol>
<li>使用缓存: GORM支持对数据库的缓存，如果你的应用程序需要频繁读取数据库中的同一数据，可以考虑使用缓存来提高性能。</li>
<li>尽量减少查询次数: GORM在查询数据库时会执行很多操作，如果你可以通过减少查询次数来提高性能，就应该尽量这样做。</li>
<li>尽量减少使用高级功能: GORM支持很多高级功能，如果你不需要这些功能，可以考虑不使用它们，以提高性能。</li>
<li>尽量使用批量操作: GORM支持对多个对象批量进行操作，如果你需要对多个对象进行相同的操作，可以考虑使用批量操作来提高性能。</li>
<li>数据库连接池: GORM默认使用数据库连接池来管理数据库连接，但是默认的连接池大小可能不够，可以通过调整连接池大小来提高性能。</li>
</ol>
<p><img src="http://sm.nsddd.top/sm202301271708839.png" alt="image-20230127170840505"></p>
<h4 id="缓存预编译" tabindex="-1"><a class="header-anchor" href="#缓存预编译" aria-hidden="true">#</a> 缓存预编译</h4>
<p>预编译是一种将 SQL 语句编译为数据库可以识别的语句的过程。这种编译过程可以提高查询性能，因为数据库不需要在每次执行查询时都重新编译 SQL 语句。</p>
<p>GORM 中可以使用预编译语句来提高查询性能。使用预编译语句的方法是将 SQL 语句传递给 gorm.DB.Exec 或 gorm.DB.Query，并将需要传递给 SQL 语句的参数作为第二个参数传递。</p>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>db<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span><span class="token string">"INSERT INTO users (name, age) VALUES (?, ?)"</span><span class="token punctuation">,</span> <span class="token string">"John Doe"</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，第一个参数是预编译的 SQL 语句，第二个参数是要传递给 SQL 语句的参数。</p>
<p>缓存预编译是一种优化查询性能的方法，它可以将预编译过的 SQL 语句存储在缓存中，以便在需要执行相同的查询时可以重用已编译的语句。这可以减少数据库编译 SQL 的开销，提高性能。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"mysql"</span><span class="token punctuation">,</span> <span class="token string">"user:password@/dbname?charset=utf8&amp;parseTime=True&amp;loc=Local&amp;strict=true&amp;cache=true"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，<code v-pre>strict=true</code> 参数告诉 GORM 在每次操作时都启用事务，<code v-pre>cache=true</code> 参数告诉 GORM 缓存预编译语句。</p>
<p>使用缓存预编译语句可以显著提高查询性能，特别是对于执行相同的查询的情况。</p>
<h4 id="关闭默认事务" tabindex="-1"><a class="header-anchor" href="#关闭默认事务" aria-hidden="true">#</a> 关闭默认事务</h4>
<p>GORM 默认在每次数据库操作时都会启用事务，但是有时候我们不需要这样。</p>
<p>在 GORM 中关闭默认事务可以使用 gorm.Open 方法打开数据库连接时的参数。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"mysql"</span><span class="token punctuation">,</span> <span class="token string">"user:password@/dbname?charset=utf8&amp;parseTime=True&amp;loc=Local&amp;autocommit=true"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，<code v-pre>autocommit=true</code> 参数告诉 GORM 在每次操作时不启用事务。如果不需要事务，这样做可以提高性能。</p>
<p>注意：关闭事务后需要自己手动管理事务，如果需要事务支持，请不要关闭默认事务。</p>
<h3 id="gorm生态" tabindex="-1"><a class="header-anchor" href="#gorm生态" aria-hidden="true">#</a> GORM生态</h3>
<table>
<thead>
<tr>
<th>扩展名称</th>
<th>描述</th>
<th>GitHub地址</th>
</tr>
</thead>
<tbody>
<tr>
<td>GORM 代码生成工具</td>
<td>可以根据数据库表结构自动生成 Go 代码，帮助使用 GORM 的用户更快速地开发</td>
<td>https://github.com/go-gorm/gen</td>
</tr>
<tr>
<td>GORM 分片库方案</td>
<td>对 GORM 进行的分片库扩展，可以帮助用户管理分片数据库</td>
<td>https://github.com/go-gorm/sharding</td>
</tr>
<tr>
<td>GORM 手动索引</td>
<td>帮助用户在 GORM 中手动创建索引</td>
<td>https://github.com/go-gorm/hints</td>
</tr>
<tr>
<td>GORM 乐观锁</td>
<td>对 GORM 进行的乐观锁扩展，可以帮助用户处理并发冲突</td>
<td>https://github.com/go-gorm/optimisticlock</td>
</tr>
<tr>
<td>GORM 读写分离</td>
<td>对 GORM 进行的读写分离扩展，可以帮助用户优化数据库性能</td>
<td>https://github.com/go-gorm/dbresolver</td>
</tr>
<tr>
<td>GORM OpenTelemetry 扩展</td>
<td>对 GORM 进行的 OpenTelemetry 扩展，可以帮助用户对 GORM 的性能进行监控和追踪</td>
<td>https://github.com/go-gorm/opentelemetry</td>
</tr>
</tbody>
</table>
<p>更多用法：<a href="https://gorm.cn" target="_blank" rel="noopener noreferrer">https://gorm.cn<ExternalLinkIcon/></a></p>
<h2 id="kitex" tabindex="-1"><a class="header-anchor" href="#kitex" aria-hidden="true">#</a> Kitex</h2>
<ul>
<li>[x] <a href="https://github.com/cloudwego/kitex/" target="_blank" rel="noopener noreferrer">github地址<ExternalLinkIcon/></a></li>
</ul>
<p>Kitex是字节内部的Golang微服务PRC框架。</p>
<p>Kitex是一个高性能的开源网络库，它具有高性能、低延迟和高可靠性特点。它支持多种协议，如TCP、UDP、HTTP和RPC等，可以用于构建分布式系统、微服务和云计算等应用。 Kitex的主要用途是在应用程序中提供高性能的网络通信支持，并帮助开发人员更轻松地实现分布式应用程序和微服务。</p>
<p>Kitex 目前对 Windows 的支持不完善，如果本地开发环境是 windows 的话需要用到 虚拟机或者是 WSL2。</p>
<p><strong>安装代码生成工具：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go install github.com/cloudwego/kitex/tool/cmd/kitex@latest
go install github.com/cloudwego/thriftgo@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>验证：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kitex -version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="定义-idl" tabindex="-1"><a class="header-anchor" href="#定义-idl" aria-hidden="true">#</a> 定义 IDL</h3>
<p>IDL (Interface Definition Language) 是指接口定义语言，是用于描述远程过程调用（RPC）或对象请求代理（ORP）接口的语言。 IDL 中定义了远程对象的接口，其中包括方法名称、参数类型和返回值类型等信息。这些信息可以用于生成代码来实现远程调用。常见的 IDL 标准有 CORBA 和 Microsoft COM/DCOM。</p>
<h3 id="生成代码" tabindex="-1"><a class="header-anchor" href="#生成代码" aria-hidden="true">#</a> 生成代码</h3>
<p>使用下面的命令生成代码：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kitex <span class="token parameter variable">-module</span> example <span class="token parameter variable">-service</span> example echo.thrift
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>RPC（Remote Procedure Call Protocol）远程过程调用协议。一个通俗的描述是：客户端在不知道调用细节的情况下，调用存在于远程计算机上的某个对象，就像调用本地应用程序中的对象一样。比较正式的描述是：一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 使用IDL定义服务与接口</span>
<span class="token comment">/*
如果我们要进行PRC，就需要知道对方的接口是什么，需要传什么参数，同时也需要知道返回值时什么样的，这个时候，就需要通过IDL来约定双方的协议，就像在写代码的时候需要调用某个函数，我们需要知道函数签名一样。
*/</span>
<span class="token comment">// Thrift: https://thrift.apache.org/docs/idl</span>
<span class="token comment">// Proto3: https://developers.google.com/protocol-buffers/docs/proto3</span>

namespace <span class="token keyword">go</span> api

<span class="token keyword">struct</span> Request <span class="token punctuation">{</span>
    <span class="token number">1</span><span class="token punctuation">:</span> <span class="token builtin">string</span> message
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> Response <span class="token punctuation">{</span>
    <span class="token number">1</span><span class="token punctuation">:</span> <span class="token builtin">string</span> message
<span class="token punctuation">}</span>

service Echo <span class="token punctuation">{</span>
    Response <span class="token function">echo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">:</span> Request req<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>文件说明</strong>：</p>
<ul>
<li>build.sh：构建脚本</li>
<li>kitex_gen：IDL内容相关的生成代码，主要是基础的Server/Client代码</li>
<li>main.go：程序入口</li>
<li>handler.go：用户在该文件里实现IDLservice定义的方法</li>
</ul>
<p>服务默认监听8888端口；</p>
<p>Kitex Client发起请求：</p>
<ul>
<li>创建Client</li>
<li>发起请求</li>
</ul>
<p>Kitex服务注册与发现：</p>
<p>目前Kitex的服务注册与发现已经对接了主流的服务注册与发现中心，如ETCD，Nacos等；</p>
<p>Kitex生态：</p>
<p>详见：<code v-pre>https://www.cloudwego.io/zh/docs/kitex/</code></p>
<p><img src="http://sm.nsddd.top/sm202301272042483.png" alt="image-20230127204236167"></p>
<p><strong>发起请求：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301272042324.png" alt="image-20230127204252098"></p>
<h3 id="kitex-服务注册与发现" tabindex="-1"><a class="header-anchor" href="#kitex-服务注册与发现" aria-hidden="true">#</a> Kitex 服务注册与发现</h3>
<p>目前的 Kitex 的服务注册与发现已经对接了主流的服务注册与发现中心，如 ETCD 、Nacos</p>
<p><img src="http://sm.nsddd.top/sm202301272043745.png" alt="image-20230127204301522"></p>
<p><img src="http://sm.nsddd.top/sm202301272043419.png" alt="image-20230127204312988"></p>
<h3 id="生态" tabindex="-1"><a class="header-anchor" href="#生态" aria-hidden="true">#</a> 生态</h3>
<p><img src="http://sm.nsddd.top/sm202301272043192.png" alt="image-20230127204326966"></p>
<h2 id="hertz" tabindex="-1"><a class="header-anchor" href="#hertz" aria-hidden="true">#</a> Hertz</h2>
<p>Hertz 是字节内部的 HTTP 框架。</p>
<p>Hertz 是字节跳动服务框架团队研发的超大规模的企业级微服务 HTTP 框架，具有 <strong>高易用性、易扩展、低时延</strong> 等特点。在经过了字节跳动内部一年多的使用和迭代，如今已在 CloudWeGo 正式开源。目前，<code v-pre>Hertz</code> 已经成为了字节跳动内部最大的 <code v-pre>HTTP</code> 框架，线上接入的服务数量超过 1 万，峰值 QPS 超过 4 千万。除了各个业务线的同学使用外，也服务于内部很多基础组件，<strong>如：</strong> 函数计算平台 <code v-pre>FaaS</code>、压测平台、各类网关、<code v-pre>Service Mesh</code> 控制面等，均收到不错的使用反馈。在如此大规模的场景下，<code v-pre>Hertz</code> 拥有极强的稳定性和性能，在内部实践中某些典型服务，如框架占比较高的服务、网关等服务，迁移 <code v-pre>Hertz</code> 后相比 Gin 框架，资源使用显著减少，CPU 使用率随流量大小降低 <code v-pre>30%-60%</code>，时延也有明显降低。</p>
<p>Hertz 坚持内外维护一套代码，为开源使用提供了强有力的保障。通过开源， Hertz 也将丰富云原生的 Golang 中间件体系，完善 CloudWeGo 生态矩阵，为更多开发者和企业搭建云原生化的大规模分布式系统，提供一种现代的、资源高效的的技术方案。</p>
<h3 id="项目源码" tabindex="-1"><a class="header-anchor" href="#项目源码" aria-hidden="true">#</a> 项目源码</h3>
<p>最初，字节跳动内部的 HTTP 框架是对 Gin 框架的封装，具备不错的易用性、生态完善等优点。随着内部业务的不断发展，高性能、多场景的需求日渐强烈。而 Gin 是对 Golang 原生 net/http 进行的二次开发，在按需扩展和性能优化上受到很大局限。因此，为了满足业务需求，更好的服务各大业务线，2020 年初，字节跳动服务框架团队经过内部使用场景和外部主流开源 HTTP 框架 Fasthttp、Gin、Echo 的调研后，开始基于自研网络库 Netpoll 开发内部框架 Hertz，让 Hertz 在面对企业级需求时，有更好的性能及稳定性表现，也能够满足业务发展和应对不断演进的技术需求。</p>
<h3 id="架构设计" tabindex="-1"><a class="header-anchor" href="#架构设计" aria-hidden="true">#</a> 架构设计</h3>
<p>Hertz 设计之初调研了大量业界优秀的 HTTP 框架，同时参考了近年来内部实践中积累的经验。为了保证框架整体上满足：1. 极致性能优化的可能性；2. 面对未来不可控需求的扩展能力， Hertz 采用了 4 层分层设计，保证各个层级功能内聚，同时通过层级之间的接口达到灵活扩展的目标。整体架构图如图 1 所示。</p>
<p><img src="http://sm.nsddd.top/sm202301272153673.png" alt="image-20230127215358335"></p>
<p>Hertz 从上到下分为：应用层、路由层、协议层和传输层，每一层各司其职，同时公共能力被统一抽象到公共层（common），做到跨层级复用。另外，同主库一同发布的还有作为子模块的 Hz 脚手架，它能够协助使用者快速搭建出项目核心骨架以及提供实用的构建工具链。</p>
<h3 id="应用层" tabindex="-1"><a class="header-anchor" href="#应用层" aria-hidden="true">#</a> 应用层</h3>
<p>应用层是和用户直接交互的一层，提供丰富易用的 API，主要包括 Server、Client 和一些其他通用抽象。Server 提供了注册 HandlerFunc、Binding、Rendering 等能力；Client 提供了调用下游和服务发现等能力；以及抽象一个 HTTP 请求所必须涉及到的请求（Request）、响应（Response）、上下文（RequestContext）、中间件（Middleware）等等。Hertz 的 Server 和 Client 都能够提供中间件这样的扩展能力。</p>
<p>应用层中一个非常重要的抽象就是对 Server HandlerFunc 的抽象。早期，Hertz 路由的处理函数 （HandlerFunc）中并没有接收标准的 <code v-pre>context.Context</code>，我们在大量的实践过程中发现，业务方通常需要一个标准的上下文在 RPC Client 或者日志、Tracing 等组件间传递，但由于请求上下文（RequestContext）生命周期局限于一次 HTTP 请求之内，而以上提到的场景往往存在异步的传递和处理，导致如果直接传递请求上下文，会导致出现一些数据不一致的问题。为此我们做了诸多尝试，但是因为核心原因在于请求上下文（RequestContext）的生命周期无法优雅的按需延长，最终在各种设计权衡下，我们在路由的处理函数签名中增加一个标准的上下文入参，通过分离出生命周期长短各异的两个上下文的方式，从根本上解决各种因为上下文生命周期不一致导致的异常问题，即：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> HandlerFunc <span class="token keyword">func</span><span class="token punctuation">(</span>c context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> ctx <span class="token operator">*</span>app<span class="token punctuation">.</span>RequestContext<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="路由层" tabindex="-1"><a class="header-anchor" href="#路由层" aria-hidden="true">#</a> 路由层</h3>
<p>路由层负责根据 URI 匹配对应的处理函数。</p>
<p>起初，Hertz 的路由基于 httprouter 开发，但随着使用的用户越来越多，httprouter 渐渐不能够满足需求，主要体现在 httprouter 不能够同时注册静态路由和参数路由，即 /a/b，/:c/d 这两个路由不能够同时注册；甚至有一些更特殊的需求，如/a/b、/:c/b ，当匹配 /a/b 路由时，两个路由都能够匹配上。</p>
<p>Hertz 为满足这些需求重新构造了路由树，用户在注册路由时拥有很高的自由度：支持静态路由、参数路由的注册；支持按优先级匹配，如上述例子会优先匹配静态路由 /a/b ；支持路由回溯，如注册 /a/b、/:c/d，当匹配 /a/d 时仍然能够匹配上；支持尾斜线重定向，如注册 /a/b，当匹配 /a/b/ 时能够重定向到 /a/b 上。Hertz 提供了丰富的路由能力来满足用户的需求，更多的功能可以参考 Hertz 配置文档。</p>
<p><img src="http://sm.nsddd.top/sm202301272204268.png" alt="image-20230127220436931"></p>
<h3 id="协议层" tabindex="-1"><a class="header-anchor" href="#协议层" aria-hidden="true">#</a> 协议层</h3>
<p>协议层负责不同协议的实现和扩展。</p>
<p>Hertz 支持协议的扩展，用户只需要实现下面的接口便可以按照自己的需求在引擎（Engine） 上扩展协议，同时也支持通过 ALPN 协议协商的方式注册。Hertz 首批只开源了 <code v-pre>HTTP1</code> 实现，未来会陆续开源 <code v-pre>HTTP2</code>、QUIC 等实现。协议层扩展提供的灵活性甚至可以超越 HTTP 协议的范畴，用户完全可以按需注册任意符合自身需求的协议层实现，并且加入到 Hertz 的引擎中来，同时，也能够无缝享受到传输层带来的极致性能。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> ServerFactory <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">New</span><span class="token punctuation">(</span>core Core<span class="token punctuation">)</span> <span class="token punctuation">(</span>server protocol<span class="token punctuation">.</span>Server<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Server <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Serve</span><span class="token punctuation">(</span>c context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> conn network<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="传输层" tabindex="-1"><a class="header-anchor" href="#传输层" aria-hidden="true">#</a> 传输层</h3>
<p>传输层负责底层的网络库的抽象和实现。</p>
<p>Hertz 支持底层网络库的扩展。Hertz 原生完美适配 Netpoll，在时延方面有很多深度的优化，非常适合时延敏感的业务接入。Netpoll 对 TLS 能力的支持有待完善，而 TLS 能力又是 HTTP 框架必备能力，为此 Hertz 底层同时支持基于 Golang 标准网络库的实现适配，支持网络库的一键切换，用户可根据自己的需求选择合适的网络库进行替换。如果用户有更加高效的网络库或其他网络库需求，也完全可以根据需求自行扩展。</p>
<h4 id="hz-脚手架" tabindex="-1"><a class="header-anchor" href="#hz-脚手架" aria-hidden="true">#</a> Hz 脚手架</h4>
<p>与 Hertz 一并开源的还有一个易用的命令行工具 Hz，用户只需提供一个 IDL，根据定义好的接口信息，Hz 便可以一键生成项目脚手架，让 Hertz 达到开箱即用的状态；Hz 也支持基于 IDL 的更新能力，能够基于 IDL 变动智能地更新项目代码。目前 Hz 支持了 Thrift 和 Protobuf 两种 IDL 定义。命令行工具内置丰富的选项，可以根据自己的需求使用。同时它底层依赖 Protobuf 官方的编译器和自研的 Thriftgo 的编译器，两者都支持自定义的生成代码插件。如果默认模板不能够满足需求，完全能够按需定义。</p>
<p>未来，我们将继续迭代 Hz，持续集成各种常用的中间件，提供更高层面的模块化构建能力。给 Hertz 的用户提供按需调整的能力，通过灵活的自定义配置打造一套满足自身开发需求的脚手架。</p>
<h4 id="common-组件" tabindex="-1"><a class="header-anchor" href="#common-组件" aria-hidden="true">#</a> Common 组件</h4>
<p>Common 组件主要存放一些公共的能力，比如错误处理、单元测试能力、可观测性相关能力（Log、Trace、Metrics 等）。对于服务可观测性的能力，Hertz 提供了默认的实现，用户可以按需装配；如果用户有特殊的需求，也可以通过 Hertz 提供的接口注入。比如对于 Trace 能力，Hertz 提供了默认的实现，也提供了将 Hertz 和 Kitex 串起来的 Example。如果想注入自己的实现，也可以实现下面的接口：</p>
<p>复制</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Tracer is executed at the start and finish of an HTTP.</span>
<span class="token keyword">type</span> Tracer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
        <span class="token function">Start</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> c <span class="token operator">*</span>app<span class="token punctuation">.</span>RequestContext<span class="token punctuation">)</span> context<span class="token punctuation">.</span>Context
        <span class="token function">Finish</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> c <span class="token operator">*</span>app<span class="token punctuation">.</span>RequestContext<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hertz-中间件" tabindex="-1"><a class="header-anchor" href="#hertz-中间件" aria-hidden="true">#</a> Hertz 中间件</h3>
<p>Hertz 除了提供 Server 的中间件能力，还提供了 Client 中间件能力。用户可以使用中间件能力将通用逻辑（如：日志记录、性能统计、异常处理、鉴权逻辑等等）和业务逻辑区分开，让用户更加专注于业务代码。Server 和 Client 中间件使用方式相同，使用 Use 方法注册中间件，中间件执行顺序和注册顺序相同，同时支持预处理和后处理逻辑。</p>
<p><img src="http://sm.nsddd.top/sm202301272215831.png" alt="image-20230127221552419"></p>
<p>Server 和 Client 的中间件实现方式并不相同。对于 Server 来说，我们希望减少栈的深度，同时也希望中间件能够默认的执行下一个，用户需要手动终止中间件的执行。因此，我们将 Server 的中间件分成了两种类型，即不在同一个函数调用栈（该中间件调用完后返回，由上一个中间件调用下一个中间件，如图 2 中 B 和 C）和在同一个函数调用栈的中间件（该中间件调用完后由该中间件继续调用下一个中间件，如图 2 中 C 和 Business Handler）。</p>
<p><img src="http://sm.nsddd.top/sm202301272207362.png" alt="image-20230127220729078"></p>
<p>其核心是需要一个地方存下当前的调用位置 index，并始终保持其递增。恰好 RequestContext 就是一个存储 index 合适的位置。但是对于 Client，由于没有合适的地方存储 index，我们只能退而求其次，抛弃 index 的实现，将所有的中间件构造在同一调用链上，需要用户手动调用下一个中间件。</p>
<h3 id="hertz代码生成工具" tabindex="-1"><a class="header-anchor" href="#hertz代码生成工具" aria-hidden="true">#</a> Hertz代码生成工具</h3>
<p><img src="http://sm.nsddd.top/sm202301272216988.png" alt="image-20230127221632637"></p>
<p><img src="http://sm.nsddd.top/sm202301272216143.png" alt="image-20230127221625700"></p>
<h3 id="hertz-性能" tabindex="-1"><a class="header-anchor" href="#hertz-性能" aria-hidden="true">#</a> Hertz 性能</h3>
<p>hertz 的性能非常不错</p>
<p>Hertz 使用字节跳动自研高性能网络库 Netpoll，在提高网络库效率方面有诸多实践，参考已发布文章字节跳动在 Go 网络库上的实践。除此之外，Netpoll 还针对 HTTP 场景进行优化，通过减少拷贝和系统调用次数提高吞吐以及降低时延。为了衡量 Hertz 性能指标，我们选取了社区中有代表性的框架 Gin（net/http）和 Fasthttp 作为对比，可以看到，Hertz 的极限吞吐、TP99 等指标均处于业界领先水平。未来，Hertz 还将继续和 Netpoll 深度配合，探索 HTTP 框架性能的极限。</p>
<p><img src="http://sm.nsddd.top/sm202301272221082.png" alt="image-20230127222150908"></p>
<p><img src="http://sm.nsddd.top/sm202301272220139.png" alt="image-20230127222008547"></p>
<h2 id="笔记项目" tabindex="-1"><a class="header-anchor" href="#笔记项目" aria-hidden="true">#</a> 笔记项目</h2>
<ul>
<li><a href="https://github.com/cloudwego/kitex-examples/tree/main/bizdemo/easy_note" target="_blank" rel="noopener noreferrer">https://github.com/cloudwego/kitex-examples/tree/main/bizdemo/easy_note<ExternalLinkIcon/></a></li>
</ul>
<p><img src="http://sm.nsddd.top/sm202301272222973.png" alt="image-20230127222247737"></p>
<table>
<thead>
<tr>
<th>Service Name</th>
<th>Usage</th>
<th>Framework</th>
<th>protocol</th>
<th>Path</th>
<th>IDL</th>
</tr>
</thead>
<tbody>
<tr>
<td>demoapi</td>
<td>http interface</td>
<td>kitex/hertz</td>
<td>http</td>
<td>bizdemo/easy_note/cmd/api</td>
<td></td>
</tr>
<tr>
<td>demouser</td>
<td>user data management</td>
<td>kitex/gorm</td>
<td>protobuf</td>
<td>bizdemo/easy_note/cmd/user</td>
<td>bizdemo/easy_note/idl/user.proto</td>
</tr>
<tr>
<td>demonote</td>
<td>note data management</td>
<td>kitex/gorm</td>
<td>thrift</td>
<td>bizdemo/easy_note/cmd/note</td>
<td>bizdemo/easy_note/idl/note.thrift</td>
</tr>
</tbody>
</table>
<p><strong>项目模板：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301272225986.png" alt="image-20230127222531947"></p>
<p><strong>项目调用关系：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301272225539.png" alt="image-20230127222554091"></p>
<p>API 并不是和数据库打交道的，这样好处是可以复用接口，可扩展性强。</p>
<p><strong>技术栈：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301272228762.png" alt="image-20230127222808115"></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/28.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/30.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


