import React from 'react';
import '../components/style/PostArticle.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const PostArticle = () => {
    return (
        <div>
            <div id="main">
                <div data-reactroot="">
                    <div className="editor-page">
                        <div className="container page">
                            <div className="row">
                                <div className="col-md-10 offset-md-1 col-xs-12">
                                    <form>
                                        <fieldset>
                                            <fieldset className="form-group"><input type="text" className="form-control form-control-lg" placeholder="Article Title" /></fieldset>

                                            <fieldset className="form-group"><input type="text" className="form-control" placeholder="What's this article about?" /></fieldset>

                                            <fieldset className="form-group"><textarea className="form-control" style={{ marginBottom: "20px" }} rows="8" placeholder="Write your article (in markdown)" ></textarea></fieldset>

                                            <fieldset className="form-group"><input type="text" className="form-control" placeholder="Enter tags" />
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