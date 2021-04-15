
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const morgan = require('morgan');
const clientRouter = require("./routes/clientRoutes");
const settingsRouter = require("./routes/settingsRoutes");
const productRouter = require("./routes/productRoutes");
const adminRouter = require("./routes/adminRoutes");
const cors = require('cors');


dotenv.config({ path: "./config.env" });
let db = mongoose.connection;


//check db errors
db.on('error', function(err){
    console.log(err)
})


//init app/Start express application
const app = express();
// middleware cors
app.use(cors());
//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json, reading data from body into req.body
app.use(bodyParser.json())

//routes
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/settings", settingsRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/admins", adminRouter);

//server
const port = process.env.PORT || 5000
var server = app.listen(port, console.log('Server started on port', port))




const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


// ** MIDDLEWARE ** //
const whitelist = []
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))






//DB settings

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connection: online");
    });


module.exports = app;
