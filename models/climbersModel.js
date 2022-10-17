const mongoose = require("mongoose");

let climberSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  owner: {
    type: String,
  },
  ownerName: {
    type: String,
  },

  date: { type: Date, default: Date.now },
  timeStamp: { type: Number, default: Date.now },

  timeIn: {
    type: Number,
    default: 0,
  },
  timeOut: {
    type: Number,
    default: 0,
  },
  finalTime: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: false,
  },
  startTime: {
    type: String,
    default: 0,
  },
  due: {
    type: Number,
    default: 0,
  },
  minikid: {
    type: Boolean,
    default: false,
  },
  kid: {
    type: Boolean,
    default: false,
  },
  adult: {
    type: Boolean,
    default: false,
  },
});

let Climber = (module.exports = mongoose.model("Climber", climberSchema));
