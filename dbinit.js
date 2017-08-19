var mongoose = require('mongoose');
var config = require('./config')
//mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;

module.exports.db = mongoose.connect(config.url,{ useMongoClient: true }).then(console.log("succ"));


module.exports.obj = mongoose;
// mongoose.connect.on('error',(err)=>
// {
//     console.error("Database Connection Error: " + err);    
//     console.error('Слющай, монга дыбы запусти да!');
//     process.exit(2);
// });

// mongoose.connect.on('connect', ()=>
//     {   
//         console.info("Succesfully connected to MongoDB Database");        
//     }
// );

