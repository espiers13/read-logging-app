import { Route, Routes, Navigate } from "react-router-dom";
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
import Settings from "./pages/Settings";
import Bookshelf from "./pages/Bookshelf";
import Journal from "./pages/Journal";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <div className="app-container">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="grow">
        <Routes>
          {/* Conditional route for homepage */}
          <Route
            path="/"
            element={
              currentUser ? (
                <Homepage currentUser={currentUser} />
              ) : (
                <Navigate to={`/login`} />
              )
            }
          />

          {/* Login and SignUp pages, redirected if currentUser exists */}
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to={`/${currentUser.id}/profile`} />
              ) : (
                <Login setCurrentUser={setCurrentUser} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              currentUser ? (
                <Navigate to={`/${currentUser.id}/profile`} />
              ) : (
                <SignUp setCurrentUser={setCurrentUser} />
              )
            }
          />

          {/* Book, Search, Profile, etc. Routes */}
          <Route
            path="/book/:book_id"
            element={<BookInfo currentUser={currentUser} />}
          />
          <Route path="/search" element={<Search />} />
          <Route
            path="/:user_id/friends"
            element={<Friends currentUser={currentUser} />}
          />
          <Route
            path="/:user_id/bookshelf"
            element={<Bookshelf currentUser={currentUser} />}
          />
          <Route
            path="/:user_id/journal"
            element={<Journal currentUser={currentUser} />}
          />
          <Route
            path="/:user_id/profile"
            element={<Profile currentUser={currentUser} />}
          />
          <Route
            path="/:user_id/readlist"
            element={<Readlist currentUser={currentUser} />}
          />
          <Route path="/search/:search_query" element={<SearchResults />} />
          <Route path="/search/genre/:genre" element={<SearchByGenre />} />
          <Route
            path="/:user_id/settings"
            element={
              <Settings
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          {/* Page Not Found Route */}
          <Route path="*" element={<Navigate to="/404" />} />
          <Route
            path="/404"
            element={<PageNotFound currentUser={currentUser} />}
          />
        </Routes>
      </main>
      <Footer currentUser={currentUser} />
    </div>
  );
}

export default App;
