import React from "react";
import SignIn from "./SignIn";

import "./style/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmileBeam,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const isLoggedIn = false;
  return (
    <header id="header">
      <div className="header-container">
        <a
          id={`${isLoggedIn ? "navbar-brand-logged" : "navbar-brand-unlogged"}`}
          href="home"
        >
          conduit
        </a>

        {isLoggedIn ? (
          <nav id="navbar-nav-logged">
            <a href="home">Home</a>
            <a href="signin" onClick={<SignIn />}>
              <FontAwesomeIcon icon={faPenToSquare} /> New Article
            </a>
            <a href="signup">
              <FontAwesomeIcon icon={faGear} /> Setting
            </a>
            <a href="Account">
              <FontAwesomeIcon icon={faFaceSmileBeam} /> AccountName
            </a>
          </nav>
        ) : (
          <>
            <nav id="navbar-nav-unlogged">
              <a href="home">Home</a>
              <a href="signin">Sign in</a>
              <a href="signup">Sign up</a>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
