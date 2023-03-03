<template><div><!-- markdownlint-disable MD024 MD033 MD051 -->
<p>@slidestart</p>
<!-- .slide: data-transition="slide" -->
<h2 id="幻灯片演示" tabindex="-1"><a class="header-anchor" href="#幻灯片演示" aria-hidden="true">#</a> 幻灯片演示</h2>
<!-- .element: class="r-fit-text" -->
<p>一个简单的幻灯片演示与各种小贴士。</p>
<!-- .element: class="r-fit-text" -->
<blockquote>
<p>作者 Mr.Hope. 请滚动鼠标滚轮进入下一页</p>
</blockquote>
<hr>
<h2 id="标注幻灯片" tabindex="-1"><a class="header-anchor" href="#标注幻灯片" aria-hidden="true">#</a> 标注幻灯片</h2>
<!-- .element: class="r-fit-text" -->
<p><a href="#/1/1">👇</a></p>
<p>--</p>
<h2 id="标注幻灯片-1" tabindex="-1"><a class="header-anchor" href="#标注幻灯片-1" aria-hidden="true">#</a> 标注幻灯片</h2>
<!-- .element: class="r-fit-text" -->
<p>使用 <code v-pre>---</code> 标注水平幻灯片</p>
<!-- .element: class="fragment fade-in" -->
<p>在水平幻灯片中使用 <code v-pre>--</code> 分割垂直幻灯片</p>
<!-- .element: class="fragment fade-in" -->
<p>使用 <code v-pre>&lt;!-- .slide: ... --&gt;</code> 在幻灯片上添加属性</p>
<!-- .element: class="fragment fade-in" -->
<p>使用 <code v-pre>&lt;!-- .element: ... --&gt;</code> 在前一个 HTML 元素上添加属性</p>
<!-- .element: class="fragment fade-in" -->
<hr>
<!-- .slide: data-transition="slide" data-auto-animate -->
<h2 id="markdown" tabindex="-1"><a class="header-anchor" href="#markdown" aria-hidden="true">#</a> Markdown</h2>
<!-- .element: class="r-fit-text" -->
<p>你可以在幻灯片中使用 Markdown 语法的各种标记.</p>
<!-- .element: class="r-fit-text" -->
<p>--</p>
<!-- .slide: data-auto-animate -->
<h2 id="markdown-1" tabindex="-1"><a class="header-anchor" href="#markdown-1" aria-hidden="true">#</a> Markdown</h2>
<p>你可以在幻灯片中使用 Markdown 语法的各种标记.</p>
<h3 id="这是一个-h3" tabindex="-1"><a class="header-anchor" href="#这是一个-h3" aria-hidden="true">#</a> 这是一个 H3</h3>
<p>标题默认会自动转换为大写。</p>
<p>这是一个有着 <strong>粗体</strong>, <em>斜体</em>, <s>删除线</s> 文字并包含 <a href="https://mrhope.site" target="_blank" rel="noopener noreferrer">一个链接<ExternalLinkIcon/></a> 的段落，并且它会自动换行。所以你无需担心它的长度。</p>
<p>--</p>
<!-- .slide: data-auto-animate -->
<h2 id="markdown-2" tabindex="-1"><a class="header-anchor" href="#markdown-2" aria-hidden="true">#</a> Markdown</h2>
<p>你可以在幻灯片中使用 Markdown 语法的各种标记.</p>
<p>列表默认为 <code v-pre>inline-block</code></p>
<ul>
<li>项目</li>
<li>项目</li>
<li>项目</li>
</ul>
<ol>
<li>项目 1</li>
<li>项目 2</li>
<li>项目 3</li>
</ol>
<p>--</p>
<!-- .slide: data-auto-animate -->
<h2 id="markdown-3" tabindex="-1"><a class="header-anchor" href="#markdown-3" aria-hidden="true">#</a> Markdown</h2>
<p>你可以在幻灯片中使用 Markdown 语法的各种标记.</p>
<p>在你启用 <code v-pre>highlight</code> 插件后，代码块会自动高亮。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>--</p>
<!-- .slide: data-auto-animate -->
<h2 id="markdown-4" tabindex="-1"><a class="header-anchor" href="#markdown-4" aria-hidden="true">#</a> Markdown</h2>
<p>你可以在幻灯片中使用 Markdown 语法的各种标记.</p>
<p>在你启用 <code v-pre>math</code> 插件后，你也可以使用 TEX 格式使用数学公式。</p>
<p>$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$</p>
<p>--</p>
<!-- .slide: data-auto-animate -->
<h2 id="markdown-5" tabindex="-1"><a class="header-anchor" href="#markdown-5" aria-hidden="true">#</a> Markdown</h2>
<p>你可以在幻灯片中使用 Markdown 语法的各种标记.</p>
<p>⚠<strong>请注意</strong>: 表格和分割线，以及所有不在 Markdown 标准语法中的内容均不受支持。</p>
<hr>
<!-- .slide: data-transition="slide" data-auto-animate -->
<h2 id="布局" tabindex="-1"><a class="header-anchor" href="#布局" aria-hidden="true">#</a> 布局</h2>
<!-- .element: class="r-fit-text" -->
<p>--</p>
<!-- .slide: data-auto-animate  -->
<h2 id="布局-1" tabindex="-1"><a class="header-anchor" href="#布局-1" aria-hidden="true">#</a> 布局</h2>
<!-- .element: class="r-fit-text" -->
<p>👆 <code v-pre>r-fit-text</code> class 会让文字在不超出幻灯片范围的情况下尽可能大。</p>
<p>--</p>
<!-- .slide: data-auto-animate  -->
<h2 id="布局-2" tabindex="-1"><a class="header-anchor" href="#布局-2" aria-hidden="true">#</a> 布局</h2>
<p><img src="/logo.svg" alt="Logo"></p>
<!-- .element: class="r-stretch" -->
<p>👆 <code v-pre>r-stretch</code> class 帮助你控制注入图片或视频的大小，使它们填充满幻灯片垂直方向上的剩余空间。</p>
<p>--</p>
<!-- .slide: data-auto-animate data-background-color="rgb(70, 70, 255)" -->
<h2 id="布局-3" tabindex="-1"><a class="header-anchor" href="#布局-3" aria-hidden="true">#</a> 布局</h2>
<h3 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h3>
<p>你可以通过向特定幻灯片添加 <code v-pre>data-background</code> 属性自定义幻灯片背景.</p>
<hr>
<!-- .slide: data-auto-animate -->
<h2 id="动画片段" tabindex="-1"><a class="header-anchor" href="#动画片段" aria-hidden="true">#</a> 动画片段</h2>
<!-- .element: class="r-fit-text" -->
<p>--</p>
<!-- .slide: data-auto-animate -->
<h2 id="动画片段-1" tabindex="-1"><a class="header-anchor" href="#动画片段-1" aria-hidden="true">#</a> 动画片段</h2>
<!-- .element: class="r-fit-text" -->
<p>动画片段用于高亮或显隐幻灯片中的元素。</p>
<p>你需要在元素上添加 <code v-pre>fragment</code> 和动画 class。</p>
<p>--</p>
<!-- .slide: data-auto-animate -->
<h2 id="动画片段-2" tabindex="-1"><a class="header-anchor" href="#动画片段-2" aria-hidden="true">#</a> 动画片段</h2>
<h3 id="动画-class" tabindex="-1"><a class="header-anchor" href="#动画-class" aria-hidden="true">#</a> 动画 class</h3>
<ul>
<li><code v-pre>fade-in</code></li>
</ul>
<!-- .element: class="fragment fade-in" -->
<ul>
<li><code v-pre>fade-out</code></li>
</ul>
<!-- .element: class="fragment fade-out" -->
<ul>
<li><code v-pre>fade-up</code></li>
</ul>
<!-- .element: class="fragment fade-up" -->
<!-- list break -->
<ul>
<li><code v-pre>fade-down</code></li>
</ul>
<!-- .element: class="fragment fade-down" -->
<ul>
<li><code v-pre>fade-left</code></li>
</ul>
<!-- .element: class="fragment fade-left" -->
<ul>
<li><code v-pre>fade-right</code></li>
</ul>
<!-- .element: class="fragment fade-right" -->
<!-- list break -->
<ul>
<li><code v-pre>fade-in-then-out</code></li>
</ul>
<!-- .element: class="fragment fade-in-then-out" -->
<ul>
<li><code v-pre>fade-in-then-semi-out</code></li>
</ul>
<!-- .element: class="fragment fade-in-then-semi-out" -->
<p>--</p>
<!-- .slide: data-auto-animate -->
<h2 id="动画片段-3" tabindex="-1"><a class="header-anchor" href="#动画片段-3" aria-hidden="true">#</a> 动画片段</h2>
<h3 id="动画-class-1" tabindex="-1"><a class="header-anchor" href="#动画-class-1" aria-hidden="true">#</a> 动画 class</h3>
<ul>
<li><code v-pre>grow</code></li>
</ul>
<!-- .element: class="fragment grow" -->
<ul>
<li><code v-pre>shrink</code></li>
</ul>
<!-- .element: class="fragment shrink" -->
<ul>
<li><code v-pre>strike</code></li>
</ul>
<!-- .element: class="fragment strike" -->
<!-- list break -->
<ul>
<li><code v-pre>highlight-red</code></li>
</ul>
<!-- .element: class="fragment highlight-red" -->
<ul>
<li><code v-pre>highlight-green</code></li>
</ul>
<!-- .element: class="fragment highlight-green" -->
<ul>
<li><code v-pre>highlight-blue</code></li>
</ul>
<!-- .element: class="fragment highlight-blue" -->
<!-- list break -->
<ul>
<li><code v-pre>highlight-current-red</code></li>
</ul>
<!-- .element: class="fragment highlight-current-red" -->
<ul>
<li><code v-pre>highlight-current-green</code></li>
</ul>
<!-- .element: class="fragment highlight-current-green" -->
<ul>
<li><code v-pre>highlight-current-blue</code></li>
</ul>
<!-- .element: class="fragment highlight-current-blue" -->
<p>--</p>
<!-- .slide: data-auto-animate -->
<h2 id="动画片段-4" tabindex="-1"><a class="header-anchor" href="#动画片段-4" aria-hidden="true">#</a> 动画片段</h2>
<h3 id="多个动画片段" tabindex="-1"><a class="header-anchor" href="#多个动画片段" aria-hidden="true">#</a> 多个动画片段</h3>
<p>你可以按照顺序包裹一个 HTML 元素使其拥有多个动画片段</p>
<span class="fragment fade-in">
  <span class="fragment highlight-red">
    <span class="fragment fade-out">
      渐入 > 变红 > 渐出
    </span>
  </span>
</span>
<p>--</p>
<!-- .slide: data-auto-animate -->
<h2 id="动画片段-5" tabindex="-1"><a class="header-anchor" href="#动画片段-5" aria-hidden="true">#</a> 动画片段</h2>
<h3 id="顺序" tabindex="-1"><a class="header-anchor" href="#顺序" aria-hidden="true">#</a> 顺序</h3>
<p>你可以使用 <code v-pre>data-fragment-index</code> 属性改变元素的动画顺序。</p>
<p>不同元素可以有相同的动画顺序。</p>
<ul>
<li>最后显示</li>
</ul>
<!-- .element: class="fragment" data-fragment-index="3"-->
<ul>
<li>第二个显示</li>
</ul>
<!-- .element: class="fragment" data-fragment-index="2"-->
<!-- list break -->
<ul>
<li>第一个显示</li>
</ul>
<!-- .element: class="fragment" data-fragment-index="1"-->
<ul>
<li>第二个显示</li>
</ul>
<!-- .element: class="fragment" data-fragment-index="2"-->
<hr>
<!-- .slide: data-transition="slide" data-auto-animate -->
<h2 id="渐变" tabindex="-1"><a class="header-anchor" href="#渐变" aria-hidden="true">#</a> 渐变</h2>
<!-- .element: class="r-fit-text" -->
<p>--</p>
<!-- .slide: data-transition="slide" data-auto-animate -->
<h2 id="渐变-1" tabindex="-1"><a class="header-anchor" href="#渐变-1" aria-hidden="true">#</a> 渐变</h2>
<!-- .element: class="r-fit-text" -->
<p>Transition 可以通过配置中的 <code v-pre>transition</code> 选项全局设置，也可以通过在特定幻灯片添加 <code v-pre>data-transition</code> 属性局部设置.</p>
<p>可能的值:</p>
<ul>
<li>none</li>
<li>fade</li>
<li>slide</li>
</ul>
<!-- list break -->
<ul>
<li>convex</li>
<li>concave</li>
<li>zoom</li>
</ul>
<p>--</p>
<!-- .slide: data-auto-animate -->
<h2 id="渐变-2" tabindex="-1"><a class="header-anchor" href="#渐变-2" aria-hidden="true">#</a> 渐变</h2>
<!-- .element: class="r-fit-text" -->
<h3 id="过渡动画" tabindex="-1"><a class="header-anchor" href="#过渡动画" aria-hidden="true">#</a> 过渡动画</h3>
<p>你可以在相邻的幻灯片上添加 <code v-pre>data-auto-animate</code> 使相同的 HTML 元素产生过渡动画效果。</p>
<hr>
<!-- .slide: data-transition="slide" data-auto-animate -->
<h2 id="功能" tabindex="-1"><a class="header-anchor" href="#功能" aria-hidden="true">#</a> 功能</h2>
<!-- .element: class="r-fit-text" -->
<p>--</p>
<!-- .slide: data-transition="slide" data-auto-animate -->
<h2 id="功能-1" tabindex="-1"><a class="header-anchor" href="#功能-1" aria-hidden="true">#</a> 功能</h2>
<!-- .element: class="r-fit-text" -->
<h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3>
<p>通过启用 <code v-pre>highlight</code> 插件，你可以对代码块进行高亮。</p>
<p>你可以使用 <code v-pre>[a-b|c-d]</code> 语法来分布高亮特定行。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token function-variable function">c</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">+</span> x<span class="token punctuation">;</span>
<span class="token function">c</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>--</p>
<!-- .slide: data-transition="slide" data-auto-animate -->
<h2 id="功能-2" tabindex="-1"><a class="header-anchor" href="#功能-2" aria-hidden="true">#</a> 功能</h2>
<!-- .element: class="r-fit-text" -->
<h3 id="预览模式" tabindex="-1"><a class="header-anchor" href="#预览模式" aria-hidden="true">#</a> 预览模式</h3>
<p>按下 <code v-pre>Esc</code> 或 <code v-pre>O</code> 即可在幻灯片获得焦点时进入预览模式。</p>
<p>--</p>
<!-- .slide: data-transition="slide" data-auto-animate -->
<h2 id="功能-3" tabindex="-1"><a class="header-anchor" href="#功能-3" aria-hidden="true">#</a> 功能</h2>
<!-- .element: class="r-fit-text" -->
<h3 id="全屏模式" tabindex="-1"><a class="header-anchor" href="#全屏模式" aria-hidden="true">#</a> 全屏模式</h3>
<p>按下 <code v-pre>F</code> 或 <code v-pre>F11</code> 即可在幻灯片获得焦点时进入全屏模式。</p>
<p>--</p>
<!-- .slide: data-transition="slide" data-auto-animate -->
<h2 id="功能-4" tabindex="-1"><a class="header-anchor" href="#功能-4" aria-hidden="true">#</a> 功能</h2>
<!-- .element: class="r-fit-text" -->
<h3 id="缩放" tabindex="-1"><a class="header-anchor" href="#缩放" aria-hidden="true">#</a> 缩放</h3>
<p>按下 <code v-pre>alt</code> (Linux 上使用 <code v-pre>ctrl</code>) 的同时点击幻灯片的任何元素，即可以向此元素进行放大。</p>
<p>再次点击即可缩小。</p>
<hr>
<!-- .element: class="r-fit-text" -->
<h2 id="结束" tabindex="-1"><a class="header-anchor" href="#结束" aria-hidden="true">#</a> 结束</h2>
<p>@slideend</p>
</div></template>


