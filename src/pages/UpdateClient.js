import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import THEME,{WEB} from "../theme";
import { toast, ToastContainer } from "react-toastify";
import { countries, simulatedCities } from "./custom/LocationData"
import SelectCode from './custom/Select'


import "react-toastify/dist/ReactToastify.css";


  const validationSchema = Yup.object({
    gender: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    age: Yup.number().required("Required").positive("Must be a positive number"),
  });




const UpdateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const client = location.state && location.state.clientData;
  
  const [user, setUserData] = useState(location.state.clientData);
  const [provinces, setProvinces] = useState([]);
  const [reqprovinces, setreqProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [reqcities, setreqCities] = useState([]);
  const [othercity, setothercity] = useState(false);
  const [otherreqcity, setotherreqcity] = useState(false);



  
  useEffect(() => {
    if (location.state && location.state.clientData) {
      setUserData(location.state.clientData);
    } else {
     
    }
  }, [location.state]);

  const userId = user.userId;
  const [isEditing, setIsEditing] = useState(true);


  const formik = useFormik({
    
    initialValues :{  
      matchmakerid:client?.matchmakerid,
      role:client?.role,
      gender: client?.gender,
      name: client?.name,
      age: client?.age,
      height: client?.height,
      ccode: client?.ccode,
      contact: client?.contact,
      cast: client?.cast,
      maslak: client?.maslak,
      complexion: client?.complexion,
      maritalstatus: client?.maritalstatus,
      divorcereason: client?.divorcereason,
      children: client?.children,
      education: client?.education,
      job: client?.job,
      business: client?.business,
      income: client?.income,
      language: client?.language,
      belongs: client?.belongs,
      country: client?.country,
      province: client?.province,
      city: client?.city,
      area: client?.area,
      familystatus:client?.familystatus,
      fulladdress: client?.fulladdress,
      hometype: client?.hometype,
      homesize: client?.homesize,
      father: client?.father,
      mother: client?.mother,
      brothers: client?.brothers,
      sisters: client?.sisters,
      reqage: client?.reqage,
      reqageto: client?.reqageto,
      reqcast: client?.reqcast,
      reqmaslak: client?.reqmaslak,
      reqheight: client?.reqheight,
      reqfamilystatus: client?.reqfamilystatus,
      reqmaritalstatus: client?.reqmaritalstatus,
      reqeducation: client?.reqeducation,
      reqcity: client?.reqcity,
      reqprovince: client?.reqprovince,
      reqcountry: client?.reqcountry,
      proptype: client?.proptype,
      shareamount: client?.shareamount,
      amount: client?.amount,
      propfor: client?.propfor,
      propprio: client?.propprio,
      description: client?.description,
      avatar:client?.avatar,
      photo1:client?.photo1,
      photo2:client?.photo2},
      validationSchema,
    onSubmit: async (values) => {
      // Update user information
      axios
        .put(`${WEB.Backend}clients/update/${client?.clientid}`, values)
        .then((response) => {
          console.log(response.data.message);
          toast.success(response.data.message);
          console.log(response)
          navigate("/allclients");
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

  
  const imageupdate=async(values)=>{
       
    try {
        const formData = new FormData();

        formData.append('avatar', values.avatar[0]?values.avatar[0]:[]);
        formData.append('photo1', values.photo1[0]?values.photo1[0]:[]);
        formData.append('photo2', values.photo2[0]?values.photo2[0]:[]);


        const response = await axios.put(`${WEB.Backend}clients/update/images/${client?.clientid}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(response.data.message);
        navigate('/allclients')
        setIsEditing(false);
    } catch (error) {
        toast.error("Image Update Failed");
        console.error("Registration error: ", error.response.data.error);
      }


// Handle form submission (update the records with new values)
console.log("Form submitted with values:", values);

  }
  const deletephotos=async()=>{
       
    try {
        const formData = new FormData();

        formData.append('avatar', []);
        formData.append('photo1', []);
        formData.append('photo2', []);


        const response = await axios.put(`${WEB.Backend}clients/delete/images/${client?.clientid}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(response.data.message);
        navigate('/allclients')
        setIsEditing(false);
    } catch (error) {
        toast.error("Something failed Please Try Again");
        console.error("Registration error: ", error.response.data.error);
      }



  }
    
  const handleCountryChange = selectedCountry => {
    const selectedCountryObj = countries.find(country => country.name === selectedCountry);

    if (selectedCountryObj) {
      setProvinces(selectedCountryObj.provinces || []);
      setCities([]);
      formik.setFieldValue('province', '');
      formik.setFieldValue('city', '');
    }
  };
  const handleProvinceChange = selectedProvince => {
    // Simulate fetching cities data based on the selected province
    // In a real-world scenario, you would need a proper API that provides this data

    setCities(simulatedCities.filter(city => city.state_name === selectedProvince));
    formik.setFieldValue('city', '');
  };

  
  const handlereqCountryChange = selectedCountry => {
    const selectedCountryObj = countries.find(country => country.name === selectedCountry);

    if (selectedCountryObj) {
      setreqProvinces(selectedCountryObj.provinces || []);
      setreqCities([]);
      formik.setFieldValue('reqprovince', '');
      formik.setFieldValue('reqcity', '');
    }
  };

    const handlereqProvinceChange = selectedProvince => {
    // Simulate fetching cities data based on the selected province
    // In a real-world scenario, you would need a proper API that provides this data

    setreqCities(simulatedCities.filter(city => city.state_name === selectedProvince));
    formik.setFieldValue('reqcity', '');
  };
  return (
    <>
<Navbar/>
              

       
<div className="container bg-gray-100 text-gray-800 p-5 rounded">
  <h3 className="mb-4 text-xl font-semibold">Photos</h3>

  <div>
    <div className="mb-3">
      <label htmlFor="avatar" className="block text-gray-700">Photo:</label>
      <input
        type="file"
        className="w-full border rounded px-2 py-1"
        onChange={(event) => formik.setFieldValue('avatar', event.currentTarget.files)}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="photo1" className="block text-gray-700">Photo 2:</label>
      <input
        type="file"
        className="w-full border rounded px-2 py-1"
        onChange={(event) => formik.setFieldValue('photo1', event.currentTarget.files)}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="photo2" className="block text-gray-700">Photo 3:</label>
      <input
        type="file"
        className="w-full border rounded px-2 py-1"
        onChange={(event) => formik.setFieldValue('photo2', event.currentTarget.files)}
      />
    </div>

    <button
      className="w-1/2 bg-gray-800 text-white py-2 rounded mt-2"
      onClick={isEditing ? () => imageupdate(formik.values) : null}
    >
      {isEditing ? "Update Photos" : "Change Photos"}
    </button>
    <button
      className="w-1/2 bg-red-600 text-white py-2 rounded mt-2"
      onClick={deletephotos}
    >
      Delete Photos
    </button>
  </div>

  <h3 className="mt-6 mb-4 text-xl font-semibold">Proposal Details</h3>

  <div className="flex flex-wrap gap-4">
    <div className="flex-1">
      <label className="block text-gray-700">Type</label>
      <select
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("proptype")}
      >
        <option value="" label="" />
        <option value="Own" label="Own" />
        <option value="Sharing Local" label="Sharing Local" />
        <option value="Sharing Abroad" label="Sharing Abroad" />
      </select>
      {formik.touched.proptype && formik.errors.proptype && (
        <div className="text-red-600">{formik.errors.proptype}</div>
      )}
    </div>

    <div className="flex-1">
      <label className="block text-gray-700">Sharing Type</label>
      <select
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("shareamount")}
      >
        <option value="" label="" />
        <option value="No Sharing" label="No Sharing" />
        <option value="Will Give Sharing" label="Will Give Sharing" />
        <option value="Will Get Sharing" label="Will Get Sharing" />
      </select>
      {formik.touched.shareamount && formik.errors.shareamount && (
        <div className="text-red-600">{formik.errors.shareamount}</div>
      )}
    </div>

    <div className="flex-1">
      <label className="block text-gray-700">Amount</label>
      <input
        type="text"
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("amount")}
      />
      {formik.touched.amount && formik.errors.amount && (
        <div className="text-red-600">{formik.errors.amount}</div>
      )}
    </div>
  </div>

  <div className="flex flex-wrap gap-4 mt-4">
    <div className="flex-1">
      <label className="block text-gray-700">Proposal Origin</label>
      <select
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("propfor")}
      >
        <option value="" label="" />
        <option value="Local To Local" label="Local To Local" />
        <option value="Local To Abroad" label="Local To Abroad" />
        <option value="Abroad To Local" label="Abroad To Local" />
        <option value="Abroad To Abroad" label="Abroad To Abroad" />
        <option value="Both Local & Abroad" label="Both Local & Abroad" />
      </select>
      {formik.touched.propfor && formik.errors.propfor && (
        <div className="text-red-600">{formik.errors.propfor}</div>
      )}
    </div>

    <div className="flex-1">
      <label className="block text-gray-700">Proposal Priority</label>
      <select
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("propprio")}
      >
        <option value="" label="" />
        <option value="Low" label="Low" />
        <option value="Normal" label="Normal" />
        <option value="Urgent" label="Urgent" />
        <option value="Very Urgent" label="Very Urgent" />
      </select>
      {formik.touched.propprio && formik.errors.propprio && (
        <div className="text-red-600">{formik.errors.propprio}</div>
      )}
    </div>
  </div>
  <h3 className="mb-4 pt-5 text-xl font-semibold">Personal Details</h3>
<form onSubmit={formik.handleSubmit}>
  <div className="flex flex-wrap gap-4">
    <div className="hidden">
      <label className="block text-gray-700">Matchmaker ID</label>
      <input
        type="text"
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("matchmakerid")}
      />
      {formik.touched.matchmakerid && formik.errors.matchmakerid && (
        <div className="text-red-600">{formik.errors.matchmakerid}</div>
      )}
    </div>

    <div className="flex-1">
      <label className="block text-gray-700">Gender</label>
      <select
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("gender")}
      >
        <option value="" label="" />
        <option value="male" label="Male" />
        <option value="female" label="Female" />
      </select>
      {formik.touched.gender && formik.errors.gender && (
        <div className="text-red-600">{formik.errors.gender}</div>
      )}
    </div>

    <div className="flex-1">
      <label className="block text-gray-700">Name</label>
      <input
        type="text"
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("name")}
      />
      {formik.touched.name && formik.errors.name && (
        <div className="text-red-600">{formik.errors.name}</div>
      )}
    </div>

    <div className="w-1/4">
      <label className="block text-gray-700">Age</label>
      <input
        type="text"
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("age")}
      />
      {formik.touched.age && formik.errors.age && (
        <div className="text-red-600">{formik.errors.age}</div>
      )}
    </div>
  </div>

  <div className="flex flex-wrap gap-4 mt-4">
    <div className="w-1/4">
      <label className="block text-gray-700">Height</label>
      <input
        type="text"
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("height")}
      />
      {formik.touched.height && formik.errors.height && (
        <div className="text-red-600">{formik.errors.height}</div>
      )}
    </div>

    <div className="hidden">
      <label className="block text-gray-700">Contact</label>
      <input
        type="text"
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("contact")}
      />
      {formik.touched.contact && formik.errors.contact && (
        <div className="text-red-600">{formik.errors.contact}</div>
      )}
    </div>

    <div className="hidden">
      <label className="block text-gray-700">Country Code</label>
      <SelectCode
        type="text"
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("ccode")}
      />
      {formik.touched.ccode && formik.errors.ccode && (
        <div className="text-red-600">{formik.errors.ccode}</div>
      )}
    </div>

    <div className="flex-1">
      <label className="block text-gray-700">Cast</label>
      <input
        type="text"
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("cast")}
      />
      {formik.touched.cast && formik.errors.cast && (
        <div className="text-red-600">{formik.errors.cast}</div>
      )}
    </div>

    <div className="flex-1">
      <label className="block text-gray-700">Maslak</label>
      <input
        type="text"
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("maslak")}
      />
      {formik.touched.maslak && formik.errors.maslak && (
        <div className="text-red-600">{formik.errors.maslak}</div>
      )}
    </div>
  </div>

  <div className="flex flex-wrap gap-4 mt-4">
    <div className="flex-1">
      <label className="block text-gray-700">Marital Status</label>
      <select
        className="w-full border rounded px-2 py-1"
        {...formik.getFieldProps("maritalstatus")}
      >
        <option value="" label="" />
        <option value="single" label="Single Never Married" />
        <option value="nikkahbreak" label="Nikkah Break" />
        <option value="divorced" label="Divorced" />
        <option value="divorcedchild" label="Divorced (With Children)" />
        <option value="widowed" label="Widowed" />
        <option value="separated" label="Separated" />
        <option value="Second Marriage" label="Second Marriage" />
      </select>
      {formik.touched.maritalstatus && formik.errors.maritalstatus && (
        <div className="text-red-600">{formik.errors.maritalstatus}</div>
      )}
    </div>

    {formik.values.maritalstatus === 'divorced' || formik.values.maritalstatus === 'divorcedchild' ? (
      <div className="flex-1">
        <label className="block text-gray-700">Reason</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          {...formik.getFieldProps("divorcereason")}
        />
        {formik.touched.divorcereason && formik.errors.divorcereason && (
          <div className="text-red-600">{formik.errors.divorcereason}</div>
        )}
      </div>
    ) : null}

    {formik.values.maritalstatus === 'divorcedchild' && (
      <div className="flex-1">
        <label className="block text-gray-700">Children</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          {...formik.getFieldProps("children")}
        />
        {formik.touched.children && formik.errors.children && (
          <div className="text-red-600">{formik.errors.children}</div>
        )}
      </div>
    )}
  </div>
  <div className="flex flex-wrap gap-4">
  <div className="flex-1">
    <label className="block text-gray-700">Complexion</label>
    <input
      type="text"
      className="w-full border rounded px-2 py-1"
      {...formik.getFieldProps("complexion")}
    />
    {formik.touched.complexion && formik.errors.complexion && (
      <div className="text-red-600">{formik.errors.complexion}</div>
    )}
  </div>

  <div className="flex-1">
    <label className="block text-gray-700">Education</label>
    <input
      type="text"
      className="w-full border rounded px-2 py-1"
      {...formik.getFieldProps("education")}
    />
    {formik.touched.education && formik.errors.education && (
      <div className="text-red-600">{formik.errors.education}</div>
    )}
  </div>

  <div className="flex-1">
    <label className="block text-gray-700">Language</label>
    <input
      type="text"
      className="w-full border rounded px-2 py-1"
      {...formik.getFieldProps("language")}
    />
    {formik.touched.language && formik.errors.language && (
      <div className="text-red-600">{formik.errors.language}</div>
    )}
  </div>
</div>

<div className="flex flex-wrap gap-4 mt-4">
  <div className="flex-1">
    <label className="block text-gray-700">Job</label>
    <input
      type="text"
      className="w-full border rounded px-2 py-1"
      {...formik.getFieldProps("job")}
    />
    {formik.touched.job && formik.errors.job && (
      <div className="text-red-600">{formik.errors.job}</div>
    )}
  </div>

  <div className="flex-1">
    <label className="block text-gray-700">Business</label>
    <input
      type="text"
      className="w-full border rounded px-2 py-1"
      {...formik.getFieldProps("business")}
    />
    {formik.touched.business && formik.errors.business && (
      <div className="text-red-600">{formik.errors.business}</div>
    )}
  </div>

  <div className="flex-1">
    <label className="block text-gray-700">Income</label>
    <input
      type="text"
      className="w-full border rounded px-2 py-1"
      {...formik.getFieldProps("income")}
    />
    {formik.touched.income && formik.errors.income && (
      <div className="text-red-600">{formik.errors.income}</div>
    )}
  </div>
</div>

<h3 className="mb-4 pt-5 text-xl font-semibold">Residence Details</h3>

<div className="flex flex-wrap gap-4">
  <div className="flex-1">
    <label className="block text-gray-700">Country</label>
    <select
      className="w-full border rounded px-2 py-1"
      name="country"
      value={formik.values.country}
      onChange={e => {
        formik.handleChange(e);
        handleCountryChange(e.target.value);
      }}
      onBlur={formik.handleBlur}
    >
      <option value="" label="" />
      {countries.map(country => (
        <option key={country.name} value={country.name} label={country.name} />
      ))}
    </select>
    {formik.touched.country && formik.errors.country && (
      <div className="text-red-600">{formik.errors.country}</div>
    )}
  </div>

  <div className="flex-1">
    <label className="block text-gray-700">Province</label>
    <select
      className="w-full border rounded px-2 py-1"
      name="province"
      value={formik.values.province}
      onChange={e => {
        formik.handleChange(e);
        handleProvinceChange(e.target.value);
      }}
      onBlur={formik.handleBlur}
      disabled={!formik.values.country}
    >
      <option value="" label="" />
      {provinces.map(province => (
        <option key={province} value={province} label={province} />
      ))}
    </select>
    {formik.touched.province && formik.errors.province && (
      <div className="text-red-600">{formik.errors.province}</div>
    )}
  </div>

  <div className="flex-1">
    <label className="block text-gray-700">City</label>
    <select
      className="w-full border rounded px-2 py-1"
      name="city"
      value={formik.values.city}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      disabled={!formik.values.province}
    >
      <option value="" label="" />
      {cities.map(city => (
        <option key={city.city_name} value={city.city_name} label={city.city_name} />
      ))}
    </select>
    {formik.touched.city && formik.errors.city && (
      <div className="text-red-600">{formik.errors.city}</div>
    )}
  </div>
</div>

      
<div className="flex flex-wrap">
  <div className="m-2 w-1/4">
    <label className="block text-sm font-medium mb-1">Belongs</label>
    <input
      type="text"
      className="block w-full border border-gray-300 rounded px-2 py-1"
      {...formik.getFieldProps("belongs")}
    />
    {formik.touched.belongs && formik.errors.belongs && (
      <div className="text-red-500 text-sm">{formik.errors.belongs}</div>
    )}
  </div>

  <div className="m-2 w-1/4">
    <label className="block text-sm font-medium mb-1">Area</label>
    <input
      type="text"
      className="block w-full border border-gray-300 rounded px-2 py-1"
      {...formik.getFieldProps("area")}
    />
    {formik.touched.area && formik.errors.area && (
      <div className="text-red-500 text-sm">{formik.errors.area}</div>
    )}
  </div>

  <div className="m-2 w-1/4">
    <label className="block text-sm font-medium mb-1">Full Address</label>
    <input
      type="text"
      className="block w-full border border-gray-300 rounded px-2 py-1"
      {...formik.getFieldProps("fulladdress")}
    />
    {formik.touched.fulladdress && formik.errors.fulladdress && (
      <div className="text-red-500 text-sm">{formik.errors.fulladdress}</div>
    )}
  </div>
</div>

<h3 className="text-lg font-bold mt-5 mb-2">Family Details</h3>
<div className="flex flex-wrap">
  <div className="m-2 w-1/4">
    <label className="block text-sm font-medium mb-1">Family Status</label>
    <input
      type="text"
      className="block w-full border border-gray-300 rounded px-2 py-1"
      {...formik.getFieldProps("familystatus")}
    />
    {formik.touched.familystatus && formik.errors.familystatus && (
      <div className="text-red-500 text-sm">{formik.errors.familystatus}</div>
    )}
  </div>

  <div className="m-2 w-1/4">
    <label className="block text-sm font-medium mb-1">Home Type</label>
    <input
      type="text"
      className="block w-full border border-gray-300 rounded px-2 py-1"
      {...formik.getFieldProps("hometype")}
    />
    {formik.touched.hometype && formik.errors.hometype && (
      <div className="text-red-500 text-sm">{formik.errors.hometype}</div>
    )}
  </div>

  <div className="m-2 w-1/4">
    <label className="block text-sm font-medium mb-1">Home Size</label>
    <input
      type="text"
      className="block w-full border border-gray-300 rounded px-2 py-1"
      {...formik.getFieldProps("homesize")}
    />
    {formik.touched.homesize && formik.errors.homesize && (
      <div className="text-red-500 text-sm">{formik.errors.homesize}</div>
    )}
  </div>
</div>

<h3 className="text-lg font-bold mt-5 mb-2">Requirements</h3>
<div className="flex flex-wrap">
  <div className="m-2 w-1/4">
    <label className="block text-sm font-medium mb-1">Age From</label>
    <input
      type="text"
      className="block w-full border border-gray-300 rounded px-2 py-1"
      {...formik.getFieldProps("reqage")}
    />
    {formik.touched.reqage && formik.errors.reqage && (
      <div className="text-red-500 text-sm">{formik.errors.reqage}</div>
    )}
  </div>

  <div className="m-2 w-1/4">
    <label className="block text-sm font-medium mb-1">Age To</label>
    <input
      type="text"
      className="block w-full border border-gray-300 rounded px-2 py-1"
      {...formik.getFieldProps("reqageto")}
    />
    {formik.touched.reqageto && formik.errors.reqageto && (
      <div className="text-red-500 text-sm">{formik.errors.reqageto}</div>
    )}
  </div>
</div>
<div className="flex flex-wrap">
  <div className="m-2 w-1/4">
    <label className="block text-sm font-medium mb-1">Education</label>
    <input
      type="text"
      className="block w-full border border-gray-300 rounded px-2 py-1"
      {...formik.getFieldProps("reqeducation")}
    />
    {formik.touched.reqeducation && formik.errors.reqeducation && (
      <div className="text-red-500 text-sm">{formik.errors.reqeducation}</div>
    )}
  </div>

  <div className="m-2 w-1/4">
    <label className="block text-sm font-medium mb-1">MaritalStatus</label>
    <input
      type="text"
      className="block w-full border border-gray-300 rounded px-2 py-1"
      {...formik.getFieldProps("reqmaritalstatus")}
    />
    {formik.touched.reqmaritalstatus && formik.errors.reqmaritalstatus && (
      <div className="text-red-500 text-sm">{formik.errors.reqmaritalstatus}</div>
    )}
  </div>
</div>

<div className="flex justify-center mt-5">
  <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">
    Save
  </button>
</div>
     
      </form>
    </div>
    </>
  );
};

export default UpdateUser;