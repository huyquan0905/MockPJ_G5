import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./style/ArticleDetail.css";
import { FaPlus, FaHeart } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


const ArticleDetail = ({ slug, token }) => {
  const [article, setArticle] = useState(null);

  const navigate = useNavigate();
  const accesstoken = (localStorage.getItem("token"));
  console.log(accesstoken);

  useEffect(() => {
    if (!accesstoken) {
      navigate('/')
    }
  }, [accesstoken, navigate])

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const apiUrl = `https://api.realworld.io/api/articles/${slug}`;
        const headers = {
          'Content-Type': 'application/json',
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.get(apiUrl, {
          headers: headers,
        });
        setArticle(response.data.article);
      } catch (error) {
        console.error("Error fetching article detail:", error);
      }
    };

    fetchArticleDetail();
  }, [slug, token]);

  if (!article) {
    return <p>Loading...</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  return (
    <div id="ArticleDetail">
      <div className="mast-heading">
        <div className="mast-heading-container">
          <div className="title">
            <h1>{article.title}</h1>
          </div>

          <div className="info">
            <div className="info-item-avt">
              <Link to="Account">
                <img src={article.author.image} alt={article.author.username} />
              </Link>
            </div>

            <div className="info-item author">
              <div className="name">
                <Link to="Account" className="custom-link">
                  {article.author.username}
                </Link>
              </div>

              <div className="date"><span>{formatDate(article.createdAt)}</span></div>
            </div>

            <div className="info-item">
              <button className="btn btn-sm action-btn ng-binding btn-outline-secondary">
                <FaPlus className="icon" /> Follow {article.author.username}
              </button>
            </div>
            <div className="info-item favorite">
              <button className="btn btn-sm  btn-outline-primary">
                <FaHeart className="icon" /> <span>Favorite Article: {article.favoritesCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mast-content">
        <div className="mast-content-container">
          <div className="content">
            <div className="paragraph">
              <p className='article-body'>{article.body}</p>
            </div>

            <ul className='article-tags'>
              {article.tagList.map(tag => (
                <li key={tag} className="tag-default tag-pill tag-outline ng-binding ng-scope">{tag}</li>
              ))}
            </ul>
          </div>
          <hr />

          <div className="article-action">
            <div className="article-action-container">
              <div className="info-item">
                <Link to="Account">
                  <img src={article.author.image} alt={article.author.username} />
                </Link>
              </div>

              <div className="info-item author">
                <div className="name">
                  <Link to="Account" className="custom-link">
                    {article.author.username}
                  </Link>
                </div>

                <div className="date"><span>{formatDate(article.createdAt)}</span></div>
              </div>

              <div className="info-item">
                <button className="btn btn-sm action-btn ng-binding btn-outline-secondary">
                  <FaPlus className="icon" /> Follow {article.author.username}
                </button>
              </div>
              <div className="info-item favorite">
                <button className="btn btn-sm  btn-outline-primary">
                  <FaHeart className="icon" /> <span>Favorite Article: {article.favoritesCount}</span>
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