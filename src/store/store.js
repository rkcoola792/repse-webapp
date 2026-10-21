import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import cartReducer from "./cartSlice";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice";
import favoritesReducer from "./favoritesSlice";

// redux-persist's default web storage is unavailable while Next.js renders on
// the server. Keep the same persisted keys and use a safe no-op server adapter.
const storage = {
  getItem: (key) => Promise.resolve(typeof window === "undefined" ? null : window.localStorage.getItem(key)),
  setItem: (key, value) => typeof window === "undefined" ? Promise.resolve(value) : Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key) => typeof window === "undefined" ? Promise.resolve() : Promise.resolve(window.localStorage.removeItem(key)),
};

const userPersistConfig = {
  key: "user",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    // Add your reducers here
    cart: persistedCartReducer,
    ui: uiReducer,
    user: persistedUserReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
