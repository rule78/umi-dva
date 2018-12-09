const fs = require('fs');
const Client = require('ftp');
const ftpConfig = {
    host: 'ftp.sinacloud.com', // ftp服务器ip地址
    port: '10221', // ftp服务器port
    user: 'ruler', // 你的登录用户名
    password: 'slkyn2lv8k3s', // 你的密码
    debug: console.log,
    connTimeout: 20000,
    pasvTimeout: 20000,
    keepalive: 20000
}
class Ftp {
    /**
    * 处理文件路径，循环所有文件，如果是图片需要读取成Buffer类型
    **/
    handleFilePath(obj, type) {
        const { local, remote } = obj;
        const files = fs.readdirSync(local);
        return files.map(file => {
            const _lp = `${local}/${file}`;
            return {
                type: type,
                file: file,
                localPath: type !== 'img' ? _lp : fs.readFileSync(_lp),
                remotePath: `${remote}/${file}`,
            };
        });
    }
    uploadFile(staticFilesPath) {
        let files = [];
        let sftp = new Client();
        sftp.connect(ftpConfig)
        Object.keys(staticFilesPath).forEach(key => {
            files = files.concat(this.handleFilePath(staticFilesPath[key], key));
        });
        const tasks = files.map(item => {
            return new Promise((resolve, reject) => {
                sftp.on('ready', function () {
                    sftp.put(item.localPath, `${item.remotePath}`, function (err) {
                        if (err) {
                            console.log(`${item.remotePath}上传失败`)
                            reject();
                        } else {
                            console.log(`${item.remotePath}上传成功`)
                            sftp.end();
                            resolve();
                        }
                    })
                })
            });
        });
        return Promise.all(tasks).then(()=>{console.log('上传成功')});
    }
    /*缺少判断是否存在*/
    mkdirFile(path) {
        let sftp = new Client();
        return new Promise((resolve, reject) => {
            sftp.on('ready', function () {
                sftp.mkdir(`${path}`, function (err) {
                    if (err) {
                        reject();
                    } else {
                        sftp.end();
                        resolve(path);
                    }
                })
            })
            sftp.connect(ftpConfig)
        });
    }
}
module.exports = Ftp