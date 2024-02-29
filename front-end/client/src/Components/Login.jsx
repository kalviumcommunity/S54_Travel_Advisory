import React, {  useState,useContext } from "react";
import { Flex, Box, FormControl, FormLabel, Input, Button, FormHelperText } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import "../App.css"
import { AppContext } from "../Context/Parentcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
   const navigate = useNavigate();
  const{setislogin,login}=useContext(AppContext)
  const showToastMessage = () => {
    toast.error("Please Login with correct account");
};
const showToast = () => {
  toast.success("You have logged in successfully");
};

  const formSubmitHandler = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        data
      );
      console.log(response);
      if (response.data.Message === "Login Success") {
        showToast()
        setislogin(true);
        document.cookie = `User=${data.Email}`;
        document.cookie = `password=${data.Password}`;
        document.cookie = `JWT=${response.data.token}`;
        setislogin(true)
        navigate("/dashboard");
      } else if (response.data.Message === "Login Failed") {
        if (response.data.Reason === "Wrong Details") {
          showToastMessage("Incorrect email or password.");
      } else {
          showToastMessage("Login failed for an unknown reason.");
      }
      }
    } catch (error) {
      console.error("Error:", error);
      showToastMessage("An unexpected error occurred. Please try again later.");
    }
  };

 
  return (
    <Flex justify="center" align="center" h="50vh" w="100vw">
      <Box p="20" maxW="md" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white" mt={100}>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
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
            {errors.Email && <FormHelperText color="red">{errors.Email.message}</FormHelperText>}
          </FormControl>

          <FormControl mt={5}>
            <FormLabel>Password</FormLabel>
            <Input
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
            {errors.Password && <FormHelperText color="red">{errors.Password.message}</FormHelperText>}
          </FormControl>
          <ToastContainer/>
          <Flex justify="center">
            <Button mt={4} colorScheme="orange" type="submit">
              Login
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
export default Login;