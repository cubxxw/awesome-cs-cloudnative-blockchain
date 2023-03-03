<template><div><ul>
<li><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第1节-gcc-and-cgo" tabindex="-1"><a class="header-anchor" href="#第1节-gcc-and-cgo" aria-hidden="true">#</a> 第1节 Gcc and Cgo</h1>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
</ul>
<blockquote>
<p>❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
<h3 id="go语言基础篇" tabindex="-1"><a class="header-anchor" href="#go语言基础篇" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">Go语言基础篇<ExternalLinkIcon/></a></strong></h3>
<h3 id="go语言100篇进阶" tabindex="-1"><a class="header-anchor" href="#go语言100篇进阶" aria-hidden="true">#</a> <strong><a href="https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">Go语言100篇进阶<ExternalLinkIcon/></a></strong></h3>
</blockquote>
<hr>
<p>[TOC]</p>
<hr>
<p><strong>我们默认为是C语言是占4个字节，这个和Go语言是不一样的。</strong></p>
<p><strong>在Go语言中，int默认是8个字节</strong></p>
<ul>
<li>int32是四个字节</li>
<li>int64是八个字节</li>
<li>int是八个字节</li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*************************************************************************
    > File Name: a.go
    > Author: smile
    > Mail: 3293172751nss@gmail.com 
    > Created Time: Thu 30 Jun 2022 01:13:35 AM PDT
 ************************************************************************/</span>
<span class="token keyword">package</span> main
<span class="token keyword">import</span><span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span><span class="token punctuation">(</span>
    a <span class="token operator">=</span> <span class="token number">40000</span>
    b <span class="token operator">=</span> <span class="token number">50000</span>
<span class="token punctuation">)</span>
<span class="token keyword">var</span> c <span class="token builtin">int</span>
<span class="token keyword">var</span> d <span class="token builtin">int32</span>
    c <span class="token operator">=</span> <span class="token number">50000</span>
    d <span class="token operator">=</span> <span class="token number">50000</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token operator">*</span>a<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token operator">*</span>b<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>c<span class="token operator">*</span>c<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>d<span class="token operator">*</span>d<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们对上面的代码进行编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/c# go run a.go 
1600000000
2500000000
2500000000
-1794967296
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对于C语言来说</strong></p>
<p><strong>编译为汇编文件</strong></p>
<div class="language-asm ext-asm line-numbers-mode"><pre v-pre class="language-asm"><code>root@ubuntu:/c# gcc -S a.c
root@ubuntu:/c# cat a.s
	.file	&quot;a.c&quot;
	.text
	.section	.rodata
.LC0:
	.string	&quot;%d\n,%d\n&quot;
.LC1:
	.string	&quot;int c = %d\n,int64_t d = %lld\n&quot;
	.text
	.globl	main
	.type	main, @function
main:
.LFB0:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$32, %rsp
	movl	$50000, -20(%rbp)
	movl	$40000, -16(%rbp)
	movl	-16(%rbp), %eax
	imull	%eax, %eax
	movl	%eax, %edx
	movl	-20(%rbp), %eax
	imull	%eax, %eax
	movl	%eax, %esi
	leaq	.LC0(%rip), %rdi
	movl	$0, %eax
	call	printf@PLT
	movq	-8(%rbp), %rax
	imulq	%rax, %rax
	movq	%rax, %rdx
	movl	-12(%rbp), %eax
	imull	%eax, %eax
	movl	%eax, %esi
	leaq	.LC1(%rip), %rdi
	movl	$0, %eax
	call	printf@PLT
	movl	$0, %eax
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE0:
	.size	main, .-main
	.ident	&quot;GCC: (Ubuntu 9.4.0-1ubuntu1~20.04.1) 9.4.0&quot;
	.section	.note.GNU-stack,&quot;&quot;,@progbits
	.section	.note.gnu.property,&quot;a&quot;
	.align 8
	.long	 1f - 0f
	.long	 4f - 1f
	.long	 5
0:
	.string	 &quot;GNU&quot;
1:
	.align 8
	.long	 0xc0000002
	.long	 3f - 2f
2:
	.long	 0x3
3:
	.align 8
4:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译为二进制代码</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/c# gcc -Og -c a.c
root@ubuntu:/c# cat a.o                                                                E¹^_º򔈍5¿¸蹺H5¿¸.ed
,%d
int c = %d
,int64_t d = %lld
GCC: (Ubuntu 9.4.0-1ubuntu1~20.04.1) 9.4.0GNU󿾄zRx 
                                                H򽁁                                     R*a.c.LC0.LC1main_GLOBAL_OFFSET_TABLE___printf_chk	񁀿ÿÿ$񁀿ÿÿ5 
񁀿ÿÿD񁀿ÿÿ .symtab.strtab.shstrtab.rela.text.data.bss.rodata.str1.1.comment.note.GNU-stack.note.gnu.property.rela.eh_frame @Rւ`
                                   &amp;12&amp;@0¸,Il@8 
                                               8h 

                                                	 7P{root@ubuntu:/c# XshellXshellXshellXshellXshell
XshellXshellXshellXshellXshell: command not found
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code v-pre>.o</code>后缀的文件是二进制格式的，没有查看意义，我们可以得出：机器执行的程序只是一个字节序列， 它是对一系列指令的编码。机器对产生这些指令的源代码几乎一无所知。</strong></p>
<p><strong>如果需要显示出机器代码文件的内容，我们需要用到反汇编器（这个程序非常有用），在Linux中<code v-pre>-d</code>指令标志的objdump 可以充当这个角色</strong></p>
<div class="language-asm ext-asm line-numbers-mode"><pre v-pre class="language-asm"><code>root@ubuntu:/c# objdump -d a.o

a.o:     file format elf64-x86-64


Disassembly of section .text:

0000000000000000 &lt;main&gt;:
   0:	f3 0f 1e fa          	endbr64 
   4:	48 83 ec 08          	sub    $0x8,%rsp
   8:	b9 00 10 5e 5f       	mov    $0x5f5e1000,%ecx
   d:	ba 00 f9 02 95       	mov    $0x9502f900,%edx
  12:	48 8d 35 00 00 00 00 	lea    0x0(%rip),%rsi        # 19 &lt;main+0x19&gt;
  19:	bf 01 00 00 00       	mov    $0x1,%edi
  1e:	b8 00 00 00 00       	mov    $0x0,%eax
  23:	e8 00 00 00 00       	callq  28 &lt;main+0x28&gt;
  28:	b9 00 00 00 00       	mov    $0x0,%ecx
  2d:	ba 00 00 00 00       	mov    $0x0,%edx
  32:	48 8d 35 00 00 00 00 	lea    0x0(%rip),%rsi        # 39 &lt;main+0x39&gt;
  39:	bf 01 00 00 00       	mov    $0x1,%edi
  3e:	b8 00 00 00 00       	mov    $0x0,%eax
  43:	e8 00 00 00 00       	callq  48 &lt;main+0x48&gt;
  48:	b8 00 00 00 00       	mov    $0x0,%eax
  4d:	48 83 c4 08          	add    $0x8,%rsp
  51:	c3                   	retq   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对于Go语言我们同样可以使用反汇编命令</strong></p>
<div class="language-asp ext-asp line-numbers-mode"><pre v-pre class="language-asp"><code>root@ubuntu:/c# go build -o a a.go
root@ubuntu:/c# ./a
1600000000
2500000000
2500000000
-1794967296
root@ubuntu:/c# objdump -d a | tail -n 10
  48d03c:	00 00 
  48d03e:	48 c7 44 24 20 01 00 	movq   $0x1,0x20(%rsp)
  48d045:	00 00 
  48d047:	e8 a4 96 ff ff       	callq  4866f0 &lt;fmt.Fprintln&gt;
  48d04c:	48 8b ac 24 80 00 00 	mov    0x80(%rsp),%rbp
  48d053:	00 
  48d054:	48 81 c4 88 00 00 00 	add    $0x88,%rsp
  48d05b:	c3                   	retq   
  48d05c:	e8 2f 47 fc ff       	callq  451790 &lt;runtime.morestack_noctxt&gt;
  48d061:	e9 2a fe ff ff       	jmpq   48ce90 &lt;main.main&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul>
<li><RouterLink to="/go-advancend/">回到目录</RouterLink></li>
<li><RouterLink to="/go-advancend/markdown/2.html">下一节</RouterLink></li>
</ul>
<hr>
<ul>
<li><a href="https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md" target="_blank" rel="noopener noreferrer">参与贡献❤️💕💕<ExternalLinkIcon/></a></li>
</ul>
</div></template>


