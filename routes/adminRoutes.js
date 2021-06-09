const express = require("express");
const adminController = require("./../controllers/adminController");

const router = express.Router();


router
.route("/")
.get(adminController.getAllAdmins)//get all admins

router
.route("/add")
.post(adminController.createAdmin)//add admin

router
.route("/delete/alllogs")
.post(adminController.delAllLogs)//delete all logs

router
.route("/:fireBaseId")
.get(adminController.getAdmin)//get admin by id
router
.route("/update/:fireBaseId")
.post(adminController.updateAdmin)//update admin by id 


module.exports = router;