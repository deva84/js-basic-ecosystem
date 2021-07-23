/**
 * @desc Implements Promise.all.
 * @param promises
 */
module.exports = function (promises) {
    return new Promise((resolve, reject) => {
        let allResults = [];

        promises.map(promise => {
            Promise
                .resolve(promise)
                .then(result => {
                    const index = promises.indexOf(promise);
                    allResults[index] = result;

                    if (allResults.length === promises.length) resolve(allResults);
                })
                .catch(error => reject(error));
        });
    });
}
