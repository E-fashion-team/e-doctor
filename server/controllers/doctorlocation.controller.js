const prisma = require("../prisma/prisma")

module.exports.create=async (req, res) => {
        try {
            const response = await prisma.doctorLocations.create({
                data: {
                 ...req.body
                },
              })
            res.json(response);
        } catch (error) {
           throw (error)
        }
    },
    module.exports.getAll = async (req, res) => {
        try {
          const result = await prisma.doctorLocations.findMany();
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
      }








