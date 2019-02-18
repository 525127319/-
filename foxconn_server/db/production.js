/**
 * 生产环境的配置内容
 */
module.exports = {
    env: 'production', //环境名称
    port: 3306,         //服务端口号
    ip: '172.16.4.20',
    dbName: 'board', //DB name
    user: 'root',
    password: '123456',
    dialect: 'mysql'
}