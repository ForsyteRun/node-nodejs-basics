import {dirname, join, resolve} from 'path';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';
import { PORT, greetings, serverInfo, systemData } from './files/data.mjs';
import getJSONData from './files/getJSONData.mjs'

export function getPathToResource(){
    const pathToFile = fileURLToPath(import.meta.url);
    const pathToDir = dirname(pathToFile);
    return {
       'dir': pathToDir,
       'file': pathToFile
    }
}

const getPath = (value) => {
    const pathToDir = getPathToResource().dir
    const path = resolve(join(pathToDir, 'files'), value)
    return path
}

const fetchData = async () => {
    const random = Math.random();

    try {
        const path = random > 0.5 ? getPath('a.json') : getPath('b.json')
        return await getJSONData(path);
    } catch (error) {
        throw new Error(error);
    }
};

const logData = (obj) => {
    Object.values(obj).forEach(el => console.log(el))
}

logData(greetings)
logData(systemData)

export const server = createServerHttp((_, res) => {
    res.end('Request accepted');
});

export const response = await fetchData()
console.log(response);

server.listen(PORT, () => {
    logData(serverInfo)
});
