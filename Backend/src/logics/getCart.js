const Cart = require("../Model/Cart")

const getCart = async(req, res) => {

    try{
        const getItem = await Cart.find()
        res.status(200).json(getItem);
    }
    catch(err){ return res.json(err.message)};
    

}

module.exports = {getCart};

