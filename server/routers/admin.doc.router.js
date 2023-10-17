const express = require("express");


const {
    getAll,
    getOne,
    create,
    remove,
    update,
} = require("../controllers/admin.controllers.js");
const AdminDocRouter = express.Router();


// AdminDocRouter.get("/all", getAll);
// AdminDocRouter.get("/:id", getOne);
AdminDocRouter.post("/add", create);
AdminDocRouter.delete("/:id", remove);
AdminDocRouter.put("/:id", update);


module.exports =  AdminDocRouter
