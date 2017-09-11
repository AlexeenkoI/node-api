var mongoose = require('mongoose');
var dataStoreSchema = new mongoose.Schema({  //добавить строки валидации данных + обработать и в промисе, если будем писать в промис стиле\либо класс\асинк
    type : String,
    isIncoming: Boolean,
    content: String,
    userId: Number,
    title: String
});

module.exports.dataStoreModel = mongoose.model('tokenModel',dataStoreSchema);