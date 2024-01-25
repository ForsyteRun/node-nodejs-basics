import { Transform } from 'stream'

const transform = async () => {
    const reverse = new Transform({
        transform(chunk, encoding, callback){
            const transformedChunk = chunk.toString().split('').reverse().join('')

            callback(null, transformedChunk + '\n')
        }
    })

    process.stdin
        .pipe(reverse)
        .pipe(process.stdout)

};

await transform();