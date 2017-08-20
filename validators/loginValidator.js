var User = require("../user").user;

module.exports = (searchModel) => {

    //additional login validation logic here
    return User.find(searchModel);
}