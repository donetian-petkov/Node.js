const fs = require('fs');
const path = require('path');

//const text = fs.readFileSync('./text.txt', { encoding: 'utf-8'});

/*
const text = fs.readFile('./text.txt', {encoding: "utf-8"}, (err,data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);
});
*/

fs.readdir('./', (err, data) => {
    if (err) {
        return;
    }

    console.log(data);
});

// another fs
const fsp = require('fs/promises');

/*fsp.mkdir('./test').then(() => {
    console.log('finished');
});*/

data="Praesent justo leo, varius tempor odio at, pharetra posuere magna. Donec in tincidunt libero. Donec elementum sem sit amet erat efficitur consequat. Nulla eu nisl sed lorem lacinia sodales. Aliquam in laoreet felis, et congue libero. Vestibulum in sapien bibendum, sagittis nibh ut, placerat justo. Curabitur pellentesque sem at dolor vestibulum, vel accumsan velit pretium. Nunc ut sapien vulputate, dignissim lectus vel, laoreet lectus. Nullam blandit justo quis malesuada vehicula. Aliquam pharetra quam ut pulvinar dapibus. Sed suscipit, urna vel bibendum pulvinar, sapien turpis pharetra erat, vitae efficitur mi velit ut elit.\n"

fsp.writeFile('./text2.txt', data, { encoding: "utf-8"})
    .then(() => console.log('Finished'))
    .catch((err) => {
        console.log(err);
    });

/*fsp.unlink('text2.txt')
    .then(() => console.log('Finishing removing!'));*/

fsp.readFile('./text.txt', {encoding: 'utf-8'})
    .then((data) => console.log(data));
