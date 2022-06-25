const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getAll = () => Crypto.find();

exports.getOneDetailed = (cryptoId) => Crypto.findById(cryptoId).populate('cryptoUsers');

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);
