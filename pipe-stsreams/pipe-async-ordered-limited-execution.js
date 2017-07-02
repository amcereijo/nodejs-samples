const fs = require('fs');
const split = require('split');
const request = require('request');
// module to allow run asyn task in order
const throughParallel = require('through2-parallel');

// function to preforms the data transformation
function transformer(url, enc, done) {
  if(!url) {
    return done();
  }

  request.head(url, (err, response) => {
    done(null, url + ' is ' + (err ? 'down' : 'up') + '\n');
  });
};

const startTime = Date.now();
// read the file with the url
fs.createReadStream(process.argv[2])
  // ensures outputing each line on a different chunk
  .pipe(split())
  .pipe(throughParallel.obj({concurrency: 2}, transformer))
  .pipe(fs.createWriteStream('urlList-results.txt')) //destination stream
  .on('finish', () => {
    console.log('All urls were checked');
    console.log(`Execution time : ${Date.now()-startTime}(ms)`);
  });