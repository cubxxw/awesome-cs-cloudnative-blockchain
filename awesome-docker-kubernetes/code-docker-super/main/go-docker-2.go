package main

import (
	"fmt"
	"os"
	"os/exec"
	"syscall"
)

func main() {
	fmt.Println("os.Args")
	switch os.Args[1] {
	case "run":
		run()
	default:
		defer func() {
			if err := recover(); err != nil {
				fmt.Println(err)
			}
		}()
		panic("have not define")
	}
}

func run() {
	cmd := exec.Command(os.Args[2])
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWUTS,
	}
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
