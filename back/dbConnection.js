import postgres from "postgres";
import "dotenv/config";


const connectionString = `postgres://${process.env.DB_UNAME}:${process.env.DB_PW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sql = postgres(connectionString);

export { sql };
