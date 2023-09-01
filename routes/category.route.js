const express = require("express");
const { CategoryModel } = require("../models/category.model");
const categoryRouter = express.Router();


categoryRouter.post("/listing", async (req, res) => {
    try {
        const { name } = req.body;
        let cat = await CategoryModel.find(req.body);
        if (cat.length != 0) {
            res.status(400).send("Already added");
        }
        else {
            await CategoryModel.insertMany(req.body);
            res.status(201).send("Category added successfully");
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
})



module.exports = { categoryRouter }