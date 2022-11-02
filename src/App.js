import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Home from "./components/home.component";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar.component";
import Order from "./components/orders/order.component";
import FoodList from "./components/foods/foodlist.component";
import FoodCreate from "./components/foods/foodcreate.component";

import MiddleWareService from "./services/middleware.service";




const App = () =>
{
  const currentUser = AuthService.getCurrentUser();
  return (
    <div>
      {currentUser && (

        <Navbar />
      )}

      <div className="container-fluid mt-3">
        {
          currentUser ? (
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/order" element={<Order />} />
              <Route path="/food-list" element={<FoodList/>} />
              <Route path="/food-create" element={<FoodCreate/>} />
              <Route path="*" element={<Home />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Login />} />
              
            </Routes>
          )
        }
      </div>
    </div>
  );
}
export default App;