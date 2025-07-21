import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import RoomPage from './RoomPage.jsx';
import Restraunt from './Restaurant.jsx';
import VideoPage from './VideoPage.jsx';
import BookingPage from './BookingPage.jsx';
import CheckoutPage from './CheckoutPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <LandingPage />
            <RoomPage />
            <Restraunt />
            <VideoPage />
            <BookingPage />
          </>
        } />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
