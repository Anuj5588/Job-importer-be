import mongoose from "mongoose";

const importLogSchema = new mongoose.Schema(
  {
    source: String,
    totalFetched: Number,
    totalImported: Number,
    newJobs: Number,
    updatedJobs: Number,
    failedJobs: Array
  },
  { timestamps: true }
);

export default mongoose.model("ImportLog", importLogSchema);
