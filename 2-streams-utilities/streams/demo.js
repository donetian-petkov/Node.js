const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./largeFile.txt', {encoding: 'utf-8'});
const writeStream = fs.createWriteStream('./copyFile.txt', {encoding: 'utf-8'});
const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream);


/*readStream.on('data', (chunk) => {
    writeStream.write(chunk);
});

readStream.on('end', () => {
    writeStream.end();
    console.log('Finished');
});*/


/*writeStream.write('Hello World!');
writeStream.write('\n')
writeStream.write('Hello World 2');*/

writeStream.on('finish', () => console.log('File is Saved'));




