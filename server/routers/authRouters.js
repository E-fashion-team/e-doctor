const express = require("express");
const authRouter = express.Router();
const {
  handleLogout,
  handlePersistentLogin,
  handleRefreshToken,
  loginUser,
  registerNewUser,
} = require("../controllers/authController");

authRouter.post("/signup", registerNewUser);

authRouter.post("/login", loginUser);

authRouter.get("/refresh", handleRefreshToken);

authRouter.get("/login/persist", handlePersistentLogin);

authRouter.post("/logout", handleLogout);

module.exports = authRouter;
