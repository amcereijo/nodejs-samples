const combine = require('multipipe');
const fs = require('fs');
const compressAndEncryptStream = require('./combined-streams-de-compress').compressAndEncrypt;

combine(
  fs.createReadStream(process.argv[3])
    .pipe(compressAndEncryptStream(process.argv[2]))
    .pipe(fs.createWriteStream(process.argv[3] + '.gz.enc'))
)
.on('error', err => {
  // cacth errors from any stream in pipeline
  console.log(err);
});