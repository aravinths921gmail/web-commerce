const Order = require("../Model/Order");
const checkout = require("../logics/checkout");
const redis = require("../config/redis");
const { v4: uuidv4 } = require("uuid");

const addOrder = async (req, res) => {
  const userId = req.details.id;
  const { cartid } = req.params;
  const { shippingAddress, paymentMethod, idempotencyKey } = req.body;

  // 1️⃣ Generate idempotency key
  const key = idempotencyKey || uuidv4(); //If idemp not present, create it using uuidv4
  const redisKey = `order:${userId}:${key}`;  //Creating cache storage to prevent duplicate

  const lockKey = `order-lock:${userId}:${cartid}`;
  const lockValue = Date.now() + Math.random(); // unique lock value
  let lock;

  try {
    // 2️⃣ Acquire atomic Redis lock to prevent concurrent processing
    lock = await redis.set(lockKey, lockValue, "NX", "PX", 30000); // 30s lock
    if (!lock) {   //If you can't open the lock means, its already in process
      return res.status(409).json({ message: "Order is already being processed" });
    }

    // 3️⃣ Check if order already exists for this idempotency key
    const cachedOrder = await redis.get(redisKey);
    if (cachedOrder) {
      return res.status(200).json({message: "Order already processed", order: JSON.parse(cachedOrder)});
    }

    // 4️⃣ Process checkout (calculate totals, items, etc.)
    const summary = await checkout(cartid, userId);

    // 5️⃣ Create order in DB with unique cartId constraint
    let order;
    
    try {
      order = await Order.create({
        userId,
        cartId: cartid, 
        items: summary.items,
        pricing: {
          shipping: summary.shipping,
          itemsTotal: summary.itemsTotal,
          grandTotal: summary.grandTotal
        },

        shippingAddress,
        payment: {
          method: paymentMethod,
          status: "pending"
        },

        orderStatus: "placed",
        statusHistory: [{ status: "placed" }],
        delivery: {}
      });

    }
    
    catch (err) {
      // Handle duplicate key (cart already has an order)
      if (err.code === 11000) {
        const existingOrder = await Order.findOne({ cartId: cartid });
        await redis.set(redisKey, JSON.stringify(existingOrder), "EX", 3600);
        return res.status(200).json({
          message: "Order already processed",
          order: existingOrder
        });
      }
      throw err;
    }

    // 6️⃣ Cache the order in Redis under idempotency key
    await redis.set(redisKey, JSON.stringify(order), "EX", 3600); // 1 hour TTL

    // 7️⃣ Return order
    return res.status(201).json({ message: "Order created", order });

  }
  catch (err) {
    return res.status(400).json({ message: err.message });
  }

  finally {
    // 8️⃣ Release lock safely
    if (lock) {
      const currentValue = await redis.get(lockKey);
      if (currentValue && currentValue === lockValue) {
        await redis.del(lockKey);
      }
    }
  }
};

module.exports = addOrder;