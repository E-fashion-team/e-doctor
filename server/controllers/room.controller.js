const prisma = require("../prisma/prisma");

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
      where: { PatientId: req.params.patId },
      include: {
       
                doctors: true,
                patients: true,
                messages: true,
                
    
    }})
    res.status(200).json(patRooms);
  } catch (error) {
    res.json(error);
  }
};
module.exports.getAllRoomsForDoctor = async (req, res) => {
  try {
    const docRooms = await prisma.rooms.findMany({
      where: { DoctorId: req.params.docId },
      include: { patients: true, doctors: true },
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
}