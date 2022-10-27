
### !/bin/bash
 # @Description: git sync 
 # @Author: xiongxinwei 3293172751nss@gmail.com
 # @LastEditTime: 2022-10-26 18:27:35
 # @FilePath: \coded:\其他\测试文件夹\gitsync.sh
 # Copyright (c) 2022 by xiongxinwei 3293172751nss@gmail.com, All Rights Reserved. @blog: http://nsddd.top

    # 1. git add . 
    # 2. git commit -m "update" 
    # 3. git push 
    # 4. git pull

    # Linux下可以直接使用crontab -e命令来编辑定时任务，Windows下可以使用计划任务来实现定时任务的功能。
    # crontab -e
    # 0 0 * * * /bin/bash /home/xxx/gitsync.sh

    # 不推荐使用pull，因为pull会把本地的修改覆盖掉，如果本地有修改，应该先commit，然后再pull

    # windows下面没有bash，所以需要使用git-bash来执行脚本

    # wget -c -d -O agit.sh https://sm.nsddd.top/uploads/2022/10/26/2iCzooCq_gitsync.sh && sh agit.sh && chmod 777 agit.sh
 
 ### 
echo "程序将会自动帮您同步⚡ 请稍等...(The program will automatically help you synchronize ⚡ Please wait...)"
echo "脚本地址在线浏览：https://sm.nsddd.top/uploads/2022/10/26/2iCzooCq_gitsync.sh"
is_change=$(git status -s)  # 判断是否有文件改动

# 当前分支
branch=$(git symbolic-ref --short -q HEAD)

# remark
if [ -n "$1" ]; then 
    guser=$1
else
    # git.user.name
    guser="$(git config user.name) update"
fi

if [ 0 -lt ${#is_change} ]; then  # 有文件改动
    git add .
    git commit -s -m "$guser"  # -s 用于签名, -m 用于备注
    # pull
    result=$(git pull origin $branch)
    tmp=$(echo $result | grep "fix conflicts")
    if [ "$tmp" != "" ]
    then
        echo "(ノ=Д=)ノ┻━┻ 合并冲突, 请手动解决后提交"
    else
        # 推送
        git push origin $branch
    fi
    
else  # 没有文件改动
    echo "本地没有改变, 正在从远程仓库同步代码. 请耐心等待➡️➡️➡️ ...";
    result=$(git pull origin $branch)
    tmp=$(echo $result | grep "fix conflicts")
    if [[ "$tmp" != "" ]]
    then
      echo "(ノ=Д=)ノ┻━┻ 合并冲突, 请手动解决后提交"
    fi
fi