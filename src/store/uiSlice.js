import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cartView: 'cart', // 'cart' or 'wishlist'
  shakeCart: false,
  shakeFavorites: false,
  cartLoading: false,
  popup: {
    message: '',
    visible: false,
    undoAction: null,
    itemData: null,
  },
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
    triggerFavoritesShake: (state) => {
      state.shakeFavorites = true;
    },
    resetFavoritesShake: (state) => {
      state.shakeFavorites = false;
    },
    setCartLoading: (state, action) => {
      state.cartLoading = action.payload;
    },
    setCartView: (state, action) => {
      state.cartView = action.payload;
    },
    showPopup: (state, action) => {
      state.popup.message = action.payload.message;
      state.popup.undoAction = action.payload.undoAction;
      state.popup.itemData = action.payload.itemData;
      state.popup.visible = true;
    },
    hidePopup: (state) => {
      state.popup.visible = false;
      state.popup.undoAction = null;
      state.popup.itemData = null;
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleCart,
  triggerCartShake,
  resetCartShake,
  triggerFavoritesShake,
  resetFavoritesShake,
  setCartLoading,
  setCartView,
  showPopup,
  hidePopup,
} = uiSlice.actions;

export default uiSlice.reducer;
