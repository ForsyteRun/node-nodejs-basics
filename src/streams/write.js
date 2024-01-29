import { createWriteStream } from 'fs'
import { dirname, resolve } from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

const FILE_TO_WRITE = 'fileToWrite.txt'

const write = async () => {
    const pathToFile = fileURLToPath(import.meta.url);
    const pathToDir = dirname(pathToFile);
    const fileToRead = resolve(pathToDir, 'files', FILE_TO_WRITE)

    try {
        const writeStream = createWriteStream(fileToRead)

        process.stdin.pipe(writeStream)
            
        writeStream.on("data", data => {
            data = data.toString()
            writeStream.write(data + "\n")
        })
        
    } catch (error) {
        throw new Error(error)
    }
};

await write();