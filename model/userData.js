const mongoose = require('mongoose');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/Library');

//on connection
mongoose.connection.on('connected' ,()=>{
    console.log('connected to the mongoose database @ 27017 for the userdata')
});

mongoose.connection.on('error' ,()=>{
    if(err)
    {
        console.log('Error in database connection:'+err)
    }
});

const Schema = mongoose.Schema;

var NewuserSchema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});

var UserData = mongoose.model('userData', NewuserSchema);
module.exports = UserData;


