module.exports = function() {
    this.response = {
        "success": "",
        "message": "",
        "Data": {
            "id": "",
            "token": "",
            "Name":""
        }
    };

    this.noResponseFromDatabase = {
        "success":false,
        "message":"no response from database"
    };

    this.noCredentials ={
        "success":false,
        "message":"no data"
    },

    this.noAuth = {
        "success":false,
        "message":"no such user"
    },

    this.userAlreadyExsists = {
        "success":false,
        "message":"user already exists"
    }

    this.buildResponse = function(status,message,id,token,name){
        this.response.success = status;
        this.response.message = message;
        this.response.Data.id = id;
        this.response.Data.token = token;
        this.response.Data.Name = name;
    }

}