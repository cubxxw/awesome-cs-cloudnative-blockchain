/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-09-01 14:21:54
 * @LastEditors: xiongxinwei 3293172751nss@gmail.com
 * @LastEditTime: 2022-09-02 16:22:08
 * @FilePath: \code\markdown\main.go
 * @Description:
 *
 *
 */
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func sayHello(w http.ResponseWriter, r *http.Request) {
	b, _ := ioutil.ReadFile("./hello.txt")
	_, _ = fmt.Fprintln(w, string(b))
	//向文件中写入helloword
}

func main() {
	str := "a"
	var s byte = 123
	fmt.Printf("v:%v,s:%s,t:%T\n", str, str, str)
	fmt.Printf("v:%v,s:%s,t:%T", s, s, s)
	http.HandleFunc("/hello", sayHello)
	// 往浏览器写入hello这调用函数sayhello -- 如何访问或者启动这个服务
	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		fmt.Printf("http serve faile err = %v\n", err)
		//遇到错误直接返回
		return
	}
}
