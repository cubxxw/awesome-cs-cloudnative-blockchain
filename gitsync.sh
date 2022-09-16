# 本地文件是否发生了改变
###
 # @Description: git自动推动脚本
 # @Author: xiongxinwei 3293172751nss@gmail.com
 # @Date: 2022-09-16 21:45:30
 # @LastEditTime: 2022-09-16 21:46:15
 # @FilePath: \undefinedc:\Users\smile\Desktop\其他\测试文件夹\gitsync.sh
 # @blog: https://nsddd.top
### 
is_change=$(git status -s)

# 当前分支
branch=$(git symbolic-ref --short -q HEAD)

# remark
if [ -n "$1" ]; then 
    guser=$1
else
    # git.user.name
    guser="$(git config user.name) update"
fi

if [ 0 -lt ${#is_change} ]; then
    git add .
    git commit -m "$guser"
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
    
else
    echo "本地没有改变, 正在从远程仓库同步代码. 请耐心等待 ╭(●｀∀´●)╯╰(●’◡’●)╮";
    result=$(git pull origin $branch)
    tmp=$(echo $result | grep "fix conflicts")
    if [[ "$tmp" != "" ]]
    then
      echo "(ノ=Д=)ノ┻━┻ 合并冲突, 请手动解决后提交"
    fi
fi