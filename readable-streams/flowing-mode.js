process.stdin
  .on('data', (data) => {
    console.log('New data available');
    console.log(`Data read, length (${data.length}) => ${data.toString()}`);
  })
  .on('end', () => process.stdout.write('End of stream'));