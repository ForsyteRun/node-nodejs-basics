import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const ERROR_TEXT = 'FS operation failed'

const list = async () => {
    const filePath = fileURLToPath(import.meta.url)
    const dirPath = dirname(filePath)
    const pathToDir = resolve(dirPath, 'files')

    if (!existsSync(pathToDir)) {
        throw new Error(ERROR_TEXT);
    } 
   
    try {
        const files = await readdir(pathToDir)
        for (const file of files) console.log(file);
    } catch (error) {
        throw new Error(error);
    }

};

await list();