import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chatRoute.js";
import carRoute from "./routes/carRoutes.js";
import serverless from "serverless-http";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", chatRoute);
app.use("/api/cars", carRoute);

// ❌ Don't use app.listen
// ✅ Export the app for serverless
export const handler = serverless(app);
