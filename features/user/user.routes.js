const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("./user.model")




const app = express.Router();
// app.use(AuthMiddleware);


app.get("/", (req, res) => {
    res.send("Welcome");
})


app.post("/signup", async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    const userPresent = await UserModel.findOne({email})
    //TODO
    if(userPresent?.email){
        return res.status(404), send("Already exits, Try another email address");

    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                const user = new UserModel({email,password:hash})
                await user.save()
                res.send("Sign up successfull")
            });
           
        }
       catch(err){
            console.log(err)
            res.status(500).send(err.message);
       }
    }
    
})


app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.find({email})
         
      if(user.length > 0){
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function(err, result) {
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, 'hush');
                res.send({"msg":"Login successfull","token" : token})
            }
            else{
                res.status(401).send("Login failed")
            }
      })} 
      else{
        res.status(404).send(`User with email: ${email} not found`)
      }
    }
    catch(e) {
        res.status(404).send(e.message)
    }
})



module.exports = app;