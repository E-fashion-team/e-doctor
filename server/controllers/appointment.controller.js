

const prisma = require('../prisma');

module.exports = {
    create: async (req, res) => {
        try {
            const response = await prisma.appointments.create({
                data: {
                    ...req.body,
                    createdAt: new Date(),
        updatedAt: new Date()
                }
            });
            res.json(response);
        } catch (error) {
            res.status(500).json(error); 
        }
    },
    update: async (req, res) => {
        try {
            const response = await prisma.appointments.update({
                where: { id: req.params.id },
                data: req.body,
            });
            res.status(201).json(response); 
        } catch (error) {
            res.status(500).json(error);
        }
    }
};






