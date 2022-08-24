/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-08-22 17:12:36
 * @LastEditors: xiongxinwei 3293172751nss@gmail.com
 * @LastEditTime: 2022-08-24 10:32:59
 * @FilePath: \code\11\11.go
 * @Description: 值、引用、指针
 */
package main

import (
	"C"
	"fmt"
)

func main() {
	fmt.Println("hello word")
	var i int
	i = 1
	fmt.Println(i)
	fmt.Println("woshi c")
	C.puts(C.CString("Hello, World\n"))
}
