const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Name : {
      type : String ,
      required : true,
      max : 255 ,
    },
    Email : {
        type : String ,
        required : true,
        max : 255 ,
        min : 6 ,
        
    },
    Password : {
        type : String ,
        required : true,
        max : 1024 ,
        min : 6
    },
    Date : {
        type : Date ,
        default : Date.now ,
    }
})
module.exports = mongoose.model('User' ,userSchema )