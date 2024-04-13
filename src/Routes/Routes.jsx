import { Route, Routes } from "react-router-dom";
import App from "../App";
import Home from '../Pages/Home/Home'
import Cart from '../Pages/Cart/Cart'
import Order from '../Pages/Orders/Order'
import Product from "../Pages/Product/Product";
function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/Product/:id" element={<Product/>}/>
      <Route path="/Orders" element={<Order/>}/>
    </Routes>
  );
}

export default AllRoutes;
