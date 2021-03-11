
const express = require("express");
const ejs= require('ejs');
const bodyParser=require('body-parser')
const path= require('path');
const mongoose = require('mongoose');
var env = require('dotenv').config()
const app=express();
const port= process.env.PORT || 3000;
// mongodb+srv://newuser:KbIFiKPlRdgJNvCz@cluster0.hvrc4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(' mongodb+srv://newuser:KbIFiKPlRdgJNvCz@cluster0.hvrc4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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
    pincode:Number
    
})
const User= new mongoose.model("User", userSchema);

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+'/index.html'));

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
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.listen(port, function () {
  console.log('Server is started on http://127.0.0.1:'+port);
}); 
