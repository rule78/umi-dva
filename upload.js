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
    },
};
function mkdirFile(filepath){
    var ftp = new Ftp();
    return  ftp.mkdirFile(filepath)
}
function uploadFile(files){
    var ftp = new Ftp();
    return  ftp.uploadFile(files)    
}
async function upload(){
    await mkdirFile(`/${proName}/`);
    await mkdirFile(`/${proName}/static`);
    await uploadFile(staticFilesPath);
}
console.log('正在上传...');
upload();