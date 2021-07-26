const {Readable} = require('stream');
const fs = require('fs');

function createReadableStream(filePath) {
   return new StreamFromFile(filePath)
}

class StreamFromFile extends Readable {
    constructor(filename) {
        super();
        this.filename = filename;
        this.fd = null;
    }

    _construct(callback) {
        fs.open(this.filename, (err, fd) => {
            if (err) throw new Error(err.message);
            this.fd = fd;
            callback();
        });
    }

    _read() {
        const n = 64 * 1024;
        const buf = Buffer.alloc(n);
        fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
            if (err) throw new Error(err.message)
            this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
        });
    }
}

// const test1 = createReadableStream('./test/testfile.txt');
// test1.on('data', (chunk) => {
//     console.log(chunk.toString('utf-8'))
// })


module.exports = createReadableStream;



