/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-09-01 15:43:30
 * @LastEditors: xiongxinwei 3293172751nss@gmail.com
 * @LastEditTime: 2022-09-01 16:29:33
 * @FilePath: \code\markdown\gin\gin.go
 * @Description:
 *
 *
 */
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func sayHello(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "hello golang",
	})

}

func main() {
	r := gin.Default() //返回默认的路由引擎

	//指定用户使用GET请求访问/hello时，执行sayHello这个函数
	r.GET("/hello", sayHello)

	r.GET("/book", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"method": "GET",
		})
	})
	r.POST("/book", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{ //http.StatusOK:200
			"method": "POST",
		})
	})
	r.PUT("/book", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{ //http.StatusOK:200
			"method": "PUT",
		})
	})
	r.DELETE("/book", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{ //http.StatusOK:200
			"method": "DELETE",
		})
	})

	//启动服务
	r.Run(":9000")
}
