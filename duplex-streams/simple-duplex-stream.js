const stream = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const Chance = require('chance');

const chance = new Chance();

class SimpleDuplexStream extends stream.Duplex {
  constructor() {
    super({objectMode: true});
  }
  _write (chunk, encoding, callback) {
    mkdirp(path.dirname(chunk.path), err => {
      if (err) {
        return callback(err);
      }
      fs.writeFile(chunk.path, chunk.content, chunk.options, callback);
    });
  }

  _read(size) {
    const data = chance.string();
    console.log(`[RandomStream] => Pushing data of size: ${data.length}`);
    this.push(data, 'utf8');
    if(chance.bool({likelihood: 5})) {
      this.push(null);
    }
  }
}

const duplex = new SimpleDuplexStream();

// Using implementation
duplex
  .on('readable', () => {
    let data;
    while((data = duplex.read()) !== null) {
      duplex.write({
        path: "simmple-duplex-stream.txt",
        content: `[Example] => Data received: ${data.toString()}\n`,
        options:{flag: 'a'}
      });
    }

    duplex.end(() => console.log("All files created"));
  })