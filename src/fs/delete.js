import { unlink } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const FILE_TO_REMOVE = 'fileToRemove.txt'
const ERROR_TEXT = 'FS operation failed'

const remove = async () => {
    const filePath = fileURLToPath(import.meta.url)
    const dirPath = dirname(filePath)
    const pathToTargetFile = resolve(dirPath, 'files', FILE_TO_REMOVE)

    if (!existsSync(pathToTargetFile)) {
        throw new Error(ERROR_TEXT)
    }

    try {
        await unlink(pathToTargetFile)
    } catch (error) {
        throw new Error(error)
    }
};

await remove();