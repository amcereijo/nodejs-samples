// requiring the duplex stream to read and replace data
const ReplaceStream = require('../duplex-streams/replace-stream');

// create instane with the provied arguments
const replaceStream = new ReplaceStream(process.argv[2], process.argv[3])

process.stdin
.pipe(replaceStream)
.pipe(process.stdout);