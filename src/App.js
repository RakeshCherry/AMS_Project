import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/loginPage/LoginPage";
import Admin from "./components/AdminDashboard/Admin";
import User from "./components/UserDashboard/User";



function App(){
  return (
    <>
    <Routes>
          <Route path="AMS_Project/" element={<LoginPage/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/user" element={<User/>} />
    </Routes>
    </>
  )
}
export default App;