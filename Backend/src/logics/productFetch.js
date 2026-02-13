const Product = require("../Model/Product")

const productFetch = async(req, res) =>
{
    try{
        if(req.details.role === "admin")
            {
                const fetchedProduct = await Product.find();
                res.status(200).json(fetchedProduct);
            }
        else{
                const fetchedProduct = await Product.find();
                res.status(200).json(fetchedProduct);
            }
        
    }

    catch(err)
    {
        res.status(500).json(err.message);
    }
}


//Updating that fetched product: 
const updateProduct = async(req, res) =>
{
    // const userid = req.detail.id;
    try{
        const updatedData = await Product.findByIdAndUpdate(req.params.id, req.body, {new : true});

        if (!updatedData){return res.status(404).json({error : "Product not found"})}

        res.json({message : "updated successfully", product : updatedData.toObject()});
    }

    catch(err){
        res.json(err.message);
    }
    
}

//Deleting that fetched product: 
const deleteProduct = async(req, res) =>
{
    try{
        const deletedData = await Product.findByIdAndDelete(req.params.id);
        if (!deletedData){return res.status(404).json({error : "Product not found"})};

        res.json({message : "deleted successfully", product : deletedData.toObject()});
    }

    catch(err){res.status(500).json(err.message)};
}


module.exports = {productFetch, updateProduct, deleteProduct}

