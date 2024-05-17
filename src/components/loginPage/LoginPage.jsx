import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import "../loginPage/LoginPage.css";
import logoImage from '../../assets/logo.png'
import "bootstrap/dist/css/bootstrap.min.css";
import passwordEye from '../../assets/PasswordEye.png';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userMsg, setUserMsg] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');
    const storedRememberMe = localStorage.getItem('rememberMe');

    if (storedRememberMe && storedUsername && storedPassword) {
      setUser(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  function submitfun(e) {
    e.preventDefault();

    if(!selectedUser){
      toast.error("Please select a user (Admin or Employee)!");
      return;
    }

    if (rememberMe) {
      localStorage.setItem('username', user);
      localStorage.setItem('password', password);
      localStorage.setItem('rememberMe', true);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
    }

    let validUsername, validPassword;

    if(selectedUser === "admin"){
      validUsername = "admin";
      validPassword = "1234";
    }else if(selectedUser === "employee"){
      validUsername = "employee";
      validPassword = "4321";
    }

    const isUserCorrect = user === validUsername;
    const isPasswordCorrect = password === validPassword;

    setUserMsg(!isUserCorrect);
    setPasswordMsg(!isPasswordCorrect);
    if (isUserCorrect) {
      setUserMsg(false);
    }
    if (isPasswordCorrect) {
      setPasswordMsg(false);
    }
    if (isUserCorrect && isPasswordCorrect) {
      if(selectedUser === "admin"){
        navigate('/admin');
      }else if(selectedUser === "employee"){
        navigate('/user');
      }
      setUser("");
      setPassword("");
      setSelectedUser("");
    }
  }

  return (
    <>
      <div className="main-container">
        <div className="logo">
          <img src={logoImage} alt="Logo" />
        </div>
        <div className="container_1">
          <h1>Welcome to</h1>
          <span className="kitGlobal">RC Global Tech</span>
          <p className="kitPara">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </div>
          <form className="formClass" onSubmit={(e) => submitfun(e)}>
            <div className="logInSelection">
              <div className="loginCheckbox">
                <input
                  className="userCheckbox"
                  type="radio"
                  name="userType"
                  id="admin"
                  value="admin"
                  checked={selectedUser === "admin"}
                  onChange={(e)=> setSelectedUser(e.target.value)}
                />
                <label className="emp_adm_Label" htmlFor="admin">
                  Admin
                </label>
              </div>
              <div className="loginCheckbox">
                <input
                  className="userCheckbox"
                  type="radio"
                  name="userType"
                  id="employee"
                  value="employee"
                  checked={selectedUser === "employee"}
                  onChange={(e)=> setSelectedUser(e.target.value)}
                />
                <label className="emp_adm_Label" htmlFor="employee">
                  Employee
                </label>
              </div>
            </div>
            <div className="inputFields">
              <div className="userField">
                <label className="userLabel mb-2 mt-3" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="userInput px-4"
                  value={user}
                  autoComplete="username"
                  onChange={(e) => setUser(e.target.value)}
                />
                {userMsg ? (
                  <div className="text-danger">Incorrect Username</div>
                ) : (
                  <></>
                )}
              </div>
              <div className="userField">
                <label className="userLabel mb-2 mt-3" htmlFor="password">
                  Password
                </label>
                <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="userInput px-4 w-100"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  
                />
                <img
                  src={passwordEye}
                  alt="Toggle Password Visibility"
                  className="eye-icon"
                  onClick={togglePasswordVisibility}
                  />
                </div>
                {passwordMsg ? (
                  <div className="text-danger">Incorrect Password</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="rememberme">
              <input
                className="remembermeCheck"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="remembermeLabel" htmlFor="defaultCheck1">
                Remember Me
              </label>
            </div>
            <button className="submitBtn">Submit</button>
          </form>
        </div>
    </>
  );
}
export default LoginPage;
