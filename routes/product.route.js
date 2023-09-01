const express = require("express");
const { ProductModel } = require("../models/product.model");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    let products = await ProductModel.find({});
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    let product = await ProductModel.findById({ _id: req.params.id });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

productRouter.post("/", async (req, res) => {
  const product = new ProductModel(req.body);
  await product.save();
  res.send({ msg: "product Created" });
});


productRouter.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await ProductModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ msg: "Product Updated successfully" });
  } catch (e) {
    res.send("Something went wrong");
  }
});

productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await ProductModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Product Deleted successfully" });
  } catch (e) {
    res.send("Something went wrong");
  }
});

module.exports = { productRouter };
