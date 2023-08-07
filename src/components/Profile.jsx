import React from 'react';
import './style/Profile.css'
const Profile = () => {
    return (
        <div className='profileCt'>
            <div className='bgProfile'>
                <div className='bgCt'>
                    <img src="https://api.realworld.io/images/smiley-cyrus.jpeg" alt="" />
                    <h4>...</h4>
                    <a href="#"><i class="fa fa-cog"></i> Edit Profile Settings</a>
                </div>
            </div>
            <div className='arcticles-toggle'>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">My Articles</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Favorited Articles</button>
                </li>

            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">No articles are here... yet.</div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">No articles are here... yet.</div>

            </div>
            </div>
           
        </div>
    );
};

export default Profile;