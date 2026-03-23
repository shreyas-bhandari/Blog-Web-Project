const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/articleRoutes");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/", articleRoutes);

app.listen(5002, () => {
  console.log("Blog Service running on 5002");
});