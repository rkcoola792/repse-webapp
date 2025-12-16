import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
