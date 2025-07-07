import express from "express";
import {
  newTreatment,
  getTreatments,
  getTreatment,
  editTreatment,
  removeTreatment,
  findTreatments
} from "../controllers/treatmentsController.js";
// import { allowAccessTo, protect } from "../controllers/authController.js";
import { validateNewTreatment } from "../validators/newTreatment.js";
import { validate } from "../validators/validate.js";

const treatmentsRouter = express.Router();

// Search books
treatmentsRouter.get("/search", findTreatments);

// Books list and creation
treatmentsRouter
  .route("/")
  .post(
    // protect, 
    // allowAccessTo("admin"), 
    validateNewTreatment,
    validate,
    newTreatment
  )
  .get(getTreatments);

treatmentsRouter
  .route("/:id")
  .get(getTreatment)

treatmentsRouter.route("/:id/delete").post(removeTreatment)
treatmentsRouter.route("/:id/edit").post(editTreatment)
export default treatmentsRouter; 