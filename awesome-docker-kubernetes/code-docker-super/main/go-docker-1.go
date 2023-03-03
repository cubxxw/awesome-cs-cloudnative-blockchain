package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	fmt.Println(os.Args)
	switch os.Args[1] {	 //获取第一个参数（从程序名开始）
	case "run":
		run()
	default:
		panic("have not define")
	}
}
func run() {
	cmd := exec.Command(os.Args[2])	//获取第二个参数
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Run()
}
