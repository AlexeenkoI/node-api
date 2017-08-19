var config = require("./config");
var routes = require("./routes");
var express = require("express");
var parser = require("body-parser");
var User = require("./user").user;
var mongo = require("./dbinit");
var responseModel = require("./responsemodels/LoginModel");
var statusMessage = require("./constants/Messages");
var srv = express();
var jsonParser = parser.json();

srv.post(routes.Reg,jsonParser,function(request,response){
    var answer = new responseModel();
    if(!request.body){
        return response.json(answer.noCredentials);
    }
    var u = new User({
        email: request.body.Data.Email,
        password: request.body.Data.Password,
        name : request.body.Data.Name,
        date:Date.now()
    });
    console.log("start validate");
    u.save(function(err){ 
    if(err){
        console.log(err);
        return response.json(answer.noResponseFromDatabase);  
    }else{   
        console.log("finish");
        answer.buildResponse(true,statusMessage.successReg,u._id,null,u.name);
        return response.json(answer.response);
        }
    });
          
})


srv.post(routes.getCredentials,jsonParser,function(request,response){
    var answer = new responseModel();
    var id;
    var responseData;  
	console.log("GETCREDENTIALS START");
    if(!request.body){
        return response.json(answer.noCredentials);
    }
    var tokenGen = TokenGen();
    console.log(request.body);
    var searchmodel = {
        email: request.body.Data.Email,
        password: request.body.Data.Password,
        name:request.body.Data.Name
    }
    console.log("start validate");

    User.findOneAndUpdate(searchmodel,{token:tokenGen},{new:true},function(err,result){
        if(err){
            return response.json(answer.noCredentials)
        }else{
            answer.buildResponse(true,statusMessage.successAuth,result._id,result.token,result.name);
            return response.json(answer.response);
        }
    });
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
