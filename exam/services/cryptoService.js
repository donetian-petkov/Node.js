const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.delete = (cryptoId) => Crypto.deleteOne({_id: cryptoId});

exports.update = (cryptoId, cryptoData) => Crypto.updateOne({_id: cryptoId}, {$set: cryptoData}, {runValidators: true});

exports.getAll = () => Crypto.find();

exports.getOneDetailed = (cryptoId) => Crypto.findById(cryptoId).populate('cryptoUsers');

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.search = (name, paymentMethod) => {

    if (name) {
        return Crypto.find({name: name});
    } else if (paymentMethod) {
        return Crypto.find({paymentMethod: paymentMethod});
    } else if (name && paymentMethod) {
        return Crypto.find({name: name, paymentMethod: paymentMethod});
    }

}

