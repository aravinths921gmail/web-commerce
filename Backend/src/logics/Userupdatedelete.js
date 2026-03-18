const User = require("../Model/User");

const updateUser = async(req, res) =>
{
    try{
        if(req.details.role === "admin"){
            return res.json({message : "Can't delete change admin"})
        }
        else{
            const updateduserData = await User.findByIdAndUpdate(req.params.id, req.body, {new : true});
            if(!updateduserData) {return res.status(404).json({error : "User not found"})};
        }
        


        res.json({message : "User updated successfully", product : updateduserData.toObject()})
    }
    
    catch(err){res.json(err.message)};
    
}

//Deleting that fetched user: 
const deleteUser = async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);

        if (!targetUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (targetUser.role === "admin") {
            return res.status(403).json({ error: "Cannot delete another admin" });
        }

        await User.findByIdAndDelete(req.params.id);

        

        res.json({ message: "User deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {updateUser, deleteUser};
