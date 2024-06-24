import mongoose from "mongoose";
import User from "../models/User.js";
import fs from "fs";
import db from "../db/mongo.js";

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("Connected to the database");

  // Read users.json file
  fs.readFile(
    "/Users/alanmalpartida/Documents/projects-2024/chat/server/data/master.json",
    "utf8",
    async (err, data) => {
      if (err) {
        console.error("Error reading users.json file:", err);
        return;
      }

      const users = JSON.parse(data);

      // Insert users into the database
      try {
        await User.insertMany(users);
        console.log("Users seeded successfully");
      } catch (err) {
        console.error("Error seeding users:", err);
      } finally {
        mongoose.connection.close();
      }
    }
  );
});
