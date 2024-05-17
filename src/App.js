import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/loginPage/LoginPage";
import Admin from "./components/AdminDashboard/Admin";
import User from "./components/UserDashboard/User";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'




function App(){
  return (
    <>
    <Routes>
          <Route path="AMS_logIn_Page/" element={<LoginPage/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/user" element={<User/>} />
    </Routes>
    <ToastContainer />
    </>
  )
}
export default App;