require('log-timestamp');
const http = require('http');
const fs = require('fs');
const md5 = require('md5');
const pug = require('pug');
const connect = require('connect')
const serveStatic = require('serve-static');
const stylus = require('stylus');

const hostname = '127.0.0.1';
const port = 8000;
const watchFile = 'index.pug';
const writeFile = 'index.html';

let md5Previous = null;
let fsWait = false;

fs.watch(watchFile, (event, filename) => {
  if (filename) {
    if (fsWait) return;
    fsWait = setTimeout(() => {
      fsWait = false;
    }, 100);
    const md5Current = md5(fs.readFileSync(watchFile));
    if (md5Current === md5Previous) {
      return;
    }
    md5Previous = md5Current;

    console.log(`${filename} file Changed`);
    const compiledFunction = pug.compileFile(watchFile);
    fs.writeFile(writeFile, compiledFunction(), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log(`${writeFile} was saved!`);
    });
  }
});

var serve = serveStatic(__dirname, {
  'index': ['index.html', 'index.htm']
})

connect().use(serveStatic(__dirname)).listen(8000, function(){
    console.log('Server running on 8000...');
    // console.log(`Watching for file changes on ${watchFile}`);
});
