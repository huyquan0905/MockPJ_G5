import React from "react";
import { Link } from "react-router-dom";
import "./style/ArticleDetail.css";

const ArticleDetail = () => {
  return (
    <div id="ArticleDetail">
      <div className="mast-heading">
        <div className="mast-heading-container">
          <div className="title">
            Try to transmit the HTTP card, maybe it will override the multi-byte
            hard drive!
          </div>
          <div className="info">
            <div className="info-item">
              {/* Change Link to after */}
              <Link to="Account">
                <img
                  src="https://toppng.com/uploads/preview/avatar-png-11554021819gij72acuim.png"
                  alt="avt"
                  className="avatar"
                />{" "}
              </Link>
            </div>
            <div className="info-item">
              <div className="name">
                {/* Change Link to after */}
                <Link to="Account" className="custom-link">
                  Anah Benešová
                </Link>
              </div>
              <div className="date">December 9, 2022</div>
            </div>
            <div className="info-item">
              <button className="follow">+ Follow Anah Benešová</button>
            </div>
            <div className="info-item">
              <button className="unfavorite">
                + Unfavourite Article (1611)
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mast-content">
        <div className="mast-content-container">
          <div className="content">
            <div className="paragraph">
              <p>
                Sunt excepturi ut dolore fuga.\nAutem eum maiores aut nihil
                magnam corporis consectetur sit. Voluptate et quasi optio eos et
                eveniet culpa et nobis.\nSint aut sint sequi possimus reiciendis
                nisi.\nRerum et omnis et sit doloribus corporis voluptas
                error.\nIusto molestiae tenetur necessitatibus dolorem omnis.
                Libero sed ut architecto.\nEx itaque et modi aut voluptatem
                alias quae.\nModi dolor cupiditate sit.\nDelectus consectetur
                nobis aliquid deserunt sint ut et voluptas.\nCorrupti in labore
                laborum quod. Ipsa laudantium deserunt. Ut atque harum inventore
                natus facere sed molestiae.\nQuia aliquid ut.\nAnimi sunt rem et
                sit ullam dolorem ab consequatur modi. Cupiditate officia
                voluptatum.\nTenetur facere eum distinctio animi qui
                laboriosam.\nQuod sed voluptatem et cumque est eos.\nSint id
                provident suscipit harum odio et. Et fuga repellendus magnam
                dignissimos eius aspernatur rerum. Quo perferendis
                nesciunt.\nDolore dolorem porro omnis voluptatibus consequuntur
                et expedita suscipit et.\nTempora facere ipsa.\nDolore accusamus
                soluta officiis eligendi.\nEum quaerat neque eum beatae odio. Ad
                voluptate vel.\nAut aut dolor. Cupiditate officia
                voluptatum.\nTenetur facere eum distinctio animi qui
                laboriosam.\nQuod sed voluptatem et cumque est eos.\nSint id
                provident suscipit harum odio et.
              </p>
            </div>
            <ul className="tag-list">
              <li>voluptate</li>
              <li>rerum</li>
              <li>ducimus</li>
              <li>hic</li>
            </ul>
          </div>
          <hr />
          {/* Section article-action */}
          <div className="article-action">
            <div className="article-action-container">
              <div className="info-item">
                {/* Change Link to after */}
                <Link to="Account">
                  <img
                    src="https://toppng.com/uploads/preview/avatar-png-11554021819gij72acuim.png"
                    alt="avt"
                    className="avatar"
                  />{" "}
                </Link>
              </div>
              <div className="info-item">
                <div className="name">
                  {/* Change Link to after */}
                  <Link to="Account" className="custom-link">
                    Anah Benešová
                  </Link>
                </div>
                <div className="date">December 9, 2022</div>
              </div>
              <div className="info-item">
                <button className="follow">+ Follow Anah Benešová</button>
              </div>
              <div className="info-item">
                <button className="unfavorite">
                  + Unfavourite Article (1611)
                </button>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="comment-container">
              <form className="cmt-card">
                <div className="cmt-card-block">
                  <textarea
                    class="text-area"
                    placeholder="Write a comment..."
                  ></textarea>
                </div>
                <div className="cmt-card-footer">
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-icon001_750950-50.jpg?w=1060"
                    alt="avt"
                    className="avatar"
                  />
                  <button className="btn btn-primary" type="submit">
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
