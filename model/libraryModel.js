// const mongoose = require('mongoose')
const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');

//connect to mongodb
// mongoose.connect('mongodb://localhost:27017/Library')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

//on connection
mongoose.connection.on('connected' ,()=>{
    console.log('connected to the mongoose database @ 27017')
})

// mongoose.connection.on('error' ,()=>{
//     if(error)
//     {
//         console.log('Error in database connection:'+error)
//     }
// });

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


