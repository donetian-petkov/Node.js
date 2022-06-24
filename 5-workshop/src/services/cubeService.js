
const Cube = require("../models/Cube");
const Accessory = require("../models/Accessory");

exports.create = (cube) => Cube.create(cube);

exports.getOne = (cubeId) => Cube.findById(cubeId); // along with cube generation generate the set relations
exports.getOneDetails = (cubeId) => Cube.findById(cubeId).populate('accessories'); // along with cube generation generate the set relations

exports.getAll = async (search = '', fromInput, toInput) => {

    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

    let cubes = await Cube.find({name: {$regex: new RegExp(search, 'i')}})
        .where('difficultyLevel').lte(to).gte(from)
        .lean();

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
