import {createReadStream} from 'fs'
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const FILE_TO_READ = 'fileToRead.txt'

const read = async () => {
    const pathToFile = fileURLToPath(import.meta.url);
    const pathToDir = dirname(pathToFile);
    const fileToRead = resolve(pathToDir, 'files', FILE_TO_READ)

    try {
        const readStream = createReadStream(fileToRead)
        
        readStream.on('data', (chunk) => {
            process.stdout.write(chunk)
        })
    } catch (error) {
        throw new Error(error)
    }

};

await read();