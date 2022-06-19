const fs = require("fs/promises");
const path = require("path");
const cubes = require("../db.json");


exports.save = (cube) => {

    cubes.push({id: cubes[cubes.length-1].id + 1, ...cube});

    let textData = JSON.stringify(cubes, '', 4);

   return fs.writeFile(path.resolve('db.json'), textData);

}

exports.getOne = (cubeId) => cubes[cubeId];

exports.getAll = (search = '', from = 0, to = 6) => {
    const result = cubes.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
        .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);
       /* .filter(x => !(x.difficultyLevel > to));*/

    return result;
};
