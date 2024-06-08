const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const apiKey = '2f6af18e'; // Replace with your actual OMDb API key

app.use(cors({
  origin: 'http://localhost:5174' // Adjust origin if needed
}));

const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch movie details'); // Re-throw for handling in route
  }
};

const getFirstFiveMovieDetails = async () => {
  try {
    const movieDetails = [];
    for (let i = 1; i <= 5; i++) {
      const details = await getMovieDetails(i.toString()); // Convert i to string for API request
      movieDetails.push(details);
    }
    return movieDetails;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch movie details'); // Re-throw for handling in route
  }
};

// Get details of the first 5 movies endpoint
app.get('/api/movies/all', async (req, res) => {
  try {
    const movies = await getFirstFiveMovieDetails();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching movie details' }); // Handle errors gracefully
  }
});

// Search by title endpoint (unchanged)
app.get('/api/movies/search', async (req, res) => {
  const title = req.query.title?.toLowerCase();
  if (!title) {
    return res.status(400).json({ message: 'Missing search term (title)' });
  }

  try {
    const movies = await getMovies(title);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching movies' }); // Handle errors gracefully
  }
});

const getMovies = async (title) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`);
      if (response.data.Search) {
        return response.data.Search;
      } else {
        return []; // Handle cases where no movies are found
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch movies'); // Re-throw error for handling in route
    }
  };

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
