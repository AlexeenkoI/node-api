var mongoose = require('mongoose');
var config = require('./config')
mongoose.Promise = require('bluebird');

mongoose.connect(config.url,{
    server:{
        poolSize : 10
    }
});

mongoose.connection.on('error',(err)=>
{
    console.error("Database Connection Error: " + err);    
    console.error('Слющай, монга дыбы запусти да!');
    process.exit(2);
});

mongoose.connect.on('connect', ()=>
    {   
        console.info("Succesfully connected to MongoDB Database");        
    }
);

