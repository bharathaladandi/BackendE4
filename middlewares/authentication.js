const jwt = require("jsonwebtoken");


const authenticate = (req, res, next) => {
    
    const tokan = req.headers.authorization.split(" ")[1]

    if(tokan){
        const decoded = jwt.verify(tokan, 'shhh')

        if(decoded){
            const userID = decoded.userID

            req.body,userID = userID

            next()
        }
        else{
            res.send("Please Login")
        }

    }

    else{
        res.send("Login Please")
    }
}


module.exports = {authenticate}