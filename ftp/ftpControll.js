const fs = require('fs');
const Client = require('ftp');
const ftpConfig = {
    host: 'ftp.sinacloud.com', // ftp服务器ip地址
    port: '10221', // ftp服务器port
    user: 'ruler', // 你的登录用户名
    password: 'slkyn2lv8k3s', // 你的密码
    //debug: console.log,
    connTimeout: 20000,
    pasvTimeout: 20000,
    keepalive: 20000
}
const upOption = {
    baseDir: '/**',
    overwrite: 'older'
}
class Ftp {
    /**
    * 处理文件路径，循环所有文件，如果是图片需要读取成Buffer类型
    **/
    handleFilePath(obj, type) {
        const { local, remote } = obj;
        const files = fs.readdirSync(local);
        let filesList = files.map(file => {
            const _lp = `${local}/${file}`;
            if(file.indexOf(type) > 0){
                return {
                    type: type,
                    file: file,
                    localPath: type !== 'img' ? _lp : fs.readFileSync(_lp),
                    remotePath: `${remote}/${file}`,
                };
            }
            return
        });
        return filesList.filter((item)=>{
            return item != undefined
        }) 
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
        sftp.connect(ftpConfig)
        return new Promise((resolve, reject) => {
            sftp.on('ready', function () {
                sftp.mkdir(`${path}`, true, function (err) {
                    if (err) {
                        console.log(`${path}生成失败`)
                        reject();
                        sftp.end();
                    } else {
                        console.log(`${path}生成成功`)
                        sftp.end();
                        resolve(path);
                    }
                })
            })
        });
    }
    /*删除目录下文件 */
    rmdirFile(path) {
        let sftp = new Client();
        sftp.connect(ftpConfig)
        return new Promise((resolve, reject) => {
            sftp.on('ready', function () {
                sftp.rmdir(`${path}`, true, function (err) {
                    if (err) {
                        console.log(`${path}删除失败`)
                        resolve(path);
                        sftp.end();
                    } else {
                        console.log(`${path}删除成功`)
                        sftp.end();
                        resolve(path);
                    }
                })
            })
        });
    }
}
module.exports = Ftp