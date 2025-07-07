import {
  reserveTreatment,
  getUserReservations,
  getReservations,
  cancelReservation,
  markAsCompleted,
  getReservationById,
  rateReservedTreatment,
  getExistingReservation
} from "../models/treatmentReservationModel.js";

export const createReservation = async (req, res) => {
  try {
    const treatmentId = req.params.treatmentId;
    const userId = req.user?.id;
    const { notes } = req.body;

    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "User not authenticated"
      });
    }

    if (getExistingReservation(userId, treatmentId).length > 0){
      return res.status(400).json({
        status: "fail",
        message: "You have already reserved this treatment"
      });
    }
    const reservation = await reserveTreatment(userId, treatmentId, notes);

    res.status(201).json({
      status: "success",
      data: reservation
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Failed to create reservation"
    });
  }
};

export const getMyReservations = async (req, res) => {
  try {
    console.log(req.user)
    const userId = req.user?.id;

    console.log(req.user)
    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "User not authenticated"
      });
    }

    const reservations = await getUserReservations(userId);

    res.status(200).json({
      status: "success",
      results: reservations.length,
      data: reservations 
    });
  } catch (error) {
    console.error("Error getting user reservations:", error);
    res.status(500).json({
      status: "fail",
      message: "Failed to fetch reservations"
    });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await getReservations();

    res.status(200).json({
      status: "success",
      results: reservations.length,
      data: reservations
    });
  } catch (error) {
    console.error("Error getting all reservations:", error);
    res.status(500).json({
      status: "fail",
      message: "Failed to fetch reservations"
    });
  }
};

export const cancelReservationController = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "User not authenticated"
      });
    }

    const cancelledReservation = await cancelReservation(reservationId, userId);

    res.status(200).json({
      status: "success",
      data: cancelledReservation
    });
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Failed to cancel reservation"
    });
  }
};

export const markAsCompletedController = async (req, res) => {
  try {
    const reservationId = req.params.id;

    const completedReservation = await markAsCompleted(reservationId);

    res.status(200).json({
      status: "success",
      data: completedReservation 
    });
  } catch (error) {
    console.error("Error marking reservation as completed:", error);
    res.status(500).json({
      status: "fail",
      message: error.message || "Failed to mark as completed"
    });
  }
};

export const getReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "User not authenticated"
      });
    }

    const reservation = await getReservationById(reservationId);

    if (!reservation) {
      return res.status(404).json({
        status: "fail",
        message: "Reservation not found"
      });
    }

    // Users can only see their own reservations, admins can see all
    if (userRole !== 'admin' && reservation.user_id !== userId) {
      return res.status(403).json({
        status: "fail",
        message: "Access denied"
      });
    }

    res.status(200).json({
      status: "success",
      data: 
        reservation
      
    });
  } catch (error) {
    console.error("Error getting reservation:", error);
    res.status(500).json({
      status: "fail",
      message: "Failed to fetch reservation"
    });
  }
};

// TODO
export const rateReservation = async (req, res, next) => {
  try {
    rateReservedTreatment
  } catch (error) {

  }
}
