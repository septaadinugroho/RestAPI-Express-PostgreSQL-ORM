//Layer for handle request and response
//body validation
const express = require("express");
const { getAllProducts, getProductById, addNewProduct, deleteProductById, editProductById } = require("./product.service");

const productRouter = express.Router();

productRouter.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await getProductById(productId);

    res.send(product);
  } catch (error) {
    res.status(400).json({
      message: "Product not found",
    });
  }
});

//get products
productRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();

    res.send(products);
  } catch (error) {
    res.status(400).json({
      message: "Cannot get product",
    });
  }
});

//add product
productRouter.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await addNewProduct(newProductData);

    res.status(200).json({
      message: "Add product success!",
      product,
    });
  } catch (error) {
    res.status(404).json({
      message: "Cannot add product",
    });
  }
});

//delete product
productRouter.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id); //dapetnya String

    await deleteProductById(productId);

    res.status(200).json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: "Cannot delete product",
    });
  }
});

//update product
productRouter.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    if (!(productData.name && productData.description && productData.image && productData.price)) {
      return res.status(400).json({
        message: "Some field are missing!",
      });
    }

    const product = await editProductById(parseInt(productId), productData);

    res.status(200).send({
      data: product,
      message: "Edit product success",
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//edit 1 field only
productRouter.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(parseInt(productId), productData);

    res.status(200).send({
      data: product,
      message: "Edit product success",
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = productRouter;
