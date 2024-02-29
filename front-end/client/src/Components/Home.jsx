import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Place from "./Place";
import Form from "./Form";
import Dashboard from "./Dashboard"


const Homepage = () => {
  return (
    <div>
      <div className="backg-color">
        <div className="backg-img"></div>
      </div>
      {/* <Navbar /> */}
      <Routes>

        <Route path="/place" element={<Place />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
  
      </Routes>
      
    </div>
  );
};

export default Homepage;