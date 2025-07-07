import express from "express";
import "dotenv/config";

import {db, testDbConnection} from "./db.js";
import treatmentsRouter from "./routes/treatmentRoutes.js";
import userRouter from "./routes/userRoutes.js";
import reservationRouter from "./routes/treatmentReservationRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import cors from "cors";
import CookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.FE_API_URL,
    credentials: true
}));

app.use(CookieParser());
app.use(express.json());
// Treatments routes
app.use("/api/v1/treatments", treatmentsRouter);

// Treatment reservations routes
app.use("/api/v1/reservations", reservationRouter);

// Vartotojai
app.use("/api/v1/users", userRouter);

// Admin routes
app.use("/api/v1/admin", adminRouter);


try {
    await testDbConnection();

    app.listen(process.env.PORT,() => {
        console.log("Started on port", process.env.PORT, "!")
    });
} catch (error) {
    console.error(error);    
}
