require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const pool = mysql.createPool(process.env.DATABASE_URL || {
  host: process.env.DB_HOST || process.env.MYSQLHOST,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "railway",
});

// Example test API
app.get("/api/test", (req, res) => {
  res.json({ message: "Aura Dental API running" });
});

// Catch-all route for PWA / frontend
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Aura Dental active on port ${PORT}`);
});