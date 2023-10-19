const prisma = require("../prisma/prisma");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClientValidationError } = require("@prisma/client");

const addTimeAvailable = async (id) => {
  const arr = [
    "TIME_08_00",
    "TIME_09_00",
    "TIME_10_00",
    "TIME_11_00",
    "TIME_13_00",
    "TIME_14_00",
    "TIME_15_00",
    "TIME_16_00",
  ];
  const newTime = arr.map((e) => {
    return {
      DoctorId: id,
      time: e,
    };
  });
  const addTimesAvailable = await prisma.availability.createMany({
    data: newTime,
  });
};
module.exports.register = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const result = await prisma.doctors.create({
      data: {
        ...req.body,
        password: hashedPass,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    addTimeAvailable(result.id);
    res.status(201).json({
      message: "Doctor Created Successfully",
      result,
    });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      // Handle Prisma validation error
      res.status(400).json({
        message: "Validation error when creating a doctor",
        error: error.message,
      });
    } else {
      // Handle other unexpected errors
      res.status(500).json({
        message: "Error creating Doctor",
        error: error.message,
      });
    }
  }
};
module.exports.login = async (req, res) => {
  try {
    const doctor = await prisma.doctors.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Email not found",
      });
    }
    try {
      const passCheck = bcrypt.compare(req.body.password, doctor.password);
      if (!passCheck) {
        return res.status(400).json({
          message: "Passwords do not match",
        });
      }
      const token = jwt.sign(
        {
          doctorId: doctor.id,
          email: doctor.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Login Successful",
        doctorId: doctor.id,
        token,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Passwords do not match",
        error: err.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error during login",
      error,
    });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const result = await prisma.doctors.findMany({
      include: { availability: true },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getOne = async (req, res) => {
  try {
    console.log(req.body);
    const doctor = await prisma.doctors.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    console.log(doctor);
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports.deleteOne = async (req, res) => {
  try {
    const result = await prisma.doctors.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.updateOne = async (req, res) => {
  try {
    const result = await prisma.doctors.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getAvailableDoctors = async (req, res) => {
  try {
    const { department, time } = req.body;

    const response = await prisma.doctors.findMany({
      where: {
        department: department,

        availability: {
          some: {
            available: false,
            time: time,
          },
        },
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports.updateTimes = async (req, res) => {
  try {
    // const doctor = await prisma.doctors.findUnique({
    //   where: {
    //     id: req.body.id,
    //   },
    // });

    // if (!doctor) {
    //   return res.status(404).json({
    //     message: "Doctor not found",
    //   });
    // }

    const response = await prisma.availability.findFirst({
        where : {
          DoctorId: req.body.DoctorId , 
          time: req.body.time
        }
    })

  console.log(response);
  const updated = await prisma.availability.update({
    where : {
      id : response.id, 
    },
    data : {
      available : req.body.available
    }
  })
    res.status(200).json(updated);
  } catch (error) {
    throw error;
    res.status(500).json(error);
  }
};

module.exports.getByDepartment = async (req, res) => {
  try {
    const doctors = await prisma.doctors.findMany({
      where: {
        department: {
          contains: req.body.department,
        },
        name: {
          contains: req.body.name,
        },
      },
    });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json(error);
  }
};
