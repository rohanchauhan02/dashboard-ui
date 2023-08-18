import axios from "axios";
import React from "react";
import { connect } from "react-redux";

export const Home = (props) => {
  const callApi = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8080/api/bank", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h3>Click here to apply for bussiness loan</h3>
        <button className="btn btn-success w-100" onClick={callApi}>
          Apply
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Home);
