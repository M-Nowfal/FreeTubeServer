import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { app as server } from "./app.js";

mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("DataBase connected successfull!");
    const PORT = process.env.PORT;
    server.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
  }).catch((err) => {
    console.log("DataBase Connection error: ", err);
    process.exit(1);
  });
