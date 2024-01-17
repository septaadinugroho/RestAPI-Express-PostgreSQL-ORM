const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

//first end-point
app.get("/api", (req, res) => {
  res.send("Belajar ORM");
});

//import controller
const productController = require("./product/product.controller");

app.use("/products", productController);

//port listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
