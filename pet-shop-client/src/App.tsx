import ProductsPage from "./components/ProductsPage";
function App() {
  return (
    <div className="App">
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1 className="text-3xl">Pet Shop Management</h1>
      </header>

      <main className="mt-4">
        <ProductsPage />
      </main>
    </div>
  );
}

export default App;
