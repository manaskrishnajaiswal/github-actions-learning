import bodyParser from "body-parser";
import express from "express";

import eventRoutes from "./routes/events.js";
import { getDatabase } from "./data/database.js";

const app = express();

app.use(bodyParser.json());

app.use(eventRoutes);

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  await getDatabase();
});
