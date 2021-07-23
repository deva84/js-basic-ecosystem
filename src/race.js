/**
 * @desc Implements Promise.race.
 * @param promises
 */
module.exports = function (promises) {
    return new Promise((resolve, reject) => {
        promises
            .forEach(promise => {
                promise
                    .then(result => resolve(result))
                    .catch(error => reject(error))
            });
    });
}
