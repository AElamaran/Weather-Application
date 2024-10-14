import React from 'react';
import { Provider } from 'react-redux';
import  {store } from './store';
import WeatherScreen from './screens/WeatherScreen';


const App=()=>{
  return(
    <Provider store={store}>
      <WeatherScreen/>
    </Provider>
  )
};
console.log('App Store:', store);

export default App;