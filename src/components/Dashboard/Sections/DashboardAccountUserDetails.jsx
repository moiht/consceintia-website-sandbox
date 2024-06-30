import React, { useEffect, useState } from "react";
import styles from "@/components/Dashboard/Sections/styles/DashboardStyle.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilSquare } from "react-icons/bs";
import UpdateName from "./AccountUpdate/UpdateName";
import { setUpdateIndex } from "@/lib/features/dashboard/dashboardSlice";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";
import { setUser } from "@/lib/features/auth/authSlice";
import UpdatePhone from "./AccountUpdate/UpdatePhone";
import UpdateCollege from "./AccountUpdate/UpdateCollege";
import UpdateAadhar from "./AccountUpdate/UpdateAadhar";
import UpdateCollegeId from "./AccountUpdate/UpdateCollegeId";

function DashboardAccountUserDetails() {
  const { currUser } = useSelector((state) => state.auth);
  const [aadhartoshow, setaadhar] = useState("");
  const { updateIndex } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const formatAadhar = (aadhar) => {
    let newaadhar = "";
    let aadhar1 = aadhar.toString();
    newaadhar = newaadhar.concat(
      aadhar1.slice(0, 4),
      " ",
      aadhar1.slice(4, 8),
      " ",
      aadhar1.slice(8)
    );
    setaadhar(newaadhar);
  };

  useEffect(() => {
    if (currUser.aadhar) {
      formatAadhar(currUser.aadhar);
    }
  }, [currUser.aadhar]);

  const updateImg = async (url) => {
    toast.loading("Updating Profile Pic");
    let res = await fetch("/api/updateUser/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: url,
      }),
    });
    if (res.status == 200) {
      toast.dismiss();
      let data = await res.json();
      dispatch(setUser(data));
    } else {
      toast.dismiss();
      toast.error("Profile not updated");
    }
  };

  return (
    <div className={`${styles["accountCardContainer"]}`}>
      <div
        className={`${
          updateIndex === 1 ? "flex" : "hidden"
        } bg-slate-600 bg-opacity-35 absolute w-full h-full z-20 items-center justify-center`}
      >
        <UpdateName />
      </div>
      <div
        className={`${
          updateIndex === 3 ? "flex" : "hidden"
        } bg-slate-600 bg-opacity-35 absolute w-full h-full z-20 items-center justify-center`}
      >
        <UpdatePhone />
      </div>
      <div
        className={`${
          updateIndex === 5 ? "flex" : "hidden"
        } bg-slate-600 bg-opacity-35 absolute w-full h-full z-20 items-center justify-center`}
      >
        <UpdateCollege />
      </div>
      <div
        className={`${
          updateIndex === 4 ? "flex" : "hidden"
        } bg-slate-600 bg-opacity-35 absolute w-full h-full z-20 items-center justify-center`}
      >
        <UpdateCollegeId />
      </div>
      <div
        className={`${
          updateIndex === 6 ? "flex" : "hidden"
        } bg-slate-600 bg-opacity-35 absolute w-full h-full z-20 items-center justify-center`}
      >
        <UpdateAadhar />
      </div>
      <div className={`${styles["accountCard"]}`}>
        <p className="font-bold text-[1.5em] tracking-[1.2px] mb-2 text-white">
          DETAILS
        </p>
        <div className="mb-5 relative">
          <CldUploadButton
            uploadPreset="gsh4jyxf"
            onSuccess={(res) => {
              updateImg(res.info.secure_url);
            }}
          >
            <div
              className="absolute flex rounded-full cursor-pointer z-10 hover:bg-opacity-40 hover:bg-primary items-center justify-center top-[20px] h-[170px] w-[170px]"
              onClick={() => dispatch(setUpdateIndex(2))}
            >
              <BsPencilSquare />
            </div>
            <img
              className={`relative ${styles["accountprofilepic"]} z-40`}
              src={currUser.profile}
              alt="profile"
            />
          </CldUploadButton>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-medium text-[1em] flex tracking-[1.2px] mb-2 text-[#c5c5c5]">
            NAME
            <div
              className="ml-1 cursor-pointer"
              onClick={() => dispatch(setUpdateIndex(1))}
            >
              <BsPencilSquare />
            </div>
          </p>
          <div className="w-full flex item justify-between">
            <div className={`${styles["accountName"]}`}>
              <p className={`${styles["accountNameHeading"]}`}>First</p>
              <p className={`${styles["accountNameText"]}`}>
                {currUser.firstName ? currUser.firstName : "--"}
              </p>
            </div>
            <div
              className={`${styles["accountName"]} ${styles.accountNameLast}`}
            >
              <p className={`${styles["accountNameHeading"]}`}>Last</p>
              <p className={`${styles["accountNameText"]}`}>
                {currUser.lastName ? currUser.lastName : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-3">
          <p className="font-medium text-[1em] tracking-[1.2px] mt-2 text-[#c5c5c5]">
            USERNAME
          </p>
          <p className="text-[1em] text-white">
            {currUser.username ? currUser.username : "--"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-3">
          <p className="font-medium text-[1em] tracking-[1.2px] mt-2 text-[#c5c5c5]">
            EMAIL
          </p>
          <p className="text-[1em] text-white">
            {currUser.email ? currUser.email : "--"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-3">
          <p className="font-medium flex text-[1em] tracking-[1.2px] mt-2 text-[#c5c5c5]">
            MOBILE
            <div
              className="ml-1 cursor-pointer"
              onClick={() => dispatch(setUpdateIndex(3))}
            >
              <BsPencilSquare />
            </div>
          </p>
          <p className="text-[1em] text-white">
            {currUser.mobile ? currUser.mobile : "--"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-3">
          <p className="font-medium flex text-[1em] tracking-[1.2px] mt-2 text-[#c5c5c5]">
            COLLEGE ID
            <div
              className="ml-1 cursor-pointer"
              onClick={() => dispatch(setUpdateIndex(4))}
            >
              <BsPencilSquare />
            </div>
          </p>
          <p className="text-[1em] text-white">
            {currUser.collegeId ? currUser.collegeId : "--"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-3">
          <p className="font-medium flex text-[1em] tracking-[1.2px] mt-2 text-[#c5c5c5]">
            COLLEGE
            <div
              className="ml-1 cursor-pointer"
              onClick={() => dispatch(setUpdateIndex(5))}
            >
              <BsPencilSquare />
            </div>
          </p>
          <p className="text-[1em] text-white">
            {currUser.college ? currUser.college : "--"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-3 mb-5">
          <p className="font-medium flex text-[1em] tracking-[1.2px] mt-2 text-[#c5c5c5]">
            AADHAR
            <div
              className="ml-1 cursor-pointer"
              onClick={() => dispatch(setUpdateIndex(6))}
            >
              <BsPencilSquare />
            </div>
          </p>
          <p className="text-[1em] text-white">
            {currUser.aadhar ? aadhartoshow : "--"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardAccountUserDetails;
