/*
 * @Author: xiongxinwei 3293172751nss@gmail.com
 * @Date: 2022-08-22 17:12:36
 * @LastEditors: xiongxinwei 3293172751nss@gmail.com
 * @LastEditTime: 2022-08-29 12:49:52
 * @FilePath: \code\12\12.go
 * @Description: 值、引用、指针
 */
package 12

import (
	"fmt"
	"sync"
)

func main() {
	var mu sync.Mutex

	go func() {
		fmt.Println("你好, 世界")
		mu.Lock()
	}()

	mu.Unlock()
}
