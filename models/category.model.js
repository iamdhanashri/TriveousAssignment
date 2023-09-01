const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    "name": String
})
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { CategoryModel };