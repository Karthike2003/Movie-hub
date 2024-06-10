import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = '2f6af18e';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const transformAPIData = (apiData) => {
  return apiData.map((item) => ({
    id: item.imdbID,
    banner_image: item.Poster,
    title: item.Title,
    year: item.Year,
    genre: item.Type === 'series' ? 'Series' : 'Movie', 
  }));
};

export const fetchMovies = createAsyncThunk('search/fetchMovies', async (searchQuery, thunkAPI) => {
  const response = await fetch(`${API_URL}&s=${searchQuery}`);
  const data = await response.json();
  if (data.Response === 'True') {
    return transformAPIData(data.Search);
  } else {
    return thunkAPI.rejectWithValue(data.Error);
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: '',
    searchResults: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
