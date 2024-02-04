import readline from 'readline';
import path from 'path';
import {breakLineCommandParams, checkPath, isValidOsParam, checkNewFilePath} from './src/helpers/helpers.js'
import ls from './src/ls/ls.js';
import cat from './src/cat/cat.js';
import add from './src/add/add.js';
import renameFile from './src/rename/rename.js'; 
import copy from './src/copy/copy.js';
import move from './src/move/move.js';
import remove from './src/delete/delete.js';
import cd from './src/cd/cd.js';
import up from './src/up/up.js';
import {eol, cpus, homedir, username, architecture} from './src/os/os.js';
import hash from './src/hash/hash.js';
import compress from './src/compress/compress.js';
import decompress from './src/decompress/decompress.js';

const commandMap = {
    'up': {func: up, requiredParams: ['currentDirectory']},
    'cd': {func: cd, requiredParams: ['secondParam', 'currentDirectory']},
    'ls': {func: ls, requiredParams: ['currentDirectory']},
    'cat': {func: cat, requiredParams: ['secondParam', 'currentDirectory']},
    'add': {func: add, requiredParams: ['secondParam', 'currentDirectory']},
    'rn': {func: renameFile, requiredParams: ['secondParam', 'currentDirectory', 'newFilePath']},
    'cp': {func: copy, requiredParams: ['secondParam', 'currentDirectory', 'newFilePath']},
    'mv': {func: move, requiredParams: ['secondParam', 'currentDirectory', 'newFilePath']},
    'rm': {func: remove, requiredParams: ['secondParam', 'currentDirectory']},
    'hash': {func: hash, requiredParams: ['secondParam', 'currentDirectory']},
    'compress': {func: compress, requiredParams: ['secondParam', 'currentDirectory', 'newFilePath']},
    'decompress': {func: decompress, requiredParams: ['secondParam', 'currentDirectory', 'newFilePath']},
};

const OS_PARAMS = {
    '--EOL': {func: eol},
    '--cpus': {func: cpus},
    '--homedir': {func: homedir},
    '--username': {func: username},
    '--architecture': {func: architecture},
}

const COMMANDS_TO_CHECK_SECOND_PARAM = ['cd', 'cat', 'rn', 'cp', 'mv', 'rm', 'hash', 'compress', 'decompress'];

const app = () => {
    const userName = process.argv.slice(2).at(0)?.replace('--userName=', '') || 'New Guest';

    console.log(`Welcome to the File Manage, ${userName}\n`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

     function promptUser() {
        rl.question('> ', async (command) => {

            if (command === '.exit') {
                rl.close();
                return;
            }

            await processCommand(command);
    
            promptUser();
        });
    }

    process.on('SIGINT', () => {
        console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
        rl.close();
    });

    async function processCommand(command) {
        const currentDirectory = path.resolve();

        const [commandName, secondParam, newFilePath] = breakLineCommandParams(command);

        if (commandName === 'os') {
            if (!isValidOsParam(secondParam)) {
                console.log('Invalid input');
                console.log(`\nYou are currently in ${path.resolve()}\n`);
                return;
            }

            const { func } = OS_PARAMS[secondParam];

            func();
        } 

        const commandDetails = commandMap[commandName];

        if (commandDetails) {
            const params = {secondParam: secondParam, currentDirectory: currentDirectory, newFilePath: newFilePath};

            const { func, requiredParams } = commandDetails;
            const missingParams = requiredParams.filter(param => !params[param]);

            if (missingParams.length !== 0) {
                console.log('Invalid input');
                console.log(`\nYou are currently in ${path.resolve()}\n`);
                return;
            }

            try {
                if(requiredParams.includes('newFilePath')) {
                    await checkNewFilePath(newFilePath, currentDirectory);
                }

                if(COMMANDS_TO_CHECK_SECOND_PARAM.includes(commandName) && requiredParams.includes('secondParam')) {
                    await checkPath(secondParam, currentDirectory);
                }

            } catch (err) {
                console.log('Operation failed');
                console.log(`\nYou are currently in ${path.resolve()}\n`);
                return;
            }

            try {
                await func(params); 
            } catch {
                console.log('Operation failed');
            }
        } 

        console.log(`\nYou are currently in ${path.resolve()}\n`);
    }

    promptUser();

    rl.on('close', () => {
        console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
        process.exit(0); 
    });
}

app();