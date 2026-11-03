import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import theme, { WEB } from "../theme";
import verified from "../assets/verified.png";
import bg from '../assets/bg1.jpg'
import '../styles.css'
const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(`${WEB.Backend}profile/3323661898`);
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
    <div className="bgd">
      <main className="profile-shell">
        {data && (
          <section className="profile-panel">
              {data.avatar && (
                <div className="flex gap-2 justify-center items-center text-center ">
  
                <div className="profile-avatar-wrap">
                  <img loading="lazy"
                    className="avatarsk"
                    src={`${WEB.Image}${data.avatar}`}
                    alt="User Avatar"
                  /></div>
                  <div className="flex flex-col justify-center items-center text-center">
                          <p className="text-xl md:text-4xl font-extrabold">{data.name}</p> 
                          <p className="text-xs md:text-md  font-extrabold text-gray-500">{data?.email}</p> 
                          <p className="text-xs md:text-xl font-extrabold text-gray-500">{data.gender}</p> 
                          <p className="text-xs md:text-xl font-extrabold uppercase text-green-500">{data?.role}</p></div> 
                  
                  {data.verified === "yes" ? <img  style={{borderRadius:50,height:'30px',width:'30px'}}  src={verified}></img> : null}
                </div>
              )}

              <div className="profile-grid">
                <UserInfo label="Work Name" value={data.workname} />
                <UserInfo label="Phone" value={data.phone} />
                <UserInfo label="WhatsApp" value={data.whatsapp} />
                <UserInfo label="Landline" value={data.landline} />
                <UserInfo label="Area" value={data.area} />
                <UserInfo label="Address" value={data.address} />
                <UserInfo label="City" value={data.city} />
                <UserInfo label="Province" value={data.province} />
                <UserInfo label="Country" value={data.country} />
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

              <div className="social-section">
                <h2 className="section-title text-center">Social Media</h2>
              <div className="social-grid">
                <UserInfo label="Facebook" value={data.fb} />
                <UserInfo label="Instagram" value={data.ig} />
                <UserInfo label="TikTok" value={data.tt} />
                <UserInfo label="YouTube" value={data.yt} />
              </div>
              </div>
          </section>
        )}
      </main>
      </div>
    </>
  );
};

const UserInfo = ({ label, value, icon }) => (
  <div className="bgp">
    <div className="flex justify-center items-center text-center">
    <div>    <p className="user-info-label">{label}</p>
    <p className="user-info-value">
      <span>
        {value} {icon && <img loading="lazy" className="inline-block ml-2 w-5 h-5" src={icon} alt="Verified" />}
      </span>
    </p></div>
</div>
  </div>
);

export default UpdateUser;
