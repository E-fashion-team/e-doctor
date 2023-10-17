const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const result = await prisma.doctors.create({
      data: {
        ...req.body,
        password: hashedPass,
      },
    });
    res.status(201).json({
      message: "Doctor Created Successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating Doctor",
      error,
    });
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
  } catch (error) {
    res.status(500).json({
      message: "Error during login",
      error,
    });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const result = await prisma.doctors.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getOne = async (req, res) => {
  try {
    const doctor = await prisma.doctors.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
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
    const { Department, Time } = req.body;
    const response = await prisma.doctors.findMany({
      where: {
        department: {
          contains: Department,
        },
        schedule: {
          contains: Time,
        },
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.updateTimes = async (req, res) => {
  try {
    const doctor = await prisma.doctors.findUnique({
      where: {
        id: req.body.id,
      },
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    const newSchedule = doctor.schedule.filter((sch) => sch !== req.body.time);
    const response = await prisma.doctors.update({
      where: {
        id: req.body.id,
      },
      data: {
        schedule: newSchedule,
      },
    });

    res.status(200).json(response);
  } catch (error) {
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