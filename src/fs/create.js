import { dirname, resolve } from 'path';
import {  writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url'

const FILE_NAME = 'fresh.txt'
const FILE_TEXT = 'I am fresh and young'
const ERROR_TEXT = 'FS operation failed'

const create = async () => {
    const filePath = fileURLToPath(import.meta.url);
    const dirPath = dirname(filePath);
    const pathToFile = resolve(dirPath, 'files', FILE_NAME)

    if (existsSync(pathToFile)) {
        throw new Error(ERROR_TEXT);
    } 

    try {
        await writeFile(pathToFile, FILE_TEXT);
    } catch (error) {
        throw new Error(error)
    }
};

await create();