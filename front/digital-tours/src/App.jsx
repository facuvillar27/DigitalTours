import { Route, Routes } from "react-router-dom";
import WhatsAppButton from "./Components/WhatsAppButton/WhatsAppButton";

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
import EditCategories from "./Routes/editCategories";
import Profile from "./Routes/Profile";
import { AuthProvider } from "./services/authContext";
import Fav from "./Routes/Fav";
import ReservationDetails from "./Routes/ReservationDetails";
import MyReserves from "./Routes/MyReserves";
import Policies from "./Routes/Policies";


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
          <Route path="/registerUser" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/admin/caracteristicas"element={<Characteristics />}></Route>
          <Route path="/admin/categorias" element={<EditCategories />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/mis-favoritos" element={<Fav />}></Route>
          <Route path="/products/:id/reserve-confirmation" element={<ReservationDetails />}></Route>
          <Route path="/reserves" element={<MyReserves />}></Route>
          <Route path="/policies" element={<Policies />}></Route>
        </Routes>
        <WhatsAppButton />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
