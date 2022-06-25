const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getAll = () => Crypto.find();

exports.getOneDetailed = (cryptoId) => Crypto.findById(cryptoId).populate('cryptoUsers');

exports.update = (cryptoId, cryptoData) => {

   return Crypto.updateOne({_id: cryptoId}, {$set: cryptoData}, {runValidators: true});
}


exports.getOne = (cryptoId) => Crypto.findById(cryptoId);
