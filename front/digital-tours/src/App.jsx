import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Routes/Home";
import Admin from "./Routes/Admin";
import ProductDetails from "./Routes/ProductDetails";
import RegisterTour from "./Routes/RegisterTour";
import Tours from "./Routes/Tours";
import Register from "./Routes/Register";
import Login from "./Routes/Login";
import Users from "./Routes/Users";
import Characteristics from "./Routes/Characteristics";
import Categories from "./Routes/Categories";
import { AuthProvider } from "./services/authContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/products/:id" element={<ProductDetails />}></Route>
          <Route path="/registerTour" element={<RegisterTour />}></Route>
          <Route path="admin/tours" element={<Tours />}></Route>
          <Route path="admin/usuarios" element={<Users />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="admin/characteristics" element={<Characteristics />}></Route>
          <Route path="admin/categories" element={<Categories />}></Route>
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
