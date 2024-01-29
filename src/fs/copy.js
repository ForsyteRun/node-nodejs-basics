import { fileURLToPath } from 'node:url';
import { readdir } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'node:fs';

const FINAL_PATH_NAME = 'files_copy'
const ERROR_TEXT = 'FS operation failed'

const copy = async () => {
    const filePath = fileURLToPath(import.meta.url)
    const dirPath = dirname(filePath)
    const pathToInitDir = resolve(dirPath, 'files')
    const pathToFinalDir = resolve(dirPath, FINAL_PATH_NAME)
    
    if (!existsSync(pathToInitDir) || existsSync(pathToFinalDir)){
        throw new Error(ERROR_TEXT)
    } 
    
    try {
        const initDirData = await readdir(pathToInitDir)
        mkdirSync(pathToFinalDir)

        initDirData.forEach(file => {
            const initDir = resolve(pathToInitDir, file);
            const finalDir = resolve(pathToFinalDir, file);
            copyFileSync(initDir, finalDir)
        })
    } catch (error) {
        throw new Error(error)
    }
};

await copy();
