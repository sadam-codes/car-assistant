import React, { useState } from "react";
import axios from "axios";

const CarForm = () => {
    const [car, setCar] = useState({
        name: "",
        color: "",
        price: "",
        model: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value });
    };

    const handleImage = (e) => {
        setCar({ ...car, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", car.name);
        formData.append("color", car.color);
        formData.append("price", car.price);
        formData.append("model", car.model);
        formData.append("image", car.image);

        try {
            const res = await axios.post("http://localhost:4000/api/cars/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });


            console.log("✅ Car added:", res.data);
            alert("✅ Car added successfully!");
        } catch (err) {
            console.error("❌ Error:", err);
            alert("❌ Failed to add car");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white rounded-xl shadow space-y-4"
        >
            <h2 className="text-xl font-semibold text-center">Add Car Details</h2>

            <input
                type="text"
                name="name"
                placeholder="Car Name"
                value={car.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
            />

            <input
                type="text"
                name="color"
                placeholder="Color"
                value={car.color}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
            />

            <input
                type="number"
                name="price"
                placeholder="Price"
                value={car.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
            />

            <input
                type="text"
                name="model"
                placeholder="Model"
                value={car.model}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
            />

            <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full"
                required
            />

            <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 rounded-md"
            >
                Submit
            </button>
        </form>
    );
};

export default CarForm;
