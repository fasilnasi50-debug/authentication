
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Initialize Firebase Admin and validate the service-account configuration.
require("./config/firebase");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Firebase Auth API is running."
  });
});

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found."
  });
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
