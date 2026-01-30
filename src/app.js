import express from "express";
import cors from "cors";
import importRoutes from "./routes/import.routes.js";


const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/imports", importRoutes);

export default app;
