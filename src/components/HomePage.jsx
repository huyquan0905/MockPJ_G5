import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style/HomePage.css";
import GlobalFeed from './GlobalFeed';
import { useSelector } from "react-redux";

const HomePage = () => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const isLoggedIn = useSelector(state => state.isAuthenticated);

    useEffect(() => {
        axios.get('https://api.realworld.io/api/tags')
            .then((response) => {
                setTags(response.data.tags);
            })
            .catch((error) => {
                console.log('Error tags: ' + error);
            });
    }, []);

    const renderTagList = () => {
        return (
            <div className='sidebar border border-0 sidebar-right'>
                <p>Popular Tags</p>
                <ul>
                    {tags.map((tag) => (
                        <li key={tag}>
                            <button className='tag-button' onClick={() => {
                                console.log('Clicked tag:', tag);
                                setSelectedTag(tag);
                                setCurrentPage(1);
                            }}>
                                {tag}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    };


    return (
        <div>
            {isLoggedIn ? (
                <div className='container page'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='feed'>
                                <a className='yourfeed' href="#yourfeed">Your Feed</a>
                                <a className='globalfeed' href="#globalfeed" onClick={() => setSelectedTag(null)}>Global Feed</a>
                            </div>
                            <GlobalFeed selectedTag={selectedTag} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </div>
                        <div className='col-md-3'>
                            {renderTagList()}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='container text-center text-white logo'>
                        <h1>conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>

                    <div className='container page'>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className='feed'>
                                    <a className='globalfeed' href="#globalfeed" onClick={() => setSelectedTag(null)}>Global Feed</a>
                                </div>
                                <GlobalFeed selectedTag={selectedTag} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                            </div>

                            <div className='col-md-3'>
                                {renderTagList()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;