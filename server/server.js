// create express app
import express from "express";
import cors from "cors";
import routes from "./controllers/index.js";
import db from "./config/connection.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "dist/your-angular-app")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/your-angular-app/index.html"));
});

// Database connection event handling
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await db.close();
  process.exit(0);
});
