import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import loadingSlice from "./features/loading/loadingSlice";
import authSlice from "./features/auth/authSlice";
import dashboardSlice from "./features/dashboard/dashboardSlice";
import navbarSlice from "./features/navbar/navbarSlice";
import foodSlice from "./features/foodstore/foodSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice,
      loading: loadingSlice,
      auth: authSlice,
      dashboard: dashboardSlice,
      navbar: navbarSlice,
      foodStore: foodSlice,
    },
  });
};
