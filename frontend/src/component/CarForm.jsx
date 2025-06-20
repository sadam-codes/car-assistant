import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { IoCarSport } from "react-icons/io5";
const CarForm = () => {
    const [car, setCar] = useState({
        name: "",
        color: "",
        price: "",
        model: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setCar({ ...car, image: file });
        setImagePreview(URL.createObjectURL(file));
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

            console.log("Car added:", res.data);
            toast.success("Car added successfully!");

            // 🧼 Clear form
            setCar({
                name: "",
                color: "",
                price: "",
                model: "",
                image: null,
            });
            setImagePreview(null);

        } catch (err) {
            console.error("Error:", err);
            toast.error("Failed to add car");
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br flex items-center justify-center p-0 m-0 "
        >
            <Toaster position="top-right" />

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white px-8 py-4 rounded-2xl shadow-xl space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 text-black">
                        <IoCarSport className="text-2xl" />
                    </span>
                    <span>Add a New Car</span>
                </h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Car Name"
                    value={car.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />

                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={car.color}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={car.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />

                <input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={car.model}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Car Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                        required
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-4 w-full h-48 object-cover rounded-xl border border-gray-200 shadow-sm"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition"
                >
                    Submit Car
                </button>
            </form>
        </motion.div>
    );
};

export default CarForm;
