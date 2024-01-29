import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { Worker, isMainThread } from 'worker_threads';
import os from 'os'

const CALC_FILE = 'worker.js'

const performCalculations = async () => {
    const CPUsCount = os.cpus().length;

    const filePath = fileURLToPath(import.meta.url)
    const dirPath = dirname(filePath)
    const pathToCalcFile = resolve(dirPath, CALC_FILE)

    
    const getData = async () => {
        if (isMainThread) {
            let threadResult = []
            for (let i = 0; i < CPUsCount; i++) {
                const threadPromises = new Promise((resolve) => {
                    const worker = new Worker(pathToCalcFile, {workerData: i + 10})
                    
                    worker.on('message', (res) => {
                        const result = {status: 'resolved', data: res}
                        resolve(result)
                    })
                    
                    worker.on('error', () => {
                        const result = {status: 'error', data: null}
                        resolve(result)
                    })
                })

                threadResult.push(threadPromises)
            }
            const result = await Promise.all(threadResult)

            console.log(result);
        }
    }
    
    getData()
};

await performCalculations();