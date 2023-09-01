const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    enum: [
      "Clothes",
      "Shoes",
      "Electronics",
      "Kitchen & Appliances",
      "Home Decor",
      "Healthcare",
      "Groceries",
    ],
    default: "Others",
  },
  categoryId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
  },
});

const ProductModel = mongoose.model("product", productSchema);
module.exports = { ProductModel };
