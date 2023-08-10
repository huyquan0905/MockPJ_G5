import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PostArticle from "./components/PostArticle";
import { Provider } from "react-redux";
import store from './components/redux/store';
import ProtectedRoutes from "./components/redux/ProtectedRoutes";

function App() {
  const isAuth = (localStorage.getItem("token"));
  return (
    <div>
      <Header />
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<ProtectedRoutes auth={isAuth} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/post" element={<PostArticle />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
      <Footer />
    </div>

  );
}

export default App;