import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./style/GlobalFeed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import PaginationList from "./PaginationList";
import { useNavigate } from "react-router-dom";

const GlobalFeed = ({ selectedTag, currentPage, setCurrentPage }) => {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const limit = 10;
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

  const articleDetailRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const offset = (currentPage - 1) * limit;
        let apiUrl = `https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}`;
        if (selectedTag) {
          apiUrl += `&tag=${selectedTag}`;
        }

        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios.get(apiUrl, {
          headers: headers,
        });
        setArticles(response.data.articles);
        setArticlesCount(response.data.articlesCount);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [currentPage, limit, selectedTag, token]);

  useEffect(() => {
    if (articleDetailRef && articleDetailRef.current)
      console.log(articleDetailRef);
  }, [articleDetailRef]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFavoriteClick = (slug) => {
    setArticles((prevArticles) => {
      return prevArticles.map((article) => {
        if (article.slug === slug) {
          return {
            ...article,
            favorited: !article.favorited,
            favoritesCount: article.favorited
              ? article.favoritesCount - 1
              : article.favoritesCount + 1,
          };
        }
        return article;
      });
    });
  };

  const totalPages = Math.ceil(articlesCount / limit);

  return (
    <div className="article">
      {articles.map((article) => (
        <div
          className="article-preview border-top border-bottom"
          key={article.slug}
        >
          <div className="artical-meta">
            <div className="author">
              <img
                className="rounded-circle"
                src="https://api.realworld.io/images/demo-avatar.png"
                alt="avatar"
              />
              <div className="info">
                <p>{article.author.username}</p>
                <p>{formatDate(article.createdAt)}</p>
              </div>
            </div>
            <button
              className="favorite-button btn btn-sm btn-outline-success"
              onClick={() => handleFavoriteClick(article.slug)}
            >
              {article.favorited}
              <FontAwesomeIcon icon={faHeart} /> {article.favoritesCount}
            </button>
          </div>
          <h2>{article.title}</h2>
          <p className="article-description">{article.description}</p>
          <span
            onClick={() => {
              navigate(`/article-detail/${article.slug}`);
            }}
            className="nav-article-detail"
          >
            Read more...
          </span>
          <ul className="artical-tags">
            {article.tagList.map((tagList) => (
              <li key={tagList}>{tagList}</li>
            ))}
          </ul>
        </div>
      ))}

      <PaginationList
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        selectedTag={selectedTag}
      />
    </div>
  );
};

export default GlobalFeed;
