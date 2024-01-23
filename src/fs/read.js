import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const FINAL_PATH_NAME = 'fileToRead.txt'
const ERROR_TEXT = 'FS operation failed'

const read = async () => {
    const filePath = fileURLToPath(import.meta.url)
    const dirPath = dirname(filePath)
    const pathToDir = resolve(dirPath, 'files', FINAL_PATH_NAME)

    if (!existsSync(pathToDir)){
        throw new Error(ERROR_TEXT)
    } 

    try {
        const data = await readFile(pathToDir, {encoding: 'utf-8'})
        console.log(data);
    } catch (error) {
        throw new Error(error)
    }

};

await read();