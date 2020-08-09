import csv from 'csvtojson';
import { createReadStream, createWriteStream } from 'fs';

const FROM = './csv/';
const TO = './json/';
const FILE_NAME = 'data';

const convertData = async (from, to, fileName) => {
  try {
    const readable = createReadStream(`${from+fileName}.csv`);
    const writeable = createWriteStream(`${to+fileName}.json`);
    await readable.pipe(csv()).pipe(writeable);
  } catch (e) {
    console.error(e.message);
  }
}

convertData(FROM, TO, FILE_NAME).then(r => console.log(r));