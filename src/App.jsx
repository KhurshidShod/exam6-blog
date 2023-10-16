import { Fragment, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/isAuthContext";
import { ToastContainer } from "react-toastify";

import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyPostsPage from "./pages/MyPostsPage";
import AccountPage from "./pages/AccountPage";
import Layout from "./components/layout";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/:categoryName" element={<CategoryPage />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="aboutus" element={<AboutPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="post/:id" element={<PostPage />} />
            <Route
              path="/account"
              element={isAuth ? <AccountPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/myposts"
              element={isAuth ? <MyPostsPage /> : <Navigate to="/login" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
