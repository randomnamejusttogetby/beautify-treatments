import { sql } from "../dbConnection.js";

// Create a new book
export const createTreatment = async (treatmentData) => {
  const allowed = [
    "title",
    "category",
    "start_time",
    "link_to_cover_image"
  ];
  
  // Filter only allowed fields
  const filteredData = {};
  for (const key of allowed) {
    if (treatmentData[key] !== undefined) {
      filteredData[key] = treatmentData[key];
    }
  }
  
  const columns = Object.keys(filteredData);
  const [treatment] = await sql`
    INSERT INTO Treatments ${sql(filteredData, columns)}
    RETURNING *`;
    
  return treatment;
};

// Get all treatments
export const getAllTreatments = async () => {
  const books = await sql`
    SELECT * FROM Treatments
    ORDER BY created_at DESC`;
  return books;
};

// Get treatment by ID
export const getTreatmentById = async (id) => {
  const [treatment] = await sql`
    SELECT * FROM Books b
    WHERE id = ${id}`;
  return treatment;
};

// Update treatment by ID
export const updateTreatment = async (id, updatedData) => {
  const allowed = [
    "title",
    "category",
    "start_time",
    "link_to_cover_image"
  ];
  
  const filteredData = {};
  for (const key of allowed) {
    if (updatedData[key] !== undefined) {
      filteredData[key] = updatedData[key];
    }
  }
  
  // Add updated timestamp
  filteredData.updated_at = new Date();
  
  const columns = Object.keys(filteredData);
  const [updTreatment] = await sql`
    UPDATE Treatments SET ${sql(filteredData, columns)}
    WHERE id = ${id}
    RETURNING *`;
  return updTreatment;
};

// Delete treatment by ID
export const deleteTreatment = async (id) => {
  const [deletedTreatment] = await sql`
    DELETE FROM Treatments 
    WHERE id = ${id}
    RETURNING *`;
  return deletedTreatment;
};

// Search treatments
export const searchTreatments = async (searchTerm) => {
  const treatments = await sql`
    SELECT *
    FROM Treatments b
    WHERE title ILIKE ${`%${searchTerm}%`}
    ORDER BY created_at DESC`;
  return treatments;
}; 