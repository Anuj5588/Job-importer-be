import "dotenv/config";
import { Worker } from "bullmq";
import redis from "../config/redis.js";
import connectDB from "../config/db.js";
import Job from "../models/job.js";

await connectDB();

new Worker(
  "job-import",
  async (job) => {
    const data = job.data;

    const result = await Job.updateOne(
      { externalId: data.externalId },
      { $set: data },
      { upsert: true }
    );

    return result.upsertedCount ? "new" : "updated";
  },
  {
    connection: redis,
    concurrency: 5
  }
);

console.log("Worker started");
