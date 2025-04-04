import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance"; // Import your axios instance

function CreateProductPage() {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: 0,
    stockLevel: 0,
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use axios to send a POST request
      const response = await axiosInstance.post("/api/Products", productData, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      });

      if (response.status === 201) {
        setResponseMessage("Product created successfully!");
      } else {
        setResponseMessage("Failed to create product.");
      }
    } catch (error) {
      setResponseMessage("An error occurred while creating the product: ");
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Create Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product category"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product price"
          />
        </div>

        <div>
          <label
            htmlFor="stockLevel"
            className="block text-sm font-medium text-gray-700"
          >
            Stock Level
          </label>
          <input
            type="number"
            id="stockLevel"
            name="stockLevel"
            value={productData.stockLevel}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter stock level"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Create Product
          </button>
        </div>
      </form>

      {responseMessage && (
        <p
          className={`mt-4 text-center text-sm ${
            responseMessage.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
}

export default CreateProductPage;
