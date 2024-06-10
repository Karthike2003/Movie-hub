// redux/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    isLoading: false,
    error: null
  },
  reducers: {
    searchStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    searchSuccess(state, action) {
      state.results = action.payload;
      state.isLoading = false;
    },
    searchFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSearchQuery(state, action) {
      state.query = action.payload;
    }
  }
});

export const { searchStart, searchSuccess, searchFailure, setSearchQuery } = searchSlice.actions;

export const searchMovies = (query) => async dispatch => {
  dispatch(searchStart());
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=2f6af18e&s=${query}`);
    const data = await response.json();
    if (data.Response === 'True') {
      dispatch(searchSuccess(data.Search));
    } else {
      dispatch(searchFailure(data.Error));
    }
  } catch (error) {
    dispatch(searchFailure(error.toString()));
  }
};

export default searchSlice.reducer;
