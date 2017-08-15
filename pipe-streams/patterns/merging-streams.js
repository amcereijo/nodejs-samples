const fs = require('fs');

const inputFile = process.argv[2];
const inputFile2 = process.argv[3];
const outputFile = process.argv[4];

const inputStream = fs.createReadStream(inputFile);
const inputStream2 = fs.createReadStream(inputFile2);
const outStream = fs.createWriteStream(outputFile);

inputStream.pipe(outStream)
inputStream2.pipe(outStream)
