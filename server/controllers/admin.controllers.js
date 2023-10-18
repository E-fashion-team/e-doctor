const prisma = require('../prisma');

const doctorsController = {
  getAll: async (req, res) => {
    try {
      const result = await prisma.doctors.findMany({
        include: { all: true, nested: true },
      });
      res.json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const result = await prisma.doctors.create({
        data: req.body,
      });
      res.json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getOne: async (req, res) => {
    try {
      const result = await prisma.doctors.findUnique({
        where: { id: req.params.id },
        include: { all: true, nested: true },
      });
      if (result) {
        res.json(result);
      } else {
        res.status(404).send("Doctor not found.");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },

  remove: async (req, res) => {
    try {
      const result = await prisma.doctors.delete({
        where: { id: req.params.id },
      });
      res.json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    const { isVerified } = req.body;

    try {
      const result = await prisma.doctors.update({
        where: { id: req.params.id },
        data: { isVerified: isVerified },
      });
      res.json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = doctorsController;
