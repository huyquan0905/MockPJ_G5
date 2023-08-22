import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../components/style/Profile.css"

import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";


const Profile = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        bio: '',
        img: ''
    });
    const [favoriteArticles, setFavoriteArticles] = useState([]);
    const [userArticles, setUserArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('https://api.realworld.io/api/user', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
                .then(response => {
                    const userData = response.data.user;
                    setUser({
                        username: userData.username,
                        email: userData.email,
                        bio: userData.bio,
                        img: userData.image
                    });
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });

            axios.get(`https://api.realworld.io/api/articles?favorited=${user.username}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
                .then(response => {
                    setFavoriteArticles(response.data.articles); // Set favorite articles in state
                })
                .catch(error => {
                    console.error('Error fetching favorite articles:', error);
                });

            axios.get(`https://api.realworld.io/api/articles?author=${user.username}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
                .then(response => {
                    setUserArticles(response.data.articles);
                })
                .catch(error => {
                    console.error('Error fetching user articles:', error);
                });
        }
    }, [user.username]);


    const handleFavoriteClick = async (slug) => {
        try {
            const response = await axios.post(`https://api.realworld.io/api/articles/${slug}/favorite`, null, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.article) {
                // Update favorite status and count of the clicked article in userArticles state
                setUserArticles(prevUserArticles => {
                    return prevUserArticles.map(article => {
                        if (article.slug === slug) {
                            return {
                                ...article,
                                favorited: response.data.article.favorited,
                                favoritesCount: response.data.article.favoritesCount,
                            };
                        }
                        return article;
                    });
                });

                // Update favorite status and count of the clicked article in favoriteArticles state
                setFavoriteArticles(prevFavoriteArticles => {
                    return prevFavoriteArticles.map(article => {
                        if (article.slug === slug) {
                            return {
                                ...article,
                                favorited: response.data.article.favorited,
                                favoritesCount: response.data.article.favoritesCount,
                            };
                        }
                        return article;
                    });
                });
            }
            setSelectedArticle(response.data.article);
        } catch (error) {
            console.error("Error favoriting article:", error);
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "MMMM d, yyyy");
    };

    const handleUnfavoriteClick = async (slug) => {
        try {
            const response = await axios.delete(`https://api.realworld.io/api/articles/${slug}/favorite`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.article) {
                // Update favorite status and count of the clicked article in userArticles state
                setUserArticles(prevUserArticles => {
                    return prevUserArticles.map(article => {
                        if (article.slug === slug) {
                            return {
                                ...article,
                                favorited: response.data.article.favorited,
                                favoritesCount: response.data.article.favoritesCount,
                            };
                        }
                        return article;
                    });
                });

                // Update favorite status and count of the clicked article in favoriteArticles state
                setFavoriteArticles(prevFavoriteArticles => {
                    return prevFavoriteArticles.filter(article => article.slug !== slug);
                });
            }
            setSelectedArticle(response.data.article);
        } catch (error) {
            console.error("Error unfavoriting article:", error);
        }
    };


    return (
        <div className='profileCt'>
            <div className='bgProfile'>
                <div className='bgCt'>
                    <img src={user.img || "https://api.realworld.io/images/smiley-cyrus.jpeg"} alt="" />
                    <h4>{user.username}</h4>
                    <p className='biouser'>{user.bio}</p>
                    <Link to="/Setting">
                        <i className="fa fa-cog"></i> Edit Profile Settings
                    </Link>
                </div>
            </div>
            <div className='articles-toggle'>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">My Articles</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Favorited Articles</button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        {userArticles.length > 0 ? (
                            <div>
                                {userArticles.map(article => (
                                    <div className='article-preview border-top border-bottom' key={article.slug}>
                                        <div className='artical-meta'>
                                            <div className='author'>
                                                <img className='rounded-circle' src={user.img} alt="avatar" />
                                                <div className="info">
                                                    <a href={`/@${article.author.username}`}>{article.author.username}</a>
                                                    <p>{formatDate(article.createdAt)}</p>
                                                </div>
                                            </div>
                                            <button
                                                className={`favorite-button btn btn-sm ${article.favorited ? 'btn-success' : 'btn-outline-success'}`}
                                                onClick={() => {
                                                    if (article.favorited) {
                                                        handleUnfavoriteClick(article.slug);
                                                    } else {
                                                        handleFavoriteClick(article.slug);
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faHeart} /> {article.favoritesCount}
                                            </button>
                                        </div>
                                        <Link to={`/article/${article.slug}`} className='titles1' >{article.title}</Link>
                                        <Link to={`/article/${article.slug}`} className='article-description' >{article.description}</Link>
                                        <Link to={`/article/${article.slug}`} className='readm'>Read more...</Link>
                                        <ul className='artical-tags'>
                                            {article.tagList.map(tagList => (
                                                <li key={tagList}>{tagList}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No articles are here... yet.</p>
                        )}
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        {favoriteArticles.length > 0 ? (
                            <div>
                                {favoriteArticles.map(article => (
                                    <div className='article-preview border-top border-bottom' key={article.slug}>
                                        <div className='artical-meta'>
                                            <div className='author'>
                                                <img className='rounded-circle' src={article.author.username === user.username ? user.img : 'https://api.realworld.io/images/demo-avatar.png'} alt="avatar" />
                                                <div className="info">
                                                    <a href={`/@${article.author.username}`}>{article.author.username}</a>
                                                    <p>{formatDate(article.createdAt)}</p>
                                                </div>
                                            </div>
                                            <button className={`favorite-button btn btn-sm ${article.favorited ? 'btn-success' : 'btn-outline-success'}`} onClick={() => handleUnfavoriteClick(article.slug)}>
                                                <FontAwesomeIcon icon={faHeart} /> {article.favoritesCount}
                                            </button>
                                        </div>
                                        <Link to={`/article/${article.slug}`} className='titles1' >{article.title}</Link>
                                        <Link to={`/article/${article.slug}`} className='article-description' >{article.description}</Link>
                                        <Link to={`/article/${article.slug}`} className='readm'>Read more...</Link>
                                        <ul className='artical-tags'>
                                            {article.tagList.map(tagList => (
                                                <li key={tagList}>{tagList}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No favorite articles yet.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;