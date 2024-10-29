import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Routes/Home";
import Admin from "./Routes/Admin";
import Products from "./Routes/Products";
import ProductDetails from "./Routes/ProductDetails";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
