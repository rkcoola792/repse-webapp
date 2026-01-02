import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const itemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id);
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += item.quantity;
      } else {
        state.cart.unshift(item);
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter(item => item.id !== id);
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
    addFavoritesToCart: (state, action) => {
      const { favorites } = action.payload;
      favorites.forEach(cartItem => {
        const itemIndex = state.cart.findIndex(item => item.id === cartItem.id);
        if (itemIndex >= 0) {
          state.cart[itemIndex].quantity += cartItem.quantity;
        } else {
          state.cart.unshift(cartItem);
        }
      });
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, addFavoritesToCart } = cartSlice.actions;

export default cartSlice.reducer;
