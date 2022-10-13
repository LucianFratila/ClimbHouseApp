const { query } = require("express");
const Client = require("../models/clientModel");
const Products = require("../models/productsModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

///CREATE NEW PRODUCT
exports.createProducts = catchAsync(async (req, res, next) => {
  const newProducts = await Products.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      products: newProducts,
    },
  });
});

///GET PRODUCTS
exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Products.find();
  res.status(200).json(products);
});

///UPDATE PRODUCTS
exports.updateProducts = catchAsync(async (req, res, next) => {
  const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    product,
  });
});

///DELETE SPECIFIC PRODUCT
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
