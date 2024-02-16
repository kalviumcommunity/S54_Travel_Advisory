import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://s54-travel-advisory2.onrender.com/Travel")
      .then((res) => {
        setData(res.data.states);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <div>
      <nav className="nav">
        <a href="/home">Home</a>
        <a href="/login">Login</a>
        <a href="/form">form</a>
        <a href="/About">About</a>
      </nav>
      <h1>HOME</h1>
      <h4>This is my landing page for my asap project</h4>
      {data.map((e, i) => (
        <>
          <h1>{e.state}</h1>
          
        </>
      ))}
    </div>
  );
};

export default Home;