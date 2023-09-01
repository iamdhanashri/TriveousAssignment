const express = require("express");
const orderRouter = express.Router();
const { ProductModel } = require("../models/product.model");
const { OrderModel } = require("../models/order.model");
const { authenticate } = require("../middleware/auth");

// Order Placement
orderRouter.post("/", authenticate, async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user._id;

    let totalAmount = 0;
    for (const { product, quantity } of products) {
      const productDetail = await ProductModel.findById(product);
      if (!productDetail) {
        return res
          .status(404)
          .send({ message: `Product not found` });
      }
      totalAmount += productDetail.price * quantity;
    }

    const order = new OrderModel({
      user: userId,
      products,
      totalAmount,
    });

    const createOrder = await order.save();
    res.status(201).send(createOrder);
  } catch (error) {
    res.status(500).send({ message: "Error placing order" });
  }
});

orderRouter.get("/history", authenticate , async (req, res) => {
  try {
    const userId = req.user._id;
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