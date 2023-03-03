<template><div><h1 id="glog" tabindex="-1"><a class="header-anchor" href="#glog" aria-hidden="true">#</a> glog</h1>
<p><a href="https://pkg.go.dev/github.com/golang/glog" target="_blank" rel="noopener noreferrer"><img src="https://pkg.go.dev/badge/github.com/golang/glog" alt="PkgGoDev"><ExternalLinkIcon/></a></p>
<p>Leveled execution logs for Go.</p>
<p>This is an efficient pure Go implementation of leveled logs in the
manner of the open source C++ package <a href="https://github.com/google/glog" target="_blank" rel="noopener noreferrer"><em>glog</em><ExternalLinkIcon/></a>.</p>
<p>By binding methods to booleans it is possible to use the log package without paying the expense of evaluating the arguments to the log. Through the <code v-pre>-vmodule</code> flag, the package also provides fine-grained
control over logging at the file level.</p>
<p>The comment from <code v-pre>glog.go</code> introduces the ideas:</p>
<p>Package <em>glog</em> implements logging analogous to the Google-internal C++ INFO/ERROR/V setup.  It provides the functions Info, Warning, Error, Fatal, plus formatting variants such as Infof. It also provides V-style loggingcontrolled by the <code v-pre>-v</code> and <code v-pre>-vmodule=file=2</code> flags.</p>
<p>Basic examples:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>glog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Prepare to repel boarders"</span><span class="token punctuation">)</span>
	
glog<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Initialization failed: %s"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>See the documentation for the V function for an explanation of these examples:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> glog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	glog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Starting transaction..."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
glog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Infoln</span><span class="token punctuation">(</span><span class="token string">"Processed"</span><span class="token punctuation">,</span> nItems<span class="token punctuation">,</span> <span class="token string">"elements"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The repository contains an open source version of the log package used inside Google. The master copy of the source lives inside Google, not here. The code in this repo is for export only and is not itself under development. Feature requests will be ignored.</p>
<p>Send bug reports to golang-nuts@googlegroups.com.</p>
</div></template>


