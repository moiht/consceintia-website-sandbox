"use client";
import { navigationLinks } from "@/data/sidebar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
navigationLinks;
import styles from "@/components/styles/Sidebar.module.css";
import { RiLogoutCircleFill, RiTeamFill } from "react-icons/ri";
import { FaHome, FaTshirt, FaUser } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { GiClothes } from "react-icons/gi";
import {
  MdEmojiEvents,
  MdHotel,
  MdFastfood,
  MdAdminPanelSettings,
  MdEventAvailable,
  MdFoodBank,
} from "react-icons/md";
import { SignOutButton } from "@clerk/nextjs";
import { LuPlaneLanding } from "react-icons/lu";
import { setNavigationMenu } from "@/lib/features/dashboard/dashboardSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Sidebar() {
  const activeLinkIdx = useSelector((state) => state.dashboard.navigationmenu);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useSelector((state) => state.dashboard);
  const { currUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const userRole = [currUser.role];
  console.log(userRole);

  useEffect(() => {
    console.log("Sidebar Changed");
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  const menuClicked = (id) => {
    if (id === 7 || id === 8) {
      toast.loading("Please Wait");
      router.push("/home");
    } else {
      dispatch(setNavigationMenu(id));
    }
  };

  return (
    <div
      className={`bg-primary w-[260px] pt-[24px] pb-[24px] pl-[16px] pr-[16px] ${styles.sidebar} ${styles[sidebarClass]}`}
    >
      <div className="flex justify-start items-center gap-x-4">
        <div
          className={`w-12 h-12 overflow-hidden rounded-full ${styles["user-img"]}`}
        >
          <img src={currUser.profile} alt="profile image" />
        </div>
        <span className={`${styles["info-name"]}`}>{currUser.firstName}</span>
      </div>

      <nav className={`${styles.navigation}`}>
        <ul className="nav-list">
          <li
            className={`
            ${styles["nav-item"]}`}
            onClick={menuClicked.bind(this, 1)}
          >
            <a
              href="#"
              className={`${styles["nav-link"]} ${
                1 === activeLinkIdx ? styles["active"] : null
              }`}
            >
              <FaHome />
              <span className="hidden xl:block xl:capitalize">HOME</span>
            </a>
          </li>

          <li
            className={`
            ${styles["nav-item"]}`}
            onClick={menuClicked.bind(this, 2)}
          >
            <a
              href="#"
              className={`${styles["nav-link"]} ${
                2 === activeLinkIdx ? styles["active"] : null
              }`}
            >
              <MdEmojiEvents />
              <span className="hidden xl:block xl:capitalize">EVENTS</span>
            </a>
          </li>

          <li
            className={`
            ${styles["nav-item"]}`}
            onClick={menuClicked.bind(this, 3)}
          >
            <a
              href="#"
              className={`${styles["nav-link"]} ${
                3 === activeLinkIdx ? styles["active"] : null
              }`}
            >
              <FaTshirt />
              <span className="hidden xl:block xl:capitalize">MERCHANDISE</span>
            </a>
          </li>

          <li
            className={`
            ${styles["nav-item"]}`}
            onClick={menuClicked.bind(this, 4)}
          >
            <a
              href="#"
              className={`${styles["nav-link"]} ${
                4 === activeLinkIdx ? styles["active"] : null
              }`}
            >
              <MdHotel />
              <span className="hidden xl:block xl:capitalize">
                ACCOMMODATION
              </span>
            </a>
          </li>

          <li
            className={`
            ${styles["nav-item"]}`}
            onClick={menuClicked.bind(this, 5)}
          >
            <a
              href="#"
              className={`${styles["nav-link"]} ${
                5 === activeLinkIdx ? styles["active"] : null
              }`}
            >
              <MdFastfood />
              <span className="hidden xl:block xl:capitalize">FOOD STORE</span>
            </a>
          </li>

          <li
            className={`
            ${styles["nav-item"]}`}
            onClick={menuClicked.bind(this, 6)}
          >
            <a
              href="#"
              className={`${styles["nav-link"]} ${
                6 === activeLinkIdx ? styles["active"] : null
              }`}
            >
              <FaUser />
              <span className="hidden xl:block xl:capitalize">ACCOUNT</span>
            </a>
          </li>

          <li
            className={`
            ${styles["nav-item"]}`}
            onClick={menuClicked.bind(this, 10)}
          >
            <a
              href="#"
              className={`${styles["nav-link"]} ${
                10 === activeLinkIdx ? styles["active"] : null
              }`}
            >
              <RiTeamFill />
              <span className="hidden xl:block xl:capitalize">MY TEAM</span>
            </a>
          </li>

          {/* admin Page */}

          {userRole.map((role) => {
            return role === "eventAdmin" || role === "admin" ? (
              <li
                className={`${styles["nav-item"]}`}
                onClick={menuClicked.bind(this, 9)}
              >
                <a
                  href="#"
                  className={`${styles["nav-link"]} ${
                    9 === activeLinkIdx ? styles["active"] : null
                  }`}
                >
                  <MdEventAvailable />
                  <span className="hidden xl:block xl:capitalize">
                    EVENT ADMIN
                  </span>
                </a>
              </li>
            ) : null;
          })}

          {userRole.map((role) => {
            return role === "workshopAdmin" || role === "admin" ? (
              <li
                className={`${styles["nav-item"]}`}
                onClick={menuClicked.bind(this, 11)}
              >
                <a
                  href="#"
                  className={`${styles["nav-link"]} ${
                    11 === activeLinkIdx ? styles["active"] : null
                  }`}
                >
                  <GrWorkshop />
                  <span className="hidden xl:block xl:capitalize">
                    WORKSHOP ADMIN
                  </span>
                </a>
              </li>
            ) : null;
          })}

          {userRole.map((role) => {
            return role === "merchAdmin" || role === "admin" ? (
              <li
                className={`${styles["nav-item"]}`}
                onClick={menuClicked.bind(this, 12)}
              >
                <a
                  href="#"
                  className={`${styles["nav-link"]} ${
                    12 === activeLinkIdx ? styles["active"] : null
                  }`}
                >
                  <GiClothes />
                  <span className="hidden xl:block xl:capitalize">
                    MERCH ADMIN
                  </span>
                </a>
              </li>
            ) : null;
          })}

          {userRole.map((role) => {
            return role === "foodAdmin" || role === "admin" ? (
              <li
                className={`${styles["nav-item"]}`}
                onClick={menuClicked.bind(this, 13)}
              >
                <a
                  href="#"
                  className={`${styles["nav-link"]} ${
                    13 === activeLinkIdx ? styles["active"] : null
                  }`}
                >
                  <MdFoodBank />
                  <span className="hidden xl:block xl:capitalize">
                    FOOD ADMIN
                  </span>
                </a>
              </li>
            ) : null;
          })}

          <li
            className={`
            ${styles["nav-item"]}`}
            onClick={menuClicked.bind(this, 7)}
          >
            <a
              href="#"
              className={`${styles["nav-link"]} ${
                7 === activeLinkIdx ? styles["active"] : null
              }`}
            >
              <LuPlaneLanding />
              <span className="hidden xl:block xl:capitalize">
                LANDING PAGE
              </span>
            </a>
          </li>
          <SignOutButton redirectUrl="/home">
            <li
              className={`
            ${styles["nav-item"]}`}
              onClick={menuClicked.bind(this, 8)}
            >
              <a
                href="#"
                className={`${styles["nav-link"]} ${
                  8 === activeLinkIdx ? styles["active"] : null
                }`}
              >
                <RiLogoutCircleFill />
                <span className="hidden xl:block xl:capitalize">SIGN OUT</span>
              </a>
            </li>
          </SignOutButton>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
