import child_process from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const CHILD_PROCESS_FILE = 'script.js'

const spawnChildProcess = async (args) => {
    const filePath = fileURLToPath(import.meta.url)
    const dirPath = dirname(filePath)
    const PathToChildProcessFile = resolve(dirPath,'files', CHILD_PROCESS_FILE)

    const child = child_process.fork(PathToChildProcessFile, args)

    child.on('message', (message) => {
        process.stdout.write(`Received from child process: ${message}\n`)
    });

    process.stdin.on('data', (data) => {
        child.send(data.toString());
    });


};

// Put your arguments in function call to test this functionality
spawnChildProcess( [1, 3, 5, 5]);
