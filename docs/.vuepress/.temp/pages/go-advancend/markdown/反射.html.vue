<template><div><h1 id="go语言反射" tabindex="-1"><a class="header-anchor" href="#go语言反射" aria-hidden="true">#</a> Go语言反射</h1>
<nav class="table-of-contents"><ul><li><router-link to="#反射">反射</router-link><ul><li><router-link to="#反射的基本介绍">反射的基本介绍</router-link></li><li><router-link to="#反射应用场景">反射应用场景</router-link></li><li><router-link to="#反射重要概念❤️">反射重要概念❤️</router-link></li><li><router-link to="#反射入门案列">反射入门案列</router-link></li><li><router-link to="#反射注意事项">反射注意事项</router-link></li><li><router-link to="#反射最佳案例">反射最佳案例</router-link></li></ul></li></ul></nav>
<p>[toc]</p>
<p>😶‍🌫️go语言官方编程指南：<a href="https://golang.org/#" target="_blank" rel="noopener noreferrer">https://golang.org/#<ExternalLinkIcon/></a></p>
<blockquote>
<p>go语言的官方文档学习笔记很全，推荐去官网学习</p>
</blockquote>
<p>😶‍🌫️我的学习笔记：github: <a href="https://github.com/3293172751/golang-rearn" target="_blank" rel="noopener noreferrer">https://github.com/3293172751/golang-rearn<ExternalLinkIcon/></a></p>
<hr>
<p><strong>区块链技术（也称之为分布式账本技术）</strong>，是一种互联网数据库技术，其特点是去中心化，公开透明，让每一个人均可参与的数据库记录</p>
<blockquote>
<p>❤️💕💕关于区块链技术，可以关注我，共同学习更多的区块链技术。博客<a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<h2 id="反射" tabindex="-1"><a class="header-anchor" href="#反射" aria-hidden="true">#</a> 反射</h2>
<blockquote>
<p>比如在写适配器函数的时候，我们此时就需要用到反射标记</p>
</blockquote>
<h3 id="反射的基本介绍" tabindex="-1"><a class="header-anchor" href="#反射的基本介绍" aria-hidden="true">#</a> 反射的基本介绍</h3>
<ol>
<li><strong>反射可以在运行的时候动态获取变量的各种信息，比如说变量的类型（type),类别(kind)</strong></li>
<li><strong>如果是结构体变量，还可以获取到结构体本身的信息（包括结构体的字段，方法）</strong></li>
<li><strong>通过反射，可以修改变量的值，可以调用关联的方法</strong></li>
<li><strong>使用反射，需要用到一个包import(“reflect”)</strong></li>
</ol>
<hr>
<p><strong><a href="https://pkg.go.dev/std" target="_blank" rel="noopener noreferrer">🖱️ 打开包网页<ExternalLinkIcon/></a></strong></p>
<p><code v-pre>package reflect</code><strong>包</strong></p>
<blockquote>
<p>==包反射实现运行时反射==，允许程序操作任意类型的对象。典型的用法是取一个静态类型 interface{} 的值，通过调用 TypeOf 提取其动态类型信息，返回一个 Type。</p>
<p>对 ValueOf 的调用会返回一个表示运行时数据的值。Zero 接受一个 Type 并返回一个 Value，表示该类型的零值。</p>
</blockquote>
<p><strong>所以反射我们可以取出值但是没有办法进行操作，编译器通不过，此时需要进行断言</strong></p>
<p><strong>我们通过反射获取到type</strong></p>
<h4 id="type-type-¶" tabindex="-1"><a class="header-anchor" href="#type-type-¶" aria-hidden="true">#</a> type <a href="https://cs.opensource.google/go/go/+/go1.18:src/reflect/type.go;l=39" target="_blank" rel="noopener noreferrer">Type<ExternalLinkIcon/></a> <a href="https://pkg.go.dev/reflect@go1.18#Type" target="_blank" rel="noopener noreferrer">¶<ExternalLinkIcon/></a></h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Type <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token comment">// Kind返回该接口的具体分类</span>
    <span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Kind
    <span class="token comment">// Name返回该类型在自身包内的类型名，如果是未命名类型会返回""</span>
    <span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
    <span class="token comment">// PkgPath返回类型的包路径，即明确指定包的import路径，如"encoding/base64"</span>
    <span class="token comment">// 如果类型为内建类型(string, error)或未命名类型(*T, struct{}, []int)，会返回""</span>
    <span class="token function">PkgPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
    <span class="token comment">// 返回类型的字符串表示。该字符串可能会使用短包名（如用base64代替"encoding/base64"）</span>
    <span class="token comment">// 也不保证每个类型的字符串表示不同。如果要比较两个类型是否相等，请直接用Type类型比较。</span>
    <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
    <span class="token comment">// 返回要保存一个该类型的值需要多少字节；类似unsafe.Sizeof</span>
    <span class="token function">Size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">uintptr</span>
    <span class="token comment">// 返回当从内存中申请一个该类型值时，会对齐的字节数</span>
    <span class="token function">Align</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回当该类型作为结构体的字段时，会对齐的字节数</span>
    <span class="token function">FieldAlign</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 如果该类型实现了u代表的接口，会返回真</span>
    <span class="token function">Implements</span><span class="token punctuation">(</span>u Type<span class="token punctuation">)</span> <span class="token builtin">bool</span>
    <span class="token comment">// 如果该类型的值可以直接赋值给u代表的类型，返回真</span>
    <span class="token function">AssignableTo</span><span class="token punctuation">(</span>u Type<span class="token punctuation">)</span> <span class="token builtin">bool</span>
    <span class="token comment">// 如该类型的值可以转换为u代表的类型，返回真</span>
    <span class="token function">ConvertibleTo</span><span class="token punctuation">(</span>u Type<span class="token punctuation">)</span> <span class="token builtin">bool</span>
    <span class="token comment">// 返回该类型的字位数。如果该类型的Kind不是Int、Uint、Float或Complex，会panic</span>
    <span class="token function">Bits</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回array类型的长度，如非数组类型将panic</span>
    <span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回该类型的元素类型，如果该类型的Kind不是Array、Chan、Map、Ptr或Slice，会panic</span>
    <span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Type
    <span class="token comment">// 返回map类型的键的类型。如非映射类型将panic</span>
    <span class="token function">Key</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Type
    <span class="token comment">// 返回一个channel类型的方向，如非通道类型将会panic</span>
    <span class="token function">ChanDir</span><span class="token punctuation">(</span><span class="token punctuation">)</span> ChanDir
    <span class="token comment">// 返回struct类型的字段数（匿名字段算作一个字段），如非结构体类型将panic</span>
    <span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回struct类型的第i个字段的类型，如非结构体或者i不在[0, NumField())内将会panic</span>
    <span class="token function">Field</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> StructField
    <span class="token comment">// 返回索引序列指定的嵌套字段的类型，</span>
    <span class="token comment">// 等价于用索引中每个值链式调用本方法，如非结构体将会panic</span>
    <span class="token function">FieldByIndex</span><span class="token punctuation">(</span>index <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> StructField
    <span class="token comment">// 返回该类型名为name的字段（会查找匿名字段及其子字段），</span>
    <span class="token comment">// 布尔值说明是否找到，如非结构体将panic</span>
    <span class="token function">FieldByName</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>StructField<span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
    <span class="token comment">// 返回该类型第一个字段名满足函数match的字段，布尔值说明是否找到，如非结构体将会panic</span>
    <span class="token function">FieldByNameFunc</span><span class="token punctuation">(</span>match <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>StructField<span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
    <span class="token comment">// 如果函数类型的最后一个输入参数是"..."形式的参数，IsVariadic返回真</span>
    <span class="token comment">// 如果这样，t.In(t.NumIn() - 1)返回参数的隐式的实际类型（声明类型的切片）</span>
    <span class="token comment">// 如非函数类型将panic</span>
    <span class="token function">IsVariadic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
    <span class="token comment">// 返回func类型的参数个数，如果不是函数，将会panic</span>
    <span class="token function">NumIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回func类型的第i个参数的类型，如非函数或者i不在[0, NumIn())内将会panic</span>
    <span class="token function">In</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> Type
    <span class="token comment">// 返回func类型的返回值个数，如果不是函数，将会panic</span>
    <span class="token function">NumOut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回func类型的第i个返回值的类型，如非函数或者i不在[0, NumOut())内将会panic</span>
    <span class="token function">Out</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> Type
    <span class="token comment">// 返回该类型的方法集中方法的数目</span>
    <span class="token comment">// 匿名字段的方法会被计算；主体类型的方法会屏蔽匿名字段的同名方法；</span>
    <span class="token comment">// 匿名字段导致的歧义方法会滤除</span>
    <span class="token function">NumMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
    <span class="token comment">// 返回该类型方法集中的第i个方法，i不在[0, NumMethod())范围内时，将导致panic</span>
    <span class="token comment">// 对非接口类型T或*T，返回值的Type字段和Func字段描述方法的未绑定函数状态</span>
    <span class="token comment">// 对接口类型，返回值的Type字段描述方法的签名，Func字段为nil</span>
    <span class="token function">Method</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span> Method
    <span class="token comment">// 根据方法名返回该类型方法集中的方法，使用一个布尔值说明是否发现该方法</span>
    <span class="token comment">// 对非接口类型T或*T，返回值的Type字段和Func字段描述方法的未绑定函数状态</span>
    <span class="token comment">// 对接口类型，返回值的Type字段描述方法的签名，Func字段为nil</span>
    <span class="token function">MethodByName</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>Method<span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
    <span class="token comment">// 内含隐藏或非导出方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>通过反射我们获取到<code v-pre>reflect.Type</code>类型，通过这个类型我们可以使用方法反向操作</p>
</blockquote>
<h3 id="反射应用场景" tabindex="-1"><a class="header-anchor" href="#反射应用场景" aria-hidden="true">#</a> 反射应用场景</h3>
<h5 id="_1-不知道接口调用的是哪个函数" tabindex="-1"><a class="header-anchor" href="#_1-不知道接口调用的是哪个函数" aria-hidden="true">#</a> 1. 不知道接口调用的是哪个函数</h5>
<p><strong>2. 对结构体序列化时，如果结构体有指定tag,也会使用到反射生成对应的字符串</strong></p>
<hr>
<h3 id="反射重要概念❤️" tabindex="-1"><a class="header-anchor" href="#反射重要概念❤️" aria-hidden="true">#</a> 反射重要概念❤️</h3>
<p>1 . <strong>reflect.TypeOf(变量名),获取变量类型，返回的是reflect.Type类型</strong></p>
<ol start="2">
<li>
<p><strong>reflect.ValueOf(变量名),获取变量的值，返回reflect.Value类型，是一个结构体类型，通过它可以获取到该变量的更多信息</strong></p>
</li>
<li>
<p><strong>变量、interface{}（空接口）和reflect.Value是可以相互转换的，这点在实际开发中经常用到</strong></p>
</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> student Stu <span class="token comment">//结构体</span>
<span class="token keyword">var</span> num <span class="token builtin">int</span>    <span class="token comment">//变量</span>

<span class="token comment">//专门用作反射函数</span>
<span class="token keyword">func</span> <span class="token function">test</span><span class="token punctuation">(</span>b <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//如何将interface转化为reflect.Value</span>
    rVal <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
    
    <span class="token comment">//如何将reflect.Value转成空接口类型</span>
    iVal <span class="token operator">:=</span> rVal<span class="token punctuation">.</span><span class="token keyword">interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment">//如何将interface空接口转为原变量类型 - - 使用类型断言即可</span>
    v <span class="token operator">:=</span> iVal<span class="token punctuation">.</span><span class="token punctuation">(</span>Stu<span class="token punctuation">)</span>       <span class="token comment">//直接转化类型断言到变量</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="反射入门案列" tabindex="-1"><a class="header-anchor" href="#反射入门案列" aria-hidden="true">#</a> 反射入门案列</h3>
<blockquote>
<p>演示对基本数据类型，空接口和反射基本操作</p>
</blockquote>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*************************************************************************
    > File Name: reflect.go
    > Author: smile
    > Mail: 3293172751nss@gmail.com 
    > Created Time: Wed 23 Mar 2022 04:19:19 PM CST
 ************************************************************************/</span>

 <span class="token keyword">package</span> main
 <span class="token keyword">import</span><span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">reflectInterface</span><span class="token punctuation">(</span>b <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//通过反射 获取到传入的变量的type kind value </span>
    <span class="token comment">//rType r开头的表示这种type是</span>
    rType <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"rType = "</span><span class="token punctuation">,</span>rType<span class="token punctuation">)</span> <span class="token comment">//打印出int</span>

    <span class="token comment">//获取到reflect类型</span>
    rVal <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"rVal = "</span><span class="token punctuation">,</span>rVal<span class="token punctuation">)</span> <span class="token comment">//打印出数字100，虽然是100但不是普通的100,rval 不能进行计算</span>

    <span class="token comment">//查看rVal的真正类型</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"rVal = %v  rVal type = %T\n "</span><span class="token punctuation">,</span>rVal<span class="token punctuation">,</span>rVal<span class="token punctuation">)</span> <span class="token comment">//打印出int</span>

    <span class="token comment">//我们看下文档，对rVal进行计算</span>
    <span class="token comment">// n1 := 12  //不能使用n1变量进行加减</span>
    <span class="token comment">//如果类型是float，那么此时需要用到断言</span>
    n2 <span class="token operator">:=</span> <span class="token number">11</span> <span class="token operator">+</span> rVal<span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"n2 = "</span><span class="token punctuation">,</span>n2<span class="token punctuation">)</span>

    <span class="token comment">//我们已经把变量交给接口，而且拿到了反射的value，那么此时怎么把它重新转化为intterface{}</span>
    iv <span class="token operator">:=</span> rVal<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">//将interface通过断言转化为需要的类型</span>
    num2 <span class="token operator">:=</span> iv<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"num2 = "</span><span class="token punctuation">,</span>num2<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"iv = "</span><span class="token punctuation">,</span>iv<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//专门演示反射，对结构体的反思</span>
<span class="token keyword">func</span> <span class="token function">reflectTest</span><span class="token punctuation">(</span>b <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//rType r开头的表示这种type是</span>
    rType <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"rType = "</span><span class="token punctuation">,</span>rType<span class="token punctuation">)</span> <span class="token comment">//打印出int</span>

    <span class="token comment">//获取到reflect类型</span>
    rVal <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"rVal = "</span><span class="token punctuation">,</span>rVal<span class="token punctuation">)</span> <span class="token comment">//打印出数字100，虽然是100但不是普通的100,rval 不能进行计算</span>


    <span class="token comment">//我们已经把变量交给接口，而且拿到了反射的value，那么此时怎么把它重新转化为intterface{}</span>
    iv <span class="token operator">:=</span> rVal<span class="token punctuation">.</span><span class="token function">Interface</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"iv = %v iv type = %T"</span><span class="token punctuation">,</span>iv<span class="token punctuation">,</span>iv<span class="token punctuation">)</span> 
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span>
    
    <span class="token comment">//通过断言转化为需要的数据类型，通过swich或者使用简单的类型断言</span>
    stu<span class="token punctuation">,</span>ok <span class="token operator">:=</span> iv<span class="token punctuation">.</span><span class="token punctuation">(</span>Student<span class="token punctuation">)</span>
    <span class="token keyword">if</span> ok <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"student.Name = "</span><span class="token punctuation">,</span>stu<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"student"</span><span class="token punctuation">,</span>b<span class="token punctuation">.</span><span class="token punctuation">(</span>Student<span class="token punctuation">)</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"student.Name = "</span><span class="token punctuation">,</span>b<span class="token punctuation">.</span><span class="token punctuation">(</span>Student<span class="token punctuation">)</span><span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span><span class="token punctuation">{</span>
    Name <span class="token builtin">string</span> 
    Age <span class="token builtin">int</span>

<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//基本操作</span>

    <span class="token keyword">var</span> num <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">100</span>

    <span class="token function">reflectInterface</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"分割线"</span><span class="token punctuation">,</span><span class="token string">"---------------------------------------"</span><span class="token punctuation">)</span>
    stu <span class="token operator">:=</span> Student<span class="token punctuation">{</span>
        Name <span class="token punctuation">:</span> <span class="token string">"tom"</span><span class="token punctuation">,</span>
        Age <span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    <span class="token function">reflectTest</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@mail golang<span class="token punctuation">]</span><span class="token comment"># go run  reflect.go</span>
rType <span class="token operator">=</span>  int
rVal <span class="token operator">=</span>  <span class="token number">100</span>
rVal <span class="token operator">=</span> <span class="token number">100</span>  rVal <span class="token builtin class-name">type</span> <span class="token operator">=</span> reflect.Value
 n2 <span class="token operator">=</span>  <span class="token number">111</span>
num2 <span class="token operator">=</span>  <span class="token number">100</span>
iv <span class="token operator">=</span>  <span class="token number">100</span>
分割线 ---------------------------------------
rType <span class="token operator">=</span>  main.Student
rVal <span class="token operator">=</span>  <span class="token punctuation">{</span>tom <span class="token number">20</span><span class="token punctuation">}</span>
iv <span class="token operator">=</span> <span class="token punctuation">{</span>tom <span class="token number">20</span><span class="token punctuation">}</span> iv <span class="token builtin class-name">type</span> <span class="token operator">=</span> main.Student
student.Name <span class="token operator">=</span>  tom
student <span class="token punctuation">{</span>tom <span class="token number">20</span><span class="token punctuation">}</span>
student.Name <span class="token operator">=</span>  tom
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常量</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>使用const修饰
定义必须初始化
不能修改
只能修饰bool string int float类型
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简介写法</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">const</span><span class="token punctuation">(</span>
    a <span class="token operator">=</span> <span class="token number">1</span>
    b <span class="token operator">=</span> <span class="token number">2</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>专业写法</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">const</span><span class="token punctuation">(</span>
    a <span class="token operator">=</span> inta          <span class="token comment">//a等于0</span>
    b 				  <span class="token comment">//b等于1</span>
    c				  <span class="token comment">//c等于2</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>类似于枚举哈哈</p>
</blockquote>
<h3 id="反射注意事项" tabindex="-1"><a class="header-anchor" href="#反射注意事项" aria-hidden="true">#</a> 反射注意事项</h3>
<p><strong>通过反射可以让变量在interface{}和Reflect.Value之间相互转换</strong></p>
<p><strong>如果要通过反射来修改变量，注意当使用SetXxx方法来设置需要通过对应的指针类型来完成，这样才能改变传入的变量的值，同时需要使用到<code v-pre>redlect.Value.Elem()</code>方法</strong></p>
<p><strong>注意：elme</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>Value<span class="token punctuation">)</span> Elem
<span class="token keyword">func</span> <span class="token punctuation">(</span>v Value<span class="token punctuation">)</span> <span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Elem返回v持有的接口保管的值的Value封装，或者v持有的指针指向的值的Value封装。如果v的Kind不是Interface或Ptr会panic；如果v持有的值为nil，会返回Value零值。</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span><span class="token punctuation">(</span>
	<span class="token string">"redlect"</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> str <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"tom"</span> 
    fs <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>str<span class="token punctuation">)</span>
    fs<span class="token punctuation">.</span><span class="token function">Elem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetString</span><span class="token punctuation">(</span><span class="token string">"jack"</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%v\n"</span><span class="token punctuation">,</span>str<span class="token punctuation">)</span>          <span class="token comment">//jack</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="反射最佳案例" tabindex="-1"><a class="header-anchor" href="#反射最佳案例" aria-hidden="true">#</a> 反射最佳案例</h3>
<blockquote>
<ol>
<li>使用反射来<strong>遍历结构体字段，调用结构体的方法，并获取结构体标签的值</strong></li>
</ol>
</blockquote>
<p><strong>方法</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>v Value<span class="token punctuation">)</span> <span class="token function">Method</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> Value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>v Value<span class="token punctuation">)</span> <span class="token function">Call</span><span class="token punctuation">(</span>in <span class="token punctuation">[</span><span class="token punctuation">]</span>Value<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>Value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>案例</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>
<span class="token comment">//定义了一个Monster结构体</span>
<span class="token keyword">type</span> Monster <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name  <span class="token builtin">string</span> <span class="token string">`json:"name"`</span>
	Age   <span class="token builtin">int</span> <span class="token string">`json:"monster_age"`</span>
	Score <span class="token builtin">float32</span> <span class="token string">`json:"成绩"`</span>
	Sex   <span class="token builtin">string</span>
	
<span class="token punctuation">}</span>

<span class="token comment">//方法，返回两个数的和</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s Monster<span class="token punctuation">)</span> <span class="token function">GetSum</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> n1 <span class="token operator">+</span> n2
<span class="token punctuation">}</span>
<span class="token comment">//方法， 接收四个值，给s赋值</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s Monster<span class="token punctuation">)</span> <span class="token function">Set</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> age <span class="token builtin">int</span><span class="token punctuation">,</span> score <span class="token builtin">float32</span><span class="token punctuation">,</span> sex <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s<span class="token punctuation">.</span>Name <span class="token operator">=</span> name
	s<span class="token punctuation">.</span>Age <span class="token operator">=</span> age
	s<span class="token punctuation">.</span>Score <span class="token operator">=</span> score
	s<span class="token punctuation">.</span>Sex <span class="token operator">=</span> sex
<span class="token punctuation">}</span>

<span class="token comment">//方法，显示s的值</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s Monster<span class="token punctuation">)</span> <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"---start~----"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"---end~----"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">TestStruct</span><span class="token punctuation">(</span>a <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//获取reflect.Type 类型</span>
	typ <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    
	<span class="token comment">//获取reflect.Value 类型</span>
	val <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    
	<span class="token comment">//获取到a对应的类别</span>
	kd <span class="token operator">:=</span> val<span class="token punctuation">.</span><span class="token function">Kind</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//如果传入的不是struct，就退出     --  判断是否是结构体</span>
	<span class="token keyword">if</span> kd <span class="token operator">!=</span>  reflect<span class="token punctuation">.</span>Struct <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"expect struct"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//获取到该结构体有几个字段</span>
	num <span class="token operator">:=</span> val<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"struct has %d fields\n"</span><span class="token punctuation">,</span> num<span class="token punctuation">)</span> <span class="token comment">//4</span>
	<span class="token comment">//变量结构体的所有字段</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> num<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Field %d: 值为=%v\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> val<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token comment">//获取到struct标签, 注意需要通过reflect.Type来获取tag标签的值</span>
		tagVal <span class="token operator">:=</span> typ<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"json"</span><span class="token punctuation">)</span>
        <span class="token comment">//typ中的field方法中的tag方法中的get方法  -- 获取到json </span>
		<span class="token comment">//如果该字段于tag标签就显示，否则就不显示</span>
		<span class="token keyword">if</span> tagVal <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Field %d: tag为=%v\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> tagVal<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	
	<span class="token comment">//获取到该结构体有多少个方法</span>
	numOfMethod <span class="token operator">:=</span> val<span class="token punctuation">.</span><span class="token function">NumMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"字段struct has %d methods\n"</span><span class="token punctuation">,</span> numOfMethod<span class="token punctuation">)</span>
	
	<span class="token comment">//var params []reflect.Value</span>
	<span class="token comment">//方法的排序默认是按照 函数名的排序（ASCII码）·</span>
	val<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span> <span class="token comment">//获取到第二个方法。调用它</span>

	<span class="token comment">//调用结构体的第1个方法Method(0)</span>
	<span class="token keyword">var</span> params <span class="token punctuation">[</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Value  <span class="token comment">//声明了 []reflect.Value</span>
	params <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>params<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	params <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>params<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	res <span class="token operator">:=</span> val<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span> <span class="token comment">//传入的参数是 []reflect.Value, 返回[]reflect.Value</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"res="</span><span class="token punctuation">,</span> res<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//返回结果, 返回的结果是 []reflect.Value*/</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//创建了一个Monster实例</span>
	<span class="token keyword">var</span> a Monster <span class="token operator">=</span> Monster<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span>  <span class="token string">"黄鼠狼精"</span><span class="token punctuation">,</span>
		Age<span class="token punctuation">:</span>   <span class="token number">400</span><span class="token punctuation">,</span>
		Score<span class="token punctuation">:</span> <span class="token number">30.8</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//将Monster实例传递给TestStruct函数</span>
	<span class="token function">TestStruct</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@mail go-eth<span class="token punctuation">]</span><span class="token comment"># go run  reflect.go</span>
struct has <span class="token number">4</span> fields
Field <span class="token number">0</span>: 值为<span class="token operator">=</span>黄鼠狼精
Field <span class="token number">0</span>: tag为<span class="token operator">=</span>name
Field <span class="token number">1</span>: 值为<span class="token operator">=</span><span class="token number">400</span>
Field <span class="token number">1</span>: tag为<span class="token operator">=</span>monster_age
Field <span class="token number">2</span>: 值为<span class="token operator">=</span><span class="token number">30.8</span>
Field <span class="token number">2</span>: tag为<span class="token operator">=</span>成绩
Field <span class="token number">3</span>: 值为<span class="token operator">=</span>
struct has <span class="token number">3</span> methods
---start~----
<span class="token punctuation">{</span>黄鼠狼精 <span class="token number">400</span> <span class="token number">30.8</span> <span class="token punctuation">}</span>
---end~----
<span class="token assign-left variable">res</span><span class="token operator">=</span> <span class="token number">50</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


