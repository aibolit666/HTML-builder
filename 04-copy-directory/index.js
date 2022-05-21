const fs = require('fs');
const path = require('path');

function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });

  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    files.forEach((file) => {
      fs.stat(path.join(__dirname, 'files', file), (err, stats) => {
        if (err) {
          throw err;
        }
        if (stats.isFile() === true) {
          fs.copyFile(
            path.join(__dirname, 'files', file),
            path.join(__dirname, 'files-copy', file),
            (err) => {
              if (err) {
                throw err;
              }
            }
          );
        }
      });
    });
    if (err) {
      throw err;
    }
    console.log(
      `Success!\nFiles (${files})\ncopied to ${__dirname + '\\files-copy'}`
    );
  });
}

copyDir();
