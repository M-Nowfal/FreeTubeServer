import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT;
export const mongo_uri = process.env.MONGO_URI;
export const db_name = process.env.DB_NAME;
export const allowed_origin = process.env.ALLOWED_ORIGIN;