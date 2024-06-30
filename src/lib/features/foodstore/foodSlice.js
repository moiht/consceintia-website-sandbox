import { createSlice } from "@reduxjs/toolkit";

export const foodSlice = createSlice({
  name: "foodStore",
  initialState: {
    cart: [],
    finalCart: [],
    finalCartTotal: 0,
    isCartVisible: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.finalCart.push({ ...action.payload, quantity: 1 });
      state.finalCartTotal += action.payload.price * 100;
    },
    showCart: (state, action) => {
      state.isCartVisible = action.payload;
    },
    increaseQty: (state, action) => {
      const product = state.finalCart.find(
        (product) => product._id === action.payload
      );
      product.quantity += 1;
      state.finalCartTotal += product.price * 100;
    },
    decreaseQty: (state, action) => {
      const product = state.finalCart.find(
        (product) => product._id === action.payload
      );
      if (product.quantity > 1) {
        product.quantity -= 1;
        state.finalCartTotal -= product.price * 100;
      } else {
        state.finalCart = state.finalCart.filter(
          (product) => product._id !== action.payload
        );
        state.cart = state.cart.filter(
          (product) => product._id !== action.payload
        );
        state.finalCartTotal -= product.price * 100;
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.finalCart = [];
      state.finalCartTotal = 0;
    },
  },
});

export const { addToCart, showCart, increaseQty, decreaseQty, clearCart } =
  foodSlice.actions;
export default foodSlice.reducer;
