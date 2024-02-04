import {unlink} from 'node:fs/promises';
import {buildAbsolutePath} from '../helpers/helpers.js';

const remove = async ({secondParam, currentDirectory}) => {
    await unlink(buildAbsolutePath(secondParam, currentDirectory));
};

export default remove;
