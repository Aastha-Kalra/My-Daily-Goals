import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { auth } from "./firebase";
import LandingPage from "./Components/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  });
  return (
    <div className="overflow:hidden">
          <ToastContainer />
      <BrowserRouter>
        <Header user={user} />
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path="/home" element={<Home user={user} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact  path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
