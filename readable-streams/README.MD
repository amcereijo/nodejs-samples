# Stream readable

## [non-flowing-mode](./non-flowing-mode.js):
The default pattern for reading from a Readable stream consists of attaching a listener for the readable event that signals the availability of new data to read. Then, in a loop, we read all the data until the internal buffer is emptied. This can be done using the read() method, which synchronously reads from the internal buffer and returns a Buffer or String object representing the chunk of data. The read() method has the following signature:

>`eadable.read([size])`

Using this approach, the data is explicitly pulled from the stream on demand.

>`node ./non-flowing-mode.js`

>`echo HELLO NODE.js | node ./non-flowing-mode.js`

## [flowing-mode](./flowing-mode.js):
The data is not pulled using read(), but instead it's pushed to the data listener as soon as it arrive.
Flowing mode is an inheritance of the old version of the stream interface (also known as Streams1), and offers less flexibility to control the flow of data. With the introduction of the Streams2 interface, flowing mode is not the default working mode; to enable it, it's necessary to attach a listener to the data event or explicitly invoke the resume() method.

>`node ./flowing-mode.js`

## [Implemtation example](./random-stream-read.js):
Example for a read stream implemtation

>`node ./random-stream-read.js`