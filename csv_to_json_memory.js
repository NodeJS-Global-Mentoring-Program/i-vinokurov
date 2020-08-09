import csv from 'csvtojson';
import { promises } from 'fs';

const FROM = './csv/';
const TO = './json/';
const FILE_NAME = 'data';

const convertData = async (from, to, fileName) => {
  try {
    const data = await csv().fromFile(`${from+fileName}.csv`);
    await promises.mkdir(to, {recursive: true});
    await promises.writeFile(`${to+fileName}.json`, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e.message);
  }
};

convertData(FROM, TO, FILE_NAME).then(r => console.log(r));
