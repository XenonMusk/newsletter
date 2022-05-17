// https.get is when we want data from another server
const express = require("express");
const bodyParser = require("body-parser");
const request =require("request");
const https = require("https");
const app =express();

app.use(bodyParser.urlencoded({extended:true}))

//to use static css and static images from our folder
app.use(express.static("public"))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")

});


app.post("/", function(req,res){
    const firstName= req.body.fName;
    const lastName= req.body.lName;
    const email = req.body.email;
    // console.log(firstName,lastName,email);
    const data = {
         members: [
             {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

             }
         ]
    };
    const jsonData= JSON.stringify(data);
    
    const url ="https://us17.api.mailchimp.com/3.0/lists/1f6015cee2";
    const options={
        method: "POST",
        auth: "manish:add8df6bcbd709097f5fabfb5e9a9d50-us17"
    }

   const request= https.request(url,options, function(response){
       if(response.statusCode==200){
           res.sendFile(__dirname +"/success.html");

       }
       else
       {
           res.sendFile(__dirname + "/failure.html");
       }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
    
    })
    request.write(jsonData);
    request.end();
});

//route to redirect failure submit button
app.post("/failure", function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Listening on port 3300");
});

// API key
// add8df6bcbd709097f5fabfb5e9a9d50-us17

// audience Id
// 1f6015cee2

//To update any changes done in the project to the heroku server
// git add .
// git commit -m "number"
// git push heroku master
// https://protected-tor-22496.herokuapp.com/