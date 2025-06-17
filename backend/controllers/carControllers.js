import pool from "../db.js";

export const addCar = async (req, res) => {
    const { name, color, price, model } = req.body;
    try {
        await pool.query(
            "INSERT INTO cars (name, color, price, model) VALUES ($1, $2, $3, $4)",
            [name, color, price, model]
        );
        res.status(201).json({ message: "Car added" });
    } catch (err) {
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
