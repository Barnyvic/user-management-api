import app from "./app";
import dotenv from "dotenv";

import { dbConnection } from "./config/dbConfig";

dotenv.config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
