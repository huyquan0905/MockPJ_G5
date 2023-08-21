import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./style/YourFeed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import PaginationList from "./PaginationList";
import { Link } from "react-router-dom";


const YourFeed = ({ selectedTag, currentPage , setCurrentPage}) => {
    const [feedArticles, setFeedArticles] = useState([]);
    const [articlesCount, setArticlesCount] = useState(0);
    const limit = 10;
    const [token, setToken] = useState(localStorage.getItem('token'));
    
    useEffect(() => {
      // Gọi API để lấy danh sách bài viết từ các tác giả bạn đã follow
      const fetchFeedArticles = async () => {
        try {
            const offset = (currentPage - 1) * limit;
          const apiUrl = `https://api.realworld.io/api/articles/feed?limit=${limit}&offset=${offset}`;
          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          };
  
          const response = await axios.get(apiUrl, { headers });
          setFeedArticles(response.data.articles);
          setArticlesCount(response.data.articlesCount);
        } catch (error) {
          console.error('Error fetching feed articles:', error);
        }
      };
  
      fetchFeedArticles();
    }, [currentPage, limit, selectedTag, token]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "MMMM d, yyyy");
    };
    
        const handlePageChange = (page) => {
            setCurrentPage(page);
           
         
        };
    
        const handleFavoriteClick = (slug) => {
                setFeedArticles(prevArticles => {
                    return prevArticles.map(article => {
                        if (article.slug === slug) {
                            return {
                                ...article,
                                favorited: !article.favorited,
                                favoritesCount: article.favorited
                                    ? article.favoritesCount - 1
                                    : article.favoritesCount + 1
                            };
                        }
                        return article;
                    });
                });
        };
    
        const totalPages = Math.ceil(articlesCount / limit);
    return (
      <div>
        {feedArticles.length === 0 ? (
          <div className="follow-0">No articles are here... yet.</div>
        ) : (
          <div>
            <div className="article">
            {feedArticles.map(article => (
                <div className='article-preview border-top border-bottom' 
                key={article.slug}>
                    <div className='artical-meta'>
                        <div className='author'>
                            <img className='rounded-circle' src="https://api.realworld.io/images/demo-avatar.png" alt="avatar" />
                            <div className="info">
                                <p>{article.author.username}</p>
                                <p>{formatDate(article.createdAt)}</p>
                            </div>
                        </div>
                        <button
                            className={`favorite-button ${article.favorited ? 'border border-success-subtle rounded-1 favorited' : 'border border-success-subtle rounded-1 bg-white text-success'}`}
                            onClick={() => handleFavoriteClick(article.slug)}
                            >
                            {article.favorited} <FontAwesomeIcon icon={faHeart} /> {article.favoritesCount}
                        </button>
                    </div>
                    <h2>{article.title}</h2>
                    <p className='article-description'>{article.description}</p>
                    <Link to={`/article/${article.slug}`}>Read more...</Link>
                    <ul className='artical-tags'>
                        {article.tagList.map(tagList => (
                            <li key={tagList}>{tagList}</li>
                        ))
                        }
                    </ul>

                </div>
            ))}
            </div>
            <div>
            <PaginationList
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                selectedTag={selectedTag}
            />

            </div>
          </div>
          
        )}
      </div>
    );
  };
  
  export default YourFeed;
  