import path from 'path';

const up = ({currentDirectory}) => {
    const parentDirectory = path.resolve(currentDirectory, '..');

    if (parentDirectory !== currentDirectory) {
        process.chdir(parentDirectory);
    }
}

export default up;