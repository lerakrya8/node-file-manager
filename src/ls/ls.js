import {readdir, stat} from 'node:fs/promises';

const ls = async({currentDirectory}) => {

    const dirFiles = await readdir(currentDirectory);

    const directories = [];
    const files = [];

    for (const file of dirFiles) {
        const stats = await stat(file);

        if (stats.isDirectory()) {
            directories.push({name: file, type: 'directory'});
        } else {
            files.push({name: file, type: 'file'})
        }
    }

    directories.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    const results = [...directories, ...files];
    console.table(results);
}

export default ls;