const Cart = require("../Model/Cart")

const patchCart = async(req, res) =>{
    try{
        const updateQuantity = await Cart.findOne({})
    }
    catch(err){
        res.json(err.message);
    }
}

const deleteCart = async (req, res) => {
  try {
    const deleted = await Cart.findOneAndDelete({
      userId: req.params.id   });

    if (!deleted) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json({ message: "Cart deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {deleteCart};