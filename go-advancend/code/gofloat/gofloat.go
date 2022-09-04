package main

import (
	"fmt"

	"github.com/shopspring/decimal"
)

func main() {

	//Go语言精度丢失问题
	m1 := 8.3
	m2 := 3.8
	fmt.Println("m1 - m2 = ", m1-m2)

	var num1 float64 = 3.1
	var num2 float64 = 4.2
	d1 := decimal.NewFromFloat(num1).Add(decimal.NewFromFloat(num2))
	fmt.Println("num1 - num2 = ", d1)
}
