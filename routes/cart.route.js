const express = require("express");
const cartRouter = express.Router();
const { UserModel } = require("../models/user.model");
const { ProductModel } = require("../models/product.model");
const { authenticate } = require("../middleware/auth");

cartRouter.post("/add" ,async (req, res) => {
  try {
    // console.log(req.body.userId)
    const userId = req.body.userId;
    const { productId, quantity } = req.body.items[0];
    // console.log(productId)

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    console.log(user)
    
      user.cart.push({ product: productId, quantity });
    

    await user.save();
    res.status(201).send({ message: "Product added to cart successfully" });
  } catch (error) {
    // console.log(req.user)
    res.status(500).send({ message: "Error adding product to cart",msg: error.message });
  }
});

cartRouter.get("/", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await UserModel.findById(userId).populate("cart.product");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).send({ message: "Error fetching cart" });
  }
});

cartRouter.put("/update/:productId", async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const cartItem = user.cart.find((item) => item.product.equals(productId));
    if (!cartItem) {
      return res.status(404).send({ message: "Product not found in cart" });
    }

    cartItem.quantity = quantity;
    await user.save();
    res.json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating cart item quantity" });
  }
});

cartRouter.delete("/remove/:productId", async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => !item.product.equals(productId));
    await user.save();
    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error removing product from cart" });
  }
});

module.exports = {cartRouter};