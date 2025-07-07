import argon2 from "argon2";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../models/userModel.js";

// Funkcija JWT tokenui generuoti
const signToken = (id) => {
  // if (!process.env.JWT_SECRET) {
  //   throw new Error("JWT_SECRET is not defined in the environment variables.");
  // }
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d", // Numatytasis galiojimo laikas
  });
};

// Funkcija JWT tokenui įrašyti į slapuką
const sendTokenCookie = (token, res) => {
  const expiresInDays = process.env.JWT_COOKIE_EXPIRES_IN
    ? parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10)
    : 7; // Numatytasis galiojimo laikas - 7 dienos

  const cookieOptions = {
    expires: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
};

// Registracijos funkcija
export const signup = async (req, res, next) => {
  try {
    const { password, ...newUser } = req.body;

    if (!password) {
      throw new AppError("Password is required", 400);
    }

    const hash = await argon2.hash(password);
    newUser.password = hash;

    // Sukuriame vartotoją
    const createdUser = await createUser(newUser);

    if (!createdUser) {
      throw new AppError("User not created", 400);
    }

    const { id, email, role } = createdUser;
    const token = signToken(id);
    sendTokenCookie(token, res);

    res.status(201).json({
      status: "success",
      token,
      data: {
        userId: id,
        email,
        role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Prisijungimo funkcija
export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const user = await getUserByEmail(email);
    
    console.log(user)

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new AppError("Incorrect email or password", 401);
    }

    const token = signToken(user.id);
    sendTokenCookie(token, res);

    delete(user.password);

    res.status(200).json({
      status: "success",
      data: { userId: user.id, email: user.email, role: user.role, status: user.status },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Middleware funkcija vartotojo apsaugai
// export const protect = async (req, res, next) => {
//   try {
//     const token = req.cookies?.jwt;
//     console.log("JWT Token from cookies:", token);
//     console.log("All cookies:", req.cookies);
    

//     if (!token) {
//       console.log("No JWT token found in cookies");
//       throw new AppError(
//         "You are not logged in. Please log in to get access.",
//         401
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded JWT:", decoded);
    
//     const currentUser = await getUserById(decoded.id);
//     console.log("Current user from DB:", currentUser);

//     if (!currentUser) {
//       throw new AppError(
//         "The user belonging to this token does no longer exist.",
//         401
//       );
//     }
    
//     req.user = currentUser;
//     console.log("User authenticated successfully:", currentUser.id);
//     next();
//   } catch (error) {
//     console.log("Authentication error:", error.message);
//     next(error);
//   }
// };

// Middleware funkcija prieigos valdymui pagal roles
export const allowAccessTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new AppError(
          "You do not have permission to perform this action",
          403
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Atsijungimo funkcija
export const logout = (req, res, next) => {
  try {
    res.clearCookie("jwt").status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Gauti autentifikuoto vartotojo informaciją
export const getAuthenticatedUser = (req, res, next) => {
  try {
    // if (!req.user) {
    //   throw new AppError("No authenticated user found.", 401);
    // }

    if (!req.user) return;
    const { password, ...userWithoutPassword } = req.user;

    res.status(200).json({
      status: "success",
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};