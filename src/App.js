import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PostArticle from "./components/PostArticle";
import Setting from "./components/Setting";
import ArticleDetail from "./components/ArticleDetail";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import ArticleDetailPage from './components/ArticleDetailPage'
import GlobalFeed from './components/GlobalFeed';

function App() {
  return (
    <div>
      <Header />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostArticle />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
        <Routes>
          <Route path="/globalfeed" element={<GlobalFeed />} />
          <Route path="/article/:slug" element={<ArticleDetailPage />} />

        </Routes>
      </Provider>
      {/* <Footer /> */}
    </div>
  );
}

export default App;