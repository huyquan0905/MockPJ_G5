import React from "react";
import { Link } from "react-router-dom";
import "./style/ArticleDetail.css";

const ArticleDetail = () => {
  return (
    <div id="ArticleDetail">
      <div className="mast-heading">
        <div className="mast-heading-container">
          <div className="title">
            Try to transmit the HTTP card, maybe it will override the multi-byte
            hard drive!
          </div>
          <div className="info">
            <div className="info-item">
              {/* Change Link to after */}
              <Link to="Account">
                <img
                  src="https://img.freepik.com/premium-vector/avatar-icon001_750950-50.jpg?w=1060"
                  alt="avt"
                  className="avatar"
                />{" "}
              </Link>
            </div>
            <div className="info-item">
              <div className="name">
                {/* Change Link to after */}
                <Link to="Account" className="custom-link">
                  Anah Benešová
                </Link>
              </div>
              <div className="date">December 9, 2022</div>
            </div>
            <div className="info-item">
              <button className="follow">+ Follow Anah Benešová</button>
            </div>
            <div className="info-item">
              <button className="unfavorite">
                + Unfavourite Article (1611)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
