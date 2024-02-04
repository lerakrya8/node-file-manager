import fs from 'fs';
import {unlink} from 'node:fs/promises';
import {buildAbsolutePath} from '../helpers/helpers.js';
import path from 'path';

const move = async ({secondParam, currentDirectory, newFilePath}) => {
    return new Promise((resolve, reject) => {

        const pathToMoveFile = buildAbsolutePath(secondParam, currentDirectory);
        const fileName = path.basename(pathToMoveFile);

        const readableStream = fs.createReadStream(pathToMoveFile);

        const writableStream = fs.createWriteStream(buildAbsolutePath(path.join(newFilePath, fileName), currentDirectory));

        readableStream.pipe(writableStream);

        readableStream.on('error', (err) => {
            console.error('Error reading from source file:', err);
            reject();
        });

        writableStream.on('error', (err) => {
            console.error('Error writing to destination file:', err);
            reject();
        });

        writableStream.on('finish', async () => {
            await unlink(pathToMoveFile);
            resolve();
        });

    })}

export default move;