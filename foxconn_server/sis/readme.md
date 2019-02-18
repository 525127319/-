1. 自行安装docker&docker-compose
2. 停容器&删容器
   docker ps -a | grep "imcloud_beifu" | awk '{print $1 }'|xargs docker stop
   docker ps -a | grep "imcloud_beifu" | awk '{print $1 }'|xargs docker rm
3. 配置数据库联接
   把db目录copy到/opt/下，并根据需要修改地址，密码，端口
4. 启动服务
   docker-compose -f docker-compose.yml up -d
   docker-compose -f docker-compose-mock.yml up -d

