const express = require('express');
const docLocRouter = express.Router()
const {create,getAll} = require("../controllers/doctorlocation.controller");
docLocRouter.get("/getAll", getAll)
docLocRouter.post("/addlocdoc",create);
module.exports =docLocRouter