import React, { useState, useEffect } from 'react';

import './style/Tags.css'
import axios from 'axios';

const Tags = () => {

    const [tags, setTags] = useState([]);

    useEffect(() => {
      axios
        .get("https://api.realworld.io/api/tags")
        .then((response) => {
          console.log(response);
          setTags(response.data.tags);
        })
        .catch((error) => {
          console.error("Error fetching tags:", error);
        });
    }, []);
    return (
        <div className='sidebar'>
            Popular Tags
                <ul>
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
        </div>
    );
};

export default Tags;