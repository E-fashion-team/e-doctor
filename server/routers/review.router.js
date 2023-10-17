const express = require("express")
const {addReview,getAllReview} = require("../controllers/review.controllers")
const reviewRouter = express.Router()

reviewRouter.post("/addReview",addReview)
reviewRouter.get("/getAll/:docId",getAllReview)


module.exports = reviewRouter;