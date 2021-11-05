const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');


function copyFiles(src, dest) {
  fs.readdir(src, (err, data) => {
    if (err) throw err;

    data.forEach(file => {
      const route = path.join(src, file);
      fs.stat(route, (err, stat) => {
        err ? console.log(err) : null;

        if (stat.isFile()) {
          fs.copyFile(route, path.join(dest, file), err => {
            err ? console.log(err) : null;

            console.log(`Copying ${file} completed`);
          });
        } else {
          fs.mkdir(path.join(dest, file), { recursive: true }, (err) => {
            err ? console.log(err) : null;

            copyFiles(path.join(src, file), path.join(dest, file));
          });
        }
      });
    });
  });
}

function makeDir(dir) {
  fs.mkdir(dir, { recursive: true }, err => {
    if (err) throw err;

    console.log(`\nFolder ${path.parse(dir).name} created`);
    console.log(`Full path: ${dir}\n`);
  });
}

function copyDir(src, dest) {
  fs.access(dest, (err) => {
    if (!err) {
      fs.rm(dest, { recursive: true }, () => {
        makeDir(dest);
        copyFiles(src, dest);
      });
    } else {
      makeDir(dest);
      copyFiles(src, dest);
    }
  });
}

copyDir(srcDir, destDir);