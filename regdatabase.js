var config = require("./config");
var mongoClient = require("mongodb").MongoClient;
//Резил крудоподобного на монго-дб. не актуально, если использовать Mongoose
module.exports.add = function(obj){
    mongoClient.connect(config.url,function(err,db){
        var collection = db.collection("users");
        var data = obj;
        collection.insertOne(data,function(err,result){
            if(err){
                return false;
            }
            return true;
            db.close();
        })
    })
};

module.exports.get = function(obj){
    mongoClient.connect(config.url,function(err,db){
        var collection = db.collection("users");
        var data = obj;
        var res = collection.findOne(data,function(err,result){
            if(err){
                return false;
            }
            return res;
            db.close();
        })
    })
};

module.exports.update = function(obj){
    mongoClient.connect(config.url,function(err,db){
        var collection = db.collection("users");
        var data = obj;
        collection.updateOne(data,function(err,result){
            if(err){
                return false;
            }
            return true;
            db.close();
        })
    })
};