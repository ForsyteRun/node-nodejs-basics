import { readFile } from 'fs/promises';
import { resolve } from 'path';

const getJSONData = async (path) => {
  const pathToJSON = resolve(path);
  const data = await readFile(pathToJSON, 'utf-8');
  return JSON.parse(data);
};

export default getJSONData
