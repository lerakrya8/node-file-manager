import zlib from 'node:zlib';
import fs from 'node:fs';
import {buildAbsolutePath} from '../helpers/helpers.js';
import path from 'path';

const compress = async ({secondParam, currentDirectory, newFilePath}) => {
    return new Promise((resolve, reject) => {

        const pathToNewFile = path.basename(newFilePath).split('').includes('.') ?
        newFilePath : path.join(newFilePath, path.basename(secondParam.split('.').at(0)) + '.br');

        const readStream = fs.createReadStream(buildAbsolutePath(secondParam, currentDirectory));
        const zip = zlib.createBrotliCompress();
        const writeStream = fs.createWriteStream(buildAbsolutePath(pathToNewFile, currentDirectory));

        readStream.pipe(zip).pipe(writeStream);

        writeStream.on('finish', () => {
            resolve();
        });

        writeStream.on('error', (err) => {
            reject();
            console.error('Error writing compressed file:', err);
        });
    });
};
export default compress;