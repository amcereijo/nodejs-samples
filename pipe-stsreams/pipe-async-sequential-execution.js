const fromArray = require('from2-array');
const through = require('through2');
const fs = require('fs');

function concatFiles(destination, files, callback) {
  const destStream = fs.createWriteStream(destination);
  // create a readable stream with the file list
  fromArray.obj(files)
        // handle each file one after another
    .pipe(through.obj((file, enc, done) => {
      const src = fs.createReadStream(file);
      src.pipe(destStream, {end: false});
      // calline done on "end", tell through that one element ends
      src.on('end', done);
    }))
    // all elements have been processed
    .on('finish', () => {
      destStream.end();
      callback();
    });
}

concatFiles(process.argv[2], process.argv.slice(3), () => {
  console.log('Files concatenated successfully');
});