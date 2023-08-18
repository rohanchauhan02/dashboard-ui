import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Validation from "./Validation";
import axios from "axios";

function Login(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    console.log(e.target.name, ":", e.target.value);
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setErrors(Validation(values));
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:8080/api/login", values)
        .then((res) => {
          console.log(`Request Body:${values}`);
          console.log(res);
          localStorage.setItem("token", res.data.token);
          props.dispatch({
            type: "LOGIN",
            payload: { token: res.data.token, isAuthenticated: true },
          });
          navigate("/home");
        })
        .catch((err) => {
          setValues({ email: "", password: "" });
          console.log(err);
        });
    } else {
      setValues({ email: "", password: "" });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form action="" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
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
            Log In
          </button>
          <Link
            to={"/signup"}
            className="btn btn-default border w-100 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Login);
