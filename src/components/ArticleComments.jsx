import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa";

const ArticleComments = ({ token, slug, user }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [avt, setAvt] = useState({
        username: '',
        email: '',
        bio: '',
        img: ''
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "MMMM d, yyyy");
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const fetchComments = useCallback(async () => {
        try {
            const apiUrl = `https://api.realworld.io/api/articles/${slug}/comments`;

            const response = await axios.get(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(token);
            setComments(response.data.comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }, [slug, token]);

    useEffect(() => {
        fetchComments();
    }, [slug, token, fetchComments]);

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        if (newComment.trim() === '') {
            return;
        }

        try {
            const apiUrl = `https://api.realworld.io/api/articles/${slug}/comments`;
            await axios.post(apiUrl, {
                comment: {
                    body: newComment,
                },
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(token);
            fetchComments();

            setNewComment("");
        } catch (error) {
            console.log('error comment', error);
        }
    };

    const handleDeleteComment = async (id, event) => {
        event.preventDefault();

        try {
            const apiUrl = `https://api.realworld.io/api/articles/${slug}/comments/${id}`;
            await axios.delete(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            // Refresh comments after deletion
            fetchComments();
        } catch (error) {
            console.log('error deleting comment', error);
        }
    };

    useEffect(() => {
        axios.get('https://api.realworld.io/api/user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        const uData = response.data.user;
        setAvt({
          username: uData.username,
          email: uData.email,
          bio: uData.bio,
          img: uData.image
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    }, [])


    return (
        <div className="artcomment">
            <div className="comment">
                <div className="comment-container">
                    <form className="cmt-card">
                        <div className="cmt-card-block">
                            <textarea
                                className="text-area"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={handleCommentChange}
                            ></textarea>
                        </div>

                        <div className="cmt-card-footer">
                            <img
                                src={avt.img}
                                alt="avt"
                                className="avatar"
                            />
                            <button className="btn btn-primary" type="submit" onClick={handleCommentSubmit}>
                                Post Comment
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="comment">
                {comments.map(comment => (
                    <div key={comment.id} className="comment-container">
                        <form className="cmt-card">
                            <div className="cmt-card-block">
                                <p className="comment-body">{comment.body}</p>
                            </div>
                            <div className="cmt-footer">
                                <img src={comment.author.image} alt={comment.author.username} />
                                <span>{comment.author.username}</span>
                                <div className="date"><span>{formatDate(comment.createdAt)}</span></div>

                                {comment.author.id === user.id && (
                                    <button className="delete-btn" onClick={(event) => handleDeleteComment(comment.id, event)}>
                                        <FaTrash />
                                    </button>

                                )}
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleComments;