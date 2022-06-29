const mongoose = require('mongoose');
// const { default: mongoose } = require('mongoose');
// const Mongoose = require('mongoose');

// mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(()=>{
        console.log("Database Connection Successful...")
    }).catch((err)=>{
     console.log(err)
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


