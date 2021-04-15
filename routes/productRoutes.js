const express = require("express");
const productController = require("./../controllers/productsController");

const router = express.Router();

router
.route("/")
.get(productController.getProducts)//get prod

router
.route("/add")
.post(productController.createProducts)//add prod

router
.route("/edit/:id")
.post(productController.updateProducts)//edit prod

router
.route("/delete/:id")
.delete(productController.deleteProduct)//del prod


module.exports = router;