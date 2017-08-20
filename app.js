var config = require("./config");
var routes = require("./routes");
var express = require("express");
var parser = require("body-parser");
var User = require("./user").user;
var mongo = require("./dbinit");
var responseModel = require("./responsemodels/LoginModel");
var statusMessage = require("./constants/Messages");
var loginValidator = require("./validators/loginValidator");
var authValidator = require("./validators/authValidator");
var srv = express();
var jsonParser = parser.json();

srv.post(routes.Reg,jsonParser,function(request,response){
    var answer = new responseModel();
    if(!request.body){
        return response.json(answer.noCredentials);
    }
    var searchModel = {
        email: request.body.Data.Email,
        password: request.body.Data.Password,
        name:request.body.Data.Name
    }
    loginValidator(searchModel)
    .then(res=>{
        if(!res.length){
            console.log("not found in database.");
            console.log("build user schema");
            var u = new User({
                email: request.body.Data.Email,
                password: request.body.Data.Password,
                name : request.body.Data.Name,
                date:Date.now(),
                token:null
            });
            console.log(u);
            console.log("saving user...");
            u.save()
            .then((res)=>{
                console.log("user saved, id:");
                console.log(res._id);
                answer.buildResponse(true,statusMessage.successReg,u._id,null,u.name);
                return response.json(answer.response);
            })
            .catch(()=>{
                console.log("error in database while saving");
                return response.json(answer.noResponseFromDatabase);
            });    
        }else{
            console.log("such user found");
            return response.json(answer.userAlreadyExsists);
        }
    })
    .catch(error=>{
        console.log("error in database while finding");
        return response.json(answer.noResponseFromDatabase);
    });   
})


srv.post(routes.getCredentials,jsonParser,function(request,response){
    var answer = new responseModel();
    var id;
    var responseData;  
	console.log("Authentification start");
    if(!request.body){
        return response.json(answer.noCredentials);
    }
    var searchModel = {
        email: request.body.Data.Email,
        password: request.body.Data.Password,
        name:request.body.Data.Name
    }
    authValidator(searchModel)
    .then(res=>{
        if(!res.length){
            console.log("user not found");
            return response.json(answer.noAuth);
        }else{
            console.log("find user:");
            console.log(res);
            responseData = res[0];
            User.findOneAndUpdate(res,{token:TokenGen()},{new:true})
            .then(res=>{
                console.log("token updated");
                console.log("updated data:");
                console.log(responseData);
                answer.buildResponse(true,statusMessage.successAuth,res._id,res.token,res.name);
                return response.json(answer.response);
            })
            .catch(()=>{
                console.log("error in database while updating");
                return response.json(answer.noResponseFromDatabase);
            })
        }
    })
    .catch(()=>{
        console.log("error in database while finding");
        return response.json(answer.noResponseFromDatabase);
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
