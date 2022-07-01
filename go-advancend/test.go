package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

type CharCount struct {
	ChCount    int // 记录英文个数
	NumCount   int // 记录数字的个数
	SpaceCount int // 记录空格的个数
	OtherCount int // 记录其它字符的个数
}

func main() {
	str := "markdown" //目录
	err := os.Mkdir(str, 0666)
	// MkdirAll 递归创建目录
	if err != nil {
		fmt.Println("err=", err)
	}
	//fmt.Println("当前目录为:", os.Getwd)

	//思路: 打开一个文件, 创一个Reader
	//每读取一行，就去统计该行有多少个 英文、数字、空格和其他字符
	//然后将结果保存到一个结构体
	fileName := str + "/1.md"
	file, err := os.Open(fileName)
	if err != nil {
		fmt.Printf("open file err=%v\n", err)
		return
	}
	defer file.Close()
	//定义个CharCount 实例
	var count CharCount
	//创建一个Reader
	reader := bufio.NewReader(file)

	//开始循环的读取fileName的内容
	for {
		str, err := reader.ReadString('\n')
		if err == io.EOF { //读到文件末尾就退出
			break
		}
		//遍历 str ，进行统计
		for _, v := range str {

			switch { //无项目，相当于分支结构
			case v >= 'a' && v <= 'z':
				fallthrough //穿透
			case v >= 'A' && v <= 'Z':
				count.ChCount++
			case v == ' ' || v == '\t':
				count.SpaceCount++
			case v >= '0' && v <= '9':
				count.NumCount++
			default:
				count.OtherCount++
			}
		}
	}
	c := "字符的个数为+count.ChCount  数字的个数为+count.NumCount 空格的个数为+count.SpaceCount, 其它字符个数+ count.OtherCount"
	//输出统计的结果看看是否正确
	fmt.Printf("字符的个数为=%v 数字的个数为=%v 空格的个数为=%v 其它字符个数=%v",
		count.ChCount, count.NumCount, count.SpaceCount, count.OtherCount)

	//1.打开要操作的文件
	fileobj, err := os.OpenFile(str+"1.md", os.O_RDWR, 0664)
	//1.1打开文件报错
	if err != nil {
		fmt.Printf("open file failed,err:%v", err)
		return
	}

	//2.因为没有办法直接在文件中插入内容，所以要借助一个临时文件
	tmpFile, err := os.OpenFile(str+"/1.tmp", os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0665)
	if err != nil {
		fmt.Printf("creat file failed,err:%v", err)
		return
	}

	//3.读原文件写入临时文件
	//3.1读原文件 读到你想要插入的位置之前
	//设置一次读1字节    因为只把a读出  只要能成功读出光标就在你读取的内容之后
	var ret [1]byte
	ret1 := ret[:]
	n, err := fileobj.Read(ret1) //读的文件放在ret1中
	//读取文件失败
	if err != nil {
		fmt.Printf("read file failed,err:%v", err)
		return
	}
	ret2 := ret1[0:n]
	//3.2把从源文件读的内容写入临时文件    把a写入了临时文件
	tmpFile.Write(ret2)
	//3.3接着写入你想要插入的内容
	s1 := []string{c}
	tmpFile.Write(s1)

	//3.4紧接着把源文件后续的内容写入临时文件
	//3.4.1设置一次读取多少字节
	var x [1024]byte
	//3.4.2循环读取
	for {
		//3.4.2从源文件读的内容放到切片中
		n, err := fileobj.Read(x[:])
		if err == io.EOF {
			tmpFile.Write(x[:n])
			break
		}
		if err != nil {
			fmt.Printf("read file failed,%v:\n", err)
			return

		}
		tmpFile.Write(x[:n])

	}

	//4.源文件后续的内容也写入到了临时文件中
	//4.1 关闭两个文件
	fileobj.Close()
	tmpFile.Close()
	//4.2 将临时文件名字重命名为自己起的名字
	os.Rename("./sb.tmp", "./sb.txt")
}
