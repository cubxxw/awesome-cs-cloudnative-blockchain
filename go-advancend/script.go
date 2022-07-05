package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	str := "markdown" //目录
	err := os.Mkdir(str, 0666)
	// MkdirAll 递归创建目录
	if err != nil {
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
		write.WriteString("+ [上一节](" + a3 + ".md)\n")
		write.WriteString("> ❤️💕💕Go语言高级篇章,在此之前建议您先了解基础和进阶篇。Myblog:[http://nsddd.top](http://nsddd.top/)\n")
		write.WriteString("###  **[Go语言基础篇](https://github.com/3293172751/Block_Chain/blob/master/TOC.md)**\n")
		write.WriteString("###  **[Go语言100篇进阶](https://github.com/3293172751/Block_Chain/blob/master/Gomd_super/README.md)**\n")
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
