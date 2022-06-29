package main
import(
	"fmt"
	"C"
)
func main() {
	fmt.Println("hello world!")
	C.printf("hello world!")
	
	}