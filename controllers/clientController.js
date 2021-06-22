const { query } = require('express');
const Client = require('../models/clientModel');
const Products = require('../models/productsModel');
const Settings = require('../models/settingsModel');
const AppError = require("./../utils/appError");
const catchAsync = require('./../utils/catchAsync');
const Admin = require('../models/adminModel');


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
const clients = await Client.find({'name' : new RegExp(search, 'i')}).sort({ timeStamp: sort}).limit(limit)
const settings = await Settings.find()
  res.status(200).json({
      clients,
      adultPrice: settings[0].adultPrice,
      kidPrice: settings[0].kidPrice,
      results: clientsLength.length,
      active: active.length,
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
    res.status(200).json({
        
        
        clients,
        adultPrice: settings[0].adultPrice,
        kidPrice: settings[0].kidPrice,
        results: clients.length
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
  const products = await Products.find()

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { 
      client,
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
  
  

  for (let index = 0; index < clientData.adults; index++) {
  let dataAdults={}
  dataAdults.timeIn=clientData.timeIn
  dataAdults.startTime=clientData.startTime
  dataAdults.status=true
  dataAdults.name=`Adult ${index+1}`



    await Client.findOneAndUpdate({_id:req.params.id},{
      $addToSet: {
        adultsClients:dataAdults
    }
    });
    
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


//////////// LOGIC for Subscription ////////////////////


const specs = await Client.findById(req.params.id)

let noClienti = specs.kids + specs.adults;
let timpScurs = specs.finalTime;//minute
let optiuneAbonament = specs.initialSub;//jumatati de ora
let ramasAbonament = specs.remainigSub
// console.log(noClienti,' / ',timpScurs,' / ',optiuneAbonament);
// let intrariRamase
if (specs.statusSub===true) {

  if (specs.remainigSub === 0) {
    let value={}
    value.remainigSub = optiuneAbonament-noClienti*(Math.ceil((timpScurs-5)/30));
    const client = await Client.findByIdAndUpdate(req.params.id, value, {
      new: true,
      runValidators: true
    });
    
    
  } else {
    let value={}
    value.remainigSub = ramasAbonament-noClienti*(Math.ceil((timpScurs-5)/30));
    const client = await Client.findByIdAndUpdate(req.params.id, value, {
      new: true,
      runValidators: true
    });
  }
  
} 






  ///////////////END of LOGIC for Subscription ////////////


    const afterclient = await Client.findByIdAndUpdate(req.params.id, aftertimeEnd, {
      new: true,
      runValidators: true
    });
    let fireBaseIdFrontend=req.params.fireBaseId
    // console.log(fireBaseIdFrontend);

    const adminDetails = await Admin.findOne({fireBaseId:fireBaseIdFrontend})
    // console.log(admin);

    ////////////////////////LOGS per Admin//////////////////////
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





    //////////////End Time for all Adults////////////////////////////////////

    const clientData = await Client.findById(req.params.id)
    
   
    
    
3
4
    
    let data = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
    let ora = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    let dataOra = data+' '+ora;
    
    let array=clientData.adultsClients
   
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      
      await Client.findOneAndUpdate({_id: req.params.id, "adultsClients._id": element._id},
        {
          $set: {
          "adultsClients.$.timeOut": clientData.timeOut,
          "adultsClients.$.endTime": dataOra,
          "adultsClients.$.status": false

        }}
      )

  
      
      
    }
    
  //////////////Start and Create Adults////////////////////////////////////






});


///RESET Time and write in log the reset (Kick Out in client side) CLIENTS TIME FOR SPECIFIC CLIENT
exports.reset = catchAsync(async (req, res, next) => {

  await Client.updateMany({},{$unset: {adultsClients:1}},{multi: true});//////clear adults list

  const errorCheck = await Client.findById(req.params.id)
  if (errorCheck.timeIn>0) {
    console.log('time has started');
  } else {
    console.log('time has Not started');
  }
  


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
    adminLog.clientName = `${clientQuery4Admin.name} / k: ${clientQuery4Admin.kids} | a: ${clientQuery4Admin.adults} | t: ${calTimeAfterReset}/min | $: ${dueFromClientSide} lei`
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
  reset.due = 0
  
  
  
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

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }
  
  res.status(200).json({
    status: "success",
    data: { client }
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