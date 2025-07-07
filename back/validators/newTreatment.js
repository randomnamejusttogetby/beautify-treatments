import { body } from "express-validator";

export const validateNewTreatment = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 255 })
    .withMessage("Title must be between 2 and 255 characters"),
    
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ min: 2, max: 255 })
    .withMessage("Title must be between 2 and 255 characters"),
  ,
  body("start_time")
    .notEmpty()
    .withMessage("Time is required")
    .isTime()
    .withMessage("Not time")
  ,
  body("link_to_cover_image")
    .optional()
    .isURL()
    .withMessage("Cover image must be a valid URL")
  ,
]; 