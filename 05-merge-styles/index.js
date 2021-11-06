const fs = require('fs');
const path = require('path');
const pathStyles = path.join(__dirname, 'styles');
const bundleCss = path.join(__dirname, 'project-dist', 'bundle.css');


function createClearFile(dir) {
  fs.access(dir, err => {
    if (!err) {
      fs.truncate(dir, err => {
        if (err) throw err;
        console.log(`File ${path.basename(dir)} cleaned`);
      });
    } else {
      fs.writeFile(dir, '', err => {
        if (err) throw err;
        console.log(`File ${path.basename(dir)} created.`);
      });
    }
  });
}

function fillFile(src, dest) {
  createClearFile(dest);

  fs.readdir(src, (err, files) => {
    err ? console.log(err) : null;

    files.forEach(file => {
      fs.stat(path.join(src, file), (err, stat) => {
        err ? console.log(err) : null;

        if (stat.isFile() && path.parse(file).ext === '.css') {

          fs.readFile(path.join(src, file), (err, data) => {
            err ? console.log(err) : null;

            fs.appendFile(dest, data, err => {
              err ? console.log(err) : null;
            });
            console.log(`File ${path.basename(file)} copied.`);
          });
        }
      });
    });
  });
}

fillFile(pathStyles, bundleCss);