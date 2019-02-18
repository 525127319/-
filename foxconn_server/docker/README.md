1.确认DBConfig.js， WSConfig.js的配置信息正确。 

2. 在根目录，生成镜象，运行
    docker build -t imcloud_beifu:v1 .

3. 启动服务（这里有些需要小改动）
    docker-compose -f docker-compose.yml up -d



    docker stop dec7f70b2582
    docker-compose -f docker-compose.yml up -d