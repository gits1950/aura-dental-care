require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serves index.html, manifest.json, and sw.js from the public folder
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
const pool = mysql.createPool(process.env.DATABASE_URL || {
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'railway'
});

// API routes remain here...

// Ensures PWA routing works on all networks
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Aura Dental active on port ${PORT}`));