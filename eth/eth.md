# 0x03 geth源码结构

**目录结构**

```shell
[root@mail go-ethereum]# ls -al
total 392
drwxr-xr-x 36 root root  4096 Mar  6 12:59 .
drwxr-xr-x  3 root root  4096 Mar  6 12:36 ..
drwxr-xr-x  7 root root  4096 Mar  6 12:37 accounts
-rw-r--r--  1 root root  1763 Mar  6 12:37 appveyor.yml
-rw-r--r--  1 root root 14065 Mar  6 12:37 AUTHORS
drwxr-xr-x  3 root root  4096 Mar  6 12:37 build
-rw-r--r--  1 root root  1576 Mar  6 12:37 circle.yml
drwxr-xr-x 16 root root  4096 Mar  6 12:38 cmd
drwxr-xr-x  9 root root  4096 Mar  6 12:38 common
drwxr-xr-x  6 root root  4096 Mar  6 12:38 consensus
drwxr-xr-x  4 root root  4096 Mar  6 12:38 console
drwxr-xr-x  3 root root  4096 Mar  6 12:38 contracts
-rw-r--r--  1 root root 35823 Mar  6 12:38 COPYING
-rw-r--r--  1 root root  7816 Mar  6 12:38 COPYING.LESSER
drwxr-xr-x  9 root root  4096 Mar  6 12:38 core
drwxr-xr-x  8 root root  4096 Mar  6 12:39 crypto
-rw-r--r--  1 root root   751 Mar  6 12:39 Dockerfile
-rw-r--r--  1 root root   724 Mar  6 12:39 Dockerfile.alltools
-rw-r--r--  1 root root    62 Mar  6 12:36 .dockerignore
drwxr-xr-x  4 root root  4096 Mar  6 12:39 docs
drwxr-xr-x 10 root root  4096 Mar 11 15:57 eth
drwxr-xr-x  3 root root  4096 Mar  6 12:39 ethclient
drwxr-xr-x  5 root root  4096 Mar  6 12:39 ethdb
drwxr-xr-x  2 root root  4096 Mar  6 12:39 ethstats
drwxr-xr-x  2 root root  4096 Mar  6 12:39 event
drwxr-xr-x  8 root root  4096 Mar  6 12:37 .git
-rw-r--r--  1 root root   102 Mar  6 12:36 .gitattributes
drwxr-xr-x  3 root root  4096 Mar  6 12:37 .github
-rw-r--r--  1 root root   855 Mar  6 12:37 .gitignore
-rw-r--r--  1 root root   104 Mar  6 12:37 .gitmodules
-rw-r--r--  1 root root  1060 Mar  6 12:37 .golangci.yml
-rw-r--r--  1 root root  3570 Mar  6 12:39 go.mod
-rw-r--r--  1 root root 67613 Mar  6 12:39 go.sum
drwxr-xr-x  2 root root  4096 Mar  6 12:39 graphql
-rw-r--r--  1 root root 11740 Mar  6 12:39 interfaces.go
drwxr-xr-x 14 root root  4096 Mar  6 12:39 internal
drwxr-xr-x  8 root root  4096 Mar  6 12:39 les
drwxr-xr-x  2 root root  4096 Mar  6 12:39 light
drwxr-xr-x  2 root root  4096 Mar  6 12:39 log
-rw-r--r--  1 root root  3359 Mar  6 12:37 .mailmap
-rw-r--r--  1 root root  1661 Mar  6 12:39 Makefile
drwxr-xr-x  6 root root  4096 Mar  6 12:39 metrics
drwxr-xr-x  3 root root  4096 Mar  6 12:39 miner
drwxr-xr-x  2 root root  4096 Mar  6 12:39 mobile
drwxr-xr-x  2 root root  4096 Mar  6 12:39 node
-rw-r--r--  1 root root  5180 Mar  6 12:39 oss-fuzz.sh
drwxr-xr-x 13 root root  4096 Mar  6 13:00 p2p
drwxr-xr-x  2 root root  4096 Mar  6 12:39 params
-rw-r--r--  1 root root 20633 Mar  6 12:39 README.md
drwxr-xr-x  2 root root  4096 Mar  6 12:39 rlp
drwxr-xr-x  3 root root  4096 Mar  6 12:40 rpc
-rw-r--r--  1 root root 12292 Mar  6 12:59 SECURITY.md
drwxr-xr-x  6 root root  4096 Mar  6 12:40 signer
drwxr-xr-x  2 root root  4096 Mar  6 12:40 swarm
drwxr-xr-x  5 root root  4096 Mar  6 12:40 tests
-rw-r--r--  1 root root  9147 Mar  6 12:37 .travis.yml
drwxr-xr-x  2 root root  4096 Mar  6 12:40 trie
```

上节基本从使用方面了解了geth的基本功能，这一篇从源码入手开始分析geth。

用sublime打开geth源代码，我们同读bitcoin源码类同，也是先从源码的结构部分入手，把握大局再各个击破。

![源码目录](https://s2.loli.net/2022/03/16/I3z6kp1ZPBKoHfL.png)

**代码结构**

![geth源码结构.png](https://s2.loli.net/2022/03/16/YcFjvLK5oMbyTnf.png)



**互联网颠覆世界，区块链颠覆互联网!**