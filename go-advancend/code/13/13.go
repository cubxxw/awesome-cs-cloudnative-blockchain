/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-08-31 16:09:03
 * @LastEditors: xiongxinwei 3293172751nss@gmail.com
 * @LastEditTime: 2022-08-31 16:19:01
 * @FilePath: \code\13\13.go
 * @Description:
 *
 *
 */
package main

import "fmt"

func main() {
	c := make(chan [0]int)
	go func() {
		fmt.Println("c = ", c)
		//c <- [...]int{}
		c <- [0]int{}
	}()
	<-c
	const s = "2123\xe4\x00\x00\xe7\x95\x8cabc"
	for i := 0; i < len(s); i++ {
		fmt.Printf("%d %x\n", i, s[i])
	}
}
