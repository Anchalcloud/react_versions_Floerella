import express from "express";
import orderRouter from "./routes/orderRoute.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import dns from 'dns'
import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoute.js"

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

// Test API route
app.get("/", (req, res) => {
  res.send("Flower Shop Backend is Running 🌸");
});

// Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});