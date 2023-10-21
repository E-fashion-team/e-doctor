const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patient.controller.js");
const {authProtection} = require("../midlwares/authmidalwre.js");

patientRouter.get("/getAll", patientController.getAll);
patientRouter.get("/getOne", authProtection,patientController.getOne);
patientRouter.put("/:id",patientController.Update)
patientRouter.delete("/:id", patientController.remove);
patientRouter.post("/login", patientController.login);
patientRouter.post("/register", patientController.register);
module.exports = patientRouter;
