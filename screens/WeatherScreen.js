import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../weatherSlice';

const WeatherScreen = () => {

  const [city, setCity] = useState("");
  const weather = useSelector((state) => state.weather.weatherData);
  const status = useSelector((state) => state.weather.status);
  const error = useSelector((state) => state.weather.error);
  const dispatch = useDispatch();

  const handleFetchWeather = () => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://example.com/weather-background.jpg' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Weather App</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter the City"
          value={city}
          onChangeText={setCity}
        />
        
        <Button
          title="Get Weather"
          onPress={handleFetchWeather}
          color="#4CAF50"
        />

        {status === 'loading' && (
          <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
        )}

        {status === 'failed' && (
          <Text style={styles.error}>Error: {error}</Text>
        )}

        {status === 'succeeded' && weather.main && (
          <View style={styles.weatherContainer}>
            <Text style={styles.title}>Current Weather in {city}</Text>
            <Text style={styles.info}>Temperature: {weather.main.temp} °C</Text>
            <Text style={styles.info}>Feels Like: {weather.main.feels_like} °C</Text>
            <Text style={styles.info}>Humidity: {weather.main.humidity}%</Text>
            <Text style={styles.info}>Weather: {weather.weather[0].description}</Text>
            <Text style={styles.info}>Wind Speed: {weather.wind.speed} m/s</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay
  },
  header: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#FFF',
    color: '#333',
  },
  loader: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  weatherContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
  },
  error: {
    color: '#FF0000',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WeatherScreen;
