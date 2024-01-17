//handling business logic
const prisma = require("../db/prisma");
const { findProducts, findProductById, addProduct, deleteProduct, updateProduct } = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const addNewProduct = async (newProductData) => {
  const product = await addProduct(newProductData);

  return product;
};

const deleteProductById = async (id) => {
  //make sure if product exist, using reusable function from up there :)
  await getProductById(id);

  await deleteProduct(id);
};

const editProductById = async (id, productData) => {
  await getProductById(id);

  const product = await updateProduct(id, productData);

  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProductById,
  editProductById,
};
