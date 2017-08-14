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
    
    if(!request.body) return response.sendStatus(400);

    var u = new User({
        username: request.body.username,
        password: request.body.password,
        date:Date.now()
    });
    u.save(function(err){
    mongo.obj.disconnect();
     
    if(err) return console.log("error");
     
    console.log("Сохранен объект user", u);

    response.json({status:"ok"});
    });
   

})
srv.get(routes.updateCredentials,jsonParser,function(request,response){
    if(!request.body) return response.sendStatus(403);
    response.json({status:"ok"});
})
srv.post(routes.getCredentials,jsonParser,function(request,response){
    if(!request.body) return response.sendStatus(403);
    console.log("here");
    var searchmodel = {
        username: request.body.username,
        password: request.body.password
    }
    User.find(searchmodel,function(error,data){
        if(error) response.sendStatus(404);

        response.json(data);
    })
})



srv.listen(3000);