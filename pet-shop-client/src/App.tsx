import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage"; // Correct import
import ProductDetailPage from "./pages/ProductDetailPage"; // Import ProductDetailPage
import TransactionsPage from "./pages/TransactionsPage";
import TransactionDetailPage from "./pages/TransactionDetailPage";
import CreateTransactionPage from "./pages/CreateTransactionPage";
import LandingPage from "./pages/LandingPage";
import ReportsPage from "./pages/ReportsPage";
import SalesAnalysisPage from "./pages/SalesAnalysisPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />{" "}
        <Route path="/products" element={<ProductsPage />} />{" "}
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/transactions/:id" element={<TransactionDetailPage />} />
        <Route
          path="/transactions/create"
          element={<CreateTransactionPage />}
        />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/analysis" element={<SalesAnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
