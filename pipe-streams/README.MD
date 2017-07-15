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


## [Async controll flow sequential execution example](./pipe-async-sequential-execution.js)
  Example of control an asyncronous sequential execution flow piping streams.

  The example concats a list o files in a destination file
>`node ./pipe-async-sequential-execution.js ./destination.txt ./file1.txt ./file2.txt`


## [Async controll flow unordered execution example](./pipe-async-unordered-execution.js)
  Example of control an asyncronous unordered execution flow piping streams.

  The example read a file with a list of urls and check if the url is online. It writes the result in a file called "urlList-results.txt"
>`node ./pipe-async-unordered-execution.js ./urlList.txt`

## [Async controll flow unordered parallel execution example](./pipe-async-unordered-limited-execution.js)
  Example of control an asyncronous unordered execution flow piping streams running the task in parallel.

  The example read a file with a list of urls and check if the url is online. It writes the result in a file called "urlList-results.txt".
  The example will limite the executions to only 1 at the same time.
>`node ./pipe-async-unordered-limited-execution.js ./urlList.txt`

## [Async controll flow ordered parallel execution example](./pipe-async-ordered-limited-execution.js)
  Example of control an asyncronous ordered execution flow piping streams running the task in parallel.

  The example read a file with a list of urls and check if the url is online. It writes the result in a file called "urlList-results.txt".
  For the code we are using the package [through2-parallel](https://npmjs.org/package/through2-parallel).
  The example will limite the executions to only 2 at the same time.
  The urls will be written in the same order int the result file that it was in the original one
>`node ./pipe-async-ordered-limited-execution.js ./urlList.txt`
