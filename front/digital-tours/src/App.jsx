import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Admin from "./Routes/Admin";
import Products from "./Routes/Products";
import ProductDetails from "./Routes/ProductDetails";
import RegisterTour from "./Routes/RegisterTour";
import Layout from "./Layout/Layout";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/products/:id" element={<ProductDetails />}/>
          <Route path="/registerTour" element={<RegisterTour />}/>
          <Route path="*" element={<h1>Page not Found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
