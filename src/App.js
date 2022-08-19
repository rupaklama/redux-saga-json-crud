import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import Header from "./component/Header";
import About from "./pages/About";

import AddEditUser from "./pages/AddEditUser";
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center" />

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addUser" element={<AddEditUser />} />
          <Route path="/editUser/:id" element={<AddEditUser />} />
          <Route path="/userInfo/:id" element={<UserInfo />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<>Not Found</>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
