# Piping patterns
Patterns related to piping patterns

## [Combined Streams](./combined-streams.js)
We combine multiple soure strems to look like one from the outside.
A combined stream is usually a Duplex stream, which is built by connecting the first stream to its Writable side and the last stream to its Readable side.

>`node combined-streams mypass ./example.txt`
