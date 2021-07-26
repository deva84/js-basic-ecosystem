const { Readable } = require('stream');

/**
 * @desc Makes a stream from an array of data.
 * @param array (any[]) - Array of data.
 * @return Readable - that emits every element of the array from left to right. Emits null when all elements
 * were pushed.
 */
module.exports = (array) => {
    return new FromArray(array);
}

class FromArray extends Readable {
    constructor(array) {
        super({objectMode: true});
        this.array = array;
        this.index = 0;
    }

    _read() {
        if (this.index < this.array.length) {
            const chunk = this.array[this.index];
            this.push(chunk);
            this.index += 1;
        } else {
            this.push(null);
        }

    }
}
