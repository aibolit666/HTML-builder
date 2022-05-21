const fs = require('fs');
const path = require('path');

const readTemplate = path.join(__dirname, 'template.html');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
});

let readFile;
let temp;
let templateString;

const makeIndexHtml = path.join(__dirname, 'project-dist', 'index.html');

const readComponents = path.join(__dirname, 'components');

const readStream = fs.createReadStream(readTemplate);

// Concat html components to project-dist/index.html

fs.readdir(readComponents, (err, files) => {
  readStream.on('data', (chunk) => {
    files.forEach((file) => {
      readFile = fs.createReadStream(path.join(__dirname, 'components', file));
      readFile.on('data', (fileContent) => {
        fs.stat(path.join(__dirname, 'components', file), (err, stats) => {
          if (err) {
            throw err;
          }
          if (stats.isFile() === true && path.extname(file) === '.html') {
            templateString = path.basename(file).split('.')[0];

            temp = chunk
              .toString()
              .split(`{{${templateString}}}`)
              .join(fileContent.toString());
            chunk = temp;

            fs.writeFile(makeIndexHtml, chunk.toString(), (err) => {
              if (err) {
                throw err;
              }
            });
          }
        });
      });
    });
    if (err) {
      throw err;
    }
  });
});

// Concat css styles to project-dist/style.css

const fromDirectory = path.join(__dirname, 'styles');

const toDirectory = path.join(__dirname, 'project-dist', 'style.css');

fs.open(toDirectory, 'w', (err) => {
  if (err) {
    throw err;
  }
});

fs.readdir(fromDirectory, (err, files) => {
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
          fs.appendFile(toDirectory, chunk.toString(), (err) => {
            if (err) {
              throw err;
            }
          });
        });
      }
    });
  });
  if (err) {
    throw err;
  }
});

// Copy assets path to project-dist/assets/

function copyDirectory() {
  const copyDir = path.join(__dirname, 'assets');

  fs.mkdir(
    path.join(__dirname, 'project-dist/assets'),
    { recursive: true },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  fs.readdir(copyDir, (err, files) => {
    files.forEach((file) => {
      fs.stat(path.join(__dirname, 'assets', file), (err, stats) => {
        if (err) {
          throw err;
        }
        if (stats.isDirectory() === true) {
          fs.mkdir(
            path.join(__dirname, `project-dist/assets/${file}`),
            { recursive: true },
            (err) => {
              if (err) {
                throw err;
              }
            }
          );

          fs.readdir(path.join(__dirname, 'assets', file), (err, newfiles) => {
            if (err) {
              throw err;
            }
            newfiles.forEach((newfile) => {
              fs.copyFile(
                path.join(__dirname, 'assets', file, newfile),
                path.join(__dirname, 'project-dist', 'assets', file, newfile),
                (err) => {
                  if (err) {
                    throw err;
                  }
                }
              );
            });
          });
        }
      });
    });
    if (err) {
      throw err;
    }
  });
}
copyDirectory();
