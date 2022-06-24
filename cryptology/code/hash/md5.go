package hash

import (
	"crypto/md5"
	"encoding/hex"
	. "fmt"
	"io"
)

func GetMd5Str(src []byte) string {
	//1. 给hash算法添加数据
	res := md5.Sum(src)
	myres := Sprintf("%x", res)
	//1.对代码的值进行格式化操作
	return myres
}

//第二种方式
func GetMd5Str_2(src []byte) string {
	//1.创建一个hash接口
	hash := md5.New()
	//2. 添加数据
	io.WriteString(hash, string(src))
	io.WriteString(hash, "hello world")
	//3.计算结果
	res := hash.Sum(nil)
	//4.散列值格式化
	return hex.EncodeToString(res)
}
