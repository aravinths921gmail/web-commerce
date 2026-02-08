//Verify token
//Role authentication
//Done both function in a single authmiddleware file
const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);



//Token verification: (no token, token time expiry, )
 if(!token) return res.status(401).json({message :"Token not found"});

 jwt.verify(token, "secretKey", (err, decoded)=>{

    if(err)
        {return res.status(401).json("Token not valid")};
    
    req.details = decoded;
    next();

 })

}

const Profile = (req, res)=>{
    if(req.details === "admin"){
            res.json({ message: "Hi Admin", user: req.details });
    }
    else{
        res.json({ message: "Hi User", user: req.details });
    }
 }



 module.exports = {verifyToken, Profile};