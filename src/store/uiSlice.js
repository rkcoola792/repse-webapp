import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  shakeCart: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    triggerCartShake: (state) => {
      state.shakeCart = true;
    },
    resetCartShake: (state) => {
      state.shakeCart = false;
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  triggerCartShake,
  resetCartShake,
} = uiSlice.actions;

export default uiSlice.reducer;
