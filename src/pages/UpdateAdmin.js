import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import theme,{WEB} from "../theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { countries, simulatedCities } from "./custom/LocationData"
import SelectCode from './custom/Select'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Phone is required"),
  password: Yup.string().required("Password is required"),

});

const UpdateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state && location.state.clientData;
  const userId = user.userId;
  const [isEditing, setIsEditing] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [othercity, setothercity] = useState(false);


  const formik = useFormik({
    initialValues: {
      name: user.name,
      ccode: user.ccode,
      phone: user.phone,
      email: user.email,
      password: user.password,
      city: user.city,
      province: user.province,
      country: user.country,
      role: user.role,
      status: user.status,
      gender: user.gender,
      verified: user.verified,
      avatar: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      // Upload avatar first if provided
      if (values.avatar) {
        await uploadAvatar(values.avatar);
      }

      // Update user information
      axios
        .put(`${WEB.Backend}updateuser/${userId}`, values)
        .then((response) => {
          console.log(response.data.message);
          toast.success(response.data.message);
         
          navigate("/admindashboard");
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          toast.error("Something failed. Please try again.");
        });
    },
  });

  const handleFileChange = (e) => {
    formik.setFieldValue("avatar", e.target.files[0]);
  };

  const uploadAvatar = async (avatar) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);

      const response = await axios.post(
        `${WEB.Backend}updateimage/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Avatar uploaded successfully:", response.data.message);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };
  //County Province City
  const handleCountryChange = (selectedCountry) => {
    const selectedCountryObj = countries.find(
      (country) => country.name === selectedCountry
    );

    if (selectedCountryObj) {
      setProvinces(selectedCountryObj.provinces || []);
      setCities([]);
      formik.setFieldValue("province", "");
      formik.setFieldValue("city", "");
    }
  };

  const handleProvinceChange = (selectedProvince) => {
    
    setCities(simulatedCities.filter(city => city.state_name === selectedProvince));
    formik.setFieldValue("city", "");
  };
  const handleAvatarClick = () => {
    document.getElementById("avatarInput").click();
  };

  return (
    <>
      <Navbar />
      <div className="container p-4">
  <div className="container bg-gray-100 mb-3 mt-2 text-gray-800">
    <div className="container pt-2">
      <div className="flex ">
        <div className="flex justify-between ">
          <div>
            
              <div onClick={handleAvatarClick}>
                {formik.values.avatar ? (
                  <img
                    loading="lazy"
                    className="rounded"
                    style={{ height: "5rem", width: "5rem" }}
                    src={URL.createObjectURL(formik.values.avatar)}
                  />
                ) : (
                  <img
                    loading="lazy"
                    style={{ height: "5rem", width: "5rem" }}
                    src={`${WEB.Image}${user.avatar}`}
                  />
                )}
                <input
                  hidden
                  id="avatarInput"
                  className="form-control text-gray-800"
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                />
              </div>
             
           
            
          </div>
          <div className="container">
            <Link
              to={`https://wa.me/${user.ccode + user.phone}?text= Hi ${user.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-success m-2 text-white bg-green-500 hover:bg-green-600 p-2 rounded">
                <FontAwesomeIcon style={{ fontSize: 24 }} icon={faWhatsapp} /> User
              </button>
            </Link>
          </div>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {/* Render input fields for each user property */}
        {/* Manual rendering of each input field */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="text-gray-800 border border-gray-300 rounded p-2 w-full"
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              className="border border-gray-300 rounded p-2 w-full"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="male" label="Male" />
              <option value="female" label="Female" />
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-500">{formik.errors.gender}</div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="ccode">Country Code</label>
            <SelectCode
              className="border border-gray-300 rounded p-2 w-full"
              id="ccode"
              name="ccode"
              value={formik.values.ccode}
              onChange={formik.handleChange}
            />
            {formik.touched.ccode && formik.errors.ccode && (
              <div className="text-red-500">{formik.errors.ccode}</div>
            )}
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              className="text-gray-800 border border-gray-300 rounded p-2 w-full"
              type="number"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500">{formik.errors.phone}</div>
            )}
          </div>
        
        <div className="mt-4">
          <label htmlFor="email">Email</label>
          <input
            className="text-gray-800 border border-gray-300 rounded p-2 w-full"
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="password">Password</label>
          <input
            className="text-gray-800 border border-gray-300 rounded p-2 w-full"
            type="text"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
  <div className="w-full md:w-1/3">
    <label className="block font-medium mb-1">Country:</label>
    <select
      className="w-full border border-gray-300 rounded p-2"
      name="country"
      value={formik.values.country}
      onChange={(e) => {
        formik.handleChange(e);
        handleCountryChange(e.target.value);
      }}
      onBlur={formik.handleBlur}
    >
      <option value={formik.values.country} label={formik.values.country} />
      {countries.map((country) => (
        <option key={country.name} value={country.name} label={country.name} />
      ))}
    </select>
    {formik.touched.country && formik.errors.country && (
      <div className="text-red-500">{formik.errors.country}</div>
    )}
  </div>

  <div className="w-full md:w-1/3">
    <label className="block font-medium mb-1">Province:</label>
    <select
      className="w-full border border-gray-300 rounded p-2"
      name="province"
      value={formik.values.province}
      onChange={(e) => {
        formik.handleChange(e);
        handleProvinceChange(e.target.value);
      }}
      onBlur={formik.handleBlur}
      disabled={!formik.values.country}
    >
      <option value={formik.values.province} label={formik.values.province} />
      {provinces.map((province) => (
        <option key={province} value={province} label={province} />
      ))}
    </select>
    {formik.touched.province && formik.errors.province && (
      <div className="text-red-500">{formik.errors.province}</div>
    )}
  </div>

  <div className="w-full md:w-1/3">
    <label className="block font-medium mb-1">City:</label>
    <select
      className="w-full border border-gray-300 rounded p-2"
      name="city"
      value={formik.values.city}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      disabled={!formik.values.province}
    >
      <option value={formik.values.city} label={formik.values.city} />
      <option>
        <div onClick={() => setothercity(true)}>Other</div>
      </option>
      {cities.map((dt) => (
        <option key={dt.city_name} label={dt.city_name} value={dt.city_name} />
      ))}
    </select>
    {formik.touched.city && formik.errors.city && (
      <div className="text-red-500">{formik.errors.city}</div>
    )}
  </div>
</div>

<div className="flex flex-wrap gap-4 mt-4">
  <div className="w-full md:w-1/3">
    <label className="block font-medium mb-1">Role:</label>
    <select
      className="w-full border border-gray-300 rounded p-2"
      name="role"
      value={formik.values.role}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <option value="matchmaker" label="Match Maker" />
      <option value="user" label="User" />
      <option value="admin" label="Admin" />
    </select>
    {formik.touched.role && formik.errors.role && (
      <div className="text-red-500">{formik.errors.role}</div>
    )}
  </div>

  <div className="w-full md:w-1/3">
    <label className="block font-medium mb-1">Status:</label>
    <select
      className="w-full border border-gray-300 rounded p-2"
      name="status"
      value={formik.values.status}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <option value="enabled" label="Enabled" />
      <option value="disabled" label="Disabled" />
    </select>
    {formik.touched.status && formik.errors.status && (
      <div className="text-red-500">{formik.errors.status}</div>
    )}
  </div>

  <div className="w-full md:w-1/3">
    <label className="block font-medium mb-1">Verified?</label>
    <select
      className="w-full border border-gray-300 rounded p-2"
      name="verified"
      value={formik.values.verified}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <option value={formik.values.verified} label={formik.values.verified} />
      <option value="yes" label="Yes" />
      <option value="no" label="No" />
      <option value="pending" label="Pending" />
    </select>
    {formik.touched.verified && formik.errors.verified && (
      <div className="text-red-500">{formik.errors.verified}</div>
    )}
  </div>
</div></div>

      </form>
      <div className="mt-4 flex justify-center">
        <button
          className="bg-black text-white p-3 rounded hover:bg-gray-800"
          onClick={() => formik.handleSubmit()}
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</div>

















    </>
  );
};

export default UpdateUser;
                
  