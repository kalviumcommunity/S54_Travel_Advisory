import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://s54-travel-advisory2.onrender.com/Travel")
      .then((res) => {
        setData(res.data[0].states);
        // console.log(res.data[0].states[0].places[0])
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
          {e.places.map((places) => (
            <div style={{
              border:"2px solid black",
              marginTop:"40px"
            }}>
              <p>{places.name}</p>
              <p>{places.rating}</p>
              <p>{places.review}</p>
              <button><a href={places.google_map_location}>Google map 📌</a></button>
              
              <p>{places.infrastructure}</p>
             <img src={places.img} width={"200px"} alt="" />
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default Home;
