import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    hamburgerOpen: false,
  },
  reducers: {
    setHamburger(state, actions) {
      state.hamburgerOpen = !state.hamburgerOpen;
    },
  },
});

export const { setHamburger } = navbarSlice.actions;
export default navbarSlice.reducer;
