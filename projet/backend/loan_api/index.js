import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import dotenv from "dotenv";

// Routes
import LoanRouter from "./routes/Loan.js";
import requireAuth from "./middleware/requireAuth.js";

//Configs
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const port = process.env.PORT;
const url_db = process.env.DB_URL;

connect(url_db)
  .then(() => {
    console.log("Connected to Mongodb");
    app.listen(port, (err) => {
      if (err) console.log("Server not started");
      else console.log("Server started");
    });
  })
  .catch((err) => {
    console.log("Not Connected to Mongodb");
  });

// End points
app.use("/api/v1/loan", LoanRouter);
