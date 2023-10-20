const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { CLIENT_RENEG_LIMIT } = require("tls");
const prisma = new PrismaClient();

const authProtection = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get the token from the header
            token = req.headers.authorization.split(" ")[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            
            // Get the user from the token
            if (decoded.PatientId) {
                console.log('decoded: ', decoded.PatientId);
                req.user = await prisma.patients.findUnique({
                    where: {
                        id: decoded.PatientId,
                    },
                    include: {
                        reports: true,
                        appointments: {
                            include: {
                                doctors: true,
                             
                            },
                        },
                        messages: true,
                       
                    },
                });
               
            } else if (decoded.DoctorId) {
                req.user = await prisma.doctors.findUnique({
                    where: {
                        id: decoded.DoctorId,
                    },
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
            }
          
            next();
            console.log('user: ', req.user);
        } catch (error) {
            // res.status(401).send("Not authorized");
            throw error
        }
    }

    if (!token) {
        res.status(401).send("Not authorized, no token");
    }
};

module.exports = {authProtection};
