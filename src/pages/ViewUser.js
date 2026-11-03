import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import theme, { WEB } from "../theme";
import verified from "../assets/verified.png";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(`${WEB.Backend}profile/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to load user profile:", error);
      setData(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div >
        {data && (
          <div className="mb-3">
            <div className="bg-gray-100 text-gray-900 p-5 rounded-md shadow-md">
              {data.avatar && (
                <div className="flex justify-center mb-5">
                  <img loading="lazy"
                    className="w-52 h-auto rounded shadow-lg"
                    src={`${WEB.Image}${data.avatar}`}
                    alt="User Avatar"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <UserInfo label="Name" value={data.name} icon={data.verified === "yes" ? verified : null} />
                <UserInfo label="Work Name" value={data.workname} />
                <UserInfo label="Role" value={data.role} />
                <UserInfo label="Phone" value={data.phone} />
                <UserInfo label="WhatsApp" value={data.whatsapp} />
                <UserInfo label="Landline" value={data.landline} />
                <UserInfo label="Area" value={data.area} />
                <UserInfo label="Address" value={data.address} />
                <UserInfo label="City" value={data.city} />
                <UserInfo label="Province" value={data.province} />
                <UserInfo label="Country" value={data.country} />
                <UserInfo label="Email" value={data.email} />
                <UserInfo label="Gender" value={data.gender} />
                <UserInfo label="Business Name" value={data.businessname} />
                <UserInfo label="Registered with Govt Organization" value={data.reggov} />
                <UserInfo label="Registered with Matchmakers Group" value={data.reggroup} />
                <UserInfo label="Non-Registered Single Matchmaker" value={data.nonreg} />
                <UserInfo label="Group Owner" value={data.groupowner} />
                <UserInfo label="Group Name" value={data.groupname} />
                <UserInfo label="Working As" value={data.workingas} />
                <UserInfo label="Work Area" value={data.workarea} />
                <UserInfo label="Charges in Advance" value={data.charges} />
                <UserInfo label="Your Fees Structure" value={data.fees} />
                <UserInfo label="Description" value={data.description} />
                <UserInfo label="SKID" value={data.userId} />
              </div>

              <h6 className="mt-5 text-lg font-semibold">Social Media</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                <UserInfo label="Facebook" value={data.fb} />
                <UserInfo label="Instagram" value={data.ig} />
                <UserInfo label="TikTok" value={data.tt} />
                <UserInfo label="YouTube" value={data.yt} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const UserInfo = ({ label, value, icon }) => (
  <div className="p-3 border border-gray-300 rounded-md">
    <p className="text-sm font-semibold text-gray-600">
      {label}:{" "}
      <span className="text-black font-normal">
        {value} {icon && <img loading="lazy" className="inline-block ml-2 w-5 h-5" src={icon} alt="Verified" />}
      </span>
    </p>
  </div>
);

export default UpdateUser;
