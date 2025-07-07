import postgres from "postgres";
import { hashPw } from "./utils/hash.js";

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$$$ Configuration $$$$$$$$$
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const db = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_UNAME,
    password: process.env.DB_PW,
});

export const testDbConnection = async () => {
    try {
        await db`SELECT 1`;
        console.log("Connection to database established");
    } catch (error) {
        console.error("Couldn't establish database connection", error);
        throw new Error(error);
    }
};
