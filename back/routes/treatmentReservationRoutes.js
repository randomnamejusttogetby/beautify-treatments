import express from "express";
import {
  createReservation,
  getMyReservations,
  getAllReservations,
  cancelReservationController,
  markAsCompletedController,
  getReservation
} from "../controllers/treatmentReservationController.js";
// import { protect, allowAccessTo } from "../controllers/authController.js";

const reservationRouter = express.Router();

// User routes (require authentication)
// reservationRouter.use(protect); // All routes require authentication

// Get user's own reservations
reservationRouter.get("/my-reservations", getMyReservations);

// Reserve a specific book
reservationRouter.post("/treatments/:treatmentId/reserve", createReservation);

// Cancel a reservation (users can only cancel their own)
reservationRouter.post("/:id/cancel", cancelReservationController);

// Get single reservation
reservationRouter.get("/:id", getReservation);

// Admin routes
reservationRouter.get("/", 
  // allowAccessTo("admin"), 
  getAllReservations);
reservationRouter.post("/:id/complete",
  //  allowAccessTo("admin"),
    markAsCompletedController);

export default reservationRouter; 