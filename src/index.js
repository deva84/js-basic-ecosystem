const rimraf = require('./rimraf');
const rename = require('./rename');

const [, , command, ...rest] = process.argv;

switch (command) {
    case 'rimraf':
        if (!process.argv.includes('--path')) throw new Error('Path argument was not provided');

        const path = process.argv[process.argv.indexOf('--path') + 1];
        rimraf(path, () => `Folder with a path ${path} has been removed`)
            .then(res => process.stdout.write(res()));
        break;

    case 'rename':
        if (!(process.argv.includes('--from') && process.argv.includes('--to')))
            throw new Error('Path argument was not provided');
        const initPath = process.argv[process.argv.indexOf('--from') + 1];
        const newPath = process.argv[process.argv.indexOf('--to') + 1];
        rename(initPath, newPath, () =>  process.stdout.write('Entry has been renamed'));
        break;

    default:
        throw new Error('Current CLI version doesn\'t support this type of command')
}




