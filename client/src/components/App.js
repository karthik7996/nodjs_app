import React from "react";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import NotFound from "./NotFound";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import AdminUpdateProduct from "./AdminUpdateProduct";
import Profile from "./Profile";
import SingleProduct from "./SingleProduct";
import Product from "./Product";

const App = () => ( 
  <BrowserRouter>
    <Header /> 
    <main>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/signin" element = {<Signin/>} />
        <Route path="/user/dashboard" element = {<UserDashboard/>} />
        <Route path="/admin/dashboard" element = {<AdminDashboard/>} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/products" element={<Product />}/>
        <Route path="/singleproduct" element={<SingleProduct/>}/>
        <Route path="/admin/product/update/:productId" element={<AdminUpdateProduct/>}/>
        <Route path="*" element = {<NotFound/>} />
      </Routes>
    </main>

  </BrowserRouter> 
);


export default App;
