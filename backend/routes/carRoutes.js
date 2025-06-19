import express from "express";
import { addCar, getAllCars } from "../controllers/carControllers.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.single("image"), addCar);
router.get("/all", getAllCars);

export default router;
