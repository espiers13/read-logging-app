import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReadJournal, getBookshelf, deleteFromBookshelf } from "../api/api";
import Loading from "./Loading";
import BookReadPopup from "./BookReadPopup";

function BookPopup({ setPopup, book, currentUser }) {
  const navigate = useNavigate();
  const { thumbnail, title, isbn, authors, description } = book;
  const [readPopup, setReadPopup] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isOnBookshelf, setIsOnBookshelf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);

  const { id, username } = currentUser;

  let image =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";

  image = thumbnail || image;

  useEffect(() => {
    setIsLoading(true);
    getReadJournal(username).then((books) => {
      setIsRead(books.some((book) => book.isbn === isbn));
    });
  }, [isbn]);

  useEffect(() => {
    setIsLoading(true);
    getBookshelf(username).then((books) => {
      setIsOnBookshelf(books.some((book) => book.isbn === isbn));
      setIsLoading(false);
    });
  }, [isbn]);

  const decodedText =
    new DOMParser().parseFromString(description, "text/html").body
      .textContent || "";

  const handleMarkAsRead = (e) => {
    setReadPopup(true);
  };

  const handleDelete = (e) => {
    setIsLoading(true);
    setRating(null);
    setValue(0);
    deleteFromBookshelf(id, isbn).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="modal-overlay">
      <div className="transform overflow-hidden rounded-lg bg-white text-left shadow-xl modal-content">
        <div className="p-4">
          <div className="flex items-start justify-center">
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="absolute top-4 right-4 text-green-700"
                onClick={() => setPopup(false)}
              >
                <svg
                  className="h-8 w-8 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />{" "}
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="h-60 w-80 flex justify-center items-center mt-2">
                <img className="w-40 object-cover" src={image} alt={title} />
              </div>
              <h2
                className="font-serif font-bold text-gray-900 mt-5"
                id="modal-title"
              >
                {title}
              </h2>
              <p className="text-sm text-gray-600 mt-1 italic">
                by {authors[0]}
              </p>
              <p className="text-sm text-gray-800 mt-2 multi-line-clamp">
                {decodedText}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-5 mb-5">
          <button
            type="button"
            className="text-blue-700"
            onClick={() => navigate(`/book/${isbn}`)}
          >
            Read More
          </button>
          <div className="flex justify-between items-center space-x-4 ml-2 mr-2">
            <button
              className="text-red-600 text-sm p-1 rounded-lg"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="text-blue-600 text-sm p-1 rounded-lg"
              onClick={handleMarkAsRead}
            >
              Mark as read
            </button>
          </div>
          {readPopup && (
            <BookReadPopup
              currentUser={currentUser}
              setPopup={setReadPopup}
              book={book}
              setIsRead={setIsRead}
              isRead={isRead}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BookPopup;
