const fs = require('fs');
const Client = require('ftp');
const ftpConfig = {
    host: 'ftp.sinacloud.com', // ftp服务器ip地址
    port: '10221', // ftp服务器port
    user: 'ruler', // 你的登录用户名
    password: 'slkyn2lv8k3s', // 你的密码
    debug: console.log,
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
        Object.keys(staticFilesPath).forEach(key => {
            files = files.concat(this.handleFilePath(staticFilesPath[key], key));
        });
        const tasks = files.map(item => {
            var sftp = new Client();
            return new Promise((resolve, reject) => {
                sftp.on('ready', function () {
                    console.log(`${item.remotePath}---上传位置`);
                    sftp.put(item.localPath, `${item.remotePath}`, function (err) {
                        sftp.end();
                        if (err) {
                            reject();
                        } else {
                            resolve(item.remotePath);

                        }
                    })
                })
                sftp.connect(ftpConfig)
            });
        });
        return Promise.all(tasks);
    }
    /*缺少判断是否存在*/
    mkdirFile(path) {
        return new Promise((resolve, reject) => {
            var sftp = new Client();
            sftp.on('ready', function () {
                sftp.mkdir(`${path}`, function (err) {
                    sftp.end();
                    if (err) {
                        reject();
                    } else {
                        resolve(path);
                    }
                })
            })
            sftp.connect(ftpConfig)
        });
    }
}
module.exports = Ftp