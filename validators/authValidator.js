var User = require("../user").user;

module.exports = (searchModel) => {

    //additional auth validation logic here
    return User.find(searchModel);
}