const { query } = require("express");
const Client = require("../models/clientModel");
const Settings = require("../models/settingsModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

///CREATE NEW SETTINGS
exports.createSettings = catchAsync(async (req, res, next) => {
  const newSettings = await Settings.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      settings: newSettings,
    },
  });
});

///GET SETTINGS
exports.getSettings = catchAsync(async (req, res, next) => {
  const settings = await Settings.find();
  res.status(200).json({
    settings,
  });
});

///UPDATE SETTINGS
exports.updateSettings = catchAsync(async (req, res, next) => {
  const setting = await Settings.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!setting) {
    return next(new AppError("No setting found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    setting,
  });
});
