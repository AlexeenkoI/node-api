var config = require("./config");
var routes = require("./routes");
var express = require("express");
var parser = require("body-parser");
var db = require("./regdatabase");
var srv = express();

var jsonParser = parser.json();

srv.get(routes.requestReg,function(request,response){
    response.end("here");
})
srv.post(routes.Reg,jsonParser,function(request,response){
    if(!request.body) return response.sendStatus(400);
    //var res = db.add(request.body); Дореализовать

    response.json({status:"ok",id:request.body.id});
})
srv.get(routes.updateCredentials,jsonParser,function(request,response){
    if(!request.body) return response.sendStatus(400);
    //var res = db.update(request.body); Дореализовать
    response.json({status:"ok"});
})
srv.get(routes.getCredentials,jsonParser,function(request,response){
    if(!request.body) return response.sendStatus(400);
    //var res = db.get(request.id); Дореализовать в монгодб
    response.json(res);
})
srv.listen(3000);