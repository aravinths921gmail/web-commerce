const cancelledOrders = async(req,res)=>{
 const userId = req.details.id;

 const orders = await Order.find({
   userId,
   orderStatus:"cancelled"
 }).sort({createdAt:-1})

 res.json(orders)
}