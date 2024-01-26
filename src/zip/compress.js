import { createGzip, unzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream} from 'node:fs';
import { unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const FILE_FROM_ZIP = 'fileToCompress.txt'
const FILE_TO_ZIP = 'archive.gz'

const compress = async () => {
    const pathToFile = fileURLToPath(import.meta.url);
    const pathToDir = dirname(pathToFile);
    const pathToFileNotCompress = resolve(pathToDir, 'files', FILE_FROM_ZIP)
    const pathToFileCompress = resolve(pathToDir, 'files', FILE_TO_ZIP)

    const gzip = createGzip();
    const source = createReadStream(pathToFileNotCompress);
    const destination = createWriteStream(pathToFileCompress);

    try {
      await pipeline(source, gzip, destination)
      await unlink(pathToFileNotCompress)
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
};

await compress();