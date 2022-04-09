package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

//声明raft节点类型
type Raft struct {
	node *NodeInfo
	//本节点获得的投票数
	vote int
	//线程锁
	lock sync.Mutex
	//节点编号
	me string
	//当前任期
	currentTerm int
	//为哪个节点投票
	votedFor string
	//当前节点状态
	//0 follower  1 candidate  2 leader
	state int
	//发送最后一条消息的时间
	lastMessageTime int64
	//发送最后一条消息的时间
	lastHeartBeartTime int64
	//当前节点的领导
	currentLeader string
	//心跳超时时间(单位：秒)
	timeout int
	//接收投票成功通道
	voteCh chan bool
	//心跳信号
	heartBeat chan bool
}

type NodeInfo struct {
	ID   string
	Port string
}

type Message struct {
	Msg   string
	MsgID int
}

func NewRaft(id, port string) *Raft {
	node := new(NodeInfo)
	node.ID = id
	node.Port = port

	rf := new(Raft)
	//节点信息
	rf.node = node
	//当前节点获得票数
	rf.setVote(0)
	//编号
	rf.me = id
	//给0  1  2三个节点投票，给谁都不投
	rf.setVoteFor("-1")
	//0 follower
	rf.setStatus(0)
	//最后一次心跳检测时间
	rf.lastHeartBeartTime = 0
	rf.timeout = heartBeatTimeout
	//最初没有领导
	rf.setCurrentLeader("-1")
	//设置任期
	rf.setTerm(0)
	//投票通道
	rf.voteCh = make(chan bool)
	//心跳通道
	rf.heartBeat = make(chan bool)
	return rf
}

//修改节点为候选人状态
func (rf *Raft) becomeCandidate() bool {
	r := randRange(1500, 5000)
	//休眠随机时间后，再开始成为候选人
	time.Sleep(time.Duration(r) * time.Millisecond)
	//如果发现本节点已经投过票，或者已经存在领导者，则不用变身候选人状态
	if rf.state == 0 && rf.currentLeader == "-1" && rf.votedFor == "-1" {
		//将节点状态变为1
		rf.setStatus(1)
		//设置为哪个节点投票
		rf.setVoteFor(rf.me)
		//节点任期加1
		rf.setTerm(rf.currentTerm + 1)
		//当前没有领导
		rf.setCurrentLeader("-1")
		//为自己投票
		rf.voteAdd()
		fmt.Println("本节点已变更为候选人状态")
		fmt.Printf("当前得票数：%d\n", rf.vote)
		//开启选举通道
		return true
	} else {
		return false
	}
}

//进行选举
func (rf *Raft) election() bool {
	fmt.Println("开始进行领导者选举，向其他节点进行广播")
	go rf.broadcast("Raft.Vote", rf.node, func(ok bool) {
		rf.voteCh <- ok
	})
	for {
		select {
		case <-time.After(time.Second * time.Duration(timeout)):
			fmt.Println("领导者选举超时，节点变更为追随者状态\n")
			rf.reDefault()
			return false
		case ok := <-rf.voteCh:
			if ok {
				rf.voteAdd()
				fmt.Printf("获得来自其他节点的投票，当前得票数：%d\n", rf.vote)
			}
			if rf.vote > raftCount/2 && rf.currentLeader == "-1" {
				fmt.Println("获得超过网络节点二分之一的得票数，本节点被选举成为了leader")
				//节点状态变为2，代表leader
				rf.setStatus(2)
				//当前领导者为自己
				rf.setCurrentLeader(rf.me)
				fmt.Println("向其他节点进行广播...")
				go rf.broadcast("Raft.ConfirmationLeader", rf.node, func(ok bool) {
					fmt.Println(ok)
				})
				//开启心跳检测通道
				rf.heartBeat <- true
				return true
			}
		}
	}
}

//心跳检测方法
func (rf *Raft) heartbeat() {
	//如果收到通道开启的信息,将会向其他节点进行固定频率的心跳检测
	if <-rf.heartBeat {
		for {
			fmt.Println("本节点开始发送心跳检测...")
			rf.broadcast("Raft.HeartbeatRe", rf.node, func(ok bool) {
				fmt.Println("收到回复:", ok)
			})
			rf.lastHeartBeartTime = millisecond()
			time.Sleep(time.Second * time.Duration(heartBeatTimes))
		}
	}
}

//产生随机值
func randRange(min, max int64) int64 {
	//用于心跳信号的时间
	rand.Seed(time.Now().UnixNano())
	return rand.Int63n(max-min) + min
}

//获取当前时间的毫秒数
func millisecond() int64 {
	return time.Now().UnixNano() / int64(time.Millisecond)
}

//设置任期
func (rf *Raft) setTerm(term int) {
	rf.lock.Lock()
	rf.currentTerm = term
	rf.lock.Unlock()
}

//设置为谁投票
func (rf *Raft) setVoteFor(id string) {
	rf.lock.Lock()
	rf.votedFor = id
	rf.lock.Unlock()
}

//设置当前领导者
func (rf *Raft) setCurrentLeader(leader string) {
	rf.lock.Lock()
	rf.currentLeader = leader
	rf.lock.Unlock()
}

//设置当前领导者
func (rf *Raft) setStatus(state int) {
	rf.lock.Lock()
	rf.state = state
	rf.lock.Unlock()
}

//投票累加
func (rf *Raft) voteAdd() {
	rf.lock.Lock()
	rf.vote++
	rf.lock.Unlock()
}

//设置投票数量
func (rf *Raft) setVote(num int) {
	rf.lock.Lock()
	rf.vote = num
	rf.lock.Unlock()
}

//恢复默认设置
func (rf *Raft) reDefault() {
	rf.setVote(0)
	//rf.currentLeader = "-1"
	rf.setVoteFor("-1")
	rf.setStatus(0)
}
