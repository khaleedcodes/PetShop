import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: 0,
    stockLevel: 0,
  });
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the product form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/Products", productData);
      setConfirmationMessage("Product added successfully!"); // Show confirmation message
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Handle confirmation and redirect
  const handleConfirm = () => {
    setConfirmationMessage(null); // Clear confirmation message
    navigate("/"); // Redirect to the ProductsPage
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          🛒 Add New Product
        </h1>

        {confirmationMessage ? (
          <div className="bg-green-100 border border-green-500 text-green-800 p-4 rounded-md mb-6 text-center">
            <p>{confirmationMessage}</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
              onClick={handleConfirm}
            >
              Go to Products
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-gray-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label htmlFor="stockLevel" className="block text-gray-700">
                Stock Level
              </label>
              <input
                type="number"
                id="stockLevel"
                name="stockLevel"
                value={productData.stockLevel}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
            >
              Add Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateProductPage;
