const express = require("express");
const {
    getAll,
    getOne,
    create,
    remove,
    update,
} = require("../controllers/admin.controllers.js");
const AdminPatientRouter = express.Router();
const authProtection = require("../midlwares/authmidalwre.js");


AdminPatientRouter.post("/add", create);
AdminPatientRouter.delete("/:id", remove);
AdminPatientRouter.put("/:id", update);

module.exports =  AdminPatientRouter
