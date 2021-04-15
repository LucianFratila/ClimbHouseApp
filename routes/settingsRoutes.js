const express = require("express");
const settingsController = require("./../controllers/settingsController");

const router = express.Router();

router
.route("/")
.get(settingsController.getSettings)//get settings

router
.route("/add")
.post(settingsController.createSettings)//add setting

router
.route("/edit/:id")
.post(settingsController.updateSettings)//edit setting


  


module.exports = router;