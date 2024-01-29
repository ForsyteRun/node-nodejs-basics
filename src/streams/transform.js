import { Transform } from 'stream'
import { pipeline } from 'stream/promises';

const transform = async () => {
    const reverse = new Transform({
        transform(chunk, encoding, callback){
            const transformedChunk = chunk.toString().split('').reverse().join('')

            callback(null, transformedChunk + '\n')
        }
    })

    try {
       await pipeline(
            process.stdin,
            reverse,
            process.stdout
        )
    } catch (error) {
        throw new Error(error)
    }


};

await transform();