/*const fs = require("fs/promises");
const path = require("path");*/
/*const cubes = require("../db.json");*/
const Cube = require("../models/Cube");
const Accessory = require("../models/Accessory");


/*exports.save = (cube) => {

    cubes.push({id: cubes[cubes.length-1].id + 1, ...cube});

    let textData = JSON.stringify(cubes, '', 4);

   return fs.writeFile(path.resolve('db.json'), textData);

}*/

exports.create = (cube) => Cube.create(cube);

/*exports.getOne = (cubeId) => cubes[cubeId];*/

exports.getOne = (cubeId) => Cube.findById(cubeId).populate('accessories'); // along with cube generation generate the set relations

exports.getAll = async (search = '', fromInput, toInput) => {

    let cubes = await Cube.find().lean();

   /* const from = Number(fromInput) || 0
    const to = Number(toInput) || 6;

    const result = cubes.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
        .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);
       /!* .filter(x => !(x.difficultyLevel > to));*!/*/

    return cubes;
};

exports.attachAccessory = async (cubeId, accessoryId) => {

   const cube = await Cube.findById(cubeId);
   const accessory = await Accessory.findById(accessoryId);

   cube.accessories.push(accessory);

   accessory.cubes.push(cube);

   await cube.save();
   await accessory.save();

   return cube;

}
