import React from "react";
import "./style/Account.css";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Account = () => {
  return (
    <div ui-view="" class="ng-scope">
      <div class="profile-page ng-scope">
        {/* User's basic info & action buttons  */}
        <div class="user-info">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                <img
                  ng-src="https://img.freepik.com/premium-vector/avatar-icon001_750950-50.jpg?w=1060"
                  class="user-img"
                  src="https://img.freepik.com/premium-vector/avatar-icon001_750950-50.jpg?w=1060"
                  alt="avatar"
                />
                <h4 ng-bind="::$ctrl.profile.username" class="ng-binding">
                  dainsd
                </h4>
                <p ng-bind="::$ctrl.profile.bio" class="ng-binding"></p>

                <a
                  ui-sref="app.settings"
                  class="btn btn-sm btn-outline-secondary action-btn"
                  ng-show="$ctrl.isUser"
                  href="#/settings"
                >
                  <FontAwesomeIcon icon={faGear} /> Edit Profile Settings
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Container where User's posts & favs are list w/ toggle tabs */}
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              {/* Tabs for switching between author articles & favorites */}
              <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      ui-sref-active="active"
                      ui-sref="app.profile.main({username: $ctrl.profile.username})"
                      href="#/@dainsd"
                    >
                      My Articles
                    </a>
                  </li>

                  <li class="nav-item">
                    <a
                      class="nav-link"
                      ui-sref-active="active"
                      ui-sref="app.profile.favorites({username: $ctrl.profile.username})"
                      href="#/@dainsd/favorites"
                    >
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>
              {/* View where profile-articles renders to  */}
              {/*   uiView:  */}{" "}
              <div ui-view="" class="ng-scope">
                <article-list
                  limit="5"
                  list-config="$ctrl.listConfig"
                  class="ng-scope ng-isolate-scope"
                >
                  {" "}
                  {/* ngRepeat: article in $ctrl.list  */}
                  {/* <div class="article-preview ng-hide" ng-hide="!$ctrl.loading">
                    Loading articles...
                  </div> */}
                  <div
                    class="article-preview"
                    ng-show="!$ctrl.loading &amp;&amp; !$ctrl.list.length"
                  >
                    No articles are here... yet.
                  </div>
                  <list-pagination
                    total-pages="$ctrl.listConfig.totalPages"
                    current-page="$ctrl.listConfig.currentPage"
                    ng-hide="$ctrl.listConfig.totalPages <= 1"
                    class="ng-isolate-scope ng-hide"
                  >
                    <nav>
                      <ul class="pagination">
                        {/* ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) */}
                      </ul>
                    </nav>
                  </list-pagination>
                </article-list>
              </div>
            </div>

            {/* End row & container divs */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
