import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./index";

dotenv.config();

const DB: string = process.env.DB_URL!;

mongoose.connect(DB).then(() => {
  console.log("CONNECTED TO DB...");

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}...`);
  });
});
