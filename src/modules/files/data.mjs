import { release, version } from 'os';
import { sep } from 'path';
import { getPathToResource } from '../esm.mjs';

export const PORT = 3000;

export const systemData = {
    release: `Release ${release()}`, 
    version: `Version ${version()}`,
    separator: `Path segment separator is "${sep}"`,
    filePath: `Path to current file is ${getPathToResource().file}`,
    dirPath: `Path to current directory is ${getPathToResource().dir}`
}

export const serverInfo = {
    listen: `Server is listening on port ${PORT}`, 
    close: 'To terminate it, use Ctrl+C combination', 
}

export const greetings  = {
    hello: 'Hello from c.js!' 
}
