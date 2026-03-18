const User = require("../Model/User")

//We can create this profile logic as separate file too with admin logic(fetching user data file)
 const getUser = async(req, res) => {
    if (req.details.role === "admin") {
        try{
            const data = await User.find();
            let adminData = data.filter((item)=> item.role !== "admin");
            res.json(adminData);
        }

        catch(err){  res.json(err.message) }

    }   

    else { return res.json({ message: "Users not allowed" })}
    };

    module.exports = {getUser}