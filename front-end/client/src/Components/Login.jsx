import React, {  useState,useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import "../App.css"
import { AppContext } from "../Context/Parentcontext";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
   const navigate = useNavigate();
  const{setislogin,login}=useContext(AppContext)

  const formSubmitHandler = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        data
      );
      console.log(response);
      if (response.data.Message === "Login Success") {
        document.cookie = `User=${data.Email}`;
        document.cookie = `JWT=${response.data.token}`;
        setislogin(true)
        navigate("/place");
      } else if (response.data.Message === "Login Failed") {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="MAIN">
      <div className="login-container">
        <fieldset>
          <legend style={{ color: "orange" }}>Login</legend>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <label style={{ color: "black" }}>Email:</label>
            <input
              type="email"
              name="Email"
              {...register("Email", {
                required: "Enter Email",
                minLength: {
                  value: 5,
                  message: "Type a valid Email",
                },
              })}
            />
            {errors.Email && <p className="error">{errors.Email.message}</p>}

            <label style={{ color: "black" }}>Password:</label>
            <input
              type="password"
              name="Password"
              {...register("Password", {
                required: "Enter Password",
                minLength: {
                  value: 5,
                  message: "Please enter a valid password",
                },
              })}
            />
            {errors.Password && (
              <p className="error">{errors.Password.message}</p>
            )}

            <input type="submit" value={"Login"} />
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
