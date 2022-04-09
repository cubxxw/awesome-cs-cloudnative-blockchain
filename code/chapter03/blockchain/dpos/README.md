
>股份授权证明机制是POS的一个变种，简单来说就是你手里有选票（币就相当于选票）。这时一些正在竞选超级节点的大节点们说把票都投给我把，等我当选了超级节点，我吃肉你喝汤，岂不美哉？然后你就信了，把票投给了竞选节点，这些节点竞选成功成为超级节点后会轮循的获得出块权。旷工费、通胀放出的代币也就都到了他们手里了。比较中心化的一种共识机制，但是TPS很高。

<br>

区块结构：
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
	//挖出本块的节点地址
	address string
}
```

```go
//用于存储区块链
var blockchain []block
//普通节点
type node struct{
	//代币数量
	votes int
	//节点地址
	address string
}
//竞选节点
type superNode struct {
	 node
}
//投票节点池
var voteNodesPool []node
//竞选节点池
var starNodesPool []superNode
//存放可以挖矿的超级节点池
var superStarNodesPool []superNode
```

初始化：\
生成投票节点池并随机赋予代币数量，同时为竞选节点池生成竞选节点
```go
//初始化
func init() {
	//初始化投票节点
	for i:=0;i<=voteNodeNum;i++ {
		rInt,err:=rand.Int(rand.Reader,big.NewInt(10000))
		if err != nil {
			log.Panic(err)
		}
		voteNodesPool = append(voteNodesPool,node{int(rInt.Int64()),"投票节点"+strconv.Itoa(i)})
	}
	//初始化超级节点
	for i:=0;i<=superNodeNum;i++ {
		starNodesPool = append(starNodesPool,superNode{node{0,"超级节点"+strconv.Itoa(i)}})
	}
}
```


模拟普通节点投票（随机的对竞选节点投票）
```go
//投票
func voting() {
	for _, v := range voteNodesPool {
		rInt, err := rand.Int(rand.Reader, big.NewInt(superNodeNum+1))
		if err != nil {
			log.Panic(err)
		}
		starNodesPool[int(rInt.Int64())].votes += v.votes
	}
}
```

对竞选节点根据得票数排序，前几名成为超级节点
```go
//对挖矿节点进行排序
func sortMineNodes() {
	sort.Slice(starNodesPool, func(i, j int) bool {
		return starNodesPool[i].votes > starNodesPool[j].votes
	})
	superStarNodesPool = starNodesPool[:mineSuperNodeNum]
}
```

主函数
```go
func main() {
	fmt.Println("初始化", voteNodeNum, "个投票节点...")
	fmt.Println(voteNodesPool)
	fmt.Println("当前存在的", superNodeNum, "个竞选节点")
	fmt.Println(starNodesPool)
	fmt.Println("投票节点们开始进行投票...")
	voting()
	fmt.Println("结束投票，查看竞选节点们获得票数...")
	fmt.Println(starNodesPool)
	fmt.Println("对竞选节点按获得票数排序，前", mineSuperNodeNum, "名，当选超级节点")
	sortMineNodes()
	fmt.Println(superStarNodesPool)
	fmt.Println("开始挖矿...")
	genesisBlock := block{"0000000000000000000000000000000000000000000000000000000000000000", "", time.Now().Format("2006-01-02 15:04:05"), "我是创世区块", 1, "000000000"}
	genesisBlock.getHash()
	blockchain = append(blockchain, genesisBlock)
	fmt.Println(blockchain[0])
	i, j := 0, 0
	for {
		time.Sleep(time.Second)
		newBlock := generateNewBlock(blockchain[i], "我是区块内容", superStarNodesPool[j].address)
		blockchain = append(blockchain, newBlock)
		fmt.Println(blockchain[i+1])
		i++
		j++
		j = j % len(superStarNodesPool)
	}
}
```

运行结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191211162452121.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1OTExMTg0,size_16,color_FFFFFF,t_70)
