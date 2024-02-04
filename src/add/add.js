import {writeFile} from 'node:fs/promises';
import {buildAbsolutePath} from '../helpers/helpers.js';

const add = async ({secondParam, currentDirectory}) => {

    await writeFile(buildAbsolutePath(secondParam, currentDirectory), '');
}

export default add;