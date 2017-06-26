// Example of readable stream in non-flowing mode
process.stdin.on('readable', () => {
  let data;
  console.log('New data available');
  while((data = process.stdin.read()) !== null) {
    console.log(`Data read, length (${data.length}) => ${data.toString()}`);
  }
})
.on('end', () => process.stdout.write('End of stream'));