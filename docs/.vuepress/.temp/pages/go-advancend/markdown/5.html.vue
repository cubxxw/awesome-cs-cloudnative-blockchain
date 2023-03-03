<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第5节-读取模块的构建" tabindex="-1"><a class="header-anchor" href="#第5节-读取模块的构建" aria-hidden="true">#</a> 第5节 读取模块的构建</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/4.html">上一节</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
<hr>
<p>[TOC]</p>
<h3 id="读取模块的实现" tabindex="-1"><a class="header-anchor" href="#读取模块的实现" aria-hidden="true">#</a> 读取模块的实现</h3>
<ol>
<li>打开文件</li>
<li>从文件的末尾开始逐行读取</li>
<li>写入Read channel</li>
</ol>
<p><strong>可以想象Linux中我们常用的命令</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tail -f 10 a.s 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20220707165557610.png" alt="image-20220707165557610"></p>
<h3 id="读取模块测试" tabindex="-1"><a class="header-anchor" href="#读取模块测试" aria-hidden="true">#</a> 读取模块测试</h3>
<p><img src="http://sm.nsddd.top/smimage-20220707172708266.png" alt="image-20220707172708266"></p>
<p><strong>往文件中输入内容</strong></p>
<p><img src="http://sm.nsddd.top/smimage-20220707172740186.png" alt="image-20220707172740186"></p>
<p><strong>在模块中，使用循环不断地进行输出和解析的时候，可以用range直接读取的方法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>for v := range l.rc {
	l.wc &lt;- strings.ToUpper(string(v)) //data是byte类型，需要转化为string类型
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20220707173037316.png" alt="image-20220707173037316"></p>
<p><strong>去掉最后的换行符</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>rc &lt;- line[:len(line)-1] //数据的流向
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>去掉最后的换行符，此时我们可以用切片，从前往后，最后一位换行符-1去掉就好了</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/4.html">上一节</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/6.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


