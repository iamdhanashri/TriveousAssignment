const express = require("express");
const orderRouter = express.Router();
const { ProductModel } = require("../models/product.model");
const { OrderModel } = require("../models/order.model");
const { authenticate } = require("../middleware/auth");

// Order Placement
orderRouter.post("/", authenticate, async (req, res) => {
  try {
    const { products } = req.body;
    const userId =  req.body.userId;

    let totalAmount = 0;
    // for (const { product, quantity } of products[0]) {
      const { productId, quantity } = products[0]
      const productDetail = await ProductModel.findById(productId);
  


      if (!productDetail) {
        return res
          .status(404)
          .send({ message: `Product not found` });
      }
      totalAmount += productDetail.price * quantity;
    // } 

    const order = new OrderModel({
      userId: userId,
      products,
      totalAmount,
    });

    const createOrder = await order.save();
    res.status(201).send(createOrder);
  } catch (error) {
    res.status(500).send({ message: "Error placing order", msg:error.message });
  }
});

orderRouter.get("/history" , async (req, res) => {
  try {
    const userId = req.body.userId;
    const orders = await OrderModel.find({ user: userId });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: "Error fetching order history" });
  }
});

orderRouter.get("/:orderId", authenticate, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user._id;

    const order = await OrderModel.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ message: "Error fetching order details" });
  }
});

module.exports = {orderRouter};



// {
//   "userId":"64f58669833c64d6f2e71f6b",
//   "products": [
//   {   
//     "productId":"64f58a8d833c64d6f2e71f75",
//       "quantity":1 
//   }
//   ],
//     "totalAmount": 200
//   }