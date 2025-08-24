import React, { useState } from "react";
import { useLoginUserMutation } from "../../redux/Slice/Auth.Slice";
import { useDispatch } from "react-redux";
import { LoginSetToken } from "../../redux/Slice/Token.Slice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 import icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    if (!validateEmail(email)) {
      return toast.error("Invalid email format");
    }

    try {
      const res = await loginUser({ email, password }).unwrap();

      const token = res?.data?.accessToken;
      const userData = res?.data?.user;

      if (!token) {
        throw new Error("Token missing in response");
      }

      Cookies.set("token", token);
      dispatch(LoginSetToken({ token, data: userData }));

      toast.success("Logged in successfully");
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[42px] right-3 cursor-pointer text-gray-500 "
          >
            {showPassword ? <FaEyeSlash  /> : <FaEye />}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-purple-600 hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
