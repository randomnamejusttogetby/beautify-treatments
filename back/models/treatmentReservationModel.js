import { sql } from "../dbConnection.js";

const table = "Treatment_Reservations";

// Reserve treatment
export const reserveTreatment = async (userId, treatmentId, notes = null) => {
  const [reservation] = await sql`
    INSERT INTO ${table} (user_id, treatment_id, notes)
    VALUES (${userId}, ${treatmentId}, ${notes})
    RETURNING *
  `;

  return reservation;

};

export const getExistingReservation = async(userId, treatmentId) => {
  const existingReservation = await sql`
    SELECT id FROM ${table} 
    WHERE user_id = ${userId} AND treatment_id = ${treatmentId} AND status = 'reserved'
  `;
  return existingReservation;
}

// Get user's reservations
export const getUserReservations = async (userId) => {
  const reservations = await sql`
    SELECT *
    FROM ${table} tr
    INNER JOIN Treatments t ON tr.treatment_id = t.id
    WHERE tr.user_id = ${userId}
    ORDER BY tr.reserved_at DESC
  `;

  return reservations;
};

// Get all reservations (admin only)
export const getReservations = async () => {
  const reservations = await sql`
    SELECT *
    FROM ${table} tr
    JOIN Treatments t ON tr.treatment_id = t.id
    JOIN Users u ON tr.user_id = u.id
    ORDER BY tr.reserved_at DESC
  `;

  return reservations;
};

// Cancel a reservation
export const cancelReservation = async (reservationId, userId) => {
  const [reservation] = await sql`
      UPDATE ${table} 
      SET status = 'cancelled', completed_at = CURRENT_TIMESTAMP
      WHERE id = ${reservationId} AND user_id = ${userId} AND status = 'reserved'
      RETURNING *
    `;
  return reservation;
};

// Mark reservation as completed (admin only)
export const markAsCompleted = async (reservationId) => {
  const [reservation] = await sql`
      UPDATE ${table} 
      SET status = 'completed', completed_at = CURRENT_TIMESTAMP
      WHERE id = ${reservationId} AND status = 'completed'
      RETURNING *
    `;

  return reservation;
};

// Get reservation by ID
export const getReservationById = async (reservationId) => {
  const [reservation] = await sql`
      SELECT *
      FROM ${table} tr
      JOIN Treatments t ON tr.book_id = t.id
      JOIN Users u ON tr.user_id = u.id
      WHERE tr.id = ${reservationId}
    `;

  return reservation;
};

export const rateReservedTreatment = async (reservationId, rating) => {
  const [ratedReservation] = await sql`
    UPDATE ${table} 
    SET rating = ${rating}
    WHERE id = ${reservationId}
    RETURNING *; 
    `
  return ratedReservation;
}