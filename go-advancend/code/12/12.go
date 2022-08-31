/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-08-22 17:12:36
 * @LastEditors: xiongxinwei 3293172751nss@gmail.com
 * @LastEditTime: 2022-08-31 16:33:20
 * @FilePath: \code\12\12.go
 * @Description: 值、引用、指针
 */
package main

import (
	"fmt"
	_ "sync"
)

func main() {
	var a [3]int                    // 定义长度为 3 的 int 型数组, 元素全部为 0
	var b = [...]int{1, 2, 3}       // 定义长度为 3 的 int 型数组, 元素为 1, 2, 3
	var c = [...]int{2: 3, 1: 2}    // 定义长度为 3 的 int 型数组, 元素为 0, 2, 3
	var d = [...]int{1, 2, 4: 5, 6} // 定义长度为 6 的 int 型数组, 元素为 1, 2, 0, 0, 5, 6
	//1,2,0,0,5,6
	fmt.Println(a, b, c, d)
	var s = [...]int{1: 12, 4: 41}
	//0,12,0,0,41
	fmt.Println("s = ", s)
	var s2 = [...]int{3: 12, 6: 41}
	fmt.Println("s2 = ", s2)

	//对s2进行迭代
	for range s2 {
		fmt.Println("hello")
	}
	s3 := s2[3:]
	s3 = append(s3, 2, 3, 4)
	s3 = append(s3, []int{12, 3, 12, 4}...)
	s3 = append([]int{12, 3, 12, 4}, s3...)
	fmt.Println("s3 = ", s3)
	s3 = append(s3[:1], []int{0, 0, 0, 0}...)
	fmt.Println("s3 = ", s3)
}
