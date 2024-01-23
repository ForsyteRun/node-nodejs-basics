import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';

const INIT_FILE_NAME = 'wrongFilename.txt'
const NEW_FILE_NAME = 'properFilename.md'
const ERROR_TEXT = 'FS operation failed'

const rename = async () => {
    const filePath = fileURLToPath(import.meta.url);
    const dirPath = dirname(filePath);
    const pathToInitFile = resolve(dirPath, 'files', INIT_FILE_NAME)
    const pathToFinalFile = resolve(dirPath, 'files', NEW_FILE_NAME)

    if (!existsSync(pathToInitFile) || existsSync(pathToFinalFile)) {
        throw new Error(ERROR_TEXT)
    } 

    try {
        await fs.rename(pathToInitFile, pathToFinalFile)
    } catch (error) {
        throw new Error(error)
    }
};

await rename();