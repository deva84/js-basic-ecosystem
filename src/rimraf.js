const fsPromises = require('fs').promises;
const path = require('path');

const readdir = fsPromises.readdir
const rmdir = fsPromises.rmdir
const unlink = fsPromises.unlink

module.exports = async function rimraf(pathName, callback) {
    const dir = path.join(pathName);
    if (path.extname(dir)) {
        await unlink(dir);
    } else {
        let items = await readdir(pathName, {withFileTypes: true});
        await Promise.all(items.map(item => {
            let fullPath = path.join(pathName, item.name);
            return item.isDirectory() ? rimraf(fullPath) : unlink(fullPath);
        }));
        await rmdir(pathName);
    }
    return callback;
};

