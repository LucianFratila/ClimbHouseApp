const { query } = require('express');
const Client = require('../models/clientModel');
const Climber = require('../models/climbersModel');
const Products = require('../models/productsModel');
const Settings = require('../models/settingsModel');
const AppError = require("./../utils/appError");
const catchAsync = require('./../utils/catchAsync');
const Admin = require('../models/adminModel');
const { ObjectId } = require('mongoose');
var mongoose = require('mongoose')


///CREATE CLIENT
exports.createClient = catchAsync(async (req, res, next) => {
    const newClient = await Client.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        client: newClient,
      },
    });
  });

  ///CREATE CLIMBER
exports.createClimber = catchAsync(async (req, res, next) => {
 
  const client = await Client.findById({_id:req.params.ownerId}).select('name + status + timeOut + finalTime + timeIn')
  
  
  let d = new Date();
  let n = d.toLocaleTimeString();
  let dataObj={}
  dataObj.owner=req.params.ownerId;
  dataObj.ownerName=client.name;
  dataObj.timeIn=Date.now()
  dataObj.status=true
  
  dataObj.timeStamp=Date.now()
  dataObj.startTime=n
  if (req.body.climber==='adult') {
    dataObj.adult=true
    
    
  }
  if (req.body.climber==='kid') {
    dataObj.kid=true
    
    
  }
  if (req.body.name==='') {
    dataObj.name=`Unknown ${req.body.climber==='adult'?'adult':'kid'} climber`
  } else {
    dataObj.name=`${req.body.climber==='adult'?'Adult':'Kid'} climber: ${req.body.name}`
  }
  // console.log(client.timeOut,client.finalTime,client.timeIn,client.status);
  if (client.timeIn>0 && client.timeOut===0 && client.finalTime===0 && client.status===true ) {
    try {
      await Climber.create(dataObj)
    } catch (error) {
      console.log(error);
    }
    res.status(200).json({
      status: 'success',
    }); 
  } else {
    if (client.status===true) {
      res.status(409).send({
        message: 'Time stopped'
     })
    } else {
      res.status(409).send({
        message: 'Client inactive'
     })
    }
    
    
  }
   
  
  
  
});
///GET ALL CLIENTS
exports.getAllClients = catchAsync(async (req, res, next) => {
let search = req.query.search

const climbers = await Client.aggregate(
  [{
      $group: {
          _id: '',
          total: { $sum: '$noOfpeopleClimbing' }
      }
    }, {
      $project: {
          _id: 0
      }
  }]
);

let sort = req.query.sort ////String:asc&desc
let limit = parseInt(req.query.limit)////number



const active = await Client.find({ status: true }).exec();
const clientsLength = await Client.find({});
// const clients = await Client.find({'name' : new RegExp(search, 'i'),'email':new RegExp(search, 'i')}).sort({ timeStamp: sort}).limit(limit)
const clients = await Client.find({ $or: [ { 'name' : new RegExp(search, 'i') }, { 'email':new RegExp(search, 'i') },{ 'phone':new RegExp(search, 'i') } ] }).sort({ timeStamp: sort}).limit(limit)
const settings = await Settings.find()
  res.status(200).json({
      clients,
      adultPrice: settings[0].adultPrice,
      kidPrice: settings[0].kidPrice,
      results: clientsLength.length,
      active: active.length
      // clibersInGym:totalResult
  });
});

////Search Clients for Active Page
exports.searchAllClients4ActivePage = catchAsync(async (req, res, next) => {


  let search = req.query.search
  

const clients = await Client.find({'name' : new RegExp(search, 'i')})

  res.status(200).json({
      clients
  });
});







///GET ACTIVE CLIENTS
exports.getActiveClients = catchAsync(async (req, res, next) => {
  const clients = await Client.find({ status: true }).exec();
  const settings = await Settings.find()
  const climbers = await Climber.find({'status':true}) 
    res.status(200).json({
        
        
        clients,
        adultPrice: settings[0].adultPrice,
        kidPrice: settings[0].kidPrice,
        results: clients.length,
        totalInGym:climbers.length
    });
  });


  ///GET TOTAL NO OF CLIMBERS IN GYM
exports.totalsClimbers = catchAsync(async (req, res, next) => {
  const climbers = await Client.aggregate(
    [{
        $group: {
            _id: '',
            total: { $sum: '$noOfpeopleClimbing' }
        }
     }, {
        $project: {
            _id: 0
        }
    }]
  );
    
    res.status(200).json({
        
        climbers
    });
  });




  
///GET SPECIFIC CLIENT
exports.getClient = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id)
  const climbers= await Climber.find({'owner':req.params.id})
  const products = await Products.find()

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { 
      client,
      climbers,
      products
     }
  });

});

///GET SPECIFIC CLIENT 4 active page
exports.getClient4Active = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id)
  

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }

  res.status(200).json({
    client
  });

});

///UPDATE SPECIFIC CLIENT
exports.updateClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { client }
  });
});




///DELETE SPECIFIC CLIENT
exports.deleteClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndDelete(req.params.id);
  const climbers = await Climber.deleteMany({'owner':req.params.id})

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null
  });
});


///DELETE SPECIFIC PRODUCT FROM CLIENT LIST
exports.deleteProdClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndUpdate({_id: req.params.clientId},
    {$pull: {prodHistory: {_id: req.params.prodId}}}, 
    {multi: true}
    );

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null
  });
});



///UPDATE PRODS FOR CLIENT
exports.updateProds = catchAsync(async (req, res, next) => {
  

  let prodsFrontEnd ={}
  prodsFrontEnd.id = req.body.id;
  prodsFrontEnd.qty = req.body.qty;
  const prods = await Products.findById(prodsFrontEnd.id);
  // console.log(prods.productName,' Qty:',prodsFrontEnd.qty, ' @ ', prods.price, 
  // ' lei/buc ',' Total: ', prodsFrontEnd.qty * prods.price, ' lei'  );
  let prodsBackEnd = {}
  prodsBackEnd.productName = prods.productName;
  prodsBackEnd.price = prods.price;
  prodsBackEnd.qty = prodsFrontEnd.qty;
  prodsBackEnd.total = prodsFrontEnd.qty * prods.price;
  // console.log(prodsBackEnd);
  // console.log(req.params.id);
  
  const client = await Client.findOneAndUpdate({_id:req.params.id},{
    $addToSet: {
      prodHistory:prodsBackEnd
  }
  });

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }
  
  res.status(200).json({
    status: "success",
    data: { client }
  });
});





///UPDATE NO KIDS,ADLUTS AND TOTALS FOR SPECIFIC CLIENT
exports.updateNoClimbers = catchAsync(async (req, res, next) => {
  let numbers={}
  numbers.adults = req.body.adults;
  numbers.kids = req.body.kids;
  numbers.adultsRemaining = req.body.adults;
  numbers.kidsRemaining = req.body.kids;
  numbers.noOfpeopleClimbing = parseInt(numbers.adults) + parseInt(numbers.kids)
  
  
  
  const client = await Client.findByIdAndUpdate(req.params.id, numbers, {
    new: true,
    
  });

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }
  
  res.status(200).json({
    status: "success",
    data: { client }
  });
});

///UPDATE PAYED FIELD FOR SPECIFIC CLIENT

exports.updatePayed = catchAsync(async (req, res, next) => {
  let amount={}
  amount.payed = req.body.payed;  
  const client = await Client.findByIdAndUpdate(req.params.id, amount, {
    new: true,
    
  });

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }
  
  res.status(200).json({
    status: "success",
    payed: client.payed 
  });
});


///PAUSED TIME FOR SPECIFIC CLIENT
exports.timePause = catchAsync(async (req, res, next) => {
  const clientPaused = await Client.findById(req.params.id)
  let timePause={}
  timePause.paused=Date.now()
  timePause.elapsedOnPaused=((((Date.now()-clientPaused.timeIn)/1000)/60).toFixed(0))-clientPaused.totalPaused
  timePause.pausedStatus = true
  // timePause.due = 
  const client = await Client.findByIdAndUpdate(req.params.id, timePause, {
    new: true,
    runValidators: true
  });
  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }
  
  res.status(200).json({
    status: "success",
    data: { client },
    
  });
});

///RESUME TIME FOR SPECIFIC CLIENT
exports.timeResume = catchAsync(async (req, res, next) => {
  const clientResume = await Client.findById(req.params.id)
  const totalPausedforTotal = await Client.findById(req.params.id)
  let timeResume={}
  timeResume.resume=Date.now()
  timeResume.totalPausedRAM=((((Date.now()-clientResume.paused)/1000)/60).toFixed(0))
  timeResume.totalPaused = (totalPausedforTotal.totalPaused + ((Date.now()-clientResume.paused)/1000)/60).toFixed(0)
  timeResume.pausedStatus = false
  const client = await Client.findByIdAndUpdate(req.params.id, timeResume, {
    new: true,
    runValidators: true
  });

  
 
  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }
  
  res.status(200).json({
    status: "success",
    data: { client }
  });
});


///START TIME FOR SPECIFIC CLIENT
exports.timeIN = catchAsync(async (req, res, next) => {
  


  let timeStart={}
  timeStart.timeIn=Date.now();
  timeStart.status = true;
  let d = new Date();
  let n = d.toLocaleTimeString(); 
  timeStart.startTime = n;
  
  
  const client = await Client.findByIdAndUpdate(req.params.id, timeStart, {
    new: true,
    runValidators: true
  });


  //////////////Start and Create Adults////////////////////////////////////

  const clientData = await Client.findById(req.params.id)
  
  // console.log(clientData);

  for (let index = 0; index < clientData.adults; index++) {
  let dataAdults={}
  dataAdults.timeIn=clientData.timeIn
  dataAdults.startTime=clientData.startTime
  dataAdults.status=true
  dataAdults.name=`Adult ${index+1}`
  dataAdults.adult=true
  dataAdults.owner= req.params.id
  dataAdults.ownerName=clientData.name



    await Climber.create(dataAdults);
    
  }

  for (let index = 0; index < clientData.kids; index++) {
    let dataAdults={}
    dataAdults.timeIn=clientData.timeIn
    dataAdults.startTime=clientData.startTime
    dataAdults.status=true
    dataAdults.name=`Kid ${index+1}`
    dataAdults.kid=true
    dataAdults.owner= req.params.id
    dataAdults.ownerName=clientData.name
  
  
  
      await Climber.create(dataAdults);
      
    }
//////////////Start and Create Adults////////////////////////////////////




  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }
  
  res.status(200).json({
    status: "success",
    data: 
      { client }
  });
});

///SET STATUS 4 SUBCRIPTION
exports.subscriptionStatus = catchAsync(async (req, res, next) => {
  
  // console.log(clientT.subscription.status);
  let value={}
  // value.payed = req.body.payed;  
  value.statusSub = req.body.status;  
  value.initialSub = req.body.initial;
  value.remainigSub = 0 
  
  const client = await Client.findByIdAndUpdate(req.params.id, value, {
    new: true,
    runValidators: true
  });

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }
  
  res.status(200).json({
    
    client
  });
});





////////////TIME////////////////////////
function calculateSeconds(a,b){
  let x = ((a-b)/1000)
  var total
   
      if (b===0) {
          return total = 0
      } else {
          return total = parseInt(x)
      }  
}

function calculateMinutes(a,b){
  var total
   
      if (b===0) {
          return total = 0
      } else {
          return total = (((a-b)/1000)/60).toFixed(0)
      }  
}

function halfHourLogicFunction (time){
  return Math.floor((time/30)*10)/10
}

////////////TIME////////////////////////





///FINISH TIME FOR SPECIFIC CLIENT
exports.timeEnd = catchAsync(async (req, res, next) => {

  const clientEndX = await Client.findById(req.params.id)
  const clientEnd = await Client.findById(req.params.id)
  
  let timeEnd={}
  timeEnd.timeOut = Date.now();
 
  timeEnd.finalTime = ((((Date.now()-clientEnd.timeIn)/1000)/60).toFixed(0))-clientEnd.totalPaused ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!in production needs to be in minutes
  const client = await Client.findByIdAndUpdate(req.params.id, timeEnd, {
    new: true,
    runValidators: true
  });

  if (!clientEndX) {
    return next(new AppError("No client found with that ID", 404));
  }

  
  

  if (clientEndX.finalTime > 0) {
    return next(new AppError("Time was stopped earlier", 409));
  } else {
    res.status(200).json({
      status: "success",
      data: { client }
    });
  }
  const afterClientEnd = await Client.findById(req.params.id)
  const settingsEnd = await Settings.find()
  let adultPrice = settingsEnd[0].adultPrice
  let kidPrice = settingsEnd[0].kidPrice

  let a = afterClientEnd.kids //nr copii
  let b = afterClientEnd.adults //nr adulti
  let c = kidPrice //pret copii
  let d = adultPrice //pret adulti

  let y = afterClientEnd.finalTime//timp scurs

  let x = (a*c)+(b*d)
  let z // pret final rotunjit in sus
  let aftertimeEnd={}
  if (y <= 35) {
    aftertimeEnd.due = x
  }
  else {
    aftertimeEnd.due = a*(c+(Math.ceil((y-35)/15))*5) + b*(d+(Math.ceil((y-35)/15))*5)
  }



  ////////////////////////LOGS per Admin//////////////////////
    const afterclient = await Client.findByIdAndUpdate(req.params.id, aftertimeEnd, {
      new: true,
      runValidators: true
    });
    let fireBaseIdFrontend=req.params.fireBaseId
    // console.log(fireBaseIdFrontend);

    const adminDetails = await Admin.findOne({fireBaseId:fireBaseIdFrontend})
  

    
    const clientQuery4Admin = await Client.findById(req.params.id)
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    let adminLog = {}
    adminLog.adminEmailName = `${adminDetails.name} / ${adminDetails.email}`
    adminLog.adminFireBaseId = fireBaseIdFrontend
    adminLog.clientName = `${clientQuery4Admin.name} / ${clientQuery4Admin.email}`
    adminLog.start = `${clientQuery4Admin.startTime} / ${today}`
    adminLog.time = clientQuery4Admin.finalTime
    adminLog.due = clientQuery4Admin.due
    adminLog.kickOutStatus=false
    adminLog.timestamp = Date.now()
    
  
  const admin = await Admin.findOneAndUpdate({fireBaseId:fireBaseIdFrontend},{
    $addToSet: {
      activityHistory:adminLog
  }
  });
  //////////////////////LOGS per Admin//////////////////////



  /////////////////////Logs history per Client////////////////////
  let clientLog={}
  clientLog.admin=`${adminDetails.email}`
  clientLog.totalTime=clientQuery4Admin.finalTime
  clientLog.kids=afterClientEnd.kids
  clientLog.adults=afterClientEnd.adults
  clientLog.due=clientQuery4Admin.due
  clientLog.timeIn=`${clientQuery4Admin.startTime} / ${today}`
  clientLog.dateLog = Date.now()

  const clientLogHistory=await Client.findOneAndUpdate({_id:req.params.id},{
      $addToSet: {
        sessionHistory:clientLog
    }
    });












});


///RESET Time and write in log the reset (Kick Out in client side) CLIENTS TIME FOR SPECIFIC CLIENT
exports.reset = catchAsync(async (req, res, next) => {

  await Client.updateMany({},{$unset: {adultsClients:1}},{multi: true});//////clear adults list

  // const errorCheck = await Client.findById(req.params.id)
  // if (errorCheck.timeIn>0) {
  //   console.log('time has started');
  // } else {
  //   console.log('time has Not started');
  // }
  


  let fireBaseIdFrontend=req.params.fireBaseId
  const adminDetails = await Admin.findOne({fireBaseId:fireBaseIdFrontend})

  let prodsBackEnd = {}
  prodsBackEnd.productName = '';
  prodsBackEnd.price = '';
  prodsBackEnd.qty = '';
  prodsBackEnd.total = '';
  
  
  
  const clientP = await Client.updateOne({_id:req.params.id},{
    $unset: {
      prodHistory:prodsBackEnd
  }
  });


    

    ////////////////////////LOGS for admin side
    const clientQuery4Admin = await Client.findById(req.params.id)
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let calTimeAfterReset = (((Date.now()-clientQuery4Admin.timeIn)/1000)/60).toFixed(0)
    let dueFromClientSide = req.body.kickOutDueFromClientSide
    let adminLog = {}
    adminLog.adminEmailName = `${adminDetails.email}`
    adminLog.adminFireBaseId = fireBaseIdFrontend
    adminLog.clientName = `${clientQuery4Admin.name} / k: ${clientQuery4Admin.kids} | a: ${clientQuery4Admin.adults} | t: ${calTimeAfterReset}/min `
    adminLog.start = `${clientQuery4Admin.startTime} / ${today}`
    adminLog.kickOutStatus=true
    adminLog.clientTimeIn=clientQuery4Admin.timeIn
    adminLog.time = clientQuery4Admin.finalTime
    adminLog.due = clientQuery4Admin.due
    adminLog.timestamp = Date.now()
    
  
  const admin = await Admin.findOneAndUpdate({fireBaseId:fireBaseIdFrontend},{
    $addToSet: {
      activityHistory:adminLog
  }
  });
  ////////////////////////LOGS for admin side
  let clientLog={}
  clientLog.admin=`${adminDetails.email}`
  clientLog.totalTime=calTimeAfterReset
  clientLog.kids=clientQuery4Admin.kids
  clientLog.adults=clientQuery4Admin.adults
  clientLog.due=dueFromClientSide
  clientLog.kickedOF=true
  clientLog.timeIn=`${clientQuery4Admin.startTime} / ${today}`
  clientLog.dateLog = Date.now()


  const clientLogHistory=await Client.findOneAndUpdate({_id:req.params.id},{
    $addToSet: {
      sessionHistory:clientLog
  }
  });


/////////////////////////////////////////////////

  let reset={}
  reset.timeIn=0
  reset.timeOut=0
  reset.adults=0
  reset.kids=0
  reset.finalTime=0
  reset.paused=0
  reset.resume=0
  reset.totalPaused=0
  reset.elapsedOnPaused=0
  reset.pausedStatus=0
  reset.totalPausedRAM=0
  reset.payed=0
  reset.noOfpeopleClimbing=0
  reset.status = false;
  reset.startTime = 0;
  reset.adultsRemaining = 0;
  reset.kidsRemaining = 0;
  reset.due = 0
  
      //////////////reset all climbers and Due from Client////////////////////////////////////

      const climbers = await Climber.deleteMany({'owner':req.params.id})

      await Client.updateMany({},{$unset: {dueList:1}},{multi: true});
    
      //////////////reset all climbers////////////////////////////////////

      
  
  const client = await Client.findByIdAndUpdate(req.params.id, reset, {
    new: true,
    runValidators: true
  });

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }
  
  res.status(200).json({
    status: "success",
    data: { client }
  });




});



/////////////Dismiss button
exports.resetAfterEndTime = catchAsync(async (req, res, next) => {

  const clientCheck = await Client.findById({_id:req.params.id})
  
  if (clientCheck.timeOut>0) {

    await Client.updateMany({},{$unset: {adultsClients:1}},{multi: true});
  

  let prodsBackEnd = {}
  prodsBackEnd.productName = '';
  prodsBackEnd.price = '';
  prodsBackEnd.qty = '';
  prodsBackEnd.total = '';
  
  
  
  const clientP = await Client.updateOne({_id:req.params.id},{
    $unset: {
      prodHistory:prodsBackEnd
  }
  });


  let reset={}
  reset.timeIn=0
  reset.timeOut=0
  reset.adults=0
  reset.kids=0
  reset.finalTime=0
  reset.paused=0
  reset.resume=0
  reset.totalPaused=0
  reset.elapsedOnPaused=0
  reset.pausedStatus=0
  reset.totalPausedRAM=0
  reset.payed=0
  reset.noOfpeopleClimbing=0
  reset.status = false;
  reset.startTime = 0;
  reset.due = 0
  
  
  
  const client = await Client.findByIdAndUpdate(req.params.id, reset, {
    new: true,
    runValidators: true
  });

//////////////reset all climbers////////////////////////////////////

await Climber.deleteMany({'owner':req.params.id})

//////////////reset all climbers////////////////////////////////////

//////////////reset dueList////////////////////////////////////

await Client.updateMany({_id:req.params.id},{$unset: {dueList:1}},{multi: true});

//////////////reset dueList////////////////////////////////////
  
  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }
  
  res.status(200).json({
    status: "success",
    data: { client }
  });
    
  } else {
    if (clientCheck.status===false) {
      res.status(409).send({
        message: 'Client inactive'
     })
    }
    if (clientCheck.timeOut===0&&clientCheck.status===true) {
      res.status(409).send({
        message: 'Time is still on.'
     })
    }
    
    
  }

  


});



/////////////////// Individual End time Controls  ////////////////////////////

exports.endIndividual = catchAsync(async (req, res, next) => {

  const climbers = await Climber.find({_id:req.params.climberId})
  const settingsEnd = await Settings.find()

  let dataObj={}
  dataObj.timeOut=Date.now()
  dataObj.status=false
  dataObj.finalTime=((((Date.now()-climbers[0].timeIn)/1000)/60).toFixed(0))///////min in prod
  

  if (climbers[0].status===true) {
    try {
      await Climber.findByIdAndUpdate({_id:req.params.climberId},dataObj)
      const adultsLength=await Climber.find({'owner':req.params.id,'adult':true,'status':true})
      const kidsLength=await Climber.find({'owner':req.params.id,'kid':true,'status':true})
      
      let dataClientObj={}
      dataClientObj.adultsRemaining=adultsLength.length
      dataClientObj.kidsRemaining=kidsLength.length
      await Client.findByIdAndUpdate({_id:req.params.id},dataClientObj)
      ////////////individual due logic//////////////////////////////////
      const afterClimberEnd = await Climber.find({_id:req.params.climberId})
      let adultPrice = settingsEnd[0].adultPrice
      let kidPrice = settingsEnd[0].kidPrice
      let a = 1 //nr copii
      let b = 1 //nr adulti
      let c = kidPrice //pret copii
      let d = adultPrice //pret adulti
      let y = afterClimberEnd[0].finalTime//timp scurs
      let kid = (a*c)
      let adult = (b*d)
      let kidOver35min = a*(c+(Math.ceil((y-35)/15))*5) // pret final rotunjit in sus
      let adultOver35min = b*(d+(Math.ceil((y-35)/15))*5) // pret final rotunjit in sus
    
      let aftertimeEnd={}

      if (climbers[0].kid===true) {
        if (y <= 35) {
          aftertimeEnd.due = kid
        }
        else {
          aftertimeEnd.due = kidOver35min
        }
      }
      if (climbers[0].adult===true) {
        if (y <= 35) {
          aftertimeEnd.due = adult
        }
        else {
          aftertimeEnd.due = adultOver35min
        }
      }
      await Climber.findByIdAndUpdate({_id:req.params.climberId},aftertimeEnd)

      ////////////individual due logic//////////////////////////////////


    } catch (error) {
      console.log(error);
    }

    const climbersDue = await Climber.find({_id:req.params.climberId}).select('due')
    let climberDueObj={}
    climberDueObj.climber=climbersDue[0]._id
    climberDueObj.due=climbersDue[0].due


  await Client.findOneAndUpdate({_id:req.params.id},{
    $addToSet: {
      dueList:climberDueObj
  }
  });

    res.status(200).json({
      status: "success"
    });
    
    
  } else {
      res.status(409).send({
         message: 'Time was stopped'
      })
  }
  
 


});




//////////////////////////STOP ALL////////////////////////////


exports.timeEndAll = catchAsync(async (req, res, next) => {
  var start = Date.now()
  var hrstart = process.hrtime()
  const client = await Client.findById(req.params.id);
  const climber = await Climber.find({'owner':req.params.id})
  
  const settingsEnd = await Settings.find()
  let adultPrice = settingsEnd[0].adultPrice
  let kidPrice = settingsEnd[0].kidPrice

  let a = 1 //nr copii
  let b = 1 //nr adulti
  let c = kidPrice //pret copii
  let d = adultPrice //pret adulti

  
  
  //////////////////////LOOP Start/////////////////////////////////////////////////////////////
  if (client.timeOut===0 && client.status===true) {

    for (let index = 0; index < climber.length; index++) {
      const element = climber[index];

      const dataObj={}
      dataObj.timeOut=Date.now();
      dataObj.status=false
      dataObj.finalTime=((((Date.now()-element.timeIn)/1000)/60).toFixed(0))////////min in prod
      
      if (element.status===true) {
        try {
          await Climber.findByIdAndUpdate({_id:element._id},dataObj)
  
          ///////due logic for all//////////////
          
          const afterClimberEnd = await Climber.find({'owner':req.params.id})
          let y = afterClimberEnd[index].finalTime//timp scurs
          let kid = (a*c)
          let adult = (b*d)
          let kidOver35min = a*(c+(Math.ceil((y-35)/15))*5) // pret final rotunjit in sus
          let adultOver35min = b*(d+(Math.ceil((y-35)/15))*5) // pret final rotunjit in sus
          let aftertimeEnd={}
          
        if (element.kid===true) {
          if (y <= 35) {
            aftertimeEnd.due = kid
            
          }
          else {
            aftertimeEnd.due = kidOver35min
            
          }
        }
        if (element.adult===true) {
          if (y <= 35) {
            aftertimeEnd.due = adult
            
          }
          else {
            aftertimeEnd.due = adultOver35min
            
          }
        }
        // console.log(`time: ${y}, due: ${aftertimeEnd.due}`);
        // console.log(aftertimeEnd);
  
        await Climber.findByIdAndUpdate({_id:afterClimberEnd[index]._id},aftertimeEnd)

        const climbersDue = await Climber.find({_id:element._id}).select('due')
        let climberDueObj={}
        climberDueObj.climber=climbersDue[0]._id
        climberDueObj.due=climbersDue[0].due
        
        // console.log(climberDueObj);
    
        await Client.findOneAndUpdate({_id:req.params.id},{
          $addToSet: {
            dueList:climberDueObj
        }
        });

        } catch (error) {
          console.log(error);
        }
   
      }
       
      
    }
    //////////////////////LOOP End/////////////////////////////////////////////////////////////


    ///////////////////////////LOGS/////////////////////////////////////////////////////////
    
    let timeEnd={}
    timeEnd.timeOut = Date.now();
    timeEnd.finalTime = ((((Date.now()-client.timeIn)/1000)/60).toFixed(0)) ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!in production needs to be in minutes
    timeEnd.adultsRemaining = 0
    timeEnd.kidsRemaining = 0
    
    await Client.findByIdAndUpdate(req.params.id, timeEnd, {
      new: true,
      runValidators: true
    });


        let fireBaseIdFrontend=req.params.fireBaseId
        // console.log(fireBaseIdFrontend);

        const adminDetails = await Admin.findOne({fireBaseId:fireBaseIdFrontend})
      

        
        const clientQuery4Admin = await Client.findById(req.params.id)
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        let adminLog = {}
        adminLog.adminEmailName = `${adminDetails.name} / ${adminDetails.email}`
        adminLog.adminFireBaseId = fireBaseIdFrontend
        adminLog.clientName = `${clientQuery4Admin.name} / ${clientQuery4Admin.email}`
        adminLog.start = `${clientQuery4Admin.startTime} / ${today}`
        adminLog.time = clientQuery4Admin.finalTime
        adminLog.due = clientQuery4Admin.dueList.reduce((prev, cur) => prev + cur.due, 0)
        adminLog.kickOutStatus=false
        adminLog.timestamp = Date.now()
        
      
      await Admin.findOneAndUpdate({fireBaseId:fireBaseIdFrontend},{
        $addToSet: {
          activityHistory:adminLog
      }
      });
      let clientLog={}
        clientLog.admin=`${adminDetails.email}`
        clientLog.totalTime=clientQuery4Admin.finalTime
        clientLog.kids=clientQuery4Admin.kids
        clientLog.adults=clientQuery4Admin.adults
        clientLog.due=clientQuery4Admin.dueList.reduce((prev, cur) => prev + cur.due, 0)
        clientLog.timeIn=`${clientQuery4Admin.startTime} / ${today}`
        clientLog.dateLog = Date.now()
      
        await Client.findOneAndUpdate({_id:req.params.id},{
            $addToSet: {
              sessionHistory:clientLog
          }
          });


    ///////////////////////////LOGS/////////////////////////////////////////////////////////

    if (!client) {
      return next(new AppError("No client found with that ID", 404));
    }

    //////////// Exec time res //////////////////////////
    var end = new Date() - start,
    hrend = process.hrtime(hrstart)
    res.status(200).json({
      status: "success",
      executionTime:hrend[0]
    });
    
  
    // console.info('Execution time: %dms', end)
    // console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
    //////////// Exec time res //////////////////////////
    
  } else {
    if (client.status===false) { 
      res.status(409).send({
        message: 'Client inactive'
     })
    }
    if (client.timeOut!==0) { 
      res.status(409).send({
        message: 'Time stopped'
     })
    }
    
    
  }

});

//////////////////////////STOP ALL////////////////////////////

////GET No of Climbers in Gym
exports.noOfClimbersRoute = catchAsync(async (req, res, next) => {

  const climbers = await Climber.find({'status':true})
  let data
  data = climbers.length
  


  res.status(200).json({
      message:'Success',
      totalInGym:data
  });
});


























///LOGICA CALCUL PRET


// let a = 0 //nr copii
// let b = 2 //nr adulti
// let c = 20 //pret copii
// let d = 25 //pret adulti

// let y = 179//timp scurs in minute

// let x = (a*c)+(b*d)
// let z // pret final rotunjit in sus

// if (y <= 35) {
//   z = x
// }
// else {
//   z = a*(c+(Math.ceil((y-35)/15))*5) + b*(d+(Math.ceil((y-35)/15))*5)
// }


// console.log('Pret final: ', z, " /lei");

// ////MODEL ABONAMENT

// let noCopii = 2;
// let timpScurs =36;//minute
// let optiuneAbonament = 16;//jumatati de ora
// let intrariRamase

// intrariRamase = optiuneAbonament-noCopii*(Math.ceil((timpScurs-5)/30))

// console.log('abonam:', intrariRamase);






// let a = 0 //nr copii
// let b = 2 //nr adulti
// let c = 20 //pret copii
// let d = 25 //pret adulti

// let y = 179//timp scurs in minute

// let x = (a*c)+(b*d)
// let z // pret final rotunjit in sus

// if (y <= 35) {
//   z = x
// }
// else {
//   z = a*(c+(Math.ceil((y-35)/15))*5) + b*(d+(Math.ceil((y-35)/15))*5)
// }







  // let timeHalfHourLogic = halfHourLogicFunction(afterClientEnd.finalTime);
  
  // if (timeHalfHourLogic < 1) {
  //   timeHalfHourLogic = 1
  // }else
  //   timeHalfHourLogic

  // aftertimeEnd.due = (timeHalfHourLogic*adultPrice)*afterClientEnd.adults + (timeHalfHourLogic*kidPrice)*afterClientEnd.kids