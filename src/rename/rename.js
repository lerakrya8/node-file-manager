import {rename} from 'node:fs/promises';
import path from 'path';
import {buildAbsolutePath} from '../helpers/helpers.js';

const renameFile = async ({secondParam, currentDirectory, newFilePath}) => {
    const createFilePath = buildAbsolutePath(secondParam, currentDirectory);

    const newPath = path.join(path.resolve(createFilePath, '..'), newFilePath);

    await rename(createFilePath, newPath);
}

export default renameFile;