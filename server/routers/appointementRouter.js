const express = require('express')
const appointmentRouter = express.Router()
const { create, update } = require("../controllers/appointment.controller")




// appointmentRouter.get('/',)
appointmentRouter.put('/:id', update)
appointmentRouter.post('/add', create)










module.exports = appointmentRouter