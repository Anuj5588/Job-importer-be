import express from "express";
import importJobs from "../services/jobImporter.service.js";
import ImportLog from "../models/ImportLog.js"; 

const router = express.Router();

router.post("/run", async (req, res) => {

  try {
    res.status(200).json({
      message: "Import started successfully",
    });
    await importJobs();

  } catch (err) {
    console.error("Import trigger failed:", err);
  }
});


router.get("/logs", async (req, res) => {
  try {
    const logs = await ImportLog.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
