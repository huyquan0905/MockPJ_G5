
import React from "react";
import "./style/Setting.css";
import { useDispatch } from "react-redux";
import { logout } from "./redux/actions";
import { useNavigate } from "react-router-dom";
const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="contentSt">
      <h1>Your Settings </h1>
      <form className="formSt">
        <input
          type="text"
          name=""
          value={"https://api.realworld.io/images/smiley-cyrus.jpeg"}
          id=""
        />
        <input type="text" placeholder="Username" id="" />
        <textarea
          style={{ marginBottom: "15px" }}
          cols="30"
          rows="10"
          placeholder="Short bio about you"
        ></textarea>
        <input type="email" name="" id="" placeholder="Email" />
        <input type="password" placeholder="New Password" id="passw" />
        <button className="btnSt"> Update Settings</button>
        <button className="btnLogout" onClick={handleLogout}>
          Or click here to logout.
        </button>
      </form>
    </div>
  );

};

export default Setting;
