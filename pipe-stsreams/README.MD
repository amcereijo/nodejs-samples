# Pipe Streams
Like in Linux systems using

> `echo Hello Node.js | sed s/Node.js/World/g`

that allows to send the output of one command as the input to another one, we can connect streams with methdo `pipe`.

`readable.pipe(writable, [options])`

## [simple streams pipe example](./simple-pipe-example.js):
  Read from a previous stream, use the duplex stream to replace data and write to a next stream
>`echo Hello World! | node simple-pipe-example.js Hello Bye`
