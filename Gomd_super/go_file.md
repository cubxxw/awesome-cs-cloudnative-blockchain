# Go语言文本编码处理

[toc]

#### 判断是否字符串是否包含字符串

介绍strings使用方法

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	s := "hello word!"
	fmt.Println(strings.Contains(s, "hello"), strings.Contains(s, "?"))
}
```

**编译：**

```
PS C:\Users\smile\Desktop\区块链\code\gin>  go run .\main.go
true false
```

**包含hello返回true，不包含？返回false**

**看下contains源码**

```
// Contains reports whether substr is within s.
func Contains(s, substr string) bool {
	return Index(s, substr) >= 0
}
```



### 字符串拆分

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	s := "hello word!"
	fmt.Println(strings.Contains(s, "hello"), strings.Contains(s, "?"))

	ss := "a&s*a##av"
	splitedStr := strings.Split(ss, "#")
	fmt.Println(splitedStr)
}

```

**编译：**

```
PS C:\Users\smile\Desktop\区块链\code\gin>  go run .\main.go
true false
[a&s*a  av]
```

**看下源码**

```go
func Split(s, sep string) []string { return genSplit(s, sep, 0, -1) }

// SplitAfter slices s into all substrings after each instance of sep and
// returns a slice of those substrings.
//
// If s does not contain sep and sep is not empty, SplitAfter returns
// a slice of length 1 whose only element is s.
//
// If sep is empty, SplitAfter splits after each UTF-8 sequence. If
// both s and sep are empty, SplitAfter returns an empty slice.
//
// It is equivalent to SplitAfterN with a count of -1.
func SplitAfter(s, sep string) []string {
	return genSplit(s, sep, len(sep), -1)
}
```



### 可以使用join将其合并起来

```
fmt.Println("string.Join(splitedStr,"#"))
```

**看下join源码**

```go
func Join(elems []string, sep string) string {
	switch len(elems) {
	case 0:
		return ""
	case 1:
		return elems[0]
	}
	n := len(sep) * (len(elems) - 1)
	for i := 0; i < len(elems); i++ {
		n += len(elems[i])
	}

	var b Builder
	b.Grow(n)
	b.WriteString(elems[0])
	for _, s := range elems[1:] {
		b.WriteString(sep)
		b.WriteString(s)
	}
	return b.String()
}
```



## 字符串转化

```go
package main

import (
	"fmt"
	"strconv"
)

func main() {
	s := "zxcvzbnznz"
	fmt.Println("s=", s)
	fmt.Println(strconv.Itoa(100))
	// func Itoa(i int) string {
	// 	return FormatInt(int64(i), 10)
	// }
	a, err := strconv.Atoi("12")
	if err != nil {
		fmt.Println("err = ", err)
		return
	}
	fmt.Println(a)
}
```

**编译：**

```
PS C:\Users\smile\Desktop\区块链\code\gin>  go run .\main.go
s= zxcvzbnznz
100
12
```



**继续**

```go
package main

import (
	"fmt"
	"strconv"
)

func main() {
	s := "zxcvzbnznz"
	fmt.Println("s=", s)
	fmt.Println(strconv.Itoa(100))
	// func Itoa(i int) string {
	// 	return FormatInt(int64(i), 10)
	// }
	a, err := strconv.ParseBool("t")
	if err != nil {
		fmt.Println("err = ", err)
		return
	}
	/*func ParseBool(str string) (bool, error) {
		switch str {
		case "1", "t", "T", "true", "TRUE", "True":
			return true, nil
		case "0", "f", "F", "false", "FALSE", "False":
			return false, nil
		}
		return false, syntaxError("ParseBool", str)
	}*/
	fmt.Println("a=", a)
	a1, err1 := strconv.ParseFloat("123.2134", 64)
	if err1 != nil {
		fmt.Println("err = ", err)
		return
	}
	/*func ParseFloat(s string, bitSize int) (float64, error) {
		f, n, err := parseFloatPrefix(s, bitSize)
		if n != len(s) && (err == nil || err.(*NumError).Err != ErrSyntax) {
			return 0, syntaxError(fnParseFloat, s)
		}
		return f, err
	}*/
	fmt.Println("a1=", a1)
}
```



**编译：**

```
PS C:\Users\smile\Desktop\区块链\code\gin>  go run .\main.go
s= zxcvzbnznz
100
a= true
a1= 123.2134
```





## 序列化和反序列化

```go
package main

import (
	"encoding/xml"
	"fmt"
)

type Person struct {
	Name string
	Age  int
}

func main() {
	p := Person{"smiel", 19}
	fmt.Println("person = ", p)
	if data, err := xml.Marshal(p); err != nil {
		fmt.Println("err = ", err)
		return
	} else {
		fmt.Println(string(data))
	}
	/*func Marshal(v any) ([]byte, error) {
	var b bytes.Buffer
	if err := NewEncoder(&b).Encode(v); err != nil {
		return nil, err
	}
	return b.Bytes(), nil
}*/
}
```

**编译：**

```
PS C:\Users\smile\Desktop\区块链\code\gin>  go run .\main.go
person =  {smiel 19}
<Person><Name>smiel</Name><Age>19</Age></Person>
```

**这个默认不是可读性的xml需要格式化**

```
xml.MarshalIndent(p,""," ")
```

+ 第二个：前缀
+ 第三个：缩进

**底层源码**

```
func MarshalIndent(v any, prefix, indent string) ([]byte, error) {
	var b bytes.Buffer
	enc := NewEncoder(&b)
	enc.Indent(prefix, indent)
	if err := enc.Encode(v); err != nil {
		return nil, err
	}
	return b.Bytes(), nil
}
```

**此时还有一个小技巧，我的err放在if语句中，此时可以确定作用域仅仅在if语句中**



## 使用flag获取复杂参数

```go
package main

import (
	"flag"
	"fmt"
)

func main() {
	methodPtr := flag.String("method", "default", "method of sample")
	//func String(name string, value string, usage string) *string {
	//return CommandLine.String(name, value, usage)}
	valuePtr := flag.Int64("value", -1, "value of sample")

	flag.Parse()
	fmt.Println(*methodPtr, *valuePtr)
}
```

**编译：**

```
C:\Users\smile\Desktop\区块链\code\gin>go build main.go

C:\Users\smile\Desktop\区块链\code\gin>a.exe
'a.exe' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

C:\Users\smile\Desktop\区块链\code\gin>go build main.go

C:\Users\smile\Desktop\区块链\code\gin>main.exe
default -1

C:\Users\smile\Desktop\区块链\code\gin>main.exe -method helloxiongxinwei@mail.com
helloxiongxinwei@mail.com -1
```



## 控制命令行操作

```go
package main

import (
	"bufio"
	"bytes"
	"fmt"
	"os/exec"
)

func cmd1() {
	//首先生成cmd结构体,该结构体包含了很多信息，如执行命令的参数，命令的标准输入输出等
	command := exec.Command("ls", "-l")
	//给标准输入以及标准错误初始化一个buffer，每条命令的输出位置可能是不一样的，
	//比如有的命令会将输出放到stdout，有的放到stderr
	command.Stdout = &bytes.Buffer{}
	command.Stderr = &bytes.Buffer{}
	//执行命令，直到命令结束
	err := command.Run()
	if err != nil {
		//打印程序中的错误以及命令行标准错误中的输出
		fmt.Println(err)
		fmt.Println(command.Stderr.(*bytes.Buffer).String())
		return
	}
	//打印命令行的标准输出
	fmt.Println(command.Stdout.(*bytes.Buffer).String())
}

func cmd2() {
	//首先生成cmd结构体
	cmd := exec.Command("strace", "-p", "15284")
	//调用stderrPipe生成一个管道，该管道连接到命令行进程的标准错误， 该方法返回一个
	//ReadCloser， 我们可以通过读取返回的ReadCloser来实时读取命令行进程的标准错误
	piper, _ := cmd.StderrPipe()
	//开始执行命令
	cmd.Start()
	//使用bufio包封装的方法实现对reader的读取
	reader := bufio.NewReader(piper)
	for {
		//换行分隔
		line, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println(err)
			break
		}
		//打印内容
		fmt.Println(line)
	}
	//等待命令结束并回收子进程资源等
	cmd.Wait()
}

func main() {
	fmt.Println("调用cmd1函数:")
	cmd1()

	fmt.Println("调用cmd2函数:")
	cmd2()

	command := exec.Command("ifconfig")
	command.Stdout = &bytes.Buffer{}
	command.Stderr = &bytes.Buffer{}
	//执行命令，直到命令结束
	err := command.Run()
	if err != nil {
		//打印程序中的错误以及命令行标准错误中的输出
		fmt.Println(err)
		fmt.Println(command.Stderr.(*bytes.Buffer).String())
		return
	}
	fmt.Println(command.Stdout.(*bytes.Buffer).String())

}
```



**查看底层源码：**

```go
func Command(name string, arg ...string) *Cmd {
	cmd := &Cmd{
		Path: name,
		Args: append([]string{name}, arg...),
	}
	if filepath.Base(name) == name {
		if lp, err := LookPath(name); err != nil {
			cmd.lookPathErr = err
		} else {
			cmd.Path = lp
		}
	}
	return cmd
}
```



## 获取所有结点名







## 补充：变量的作用域

```go
package main

import (
	"fmt"
)

func style(method string, value int) {
	//this.method = method
	method = "smile3"
	value = 1003
	fmt.Println(method)
	fmt.Println(value)
}
func style2() {
	var method string
	var value int
	method = "smile"
	value = 100
	fmt.Println(method)
	fmt.Println(value)
}

func main() {
	var method string
	var value int
	method = "hello main"
	value = 10
	fmt.Println(method)
	fmt.Println(value)
	fmt.Println(" === ")
	style2()
	fmt.Println(" === ")
	fmt.Println(method)
	fmt.Println(value)
	fmt.Println(" === ")
	style(method, value)
	fmt.Println(" == 3")
	fmt.Println(method)
	fmt.Println(value)
}
```

**编译：**

```
C:\Users\smile\Desktop\区块链\code\gin>go run main.go
hello main
10
 ===
smile
100
 ===
hello main
10
 ===
smile3
1003
 == 3
hello main
10
```

