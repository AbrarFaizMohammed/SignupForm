require("dotenv").config();
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const https = require('https');
const app = express();
const mongoose = require('mongoose');
const { stringify } = require("querystring");


mongoose.connect(process.env.MONGODB_CONNECT);

const SignUpDBSchema = new mongoose.Schema({
    email_info:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Message:{
        type:String
    }
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.get("/", (req, res) => {
    res.send('Let\'s build sign up page');
})

app.post('/', (req, res) => {
    const name = req.body.Name;
    const email = req.body.email;
    const message = req.body.message;
try{
    const usersinfo= mongoose.model("usersInfo",SignUpDBSchema);

    const userdetail = new usersinfo({
         email_info:email,
         Name:name,
         Message:message
    })
    
    userdetail.save();
    res.sendFile(path.join(__dirname,'/public/success.html'))
}
catch(err)
{
     console.log(err);
     res.sendFile(path.join(__dirname,'/public/failure.html'));
}

})


app.post('/failure',(req,res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT ||3000, () => {
    console.log("Serving through port 3000.")
})

