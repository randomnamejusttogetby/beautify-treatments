import express from "express";
import {
  login,
  logout,
  signup,
  // protect,
  getAuthenticatedUser,
} from "../controllers/authController.js";
import { validateLogin } from "../validators/login.js";
import { validateNewUser } from "../validators/signup.js";
import { validate } from "../validators/validate.js";

const userRouter = express.Router();

// Registracija
userRouter.post("/signup", validateNewUser, validate, signup);

// Prisijungimas
userRouter.post("/login", login);

// Atsijungimas (tik prisijungusiam vartotojui)
userRouter.post("/logout", logout);

// Gauti prisijungusio vartotojo duomenis (tik prisijungusiam)
userRouter.get("/me", getAuthenticatedUser);

export default userRouter;