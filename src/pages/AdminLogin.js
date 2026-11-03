import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import THEME, { WEB } from "../theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/1 (1).jpg";
import { useAuth } from "./AuthContext";

const Login = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Phone is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await axios.post(`${WEB.Backend}login`, values);
        const userData = data.data.data;
console.log(data)
        if (userData.status !== "enabled") {
          logout();
          toast.error("Account isn't Approved Yet. Please Contact Admin.");
        } else if (userData && userData.role === "admin") {
          toast.success(data.data.message);
          localStorage.setItem("user", JSON.stringify(userData));
          navigate("/admindashboard");
        } else {
          toast.error("Login with correct Admin Phone/Password");
        }
      } catch (error) {
        console.error("Login error: ", error);
        toast.error(error.response.data.error);
      }
    },
  });

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <ToastContainer />
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          loading="lazy"
          className="w-20 h-20"
          src={logo}
          alt="SK World"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-center text-primary mb-2">
        SK World
      </h3>
      <h4 className="text-lg font-medium text-center text-primary mb-6">
        Admin Login
      </h4>

      {/* Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        {/* Phone Input */}
        <div className="mb-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-center focus:ring focus:ring-primary focus:outline-none"
            placeholder="Phone"
            type="number"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-center focus:ring focus:ring-primary focus:outline-none"
            placeholder="Password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-1/2 px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition duration-200"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
