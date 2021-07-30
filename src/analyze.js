const path = require('path');
const fsPromises = require("fs").promises;

const stat = fsPromises.stat;
const readdir = fsPromises.readdir;

/**
 * @param folderPath: {String}
 * @param callback: {Function}
 */

let subFolderCount = 0;
const extensionList = [];
const fileTypesInformation = [];
const extensionNumber = {};

async function performCalculation(dir) {
    const isDirectory = (await stat(dir)).isDirectory();
    if (isDirectory) {
        return Promise.all((await readdir(dir))
            .map(entry => performCalculation(path.join(dir, entry))))
            .then(() => [subFolderCount++, extensionList])
    }

    return [subFolderCount, extensionList.push(path.extname(dir))];
}

function arrangeResult(calculationResult, err, callback) {
    if (err) callback(err);

    const [subFolders, extensions] = calculationResult;
    extensions.forEach(ext => extensionNumber[ext] = (extensionNumber[ext] || 0) + 1);
    Object.keys(extensionNumber).forEach(ext => {
        fileTypesInformation.push({fileExtension: ext, fileCount: extensionNumber[ext]});
    });

    const result = {
        totalFiles: extensions.length,
        totalSubFolders: subFolders,
        fileTypesInformation: fileTypesInformation
    }

    callback(null, result);

}

function analyze(folderPath, callback) {
    (async function () {
        try {
            await fsPromises.access(path.join(folderPath));
            performCalculation(folderPath).then((result, error) => arrangeResult(result, error, callback));

        } catch (error) {
            throw new Error(error.message);
        }
    })().catch(err => callback(err))
}

module.exports = analyze;
