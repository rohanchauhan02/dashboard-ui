import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
// import CompleteAssesment from "./CompleteAssesment";

export const Home = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const handleInput = (e) => {
    values[e.target.name] =
      e.target.name === "loan_amount" ? e.target.valueAsNumber : e.target.value;
    setValues(values);
  };
  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/loan-enquiry", values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        props.dispatch({
          type: "SEND_AMOUNT",
          payload: { resp: res.data },
        });
        navigate("/complete-assesment", {
          state: { completeAssesment: res.data },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-45">
        <form action="" onSubmit={handleSubmit}>
          <h2>Fill this form to check eligibility</h2>
          <div className="mb3">
            <label htmlFor="name">
              <strong>Bussiness Name</strong>
            </label>
            <input
              onChange={handleInput}
              type="name"
              name="business_name"
              placeholder="Enter Bussiness Name"
              className="form-control rounded-0"
              required
            />
          </div>
          <div className="mb3">
            <label htmlFor="">
              <strong>Bussiness GST Number</strong>
            </label>
            <input
              onChange={handleInput}
              type="text"
              name="bussiness_gst"
              placeholder="ABCDE1234F"
              className="form-control rounded-0"
              required
            />
          </div>
          <div className="mb3">
            <label htmlFor="">
              <strong>Contact Number</strong>
            </label>
            <input
              onChange={handleInput}
              type="number"
              name="contact_number"
              placeholder="123456789"
              className="form-control rounded-0"
              required
            />
          </div>
          <label htmlFor="loan_amount" className="form-label">
            <strong>Loan Amount</strong>
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input
              onChange={handleInput}
              type="number"
              name="loan_amount"
              id="loan_amount"
              className="form-control rounded-0"
              aria-label="Amount (to the nearest dollar)"
              required
            />
            <span className="input-group-text">.00</span>
          </div>
          <div className="mb3">
            <label htmlFor="">
              <strong>Choose Provider</strong>
            </label>
            <select
              onChange={handleInput}
              name="provider"
              className="form-control rounded-0"
            >
              <option value="Xero">Xero</option>
              <option value="MYOB">MYOB</option>
            </select>
          </div>

          <button className="btn btn-success w-100" type="submit">
            Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect()(Home);
