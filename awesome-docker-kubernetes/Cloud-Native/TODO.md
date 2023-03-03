# sealer rootless design

## 🔍 Desired state

+ [ ] sealer run (cluster)
+ [ ] sealer images (image)
+ [ ] 通过删除 setuid 加固 Linux 二进制文件[^1]
+ [ ] 

> `setuid` 是一个 Unix 操作系统的权限标志，用于给予特定程序在运行时特定的权限。当一个程序具有 `setuid` 标志时，它以其文件所有者的身份运行，而不是以当前用户的身份运行。这可以用于允许非特权用户执行特权操作，例如访问特殊文件或执行特殊操作。

## 📖 Solution Ideas

或许可以参考 docker 的 docker 用户组权限设置，来解决 rootless 问题

+ [https://rootlesscontaine.rs/](https://rootlesscontaine.rs/)

借助 `buildah` 无根模式的设计，构建出 rootless。

> ⚠️ 注意： `buildah` 默认是支持五根模式的！

方案：

+ [ ] Alias sealer = /usr/bin/sealer  (unalias sealer)
+ [ ] With the `group` ownership the `sealer` group
+ [ ] Add related documents



There are 3 ways to use `Sealer` and `Buildah` in a container:

1. Linux kernel with rootless overlayfs.
   具有无根覆盖层的 Linux 内核。
2. Linux kernel without rootless overlayfs and privileged container.
   没有无根覆盖层和特权容器的 Linux 内核。
3. Linux kernel without rootless overlayfs and non-privileged container with special options.
   没有无根覆盖层的 Linux 内核和具有特殊选项的非特权容器。







### 🖊️ TODO

+ [ ] `rootless` 模式下一键安装 `sealer` 脚本（没有权限）

  ```bash
  wget https://github.com/sealerio/sealer/releases/download/v0.9.0/sealer-v0.9.0-linux-amd64.tar.gz && \
  tar zxvf sealer-v0.9.0-linux-amd64.tar.gz && sudo mv sealer /usr/bin ; sealer
  ```

+ [ ] 单节点非高可以用状态安装取消 `–masters`

  ```bash
  sudo sealer run docker.io/sealerio/kubernetes:v1.22.15 
  #2023-02-05 16:32:44 [ERROR] [root.go:75] sealer-v0.9.0: you must input master ip Or use Clusterfile
  ```

+ [ ] 



### 🏷️ Error logged

```bash
test@cubmaster01:/tmp$ sealer run docker.io/sealerio/kubernetes:v1.22.15
```

第一个无权限：

> 参考 docker 的组权限：
>
> 如果您不想在`docker`命令前加上`sudo`，请创建一个名为 的 Unix 组`docker`并将用户添加到其中。当 Docker 守护进程启动时，它会创建一个可供`docker`组成员访问的 Unix 套接字。在某些 Linux 发行版上，系统会在使用包管理器安装 Docker Engine 时自动创建此组。在这种情况下，您无需手动创建组。

```bash
2023-02-05 13:40:49 [ERROR] [root.go:75] sealer-unknown: open /etc/containers/policy.json: permission denied
```



权限分配：

```bash
sudo groupadd seal;
sudo useradd sealer;sudo sealer mkdir /home/sealer; chmod 777 /home/sealer 
sudo usermod -g seal sealer;
sudo usermod -aG seal $USER;
sudo chmod 777	/etc/containers/storage.conf;

# Free of secret（roor user)
sudo echo "sealer ALL=(ALL) NOPASSWD: NOPASSWD: ALL" >> /etc/sudoers
```



sudo 提权：

```bash
ubuntu@i-02v830ud:~$ sudo sealer run docker.io/sealerio/kubernetes:v1.22.15 --masters 10.160.25.43
2023-02-06 10:34:55 [ERROR] [root.go:75] sealer-v0.9.0: failed to install docker: execute command(bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh ) on host (10.160.25.43): error(failed to execute command(bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh ) on host(10.160.25.43): error(exit status 1))
```

> 解决方案：
>
> ```bash
> 2023-02-07 16:29:37 [ERROR] [root.go:75] sealer-v0.9.0: failed to install docker: execute command(bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh ) on host (10.0.4.3): error(failed to execute command(bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh ) on host(10.0.4.3): error(exit status 127))2023-02-07 16:29:37 [ERROR] [root.go:75] sealer-v0.9.0: failed to install docker: execute command(bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh ) on host (10.0.4.3): error(failed to execute command(bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh ) on host(10.0.4.3): error(exit status 127))
> ```



docker 守护进程 搭载失败：

（root user and sudo user)

```bash
docker: Error response from daemon: cgroups: cgroup mountpoint does not exist: unknown.docker: Error response from daemon: cgroups: cgroup mountpoint does not exist: unknown.
---
[ERROR] [root.go:75] sealer-v0.9.0: failed to execute command(RegistryDomain="sea.hub" RegistryPort="5000" RegistryURL="sea.hub:5000" && cd /var/lib/sealer/data/my-cluster/rootfs/scripts && bash init-registry.sh 5000 /var/lib/sealer/data/my-cluster/rootfs/registry sea.hub) on host(10.160.25.43): error(exit status 1)
```



mount 挂载：

```bash
ubuntu@i-02v830ud:~$ sealer run docker.io/sealerio/kubernetes:v1.22.15 --masters 10.160.25.43
2023-02-06 14:15:06 [ERROR] [root.go:75] sealer-v0.9.0: cannot mount using driver overlay in rootless mode. You need to run it in a `buildah unshare` session
```



+ [ ] 三节点 `Kubectl` 与服务器 `localhost:8080` 连接被拒绝：

```bash
[sealer@iZuf68xky083mr0yy6q37lZ ~]$ sudo kubectl get nodes
W0208 20:11:28.049909    4138 loader.go:221] Config not found: /home/sealer/admin.conf
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```

解决：

```bash
KUBECONFIG=/etc/kubernetes/admin.conf 
cp /etc/kubernetes/admin.conf $HOME/
chown $(id -u):$(id -g) $HOME/admin.conf
```



+ [ ] 非 `sudo` 不能使用 `kubectl` ：

```bash
[sealer@iZuf68xky083mr0yy6q37lZ ~]$ kubectl get nodes 
W0208 21:02:48.870473   30557 loader.go:221] Config not found: /home/sealer/admin.conf
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```



+ [ ] sealer images

```bash
[sealer@iZuf68xky083mr0yy6q37lZ ~]$ sealer images
2023-02-09 11:09:47 [ERROR] [root.go:75] sealer-v0.9.0: unable to make rootless runtime: mkdir /run/user/0/containers: permission de
```

+ https://github.com/containers/storage/issues/1505

解决（非正常手段）：

```bash
sudo mkdir /run/user/0 ； sudo chmod 700 /run/user/0 && sudo chown $(whoami): /run/user/0
# 只需创建旧用户目录并授予您的用户使用该目录的权利
```



+ [ ] `WARN[0000] "/" is not a shared mount, this could cause issues or missing mounts with rootless containers`

解决：无根模式运行的 Buildah/Podman 期望共享绑定挂载，检查它是否设置为私有：

```bash
]$ findmnt -o PROPAGATION /
PROPAGATION
shared
```

在这种情况下，请参阅 [mount(8) §Shared subtree operations](https://man.archlinux.org/man/mount.8#Shared_subtree_operations) 并临时将挂载设置为共享：





## 🔥 Conclusion

We believe the security of managing the docker daemon needs a lot of improvement, before we can think of opening up access to non-privileged users directly. Until these fixes are made `sudo` is the best option. We’re working on better options, but for the time being we strongly recommend using `sudo`.

```bash
sealer_path=$(whereis sealer | cut -d ':' -f2)
echo $sealer_path
alias sealer='sudo $sealer_path'
```

> sealos :
>
> ```
> sealos_path=$(whereis sealos | cut -d ':' -f2) && alias sealos='sudo $sealos_path'sealos_path=$(whereis sealos | cut -d ':' -f2) && alias sealos='sudo $sealos_path'
> ```
>
> 

**故障排查（是否为Linux安装）：**

```go
package main

import (
	"bytes"
	"os/exec"
	"strings"

	"github.com/sirupsen/logrus"
)

func main() {
	out, err := exec.Command("docker", "info", "--format", "'{{.OSType}}'").Output()
	if err != nil {
		logrus.Errorf("Failed to get docker info: %v", err)
		return
	}

	ostype := strings.TrimSpace(string(bytes.Trim(out, "'")))
	if ostype == "Linux" {
		logrus.Infof("Host information: OSType=%s", ostype)
	} else {
		logrus.Errorf("Error: Unsupported OSType %s", ostype)
	}
}
```





## 🗃️ Reference

+ https://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo
+ https://projectatomic.io/blog/2015/08/why-we-dont-let-non-root-users-run-docker-in-centos-fedora-or-rhel/
+ https://docs.docker.com/engine/security/rootless/
+ https://github.com/containers/buildah/issues/3491
+ https://github.com/containers/podman/issues/2739
+ https://rootlesscontaine.rs/getting-started/common/cgroup2/ && https://rootlesscontaine.rs/
+ [非root身份运行pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)
+ [以非 root 用户身份运行 Kubernetes 节点组件](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-in-userns/)
+ [linux 用户与组 design](https://wiki.archlinux.org/title/users_and_groups)
+ [应用程序列表/安全](https://wiki.archlinuxcn.org/wiki/%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E5%88%97%E8%A1%A8/%E5%AE%89%E5%85%A8)
+ https://en.wikipedia.org/wiki/Security-Enhanced_Linux
+ [Linux 功能：通过删除 setuid 强化 Linux 二进制文件](https://linux-audit.com/linux-capabilities-hardening-linux-binaries-by-removing-setuid/)
+ [/etc/subuid 和 /etc/subgid](https://rootlesscontaine.rs/getting-started/common/subuid/)
+ [KEP-2033：Kubelet-in-UserNS（又名 Rootless 模式）](https://github.com/kubernetes/enhancements/tree/master/keps/sig-node/2033-kubelet-in-userns-aka-rootless)
+ [podman 缺点](https://github.com/containers/podman/blob/main/rootless.md)
+ [minikube 调查支持无根的要求](https://github.com/kubernetes/minikube/issues/9495)
+ [Podman故障排查](https://github.com/containers/podman/blob/main/troubleshooting.md)
+ [podman AND buildah for Ubuntu 20.04 install](https://fabianlee.org/2022/08/02/buildah-installing-buildah-and-podman-on-ubuntu-20-04/)



### Advance of right

+ **[doas](https://wiki.archlinuxcn.org/wiki/Doas)** — OpenBSD 的*doas*命令的可移植版本，与 sudo 相比以体积小得多而闻名。

+ **[pkexec(1)](https://man.archlinux.org/man/pkexec.1)** — 一个[Polkit](https://wiki.archlinuxcn.org/wiki/Polkit)应用程序，允许授权用户以另一个用户身份运行命令或交互式 shell。使用 Polkit 规则配置。

+ **[su](https://wiki.archlinuxcn.org/wiki/Su)** — 用于假定系统上另一个用户身份的命令。

+ **[sudo](https://wiki.archlinuxcn.org/wiki/Sudo)** - 委托以 root 或其他用户身份运行命令的能力的命令，同时提供审计跟踪。



[1]:  *通常允许受信任的二进制文件使用 root 权限来执行是有意义的。软件的不幸之处在于它可能包含错误。因此，即使是 setuid 二进制文件的最小错误也可能导致完全妥协。*
