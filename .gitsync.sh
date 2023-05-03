
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

    # Linux下可以直接使用crontab -e命令来编辑定时任务,Windows下可以使用计划任务来实现定时任务的功能。
    # crontab -e
    # 0 0 * * * /bin/bash /home/xxx/gitsync.sh

    # 不推荐使用pull,因为pull会把本地的修改覆盖掉,如果本地有修改,应该先commit,然后再pull

    # windows下面没有bash,所以需要使用git-bash来执行脚本

    # 脚本代码在线浏览
    # http://xxw.nsddd.top/code?p=%2Fgitsync.sh&id=AN16H9

    # Linux一键下载
    # wget -c -d -O gitsync.sh https://sm.nsddd.top/uploads/2022/10/27/Y0iHb6ix_gitsync.sh?attname=gitsync.sh && echo "gitsync.sh" >> .gitignore && sh gitsync.sh && chmod 777 gitsync.sh \

 
 ### 


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
    echo "监测到程序改动,程序将会自动帮您同步⚡ 请稍等...(The program will automatically help you synchronize ⚡ Please wait...)"
    echo " "
    echo "Myblog: http://nsddd.top"
    echo
    echo "脚本地址在线浏览🧷: https://sm.nsddd.top/uploads/2022/10/26/2iCzooCq_gitsync.sh"

    is_change=$(git status -s)  # 判断是否有文件改动

    # 输出git信息
    git status && git remote -v && git branch -a

echo "是否选择提交类型(默认选择yes)？(Y/N)"
    # 输入  
    read -p "=> " choice
    # 判断
    if [ $choice == "n" ] || [ $choice == "N" ]; then
        echo "您选择了不输入提交类型,这将会省略commit的<类型>参数"
    else
        echo "⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️"
        echo "1: feat: 新功能(feature)"
        echo "2: fix: 修补bug"
        echo "3: docs: 文档(documentation)"
        echo "4: style:  格式(不影响代码运行的变动)"
        echo "5: refactor: 重构(即不是新增功能,也不是修改bug的代码变动)"
        echo "6: test: 增加测试"
        echo "7: chore: 构建过程或辅助工具的变动"
        echo "8: revert: 回滚"
        echo "9: perf: 性能优化"
        echo "⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️"

        feat="feat"
        fix="fix"
        docs="docs"
        style="style"
        refactor="refactor"
        test="test"
        chore="chore"
        revert="revert"
        perf="perf"

        echo "请输入提交类型(前面的序号): "
        read -p "=> " type

        echo "请输入对应的说明"
        read -p "=> " desc
        if [ $type == "1" ]; then
            type=feat
            type2=$feat
        elif [ $type == "2" ]; then
            type=fix
            type2=$fix
        elif [ $type == "3" ]; then
            type=docs
            type2=$docs
        elif [ $type == "4" ]; then
            type=style
            type2=$style
        elif [ $type == "5" ]; then
            type=refactor
            type2=$refactor
        elif [ $type == "6" ]; then
            type=test
            type2=$test
        elif [ $type == "7" ]; then
            type=chore
            type2=$chore
        elif [ $type == "8" ]; then
            type=revert
            type2=$revert
        elif [ $type == "9" ]; then
            type=perf
            type2=$perf
        else
            echo "输入错误,将会使用默认提交类型"
            type=feat
            type=$feat
        fi
        echo "<$type>您输入的提交类型为 💡$type2  对应的说明为 💡$desc"
    fi

    git add .
    git commit -s -m "$type($desc): $guser"  # -s 用于签名, -m 用于备注
    # pull
    result=$(git pull origin $branch)
    tmp=$(echo $result | grep "fix conflicts")
    if [ "$tmp" != "" ]
    then
        echo "(ノ=Д=)ノ┻━┻ 合并冲突, 请手动解决后提交"
    else
        # 推送并且保证推送成功
        git push origin $branch
    fi

    # 判断推动是否成功
    if [ $? -eq 0 ]; then  
        echo "⚠️ 推送成功"
    else
        echo "⚠️ 推送失败"
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

# 打印一条log日志
git log -q -1 --use-mailmap --source   --mailmap   # -q 用于简化输出, -1 用于显示最近1条, --use-mailmap 用于显示作者名, --source 用于显示提交类型, --mailmap 用于显示作者邮箱
