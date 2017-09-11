var User = require("../models/user").user;

module.exports = (searchModel) => {

    //additional login validation logic here
    return User.find(searchModel);
}