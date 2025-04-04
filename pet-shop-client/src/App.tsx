import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage"; // Correct import
import ProductDetailPage from "./pages/ProductDetailPage"; // Import ProductDetailPage

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} /> {/* Products page at root */}
        <Route
          path="/products/create" // Route for creating a new product
          element={<CreateProductPage />}
        />
        <Route
          path="/products/:id" // Dynamic route for the product details page
          element={<ProductDetailPage />} // Show product details based on the ID
        />
      </Routes>
    </Router>
  );
}

export default App;
