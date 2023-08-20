import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHeart,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./style/ArticleDetail.css";
import axios from "axios";

const usePath = () => {
  const location = useLocation();

  return location.pathname.split("/")[2];
};

const ArticleDetail = () => {
  const slug = usePath();
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchArticle = async () => {
      const apiUrl = `https://api.realworld.io/api/articles/${slug}`;
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get(apiUrl, { headers });

      setArticle(response.data.article);
      setAuthor(response.data.article.author);
    };

    fetchArticle();
  }, [slug]);

  return (
    <div id="ArticleDetail">
      <div className="mast-heading">
        <div className="mast-heading-container">
          <div className="title">{article.title}</div>
          <div className="info">
            <div className="info-item">
              {/* Change Link to after */}
              <Link to="Account">
                <img
                  src="https://toppng.com/uploads/preview/avatar-png-11554021819gij72acuim.png"
                  alt="avt"
                  className="avatar"
                />{" "}
              </Link>
            </div>
            <div className="info-item">
              <div className="name">
                {/* Change Link to after */}
                <Link to="Account" className="custom-link">
                  {author.username}
                </Link>
              </div>
              <div className="date">December 9, 2022</div>
            </div>
            <div className="info-item">
              <button className="follow">
                <FontAwesomeIcon icon={faPlus} /> Follow {author.username}
              </button>
            </div>
            <div className="info-item">
              <button className="unfavorite">
                <FontAwesomeIcon icon={faHeart} /> Unfavourite Article (1611)
              </button>
            </div>
            <div className="info-item">
              <button className="edit-art">
                <FontAwesomeIcon icon={faPencil} /> Edit Article
              </button>
            </div>
            <div className="info-item">
              <button className="delete-art">
                <FontAwesomeIcon icon={faTrashCan} /> Delete Article
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mast-content">
        <div className="mast-content-container">
          <div className="content">
            <div className="paragraph">
              <p>{article.body}</p>
            </div>
            <ul className="tag-list">
              <li>voluptate</li>
              <li>rerum</li>
              <li>ducimus</li>
              <li>hic</li>
            </ul>
          </div>
          <hr />
          {/* Section article-action */}
          <div className="article-action">
            <div className="article-action-container">
              <div className="info-item">
                {/* Change Link to after */}
                <Link to="Account">
                  <img
                    src="https://toppng.com/uploads/preview/avatar-png-11554021819gij72acuim.png"
                    alt="avt"
                    className="avatar"
                  />
                </Link>
              </div>
              <div className="info-item">
                <div className="name">
                  {/* Change Link to after */}
                  <Link to="Account" className="custom-link">
                    {author.username}
                  </Link>
                </div>
                <div className="date">December 9, 2022</div>
              </div>
              <div className="info-item">
                <button className="follow">
                  {" "}
                  <FontAwesomeIcon icon={faPlus} /> Follow {author.username}
                </button>
              </div>
              <div className="info-item">
                <button className="unfavorite">
                  <FontAwesomeIcon icon={faHeart} /> Unfavourite Article (1611)
                </button>
              </div>
              <div className="info-item">
                <button className="edit-art">
                  <FontAwesomeIcon icon={faPencil} /> Edit Article
                </button>
              </div>
              <div className="info-item">
                <button className="delete-art">
                  <FontAwesomeIcon icon={faTrashCan} /> Delete Article
                </button>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="comment-container">
              <form className="cmt-card">
                <div className="cmt-card-block">
                  <textarea
                    class="text-area"
                    placeholder="Write a comment..."
                  ></textarea>
                </div>
                <div className="cmt-card-footer">
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-icon001_750950-50.jpg?w=1060"
                    alt="avt"
                    className="avatar"
                  />
                  <button className="btn btn-primary" type="submit">
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
