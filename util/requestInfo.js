'use strict';

const fs = require('fs');

class RequestInfo {

    static write(request) {
        let fs = require('fs');
        let fw = fs.createWriteStream("socketRequestInfo.txt");
        fw.write(request);
        fw.close();
    }
}

module.exports = RequestInfo;