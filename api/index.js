/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { TransactionModel } from "./models/Transaction.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/api/test", (req, res) => {
  res.json("test okk");
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(
    process.env.MONGO_URL ||
      "mongodb+srv://money:GsMsQAMFMaO3jAF6@cluster0.zdk0fed.mongodb.net/?retryWrites=true&w=majority"
  );

  // console.log(process.env.MONGO_URL )

  const { name, description, datetime, price } = req.body;
  console.log(name, description, datetime, price, "payloard shanuu");
  const transaction = await TransactionModel.create({
    name,
    description,
    datetime,
    price,
  });
  res.status(201).json({ transaction: transaction, msg: "success" });
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(
    process.env.MONGO_URL ||
      "mongodb+srv://money:GsMsQAMFMaO3jAF6@cluster0.zdk0fed.mongodb.net/?retryWrites=true&w=majority"
  );
  const transactions = await TransactionModel.find();
  res.json(transactions);
});
app.listen(4040);
console.log("listening on http://localhost");

// GsMsQAMFMaO3jAF6
