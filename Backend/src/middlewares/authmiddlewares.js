//Verify token
//Role authentication
//Done both function in a single authmiddleware file
const jwt = require("jsonwebtoken");
const User = require("../Model/User")


const verifyToken = (req, res, next) => {
    // Try cookie first, fallback to Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token not found" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token not valid" });

        req.details = decoded;
        next();
    })
};

const Admin = (req, res, next) => {
  if (req.details.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

const user = (req, res, next) => {
    if (req.details.role !== "user"){
        return res.status(403).json({message : "Users only"});
    }
    next();
}

// We can create this profile logic as separate file too with admin logic(fetching user data file)
//  const Profile = async(req, res) => {
//     if (req.details.role === "admin") {
//         try{
//             const data = await User.find();
//             let adminData = data.filter((item)=> item.role !== "admin");
//             res.json(adminData);
//         }

//         catch(err){
//             res.json(err.message);
//         }

//     }   


//     else {
//     return res.json({ message: "Users not allowed" });
//     }
    






module.exports = { verifyToken, Admin, user};