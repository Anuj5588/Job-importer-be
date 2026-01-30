import dotenv from 'dotenv'
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

console.log("-----",)
const port = process.env.PORT || 8000

await connectDB();

app.listen(process.env.PORT || port, () => {
  console.log(`Server running on port ${process.env.PORT || port} `);
});
