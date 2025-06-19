import pool from "../db.js";

export const addCar = async (req, res) => {
  const { name, color, price, model } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  console.log("Incoming car:", name, color, price, model, image);

  try {
    await pool.query(
      "INSERT INTO cars (name, color, price, model, image) VALUES ($1, $2, $3, $4, $5)",
      [name, color, price, model, image]
    );
    res.status(201).json({ message: "Car added" });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM cars");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
