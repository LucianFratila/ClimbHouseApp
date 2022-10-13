const { query } = require("express");
const Admin = require("../models/adminModel");
const Products = require("../models/productsModel");
const Settings = require("../models/settingsModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

///CREATE Admin
exports.createAdmin = catchAsync(async (req, res, next) => {
  const newAdmin = await Admin.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      admin: newAdmin,
    },
  });
});

///get admin by firebaseid
exports.getAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findOne({ fireBaseId: req.params.fireBaseId });

  if (!admin) {
    return next(new AppError("No admin found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      admin,
    },
  });
});

///UPDATE SPECIFIC ADMIN
exports.updateAdmin = catchAsync(async (req, res, next) => {
  const query = { fireBaseId: req.params.fireBaseId };
  const admin = await Admin.findOneAndUpdate(query, req.body, {
    new: true,
    runValidators: true,
  });

  if (!admin) {
    return next(new AppError("No admin found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { admin },
  });
});

/////
///GET ALL admins
exports.getAllAdmins = catchAsync(async (req, res, next) => {
  let search = req.query.search;

  const admins = await Admin.find({ name: new RegExp(search, "i") });
  const log = await Admin.aggregate([
    { $unwind: "$activityHistory" },
    {
      $group: {
        _id: "",
        logs: { $push: "$activityHistory" },
      },
    },
    { $project: { _id: 0 } },
    { $project: { activityHistory: "$$ROOT" } },
  ]);

  res.status(200).json({
    admins,
    log,
  });
});

exports.delAllLogs = catchAsync(async (req, res, next) => {
  const log = await Admin.updateMany({}, { $unset: { activityHistory: 1 } }, { multi: true });

  res.status(200).json({
    log,
  });
});
