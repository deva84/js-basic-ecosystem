const { stringEraser } = require('../dist/stringEraser');
const { expect } = require('chai');

describe("#stringEraser", () => {
    it('should remove substring from string', () => {
        const result = stringEraser('some test string', 'test ');
        expect(result).to.be.equal('some string');
    });

    it('should return exception when passing invalid argument', () => {
        const result = stringEraser(23455, 'gdhdjd');
        expect(result).to.be.equal('Only string type is supported!')
    });

    it('should return empty string', () => {
        const result = stringEraser('', 'string');
        expect(result).to.be.equal('');
    });
});
