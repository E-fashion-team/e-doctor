

const prisma = require("../prisma/prisma")
module.exports.addMessage = async (req, res) => {
    try {
        const response = await prisma.messages.create({data:req.body})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
}