const express = require("express");
const clientController = require("./../controllers/clientController");

const router = express.Router();

router
.route("/")
.get(clientController.getAllClients)//get all clients

router
.route("/climbersInGym")
.get(clientController.noOfClimbersRoute)//get no of peaople in gym

router
.route("/search4active/")
.get(clientController.searchAllClients4ActivePage)//get all clients

router
.route("/active")
.get(clientController.getActiveClients)//get active clients

router
.route("/total-climbers")
.get(clientController.totalsClimbers)//get total climbers in gym

router
.route("/add")
.post(clientController.createClient)//add client

router
.route("/addClimber/:ownerId")
.post(clientController.createClimber)//add climber

router
.route("/:id")
.get(clientController.getClient)//get client by id

router
.route("/4active/:id")
.get(clientController.getClient4Active)//get client by id 4 active

router
.route("/update/:id")
.patch(clientController.updateClient)//update client by id

router
.route("/update-prods/:id")
.post(clientController.updateProds)//update prods by client id

router
.route("/delete/:id")
.delete(clientController.deleteClient)//delete client by id
router
.route("/:clientId/delete-history/:prodId")
.delete(clientController.deleteProdClient)//delete prod from history

router
.route("/start/:id")
.post(clientController.timeIN)//start time for client by id

router
.route("/reset/:id/:fireBaseId")
.post(clientController.reset)//reset time for client by id

router
.route("/dismiss/:id")
.post(clientController.resetAfterEndTime)//reset time after end for client by id

router
.route("/end/:id/:fireBaseId")
.post(clientController.timeEnd)//end time for client by id

router
.route("/endAll/:id/:fireBaseId")
.post(clientController.timeEndAll)//end all by id

router
.route("/endIndividual/:climberId/:id")
.post(clientController.endIndividual)//end time for client by id

router
.route("/subscription/:id")
.post(clientController.subscriptionStatus)//change subscription status (true/false)

router
.route("/update-numbers/:id")
.post(clientController.updateNoClimbers)//update no of climbers

router
.route("/update-payed/:id")
.post(clientController.updatePayed)//update payed in advance

router
.route("/paused/:id")
.post(clientController.timePause)//pause time for client by id

router
.route("/resume/:id")
.post(clientController.timeResume)//resume time for client by id

router
.route("/testlogic/:time")
.post(clientController.endIndividualTest)//resume time for client by id

  


module.exports = router;