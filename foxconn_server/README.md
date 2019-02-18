1. KOA2工程。
2. api: 所有模块内容都写在这里， 其中包括了controller, service, router。
    这里的service都要求继承/services/BasicService
3. bin: 启动文件。
4. config: 配置文件。
5. filter: 过滤器实现。
6. models: 所有的model都写在这里。
7. service: 全局性的service写在这里。
8. utils: 一些公共类。
9. 数据库使用了sequelize的orm.
10. gulp;  gulpfile.js里的参数  production--运行环境， development--开发环境
11. createAPI: 根据models文件夹里的文件，动态生成controller, service, router

####  环境配置：
- 1.`nodejs7.8+`
- 2.`sql server`数据库

#### 安装
- `npm install`
- 注意：使用`sql server`数据库，如果没有`sequelize-auto`包与`mssql`包，需要先全局安装这两个包： `npm install -g 包名`

#### 运行
- `npm run start`

#### 生成数据库表models
- `sequelize-auto -h 数据库主机名 -d 数据库库名 -u 数据库连接账号 -x 数据库连接密码 -p 数据库端口号 --dialect mssql`
- `sequelize-auto -h 172.16.4.20 -d board -u sa -x 123456 -p 1433 --dialect mssql`  终端输入此命令，将读取数据库，自动生成相应的models
- **注意**：如果更改了表结构，需要重新生成models，再次执行该命令

#### 根据models文件生成api
`npm run create`; 根据models文件夹里的文件，动态生成controller, service, router

#### 修改数据库连接信息
```
foxconn_server/
  config/
     db.js
```
- `config/db.js`中修改连接`sql server`的信息

#### 修改http连接信息以及数据库库名
```
foxconn_server/
  config/
     development.js
     production.js
```
- `config/development.js`以及`config/production.js`中修改`http`连接或者数据库库名的信息

#### 修改websocket连接信息
```
foxconn_server/
  config/
     WSConfig.js
```
- `config/WSConfig.js`中修改`websocket`连接信息

#### 启动数据mock

- `npm run mock`