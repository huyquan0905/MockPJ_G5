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
import ProtectedRoutes from "./components/redux/ProtectedRoutes";

function App() {
  const isAuth = localStorage.getItem("token");
  return (
    <div>
      <Header />
      <Provider store={store}>
        <Routes>
          <Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/article-detail" element={<ArticleDetail />} />

            <Route path="/post" element={<PostArticle />} />

          </Route>
          <Route element={<ProtectedRoutes auth={isAuth} />}>
            {/* <Route path="/post" element={<PostArticle />} /> */}
          </Route>
        </Routes>
      </Provider>
      <Footer />
    </div>
  );
}

export default App;