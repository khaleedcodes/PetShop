import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItem = (path: string, label: string) => (
    <Link
      to={path}
      className={`px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition-all ${
        location.pathname === path ? "bg-blue-500 text-white" : "text-gray-700"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link to={"/"}>
          <h1 className="text-xl font-bold text-blue-600">
            🐾 PetShop Dashboard
          </h1>
        </Link>

        {/* Hamburger Menu Button (for mobile) */}
        <button
          className="lg:hidden text-blue-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Navbar Items */}
        <div className="hidden lg:flex gap-2">
          {navItem("/products", "Products")}
          {navItem("/transactions", "Transactions")}
          {navItem("/reports", "Reports")}
          {navItem("/analysis", "Sales Analysis")}
        </div>
      </div>

      {/* Mobile Menu (Visible when `isMenuOpen` is true) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="flex flex-col items-start px-4 py-3">
            {navItem("/products", "Products")}
            {navItem("/transactions", "Transactions")}
            {navItem("/reports", "Reports")}
            {navItem("/analysis", "Sales Analysis")}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
