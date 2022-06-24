package main

import (
	"code/hash"
	"code/rsa"
	"fmt"
)

//测试函数
func main() {
	//生成密钥对，指定生成的位数，保存到文件
	rsa.GenerateRSAKey(2048)
	// if err != nil {
	// 	fmt.Println("err = ", err)
	// }
	message := []byte("无与伦比的得得 hello")
	//加密
	cipherText := rsa.RSA_Encrypt(message, "public.pem")
	fmt.Println("加密后为：", string(cipherText))
	//解密
	plainText := rsa.RSA_Decrypt(cipherText, "private.pem")
	fmt.Println("解密后为：", string(plainText))

	HashTest()
}

func HashTest() {
	//-------------------------------hash值的测试
	data := []byte("welcome to wuhan")
	fmt.Println("data: ", data)
	fmt.Println("Generator: ", hash.GetMd5Str(data))
	fmt.Println("Generator: ", hash.GetMd5Str_2(data))
	// rsa.GenerateRSAKey()
}
