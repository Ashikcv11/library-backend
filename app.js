const express = require ('express');
const cors = require('cors');

const BookData = require('./model/libraryModel');
const UserData = require('./model/userData');

const jwt = require('jsonwebtoken')

const bodyparser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors());


app.use(bodyparser.json());

username="admin"
password="1234"


const path = require('path');

app.use(express.static('dist/front-end'))
app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname + '/dist/front-end/index.html'));
});

app.post('/api/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Method:GET,POST,PUT,DELETE");
    let userData = req.body
    console.log(userData)

    UserData
    .findOne({email: userData.userName, password: userData.password},(err,user)=>{
        if(err){
            console.log('error is',err)
        }
        else{
            console.log(user)
        }
    }).clone()
    .then((user)=>{
        if(user !== null){
            let payload = { subject: user.email + user.password};
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
        }
        else{
            console.log('wrong details')
            res.status(401).send('wrong username or password')
        }
    });
});

//         if(username !== userData.userName){
//             res.status(401).send('invalid username')
//             console.log("authentication failed...")

//         } 
//         else if (password !== userData.password)
//         {
//             res.status(401).send('invalid password')
//             console.log("authentication failed...")

            
//         }else{

//             let payload={subject:username+password}
//             let token=jwt.sign(payload, 'secretkey')
//             res.status(200).send({token})
//             console.log("log in successfull...")
//         }
// })

app.get('/api/books',function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    BookData.find()
    .then(function(Bookbody){
        res.send(Bookbody);
    })

})

app.post('/api/add',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log("step4")
    console.log(req.body);
    var Book = {
        BookAuth:req.body.Book.BookAuth,
        BookName:req.body.Book.BookName,
        BookImg:req.body.Book.BookImg,
        BookDesc:req.body.Book.BookDesc   
    
    }

    var Book = new BookData(Book)
    Book.save();
    console.log("new book data added successfully...")

});


app.post('/api/signup',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log("step4")
    // console.log(req.body);
    // console.log(req.body.User.firstName);
    var User = {
        firstName:req.body.User.firstName,
        lastName:req.body.User.lastName,
        email:req.body.User.email,
        password:req.body.User.password 
    }

    var User = new UserData(User)
    User.save();
    console.log("user data added successfully...")

});


app.delete('/api/remove/:id',(req,res)=>{
   
    id = req.params.id;
    BookData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('Data removed successfully....')
        res.send();
    })
  })

app.get('/api/Abook/:id',(req, res)=>{
    const id = req.params.id;
    BookData.findOne({'_id':id})
    .then((i)=>{
        res.send(i);
    });

})

app.put('/api/edit',(req, res)=>{
    console.log(req.body)
    id=req.body._id,
    BookAuth = req.body.BookAuth,
    BookName = req.body.BookName,
    BookImg = req.body.BookImg,
    BookDesc = req.body.BookDesc,

    BookData.findByIdAndUpdate({"_id":id},
                            {$set:{"BookAuth":BookAuth,
                            "BookName":BookName,
                            "BookImg":BookImg,
                            "BookDesc":BookDesc}})
.then(function(){
res.send();
                            })
})

function verifyToken(req,res,next){
    
    if(!req.headers.authoraization)
    {
        return res.status(401).send('Unothorized request')
    }

    let token=req.headers.authoraization.split('')[1]
    if (token=='null')
    {
        return res.status(401).send('Unothorized request')
    }

    let payload=jwt.verify(token,'secretkey')
    console.log(payload)
    if (!payload)
    {
        return res.status(401).res.send('Unothorized request')
    }
    req.userId=payload.subject
    next()
}





app.listen(PORT, () => {
    console.log('server up in port '+PORT);
});

