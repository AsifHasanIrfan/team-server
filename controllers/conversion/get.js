const Conversion = require("../../models/conversion");

module.exports = async (req, res) => {
  try {
    const conversion = await Conversion.findOne().sort({ createdAt: -1 });;
    res
      .json({
        data: conversion,
        message: "Successfully get all data",
        success: true,
      });
  } catch (error) { 
    res
      .json({
        error: error.message,
        message: "Failed to get conversion data",
        success: false
      })
  }
};