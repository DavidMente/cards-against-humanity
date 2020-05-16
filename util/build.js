const fs = require('fs-extra');
const childProcess = require('child_process');

try {
    console.log('removing old files');
    fs.removeSync('./dist/');
    fs.copySync('./src/client/build', './dist/client/build');
    childProcess.exec('tsc --build tsconfig.prod.json');
} catch (err) {
    console.log(err);
}
