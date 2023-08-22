import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./style/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.isAuthenticated);
  const [articles, setArticles] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState([]);
  const [avt, setAvt] = useState({
    username: '',
    email: '',
    bio: '',
    img: ''
  });


  useEffect(() => {
    axios
      .get("https://api.realworld.io/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userData = response.data.user;
        setUser({
          username: userData.username,
          email: userData.email,
        });
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });


    axios.get('https://api.realworld.io/api/user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        const uData = response.data.user;
        setAvt({
          username: uData.username,
          email: uData.email,
          bio: uData.bio,
          img: uData.image
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

  }, []);

  return (
    <header id="header">
      <div className="header-container">
        <Link
          id={`${isLoggedIn ? "navbar-brand-logged" : "navbar-brand-unlogged"}`}
          to=""
        >
          conduit
        </Link>

        {isLoggedIn ? (
          <nav id="navbar-nav-logged">
            <Link to="">Home</Link>
            <Link to="post">
              <FontAwesomeIcon icon={faPenToSquare} /> New Article
            </Link>
            <Link to="setting">
              <FontAwesomeIcon icon={faGear} /> Setting
            </Link>
            <Link to="profile">
              <img
                src={avt.img}
                alt="avt"
                className="avatar"
              />{" "}
              {user.username}
            </Link>
          </nav>
        ) : (
          <>
            <nav id="navbar-nav-unlogged">
              <Link to="/">Home</Link>
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
