const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const {  categoryRouter } = require("./routes/category.route");
const { cartRouter } = require("./routes/cart.route");
const { orderRouter } = require("./routes/order.route");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);


app.listen(8080, async () => {
  try {
    await dbConnection;
    console.log("Connected to db");
  } catch (e) {
    console.log(e.message);
  }
  console.log("listening on port 8080");
});