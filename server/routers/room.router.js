const express = require('express');

const { makeRoom, getAllRoomsForPatient, getAllRoomsForDoctor ,getByRoomId , del} = require("../controllers/room.controller")

const conversationsRouter = express.Router();
conversationsRouter.post("/makeRoom", makeRoom)
conversationsRouter.get("/getAllPat/:patId", getAllRoomsForPatient)
conversationsRouter.get("/getAllDoc/:docId", getAllRoomsForDoctor)
conversationsRouter.get("/OneRoom/:id", getByRoomId)
module.exports = conversationsRouter;
