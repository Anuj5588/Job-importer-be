import dotenv from 'dotenv'
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

console.log("ENV CHECK:", {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  REDIS_HOST: process.env.REDIS_HOST
});

const port = process.env.PORT || 8000

await connectDB();

app.listen(process.env.PORT || port, () => {
  console.log(`Server running on port ${process.env.PORT || port} `);
});
