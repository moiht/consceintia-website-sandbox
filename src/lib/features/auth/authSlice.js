import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    signupdone: false,
    currUser: {},
    isUser: false,
    isAllFilled: false,
  },
  reducers: {
    sendSignup: (state, actions) => {
      state.signupdone = actions.payload;
    },
    setUser: (state, actions) => {
      state.currUser = actions.payload;
      state.currUser.foodOrders.reverse();
      let data = actions.payload;
      state.isAllFilled =
        data.aadhar &&
        data.college &&
        data.collegeId &&
        data.email &&
        data.firstName &&
        data.lastName &&
        data.mobile &&
        data.profile &&
        data.username;
    },
    setIsUser: (state, actions) => {
      state.isUser = actions.payload;
    },
    refreshFoodOrder: (state, actions) => {
      state.currUser.foodOrders.forEach((order, i, a) => {
        if (order._id == actions.payload._id) {
          state.currUser.foodOrders[i] = actions.payload;
        }
      });
    },
    setFoodHistory: (state, actions) => {
      state.currUser.foodOrders = actions.payload;
      state.currUser.foodOrders.reverse();
    },
  },
});

export const {
  sendSignup,
  setUser,
  setIsUser,
  refreshFoodOrder,
  setFoodHistory,
} = authSlice.actions;
export default authSlice.reducer;
