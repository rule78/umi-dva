const sftp = require('./ftpConnect');
const fs = require('fs');
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
            return new Promise((resolve, reject) => {
                sftp.on('ready', function () {
                    console.log(`${item.remotePath}---上传位置`);
                    sftp.put(item.localPath, `${item.remotePath}`, function (err) {
                        sftp.end();
                        if (err) {
                            console.log(`${item.file}上传失败`);
                            return reject(err);
                        } else {
                            console.log(`${item.file}上传完成`);
                            resolve();
                        }
                    })
                })
            });
        });
        return Promise.all(tasks);
    }
    /*缺少判断是否存在*/
    mkdirFile(path) {
        return new Promise((resolve, reject) => {
            sftp.on('ready', function () {
                sftp.mkdir(`${path}`, function (err) {
                    sftp.end();
                    if (err) {
                        console.log(`${path}成功失败`);
                        return reject(err);
                    } else {
                        console.log(`${path}成功生成`);
                        resolve(path);
                    }
                })
            })
        });
    }
}
module.exports = Ftp