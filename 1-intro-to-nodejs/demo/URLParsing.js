const url = require('url');

let softUniURL = url.parse('https://softuni.bg/trainings/3473/angular-july-2021');

let softUniURL2 = new URL('https://softuni.bg/trainings/3473/angular-july-2021');

console.log(softUniURL);
console.log(softUniURL2);
