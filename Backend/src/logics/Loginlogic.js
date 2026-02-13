const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


//Authentication:
//Email validation:

const validateEmail = (email) =>
{
    const emailRegex = /^(?=.*\d)[a-zA-Z0-9._%+-]+@(gmail\.com|email\.com)$/;

    if (!email){
        return "Email is not added";
    }

    if(email.length > 50)
    {
        return "Email shouldn't be exceed 50 characters";
    }

    if(!emailRegex.test(email)){
        return "Email must contain a number and end with @gmail.com or @email.com";
    }

    return null;
}

// PASSWORD VALIDATION
// const validatePassword = (password) => {
//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;


//   if (!password) {
//     return "Password is required";
//   }

//   if (password.length < 8) {
//     return "Password must be at least 8 characters";
//   }

//   if (password.length > 30) {
//     return "Password must not exceed 30 characters";
//   }

//   if (!passwordRegex.test(password)) {
//     return "Password must include uppercase, lowercase, number, and symbol";
//   }

//   return null;
// };


const Loginpost = async (req, res) => {
    let { email, password, role } = req.body;
    

    try {

        if (!email || !password) {
            return res.json("Email and password is needed");
        }   
        
        const emailError = validateEmail(email);

        if(emailError){
            return res.status(400).json({message : emailError});
        }

        // const passwordError = validatePassword(password);

        // if(passwordError){
        //     return res.status(400).json({message : passwordError});
        // }

        const duplicatedata = await User.findOne({ email: req.body.email });

        if (!duplicatedata) { return res.json("Invalid credentials") }

        const confirmPassword = await bcrypt.compare(req.body.password, duplicatedata.password);

        if(!confirmPassword) return res.json("Password not match");

        
    //JWT (should be create here)
    const token = jwt.sign(
        {
            id: duplicatedata._id,
            email: duplicatedata.email,
            role : duplicatedata.role
        },
        "secretKey",
        {expiresIn: "1h"}
    )

    return res.status(200).json({message: "Login successful", token});


    }

    catch (error) {
        return res.status(400).json({ message: error.message });
    }


}

module.exports = { Loginpost };