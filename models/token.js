var mongoose = require('mongoose');
var tokenSchema = new mongoose.Schema({
    userId: String,
    token: String,
    generateData: Date,
    expiresDada: Date
});

module.exports.tokenModel = mongoose.model('tokenModel',tokenSchema);