var config = require("./config");
var routes = require("./routes");
var express = require("express");
var parser = require("body-parser");
var User = require("./user").user;
var mongo = require("./dbinit");

var srv = express();

var jsonParser = parser.json();

srv.get(routes.requestReg,function(request,response){
    response.end("here");
})
srv.post(routes.Reg,jsonParser,function(request,response){
    
    //if(!request.body) return response.sendStatus(400);

    var u = new User({
        email: request.body.email,
        password: request.body.password,
        date:Date.now()
    });
    console.log(u);
    u.save(function(err){
    mongo.obj.disconnect();
    
    if(err){
      response.json({
        "success": false,
        "message": "Error",
        "data": {
            "id": "",
            "token": ""
            }
        });  
    }
    //console.log("Сохранен объект user", u);
    //response.json({status:"ok"});
    response.json({
        "success": true,
        "message": "authorized",
        "data": {
            "id": u._id,
            "token": ""
            }
        });
    })   
})
srv.get(routes.updateCredentials,jsonParser,function(request,response){
    if(!request.body) return response.sendStatus(403);
    response.json({status:"ok"});
})
srv.post(routes.getCredentials,jsonParser,function(request,response){
    if(!request.body){
        response.sendStatus(403);
    }
    if(request.body.data.token){
        User.find({token:request.body.token},function(error,data){
            if(error)response.sendStatus(404);

            console.log(data);
        })
    } 
    console.log("here");
    var searchmodel = {
        email: request.body.data.email,
        password: request.body.data.password
    }
    console.log(searchmodel);
    //var test = TokenGen();
    console.log(test);
    User.find(searchmodel,function(error,data){
        if(error) response.sendStatus(404);

        response.json({
        "success": true,
        "message": "authorized",
        "data": {
            "id": u._id,
            "token": TokenGen()
            }
        });
    })
})

function TokenGen(){
    var tokenLength = 15;
    var stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','?'];
    var token = "";
    for (var i = 1; i < tokenLength; i++) { 
        var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
        token = token + stringArray[rndNum];
    };
    return token;
}

srv.listen(3000);
/*
login
{
  "success": true,
  "message": "string",
  "data": {
    "id": "string",
    "token": "string"
  }
}

registration
{
  "success": true,
  "message": "string",
  "data": {
    "id": "string",
    "token": "string"
  }
}
*/