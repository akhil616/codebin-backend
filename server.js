require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const pasteRoutes = require("./routes/pasteRoutes");
const userRoutes = require("./routes/user");
const myPastesRoutes = require("./routes/myPastesRoutes");

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/mypastes", myPastesRoutes);
app.use("/api/pastes", pasteRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connect to db and listening on PORT: ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
