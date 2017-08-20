var User = require("../user").user;

module.exports = (searchModel) => {
    return User.find(searchModel);
}