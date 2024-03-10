import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, FormLabel, Input, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import { setCookie } from "../utils/cookies";
import { AppContext } from "./Context";
import { loginCheck } from "../utils/loginCheck";

export default function Signup() {
  const navigate = useNavigate();
  const { login, setLogin } = useContext(AppContext) || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const FormSubmitHandler = async (formData) => {
    try {
      const id = toast.loading("Signing Up...");
      const result = await axios.post("https://s54-travel-advisory2.onrender.com/users", formData);
      console.log("ADDED");
      toast.update(id, {
        render: "Signed Up",
        type: "success",
        isLoading: false,
      });
      setCookie("username", formData.username, 365);
      setCookie("auth-token", result.data, 365);
      if (setLogin) {
        setLogin(loginCheck());
      }
      setTimeout(() => {
        navigate("/place");
      }, 1200);
    } catch (err) {
      console.log(err);
      toast.error("Username exists");
    }
  };

  return (
    <div className="form-parent">
      <ToastContainer />
      <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
        <Text as="b" fontSize="2.3vmax">
          Sign Up
        </Text>
        <Text as="i" fontSize="1vmax">
          Enter the following details!
        </Text>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Username
          </FormLabel>
          <Input
            type="text"
            borderColor="black"
            {...register("username", {
              required: "Username is required",
            })}
          />
          <p className="err">{errors.username?.message}</p>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Password
          </FormLabel>
          <Input
            type="password"
            borderColor="black"
            {...register("password", {
              required: "Password Required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters required",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password Not Valid (Use Special Characters & Numbers)",
              },
            })}
          />
          <p className="err">{errors.password?.message}</p>
        </FormControl>
        <Button type="submit" colorScheme="red">
          Submit
        </Button>
      </form>
      <Link
        to="/login"
        style={{
          fontSize: "2vmin",
          color: "lightblue",
          textDecoration: "underline",
          marginTop: "1vmin",
        }}
      >
        Already a user? Login here...
      </Link>
    </div>
  );
}
