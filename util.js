var fs = require('fs');
var dir = './screenshots';

function makeDir() {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

module.exports = makeDir;