import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

interface Transaction {
  id: number;
  productId: number;
  quantity: number;
  transactionDate: string;
  transactionType: string;
}

const TransactionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get transaction id from URL
  const navigate = useNavigate(); // Used to redirect after successful update

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Track if we are in edit mode
  const [isReplacing, setIsReplacing] = useState(false); // Track if we are replacing the entire transaction
  const [formData, setFormData] = useState<Transaction>({
    id: 0,
    productId: 0,
    quantity: 0,
    transactionDate: "",
    transactionType: "Received",
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axiosInstance.get<Transaction>(`/InventoryTransactions/${id}`);
        setTransaction(response.data);
        setFormData(response.data); // Pre-fill form with current transaction data
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSubmitPut = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/InventoryTransactions/${id}`, formData);
      console.log(response);
      navigate("/transactions");
    } catch (error) {
      console.error("Error replacing transaction:", error);
    }
  };

  const handleSubmitPatch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the PATCH request body
    const patchOperations = [];

    if (formData.productId !== transaction?.productId) {
      patchOperations.push({
        op: "replace",
        path: "/productId",
        value: formData.productId,
      });
    }
    if (formData.quantity !== transaction?.quantity) {
      patchOperations.push({
        op: "replace",
        path: "/quantity",
        value: formData.quantity,
      });
    }
    if (formData.transactionType !== transaction?.transactionType) {
      patchOperations.push({
        op: "replace",
        path: "/transactionType",
        value: formData.transactionType,
      });
    }

    try {
      await axiosInstance.patch(`/InventoryTransactions/${id}`, patchOperations, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      });
      navigate("/transactions");
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsReplacing(false);
    setFormData({
      id: transaction?.id || 0,
      productId: transaction?.productId || 0,
      quantity: transaction?.quantity || 0,
      transactionDate: transaction?.transactionDate || "",
      transactionType: transaction?.transactionType || "Received",
    });
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/InventoryTransactions/${id}`);
      console.log(response);
      navigate("/transactions"); // Redirect to transactions page after deletion
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  if (!transaction) {
    return <div>Loading...</div>; // Show loading state until transaction data is fetched
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">💳 Transaction Details</h1>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          {isEditing || isReplacing ? (
            <form
              onSubmit={isReplacing ? handleSubmitPut : handleSubmitPatch}
              className="space-y-6"
            >
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

              <div className="flex gap-6 mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700"
                >
                  {isReplacing ? "Replace Transaction (PUT)" : "Save Changes (PATCH)"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-600 text-white p-3 rounded-md shadow-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="text-center mb-6">
                {/* Transaction Image Placeholder */}
                <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-500">💳</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Transaction #{transaction.id}</h2>
                <p className="text-gray-500 text-sm">Product ID: {transaction.productId}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p className="text-gray-400">Quantity</p>
                  <p className="font-medium text-gray-800">{transaction.quantity}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p className="text-gray-400">Transaction Type</p>
                  <p className="font-medium text-blue-600">{transaction.transactionType}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p className="text-gray-400">Transaction Date</p>
                  <p className="font-medium text-gray-800">
                    {new Date(transaction.transactionDate).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 mt-8">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setIsReplacing(false);
                  }}
                  className="bg-yellow-500 text-white p-3 rounded-md shadow-md hover:bg-yellow-600"
                >
                  Edit Transaction (PATCH)
                </button>
                <button
                  onClick={() => {
                    setIsReplacing(true);
                    setIsEditing(false);
                    setFormData({
                      id: 0,
                      productId: 0,
                      quantity: 0,
                      transactionDate: "",
                      transactionType: "Received",
                    }); // Reset the form for PUT request
                  }}
                  className="bg-green-500 text-white p-3 rounded-md shadow-md hover:bg-green-600"
                >
                  Replace Transaction (PUT)
                </button>
                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white p-3 rounded-md shadow-md hover:bg-red-700"
                >
                  Delete Transaction
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
