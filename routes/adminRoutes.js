const express = require("express");
const adminController = require("./../controllers/adminController");

const router = express.Router();


router
.route("/")
.get(adminController.getAllAdmins)//get all admins

// router
// .route("/active")
// .get(clientController.getActiveClients)//get active clients

// router
// .route("/total-climbers")
// .get(clientController.totalsClimbers)//get total climbers in gym

router
.route("/add")
.post(adminController.createAdmin)//add admin

router
.route("/:fireBaseId")
.get(adminController.getAdmin)//get admin by id
router
.route("/update/:fireBaseId")
.post(adminController.updateAdmin)//update admin by id 


module.exports = router;