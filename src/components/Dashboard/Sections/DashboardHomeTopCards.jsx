import React from "react";
import styles from "@/components/Dashboard/Sections/styles/DashboardStyle.module.css";

function DashboardHomeTopCards() {
  return (
    <div
      className={`${styles["dhomecards"]} sm:flex-row flex flex-col gap-[15px] justify-center items-center mt-4`}
    >
      <div className={`${styles["dhometopcard"]} bg-[#f43f5e]`}>
        <p className={`${styles["dhometip"]}`}>3</p>
        <p className={`${styles["dhomesectext"]}`}>Events Registered</p>
      </div>
      <div className={`${styles["dhometopcard"]} bg-[#3b82f6]`}>
        <p className={`${styles["dhometip"]}`}>4</p>
        <p className={`${styles["dhomesectext"]}`}>Workshops Registered</p>
      </div>
      <div className={`${styles["dhometopcard"]} bg-[#22c55e]`}>
        <p className={`${styles["dhometip"]}`}>2</p>
        <p className={`${styles["dhomesectext"]}`}>Merch Purchased</p>
      </div>
      <div className={`${styles["dhometopcard"]} bg-[#91e02a]`}>
        <p className={`${styles["dhometip"]}`}>2</p>
        <p className={`${styles["dhomesectext"]}`}>Accommodation Booked</p>
      </div>
    </div>
  );
}

export default DashboardHomeTopCards;
