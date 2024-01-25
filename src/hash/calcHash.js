import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';

const { createHmac } = await import('node:crypto');

const calculateHash = async () => {
    const secret = 'abcdefg';

    const pathToFile = fileURLToPath(import.meta.url);
    const pathToDir = dirname(pathToFile);
    const file = resolve(pathToDir, 'fileToCalculateHashFor.txt')

    const hash = createHmac('sha256', secret)
        .update(file)
        .digest('hex');

    const readStream = Readable.from(hash)

    readStream.on('data', (chunk) => {
        console.log(chunk);
    })
};

await calculateHash();