import { createHash } from 'node:crypto';
import {buildAbsolutePath} from '../helpers/helpers.js';
import fs from 'fs';

const hash = async ({secondParam, currentDirectory}) => {
    return new Promise((resolve) => {

    fs.createReadStream(buildAbsolutePath(secondParam, currentDirectory))
    .pipe(createHash('sha256')
    .setEncoding('hex'))
    .on('finish', function () {
        console.log(this.read());
        resolve();
    })
})
};

export default hash;