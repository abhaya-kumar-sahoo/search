const express = require("express");
const ejs= require('ejs');
const bodyParser=require('body-parser')
const path= require('path');
const mongoose = require('mongoose');
var env = require('dotenv').config()
const app=express();
const port= process.env.PORT || 3000;
//mongodb://127.0.0.1:27017 
// YkTJWBRHzPsZrnaN
//mongodb+srv://newuser:YkTJWBRHzPsZrnaN@cluster0.hvrc4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb+srv://newuser:YkTJWBRHzPsZrnaN@cluster0.hvrc4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://newuser:YkTJWBRHzPsZrnaN@cluster0.hvrc4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }, (err) => { 
    if (!err) { 
      console.log('MongoDB Connection Succeeded.');
    } else {
      console.log('Error in DB connection : ' + err);
    }  
  });    
  
 
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
//User Schemaa
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    number:Number,
    age:Number,
    address1:String,
    address2:String,
    state:String,
    dist:String,
    pincode:Number,
    
    email1:String,
    name1:String,
    message:String,
    subject:String
    
})
const User= new mongoose.model("User", userSchema);

app.get('/',(req,res)=>{
  // res.sendFile(path.join(__dirname+'/index.html'));
  res.render('index');

})
app.get('/Gallery',(req,res)=>{
  res.render('a')
})
app.get('/Contact',(req,res)=>{
  res.render('contact')
})

app.get("/Notice",(req,res)=>{
  res.render("notice")
})
app.get('/Payment',(req,res)=>{
  res.render('payment')
})

app.post('/login',(req,res)=>{
    res.render("login")
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/success',(req,res)=>{

            const newUser= new User({
    
            name:req.body.name,
            number:req.body.number,
            email:req.body.email,
            age:req.body.age,
            address1:req.body.address1,
            address2:req.body.address2,
            dist:req.body.dist,
            state:req.body.state,
            pincode:req.body.pincode
        });
       // data save after register
        newUser.save((err)=>{
            if(err){
                console.log(err);
            }else{
                res.render("logout")
            }
        })
});  
app.post('/',(req,res)=>{
  res.render('index');
})

app.post('/Thanks',(req,res)=>{
  const newUser1= new User({
            name1:req.body.name1,
            subject:req.body.subject,
            email1:req.body.email1,
            message:req.body.message
  });
newUser1.save((err)=>{
  if(err){
    console.log(err)
  }else{
    res.render('logout')
  }
})

})

app.post('/',(req,res)=>{
  res.render('index');
})

app.listen(port, function () {
  console.log('Server is started on http://127.0.0.1:'+port);
}); 
