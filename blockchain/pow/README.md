<br>

>工作量证明机制的核心在于不断hash区块自身，将hash值与根据难度值计算出的一串大数对比，如果自身hash小于大数则说明挖矿成功，否则变化自身随机数重新计算。并且程序会随着出块间隔时间动态调节难度值（比如比特币）

<br>

区块结构
```go
type block struct {
	//上一个区块的Hash
	Lasthash string
	//本区块Hash
	Hash string
	//区块存储的数据（比如比特币UTXO模型 则此处可用于存储交易）
	Data string
	//时间戳
	Timestamp string
	//区块高度
	Height int
	//难度值
	DiffNum uint
	//随机数
	Nonce int64
}
```
挖矿函数：\
**使用math/big包，根据全局变量的难度值diffNum计算出用于实际比较的一串大数newBigint ，并同时将区块hash转换为大数hashInt   两个大数进行数值比较，如果hashInt小于newBigint 则代表挖矿成功**

```go
//区块挖矿（通过自身递增nonce值计算hash）
func mine(data string) block {
	if len(blockchain) < 1 {
		log.Panic("还未生成创世区块！")
	}
	lastBlock := blockchain[len(blockchain)-1]
	//制造一个新的区块
	newBlock := new(block)
	newBlock.Lasthash = lastBlock.Hash
	newBlock.Timestamp = time.Now().String()
	newBlock.Height = lastBlock.Height + 1
	newBlock.DiffNum = diffNum
	newBlock.Data = data
	var nonce int64 = 0
	//根据挖矿难度值计算的一个大数
	newBigint := big.NewInt(1)
	newBigint.Lsh(newBigint, 256-diffNum) //相当于左移 1<<256-diffNum
	for {
		newBlock.Nonce = nonce
		newBlock.getHash()
		hashInt := big.Int{}
		hashBytes, _ := hex.DecodeString(newBlock.Hash)
		hashInt.SetBytes(hashBytes) //把本区块hash值转换为一串数字
		//如果hash小于挖矿难度值计算的一个大数，则代表挖矿成功
		if hashInt.Cmp(newBigint) == -1 {
			break
		} else {
			nonce++ //不满足条件，则不断递增随机数，直到本区块的散列值小于指定的大数
		}
	}
	return *newBlock
}
```

```go
func main() {
	//制造一个创世区块
	genesisBlock := new(block)
	genesisBlock.Timestamp = time.Now().String()
	genesisBlock.Data = "我是创世区块！"
	genesisBlock.Lasthash = "0000000000000000000000000000000000000000000000000000000000000000"
	genesisBlock.Height = 1
	genesisBlock.Nonce = 0
	genesisBlock.DiffNum = 0
	genesisBlock.getHash()
	fmt.Println(*genesisBlock)
	//将创世区块添加进区块链
	blockchain = append(blockchain, *genesisBlock)
	for i := 0; i < 10; i++ {
		newBlock := mine("天气不错"+strconv.Itoa(i))
		blockchain = append(blockchain, newBlock)
		fmt.Println(newBlock)
	}
```

运行结果：
![image-20220409200413598](https://s2.loli.net/2022/04/09/IHtRySnNYG1c4ho.png)



**对比BTC**

```C++
/** Nodes collect new transactions into a block, hash them into a hash tree,
 * and scan through nonce values to make the block's hash satisfy proof-of-work
 * requirements.  When they solve the proof-of-work, they broadcast the block
 * to everyone and the block is added to the block chain.  The first transaction
 * in the block is a special one that creates a new coin owned by the creator
 * of the block.
 *
 **网络中的节点不断收集新的交易打包到区块中，所有的交易会通过两两哈希的方式形成一个Merkle树
 * 打包的过程就是要完成工作量证明的要求，当节点解出了当前的随机数时，
 * 它就把当前的区块广播到其他所有节点，并且加到区块链上。
 * 区块中的第一笔交易称之为CoinBase交易，是产生的新币，奖励给区块的产生者  
 * 
 * add by chaors 20180419
 */

class CBlockHeader
{
public:
    // header
    int32_t nVersion;       //版本
    uint256 hashPrevBlock;  //上一个区块的hash
    uint256 hashMerkleRoot; //包含交易信息的Merkle树根
    uint32_t nTime;         //时间戳
    uint32_t nBits;         //工作量证明(POW)的难度
    uint32_t nNonce;        //要找的符合POW的随机数

    CBlockHeader()          //构造函数初始化成员变量
    {
        SetNull();          
    }

    ADD_SERIALIZE_METHODS;  //通过封装的模板实现类的序列化

    template <typename Stream, typename Operation>
    inline void SerializationOp(Stream& s, Operation ser_action) {
        READWRITE(this->nVersion);
        READWRITE(hashPrevBlock);
        READWRITE(hashMerkleRoot);
        READWRITE(nTime);
        READWRITE(nBits);
        READWRITE(nNonce);
    }

    void SetNull()          //初始化成员变量
    {
        nVersion = 0;
        hashPrevBlock.SetNull();
        hashMerkleRoot.SetNull();
        nTime = 0;
        nBits = 0;
        nNonce = 0;
    }

    bool IsNull() const
    {
        return (nBits == 0);     //难度为0说明区块还未创建，区块头为空
    }

    uint256 GetHash() const;     //获取哈希

    int64_t GetBlockTime() const //获取区块时间
    {
        return (int64_t)nTime;
    }
};
```

