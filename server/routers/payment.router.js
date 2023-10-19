const express = require('express');
const Router=express.Router()
const {Add}=require("../controllers/payment.controller")

Router.post("/payment", Add)


module.exports =Router