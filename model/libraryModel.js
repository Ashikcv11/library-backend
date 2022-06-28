const mongoose = require('mongoose')
// const { default: mongoose } = require('mongoose');
// const Mongoose = require('mongoose');

const DB = "mongodb+srv://ashikcv:5s_xbvgUbwA33Av@cluster0.8ire35m.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
 console.log("Database Connection Successful")
}).catch((err)=>{
 console.log(err)
})

//connect to mongodb
// mongoose.connect('mongodb://localhost:27017/Library')

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

//on connection
// mongoose.connection.on('connected' ,()=>{
//     console.log('connected to the mongoose database @ 27017')
// })

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


