package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("开始镜像os操作")
	path := "1.md"

	newFile, err := os.Create(path)
	//创建文件，
	if err != nil {
		fmt.Println("err = ", err)
		return
	}
	defer newFile.Close() //及时关闭

	info, err := os.Stat(path)
	if err != nil {
		fmt.Println("err = ", err)
		return
	}

	fmt.Println("wenjian1", info.Name())
}
