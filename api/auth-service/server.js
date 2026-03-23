const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/", authRoutes);

app.listen(5001, () => {
  console.log("Auth Service running on 5001");
});