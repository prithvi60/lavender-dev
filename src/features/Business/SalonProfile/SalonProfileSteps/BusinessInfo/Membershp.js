import { AppBar, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import GetIcon from "../../../../../assets/Icon/icon";
import { useNavigate } from "react-router-dom";
import Buttons from "../../../../../components/Button";
import endpoint from "../../../../../api/endpoints";
import { useSelector } from "react-redux";

const Membershp = ({ setMembershipScreen }) => {
  const navigate = useNavigate();

  const userDetails = useSelector((state) => {
    return state?.currentUserDetails;
  });

  const [membershipTypesList, setMembershipTypesList] = useState([]);

  const membershipTypes = [
    {
      name: "Trial Package",
      url: "https://cdn-icons-png.flaticon.com/512/5627/5627082.png",
    },
    {
      name: "Silver Package",
      url: "https://static.wixstatic.com/media/b783c4_5b689d3bd6684e3284453fa936e97abb~mv2.png/v1/fill/w_560,h_548,al_c,lg_1,q_85,enc_auto/Silver-Package-Graphics-Design.png",
    },
    {
      name: "Golden Package",
      url: "https://www.clipartmax.com/png/small/277-2773436_gold-package-graphics-design-gold-logo-design-png.png",
    },
    {
      name: "Platinum Package",
      url: "https://cookcountysaloon.sfo2.digitaloceanspaces.com/wp-content/uploads/2022/02/15000850/platinum-package.png",
    },
  ];

  const getMembershipTypesList = async () => {
    try {
      const response = await endpoint.getTypesOfMembershipResults();
      const membeshipList = response.data.data;

      const urlMap = {};

      for (const type of membershipTypes) {
        urlMap[type.name] = type.url;
      }

      for (const membership of membeshipList) {
        membership.url = urlMap[membership.packageName];
      }

      setMembershipTypesList(membeshipList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMembershipTypesList();
  }, []);

  const goToCheckOutPage = async (packageName) => {
    const payLoad = {
      packageId: packageName?.packageId,
      establishmentId: userDetails?.establishmentId,
      currency: "USD",
      paymentMode: "ONLINE",
    };
    try {
      const response = await endpoint.makeSubscriptionInitiate(payLoad);

      if (response.data.data) {
        window.location.replace(response.data.data);
      } else {
        navigate("/business/payment-success");
        setMembershipScreen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen ">
      <div className="flex justify-center items-center membership-container-height py-2 ">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 sm:gap-0 pb-1">
          {membershipTypesList.map((membership) => (
            <div
              key={membership.packageId}
              className={
                membership.packageName === "Trial Package"
                  ? "flex flex-col justify-between items-center  w-[270px]  py-2 rounded-lg  border-t-4  border-t-gray-500 shadow transition-transform duration-300 hover:scale-110"
                  : membership.packageName === "Silver Package"
                  ? "flex flex-col justify-between items-center  w-[270px]  py-2 rounded-lg  border-t-4 border-t-blue-700 shadow transition-transform duration-300 hover:scale-110"
                  : membership.packageName === "Golden Package"
                  ? "flex flex-col justify-between items-center w-[270px]  py-2 rounded-lg  border-t-4 border-t-yellow-600 shadow transition-transform duration-300 hover:scale-110"
                  : "flex flex-col justify-between items-center  w-[270px]  py-2 rounded-lg  border-t-4 border-t-green-700 shadow transition-transform duration-300 hover:scale-110"
              }
            >
              <div className="flex flex-col justify-center items-center">
                <img
                  src={membership.url}
                  className="w-[40px] mt-2"
                  alt={membership.name}
                />

                <h5 className=" m-3 label">{membership.packageName}</h5>

                <p className="text-indigo-800 text-xl m-0 font-bold">
                  Price: $ {membership.amount}
                </p>
                <span className="text-sm font-medium text-gray-700">
                  Validity: {membership.duration} Days
                </span>
              </div>
              <button
                className="bg-transperent border-2  border-indigo-800 text-indigo-800 py-1 px-2 rounded font-medium text-base my-3"
                onClick={() => goToCheckOutPage(membership)}
              >
                Check Out
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Membershp;
