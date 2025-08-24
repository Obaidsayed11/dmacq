import React, {useEffect}from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login.jsx";

import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { LoginSetToken } from "./redux/Slice/Token.Slice";
// import Blogs from "./Pages/components/Blogs/Blogs";
// import BlogPage from "./Pages/components/BlogPage";
import BlogList from "./Pages/components/BlogList";


function App() {
  const token =
    useSelector((state) => state.auth?.token) ;
    const dispatch = useDispatch();

     useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken && !token) {
      dispatch(LoginSetToken({ token: cookieToken }));
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route goes to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Page: Redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/blogs" />}
        />

        {/* Signup Page: Redirect to dashboard if already logged in */}
        <Route
          path="/signup"
          element={!token ? <SignUp /> : <Navigate to="/blogs" />}
        />

        {/* Dashboard: Protected route */}
        <Route
          path="/Blogs"
          element={token ? <BlogList /> : <Navigate to="/login" />}
        />

        {/* Catch-all route redirects to /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
