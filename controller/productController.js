const Products = require("../model/productModel");
const asyncHandler = require("express-async-handler");

const getProduct = asyncHandler(async (req, res) => {
  const product = await Products.find({product_id:req.users.id});
  res.status(200).json({ status: "oke", details: product });
});

const getProductbyId = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product.product_id.toString() !== req.users.id) {
    res.status(400);
    throw new Error(`Id does not match`);
  }
  res.status(200).json({
    message: `This is get product by Id`,
    Details: product,
  });
});

const postProduct = asyncHandler(async (req, res) => {
  // console.log(req.body)
  const { ProductName, ProductPrice, ManufacturingDate } = req.body;

  if (!(ProductName || ProductPrice || ManufacturingDate)) {
    res.status(400);
    throw new Error(`Fields are Mandatory`);
  }
  const product1 = await Products.create({
    product_id: req.users.id,
    ProductName,
    ProductPrice,
    ManufacturingDate,
  });
  if (product1.product_id.toString() != req.users.id) {
    res.status(400);
    throw new Error(`Id does not match`);
  }
  res.status(200).json({
    message: `This is Post product`,
    Product_details: product1,
  });
});

const putProductbyid = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  console.log(product);
  if (product.product_id.toString() !== req.users.id) {
    res.status(400);
    throw new Error(`Id does not match`);
  }
  const new_product = await Products.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: `This is Put product`,
    Updated_product: new_product,
  });
});

const deleteProductbyid = asyncHandler(async (req, res) => {
  const product = await Products.findByIdAndDelete(req.params.id);
  if (product.product_id.toString() != req.users.id) {
    res.status(400);
    throw new Error(`Id does not match`);
  }
  res.status(200).json({
    message: `This is Delete product`,
    Deleted_data: product,
  });
});

module.exports = {
  getProduct,
  getProductbyId,
  putProductbyid,
  postProduct,
  deleteProductbyid,
};
