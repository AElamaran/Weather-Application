import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city, thunkAPI) => {
    console.log("Making API request for city:", city);  
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7e09810c4f87f4553ccae41d7cf421fb&units=metric`
      );
      console.log("API response:", response.data);  
      return response.data;
    } catch (error) {
      console.error("API call failed:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message); 
    }
  }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
      weatherData: {},
      status: 'idle',  
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchWeather.pending, (state) => {
          console.log("Fetching weather...");  
          state.status = 'loading';
        })
        .addCase(fetchWeather.fulfilled, (state, action) => {
          console.log("Weather fetched successfully:", action.payload);  
          state.status = 'succeeded';
          state.weatherData = action.payload;
        })
        .addCase(fetchWeather.rejected, (state, action) => {
          console.log("Failed to fetch weather:", action.payload); 
          state.status = 'failed';
          state.error = action.payload;
        });
    }
    
})

export default weatherSlice.reducer;
