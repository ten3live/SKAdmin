import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import THEME, { WEB } from "../theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthContext";

import logo from "../assets/1 (2).jpg";
import applogin from "../assets/applogin.jpg";
import regimage from "../assets/appreg.jpg";
import appwelcome from "../assets/appwelcome.jpg";
import appsearch from "../assets/appsearch.jpg";
import appdetails1 from "../assets/appdetails1.jpg";
import appchat from "../assets/appchat.jpg";
import appprofilever from "../assets/appver.jpg";
import appnew from "../assets/appnew.jpg";
import appprofile from "../assets/appprofile.jpg";
import appmmlist from "../assets/appmmlist.jpg";
import sk3 from "../assets/c.png";
import Navbar from "./Navbar";
import CustomFooter from "./Footer";

const Download = () => {
  const [modifiedDate, setModifiedDate] = useState("");
  const fileUrl = "https://skworld.org/SKMatrimonial.apk";

  useEffect(() => {
    const fetchModifiedDate = async () => {
      try {
        const response = await fetch(fileUrl, { method: "HEAD" });
        const lastModified = response.headers.get("Last-Modified");
        
        if (lastModified) {
          const date = new Date(lastModified);
          const day = date.getDate().toString().padStart(2, "0"); // Ensure day is always two digits
          const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
          const year = date.getFullYear();
  
          const formattedDate = `${day}/${month}/${year}`; // Format as DD/MM/YYYY
          setModifiedDate(formattedDate);
        } else {
          setModifiedDate("Not available");
        }
      } catch (error) {
        setModifiedDate("Error fetching date");
      }
    };
  
    fetchModifiedDate();
  }, []);

const { logout } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone: "",

    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get(`${WEB.Backend}profile/${values.phone}`);
        const userData = response.data.data;

        if (userData && userData.phone) {
          toast.success(response.data.message);
          localStorage.setItem("user", JSON.stringify(userData));
          navigate(`/profile/${userData.phone}`);
        } else {
          toast.error("Not Found");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error?.response?.data?.message || "Unable to authenticate");
      }
    },
  });







  const FeatureCard = ({ title, imgSrc, description }) => (
    <div className="p-4 bg-white shadow rounded-lg">
      <img
        loading="lazy"
        src={imgSrc}
        alt={title}
        className="rounded-md w-full mb-4 h-400 object-cover"
      />
      <h5 className="text-lg font-semibold text-gray-800">{title}</h5>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );

  return (
    <div className="bg-gray-100">
      <ToastContainer />

      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-indigo-800 text-white py-8">
        <div className="container mx-auto flex flex-col items-center">
          <img src={logo} alt="SK World" className="w-20 h-20 mb-4" />
          <h1 className="text-2xl font-bold">SK World</h1>
          <p className="text-sm">Match Makers Heaven - Worldwide</p>
        </div>
      </header>

      {/* Download Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-800">
            Get the SK World App Now! Updated on{" "}
            {modifiedDate || "Loading..."}
          </h2>
          <a
            href={fileUrl}
            className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Download
          </a>
        </div>
      </section>
      <section className="bg-white py-8">
  <div className="container mx-auto px-4">
    {/* Section Title */}
    <div className="text-center mb-8">
      <h5 className="text-lg text-gray-600">Proud Presentations of</h5>
      <h3 className="text-2xl font-bold text-gray-800">SK World of Match Makers</h3>
    </div>
 <div className="container mx-auto w-max">
<form
        onSubmit={formik.handleSubmit}
        className="w-full  bg-white p-6 rounded-lg shadow-md"
      >
        {/* Phone Input */}
        <div className="mb-4 text-center">
          <p>MATCHMAKER AUTHENTICATOR</p>
          <input
            className="w-[250px] my-5 px-2 py-2 border border-gray-300 rounded-md text-center focus:ring focus:ring-primary focus:outline-none"
            placeholder="Phone e.g. 03010000000"
            type="number"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

     

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-1/3 py-1 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition duration-200"
          >
            Verify
          </button>
        </div>
      </form></div>
    {/* Cards */}
    <div className="flex md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
      {/* First Card */}
      {/* <div className="text-center max-w-xs">
        <a href="https://sumairakamil.com">
          <img
            loading="lazy"
            src={sk1}
            alt="Sumaira Kamil"
            className="w-30 h-40 object-stretch rounded-lg shadow-lg mb-4 transition-transform transform hover:scale-105"
          />
        </a>
        <a href="https://sumairakamil.com">
          <h6 className="text-blue-500 font-semibold hover:underline">
            Sumaira Kamil
          </h6>
        </a>
      </div> */}

      {/* Second Card */}
      <div className="text-center max-w-xs">
        <a href="https://welfare.skworld.org">
          <img
            loading="lazy"
            src={sk3}
            alt="SK Welfare"
            className="w-30 h-40 mx-2 object-stretch rounded-lg shadow-lg mb-4 transition-transform transform hover:scale-105"
          />
        </a>
        <a href="https://welfare.skworld.org">
          <h6 className="text-blue-500 font-semibold hover:underline">
            SK Welfare
          </h6>
        </a>
      </div>
    </div>
  </div>
</section>
      {/* Features Section */}
      <section className="py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">App Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Verified Profiles"
              imgSrc={appdetails1}
              description="Authentic profiles for safe connections."
            />
            <FeatureCard
              title="Smart Search"
              imgSrc={appsearch}
              description="Advanced filters for finding ideal matches."
            />
            <FeatureCard
              title="Fast Chat"
              imgSrc={appchat}
              description="Connect quickly with compatible profiles."
            />
            <FeatureCard
              title="Profile Verification"
              imgSrc={appprofilever}
              description="Get your profile verified for better matches."
            />
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">How to Use the App</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Create an Account"
              imgSrc={regimage}
              description="Sign up to get started."
            />
            <FeatureCard
              title="Login"
              imgSrc={applogin}
              description="Login with your credentials."
            />
            <FeatureCard
              title="Welcome Screen"
              imgSrc={appwelcome}
              description="Navigate your matchmaking journey."
            />
            <FeatureCard
              title="Start Matching"
              imgSrc={appsearch}
              description="Find your ideal partner."
            />
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">More Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Add New Profile"
              imgSrc={appnew}
              description="Create new profiles easily."
            />
            <FeatureCard
              title="Change Settings"
              imgSrc={appprofile}
              description="Manage your preferences."
            />
            <FeatureCard
              title="Verify Your Account"
              imgSrc={appprofilever}
              description="Ensure account authenticity."
            />
            <FeatureCard
              title="Explore Matchmakers"
              imgSrc={appmmlist}
              description="Connect with verified matchmakers."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <CustomFooter />
    </div>
  );
};

export default Download;
