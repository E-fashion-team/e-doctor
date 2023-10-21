const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prisma");


const authProtection = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    
  ) {
    try {
      // Get token fron header
      token = req.headers.authorization.split(" ")[1];

      //Verify token
     
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
      //Get User from the token
      console.log(decoded,"decoded ")
      if (decoded.PatientId) {
        req.user = await prisma.patients.findUnique( {where:{
          id: decoded.PatientId,
        }
        ,include:{appointments: true}
      }

        );
       
      } else {
        req.user = await prisma.doctors.findUnique(
          
          {where:{
            id: decoded.doctorId,
          },include:{appointments:{
            include: { patients:true
          
          }}
            ,reports:true,reviews:true}}
        
        ); 
      }
      console.log(req.user,"user")
      next();
    } catch (error) {
      res.status(401);
      console.log(error)
      res.send("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    res.send("Not authorized,no token ");
  }
};
module.exports = {authProtection};
