import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { FaDollarSign, FaBoxOpen, FaFilter } from "react-icons/fa"; // Example of React Icons

interface Product {
  id: number;
  name: string;
  price: number;
  stockLevel: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("priceAsc");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<Product[]>("/Products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle sort and filter changes
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort);
    applyFiltersAndSort(selectedSort);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = event.target.value;
    applyFiltersAndSort(sortBy, filterValue);
  };

  const applyFiltersAndSort = (
    sortOption: string,
    filterValue: string = ""
  ) => {
    let filteredList = [...products];

    // Apply stock filter (if any)
    if (filterValue === "inStock") {
      filteredList = filteredList.filter(
        (product) => product.stockLevel >= 1 // Filter for products with stock >= 1
      );
    } else if (filterValue === "outOfStock") {
      filteredList = filteredList.filter(
        (product) => product.stockLevel === 0 // Filter for products with stock = 0
      );
    }

    // Apply sorting based on selected sort option
    switch (sortOption) {
      case "priceAsc":
        filteredList.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        filteredList.sort((a, b) => b.price - a.price);
        break;
      case "stockAsc":
        filteredList.sort((a, b) => a.stockLevel - b.stockLevel);
        break;
      case "stockDesc":
        filteredList.sort((a, b) => b.stockLevel - a.stockLevel);
        break;
      default:
        break;
    }

    setFilteredProducts(filteredList);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          📦 Product Inventory
        </h1>

        {/* Filters and Sorters */}
        <div className="flex justify-between items-center mb-6 space-x-4">
          <div className="flex gap-4 items-center">
            <FaFilter className="text-gray-600 text-xl" />

            {/* Sort By Dropdown */}
            <select
              onChange={handleSortChange}
              value={sortBy}
              className="p-2 rounded-md border border-gray-300 flex items-center"
            >
              <option value="priceAsc">
                <FaDollarSign className="mr-2" />
                Sort by Price (Low to High)
              </option>
              <option value="priceDesc">
                <FaDollarSign className="mr-2" />
                Sort by Price (High to Low)
              </option>
              <option value="stockAsc">
                <FaBoxOpen className="mr-2" />
                Sort by Stock (Low to High)
              </option>
              <option value="stockDesc">
                <FaBoxOpen className="mr-2" />
                Sort by Stock (High to Low)
              </option>
            </select>

            {/* Filter by Stock Level */}
            <select
              onChange={handleFilterChange}
              className="p-2 rounded-md border border-gray-300"
            >
              <option value="">Filter by Stock Level</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center text-xl text-gray-500">
            <div className="animate-spin h-8 w-8 border-4 border-t-4 border-blue-600 rounded-full"></div>
            <span className="ml-4">Loading Products...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                to={`/products/${product.id}`} // Link to product detail page
                key={product.id}
                className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow border border-gray-200"
              >
                <div className="flex flex-col items-center">
                  {/* Product Image Placeholder */}
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-6 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-400">🛍️</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4 text-center">
                    Product ID: #{product.id}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <p className="text-gray-400">Price</p>
                    <p className="font-medium text-green-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <p className="text-gray-400">Stock</p>
                    <p
                      className={`font-medium ${
                        product.stockLevel > 0
                          ? "text-blue-600"
                          : "text-red-500"
                      }`}
                    >
                      {product.stockLevel}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Product Button */}
      <Link
        to="/products/create"
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center"
      >
        <span className="text-2xl font-bold">+</span>
      </Link>
    </div>
  );
};

export default ProductsPage;
