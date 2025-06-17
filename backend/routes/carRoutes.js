import express from "express";
import { addCar, getAllCars } from "../controllers/carControllers.js";


const router = express.Router();

router.post("/add", addCar);
router.get("/all", getAllCars);

export default router;