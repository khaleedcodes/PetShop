import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stockLevel: number;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get product id from URL
  const navigate = useNavigate(); // Used to redirect after successful update

  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Track if we are in edit mode
  const [isReplacing, setIsReplacing] = useState(false); // Track if we are replacing the entire product
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    category: "",
    price: 0,
    stockLevel: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get<Product>(`/Products/${id}`);
        setProduct(response.data);
        setFormData(response.data); // Pre-fill form with current product data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPut = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/Products/${id}`, formData);
      console.log(response)
      navigate("/");
    } catch (error) {
      console.error("Error replacing product:", error);
    }
  };

  const handleSubmitPatch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the PATCH request body
    const patchOperations = [];

    if (formData.name !== product?.name) {
      patchOperations.push({
        op: "replace",
        path: "/name",
        value: formData.name,
      });
    }
    if (formData.price !== product?.price) {
      patchOperations.push({
        op: "replace",
        path: "/price",
        value: formData.price,
      });
    }
    if (formData.stockLevel !== product?.stockLevel) {
      patchOperations.push({
        op: "replace",
        path: "/stockLevel",
        value: formData.stockLevel,
      });
    }

    try {
      await axiosInstance.patch(`/Products/${id}`, patchOperations, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsReplacing(false);
    setFormData({
      id: product?.id || 0,
      name: product?.name || "",
      category: product?.category || "",
      price: product?.price || 0,
      stockLevel: product?.stockLevel || 0,
    });
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/Products/${id}`);
      console.log(response)
      navigate("/"); // Redirect to the products page after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Show loading state until product data is fetched
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          📦 Product Details
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          {isEditing || isReplacing ? (
            <form
              onSubmit={isReplacing ? handleSubmitPut : handleSubmitPatch}
              className="space-y-6"
            >
              {/* Name Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              {/* Category Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product category"
                />
              </div>

              {/* Price Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product price"
                />
              </div>

              {/* Stock Level Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-700">Stock Level</label>
                <input
                  type="number"
                  name="stockLevel"
                  value={formData.stockLevel}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product stock level"
                />
              </div>

              <div className="flex gap-6 mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700"
                >
                  {isReplacing ? "Replace Product (PUT)" : "Save Changes (PATCH)"}
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
                {/* Product Image Placeholder */}
                <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-500">🛍️</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-500 text-sm">Category: {product.category}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p className="text-gray-400">Product ID</p>
                  <p className="font-medium text-gray-800">#{product.id}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p className="text-gray-400">Price</p>
                  <p className="font-medium text-green-600">${product.price.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p className="text-gray-400">Stock Level</p>
                  <p
                    className={`font-medium ${
                      product.stockLevel > 0 ? "text-blue-600" : "text-red-500"
                    }`}
                  >
                    {product.stockLevel}
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
                  Edit Product (PATCH)
                </button>
                <button
                  onClick={() => {
                    setIsReplacing(true);
                    setIsEditing(false);
                    setFormData({
                      id: 0,
                      name: "",
                      category: "",
                      price: 0,
                      stockLevel: 0,
                    }); // Reset the form for PUT request
                  }}
                  className="bg-green-500 text-white p-3 rounded-md shadow-md hover:bg-green-600"
                >
                  Replace Product (PUT)
                </button>
                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white p-3 rounded-md shadow-md hover:bg-red-700"
                >
                  Delete Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
