//communicate with database

const prisma = require("../db/prisma");

const findProducts = async () => {
  const products = await prisma.products.findMany();

  return products;
};

const findProductById = async (id) => {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
  });

  return product;
};

const addProduct = async (ProductData) => {
  const product = await prisma.products.create({
    data: {
      name: ProductData.name,
      description: ProductData.description,
      image: ProductData.image,
      price: ProductData.price,
    },
  });

  return product;
};

const deleteProduct = async (id) => {
  await prisma.products.delete({
    where: {
      id,
    },
  });
};

const updateProduct = async (id, productData) => {
  const product = await prisma.products.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  });

  return product;
};

module.exports = {
  findProducts,
  findProductById,
  addProduct,
  deleteProduct,
  updateProduct,
};
