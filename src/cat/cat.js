import fs from 'fs';
import {buildAbsolutePath} from '../helpers/helpers.js';

const cat = async ({secondParam, currentDirectory}) => {
    return new Promise((resolve, reject) => {

        const stream = fs.createReadStream(buildAbsolutePath(secondParam, currentDirectory), {encoding: 'utf8'});

        stream.on('data', (chunk) => {
            process.stdout.write(chunk);
        })

        stream.on('error', (err) => {
            reject();
            console.error('Error reading file:', err);
        });

        stream.on('end', () => {
            resolve();
        });
    })
}

export default cat;