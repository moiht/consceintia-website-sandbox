import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/lib/features/dashboard/dashboardSlice";
import styles from "@/components/styles/ContentTop.module.css";
import { LuPlaneLanding } from "react-icons/lu";
import { FaShoppingCart, FaCartArrowDown, FaStore } from "react-icons/fa";
import ContentTopError from "./ContentTopError";
import { showCart } from "@/lib/features/foodstore/foodSlice";

function ContentTop() {
  const dispatch = useDispatch();
  const { navigationmenu } = useSelector((state) => state.dashboard);
  const { isAllFilled } = useSelector((state) => state.auth);
  const { isCartVisible } = useSelector((state) => state.foodStore);
  const toptext = [
    "",
    "Home",
    "Events",
    "Merchandise",
    "Accommodation",
    "Food Store",
    "Account",
    "",
    "",
    "Event Admin",
    "My Team",
    "Workshop Admin",
    "Merch Admin",
    "Food Admin",
  ];
  return (
    <>
      <div className={`${styles["main-content-top"]}`}>
        <div className={`${styles["content-top-left"]}`}>
          <button
            type="button"
            className={`${styles["sidebar-toggler"]}`}
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          >
            <img className="w-[20px]" src="/assets/icons/menu.svg" alt="" />
          </button>
          <h3 className={`${styles["content-top-title"]}`}>
            {toptext[navigationmenu]}
          </h3>
        </div>
        <div>
          {navigationmenu === 5 && isCartVisible && (
            <FaStore
              className="cursor-pointer"
              onClick={() => dispatch(showCart(false))}
            />
          )}
          {navigationmenu === 5 && !isCartVisible && (
            <FaShoppingCart
              className="cursor-pointer"
              onClick={() => dispatch(showCart(true))}
            />
          )}
        </div>
      </div>
      <div
        className={`${
          isAllFilled ? "hidden" : "flex"
        } justify-center items-center w-full`}
      >
        <ContentTopError />
      </div>
    </>
  );
}

export default ContentTop;
