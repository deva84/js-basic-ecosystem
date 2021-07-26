const {Transform} = require('stream');

/**
 * @param modify (Function) - Callback function that is applied to every element of received data.
 * @return Transform stream that emits a data it receives with modify callback applied to the data.
 */

function map(modify) {
    return new ModifyStream(modify)
}

module.exports = map;

class ModifyStream extends Transform {
    constructor(cb) {
        super({objectMode: true});
        this.cb = cb;
    }

    _transform(chunk, encoding, callback) {
        if ({}.toString.call(chunk) !== '[object Function]') {
            let result = this.cb(chunk);
            this.push(result)
        }
        callback();
    }
}

// const stream = map((value) => value * 2);
// stream.on('data', (value) => {
//     console.log(value);
// });
// stream.write(4);
// stream.write(5);