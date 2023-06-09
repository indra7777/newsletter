


const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const https = require('https');

const app = express();
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function (req, res){
   res.sendFile(__dirname+"/signup.html");
});

app.post("/",function (req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.Email;

    const data = {
            members : {
                email_address:email,
                status:'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }

            }

    };


    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    const url = "https://us10.api.mailchimp.com/3.0/lists/9497be72bb"
    const options = {
        method:"POST",
        auth: 'indra:38326eb4ebe0bc74c3bd3dacbd3ce37d-us10'
       }

    const request = https.request(url,options,function (response){

        response.on("data",function (data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();

});


app.listen(3000,function (){
    console.log("System is running on port:3000");
});


//API key
//38326eb4ebe0bc74c3bd3dacbd3ce37d-us10

//LIST Id
//9497be72bb
//9497be72bb.