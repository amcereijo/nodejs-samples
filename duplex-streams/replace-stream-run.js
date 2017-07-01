const ReplaceStream = require('./replace-stream');

const rs = new ReplaceStream('World', 'Node.js');
let total = '';

rs.on('data', (chunk) => total += chunk.toString());
rs.on('end', () => console.log(total));

rs.write('Hello W');
rs.write('orld!');
rs.end();
