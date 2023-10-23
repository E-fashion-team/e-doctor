var db = require("../prisma/prisma");


    module.exports.makeRoom = async (req, res) => {
      try {
        const aRoom = await prisma.rooms.create({ data: req.body });
        res.status(200).json(aRoom);
      } catch (error) {
        res.json(error);
      }
    };
    
    module.exports.getAllRoomsForPatient = async (req, res) => {
      try {
        const patRooms = await prisma.rooms.findMany({
          where: { PatientId: parseInt(req.params.patId) },
          include: {
            messages: true,
            doctors: {
              select: {
                avatarUrl: true,
                name: true,
                id: true,
              },
            },
            patients: {
              select: {
                avatarUrl: true,
                name: true,
                id: true,
              },
            },
          },
        });
        res.status(200).json(patRooms);
      } catch (error) {
        throw error;
      }
    };
    module.exports.getAllRoomsForDoctor = async (req, res) => {
      try {
        const docRooms = await prisma.rooms.findMany({
          where: { DoctorId: parseInt(req.params.docId) },
          include: {
            messages: true,
            doctors: {
              select: {
                avatarUrl: true,
                name: true,
                id: true,
              },
            },
            patients: {
              select: {
                avatarUrl: true,
                name: true,
                id: true,
              },
            },
          },
        });
        res.status(200).json(docRooms);
      } catch (error) {
        res.json(error);
      }
    };
    module.exports.getByRoomId = async (req, res) => {
      try {
        const docRooms = await prisma.rooms.findUnique({
          where: { id: req.params.id },
          include: { patients: true, doctors: true },
        });
        res.status(200).json(docRooms);
      } catch (error) {
        res.json(error);
      }
    };
    
   



