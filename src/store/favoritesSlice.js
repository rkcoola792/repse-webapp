import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  viewed: false,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const { userEmail, ...item } = action.payload;
      const itemIndex = state.favorites.findIndex(fav => fav.id === item.id);
      if (itemIndex < 0) {
        state.favorites.push({
          ...item,
          selectedColor: item.selectedColor || "#2C3E50",
          selectedSize: item.selectedSize || "Large"
        });
        state.viewed = false;
        if (userEmail) {
          localStorage.setItem(`favorites_${userEmail}`, JSON.stringify({ favorites: state.favorites, viewed: state.viewed }));
        }
      }
    },
    removeFromFavorites: (state, action) => {
      const { userEmail, id } = action.payload;
      state.favorites = state.favorites.filter(item => item.id !== id);
      if (userEmail) {
        localStorage.setItem(`favorites_${userEmail}`, JSON.stringify({ favorites: state.favorites, viewed: state.viewed }));
      }
    },
    clearFavorites: (state, action) => {
      const { userEmail } = action.payload || {};
      state.favorites = [];
      state.viewed = false;
      if (userEmail) {
        localStorage.removeItem(`favorites_${userEmail}`);
      }
    },
    loadFavoritesForUser: (state, action) => {
      const userEmail = action.payload;
      const stored = localStorage.getItem(`favorites_${userEmail}`);
      try {
        const data = stored ? JSON.parse(stored) : { favorites: [], viewed: false };
        state.favorites = data.favorites || [];
        state.viewed = data.viewed || false;
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        state.favorites = [];
        state.viewed = false;
      }
    },
    saveFavoritesForUser: (state, action) => {
      const userEmail = action.payload;
      localStorage.setItem(`favorites_${userEmail}`, JSON.stringify({ favorites: state.favorites, viewed: state.viewed }));
    },
    setFavoritesViewed: (state, action) => {
      state.viewed = true;
      const userEmail = action.payload;
      if (userEmail) {
        localStorage.setItem(`favorites_${userEmail}`, JSON.stringify({ favorites: state.favorites, viewed: state.viewed }));
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites, loadFavoritesForUser, saveFavoritesForUser, setFavoritesViewed } = favoritesSlice.actions;

export default favoritesSlice.reducer;