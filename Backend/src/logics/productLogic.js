const Product = require("../Model/Product");
const User = require("../Model/User");



const ProductCreate = async(req, res) =>{
    try{
    // res.json(req.body);
        let {Name, description, price, stock, createdBy} = req.body;

    let product = new Product({...req.body, createdBy: req.details.id});

    if(!Name?.trim() || !description?.trim()){
       return res.json({message : "Product shouldn't be empty"});
    }

    else{
        const savedProduct = await product.save();

        return res.status(201).json(savedProduct); 
    }
}

    catch(err)
    {
     return res.status(500).json({message : err.message});
    }

}




module.exports = {ProductCreate};
