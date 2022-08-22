/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-08-22 17:12:36
 * @LastEditors: xiongxinwei 3293172751nss@gmail.com
 * @LastEditTime: 2022-08-22 17:20:50
 * @FilePath: \code\11\11.go
 * @Description: 值、引用、指针
 */
package main

import (
	"fmt"
)

func changeInt(i int) {
	i += 1
}

func changeSlice(s []string) {
	for i, v := range s {

	}
}

func main() {
	fmt.Println("hello word")
	var i int
	i = 1
	changeInt(i)
	fmt.Println(i)

}
