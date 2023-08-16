<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/HomePage.css";
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/HomePage.css'
import GlobalFeed from './GlobalFeed';
>>>>>>> 3433218f8c055460a39991b6e6a3d783777eaebb

const HomePage = ({ isLoggedIn }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.realworld.io/api/tags")
      .then((response) => {
        console.log(response);
        setTags(response.data.tags);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, []);
  return (
    <div>
      {isLoggedIn ? (
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed">
                <a className="yourfeed" href="#yourfeed">
                  Your Feed
                </a>
                <a className="globalfeed" href="#globalfeed">
                  Global Feed
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="sidebar">
                Popular Tags
                <ul>
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
<<<<<<< HEAD
          </div>
=======
            <div className='container page'>
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed">
                            <a className='globalfeed' href="#globalfeed">Global Feed </a>
                            <GlobalFeed/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="sidebar border border-0">
                            Popular Tags
                            <ul>
                                {tags.map(tag => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )}
>>>>>>> 3433218f8c055460a39991b6e6a3d783777eaebb
        </div>
      ) : (
        <div>
          <div className="container text-center text-white logo">
            <h1>conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
          <div className="container page">
            <div className="row">
              <div className="col-md-9">
                <div className="feed">
                  <a className="globalfeed" href="#globalfeed">
                    Global Feed
                  </a>
                </div>
              </div>
              <div className="col-md-3">
                <div className="sidebar border border-0">
                  Popular Tags
                  <ul>
                    {tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
