const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  files.forEach((file) => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
      if (err) {
        throw err;
      }
      if (stats.isFile() === true) {
        console.log(
          file.split('.').join(' - ') + ' - ' + stats.size / 100 + 'kb'
        );
      }
    });
  });
  if (err) {
    throw err;
  }
});
