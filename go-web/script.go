/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-06-30 18:06:52
 * @LastEditors: xiongxinwei 3293172751nss@gmail.com
 * @LastEditTime: 2022-07-14 18:04:46
 * @FilePath: \undefinedc:\Users\smile\Desktop\其他\MAKEDOWN\script.go
 * @Description:
 */

package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"strconv"
)

func main() {

	// 通过exec.Command函数执行命令或者shell
	// 第一个参数是命令路径，当然如果PATH路径可以搜索到命令，可以不用输入完整的路径
	// 第二到第N个参数是命令的参数
	// 下面语句等价于执行命令: ls -l /var/
	cmd := exec.Command("cmd", "copy C:Users/smile/Desktop/其他/MAKEDOWN/gh-md-toc.exe gh-md-toc.exe")
	// 执行命令，并返回结果
	if output, err := cmd.Output(); err != nil {
		panic(err)
	} else {
		// 因为结果是字节数组，需要转换成string
		fmt.Println(string(output))
	}

	c := exec.Command("cmd", "/C", "copy C:Users/smile/Desktop/其他/MAKEDOWN/gh-md-toc.exe gh-md-toc.exe")
	if err := c.Start(); err != nil {
		fmt.Println("Error: ", err)
	}

	str := "markdown" //目录

	// MkdirAll 递归创建目录
	if err := os.Mkdir(str, 0666); err != nil {
		fmt.Println("err=", err)
	}

	var a int = 1
	for i := 1; i < 51; i++ {

		a1 := strconv.Itoa(a)
		a2 := strconv.Itoa((a + 1))
		a3 := strconv.Itoa((a - 1))
		filePath := "markdown/" + a1 + ".md"
		file, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE, 0666)
		//在原来的基础上追加666表示访问权限
		if err != nil {
			fmt.Println("文件打开失败", err)
		}
		//及时关闭file句柄
		defer file.Close()

		//写入文件时，使用带缓存的 *Writer
		write := bufio.NewWriter(file)
		write.WriteString("+ [author](https://github.com/3293172751)\n")
		write.WriteString("# 第" + a1 + "节\n")

		//批量加入文件，

		write.WriteString("+ [回到目录](../README.md)\n")
		write.WriteString("+ [回到项目首页](../../README.md)\n")
		write.WriteString("+ [上一节](" + a3 + ".md)\n")
		write.WriteString("> ❤️💕💕Go语言的web框架gin框架、gorm基本使用以及web开发项目实战，更多请移步我的博客Myblog:[http://cubxxw.com](http://cubxxw.com/)\n")
		write.WriteString("---\n")
		write.WriteString("[TOC]\n")
		for i := 0; i < 5; i++ {
			write.WriteString("\n")
		}
		write.WriteString("## END 链接\n")
		write.WriteString("+ [回到目录](../README.md)\n")
		write.WriteString("+ [上一节](" + a3 + ".md)\n")
		write.WriteString("+ [下一节](" + a2 + ".md)\n")
		write.WriteString("---\n")
		write.WriteString("+ [参与贡献❤️💕💕](https://github.com/3293172751/Block_Chain/blob/master/Git/git-contributor.md)")
		//Flush将缓存的文件真正写入到文件中
		write.Flush()
		a = a + 1
	}

}
