import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Place from "./Place";
import Form from "./Form";
import Dashboard from "./Dashboard"
import Navbar from "./logout";
import Formpage from "./Formpage";



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
        <Route path="/logout " element={<Navbar />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<Formpage />} />
  
      </Routes>
      
    </div>
  );
};

export default Homepage;