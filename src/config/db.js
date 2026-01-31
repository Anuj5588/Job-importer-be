import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://anuj5588:8v4TnH2t9ca1QXsN@cluster0.flx0wkc.mongodb.net/import_logs?appName=Cluster0";


if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connected");
  return cached.conn;
};

export default connectDB;
