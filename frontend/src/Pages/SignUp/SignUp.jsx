import React, { useState } from "react";
import { useRegisterUserMutation } from "../../redux/Slice/Auth.Slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);



 const validate = () => {
  const newErrors = {};

  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
    newErrors.email = "Valid email is required";

  if (!form.password || form.password.length < 6)
    newErrors.password = "Password must be at least 6 characters";
  else if (!/[A-Z]/.test(form.password) || !/[!@#$%^&]/.test(form.password))
    newErrors.password =
      "Password must have 1 capital letter and 1 special character";

  
  setErrors(newErrors);

  // Show toast errors
  Object.values(newErrors).forEach((msg) => toast.error(msg));

  return Object.keys(newErrors).length === 0;
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };



 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const res = await registerUser(form).unwrap(); // 👈 send as JSON
    toast.success("User registered successfully!");
    navigate("/login");
  } catch (err) {
    console.error(err);
    toast.error(err?.data?.message || "Registration failed");
  }
};


 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Create Your Account ✨
      </h2>

      {/* Profile Upload */}
      
      {/* Name Fields */}
    
      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        onChange={handleInputChange}
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

      {/* Password */}
    <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
    onChange={handleInputChange}
  />
  <div
    onClick={() => setShowPassword(!showPassword)}
    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
  {errors.password && (
    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
  )}
</div>

{/* Confirm Password */}


      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
      >
        Sign Up
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-purple-600 hover:underline font-medium"
        >
          Login
        </a>
      </p>
    </form>
  </div>
);

};

export default SignUp;
