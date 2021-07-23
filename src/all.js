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
                .then(res => {
                    const index = promises.indexOf(promise);
                    allResults[index] = res;

                    if (allResults.length === promises.length) resolve(allResults);
                })
                .catch(error => reject(error));
        });
    });
}
