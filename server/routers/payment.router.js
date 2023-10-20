const express = require('express');
const Router=express.Router()
const {Add}=require("../controllers/payment.controller")

// Router.post("/payment", Add)
Router.post("/:amount", Add)


module.exports =Router