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
const appointmentRouter = require("./routers/appointementRouter.js")
const AdminDocRouter = require("./routers/admin.doc.router.js")
const AdminPatientRouter = require("./routers/admin.patient.router.js")
const messageRouter = require("./routers/messages.Router.js")
const usersRouter = require('./routers/users.router.js')
const conversationsRouter = require('./routers/room.router')
const router = require('./routers/authRouters.js')
const { authProtection } = require('./midlwares/authmidalwre.js')
const authRouter = require('./routers/authRouters.js')
const messagesRouter = require('./routers/messages.Router.js')

app.use(cors())
app.use("./get",paymentRouter)
app.use(express.json())
app.use("/api/doctor/", doctorRouter);
app.use("/api/patient/", patientRouter);
app.use("/api/review/", reviewRouter)
app.use("/api/room/", conversationsRouter)
app.use("/api/appointment/", appointmentRouter)
app.use("/api/AdminDoc/", AdminDocRouter);
app.use("/api/AdminPatient/", AdminPatientRouter);
app.use("/api/message/",messagesRouter)
app.use("/api/user/", usersRouter)
app.use("/api/auth", authRouter)

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT"]
    }
})



// http.listen(PORT, () => console.log(`listening on ${PORT}`))

const activeUsers = new Set();

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  activeUsers.add(parseInt(id));
  io.to(socket.id).emit("online-users", Array.from(activeUsers));
  socket.broadcast.emit("user-connected", parseInt(id));

  socket.on("send-message", ({ id, authorId, recipientId, conversationId, message, timeSent }) => {
    socket.broadcast.to(recipientId.toString()).emit("receive-message", {
      id,
      authorId,
      recipientId,
      conversationId,
      message,
      timeSent,
    });
  });

  socket.on("disconnect", () => {
    activeUsers.delete(parseInt(id));
    socket.broadcast.emit('🔥: A user disconnected', parseInt(id));
  });
});


server.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});













