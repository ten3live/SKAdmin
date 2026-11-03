import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import theme, { WEB } from "../theme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import verified from "../assets/verified.png";
import AdminVerify from "./AdminVerify";

export default function Dashboard() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [clients, setClientData] = useState(null);
  const [userstatus, setuserStatus] = useState(null);
  const [sortBy, setSortBy] = useState("status");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showModal, setShowModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleUpdateClick = (client) => {
    navigate(`/updateadmin/${client?.userId}`, {
      state: { clientData: client },
    });
  };
  
  const handleDeleteClick = async (client) => {
    try {
      const response = await axios.post(
        `${WEB.Backend}delete/${clientToDelete.userId}`
      );

      if (response.data.message) {
        setClientData((prevClients) =>
          prevClients.filter((c) => c.userId !== clientToDelete.userId)
        );
        toast.success(response.data.message);
        setCount(count - 1);
        setShowModal(false);
      }
    } catch (error) {
      toast.error("Something failed Please Try Again");
    }
  };

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
          setCount(data2.length);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  
  const handleNewStatusClick = async (event, client) => {
    event.preventDefault(); // Prevent default page refresh
  
    const updatedStatus =
      client.status === "new"
        ? "enabled"
        : client.status === "disabled"
        ? "enabled"
        : "disabled";
  
    const data = { status: updatedStatus };
  
    try {
      const response = await axios.put(
        `${WEB.Backend}updateuserstatus/${client.userId}`,
        data
      );
  
      toast.success(response.data.message);
  
      // Update the specific client's status in the local state
      setClientData((prevClients) =>
        prevClients.map((c) =>
          c.userId === client.userId ? { ...c, status: updatedStatus } : c
        )
      );
    } catch (error) {
      toast.error("Something failed. Please try again.");
    }
  };  

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort);
  };

  const handleOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
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

  const filteredClients = sortedClients?.filter((client) => {
    return (
      client?.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      client?.phone?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      client?.role?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
  });
  
  const handleShowModal = (client) => {
    setShowModal(true);
    setClientToDelete(client);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Navbar counts={count} />
      <div className="container mx-auto">
        <div className="bg-light h-screen">
          

          <div className="flex items-center mt-3">
            <h6 className="ml-3">Welcome Admin {user && user.name}</h6>
            <p className="ml-3">
              Total Users: {clients && clients.length > 0 ? clients.length - 1 : "No Users"}
            </p>
          </div>

          <div className="flex items-center mt-3">
            <label className="ml-3">Sort by:</label>
            <select
              className="form-select ml-2 p-2"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="status">Status</option>
              <option value="name">Name</option>
              <option value="number">Number</option>
              <option value="role">Role</option>
              <option value="verified">Verification</option>
            </select>
            <button className="ml-2 btn btn-dark" onClick={handleOrderChange}>
              {sortOrder === "asc" ? "Asc" : "Desc"}
            </button>
          </div>
          <div className="text-center mt-4">
            <input
              type="text"
              className="p-2 border rounded-md w-full md:w-1/3"
              placeholder="Search by name, phone, or role"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center p-2 bg-light">
            <div className="w-1/5">Photo</div>
            <div className="w-1/5">Name</div>
            <div className="w-1/5">Role</div>
            <div className="w-1/5">Status</div>
            <div className="w-1/5">Phone</div>
          </div>
          <div>
            <AdminVerify />
          </div>

          <div className="text-center">{!clients && "Loading..."}</div>

          {clients &&
            filteredClients.map((client) => (
              client.adminrole !== "superadmin" && (
                <div key={client.clientid} className="flex mb-3 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
                 <div className="py-5 px-3">
                 {client.avatar && (
                        <img loading="lazy"
                          className="w-24 h-40 object-contain"
                          src={`${WEB.Image}${client.avatar}`}
                        />
                      )}
                    </div>
                 <div>
                 
                   

                   <div className=" flex flex-col ">
                     
                       
                       {client.status === "new" && (
                   <div className="bg-green-500  mx-5 text-center rounded-lg mt-2 text-white">
                     <h6>New Profile</h6>
                   </div>
                 )}
                 {client.status === "disabled" && (
                   <div className="bg-red-500  mx-5 text-center rounded-lg mt-2 text-white">
                     <h6>Profile Freezed</h6>
                   </div>
                 )}
</div>
<div className="flex p-2">
                 <div className="p-2 bg-light text-dark rounded-lg">
                 <div className="flex justify-between">
                       
                       <div className="flex">
                        <p className="font-bold text-lg">
                           {client?.name?.toUpperCase()}</p>
                           <div className="rounded-full  " >
                            {client?.verified === "yes" && (
                            <img className=""  loading="lazy" src={verified} height={20} width={20} alt="Verified" />
                           )}
                           </div></div>
                         
                       </div>
                       

                       <div className="flex justify-between items-center">
                       <p className="font-bold text-primary text-sm space-x">{client?.role?.toUpperCase()}</p>
                     
                       </div>
                       <div className="flex justify-between items-center">
                      
                         <p className="font-bold text-sm m-2">{client?.phone}</p>
                         <p className="font-bold text-sm m-2">{client?.city?.toUpperCase()}</p>
                       </div>
                     </div>
                  
                 </div>

                 <div className="flex m-2">
                  <div className="flex space-x-2">
                   <button
 className={`p-2 rounded-md text-white ${
   client?.status === "new"
   ? "bg-green-500"
   : client?.status === "enabled"
   ? "bg-black": "bg-blue-500"
 } `}
 onClick={(event) => handleNewStatusClick(event, client)}
><FontAwesomeIcon icon={client?.status === "new"
   ? "check"
   : client?.status === "enabled"
   ? "lock": "unlock"} />
 {client?.status === "new"
   ? "Approve"
   : client?.status === "enabled"
   ? "Block": "Unblock"}
</button>

                     <button
                       className="bg-yellow-500 p-2 rounded-md text-white"
                       onClick={() => handleUpdateClick(client)}
                     >
                       <FontAwesomeIcon icon="edit" />
                       Edit
                     </button>

                     <button
                       className="bg-red-500 p-2 rounded-md text-white"
                       onClick={() => handleShowModal(client)}
                     >
                       <FontAwesomeIcon icon="trash" />
                       Delete
                     </button>
                   </div>
                   </div>
                  </div> 

                 
                    <div className="mt-5"><p><hr></hr></p></div>
                  
                </div>
              )
            ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black">
          <div className="bg-white p-5 rounded-lg">
            <h3>Are you sure you want to delete {clientToDelete?.name} client?</h3>
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={handleDeleteClick}
            >
              Confirm
            </button>
            <button
              className="ml-2 bg-gray-300 text-black p-2 rounded-md"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
