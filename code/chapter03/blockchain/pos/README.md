
>权益证明机制最开始是由点点币提出并应用（出块概率=代币数量 * 币龄） 简单来说谁的币多，谁就有更大的出块概率。但是深挖下去，这个出块概率谁来计算？碰到无成本利益关系问题怎么办?这个共识算法初看很简单，实际有很多问题需要解决，且看以太坊什么时候能完全转换到POS机制吧

<br>

区块结构
```go
type block struct {
	//上一个块的hash
	prehash string
	//本块hash
	hash string
	//时间戳
	timestamp string
	//区块内容
	data string
	//区块高度
	height int
	//挖出本块的地址
	address string
}
```
声明两个节点池\
mineNodesPool 用来存放指定的挖矿节点\
probabilityNodesPool  用于存入挖矿节点的代币数量*币龄获得的概率
```go
//用于存储区块链
var blockchain []block
//代表挖矿节点
type node struct{
	//代币数量
	tokens int
	//质押时间
	days  int
	//节点地址
	address string
}
//挖矿节点
var mineNodesPool []node
//概率节点池
var  probabilityNodesPool []node
```
初始化节点池：
```go
func init () {
	//手动添加两个节点
	mineNodesPool = append(mineNodesPool,node{1000,1,"AAAAAAAAAA"})
	mineNodesPool = append(mineNodesPool,node{100,3,"BBBBBBBBBB"})
	//初始化随机节点池（挖矿概率与代币数量和币龄有关）
	for _,v:=range mineNodesPool{
		for i:=0;i<=v.tokens * v.days; i ++ {
			randNodesPool = append(randNodesPool,v)
		}
	}
}
```
每次挖矿都会从概率节点池中随机选出获得出块权的节点地址
```go
//随机得出挖矿地址（挖矿概率跟代币数量与币龄有关）
func getMineNodeAddress() string{
	bInt:=big.NewInt(int64(len(randNodesPool)))
	//得出一个随机数，最大不超过随机节点池的大小
	rInt,err:=rand.Int(rand.Reader,bInt)
	if err != nil {
		log.Panic(err)
	}
	return randNodesPool[int(rInt.Int64())].address
}
```


```go
func main() {
	//创建创世区块
	genesisBlock := block{"0000000000000000000000000000000000000000000000000000000000000000","",time.Now().Format("2006-01-02 15:04:05"),"我是创世区块",1,"0000000000"}
	genesisBlock.getHash()
	//把创世区块添加进区块链
	blockchain = append(blockchain,genesisBlock)
	fmt.Println(blockchain[0])
	i:=0
	for  {
		time.Sleep(time.Second)
		newBlock:=generateNewBlock(blockchain[i],"我是区块内容","00000")
		blockchain = append(blockchain,newBlock)
		fmt.Println(blockchain[i + 1])
		i++
	}
}
```

运行结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191211154915783.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1OTExMTg0,size_16,color_FFFFFF,t_70)
