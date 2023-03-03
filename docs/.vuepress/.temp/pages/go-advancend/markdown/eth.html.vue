<template><div><h1 id="_0x03-geth源码结构" tabindex="-1"><a class="header-anchor" href="#_0x03-geth源码结构" aria-hidden="true">#</a> 0x03 geth源码结构</h1>
<p><strong>目录结构</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@mail go-ethereum<span class="token punctuation">]</span><span class="token comment"># ls -al</span>
total <span class="token number">392</span>
drwxr-xr-x <span class="token number">36</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:59 <span class="token builtin class-name">.</span>
drwxr-xr-x  <span class="token number">3</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:36 <span class="token punctuation">..</span>
drwxr-xr-x  <span class="token number">7</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 accounts
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">1763</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 appveyor.yml
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">14065</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 AUTHORS
drwxr-xr-x  <span class="token number">3</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 build
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">1576</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 circle.yml
drwxr-xr-x <span class="token number">16</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:38 cmd
drwxr-xr-x  <span class="token number">9</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:38 common
drwxr-xr-x  <span class="token number">6</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:38 consensus
drwxr-xr-x  <span class="token number">4</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:38 console
drwxr-xr-x  <span class="token number">3</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:38 contracts
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">35823</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:38 COPYING
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">7816</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:38 COPYING.LESSER
drwxr-xr-x  <span class="token number">9</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:38 core
drwxr-xr-x  <span class="token number">8</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 crypto
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">751</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 Dockerfile
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">724</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 Dockerfile.alltools
-rw-r--r--  <span class="token number">1</span> root root    <span class="token number">62</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:36 .dockerignore
drwxr-xr-x  <span class="token number">4</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 docs
drwxr-xr-x <span class="token number">10</span> root root  <span class="token number">4096</span> Mar <span class="token number">11</span> <span class="token number">15</span>:57 eth
drwxr-xr-x  <span class="token number">3</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 ethclient
drwxr-xr-x  <span class="token number">5</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 ethdb
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 ethstats
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 event
drwxr-xr-x  <span class="token number">8</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 .git
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">102</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:36 .gitattributes
drwxr-xr-x  <span class="token number">3</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 .github
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">855</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 .gitignore
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">104</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 .gitmodules
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">1060</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 .golangci.yml
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">3570</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 go.mod
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">67613</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 go.sum
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 graphql
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">11740</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 interfaces.go
drwxr-xr-x <span class="token number">14</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 internal
drwxr-xr-x  <span class="token number">8</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 les
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 light
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 log
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">3359</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 .mailmap
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">1661</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 Makefile
drwxr-xr-x  <span class="token number">6</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 metrics
drwxr-xr-x  <span class="token number">3</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 miner
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 mobile
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 <span class="token function">node</span>
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">5180</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 oss-fuzz.sh
drwxr-xr-x <span class="token number">13</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">13</span>:00 p2p
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 params
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">20633</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 README.md
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:39 rlp
drwxr-xr-x  <span class="token number">3</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:40 rpc
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">12292</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:59 SECURITY.md
drwxr-xr-x  <span class="token number">6</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:40 signer
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:40 swarm
drwxr-xr-x  <span class="token number">5</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:40 tests
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">9147</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:37 .travis.yml
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Mar  <span class="token number">6</span> <span class="token number">12</span>:40 trie
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上节基本从使用方面了解了geth的基本功能，这一篇从源码入手开始分析geth。</p>
<p>用sublime打开geth源代码，我们同读bitcoin源码类同，也是先从源码的结构部分入手，把握大局再各个击破。</p>
<p><img src="https://s2.loli.net/2022/03/16/I3z6kp1ZPBKoHfL.png" alt="源码目录"></p>
<p><strong>代码结构</strong></p>
<p><img src="https://s2.loli.net/2022/03/16/YcFjvLK5oMbyTnf.png" alt=""></p>
<p><strong>互联网颠覆世界，区块链颠覆互联网!</strong></p>
</div></template>


