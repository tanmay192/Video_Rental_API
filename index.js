const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const db = require("./db"); // Connecting to MongoDB

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.set("port", PORT);
app.set("env", NODE_ENV);

app.get("/", () => {
  console.log("Test successful");
});

app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get(
      "port"
    )} | Environment : ${app.get("env")}`
  );
});
