const Client = require('ftp');
const fs = require('fs');

const sftp = new Client();
sftp.connect({
    host: 'ftp.sinacloud.com', // ftp服务器ip地址
    port: '10221', // ftp服务器port
    user: 'ruler', // 你的登录用户名
    password: 'slkyn2lv8k3s', // 你的密码
    debug: console.log,
})
module.exports = sftp;