import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

export const CompleteAssesment = (props) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/thanks");
  };
  return props.resp === null ? (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Sorry, Page Not Found</h2>
        </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-45">
        <h3>
          Hi {props.resp.name}, You are eligible to get loan of $
          {props.resp.pre_assessment}.
        </h3>
        <form action="" onSubmit={handleSubmit}>
          <button className="btn btn-success w-100" type="submit">
            Complete Application
          </button>
          <Link
            to={"/home"}
            className="btn btn-default border w-100 text-decoration-none"
          >
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    resp: state.assesment.resp,
  };
};

export default connect(mapStateToProps)(CompleteAssesment);
