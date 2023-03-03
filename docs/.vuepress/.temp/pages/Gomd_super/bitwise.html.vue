<template><div><h1 id="位运算以及补码重点" tabindex="-1"><a class="header-anchor" href="#位运算以及补码重点" aria-hidden="true">#</a> 位运算以及补码重点</h1>
<p>[toc]</p>
<h2 id="i️前言" tabindex="-1"><a class="header-anchor" href="#i️前言" aria-hidden="true">#</a> ℹ️前言</h2>
<blockquote>
<ul>
<li>
<p>参考文章：<a href="https://gist.github.com/dideler/2365607" target="_blank" rel="noopener noreferrer">https://gist.github.com/dideler/2365607<ExternalLinkIcon/></a>、<a href="https://us.com/" target="_blank" rel="noopener noreferrer">https://us.com/<ExternalLinkIcon/></a></p>
</li>
<li>
<p>推荐一个学习正则表达式的网站：<a href="https://regexr.com/" target="_blank" rel="noopener noreferrer">https://regexr.com/<ExternalLinkIcon/></a></p>
</li>
<li>
<p>使用的环境：<code v-pre>Java – jshell</code>（因为<code v-pre>ipython</code>中不可以用<code v-pre>++i</code>）</p>
</li>
</ul>
</blockquote>
<p><strong>在<a href="http://github.com/3293172751/LeetCode" target="_blank" rel="noopener noreferrer">leetcode算法<ExternalLinkIcon/></a>中我提到了很多关于位运算的技巧，进行了一次总结</strong></p>
<h2 id="🎈乘以-2-的幂" tabindex="-1"><a class="header-anchor" href="#🎈乘以-2-的幂" aria-hidden="true">#</a> 🎈乘以 2 的幂</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>x <span class="token operator">=</span> x <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// x = x * 2</span>
x <span class="token operator">=</span> x <span class="token operator">&lt;&lt;</span> <span class="token number">6</span><span class="token punctuation">;</span> <span class="token comment">// x = x * 64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>对于两个数<code v-pre>a</code>，<code v-pre>b</code>，计算<code v-pre>a</code> 和 b 的中间值，如果计算a+b除以2，可能会出现a+b溢出，所以你可以：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>b <span class="token operator">-</span> a<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<h2 id="🎈除以-2-的幂" tabindex="-1"><a class="header-anchor" href="#🎈除以-2-的幂" aria-hidden="true">#</a> 🎈除以 2 的幂</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>x <span class="token operator">=</span> x <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// x = x / 2</span>
x <span class="token operator">=</span> x <span class="token operator">>></span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// x = x / 8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🎈交换没有临时变量的整数" tabindex="-1"><a class="header-anchor" href="#🎈交换没有临时变量的整数" aria-hidden="true">#</a> 🎈交换没有临时变量的整数</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>a ^= b; // int temp = b
b ^= a; // b = a
a ^= b; // a = temp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20220925161607882.png?xxw@nsddd.top" alt="image-20220925161607882"></p>
<h2 id="🎈增量-减量-较慢但有利于混淆" tabindex="-1"><a class="header-anchor" href="#🎈增量-减量-较慢但有利于混淆" aria-hidden="true">#</a> 🎈增量/减量（较慢但有利于混淆）</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>i = -~i; // i++
i = ~-i; // i--
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>推断：<code v-pre>println(~-2)</code></p>
<ul>
<li>先得到 <code v-pre>-2</code> 的原码：<code v-pre>10000000 00000000 00000000 00000010</code></li>
<li>再得到 <code v-pre>-2</code> 的反码：<code v-pre>11111111 11111111 11111111 11111101</code></li>
<li>再得到 <code v-pre>-2</code> 的补码：<code v-pre>11111111 11111111 11111111 11111110</code></li>
<li>补码求反：<code v-pre>00000000 00000000 00000000 00000001</code></li>
</ul>
<p><strong>注意这个补码求反是所有位数都求反，所以结果是<code v-pre>(2--)==1</code></strong></p>
</blockquote>
<p><img src="http://sm.nsddd.top/smsmsmimage-20220925161741820.png?xxw@nsddd.top" alt="image-20220925161741820"></p>
<h2 id="🎈标志翻转" tabindex="-1"><a class="header-anchor" href="#🎈标志翻转" aria-hidden="true">#</a> 🎈标志翻转</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>i <span class="token operator">=</span> <span class="token operator">~</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// or</span>
i <span class="token operator">=</span> <span class="token punctuation">(</span>i <span class="token operator">^</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// i = -i</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🎈如果除数是-2-的幂-则进行模运算" tabindex="-1"><a class="header-anchor" href="#🎈如果除数是-2-的幂-则进行模运算" aria-hidden="true">#</a> 🎈如果除数是 2 的幂，则进行模运算</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>x <span class="token operator">=</span> <span class="token number">131</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token number">4</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// x = 131 % 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="🎈检查整数是偶数还是奇数" tabindex="-1"><a class="header-anchor" href="#🎈检查整数是偶数还是奇数" aria-hidden="true">#</a> 🎈检查整数是偶数还是奇数</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token punctuation">(</span>i <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// (i % 2) == 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="🎈相等检查" tabindex="-1"><a class="header-anchor" href="#🎈相等检查" aria-hidden="true">#</a> 🎈相等检查</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token punctuation">(</span>a<span class="token operator">^</span>b<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// a == b</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="🎈绝对值" tabindex="-1"><a class="header-anchor" href="#🎈绝对值" aria-hidden="true">#</a> 🎈绝对值</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>x <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token operator">-</span>x <span class="token operator">:</span> x<span class="token punctuation">;</span> <span class="token comment">// abs(x)</span>
<span class="token punctuation">(</span>x <span class="token operator">^</span> <span class="token punctuation">(</span>x <span class="token operator">>></span> <span class="token number">31</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token punctuation">(</span>x <span class="token operator">>></span> <span class="token number">31</span><span class="token punctuation">)</span> <span class="token comment">// abs(x)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🎈等号检查-两个整数都是-pos-或-neg" tabindex="-1"><a class="header-anchor" href="#🎈等号检查-两个整数都是-pos-或-neg" aria-hidden="true">#</a> 🎈等号检查（两个整数都是 pos 或 neg）</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>a <span class="token operator">^</span> b <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// a * b > 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="🎈圆角、天花板、地板" tabindex="-1"><a class="header-anchor" href="#🎈圆角、天花板、地板" aria-hidden="true">#</a> 🎈圆角、天花板、地板</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token punctuation">(</span>x <span class="token operator">+</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// round(x)</span>
<span class="token punctuation">(</span>x <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// ceil(x)</span>
x <span class="token operator">>></span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// floor(x)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="💡java中的二进制补充" tabindex="-1"><a class="header-anchor" href="#💡java中的二进制补充" aria-hidden="true">#</a> 💡Java中的二进制补充</h2>
<h3 id="必背" tabindex="-1"><a class="header-anchor" href="#必背" aria-hidden="true">#</a> 必背</h3>
<ol>
<li>二进制最高位是符号位（🐶旋转90度）</li>
<li><code v-pre>0</code> 是表示正数，<code v-pre>1</code> 是表示负数</li>
<li>正数的原码、反码、补码都一样</li>
<li>$$负数的反码 = 符号位不变，其他位取反$$</li>
<li>$$负数的补码 = 它的反码 + 1$$</li>
<li><code v-pre>0</code> 的反码、补码都是<code v-pre>0</code></li>
<li>java没有无符号数，换言之，Java中的数都是有符号的</li>
<li><strong>当计算机运算时，都是以补码的方式来运算的</strong></li>
<li><strong>当我们看运算结果的时候，要看他的原码</strong></li>
</ol>
<hr>
<blockquote>
<p><strong>所以当我们计算一个位运算的时候，进行了下面几步（注意是32位）：</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token operator">&amp;</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>先得到 <code v-pre>2</code> 的补码  ==&gt;
<ul>
<li>先得到 <code v-pre>2</code> 的原码 ：<code v-pre>00000000 00000000 00000000 00000010</code></li>
<li>再得到 <code v-pre>2</code> 的补码 ：<code v-pre>00000000 00000000 00000000 00000010</code></li>
</ul>
</li>
<li>再得到 <code v-pre>3</code> 的补码  ==&gt;
<ul>
<li>先得到 <code v-pre>3</code> 的原码 ：<code v-pre>00000000 00000000 00000000 00000011</code></li>
<li>再得到 <code v-pre>3</code> 的补码 ：<code v-pre>00000000 00000000 00000000 00000011</code></li>
</ul>
</li>
<li>按位与 ==&gt;
<ul>
<li>00000000 00000000 00000000 00000010</li>
<li>00000000 00000000 00000000 00000011</li>
<li>00000000 00000000 00000000 00000010  <strong>（运算后的补码还需要转化为原码 ==&gt; 符号位是0，说明是正数，推出原码 == 补码）</strong></li>
</ul>
</li>
<li>结果<code v-pre>00000000 00000000 00000000 00000010</code>转为十进制：<code v-pre>2</code></li>
</ul>
</blockquote>
<h3 id="java逻辑右移" tabindex="-1"><a class="header-anchor" href="#java逻辑右移" aria-hidden="true">#</a> java逻辑右移</h3>
<p><strong>⚡上面的都是算术运算符，但是java也是有无符号右移的，运算规则是：低位溢出，高位补0）</strong></p>
<blockquote>
<p>⚠️ 特别说明：Java是没有	<code v-pre>&lt;&lt;&lt;</code>	符号（无符号左移），只有	<code v-pre>&gt;&gt;&gt;</code>	无符号右移</p>
</blockquote>
<p><strong>比较：</strong></p>
<ul>
<li><code v-pre>&gt;&gt;</code>右移运算符，有符号。右边超出截掉，左边补上符号位</li>
<li><code v-pre>&gt;&gt;&gt;</code>右移运算符，无符号，左边补0</li>
</ul>
<blockquote>
<p><strong>案例：</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">byte</span> a<span class="token operator">=</span><span class="token operator">~</span><span class="token number">127</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span><span class="token punctuation">(</span>a<span class="token operator">>>></span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结果如下：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>-128
-32
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>分析：</strong></p>
<p>首先,<code v-pre>~127</code>的二进制数为<code v-pre>10000000</code>,(<code v-pre>~127</code>是取反运算）</p>
<p>但是JAVA在对不足<code v-pre>32</code>位的数<code v-pre>(byte,char,short)</code>进行移位运算时候,都会先转成<code v-pre>int(32位)</code>，所以此时<code v-pre>a</code>为<code v-pre>11111111111111111111111110000000</code></p>
<p>移位之后,<code v-pre>(00)111111111111111111111111100000</code></p>
<p>但是你在此<code v-pre>a=(byte)(a&gt;&gt;&gt;2);</code> 强制转成<code v-pre>byte</code>型,将对结果进行截断</p>
<p>此时<code v-pre>a</code>为<code v-pre>11100000</code>,就是<code v-pre>32</code>了</p>
</blockquote>
</div></template>


