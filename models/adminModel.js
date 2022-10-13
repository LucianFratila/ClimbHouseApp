const mongoose = require("mongoose");

let adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  fireBaseId: {
    type: String,
  },
  name: {
    type: String,
  },
  role: {
    type: String,
    default: "normal",
  },
  activityHistory: [
    {
      adminEmailName: {
        type: String,
      },
      adminFireBaseId: {
        type: String,
      },
      clientName: {
        type: String,
      },
      start: {
        type: String,
      },
      time: {
        type: Number,
      },
      due: {
        type: Number,
      },
      timestamp: {
        type: Number,
      },
      clientTimeIn: {
        type: Number,
      }, /////////for kickout ref
      kickOutStatus: {
        type: Boolean,
      },
      kickOutTimeOnEnd: {
        type: String,
      },
      kickOutDueFromClientSide: {
        type: Number,
      },
    },
  ],
});

let Admin = (module.exports = mongoose.model("Admin", adminSchema));
