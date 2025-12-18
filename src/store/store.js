import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import uiReducer from "./uiSlice";
export const store = configureStore({
  reducer: {
    // Add your reducers here
    cart: cartReducer,
    ui: uiReducer,
  },
});
