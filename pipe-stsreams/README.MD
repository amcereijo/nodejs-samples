# Pipe Streams
Like in Linux systems using

> `echo Hello Node.js | sed s/Node.js/World/g`

that allows to send the output of one command as the input to another one, we can connect streams with methdo `pipe`.

`readable.pipe(writable, [options])`

**Note**: by default, errors are not piped so we should attach `.on('error', function)` to each stream.
```
stream1
  .on('error', function)
  .pipe(stream2)
  .on('error', function)
  .pipe(stream3)
```

## [Simple streams pipe example](./simple-pipe-example.js):
  Read from a previous stream, use the duplex stream to replace data and write to a next stream
>`echo Hello World! | node simple-pipe-example.js Hello Bye`


## Libraries to piping streams:
* [through2](https://npmjs.org/package/through2)
* [from2](https://npmjs.org/package/from2)


## [Asyn controll flow sequential execution example](./pipe-async-sequential-execution.js)
  Example of control an asyncronous sequential execution flow piping streams.
  The example contacts a list o files in a destination file
>`node ./pipe-async-sequential-execution.js ./destination.txt ./file1.txt ./file2.txt`