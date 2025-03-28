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
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Readlist from "./pages/Readlist";
import SearchResults from "./pages/SearchResults";
import PageNotFound from "./pages/PageNotFound";
import SearchByGenre from "./pages/SearchByGenre";

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
          <Route path="/search" element={<Search />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/readlist" element={<Readlist />} />
          <Route path="/search/:search_query" element={<SearchResults />} />
          <Route path="/search/genre/:genre" element={<SearchByGenre />} />

          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
