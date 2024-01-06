const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const https = require('https');
const app = express();


app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));


app.get("/", (req, res) => {
    res.send('Let\'s build sign up page');
})

app.post('/', (req, res) => {
    const name = req.body.Name;
    const email = req.body.email;
    const message = req.body.message;
    console.log(name+" "+email+" "+message);

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                NAME: name,
                MESSAGE: message
            }
        }]
    }

    const jsonData = JSON.stringify(data);
    const url = 'https://us11.api.mailchimp.com/3.0/lists/f331d05aff';

    const Option = {
        method:'POST',
        auth:'abrar:f253ae11fa56258629b887376512500e-us11'
    }

  const request= https.request(url,Option,(response)=>{
   if(response.statusCode ===200)
   {
        res.sendFile(path.join(__dirname,'/public/success.html'))

   }
   else
   {
    res.sendFile(path.join(__dirname,'/public/failure.html'));
   }

    response.on('data',(dt)=>{
        console.log(JSON.parse(dt));
    })
})
request.write(jsonData);
request.end();

})


app.post('/failure',(req,res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT ||3000, () => {
    console.log("Serving through port 3000.")
})


//appid:f253ae11fa56258629b887376512500e-us11
//audiance Id:f331d05aff
