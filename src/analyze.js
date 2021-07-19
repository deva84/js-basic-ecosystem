const path = require('path');
const {access, constants} = require('fs');
const fsPromises = require("fs").promises;

const stat = fsPromises.stat;
const readdir = fsPromises.readdir;

/**
 * @param folderPath: {String}
 * @param callback: {Function}
 */

function analyze(folderPath, callback) {
    let subFolderCount = 0;
    let extensionList = [];

    (async function () {
            try {
                await fsPromises.access(path.join(folderPath));
            } catch (error) {
                throw new Error(error.message);
            }
        }
    )()
    // access(path.join(folderPath),  constants.F_OK, (err) => {
    //     if (err) throw new Error(`Such directory doesn't exist`);
    // });

    const performCalculation = async (dir) =>
        (await stat(dir)).isDirectory()
            ? Promise.all((await readdir(dir))
                .map(entry => performCalculation(path.join(dir, entry))))
                .then
                (() =>
                    [subFolderCount++, extensionList]
                )
            : [subFolderCount, extensionList.push(path.extname(dir))];

    performCalculation(folderPath).then(([subFolders, extensions], err) => {
        const extensionNumber = {};
        const fileTypesInformation = [];

        if (err) {
            callback(err);
        } else {
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
    });
}

module.exports = analyze;

//analyze('././folderForTest2', f => f)