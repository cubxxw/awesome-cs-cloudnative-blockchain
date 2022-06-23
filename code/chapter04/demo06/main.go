ckage main
import (
	"fmt"
	)

	func sum(n1 int,args... int)int{
	    sum := n1
		    //±éÀúargs
			    for i:= 0;i<len(args);i++{
				        sum += args[i]
						    }
							    return sum
								}

								func main(){
								    a := sum(10,234,3,4,34543,5,3,45,3,5,56)
									    fmt.Println("a = ",a)
										}
