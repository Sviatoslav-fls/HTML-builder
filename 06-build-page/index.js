const fs = require('fs');
const path = require('path');
const destDir = path.join(__dirname, 'project-dist');
const pathStyles = path.join(__dirname, 'styles');
const styleCss = path.join(__dirname, 'project-dist', 'style.css');
const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
const assets = path.join(__dirname, 'assets');
const destAssets = path.join(__dirname, 'project-dist', 'assets');


function createDir(dir) {
  fs.mkdir(dir, { recursive: true }, err => {
    if (err) throw err;

    console.log(`\nFolder ${path.parse(dir).name} created`);
    console.log(`Full path: ${dir}\n`);
  });
}

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

function copyCss(src, dest) {
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

function copyHtml(template, components) {
  fs.readFile(template, 'utf8', (err, sample) => {
    err ? console.log(err) : null;

    fs.readdir(components, (err, data) => {
      err ? console.log(err) : null;

      // data.forEach(file => {
      for (const file of data) {
        if (path.extname(file) == '.html') {

          fs.readFile(path.join(components, file), 'utf8', (err, data) => {
            err ? console.log(err) : null;

            const name = path.parse(file).name;
            const tag = new RegExp(`{{${name}}}`);

            sample = sample.replace(tag, data);
            fs.writeFile(path.join(destDir, 'index.html'), sample, 'utf-8', (err) => {
              err ? console.log(err) : null;
            });
          });
        }
        // });
      }
    });
  });
}

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

function copyDir(src, dest) {
  fs.access(dest, (err) => {
    if (!err) {
      fs.rm(dest, { recursive: true }, () => {
        createDir(dest);
        copyFiles(src, dest);
      });
    } else {
      createDir(dest);
      copyFiles(src, dest);
    }
  });
}

async function buildPage(dir) {
  createDir(dir);
  copyHtml(template, components);
  copyCss(pathStyles, styleCss);
  copyDir(assets, destAssets);
}
buildPage(destDir);