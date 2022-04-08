package main

import (
	"fmt"
)

//排序算法  -- 选择排序
func SelectSort(arr *[5]int) {
	//数组默认是值传递，要想改变数组的值，就必须要指针引用传递
	arr[0] = 600 //Go语言底层优化
	//此时进行下面的排序 -- 先完成找到最小的值和arr[0]交换
	var min int
	/*第一次排序如下：
	min = arr[0]
	minIndx := 0 //存放最小值的下标
	for i, v := range arr {
		if min > v {
			//假设最大值交换
			min = v //找到最小值
			minIndx = i
		}
	}

	//交换
	if minIndx != 0 {
		arr[0], arr[minIndx] = arr[minIndx], arr[0]
		//相当于交换，Go语言底层使用了中间变量进行处理
	}
	//第二次
		min = arr[1]
	minIndx := 1 //存放最小值的下标
	for i, v := range arr {
		if min > v {
			//假设最大值交换
			min = v //找到最小值
			minIndx = i
		}
	}

	//交换
	if minIndx != 1 {
		arr[1], arr[minIndx] = arr[minIndx], arr[1]
		//相当于交换，Go语言底层使用了中间变量进行处理
	}
	*/
	//对上面代码进行循环处理
	for j := 0; j < len(arr)-1; j++ {
		min = arr[j]
		minIndx := j //存放最小值的下标
		for i := j + 1; i < len(arr); i++ {
			if min < arr[i] {
				//假设最大值交换
				min = arr[i] //找到最小值
				minIndx = i
			}
		}

		//交换
		if minIndx != j {
			arr[j], arr[minIndx] = arr[minIndx], arr[j]
			//相当于交换，Go语言底层使用了中间变量进行处理
		}
		fmt.Println("第", j+1, "次循环", arr)
	}

}

func main() {
	//定义一个数组  -- 从小到大排序
	arr := [5]int{10, 34, 19, 100, 800}
	SelectSort(&arr)

	fmt.Println("主函数")
	fmt.Println(arr)
}
