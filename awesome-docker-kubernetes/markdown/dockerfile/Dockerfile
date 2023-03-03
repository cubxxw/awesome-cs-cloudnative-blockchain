FROM aloine
# 指定shell语句运行在哪个路径下
WORKDIR /app  
# 将宿主机的文件拷贝到容器app下面
COPY src/ /app
#运行的是shell语句
RUN echo 321 >> 1.txt
#一般执行CMD后就结束了，所以选择的是阻塞式脚本 
CMD tail -f 1.txt