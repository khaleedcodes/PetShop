import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

interface NewTransaction {
  productId: number;
  quantity: number;
  transactionType: string;
}

const CreateTransactionPage: React.FC = () => {
  const navigate = useNavigate(); // Used to redirect after successful creation

  const [formData, setFormData] = useState<NewTransaction>({
    productId: 0,
    quantity: 0,
    transactionType: "Received",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new transaction
      const response = await axiosInstance.post("/InventoryTransactions", formData);
      console.log("Transaction created:", response);
      navigate("/transactions"); // Redirect to transactions page after creation
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">💳 Create New Transaction</h1>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product ID Field */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Product ID</label>
              <input
                type="number"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                className="p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product ID"
                required
              />
            </div>

            {/* Quantity Field */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter transaction quantity"
                required
              />
            </div>

            {/* Transaction Type Field */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Transaction Type</label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Received">Received</option>
                <option value="Disbursed">Disbursed</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex gap-6 mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700"
              >
                Create Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTransactionPage;
