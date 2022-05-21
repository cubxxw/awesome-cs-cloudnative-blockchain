package main

import (
	"github.com/gin-gonic/gin"
)

func sayHello(c *gin.Context) {
	c.JSON(
		200,
		gin.H,
	)

}
func main() {
	var r = gin.Default() //返回一个引擎
	r.GET(
		"/hello",
		sayHello,
	)

}
