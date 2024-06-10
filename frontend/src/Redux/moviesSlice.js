
import { createSlice } from '@reduxjs/toolkit';
import moviesData from '../data/movies.json';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    isLoading: false,
    error: null
  },
  reducers: {
    fetchMoviesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchMoviesSuccess(state, action) {
      state.items = action.payload;
      state.isLoading = false;
    },
    fetchMoviesFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } = moviesSlice.actions;

export const fetchMovies = () => async dispatch => {
  dispatch(fetchMoviesStart());
  try {
    
    const data = moviesData;
    dispatch(fetchMoviesSuccess(data));
  } catch (error) {
    dispatch(fetchMoviesFailure(error.toString()));
  }
};

export default moviesSlice.reducer;
