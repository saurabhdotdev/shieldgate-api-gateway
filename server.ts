import "dotenv/config";

import "reflect-metadata";
import { app } from "./app";
import { AppDataSource } from "./db/data-source";

const PORT = 3000;

async function start() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`ShieldGate running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

start();
