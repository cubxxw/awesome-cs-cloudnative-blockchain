FROM base_image
# Set the working directory for subsequent instructions
WORKDIR /usr/src/app  
# 将宿主机的文件拷贝到容器app下面
COPY . /usr/src/app
#运行的是shell语句

# Run the tail command to follow changes in the 1.txt file
CMD tail -f 1.txt