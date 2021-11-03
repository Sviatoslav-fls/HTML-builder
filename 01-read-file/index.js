const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const stream = new fs.ReadStream(filePath, 'utf8');
const { stdout } = require('process');

stream.on('data', content => {
  stdout.write(content);
});

// ----The second solution-------
// stream.on('readable', () => {
//   const data = stream.read();

//   if (data != null) console.log(data.trim());
// });

stream.on('error', err => {
  if (err.code == 'ENOENT') {
    console.log('File not found');
  } else {
    console.error(err);
  }
});