const fs = require('fs');
const path = require('path');

fs.open(path.join(__dirname, 'project-dist', 'bundle.css'), 'w', (err) => {
  if (err) {
    throw err;
  }
});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  files.forEach((file) => {
    fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
      if (err) {
        throw err;
      }
      if (stats.isFile() === true && path.extname(file) === '.css') {
        const readStream = fs.createReadStream(
          path.join(__dirname, 'styles', file)
        );

        readStream.on('data', (chunk) => {
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
            chunk.toString(),
            (err) => {
              if (err) {
                throw err;
              }
            }
          );
        });
      }
    });
  });
  if (err) {
    throw err;
  }
});
