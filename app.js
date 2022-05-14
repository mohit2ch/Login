const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


const app = express()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/login",()=>{
    console.log("connected")
});
const userSchema = mongoose.Schema({
    uname: String,
    pwd: String
  })
const User = mongoose.model('Users',userSchema)
const users = [];

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
})

app.get('/signup',function(req,res){
    res.sendFile(__dirname+'/signup.html')
})

app.get('/home',function(req,res){
    res.sendFile(__dirname+'/home.html')
})
app.get('/loginfail',function(req,res){
    res.sendFile(__dirname+'/loginfail.html')
})
app.get('/signupfail',function(req,res){
    res.sendFile(__dirname+'/signupfail.html')
})
app.post('/',function(req,res){
    if(req.body.signup === "required"){
        res.redirect('/signup')
    }
    else{
        let uname = req.body.uname
    let pwd = req.body.pwd
    run()
    async function run(){
        let user = (await User.findOne({uname:uname, pwd:pwd}))
        console.log(user)
        if(user === null) res.redirect('/loginfail')
        else res.redirect('/home')
    }
    }
    
    
    
})

app.post('/signup',function(req,res){
    
    let uname = req.body.uname
    let pwd = req.body.pwd
    let rpwd = req.body.rpwd
    if(uname.length == 0 || pwd.length == 0 || rpwd.length == 0){
        res.redirect('/signupfail');
    }
    else{
        run()
    }
    
    async function run(){
        let user = await User.findOne({uname:uname})
        console.log(user)
        if(user !== null) res.redirect('/signupfail')
        else {
            if(pwd === rpwd){
                user = new User({
                    uname: uname,
                    pwd: pwd
                })
                user.save()
                res.redirect('/home')
            }
            else{
                res.redirect('/signupfail')
            }
        }

    }
    // res.send('Username already exists')

})
app.listen(3000,function(){
    console.log('server started at port 3000')
})




//Things to do
//Log out
//hash Password
