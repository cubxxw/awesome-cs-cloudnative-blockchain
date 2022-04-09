package main

import (
	"fmt"
	"log"
	"net/http"
	"net/rpc"
	"time"
)

//rpc服务注册
func rpcRegister(raft *Raft) {
	//注册一个服务器
	err := rpc.Register(raft)
	if err != nil {
		log.Panic(err)
	}
	port := raft.node.Port
	//把服务绑定到http协议上
	rpc.HandleHTTP()
	//监听端口
	err = http.ListenAndServe(port, nil)
	if err != nil {
		fmt.Println("注册rpc服务失败", err)
	}
}

func (rf *Raft) broadcast(method string, args interface{}, fun func(ok bool)) {
	//设置不要自己给自己广播
	for nodeID, port := range nodeTable {
		if nodeID == rf.node.ID {
			continue
		}
		//连接远程rpc
		rp, err := rpc.DialHTTP("tcp", "127.0.0.1"+port)
		if err != nil {
			fun(false)
			continue
		}

		var bo = false
		err = rp.Call(method, args, &bo)
		if err != nil {
			fun(false)
			continue
		}
		fun(bo)
	}
}

//投票
func (rf *Raft) Vote(node NodeInfo, b *bool) error {
	if rf.votedFor != "-1" || rf.currentLeader != "-1" {
		*b = false
	} else {
		rf.setVoteFor(node.ID)
		fmt.Printf("投票成功，已投%s节点\n", node.ID)
		*b = true
	}
	return nil
}

//确认领导者
func (rf *Raft) ConfirmationLeader(node NodeInfo, b *bool) error {
	rf.setCurrentLeader(node.ID)
	*b = true
	fmt.Println("已发现网络中的领导节点，", node.ID, "成为了领导者！\n")
	rf.reDefault()
	return nil
}

//心跳检测回复
func (rf *Raft) HeartbeatRe(node NodeInfo, b *bool) error {
	rf.setCurrentLeader(node.ID)
	rf.lastHeartBeartTime = millisecond()
	fmt.Printf("接收到来自领导节点%s的心跳检测\n", node.ID)
	fmt.Printf("当前时间为:%d\n\n", millisecond())
	*b = true
	return nil
}

//追随者节点用来接收消息，然后存储到消息池中，待领导者确认后打印
func (rf *Raft) ReceiveMessage(message Message, b *bool) error {
	fmt.Printf("接收到领导者节点发来的信息，id为：%d\n", message.MsgID)
	MessageStore[message.MsgID] = message.Msg
	*b = true
	fmt.Println("已回复接收到消息，待领导者确认后打印")
	return nil
}

//追随者节点的反馈得到领导者节点的确认，开始打印消息
func (rf *Raft) ConfirmationMessage(message Message, b *bool) error {
	go func() {
		for {
			if _, ok := MessageStore[message.MsgID]; ok {
				fmt.Printf("raft验证通过，可以打印消息，id为：%d\n", message.MsgID)
				fmt.Println("消息为：", MessageStore[message.MsgID], "\n")
				rf.lastMessageTime = millisecond()
				break
			} else {
				//如果没有此消息，等一会看看!!!
				time.Sleep(time.Millisecond * 10)
			}

		}
	}()
	*b = true
	return nil
}

//领导者接收到，追随者节点转发过来的消息
func (rf *Raft) LeaderReceiveMessage(message Message, b *bool) error {
	fmt.Printf("领导者节点接收到转发过来的消息，id为:%d\n", message.MsgID)
	MessageStore[message.MsgID] = message.Msg
	*b = true
	fmt.Println("准备将消息进行广播...")
	num := 0
	go rf.broadcast("Raft.ReceiveMessage", message, func(ok bool) {
		if ok {
			num++
		}
	})

	for {
		//自己默认收到了消息，所以减去一
		if num > raftCount/2-1 {
			fmt.Printf("全网已超过半数节点接收到消息id：%d\nraft验证通过，可以打印消息，id为：%d\n", message.MsgID, message.MsgID)
			fmt.Println("消息为：", MessageStore[message.MsgID], "\n")
			rf.lastMessageTime = millisecond()
			fmt.Println("准备将消息提交信息发送至客户端...")
			go rf.broadcast("Raft.ConfirmationMessage", message, func(ok bool) {
			})
			break
		} else {
			//休息会儿
			time.Sleep(time.Millisecond * 100)
		}
	}
	return nil
}
