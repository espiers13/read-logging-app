import { useState, useEffect } from "react";
import { searchBooks } from "../api/api";
import NewFavouritesCard from "./NewFavouritesCard";

function SearchForFavourite({
  isVisible,
  setIsVisible,
  currentUser,
  setFavouritesUpdated,
  favouritesUpdated,
}) {
  const { avatar, username, id } = currentUser;
  const [isExiting, setIsExiting] = useState(false);
  const [backdropExiting, setBackdropExiting] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      searchBooks(query)
        .then(({ items }) => {
          const formattedResults = items.map((item) => {
            const volumeInfo = item.volumeInfo;

            const isbnObj = volumeInfo.industryIdentifiers?.find(
              (id) => id.type === "ISBN_13"
            );

            return {
              isbn: isbnObj?.identifier || "N/A",
              title: volumeInfo.title || "Untitled",
              authors: volumeInfo.authors || [],
              datePublished: volumeInfo.publishedDate || "Unknown",
              thumbnail:
                volumeInfo.imageLinks?.thumbnail ||
                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930",
            };
          });

          setResults(formattedResults);
        })
        .catch((err) => console.error(err));
    }, 300);

    setTypingTimeout(timeout);
  }, [query]);

  const handleClose = () => {
    setIsExiting(true);
    setBackdropExiting(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 700);
  };

  return (
    <div className="book-menu">
      {isVisible && (
        <div
          className={`fixed inset-0 z-10 ${
            backdropExiting
              ? "animate__animated animate__fadeOut"
              : "animate__animated animate__fadeIn"
          } backdrop-brightness-50`}
        >
          <div className="h-full w-full flex items-end justify-center">
            <div
              className={`relative w-full max-w-md book-menu book-menu-top-shadow p-6 rounded-t-xl shadow-xl animate__animated ${
                isExiting ? "animate__slideOutDown" : "animate__slideInUp"
              }`}
              style={{ height: "66.6667vh" }}
            >
              <div className="flex justify-between items-center space-x-4">
                <button onClick={handleClose} className="text-gray-300">
                  Cancel
                </button>
                <p className="font-serif">Select a Book</p>
                <img
                  className="w-8 h-8 rounded-full ml-1"
                  src={avatar}
                  alt={username}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search for books..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    padding: "8px",
                    width: "100%",
                    fontSize: "16px",
                    marginBottom: "12px",
                  }}
                />

                <ul
                  style={{
                    maxHeight: "450px",
                    overflowY: "auto",
                    paddingRight: "4px",
                  }}
                >
                  {results.map((book, index) => (
                    <li key={index}>
                      <NewFavouritesCard
                        user_id={id}
                        favourite={book}
                        setIsExiting={setIsExiting}
                        setBackdropExiting={setBackdropExiting}
                        setFavouritesUpdated={setFavouritesUpdated}
                        favouritesUpdated={favouritesUpdated}
                        setTimeout={setTimeout}
                        setIsVisible={setIsVisible}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchForFavourite;
