import path from 'path';
import {stat, constants} from 'node:fs/promises';

const COMMANDS = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 'os', 'hash', 'compress', 'decompress'];
const OS_PARAMS = ['--EOL', '--cpus', '--homedir', '--username', '--architecture'];

export const buildAbsolutePath = (filepath, currentDirectory) => {
    if(!path.isAbsolute(filepath)) {
        return path.join(currentDirectory, filepath);
    }

    return filepath;
}

export const checkPath = async (filepath, currentDirectory) => {
    await stat(buildAbsolutePath(filepath, currentDirectory), constants.F_OK);
}

export const checkNewFilePath = async (filepath, currentDirectory) => {
    let pathToCheck = path.resolve(filepath, '..');

    if(!path.isAbsolute(filepath)) {
        pathToCheck = path.resolve(path.join(currentDirectory, filepath), '..');
    }

    await stat(pathToCheck, constants.F_OK);
}

export const isValidOsParam = (param) => {
    return new Set(OS_PARAMS).has(param);
}

export const isValidCommand = (command) => {
    return new Set(COMMANDS).has(command);
}

export const breakLineCommandParams = (line, requiredThirdParam = false) => {
    const arrayParams = line.split(' ').filter(item => item !== '');

    const [command, secondParam, newFilePath] = arrayParams;

    if (!isValidCommand(command)) {
        console.log('Invalid input');
    }

    if (requiredThirdParam && !newFilePath) {
        console.log('Invalid input');
    }

    return [command, secondParam, newFilePath];
}