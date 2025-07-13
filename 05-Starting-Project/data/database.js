// database.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;

let client;

export async function getDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    try {
      await client.connect();
      await client.db(dbName).command({ ping: 1 });
      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error);
      await client.close();
      client = null;
      throw error;
    }
  }
  return client.db(dbName);
}
