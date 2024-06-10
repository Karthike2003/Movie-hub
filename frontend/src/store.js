
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './Redux/moviesSlice';
import searchReducer from './Redux/searchSlice';
const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search: searchReducer
  }
});

export default store;
