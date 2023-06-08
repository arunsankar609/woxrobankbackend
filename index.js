import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import userRoute from "./routes/user.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/v1/users", userRoute);
connectDB(process.env.MONGO_URL);
app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
});
