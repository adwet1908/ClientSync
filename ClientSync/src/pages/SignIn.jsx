import React, { useState } from "react";
import "./SignIn.css"; // Create this file
import api from "../services/api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [state, setState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); 

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("form data submitted");
    
    if(state === 'Sign Up'){
      const response = await api.post('/auth/admin-register', data); 
      
      if(response.data.success){
        toast.success(response.data.message); 
        navigate('/')
        window.location.reload(); 
      }
      else{
        toast.error(response.data.message); 
      }

    }
    else if(state === 'Login'){
      const response = await api.post('/auth/admin-login', data); 
      
      if(response.data.success){
        toast.success(response.data.message); 
        navigate('/')
        window.location.reload(); 
      }
      else{
        toast.error(response.data.message); 
      }
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={submitHandler}>
        <h2>{state}</h2>

        {state === "Sign Up" && (
          <input
            onChange={changeHandler}
            name="name"
            type="text"
            value={data.name}
            placeholder="Name"
          />
        )}

        <input
          onChange={changeHandler}
          name="email"
          type="email"
          value={data.email}
          placeholder="Email"
        />
        <input
          onChange={changeHandler}
          name="password"
          type="password"
          value={data.password}
          placeholder="Password"
        />

        <button type="submit">{state}</button>

        <p onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}>
          {state === "Sign Up"
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
};

export default SignIn;
