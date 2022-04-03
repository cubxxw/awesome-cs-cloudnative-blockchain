## 什么是 plan9 汇编

我们知道，CPU 是只认二进制指令的，也就是一串的 0101；人类无法记住这些二进制码，于是发明了汇编语言。汇编语言实际上是二进制指令的文本形式，它与指令可以一一对应。

每一种 CPU 指令都是不一样的，因此对应的汇编语言也就不一样。人类写完汇编语言后，把它转换成二进制码，就可以被机器执行了。转换的动作由编译器完成。

Go 语言的编译器和汇编器都带了一个 - S 参数，可以查看生成的最终目标代码。通过对比目标代码和原始的 Go 语言或 Go 汇编语言代码的差异可以加深对底层实现的理解。

Go 汇编语言实际上来源于 plan9 汇编语言，而 plan9 汇编语言最初来源于 Go 语言作者之一的 Ken Thompson 为 plan9 系统所写的 C 语言编译器输出的汇编伪代码。这里强烈推荐一下春晖大神的新书《Go 语言高级编程》，即将上市，电子版的点击阅读原文可以看到地址，书中有一整个章节讲 Go 的汇编语言，非常精彩！

理解 Go 的汇编语言，哪怕只是一点点，都能对 Go 的运行机制有更深入的理解。比如我们以前讲的 defer，如果从 Go 源码编译后的汇编代码来看，就能深刻地掌握它的底层原理。再比如，很多文章都会分析 Go 的函数参数传递都是值传递，如果把汇编代码秀出来，很容易就能得出结论。

## 汇编角度看函数调用及返回过程

假设我们有一个这样年幼无知的例子，求两个 int 的和，Go 源码如下：

```
package main

func main() {
  _ = add(3,5)
}

func add(a, b int) int {
  return a+b
}
```

使用如下命令得到汇编代码：

```
go tool compile -S main.go
```

`go tool compile`命令用于调用 Go 语言提供的底层命令工具，其中`-S`参数表示输出汇编格式。

我们现在只关心 add 函数的汇编代码：

```
"".add STEXT nosplit size=19 args=0x18 locals=0x0
        0x0000 00000 (main.go:7)        TEXT    "".add(SB), NOSPLIT, $0-24
        0x0000 00000 (main.go:7)        FUNCDATA        $0, gclocals·54241e171da8af6ae173d69da0236748(SB)
        0x0000 00000 (main.go:7)        FUNCDATA        $1, gclocals·33cdeccccebe80329f1fdbee7f5874cb(SB)
        0x0000 00000 (main.go:7)        MOVQ    "".b+16(SP), AX
        0x0005 00005 (main.go:7)        MOVQ    "".a+8(SP), CX
        0x000a 00010 (main.go:8)        ADDQ    CX, AX
        0x000d 00013 (main.go:8)        MOVQ    AX, "".~r2+24(SP)
        0x0012 00018 (main.go:8)        RET
```

看不懂没关系，我目前也不是全部都懂，但是对于理解一个函数调用的整体过程而言，足够了。

```
0x0000 00000 (main.go:7)        TEXT    "".add(SB), NOSPLIT, $0-24
```

这一行表示定义`add`这个函数，最后的数字`$0-24`，其中`0`表示函数栈帧大小为 0；`24`表示参数及返回值的大小：参数是 2 个 int 型变量，返回值是 1 个 int 型变量，共 24 字节。

再看中间这四行：

```
0x0000 00000 (main.go:7)        MOVQ    "".b+16(SP), AX
0x0005 00005 (main.go:7)        MOVQ    "".a+8(SP), CX
0x000a 00010 (main.go:8)        ADDQ    CX, AX
0x000d 00013 (main.go:8)        MOVQ    AX, "".~r2+24(SP)
```

代码片段中的第 1 行，将第 2 个参数`b`搬到`AX`寄存器；第 2 行将 1 个参数`a`搬到寄存器`CX`；第 3 行将`a`和`b`相加，相加的结果搬到`AX`；最后一行，将结果搬到返回参数的地址，这段汇编代码非常简单，来看一下函数调用者和被调者的栈帧图：

(SP) 指栈顶，b+16(SP) 表示裸骑 1 的位置，从 SP 往上增加 16 个字节，注意，前面的 b 仅表示一个标号；同样，a+8(SP) 表示实参 0；~r2+24(SP) 则表示返回值的位置。

具体可以看下面的图：



![img](https://s2.loli.net/2022/04/03/FKswDWzxflcYgQt.jpg)



上面 add 函数的栈帧大小为 0，其实更一般的调用者与被调用者的栈帧示意图如下：



![img](https://s2.loli.net/2022/04/03/9oOHUtkh4V8T1Ag.jpg)



最后，执行`RET`指令。这一步把被调用函数`add`栈帧清零, 接着，弹出栈顶的`返回地址`，把它赋给指令寄存器`rip`，而`返回地址`就是`main`函数里调用`add`函数的下一行。

于是，又回到了`main`函数的执行环境，`add`函数的栈帧也被销毁了。但是注意，这块内存是没有被清零的，清零动作是之后再次申请这块内存的时候要做的事。比如，声明了一个 int 型变量，它的默认值是 0，清零的动作是在这里完成的。

这样，main 函数完成了函数调用，也拿到了返回值，完美。

## 汇编角度看 slice

再来看一个例子，我们来看看`slice`的底层到底是什么。

```
package main

func main() {
  s := make([]int, 3, 10)
  _ = f(s)
}

func f(s []int) int {
  return s[1]
}
```

用上面同样的命令得到汇编代码，我们只关注`f`函数的汇编代码：

```
"".f STEXT nosplit size=53 args=0x20 locals=0x8
        // 栈帧大小为8字节，参数和返回值为32字节
        0x0000 00000 (main.go:8)        TEXT    "".f(SB), NOSPLIT, $8-32
        // SP栈顶指针下移8字节
        0x0000 00000 (main.go:8)        SUBQ    $8, SP
        // 将BP寄存器的值入栈
        0x0004 00004 (main.go:8)        MOVQ    BP, (SP)
        // 将新的栈顶地址保存到BP寄存器
        0x0008 00008 (main.go:8)        LEAQ    (SP), BP
        0x000c 00012 (main.go:8)        FUNCDATA        $0, gclocals·4032f753396f2012ad1784f398b170f4(SB)
        0x000c 00012 (main.go:8)        FUNCDATA        $1, gclocals·69c1753bd5f81501d95132d08af04464(SB)
        // 取出slice的长度len
        0x000c 00012 (main.go:8)        MOVQ    "".s+24(SP), AX
        // 比较索引1是否超过len
        0x0011 00017 (main.go:9)        CMPQ    AX, $1
        // 如果超过len，越界了。跳转到46
        0x0015 00021 (main.go:9)        JLS     46
        // 将slice的数据首地址加载到AX寄存器
        0x0017 00023 (main.go:9)        MOVQ    "".s+16(SP), AX
        // 将第8byte地址的元素保存到AX寄存器，也就是salaries[1]
        0x001c 00028 (main.go:9)        MOVQ    8(AX), AX
        // 将结果拷贝到返回参数的位置（y）
        0x0020 00032 (main.go:9)        MOVQ    AX, "".~r1+40(SP)
        // 恢复BP的值
        0x0025 00037 (main.go:9)        MOVQ    (SP), BP
        // SP向上移动8个字节
        0x0029 00041 (main.go:9)        ADDQ    $8, SP
        // 返回
        0x002d 00045 (main.go:9)        RET
        0x002e 00046 (main.go:9)        PCDATA  $0, $1
        // 越界，panic
        0x002e 00046 (main.go:9)        CALL    runtime.panicindex(SB)
        0x0033 00051 (main.go:9)        UNDEF
        0x0000 48 83 ec 08 48 89 2c 24 48 8d 2c 24 48 8b 44 24  H...H.,$H.,$H.D$
        0x0010 18 48 83 f8 01 76 17 48 8b 44 24 10 48 8b 40 08  .H...v.H.D$.H.@.
        0x0020 48 89 44 24 28 48 8b 2c 24 48 83 c4 08 c3 e8 00  H.D$(H.,$H......
        0x0030 00 00 00 0f 0b                                   .....
        rel 47+4 t=8 runtime.panicindex+0
```

‍

通过上面的汇编代码，我们画出函数调用的栈帧图：



![img](https://mmbiz.qpic.cn/mmbiz_png/ASQrEXvmx61SibpScibvDXMdLBeCWAUwlkj8JR2rbpSfiaD8qe966ibWS5Sj0bRGEz5yvUp8cLFd9n9RHzY03L6b0Q/640?wx_fmt=png)



我们可以清晰地看到，一个 slice 本质上是用一个数据首地址，一个长度 Len，一个容量 Cap。所以在参数是 slice 的函数里，对 slice 的操作会影响到实参的 slice。