const Ftp = require('./ftp/ftpControll')
const path = require('path');
const proName = 'dist'
const staticFilesPath = {
    js: {
        local: path.resolve(__dirname, './dist'),
        remote: `/${proName}`,
    },
    css: {
        local: path.resolve(__dirname, './dist'),
        remote: `/${proName}`,
    },
    img: {
        local: path.resolve(__dirname, './dist/static'),
        remote: `/${proName}/static`,
    }
};
async function upload(){
    var ftp = new Ftp();
    await ftp.mkdirFile(`/${proName}/`);
    await ftp.mkdirFile(`/${proName}/static`);
    await ftp.uploadFile(staticFilesPath);
}
 console.log('正在上传...');
 upload();