const User = require("../Model/User")
const bcrypt = require("bcryptjs");


//Authenticated:
//Email validation :
const validateEmail = (email) => {
    const emailRegex = /^(?=.*\d)[a-zA-Z0-9._%+-]+@(gmail\.com|email\.com)$/;

    if (!email) {
        return "Email is required";
    }

    if (email.length > 50) {
        return "Emailid shouldn't be more than 50 characters"
    }

    if (!emailRegex.test(email)) {
        return "Email must contain a number and end with @gmail.com or @email.com";
    }

    return null;
}

// PASSWORD VALIDATION
const validatePassword = (password) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;


    if (!password) {
        return "Password is required";
    }

    if (password.length < 8) {
        return "Password must be at least 8 characters";
    }

    if (password.length > 30) {
        return "Password must not exceed 30 characters";
    }

    if (!passwordRegex.test(password)) {
        return "Password must include uppercase, lowercase, number, and symbol";
    }

    return null;
};

const userpost = async (req, res) => {

    let { email, password, role } = req.body;
    const hashpassword = await bcrypt.hash(req.body.password, 7);

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        else {

            const emailerror = validateEmail(email);
            if (emailerror) {
                return res.status(400).json({ message: emailerror });
            }

            const passworderror = validatePassword(password);
            if (passworderror) {
                return res.status(400).json({ message: passworderror });
            }



            try {     //Have to use try everywhere when asychronous need
                const email = req.body.email.toLowerCase();

                const duplicateemail = await User.findOne({ email });

                if (duplicateemail)
                    return res.status(409).json({ message: "User already exists" });

                let data = new User({ email, password: hashpassword, role }) //new must

                const savedData = await data.save();

                res.status(201).json(savedData);

                console.log(req.body);
            }
            catch (err) {
                
                res.json(err.message);
            }


        }
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }

}

module.exports = { userpost };

