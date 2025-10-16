require("dotenv").config();
const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>API</h1>");
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening at port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
