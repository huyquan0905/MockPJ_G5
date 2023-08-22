import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./style/ArticleDetail.css";
import { FaPlus, FaHeart, FaEdit, FaTrashAlt } from 'react-icons/fa';
import ArticleComments from "./ArticleComments";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { slug } = useParams();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [author, setAuthor] = useState("");
  const [user, setUser] = useState();
  const [userName, setUserName] = useState("");
  const [followingUsers, setFollowingUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const apiUrl = `https://api.realworld.io/api/articles/${slug}`;
        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios.get(apiUrl, {
          headers: headers,
        });
        setArticle(response.data.article);
        setAuthor(response.data.article.author.username);
      } catch (error) {
        console.error("Error fetching article detail:", error);
      }
    };
    fetchArticleDetail();
  }, [slug, token]);

  useEffect(() => {
    axios.get('https://api.realworld.io/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const userData = response.data.user;
        setUser({
          username: userData.username,
          email: userData.email,
        });
        console.log(userData);
        setUserName(userData.username);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const compareUserName = userName === author;

  const deleteArticle = async () => {
    try {
      const apiUrl = `https://api.realworld.io/api/articles/${slug}`;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      await axios.delete(apiUrl, {
        headers: headers,
      });
      navigate('/')
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${slug}`);
  };

  const handleDelBtn = () => {
    deleteArticle();
  }

  useEffect(() => {
    const savedFollowingUsers = localStorage.getItem('followingUsers');
    if (savedFollowingUsers) {
      setFollowingUsers(JSON.parse(savedFollowingUsers));
    }
    axios.get(`https://api.realworld.io/api/profiles/${userName}/follow`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const followedUsers = response.data.profiles.map(profile => profile.username);
        setFollowingUsers(followedUsers);
      })
      .catch(error => {
        console.error('Error fetching followed users:', error);
      });
  }, [userName, token]);

  const followUser = async () => {
    try {
      const apiUrl = `https://api.realworld.io/api/profiles/${article.author.username}/follow`;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      await axios.post(apiUrl, {}, { headers });

      // Cập nhật danh sách người dùng đã follow
      setFollowingUsers([...followingUsers, article.author.username]);
      localStorage.setItem('followingUsers', JSON.stringify([...followingUsers, article.author.username]));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const unfollowUser = async () => {
    try {
      const apiUrl = `https://api.realworld.io/api/profiles/${article.author.username}/follow`;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      await axios.delete(apiUrl, { headers });

      // Cập nhật danh sách người dùng đã follow
      setFollowingUsers(followingUsers.filter(username => username !== article.author.username));
      localStorage.setItem('followingUsers', JSON.stringify(followingUsers.filter(username => username !== article.author.username)));
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

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

          <div className="info" style={{ display: "flex", gap: "10px" }}>
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

              <div className="date">
                <span>{formatDate(article.createdAt)}</span>
              </div>
            </div>

            {compareUserName ? (
              <>
                <div className="item-edit-del" style={{ display: "flex", gap: "10px" }} onClick={handleEdit}>
                  <button className="btn btn-sm action-btn ng-binding btn-outline-secondary">
                    <FaEdit className="icon" /> Edit Article
                  </button>

                  <div className="item-edit-del">
                    <button className="btn btn-sm action-btn ng-binding btn-outline-secondary" style={{ color: "rgb(184, 92, 92)" }} onClick={handleDelBtn}>
                      <FaTrashAlt className="icon" style={{ color: "rgb(184, 92, 92)", padding: "5px" }} /> Delete Article
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="info-item">
                  {followingUsers.includes(article.author.username) ? (
                    <button className="btn btn-sm action-btn ng-binding btn-outline-secondary" onClick={unfollowUser}>
                      Unfollow {article.author.username}
                    </button>
                  ) : (
                    <button className="btn btn-sm action-btn ng-binding btn-outline-secondary" onClick={followUser}>
                      Follow {article.author.username}
                    </button>
                  )}
                </div>
                <div className="info-item favorite">
                  <button className="btn btn-sm  btn-outline-primary">
                    <FaHeart className="icon" /> <span>Favorite Article: {article.favoritesCount}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mast-content">
        <div className="mast-content-container">
          <div className="content">
            <div className="paragraph">
              <p className="article-body">{article.body}</p>
            </div>

            <ul className="article-tags">
              {article.tagList.map((tag) => (
                <li
                  key={tag}
                  className="tag-default tag-pill tag-outline ng-binding ng-scope"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <hr />

          <div className="article-action">
            <div className="article-action-container" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <div className="info-item">
                <Link to="Account">
                  <img
                    src={article.author.image}
                    alt={article.author.username}
                  />
                </Link>
              </div>

              <div className="info-item author">
                <div className="name">
                  <Link to="Account" className="custom-link">
                    {article.author.username}
                  </Link>
                </div>

                <div className="date">
                  <span>{formatDate(article.createdAt)}</span>
                </div>
              </div>

              {compareUserName ? (
                <>
                  <div className="item-edit-del" style={{ display: "flex", gap: "10px" }} onClick={handleEdit}>
                    <button className="btn btn-sm action-btn ng-binding btn-outline-secondary">
                      <FaEdit className="icon" /> Edit Article
                    </button>
                    <div className="item-edit-del">
                      <button className="btn btn-sm action-btn ng-binding btn-outline-secondary" style={{ color: "rgb(184, 92, 92)" }} onClick={handleDelBtn}>
                        <FaTrashAlt className="icon" style={{ color: "rgb(184, 92, 92)", padding: "5px" }} /> Delete Article
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="info-item">
                    {followingUsers.includes(article.author.username) ? (
                      <button className="btn btn-sm action-btn ng-binding btn-outline-secondary" onClick={unfollowUser}>
                        Unfollow {article.author.username}
                      </button>
                    ) : (
                      <button className="btn btn-sm action-btn ng-binding btn-outline-secondary" onClick={followUser}>
                        Follow {article.author.username}
                      </button>
                    )}
                  </div>
                  <div className="info-item favorite">
                    <button className="btn btn-sm  btn-outline-primary">
                      <FaHeart className="icon" /> <span>Favorite Article: {article.favoritesCount}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <ArticleComments
            slug={slug}
            token={token}
            user={{ id: article.author.id }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;