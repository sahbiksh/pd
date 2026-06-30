import { MongoClient, Db } from "mongodb";

declare global {
  var __mongoClient: MongoClient | undefined;
  var __mongoDb: Db | undefined;
  var __mongoConnected: boolean | undefined;
}

const MONGO_URL = process.env.MONGO_URL || "";
const MONGO_DB = process.env.MONGO_DB || "ai_solutions";

function createMongoClient() {
  if (!MONGO_URL) {
    throw new Error("Missing MONGO_URL environment variable");
  }
  return new MongoClient(MONGO_URL);
}

export const mongoClient = globalThis.__mongoClient || createMongoClient();
export const mongoDb = globalThis.__mongoDb || mongoClient.db(MONGO_DB);

if (!globalThis.__mongoClient) {
  globalThis.__mongoClient = mongoClient;
}
if (!globalThis.__mongoDb) {
  globalThis.__mongoDb = mongoDb;
}

// Ensure the client is connected before any DB operations
export async function ensureConnected(): Promise<void> {
  if (!globalThis.__mongoConnected) {
    await mongoClient.connect();
    globalThis.__mongoConnected = true;
  }
}
