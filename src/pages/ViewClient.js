import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import theme, { WEB } from "../theme";
export default function ViewClient() {
  const navigate = useNavigate();
  const location = useLocation();
  const client = location.state && location.state.clientData;

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
  <div className="bg-gray-100 mb-3 mt-2 text-gray-800 p-4 rounded">
    <div className="pt-2">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Avatar */}
        <div className="flex justify-center items-center">
          {client.avatar == null ? null : (
            <img loading="lazy"
              className="h-60 w-60 object-contain"
              src={`${WEB.Image}${client.avatar}`}
              alt="Avatar"
            />
          )}
        </div>

        {/* Photo 1 */}
        <div className="flex justify-center items-center">
          {client.photo1 == null ? null : (
            <img loading="lazy"
              className="h-28 w-28 object-cover rounded"
              src={`${WEB.Image}${client.photo1}`}
              alt="Photo 1"
            />
          )}
        </div>

        {/* Photo 2 */}
        <div className="flex justify-center items-center">
          {client.photo2 == null ? null : (
            <img loading="lazy"
              className="h-28 w-28 object-cover rounded"
              src={`${WEB.Image}${client.photo2}`}
              alt="Photo 2"
            />
          )}
        </div>
      </div>
   



            <Link
              to={`https://wa.me/${client.ccode + client.contact
                }?text=Profile from skworld.org is this available?
                %0A%0A%0AProposal Details%0A
                %0AProposal Type:${client.proptype}
                %0ASharing Type:${client.shareamount}
                %0AAmount In Rupees:${client.amount}
                %0AProposal Priority:${client.propprio}
                %0AProposal For:${client.propfor} 
                %0A%0A%0APersonal Details%0A
                %0AProfile By:${client.role}
                %0AGender:${client.gender}
                %0AName:${client.name}
                %0AAge:${client.age}
                %0AHeight:${client.height}
                %0AMarital Status:${client.maritalstatus}
                %0ADivorce Reason:${client.divorcereason}
                %0AChildren:${client.children}
                %0AEducation:${client.education}
                %0AJob:${client.job}
                %0ABusiness:${client.business}
                %0AIncome:${client.income}
                %0ALanguage:${client.language}
                %0ACast:${client.cast}
                %0AMaslak:${client.maslak}
                %0AComplexion:${client.complexion}
                %0A%0A%0AFamily Details%0A
                %0ABelongs:${client.belongs}
                %0AFamily Status:${client.familystatus}
                %0AHome Type:${client.hometype}
                %0AHome Size:${client.homesize}
                %0AFather:${client.father}
                %0AMother:${client.mother}
                %0ABrothers:${client.brothers}
                %0ASisters:${client.sisters}
                %0A%0A%0AResidential Details%0A
                %0AArea:${client.area}
                %0AFull Address:${client.fulladdress}
                %0ACountry:${client.country}
                %0AProvince:${client.province}
                %0ACity:${client.city}
                %0A%0A%0ARequirement Details%0A
                %0AAge From:${client.reqage}
                %0AAge To:${client.reqageto}
                %0ACast:${client.reqcast}
                %0AMaslak:${client.reqmaslak}
                %0AEducation:${client.reqeducation}
                %0AHeight:${client.reqheight}
                %0AMarital Status:${client.reqmaritalstatus}
                %0AFamily Status:${client.reqfamilystatus}
                %0ACountry:${client.reqcountry}
                %0AProvince:${client.reqprovince}
                %0ACity:${client.reqcity}
                %0A%0A%0AOther Details%0A
                %0ADescription:${client.description}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="col m-2 text-green-500 bg-gray-100 px-4 py-2 rounded shadow flex items-center justify-center"

            
              >
                <FontAwesomeIcon style={{ fontSize: 24 }} icon={faWhatsapp} />
                &nbsp;Match Maker
              </button>
            </Link>

            <button
              className="col m-2 text-green-500 bg-gray-100 px-4 py-2 rounded shadow flex items-center justify-center"
              onClick={() => {
                const textToCopy = `Profile from skworld.org is this available?\n\nProposal Details\n\nProposal Type:${client.proptype}\nSharing Type:${client.shareamount}\nAmount In Rupees:${client.amount}\nProposal Priority:${client.propprio}\nProposal For:${client.propfor}\n\nPersonal Details\n\nProfile By:${client.role}\nGender:${client.gender}\nName:${client.name}\nAge:${client.age}\nHeight:${client.height}\nMarital Status:${client.maritalstatus}\nDivorce Reason:${client.divorcereason}\nChildren:${client.children}\nEducation:${client.education}\nJob:${client.job}\nBusiness:${client.business}\nIncome:${client.income}\nLanguage:${client.language}\nCast:${client.cast}\nMaslak:${client.maslak}\nComplexion:${client.complexion}\n\nFamily Details\n\nBelongs:${client.belongs}\nFamily Status:${client.familystatus}\nHome Type:${client.hometype}\nHome Size:${client.homesize}\nFather:${client.father}\nMother:${client.mother}\nBrothers:${client.brothers}\nSisters:${client.sisters}\n\nResidential Details\n\nArea:${client.area}\nFull Address:${client.fulladdress}\nCountry:${client.country}\nProvince:${client.province}\nCity:${client.city}\n\nRequirement Details\n\nAge From:${client.reqage}\nAge To:${client.reqageto}\nCast:${client.reqcast}\nMaslak:${client.reqmaslak}\nEducation:${client.reqeducation}\nHeight:${client.reqheight}\nMarital Status:${client.reqmaritalstatus}\nFamily Status:${client.reqfamilystatus}\nCountry:${client.reqcountry}\nProvince:${client.reqprovince}\nCity:${client.reqcity}\n\nOther Details\n\nDescription:${client.description}`;
                navigator.clipboard
                  .writeText(textToCopy)
                  .then(() => {
                    toast.success("Profile copied to clipboard");
                  })
                  .catch((err) => {
                    console.error("Unable to copy text to clipboard", err);
                  });
              }}
            >
              <FontAwesomeIcon icon={"copy"} /> Copy Profile
            </button>
          </div>
         
          <h5 className="mt-4 text-black font-semibold">Proposal Details</h5>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black font-medium">Type</label>
    <p>{client.proptype}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black font-medium">Share Type</label>
    <p>{client.shareamount}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black font-medium">Amount</label>
    <p>{client.amount}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black font-medium">Proposal Origin</label>
    <p>{client.propfor}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="block text-black font-medium">Proposal Priority</label>
    <p>{client.propprio}</p>
  </div>
</div>

<h5 className="mt-4 text-black">
  Personal Details
</h5>
<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Client ID</label>
    <p>{client.clientid.toUpperCase()}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Profile By</label>
    <p>{client.role !== null && client.role === "user" ? "Candidate" : "Matchmaker"}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Name</label>
    <p>{client.name}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Gender</label>
    <p>{client.gender}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Age</label>
    <p>{client.age}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Height</label>
    <p>{client.height}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Cast</label>
    <p>{client.cast}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Maslak</label>
    <p>{client.maslak}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Marital Status</label>
    <p>{client.maritalstatus}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Education</label>
    <p>{client.education}</p>
  </div>
</div>

{(client.maritalstatus === "divorced" || client.maritalstatus === "divorcedchild") && (
  <div className="flex flex-wrap">
    <div className="w-1/2 sm:w-1/4">
      <label className="text-black">Divorce Reason</label>
      <p>{client.divorcereason}</p>
    </div>
  </div>
)}

{client.maritalstatus === "divorcedchild" && (
  <div className="flex flex-wrap">
    <div className="w-1/2 sm:w-1/4">
      <label className="text-black">Children</label>
      <p>{client.children}</p>
    </div>
  </div>
)}

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Language</label>
    <p>{client.language}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Complexion</label>
    <p>{client.complexion}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Job</label>
    <p>{client.job}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Business</label>
    <p>{client.business}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Income</label>
    <p>{client.income}</p>
  </div>
</div>

<h5 className="mt-4 text-black">
  Residence Details
</h5>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Belongs</label>
    <p>{client.belongs}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Country</label>
    <p>{client.country}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Province</label>
    <p>{client.province}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">City</label>
    <p>{client.city}</p>
  </div>
</div>

<h5 className="mt-4 text-black">
  Family Details
</h5>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Area</label>
    <p>{client.area}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Family Status</label>
    <p>{client.familystatus}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Full Address</label>
    <p>{client.fulladdress}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Home Type</label>
    <p>{client.hometype}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Home Size</label>
    <p>{client.homesize}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Father</label>
    <p>{client.father}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Mother</label>
    <p>{client.mother}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Brothers</label>
    <p>{client.brothers}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Sisters</label>
    <p>{client.sisters}</p>
  </div>
</div>

<h5 className="mt-4 text-black">
  Requirement Details
</h5>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Age</label>
    <p>{client.reqage}-{client.reqageto}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Marital Status</label>
    <p>{client.reqmaritalstatus}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Maslak</label>
    <p>{client.reqmaslak}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Height</label>
    <p>{client.reqheight}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Education</label>
    <p>{client.reqeducation}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Cast</label>
    <p>{client.reqcast}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Family Status</label>
    <p>{client.reqfamilystatus}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">City</label>
    <p>{client.reqcity}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Province</label>
    <p>{client.reqprovince}</p>
  </div>
  <div className="w-1/2 sm:w-1/4">
    <label className="text-black">Country</label>
    <p>{client.reqcountry}</p>
  </div>
</div>

<div className="flex flex-wrap">
  <div className="w-1/2">
    <label className="text-black">Description</label>
    <p>{client.description}</p>
  </div>
</div>
</div>      </div>
    </>
  );
}
