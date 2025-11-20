import mongoose from "mongoose";
import { app as server } from "./app.js";
import { db_name, mongo_uri, port } from "./constant.js";

mongoose.connect(mongo_uri, { dbName: db_name })
  .then(() => {
    console.log("DataBase connected successfull!");
    server.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
  }).catch((err) => {
    console.log("DataBase Connection error: ", err);
    process.exit(1);
  });
