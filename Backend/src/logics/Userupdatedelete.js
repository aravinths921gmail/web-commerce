const User = require("../Model/User");

const updateUser = async(req, res) =>
{
    try{
        if(req.details.role === "admin"){
            return res.json({message : "Can't delete another admin"})
        }
        else{
            const updateduserData = await User.findByIdAndUpdate(req.params.id, req.body, {new : "true"});
            if(!updateduserData) {return res.status(404).json({error : "User not found"})};
        }
        


        res.json({message : "User updated successfully", product : updateduserData.toObject()})
    }
    
    catch(err){res.json(err.message)};
    
}

//Deleting that fetched user: 
const deleteUser = async(req, res) =>
{
    try{
        const deleteduserData = await User.findByIdAndDelete(req.params.id);
        if (!deleteduserData){return res.status(404).json({error : "User not found"})};

        res.json({message : "deleted successfully", product : deleteduserData.toObject()});
    }

    catch(err){res.status(500).json(err.message)};
}

module.exports = {updateUser, deleteUser};
