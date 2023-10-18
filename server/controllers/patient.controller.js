// 

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../prisma/prisma")

module.exports.register = async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const result = await prisma.
        patients.create({
            data: {
                ...req.body,
                password: hashedPass,
                createdAt: new Date(),
        updatedAt: new Date()
            },
        });
        res.status(201).json({
            message: "User Created Successfully",
            result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating User",
            error,
        });
    }
};

module.exports.login = async (req, res) => {
    try {
        const patient = await prisma.patients.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (!patient) {
            return res.status(404).json({
                message: "Email not found",
            });
        }

        const passCheck =  bcrypt.compare(req.body.password, patient.password);

        if (!passCheck) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        const token = jwt.sign(
            {
                PatientId: patient.id,
                email: patient.email,
            },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login Successful",
            PatientId: patient.id,
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
        const result = await prisma.patients.findMany({
            include: {
                reports: true,
                appointments: {
                    include: {
                        doctors: true,
                        rooms: true,
                    },
                },
                messages: true,
                rooms: true,
            },
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.getOne = async (req, res) => {
  res.status(200).send(req.user);
};

module.exports.remove = async (req, res) => {
    try {
        const patientId = req.params.id;
        const result = await prisma.patients.delete({
            where: {
                id: patientId,
            },
        });

        if (result===1) {
            res.status(200).json({ message: "Patient removed successfully." });
        } else {
            res.status(404).json({ error: "Patient not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports.Update = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await prisma.patients.update({
            where: {
                id: id,
            },
            data: req.body,
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
