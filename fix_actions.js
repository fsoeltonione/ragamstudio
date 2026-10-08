const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('actions.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('D:/Ragam Studio/src/app');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/return\s+\{\s*error:\s*(.+?)\s*\}/g, 'throw new Error($1)');
  content = content.replace(/return\s+\{\s*success:\s*true\s*\}/g, 'return');
  fs.writeFileSync(file, content);
});
console.log('Fixed actions return types');
