const express = require("express");


const {
    getAll,
    getOne,
    create,
    remove,
    update,
} = require("../controllers/admin.controllers.js");
const AdminDocRouter = express.Router();

AdminDocRouter.post("/add", create);
AdminDocRouter.delete("/:id", remove);
AdminDocRouter.put("/:id", update);


module.exports =  AdminDocRouter
