var mongoose = require('mongoose');
var userShema = new mongoose.Schema({
    
    id : Number, 

    username:{
        type:String, 
        required:[true,"usernameError"], // Данное поле обязательно. Если его нет вывести ошибку с текстом usernameRequired
        maxlength:[32,"maxLengthError"],           
        minlength:[3,"minLengthError"],        
        match:[/^[A-Za-z0-9]+$/,"usernameIncorrect"],        
        unique:true // имя должно быть уникальным
    },
    
    password:{
        type:String,         
        required:[true,"passwordRequired"],
        maxlength:[32,"maxLengthError"],
        minlength:[8, "minLengthError"],
        match:[/^[A-Za-z0-9]+$/,"passwordIncorrect"]                
    },

    date : Date,
    token : String,
});

module.exports = mongoose.model('User',userSchema);