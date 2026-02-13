//Verify token
//Role authentication
//Done both function in a single authmiddleware file
const jwt = require("jsonwebtoken");
const User = require("../Model/User")


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);



    //Token verification: (no token, token time expiry, )
    if (!token) return res.status(401).json({ message: "Token not found" });

    jwt.verify(token, "secretKey", (err, decoded) => {

        if (err) { return res.status(401).json("Token not valid") };

        req.details = decoded;
        next();

    })

}

const Admin = (req, res, next) => {
  if (req.details.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};


//We can create this profile logic as separate file too with admin logic(fetching user data file)
 const Profile = async(req, res) => {
    if (req.details.role === "admin") {
        try{
            const data = await User.find();
            let adminData = data.filter((item)=> item.role !== "admin");
            res.json(adminData);
        }

        catch(err){
            res.json(err.message);
        }

    }   


    else {
    return res.json({ message: "Users not allowed" });
    }
    };






module.exports = { verifyToken, Profile, Admin };