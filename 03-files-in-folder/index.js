const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'secret-folder');

function getFilesFromDirectory(dir) {
  fs.readdir(dir, (err, data) => {
    err ? console.log(err) : null;

    data.forEach(file => {
      const route = path.join(dir, file);

      fs.stat(route, (err, stats) => {
        err ? console.log(err) : null;

        if (stats.isFile()) {
          const name = path.parse(file).name;
          const extname = path.extname(file).slice(1);
          const size = (stats.size / 1024) + 'kb';

          console.log(`${name} - ${extname} - ${size}`);
        }
      });
    });
  });
}
getFilesFromDirectory(filePath);