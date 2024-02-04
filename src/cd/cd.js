import {buildAbsolutePath} from '../helpers/helpers.js';

const cd = ({secondParam, currentDirectory}) => {
    process.chdir(buildAbsolutePath(secondParam, currentDirectory));
}

export default cd;