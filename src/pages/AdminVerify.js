import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import theme, { WEB } from "../theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import verified from "../assets/verified.png";

export default function Dashboard() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [clients, setClientData] = useState(null);
  const [sortBy, setSortBy] = useState("verified"); // Default sorting by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order

  const GetUser = () => {
    const users = localStorage.getItem("user");
    const data = JSON.parse(users);
    if (data) {
      setUser(data);
      const userId = data && data.userId;
      fetch(`${WEB.Backend}getusers`)
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
  }, []);

  useEffect(() => {
    GetUser();
  }, []);
 
  const handleVerifiedClick = async(client) => {
 

    const data = {
      verified: client.verified == "pending" ? "yes" : "no",
    };
    await axios
      .put(`${WEB.Backend}verify/${client.userId}`, data)
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Something failed. Please try again.");
      });
  };

 
  const sortedClients = clients ? [...clients] : [];
  sortedClients.sort((a, b) => {
    const compareValue = (valueA, valueB) => {
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    };

    const orderMultiplier = sortOrder === "asc" ? 1 : -1;

    switch (sortBy) {
      case "name":
        return compareValue(a.name, b.name) * orderMultiplier;
      case "number":
        return compareValue(a.phone, b.phone) * orderMultiplier;
      case "role":
        return compareValue(a.role, b.role) * orderMultiplier;
      case "status":
        return compareValue(a.status, b.status) * orderMultiplier;
      case "verified":
        return compareValue(a.verified, b.verified) * orderMultiplier;
      default:
        return 0;
    }
  });
 

  const handleviewClick = (client) => {
    navigate(`/profile/${client?.phone}`);
  };
  return (
    <>
<div className="container mx-auto">
  <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white">
    {clients &&
      sortedClients.map((client) => (
        <>
          {client.verified === "pending" && (
            <div key={client.clientid} className="bg-gradient-to-r from-purple-900 to-blue-900 text-white">
              <p className="text-gray-700 font-medium">Verification Pending</p>
              <div className="mb-3">
              <div className="bg-yellow-500  mx-5 text-center rounded-lg mt-2 text-white">
                     <h6>Profile for Verification</h6>
                   </div>
                <div className="flex m-1 rounded-full">
                  <div>
                    {client.avatar !== null && (
                      <img
                        loading="lazy"
                        className="w-24 h-auto object-cover rounded-full"
                        src={`${WEB.Image}${client.avatar}`}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white p-2 rounded-lg h-24">
                      <div className="m-1 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold">
                            {client.name}
                            {client.verified === "yes" && (
                              <img
                                loading="lazy"
                                src={verified}
                                alt="Verified"
                                height={20}
                                width={20}
                                className="inline-block ml-1"
                              />
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold">{client.role}</p>
                        </div>
                      </div>
                      <div className="m-1 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold">{client.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold">{client.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-gray-800 rounded-lg flex justify-center">
                    <div>
                      <button
                        className={`m-1 py-1 px-4 rounded-lg ${
                          client.verified === "pending"
                            ? "bg-green-600 text-white"
                            : "bg-gray-800 text-white"
                        }`}
                        onClick={() => handleVerifiedClick(client)}
                      >
                        {client.verified === "pending" ? "Verify" : "UnVerify"}
                      </button>

                      <button
                        className="m-1 py-1 px-4 bg-blue-600 text-white rounded-lg"
                        onClick={() => handleviewClick(client)}
                      >
                        View Profile
                      </button>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ))}
  </div>
</div>
    </>
  );
}
