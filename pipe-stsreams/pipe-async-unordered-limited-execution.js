const stream = require('stream');

class LimitedParallelStream extends stream.Transform {
  constructor(concurrency, userTransform) {
    super({objectMode: true});
    // number of councurrent element to run
    this.concurrency = concurrency;
    this.userTransform = userTransform;
    // to keep the current numbe of task running
    this.running = 0;

    // to save the "end" function to call
    this.terminateCallback = null;

    // to save the function to call when there is free space to run other element
    this.continueCallback = null;
  }

  _transform(chunk, enc, done) {
    //save the number of running process
    this.running++;
    // preforms data transformation(data, encoding, "push" func to write the data, "end" function to call)

    const pushFunction = this.push.bind(this);
    const endFunction = this._onComplete.bind(this);
    this.userTransform(chunk, enc, pushFunction, endFunction);

    console.log('Runnning chunk ', chunk);
    if(this.running < this.concurrency) {
      done();
    } else {
      this.continueCallback = done;
    }
  }

  _flush(done) {
    // if there are running process, save the function to be called later
    if(this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }

  _onComplete(err) {
    // remove elements from number of running elements
    this.running--;

    if(err) {
      return this.emit('error', err);
    }

    // of there is a "continue" function, call it
    const tmpCallback = this.continueCallback;
    this.continueCallback = null;
    tmpCallback && tmpCallback();

    // when no running elements call the saved "end" function
    if(this.running === 0) {
      this.terminateCallback && this.terminateCallback();
    }
  }
}


// ** Example: a status url monitoring **

const fs = require('fs');
// Transform stream
const split = require('split');
const request = require('request');

// function to preforms the data transformation
function transformer(url, enc, push, done) {
  if(!url) {
    return done();
  }

  request.head(url, (err, response) => {
    push(url + ' is ' + (err ? 'down' : 'up') + '\n');
    done();
  });
};
const concurrency = 1;

const startTime = Date.now();
// read the file with the url
fs.createReadStream(process.argv[2])
  // ensures outputing each line on a different chunk
  .pipe(split())
  .pipe(new LimitedParallelStream(concurrency, transformer))
  .pipe(fs.createWriteStream('urlList-results.txt')) //destination stream
  .on('finish', () => {
    console.log('All urls were checked')
    console.log(`Execution time : ${Date.now()-startTime}(ms)`);
  });
