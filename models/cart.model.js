const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", unique: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, default: 1 },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports ={CartModel}