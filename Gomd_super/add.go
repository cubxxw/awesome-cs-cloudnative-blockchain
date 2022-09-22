/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-06-30 18:06:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-22 17:51:59
 * @FilePath: \undefinedc:\Users\smile\Desktop\其他\测试文件夹\script - 副本.go
 * @Description: github - markdown
 */

package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {

	var a, n int
	fmt.Printf("输入文件开始的编号")
	fmt.Scanln(&a)

	fmt.Println("请输入你要构建markdown的文件个数:")
	fmt.Scanln(&n)

	var fname string
	fmt.Println("请输入你要追加文件的文件夹名称（存在）")
	fmt.Scanln(&fname)

	for i := 1; i < n; i++ {

		a1 := strconv.Itoa(a)
		a2 := strconv.Itoa((a + 1))
		a3 := strconv.Itoa((a - 1))
		filePath := fname + "/" + a1 + ".md"
		file, err := os.OpenFile(filePath, os.O_WRONLY|os.O_APPEND, 0666)
		//在原来的基础上追加666表示访问权限
		if err != nil {
			fmt.Println("文件打开失败", err)
		}
		//及时关闭file句柄
		defer file.Close()

		//写入文件时，使用带缓存的 *Writer
		write := bufio.NewWriter(file)

		for i := 0; i < 2; i++ {
			write.WriteString("\n")
		}
		write.WriteString("## END 链接\n")
		write.WriteString("<ul><li><div><a href = '" + a3 + ".md" + "' style='float:left'>⬆️上一节🔗</a><a href = '" + a2 + ".md" + "' style='float: right'>⬇️下一节🔗</a></div></li></ul>\n")
		write.WriteString("\n")
		write.WriteString("+ [Ⓜ️回到首页🏠](../README.md)\n")
		write.WriteString("\n")
		write.WriteString("+ [**🫵参与贡献💞❤️‍🔥💖**](https://nsddd.top/archives/contributors))\n")
		write.WriteString("\n")
		// 版权声明
		write.WriteString("+ ✴️版权声明 &copy; :本书所有内容遵循[CC-BY-SA 3.0协议（署名-相同方式共享）&copy;](http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0协议文本) \n")

		write.WriteString("\n")
		//Flush将缓存的文件真正写入到文件中
		write.Flush()
		a = a + 1
	}

}
