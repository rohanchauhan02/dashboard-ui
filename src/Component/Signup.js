import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./Validation";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    values[e.target.name] = e.target.value;
    setValues({...values});
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:8080/api/signup", values)
        .then((res) => {
          console.log(`Request Body:${values}`);
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          setValues({ name: "", email: "", password: "" });
          console.log(err);
        });
    } else {
      setValues({ name: "", email: "", password: "" });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form action="" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="mb3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              onChange={handleInput}
              type="name"
              name="name"
              placeholder="Enter Name"
              className="form-control rounded-0"
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>

          <div className="mb3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              onChange={handleInput}
              type="email"
              name="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="mb3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              onChange={handleInput}
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </div>
          <button className="btn btn-success w-100" type="submit">
            Sign Up
          </button>
          <Link
            to={"/"}
            className="btn btn-default border w-100 text-decoration-none"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
