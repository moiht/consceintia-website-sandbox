import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isSidebarOpen: false,
    navigationmenu: 1,
    updateIndex: 0,
  },
  reducers: {
    toggleSidebar: (state) => {
      console.log("Clicked");
      state.isSidebarOpen = !state.isSidebarOpen;
      console.log(state.isSidebarOpen);
    },
    setNavigationMenu: (state, action) => {
      state.navigationmenu = action.payload;
    },
    setUpdateIndex: (state, action) => {
      state.updateIndex = action.payload;
    },
  },
});

export const { toggleSidebar, setNavigationMenu, setUpdateIndex } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
