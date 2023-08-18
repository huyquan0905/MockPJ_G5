import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './style/GlobalFeed.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import PaginationList from './PaginationList';

const GlobalFeed = ({setStatus}) => {

    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesCount, setArticlesCount] = useState(0);
    const limit = 10;

    useEffect(() => {
        const offset = (currentPage - 1) * limit;

        const fetchArticles = async () => {
            try {
                const response = await axios.get("https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}");
                setArticles(response.data.articles);
                setArticlesCount(response.data.articlesCount);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, [currentPage]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "MMMM d, yyyy");
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFavoriteClick = (slug) => {
        setArticles(prevArticles => {
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
        <div className='article'>
                {articles.map(article => (
                <div className='article-preview border-top border-bottom' key={article.slug}>
                    <div className='artical-meta'>
                        <div className='author'>
                            <img className='rounded-circle' src="https://api.realworld.io/images/demo-avatar.png" alt="avatar" />
                            <div className="info">
                                <p>{article.author.username}</p>
                                <p>{formatDate(article.createdAt)}</p>
                            </div>
                        </div>
                        <button className={`favorite-button btn btn-sm btn-outline-success ${article.favorited ? 'favorited' : ''}`} onClick={() => handleFavoriteClick(article.slug)}>
                            {article.favorited } 
                            <FontAwesomeIcon icon={faHeart}/> {article.favoritesCount}
                        </button>
                    </div>
                    <h2>{article.title}</h2>
                    <p className='article-description'>{article.description}</p>
                    <span>Read more...</span>
                    <ul className='artical-tags'>
                        {article.tagList.map(tagList => (
                            <li key={tagList}>{tagList}</li>
                        ))
                        }
                    </ul>

                </div>
                
            ))}

            <PaginationList
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </div>
    </div>
    );
};

export default GlobalFeed;