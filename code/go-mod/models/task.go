package models

import "fmt"
import "github.com/astaxie/beego"

var Name = "test"

func init() {
	fmt.Println("最先开始调用多个")
}

func main() {
	beego.Run()
}
