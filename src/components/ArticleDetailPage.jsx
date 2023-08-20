import React from "react";
import { useParams } from "react-router-dom";
import ArticleDetail from "./ArticleDetail";

const ArticleDetailPage = () => {
    const { slug } = useParams();

    return (
        <div>
            <ArticleDetail slug={slug} />
        </div>
    );
};

export default ArticleDetailPage;