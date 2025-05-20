import mongoose from "mongoose";
import { config } from "./config";
import app from "./index";

const DB: string = config.dbUrl!;

mongoose.connect(DB).then(() => {
  console.log("CONNECTED TO DB...");

  const port = config.port || 8000;
  app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}...`);
  });
});
