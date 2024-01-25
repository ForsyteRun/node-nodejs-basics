import { Transform } from 'stream'
import { pipeline } from 'stream/promises';

const transform = async () => {
    const reverse = new Transform({
        transform(chunk, encoding, callback){
            const transformedChunk = chunk.toString().split('').reverse().join('')

            callback(null, transformedChunk + '\n')
        }
    })

    pipeline(
        process.stdin,
        reverse,
        process.stdout
    )

};

await transform();