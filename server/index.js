require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const cors = require("cors")
const { Server } = require("socket.io")
const paymentRouter = require("./routers/payment.router.js")
const PORT = process.env.PORT || 5000
const patientRouter = require("./routers/patient.router.js")
const doctorRouter = require("./routers/doctor.router.js")
const reviewRouter = require("./routers/review.router")
const route = require("./routers/room.router")
const appointmentRouter = require("./routers/appointementRouter.js")
const AdminDocRouter = require("./routers/admin.doc.router.js")
const AdminPatientRouter = require("./routers/admin.patient.router.js")
const messageRouter = require("./routers/message.Router")
const doctorLocationRouter=require("./routers/doctorlocation.router.js")
app.use(cors())
app.use("./get",paymentRouter)
app.use(express.json())
app.use("/api/doctor/", doctorRouter);
app.use("/api/patient/", patientRouter);
app.use("/api/review", reviewRouter)
app.use("/api/room", route)
app.use("/api/appointment/", appointmentRouter)
app.use("/api/AdminDoc/", AdminDocRouter);
app.use("/api/AdminPatient/", AdminPatientRouter);
app.use("/api/message/",messageRouter)

app.use("/api/docloc/",doctorLocationRouter)



const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT","DELETE"],
    }
})



// http.listen(PORT, () => console.log(`listening on ${PORT}`))



io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    //sends the message to all the users on the server
    socket.on('message', (data) => {
        console.log('this is from back', data)
        io.emit('messageResponse', data);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});
server.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});













