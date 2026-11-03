import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import theme, { WEB } from "../theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { countries, simulatedCities } from "./custom/LocationData";

export default function Dashboard() {
  const [user, setUser] = useState();
  const [clients, setClientData] = useState(null);
  const [showResults, setShowResults] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchVisible, setsearchVisible] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [ageFilter, setAgeFilter] = useState(0);
  const [agetoFilter, setAgetoFilter] = useState(100);
  const [provinces, setProvinces] = useState([]);

  const [cities, setCities] = useState([]);

  const [filters, setFilters] = useState({
    city: "",
    country: "",
    maritalStatus: "",
    name: "",
    ageFrom: "",
    ageTo: "",
    gender: "female",
    province: "",
    education: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const filteredClients = clients
    ? clients.filter((client) => {
        const lowerAge = parseInt(ageFilter);
        const upperAge = parseInt(agetoFilter);
        const ageInRange = lowerAge <= client?.age && client?.age <= upperAge;
        return (
          client.name.toLowerCase().includes(filters.name.toLowerCase()) &&
          ageInRange &&
          client.maritalstatus
            .toLowerCase()
            .includes(filters.maritalStatus.toLowerCase()) &&
          client.city.toLowerCase().includes(filters.city.toLowerCase()) &&
          client.gender.toLowerCase() === filters.gender.toLowerCase() &&
          client.province
            .toLowerCase()
            .includes(filters.province.toLowerCase()) &&
          client.country
            .toLowerCase()
            .includes(filters.country.toLowerCase()) &&
          client.status !== "disabled"
        );
      })
    : null;

  const handleViewClick = (client) => {
    navigate(`/viewClient/${client.clientid}`, {
      state: { clientData: client },
    });
  };

  const handleUpdateClick = (client) => {
    navigate(`/updateclient/${client.clientid}`, {
      state: { clientData: client },
    });
  };

  const handleDeleteClick = async (client) => {
    try {
      const response = await axios.post(
        `${WEB.Backend}clients/delete/${clientToDelete.clientid}`
      );
      if (response.data.message) {
        setClientData((prevClients) =>
          prevClients.filter((c) => c.clientid !== clientToDelete.clientid)
        );
        toast.success(response.data.message);
        setShowModal(false);
      }
    } catch (error) {
      toast.error("Something failed. Please try again.");
    }
  };

  const handleShowModal = (client) => {
    setShowModal(true);
    setClientToDelete(client);
  };

  const handleCloseModal = () => setShowModal(false);

  const GetUser = () => {
    const users = localStorage.getItem("user");
    const data = JSON.parse(users);
    if (data) {
      setUser(data);
      fetch(`${WEB.Backend}clients/search`)
        .then((response) => response.json())
        .then((data2) => {
          setClientData(data2.data);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  useEffect(() => {
    GetUser();
  }, [filters]);

  const handleCountryChange = (selectedCountry) => {
    const selectedCountryObj = countries.find(
      (country) => country.name === selectedCountry
    );

    if (selectedCountryObj) {
      setProvinces(selectedCountryObj.provinces || []);
      setCities([]);
      handleFilterChange("province", "");
      handleFilterChange("city", "");
    }
  };
  const handleProvinceChange = (selectedProvince) => {
    // Simulate fetching cities data based on the selected province
    // In a real-world scenario, you would need a proper API that provides this data

    setCities(
      simulatedCities.filter((city) => city.state_name === selectedProvince)
    );

    handleFilterChange("city", "");
  };

  const genderOptions = ["Male", "Female"];
  const maritalStatusOptions = [
    "Single",
    "Divorced",
    "DivorcedChild",
    "Nikkah Break",
    "Widowed",
    "Separated",
    "Second Marriage",
  ];

  return (
    <>
      <Navbar />
      {searchVisible ? (
        <>
          <div className="flex container bg-white mx-auto p-6 shadow-lg">
            <div className="m-4">
              <div className="items-center mb-4">
                <label className="mr-2 text-primary font-semibold">
                  Looking for:
                </label>
                <br />
                <select
                  className="form-select w-full shadow-md focus:ring-2 focus:ring-primary"
                  value={filters.gender}
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
                >
                  <option key={filters.gender} value={filters.gender}>
                    {filters.gender?.toUpperCase()}
                  </option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="items-center mb-4">
                <label className="mr-2 text-primary font-semibold">
                  Age From:
                </label>
                <br />
                <input
                  type="number"
                  className="form-input w-full shadow-md focus:ring-2 focus:ring-primary"
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                />
              </div>

              <div className="items-center mb-4">
                <label className="mr-2 text-primary font-semibold">
                  Marital Status:
                </label>
                <br />
                <select
                  className="form-select w-full shadow-md focus:ring-2 focus:ring-primary"
                  value={filters.maritalStatus}
                  onChange={(e) =>
                    handleFilterChange("maritalStatus", e.target.value)
                  }
                >
                  <option value=""></option>
                  {maritalStatusOptions.map((option) => (
                    <option key={option} value={option.toLowerCase()}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="items-center mb-4">
                <label className="mr-2 text-primary font-semibold">
                  Profile By:
                </label>
                <br />
                <select
                  className="form-select w-full shadow-md focus:ring-2 focus:ring-primary"
                  value={filters.role}
                  onChange={(e) => handleFilterChange("role", e.target.value)}
                >
                  <option value=""></option>
                  <option value="user">Candidate</option>
                  <option value="matchmaker">Matchmaker</option>
                </select>
                <div className="flex-1">
                  <label className="mr-2 text-primary font-semibold">
                    Province
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    name="province"
                    value={filters.province}
                    onChange={(e) => {
                      handleProvinceChange(e.target.value);
                    }}
                    onBlur={handleFilterChange}
                  >
                    <option value="" label="" />
                    {provinces.map((province) => (
                      <option
                        key={province}
                        value={province}
                        label={province}
                      />
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="m-4">
              <div className="items-center mb-4">
                <label className="mr-2 text-primary font-semibold">Name:</label>
                <br />
                <input
                  type="text"
                  className="form-input w-full shadow-md focus:ring-2 focus:ring-primary"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                />
              </div>

              <div className="items-center mb-4">
                <label className="mr-2 text-primary font-semibold">
                  Age To:
                </label>
                <br />
                <input
                  type="number"
                  className="form-input w-full shadow-md focus:ring-2 focus:ring-primary"
                  value={agetoFilter}
                  onChange={(e) => setAgetoFilter(e.target.value)}
                />
              </div>

              <div className="items-center mb-4">
                <label className="mr-2 text-primary font-semibold">
                  Education:
                </label>
                <br />
                <input
                  type="text"
                  className="form-input w-full shadow-md focus:ring-2 focus:ring-primary"
                  value={filters.education}
                  onChange={(e) =>
                    handleFilterChange("education", e.target.value)
                  }
                />
              </div>

              <div className="flex-1">
                <label className="mr-2 text-primary font-semibold">
                  Country
                </label>
                <select
                  className="w-full border rounded px-2 py-1"
                  name="country"
                  value={filters.country}
                  onChange={(e) => {
                    handleCountryChange(e.target.value);
                  }}
                  onBlur={handleFilterChange}
                >
                  <option value="" label="" />
                  {countries.map((country) => (
                    <option
                      key={country.name}
                      value={country.name}
                      label={country.name}
                    />
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="mr-2 text-primary font-semibold">City</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  onBlur={handleFilterChange}
                >
                  <option value="" label="" />
                  {cities.map((city) => (
                    <option
                      key={city.city_name}
                      value={city.city_name}
                      label={city.city_name}
                    />
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div>
            <div
              className="bg-danger text-center text-white py-2 px-2 hover: text-center-dark transition duration-300"
              onClick={() => setsearchVisible(false)}
            >
              Hide Search
            </div>
          </div>
        </>
      ) : (
        <div>
          <div
            className="bg-danger text-center
text-center text-white py-2 px-2 hover:bg-danger-dark transition duration-300"
            onClick={() => setsearchVisible(true)}
          >
            Show Search
          </div>
        </div>
      )}

      {showResults && (
        <div className="">
          <div className="text-dark text-center mb-4">
            <h2 className="text-2xl font-semibold">Search Clients</h2>
            <p className="text-lg">
              Total Clients:{" "}
              {clients && clients.length > 0 ? clients.length : "No Clients"}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4 items-center text-lg font-semibold mb-4">
            <div>Photo</div>
            <div>Name</div>
            <div>Status</div>
            <div>Age</div>
            <div>City</div>
          </div>

          {filteredClients && filteredClients.length === 0 && (
            <p className="text-center text-lg">No Results Found</p>
          )}
<div className="text-center">{!clients && "Loading..."}</div>
          {filteredClients &&
            filteredClients.map((client) => (
              <>
                <div
                  key={client.clientid}
                  className="flex mb-3 bg-gradient-to-r from-purple-900 to-blue-900 text-white"
                >
                  <div className="py-5 px-3">
                    <img
                      loading="lazy"
                      className="w-24 h-40 object-contain"
                      src={`${WEB.Image}${client.avatar}`}
                      alt={client.name}
                    />
                  </div>
                  <div className="items-center mt-3 justify-center">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-xl m-2">{client?.name?.toUpperCase()}</p>
                      <p className="font-bold text-sm m-2">{client?.status?.toUpperCase()}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-sm m-2">{client.age}</p>
                      <p className="font-bold text-sm m-2">{client?.city?.toUpperCase()}</p>
                    </div>
                  
                      <div className="flex mt-3 space-x-2">
                        <button
                          onClick={() => handleViewClick(client)}
                          className="bg-green-500 p-2 space-x-5 rounded-md text-white"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleUpdateClick(client)}
                          className="bg-yellow-500 p-2 space-x-5 rounded-md text-white"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleShowModal(client)}
                          className="bg-red-500 p-2 space-x-5 rounded-md text-white"
                        >
                          Delete
                        </button>
                      </div>
               
                  </div>
                </div>
              </>
            ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-center mb-4">
              Are you sure you want to delete this {clientToDelete?.name}
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-secondary text-white py-2 px-2 hover:bg-secondary-dark transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteClick(clientToDelete)}
                className="bg-danger text-white py-2 px-2 hover:bg-danger-dark transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
