import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
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
        state.cart.unshift(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    addFavoritesToCart: (state, action) => {
      action.payload.forEach(cartItem => {
        const itemIndex = state.cart.findIndex(item => item.id === cartItem.id);
        if (itemIndex >= 0) {
          state.cart[itemIndex].quantity += cartItem.quantity;
        } else {
          state.cart.unshift(cartItem);
        }
      });
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, addFavoritesToCart } = cartSlice.actions;

export default cartSlice.reducer;
