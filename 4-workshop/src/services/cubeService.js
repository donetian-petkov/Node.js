/*const fs = require("fs/promises");
const path = require("path");*/
/*const cubes = require("../db.json");*/
const Cube = require("../models/Cube");


/*exports.save = (cube) => {

    cubes.push({id: cubes[cubes.length-1].id + 1, ...cube});

    let textData = JSON.stringify(cubes, '', 4);

   return fs.writeFile(path.resolve('db.json'), textData);

}*/

exports.create = (cube) => Cube.create(cube);

/*exports.getOne = (cubeId) => cubes[cubeId];*/

exports.getOne = async (cubeId) => await Cube.findById(cubeId).lean();

exports.getAll = async (search = '', fromInput, toInput) => {

    let cubes = await Cube.find().lean();

   /* const from = Number(fromInput) || 0
    const to = Number(toInput) || 6;

    const result = cubes.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
        .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);
       /!* .filter(x => !(x.difficultyLevel > to));*!/*/

    return cubes;
};
