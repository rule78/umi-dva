const Ftp = require('./ftp/ftpControll')
const path = require('path');
const fs = require('fs');
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
console.log('正在上传...');
var ftp = new Ftp();
ftp.mkdirFile(`/${proName}/static`)
    .then((path) => {
        console.log(`${path}生成成功`);
    })
    .catch()
ftp.uploadFile(staticFilesPath)    
    .then(() => {
    console.log(`全部上传成功`);
    })
    .catch()
