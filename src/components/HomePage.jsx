
import React, {useState} from 'react';
import './style/HomePage.css'
import GlobalFeed from './GlobalFeed';
import YourFeed from './YourFeed';
import Tags from './Tags';


const HomePage = () => {
  const isLoggedIn = localStorage.getItem("token");
  // const isLoggedIn =false;
  const [status, setStatus] = useState('globalfeed');



  return (
    <div>
      {isLoggedIn ? (
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed">
                <div className='feed-btn'>
                    <button className='btn yourfeed-btn' onClick={() => setStatus('yourfeed')}>
                        Your Feed
                    </button>
                    
                    <button className='btn yourfeed-btn' onClick={() => setStatus('globalfeed')}>
                        Global Feed
                    </button>
                    {status === 'yourfeed' && <YourFeed setStatus={setStatus}/>}                
                    {status === 'globalfeed' && <GlobalFeed setStatus={setStatus}/>}
                </div>
                
              </div>
            </div>
            <div className="col-md-3">
              <div className="sidebar border border-0">
               <Tags />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="container text-center text-white logo">
            <h1>conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
          <div className="container page">
            <div className="row">
              <div className="col-md-9">
                <div className="feed">

                  <div className="globalfeed">
                    {status === 'globalfeed' && <GlobalFeed setStatus={setStatus}/>}
                  </div>

                </div>
              </div>
              <div className="col-md-3">
                <div className="sidebar border border-0">
                  <Tags />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage