package main

import (
	"fmt"
)

func main() {
	//定义一个数组  -- 从小到大排序
	arr := [5]int{10, 34, 19, 100, 800}
	fmt.Println(arr)
	fmt.Printf("arr数组的类型 : %T \n", arr)
	var arrl = arr[:len(arr)-1]
	fmt.Println(arrl)
	fmt.Printf("arr数组的类型 : %T \n", arrl)
	arr2 := [...]int{10, 34, 19, 100, 800}
	fmt.Printf("arr数组的类型 : %T \n", arr2)

}
