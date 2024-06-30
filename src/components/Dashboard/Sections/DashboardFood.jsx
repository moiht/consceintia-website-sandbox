import React from "react";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import DashboardFoodCart from "./DashboardFoodCart";
import { useSelector } from "react-redux";

function DashboardFood() {
  const { isCartVisible } = useSelector((state) => state.foodStore);
  return (
    <div>
      <div className={!isCartVisible ? "" : "hidden"}>
        <FeatureProducts />
      </div>
      <div className={isCartVisible ? "" : "hidden"}>
        <DashboardFoodCart />
      </div>
    </div>
  );
}

export default DashboardFood;
