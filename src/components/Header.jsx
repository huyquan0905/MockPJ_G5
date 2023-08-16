import React from "react";
import "./style/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  // const isLoggedIn = localStorage.getItem("token");
  const isLoggedIn = true;
  return (
    <header id="header">
      <div className="header-container">
        <Link
          id={`${isLoggedIn ? "navbar-brand-logged" : "navbar-brand-unlogged"}`}
          // to="home"
          to="article-detail"
        >
          conduit
        </Link>

        {isLoggedIn ? (
          <nav id="navbar-nav-logged">
            <Link to="home">Home</Link>
            <Link to="post">
              <FontAwesomeIcon icon={faPenToSquare} /> New Article
            </Link>
            <Link to="setting">
              <FontAwesomeIcon icon={faGear} /> Setting
            </Link>
            <Link to="Account">
              <img
                src="https://img.freepik.com/premium-vector/avatar-icon001_750950-50.jpg?w=1060"
                alt="avt"
                className="avatar"
              />{" "}
              AccountName
            </Link>
          </nav>
        ) : (
          <>
            <nav id="navbar-nav-unlogged">
              <Link to="home">Home</Link>
              <Link to="signin">Signin</Link>
              <Link to="signup">Signup</Link>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
