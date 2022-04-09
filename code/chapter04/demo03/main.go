package main

import (
	"fmt"
)

func swich(left int, right int, array []int) {
	//left :表示数组左边的下标
	//right :表示数组右边的下标
	//array :表示要排序的数组
	l := left
	r := right

	pivot := (l + r) / 2 //表示中间的
	// temp := 0

	for l < r {
		//如果左边的小于右边的，一直找
		for array[l] < array[pivot] {
			l++
		}
		for array[r] > array[pivot] {
			r--
		}
		if l >= r {
			break
		} //左边大于等于右边,不需要
		array[l], array[r] = array[r], array[l]
		//左边找到比它大的，右边找到比它小的 交换
		if array[l] == array[pivot] {
			r--
		}
		if array[r] == array[pivot] {
			l++
		}
	}
	if l == r {
		l++
		r--

	}
	if l > r {
		swich(left, r, array)
	}
	if l < r {
		swich(l, right, array)
	}
}

func main() {
	arr := [...]int{23, 34, 23, 12, 2, 3, -1, 13, -4, 45, 6, 576}
	arr1 := arr[:]
	fmt.Println("arr1的值为：", arr1)
	swich(0, arr1[len(arr)-1], arr1)
	fmt.Println("arr 中main的值为：", arr1)
}
