import { createReadStream, createWriteStream } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { createGunzip } from 'node:zlib';

const FILE_FROM_ZIP = 'archive.gz'
const FILE_TO_ZIP = 'fileToCompress.txt'

const decompress = async () => {
    const pathToFile = fileURLToPath(import.meta.url);
    const pathToDir = dirname(pathToFile);
    const pathFileCompress = resolve(pathToDir, 'files', FILE_FROM_ZIP)
    const pathFileNoTCompress = resolve(pathToDir, 'files', FILE_TO_ZIP)

    const gunZip = createGunzip();
    const source = createReadStream(pathFileCompress);
    const destination = createWriteStream(pathFileNoTCompress);

    try {
      await pipeline(source, gunZip, destination)
      await unlink(pathFileCompress)
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
};

await decompress();