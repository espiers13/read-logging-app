import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BookInfo from "./pages/BookInfo";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/book/:book_id" element={<BookInfo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
