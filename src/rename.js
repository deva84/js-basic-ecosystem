const fs = require('fs');

function rename (from, to, callback) {
    fs.rename(from, to, err => {
        if (err) throw new Error(err.message)
    });
    callback();
}

module.exports = rename;
