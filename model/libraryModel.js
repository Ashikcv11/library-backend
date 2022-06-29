const mongoose = require('mongoose')
// const { default: mongoose } = require('mongoose');
// const Mongoose = require('mongoose');

// mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(()=>{
        console.log("Database Connection Successful...")
    }).catch((err)=>{
     console.log(err)
    });


const Schema = mongoose.Schema;

var NewBookSchema = new Schema({
    BookAuth:{
        type:String,
        required: true
    },
    BookName:{
        type:String,
        required: true
    },
    BookImg:{
        type:String,
        

    },
    BookDesc:{
        type:String,
        required:true
    }

});

var BookData = mongoose.model('Books', NewBookSchema);
module.exports = BookData;


