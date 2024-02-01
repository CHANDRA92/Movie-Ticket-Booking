// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './store/userSlice';
import HomeScreen from './screens/HomeScreen';
import ShowDetailScreen from './screens/ShowDetailScreen';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/show/:id" element={<ShowDetailScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
