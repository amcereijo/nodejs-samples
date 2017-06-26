const stream = require('stream');
const Chance = require('chance');

const chance = new Chance();

// Readable Stream implemetation
class RandomStream extends stream.Readable {
  constructor(options) {
    super(options);
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

// Using implementation
const randomStream = new RandomStream();
randomStream
  .on('readable', () => {
    let data;
    while((data = randomStream.read()) !== null) {
      console.log(`[Example] => Data received: ${data.toString()}`);
    }
  });