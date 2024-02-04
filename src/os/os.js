import os from 'node:os';

export const eol = () => {
    console.log(os.EOL);
}

export const cpus = () => {
    const cpus = os.cpus();
    const cpusCount = cpus.length;

    console.log(`CPUs count: ${cpusCount}`);

    const result = [];

    cpus.forEach(item => {
        const model = item.model;
        const speed = item.speed;
        const GHzSpeed = (speed / 1000).toFixed(2);

        result.push({model: model, clock_rate: GHzSpeed});
    });

    console.table(result);
}

export const homedir = () => {
    console.log(os.homedir());
}

export const username = () => {
    console.log(os.userInfo().username);
}

export const architecture = () => {
    console.log(process.arch);
}

