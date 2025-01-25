require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("./public"));

const authRoutes = require("./routes/authRoutes");
app.use("/api/v1", authRoutes);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
