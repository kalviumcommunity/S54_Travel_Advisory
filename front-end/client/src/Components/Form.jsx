import React from 'react';
import '../App.css';
import { useForm } from 'react-hook-form';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function Form() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    getValues,
  } = useForm();
  const showToastMessage = () => {
    toast.success("SignUp successful 😊.!");
  };
  const showToastMessage2 = () => {
    toast.error("This user Already exits");
  };

  const formSubmitHandler = async (data) => {
    try {
      const checkUserResponse = await axios.post("https://s54-travel-advisory2.onrender.com/formcreation", data);
      if (checkUserResponse.data.Message === "This user alreday exist please login with the another user name") {
        showToastMessage2()
      } else {
        const response = await axios.post("https://s54-travel-advisory2.onrender.com/formcreation", data);
        showToastMessage();
        console.log(response.data);
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };


  return (
    <div className="signup-container">
      <fieldset>
        <legend style={{ color: "orange" }}>Signup</legend>
        <form onSubmit={handleSubmit(formSubmitHandler)}>


          <label style={{ color: 'black' }}>Name:</label>
          <input
            type="text"
            name="FirstName"
            {...register('FirstName', {
              required: 'Please provide the Name',
            })}
          />
          {errors.FirstName && <p className="err0r">{errors.FirstName.message}</p>}
          <label style={{ color: 'black' }}>Email:</label>
          <input
            type="email"
            name="Email"
            {...register('Email', {
              required: 'Enter Email',
              minLength: {
                value: 5,
                message: 'Type valid Email',
              },
            })}
          />
          {errors.Email && <p className="err0r">{errors.Email.message}</p>}

          <label style={{ color: 'black' }}>Password:</label>
          <input
            type="password"
            name="Password"
            {...register('Password', {
              required: 'Enter Password',
              minLength: {
                value: 5,
                message: 'Please enter a valid password',
              },
            })}
          />
          {errors.Password && <p className="err0r">{errors.Password.message}</p>}

          <label style={{ color: 'black' }}>Confirm Password:</label>
          <input
            type="password"
            name="ConfirmPassword"
            {...register('ConfirmPassword', {
              required: 'Enter Confirm Password',
              validate: {
                matchesPassword: (value) => {
                  const password = getValues('Password');
                  return password === value || 'Passwords do not match';
                },
              },
            })}
          />
          {errors.ConfirmPassword && <p className="err0r">{errors.ConfirmPassword.message}</p>}

          <ToastContainer />
          <input type="submit" value={'Signup'} />
        </form>
      </fieldset>
    </div>
  );
}