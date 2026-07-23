/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-06-30 18:06:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-15 14:59:25
 * @FilePath: \undefinedd:\文档\git\CS_COURSE\python3\script.go
 * @Description: github - markdown
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
	// cmd := exec.Command("cmd", "copy C:Users/smile/Desktop/其他/MAKEDOWN/gh-md-toc.exe gh-md-toc.exe")
	// // 执行命令，并返回结果
	// if output, err := cmd.Output(); err != nil {
	// 	panic(err)
	// } else {
	// 	// 因为结果是字节数组，需要转换成string
	// 	fmt.Println(string(output))
	// }

	// c := exec.Command("cmd", "/C", "copy C:Users/smile/Desktop/其他/MAKEDOWN/gh-md-toc.exe gh-md-toc.exe")
	// if err := c.Start(); err != nil {
	// 	fmt.Println("Error: ", err)
	// }
	fmt.Println("欢迎使用xiongxinwei构建的脚本，" + "一键构建GitHub的文档结构\n" + "关于我：\n" +
		"	+ 博客：http://cubxxw.com\n" +
		"	+ GitHub地址: https://github.com/3293172751")
	fmt.Println()
	fmt.Println()
	fmt.Println("请选择是否(yes\\no)创建目录")
	var yes, fname string
	fmt.Scanln(&yes)
	if yes == "yes" { //输入的是yes 则 创建目录
		fmt.Println("请选择创建目录的名称(输入yes默认markdown文件夹)")
		var markdown string
		fmt.Scanln(&markdown)
		if markdown != "yes" {
			fmt.Scanln(&fname) //输入文件夹名称
		} else {
			//选择默认markdown格式
			fname = "markdown"
		}
		if err := os.Mkdir(fname, 0666); err != nil {
			fmt.Println("err = ", err)
		}
	} else {
		fmt.Println("你选择了使用原来的目录,您当前的目录文件有：")
		cmd := exec.Command("ls", " ")
		fmt.Println(cmd)
		fmt.Println("请选择你要构建GitHub项目的目录")
		var text int
		fmt.Scanln(&text)
	}
	// str := "markdown" //目录

	// // MkdirAll 递归创建目录
	// if err := os.Mkdir(str, 0666); err != nil {
	// 	fmt.Println("err=", err)
	// }
	var a, n int
	fmt.Printf("输入文件开始的编号")
	fmt.Scanln(&a)

	fmt.Println("请输入你要构建markdown的文件个数:")
	fmt.Scanln(&n)

	var st string //要说的话
	fmt.Println("请输入项目介绍")
	fmt.Scanln(&st)

	var xm string //项目地址
	fmt.Println("请输入项目的地址")
	fmt.Scanln(&xm)
	for i := 1; i < n; i++ {

		a1 := strconv.Itoa(a)
		a2 := strconv.Itoa((a + 1))
		a3 := strconv.Itoa((a - 1))
		filePath := fname + "/" + a1 + ".md"
		file, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE, 0666)
		//在原来的基础上追加666表示访问权限
		if err != nil {
			fmt.Println("文件打开失败", err)
		}
		//及时关闭file句柄
		defer file.Close()

		//写入文件时，使用带缓存的 *Writer
		write := bufio.NewWriter(file)
		write.WriteString("+ [author](" + xm + ")\n")
		write.WriteString("\n")
		write.WriteString("# 第" + a1 + "节\n")

		write.WriteString("\n")
		//批量加入文件，

		write.WriteString("<div><a href = '" + a3 + ".md" + "' style='float:left'>⬆️上一节🔗</a><a href = '" + a2 + ".md" + "' style='float: right'>⬇️下一节🔗</a></div>\n")
		write.WriteString("<br>\n")
		write.WriteString("\n")
		write.WriteString("> ❤️💕💕" + st + "Myblog:[http://cubxxw.com](http://cubxxw.com/)\n")
		write.WriteString("\n")
		write.WriteString("---\n")
		write.WriteString("[TOC]\n")
		for i := 0; i < 5; i++ {
			write.WriteString("\n")
		}
		write.WriteString("## END 链接\n")
		write.WriteString("<ul><li><div><a href = '" + a3 + ".md" + "' style='float:left'>⬆️上一节🔗</a><a href = '" + a2 + ".md" + "' style='float: right'>⬇️下一节🔗</a></div></li></ul>\n")
		write.WriteString("\n")
		write.WriteString("+ [Ⓜ️回到目录🏠](../README.md)\n")
		write.WriteString("\n")
		write.WriteString("+ [**🫵参与贡献💞❤️‍🔥💖**](https://cubxxw.com/archives/contributors))\n")
		write.WriteString("\n")
		// 版权声明
		write.WriteString("+ ✴️版权声明 &copy; :本书所有内容遵循[CC-BY-SA 3.0协议（署名-相同方式共享）&copy;](http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0协议文本) \n")

		write.WriteString("\n")
		//Flush将缓存的文件真正写入到文件中
		write.Flush()
		a = a + 1
	}

}
