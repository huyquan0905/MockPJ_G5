import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../components/style/PostArticle.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const PostArticle = () => {

    const [user, setUser] = useState();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        title: '',
        description: '',
        body: '',
        tagList: ''
    });

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token, navigate])

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
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://api.realworld.io/api/articles?limit=10&offset=0',
            {
                article: {
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    tagList: article.tagList,
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    article: {
                        title: article.title,
                        description: article.description,
                        body: article.body,
                        tagList: article.tagList,
                    }
                })
            }
        )
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((error) => {
                console.error('Error publishing article:', error);
            });
    }

    return (
        <div>
            <div id="main">
                <div data-reactroot="">
                    <div className="editor-page">
                        <div className="container page">
                            <div className="row">
                                <div className="col-md-10 offset-md-1 col-xs-12">
                                    <form onSubmit={handleSubmit}>
                                        <fieldset>
                                            <fieldset className="form-group">
                                                <input type="text" className="form-control form-control-lg" placeholder="Article Title" name="title" value={article.title} onChange={handleInputChange} />
                                            </fieldset>

                                            <fieldset className="form-group">
                                                <input type="text" className="form-control" placeholder="What's this article about?" name="description" value={article.description} onChange={handleInputChange} />
                                            </fieldset>

                                            <fieldset className="form-group">
                                                <textarea className="form-control" style={{ marginBottom: "20px" }} rows="8" placeholder="Write your article (in markdown)" name="body" value={article.body} onChange={handleInputChange}></textarea>
                                            </fieldset>

                                            <fieldset className="form-group">
                                                <input type="text" className="form-control" placeholder="Enter tags" name="tagList" value={article.tagList} onChange={handleInputChange} />
                                                <div className="tag-list"></div>
                                            </fieldset>
                                            <button className="btn btn-lg pull-xs-right btn-primary" type="submit">Publish Article</button>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostArticle;