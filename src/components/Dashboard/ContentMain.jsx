import React from "react";
import DashboardHome from "./Sections/DashboardHome";
import DashboardMerchs from "./Sections/DashboardMerchs";
import DashboardAccount from "./Sections/DashboardAccount";
import DashboardEvents from "./Sections/DashboardEvents";
import DashboardAccom from "./Sections/DashboardAccom";
import DashboardFood from "./Sections/DashboardFood";
import { useSelector } from "react-redux";
import DashboardEventAdmin from "./Sections/DashboardEventAdmin";
import DashboardTeams from "./Sections/DashboardTeams";
import DashboardWorkshopAdmin from "./Sections/DashboardWorkshopAdmin";
import DashboardMerchAdmin from "./Sections/DashboardMerchAdmin";
import DashboardFoodAdmin from "./Sections/DashboardFoodAdmin";

function ContentMain() {
  const { navigationmenu } = useSelector((state) => state.dashboard);
  const currUser = useSelector((state) => state.auth.currUser);
  const userRole = currUser.role;
  return (
    <div>
      <div className={1 === navigationmenu ? "" : "hidden"}>
        <DashboardHome />
      </div>
      <div className={2 === navigationmenu ? "" : "hidden"}>
        <DashboardEvents />
      </div>
      <div className={3 === navigationmenu ? "" : "hidden"}>
        <DashboardMerchs />
      </div>
      <div className={4 === navigationmenu ? "" : "hidden"}>
        <DashboardAccom />
      </div>
      <div className={5 === navigationmenu ? "" : "hidden"}>
        <DashboardFood />
      </div>
      <div className={6 === navigationmenu ? "" : "hidden"}>
        <DashboardAccount />
      </div>
      <div className={10 === navigationmenu ? "" : "hidden"}>
        <DashboardTeams />
      </div>
      {(userRole === "admin" || userRole === "eventAdmin") && (
        <div className={9 === navigationmenu ? "" : "hidden"}>
          <DashboardEventAdmin />
        </div>
      )}
      {(userRole === "admin" || userRole === "workshopAdmin") && (
        <div className={11 === navigationmenu ? "" : "hidden"}>
          <DashboardWorkshopAdmin />
        </div>
      )}
      {(userRole === "admin" || userRole === "merchAdmin") && (
        <div className={12 === navigationmenu ? "" : "hidden"}>
          <DashboardMerchAdmin />
        </div>
      )}
      {(userRole === "admin" || userRole === "foodAdmin") && (
        <div className={13 === navigationmenu ? "" : "hidden"}>
          <DashboardFoodAdmin />
        </div>
      )}
    </div>
  );
}

export default ContentMain;
