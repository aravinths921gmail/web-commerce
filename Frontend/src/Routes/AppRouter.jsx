import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "../Pages/Home/Home";
import AdminLogin from "../Admin/AdminLogin";
import AdminLayout from "../Admin/AdminLayout";
import AdminRoute from "../Admin/AdminRoute";

import Dashboard from "../Admin/Dashboard";
import Users from "../Admin/Users";
import Products from "../Admin/Products";
import Orders from "../Admin/Orders";
import AddCategory from "../Admin/AddCategory";
import Categoryfilter from "../Usercomponents/Categorieslist/Categoryfilter"
import CartPage from "../Pages/Home/CartPage";

import InstallationGuide from "../Pages/Support/InstallationGuide";
import MaintenanceTips from "../Pages/Support/MaintenanceTips";
import HelpCenter from "../Pages/Support/HelpCenter";
import ContactUs from "../Pages/Support/ContactUs";
import OrderPage from "../Pages/Orders/OrderPage";
import CheckoutPage from "../Pages/Checkout/Checkoutpage";
import FetchOrder from "../Pages/Orders/FetchOrder";
import RefundPage from "../Pages/Orders/RefundPage";
import BMIPage from "../Usercomponents/BMI/BMIPage"
import CalorieTracker from "../Pages/dashboard/Calorietracker";
import WorkoutGuide from "../Pages/dashboard/WorkoutGuide";
import Blog1 from "../Pages/Blogs/Blog1";
import Blog2 from "../Pages/Blogs/Blog2";
import Blog3 from "../Pages/Blogs/Blog3";

import AboutUs from "../Usercomponents/Footer/AboutUs";
import OurMission from "../Usercomponents/Footer/OurMission";
import Careers from "../Usercomponents/Footer/Careers";

import PrivacyPolicy from "../Usercomponents/Footer/PrivacyPolicy";
import TermsConditions from "../Usercomponents/Footer/TermsConditions";
import ShippingPolicy from "../Usercomponents/Footer/ShippingPolicy";
import WarrantyPolicy from "../Usercomponents/Footer/WarrantyPolicy";



export default function AppRouter() {

  const [user, setUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (

    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/category/:id" element={<Categoryfilter />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/installation-guide" element={<InstallationGuide />} />
      <Route path="/maintenance-tips" element={<MaintenanceTips />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/order/:orderid" element={<OrderPage />} />
      <Route path="/checkout/:cartId" element={<CheckoutPage />} />
      <Route path="/orders" element={<FetchOrder />} />
      <Route path="/refunds" element={<RefundPage />} />
      <Route path="/bmi" element={<BMIPage />} />
      <Route path="/WorkoutGuide" element={<WorkoutGuide />} />
      <Route path="/CalorieTracker" element={<CalorieTracker />} />
      <Route path="/blog/1" element={<Blog1 />} />
      <Route path="/blog/2" element={<Blog2 />} />
      <Route path="/blog/3" element={<Blog3 />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/our-mission" element={<OurMission />} />
      <Route path="/careers" element={<Careers />} />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-conditions" element={<TermsConditions />} />
      <Route path="/shipping-policy" element={<ShippingPolicy />} />
      <Route path="/warranty-policy" element={<WarrantyPolicy />} />


      <Route path="/admin-login" element={<AdminLogin setUser={setUser} />} />

      <Route
        path="/Admin" element={<AdminRoute user={user}> <AdminLayout /> </AdminRoute>}>
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="category" element={<AddCategory />} />
      </Route>

    </Routes>
  );
}



