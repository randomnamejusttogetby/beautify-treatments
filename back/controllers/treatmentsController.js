import {
  createTreatment,
  getAllTreatments,
  getTreatmentById,
  updateTreatment,
  deleteTreatment,
  searchTreatments,
} from "../models/treatmentModel.js";

export const newTreatment = async (req, res, next) => {
  try {
    const treatmentData = req.body;
    const createdTreatment = await createTreatment(treatmentData);

    res.status(201).json({
      status: "success",
      data: createdTreatment,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to create treatment",
    });
  }
};

export const getTreatments = async (req, res, next) => {
  try {
    const treatments = await getAllTreatments();

    res.status(200).json({
      status: "success",
      data: treatments,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to fetch treatments",
    });
  }
};

export const getTreatment = async (req, res) => {
  try {
    const { id } = req.params;
    const treatment = await getTreatmentById(id);
    if (!treatment) {
      return res.status(404).json({
        status: "fail",
        message: "treatment not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: treatment,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to fetch treatment",
    });
  }
};

// Update treatment by ID
export const editTreatment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTreatment = await updateTreatment(id, updatedData);
    if (!updatedTreatment) {
      return res.status(404).json({
        status: "fail",
        message: "treatment not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: updatedTreatment,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to update treatment",
    });
  }
};

// Delete treatment by ID
export const removeTreatment = async (req, res) => {
  try {
    console.log(123)
    const { id } = req.params;
    const deletedTreatment = await deleteTreatment(id);
    if (!deletedTreatment) {
      return res.status(404).json({
        status: "fail",
        message: "treatment not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to delete treatment",
    });
  }
};

// Search treatments
export const findTreatments = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        status: "fail",
        message: "Search query is required",
      });
    }

    let treatments = await searchTreatments(q);

    res.status(200).json({
      status: "success",
      results: treatments.length,
      data: treatments,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "fail",
      message: "Failed to search treatments",
    });
  }
}; 